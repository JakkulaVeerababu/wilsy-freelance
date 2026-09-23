import type { Metadata } from "next";
import { studio } from "@/lib/content";
export const metadata: Metadata = {
  title: "Website terms",
  robots: { index: false },
};
export default function Terms() {
  return (
    <main id="main" className="subpage container legal-page">
      <span className="eyebrow blue-text">Wilsy / Website terms</span>
      <h1 className="subpage-title">A clear beginning.</h1>
      <p className="subpage-description">
        These general website terms describe how to use this site and what to
        expect when you make an inquiry.
      </p>
      <h2>Project inquiries</h2>
      <p>
        An inquiry begins a conversation. It does not book a service, accept a
        quotation, or create a project agreement. Project scope, price, timing,
        payment arrangements, intellectual property, and support terms are
        agreed separately in writing.
      </p>
      <h2>Estimates and availability</h2>
      <p>
        Projects are quoted individually. Any budget or timeframe you enter is a
        preference to discuss, rather than an agreed price or promised delivery
        date.
      </p>
      <h2>Portfolio and concept work</h2>
      <p>
        Entries marked “Studio concept” are self-initiated demonstrations, not
        client commissions. Illustrative names, transactions, and interfaces do
        not represent real customer relationships, financial services, or
        verified business results. Third-party photographs remain subject to
        their applicable rights and licenses.
      </p>
      <h2>Appropriate use</h2>
      <p>
        Use the website and inquiry form for legitimate conversations. Do not
        submit harmful content, attempt unauthorized access, or interfere with
        the service. Website availability may change during updates and
        maintenance.
      </p>
      <h2>Questions</h2>
      <p>
        For questions about Wilsy or a proposed engagement, contact{" "}
        <a href={`mailto:${studio.email}`}>{studio.email}</a>.
      </p>
      <div className="legal-draft">
        <p>
          Launch review: these general terms need the operator’s legal business
          details and review for the applicable jurisdiction. They are not a
          substitute for a signed project agreement.
        </p>
      </div>
    </main>
  );
}
