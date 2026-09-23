import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { FormaPreview, OrbitPreview } from "@/components/project-preview";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project ? `${project.name} — Studio concept` : "Project not found",
    description: project?.summary,
    robots: { index: false, follow: true },
  };
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return (
    <main id="main" className="subpage container">
      <Link className="back-link" href="/#work">
        <ArrowLeft size={15} />
        Back to work
      </Link>
      <span className="eyebrow blue-text">{project.name} / Studio concept</span>
      <h1 className="subpage-title">{project.headline}</h1>
      <p className="subpage-description">{project.summary}</p>
      <div className="case-tags">
        <span className="outline-tag">{project.category}</span>
        {project.technologies.map((t) => (
          <span key={t} className="outline-tag">
            {t}
          </span>
        ))}
      </div>
      <div className={`case-preview ${project.theme}`}>
        <div className="project-browser">
          <div className="browser-bar">
            <div>
              <i />
              <i />
              <i />
            </div>
            <span>{project.name} / Concept preview</span>
            <span>↗</span>
          </div>
          {slug === "forma" ? <FormaPreview /> : <OrbitPreview />}
        </div>
      </div>
      <div className="case-content">
        <aside className="case-facts">
          <div>
            <h3>Project status</h3>
            <p>
              Self-initiated design exploration
              <br />
              Not a client commission
            </p>
          </div>
          <div>
            <h3>Deliverables</h3>
            <ul>
              {project.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Technology</h3>
            <p>{project.technologies.join(" · ")}</p>
          </div>
          <Link href={project.liveUrl} className="text-link">
            Open interactive concept <ArrowUpRight size={17} />
          </Link>
        </aside>
        <div className="case-story">
          <h2>The challenge</h2>
          <p>{project.challenge}</p>
          <h2>The approach</h2>
          <p>{project.approach}</p>
          <h2>The outcome</h2>
          <p>{project.outcomes}</p>
          <p className="notice">
            This is a Wilsy studio concept, created to explore a design
            direction. Names and interface data are illustrative.{" "}
            {slug === "forma" &&
              "Architecture photography is used for visual demonstration and does not depict work commissioned from Wilsy."}
          </p>
        </div>
      </div>
      <div className="case-cta">
        <h2>See a possibility for your business?</h2>
        <Link
          className="button button-blue"
          href={`/start-project?service=${slug === "forma" ? "custom-website" : "web-app"}`}
        >
          Let’s talk about it <ArrowUpRight size={18} />
        </Link>
      </div>
    </main>
  );
}
