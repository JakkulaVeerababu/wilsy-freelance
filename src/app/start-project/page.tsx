import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { InquiryForm } from "@/components/inquiry-form";
import { services, studio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell Wilsy about your next website or digital product. A considered brief is the start of a great partnership.",
};
export default async function StartProject({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const initialService = services.some((s) => s.id === service) ? service! : "";
  const ready =
    process.env.INQUIRY_MODE === "supabase" &&
    !!(
      process.env.SUPABASE_URL &&
      process.env.SUPABASE_SECRET_KEY &&
      (process.env.RATE_LIMIT_SALT?.length ?? 0) >= 32 &&
      process.env.SITE_URL
    );
  return (
    <main id="main" className="container subpage inquiry-layout">
      <div className="inquiry-intro">
        <span className="eyebrow">
          <span className="tiny-square" /> Your next chapter starts here
        </span>
        <h1 className="subpage-title">
          An idea.
          <br />A conversation.
          <br />
          <span className="blue-text">A possibility.</span>
        </h1>
        <p className="subpage-description">
          Tell us a little about what you have in mind. We’ll explore the right
          approach, together.
        </p>
        <a className="inquiry-email" href={`mailto:${studio.email}`}>
          {studio.email}
          <ArrowUpRight size={18} />
        </a>
        <div className="inquiry-aside-note">
          <h3>Good things start with clarity.</h3>
          <p>
            No pressure and no commitment. Just a thoughtful conversation about
            your goals, your audience, and what comes next.
          </p>
        </div>
      </div>
      <InquiryForm
        initialService={initialService}
        submissionsAvailable={ready}
      />
    </main>
  );
}
