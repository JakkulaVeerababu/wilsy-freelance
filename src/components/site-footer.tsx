import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./site-header";
import { studio } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Logo />
          <p>
            Thoughtful design.
            <br />
            Reliable engineering.
            <br />A little extraordinary.
          </p>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Explore</span>
          <Link href="/#work">Our work</Link>
          <Link href="/#services">What we do</Link>
          <Link href="/#process">Our process</Link>
          <Link href="/#about">The studio</Link>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Build with us</span>
          <Link href="/start-project">
            Start a project <ArrowUpRight size={14} />
          </Link>
          <Link href="/#pricing">Project estimates</Link>
          <a href={`mailto:${studio.email}`}>{studio.email}</a>
          {studio.whatsapp && (
            <a href={`https://wa.me/${studio.whatsapp}`}>
              WhatsApp <ArrowUpRight size={14} />
            </a>
          )}
          {studio.social.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
              {s.label}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Wilsy. All rights reserved.</span>
        <span className="footer-note">Made with intention.</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="#main" aria-label="Back to top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
