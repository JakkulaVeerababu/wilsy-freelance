import "server-only";
import { createClient } from "@supabase/supabase-js";
import { createInquiryHandler } from "@/lib/inquiry-handler";

export const runtime = "nodejs";
export async function POST(request: Request) {
  const url = process.env.SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;
  return createInquiryHandler({
    origin: process.env.SITE_URL || "",
    salt: process.env.RATE_LIMIT_SALT || "",
    ready: process.env.INQUIRY_MODE === "supabase" && !!(url && secret),
    production: process.env.NODE_ENV === "production",
    vercel: process.env.VERCEL === "1",
    persist: async (input) => {
      const client = createClient(url!, secret!, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: {
          fetch: (input, init) =>
            fetch(input, { ...init, signal: AbortSignal.timeout(12000) }),
        },
      });
      const { data, error } = await client.rpc("submit_inquiry", {
        p_payload: input.payload,
        p_request_id: input.requestId,
        p_payload_hash: input.payloadHash,
        p_ip_key: input.ipKey,
        p_email_key: input.emailKey,
      });
      if (error)
        return {
          error: error.message.includes("rate_limit_exceeded")
            ? "rate_limit"
            : error.message.includes("idempotency_conflict")
              ? "conflict"
              : "unavailable",
        };
      if (typeof data !== "string" || !/^[a-f0-9-]{36}$/.test(data))
        return { error: "unavailable" };
      return { reference: `WLS-${data.toUpperCase()}` };
    },
  })(request);
}
