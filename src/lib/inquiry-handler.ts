import { createHash, createHmac } from "node:crypto";
import {
  submissionSchema,
  inquirySchema,
  type Inquiry,
} from "./inquiry-schema";

export type PersistInput = {
  payload: Inquiry;
  requestId: string;
  payloadHash: string;
  ipKey: string;
  emailKey: string;
};
export type PersistResult = {
  reference?: string;
  error?: "rate_limit" | "conflict" | "unavailable";
};
export type InquiryDependencies = {
  origin: string;
  salt: string;
  ready: boolean;
  production: boolean;
  vercel: boolean;
  persist: (input: PersistInput) => Promise<PersistResult>;
  now?: () => number;
};
const response = (
  body: unknown,
  status: number,
  headers: Record<string, string> = {},
) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });

async function readBoundedBody(request: Request): Promise<string> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("empty");
  let bytes = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.length;
    if (bytes > 16384) {
      await reader.cancel();
      throw new Error("too_large");
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}

export function createInquiryHandler(deps: InquiryDependencies) {
  return async (request: Request): Promise<Response> => {
    let expectedOrigin: string;
    try {
      expectedOrigin = new URL(
        deps.origin || (deps.production ? "" : request.url),
      ).origin;
    } catch {
      return response(
        {
          error:
            "Online inquiries are temporarily unavailable. Please email contact@wilsy.in.",
        },
        503,
      );
    }
    if (request.headers.get("origin") !== expectedOrigin)
      return response({ error: "This request is not allowed." }, 403);
    if (!request.headers.get("content-type")?.startsWith("application/json"))
      return response({ error: "A JSON request is required." }, 415);
    if (Number(request.headers.get("content-length")) > 16384)
      return response(
        { error: "Your inquiry is too large. Please shorten the description." },
        413,
      );
    let body: unknown;
    try {
      body = JSON.parse(await readBoundedBody(request));
    } catch (error) {
      return response(
        {
          error:
            error instanceof Error && error.message === "too_large"
              ? "Your inquiry is too large."
              : "We couldn’t read this inquiry.",
        },
        error instanceof Error && error.message === "too_large" ? 413 : 400,
      );
    }
    const parsed = submissionSchema.safeParse(body);
    if (!parsed.success)
      return response(
        {
          error: "Please check the required fields and privacy consent.",
          fields: parsed.error.flatten().fieldErrors,
        },
        400,
      );
    const { requestId, startedAt } = parsed.data;
    const payload = inquirySchema.parse(parsed.data);
    const elapsed = (deps.now?.() ?? Date.now()) - startedAt;
    if (elapsed < 3000 || elapsed > 86400000)
      return response(
        {
          error:
            "Please take a moment to review your inquiry. If this page has been open for a day, refresh it and try again.",
        },
        400,
      );
    if (!deps.ready || deps.salt.length < 32)
      return response(
        {
          error:
            "Online inquiries are temporarily unavailable. Please email contact@wilsy.in.",
        },
        503,
      );
    // Vercel overwrites x-vercel-forwarded-for. Do not trust client-supplied generic X-Forwarded-For.
    const ip = deps.vercel
      ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown"
      : "shared-origin";
    const hash = (text: string) =>
      createHmac("sha256", deps.salt).update(text).digest("hex");
    try {
      const result = await deps.persist({
        payload,
        requestId,
        payloadHash: createHash("sha256")
          .update(JSON.stringify(payload))
          .digest("hex"),
        ipKey: `ip:${hash(ip)}`,
        emailKey: `email:${hash(payload.email)}`,
      });
      if (result.error === "rate_limit")
        return response(
          {
            error:
              "You’ve sent several inquiries recently. Please try again in an hour, or contact us by email.",
          },
          429,
          { "Retry-After": "3600" },
        );
      if (result.error === "conflict")
        return response(
          {
            error:
              "This request has changed. Go back to review your details and submit again.",
          },
          409,
        );
      if (result.error || !result.reference)
        return response(
          {
            error:
              "We couldn’t save your inquiry. Please retry or email contact@wilsy.in.",
          },
          503,
        );
      return response({ reference: result.reference }, 201);
    } catch {
      return response(
        {
          error:
            "We couldn’t confirm your inquiry was saved. You can safely retry or email contact@wilsy.in.",
        },
        503,
      );
    }
  };
}
