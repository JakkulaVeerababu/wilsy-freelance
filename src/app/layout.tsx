import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "./globals.css";
import "./studio-refinement.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: {
    default: "Wilsy — Digital experiences. Business forward.",
    template: "%s — Wilsy",
  },
  description:
    "An independent web design and development studio. Thoughtful websites, e-commerce experiences, and digital products for ambitious businesses.",
  openGraph: {
    title: "Wilsy — Digital experiences. Business forward.",
    description:
      "Thoughtful design. Reliable engineering. Websites and digital products for your next chapter.",
    type: "website",
    siteName: "Wilsy",
  },
  twitter: {
    card: "summary",
    title: "Wilsy — Digital experiences. Business forward.",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
