import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <main id="main" className="container subpage">
      <span className="eyebrow blue-text">404 / A little off course</span>
      <h1 className="subpage-title">
        Let’s get you
        <br />
        moving again.
      </h1>
      <p className="subpage-description">
        This page doesn’t exist. There’s plenty to discover back at the studio.
      </p>
      <Link href="/" className="button button-blue" style={{ marginTop: 30 }}>
        Back to Wilsy <ArrowUpRight size={17} />
      </Link>
    </main>
  );
}
