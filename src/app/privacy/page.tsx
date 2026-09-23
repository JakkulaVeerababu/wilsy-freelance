import type { Metadata } from "next";
import { studio } from "@/lib/content";
export const metadata: Metadata = {
  title: "Privacy notice",
  robots: { index: false },
};
export default function Privacy() {
  return (
    <main id="main" className="subpage container legal-page">
      <span className="eyebrow blue-text">Wilsy / Privacy</span>
      <h1 className="subpage-title">
        Your details.
        <br />
        Handled with care.
      </h1>
      <p className="subpage-description">
        This notice explains how the Wilsy website handles information you
        choose to share in a project inquiry.
      </p>
      <h2>Information you provide</h2>
      <p>
        The inquiry form asks for your name, email address, project
        requirements, budget preference, and timeframe. Company, phone number,
        existing website, and references are optional. Please do not include
        passwords, payment card details, or confidential information in your
        brief.
      </p>
      <h2>How we use it</h2>
      <p>
        Your details are used to understand your project, respond to your
        inquiry, and prepare a proposal. The form does not subscribe you to
        marketing messages. Submitting an inquiry does not create a contract.
      </p>
      <h2>Storage and service providers</h2>
      <p>
        When online submissions are enabled, inquiries are stored through
        Supabase and processed by the website hosting provider. Records are not
        publicly accessible. Security controls use pseudonymous identifiers
        derived from your email address and connection address to help limit
        spam. These identifiers are distinct from your project brief. If you
        contact us by email, the message is also handled by the email providers
        involved.
      </p>
      <h2>Your choices</h2>
      <p>
        You may request access to, correction of, or deletion of your inquiry by
        emailing <a href={`mailto:${studio.email}`}>{studio.email}</a>. Keep
        your inquiry reference if one was issued. We may need to verify the
        request before making changes.
      </p>
      <h2>Cookies and tracking</h2>
      <p>
        This implementation does not add advertising cookies or third-party
        analytics. Form answers are kept in the current page’s memory while you
        complete the steps, rather than saved to browser storage. Hosting
        services may maintain operational logs.
      </p>
      <h2>Retention and contact</h2>
      <p>
        Inquiry information should be retained only while needed for the
        conversation and any resulting business obligations. Contact{" "}
        <a href={`mailto:${studio.email}`}>{studio.email}</a> with questions or
        a deletion request.
      </p>
      <div className="legal-draft">
        <p>
          Launch review: Wilsy’s operator must confirm the legal business
          identity, hosting and database regions, a specific retention schedule,
          and any jurisdiction-specific disclosures before this notice is
          published as a final policy.
        </p>
      </div>
    </main>
  );
}
