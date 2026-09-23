import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Asterisk,
} from "lucide-react";
import { Reveal, SentenceReveal } from "@/components/motion";
import { CapabilityRibbon } from "@/components/capability-ribbon";
import { ServiceLights } from "@/components/service-lights";
import { ServiceList, ProcessSteps } from "@/components/home-interactions";
import { FormaPreview, OrbitPreview } from "@/components/project-preview";
import { packages, projects, studio } from "@/lib/content";

export default function Home() {
  return (
    <main id="main">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-topline">
          <span className="eyebrow">
            <span className="tiny-square" /> Independent digital studio
          </span>
        </div>
        <div className="hero-composition">
          <div className="hero-copy">
            <Reveal>
              <h1 id="hero-title">
                We build digital
                <br />
                experiences that
                <br />
                move businesses
                <br />
                <span className="hero-forward">
                  forward<span className="blue-period">.</span>
                  <ArrowUpRight strokeWidth={1.4} aria-hidden="true" />
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="hero-description">
                From ambitious startups to established businesses.
                <br className="desktop-break" /> Beautiful websites. Thoughtful
                products. Built for what’s next.
              </p>
              <div className="hero-actions">
                <Link href="/start-project" className="button button-blue">
                  Start your project <ArrowUpRight size={18} />
                </Link>
                <Link href="#work" className="button button-text">
                  Explore our work <ArrowDown size={17} />
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="hero-art">
            <Image
              src="/images/wilsy-sculpture.png"
              alt="Sculptural cobalt blue ribbon with polished silver edges"
              width={1536}
              height={1024}
              sizes="(max-width: 760px) 100vw, 58vw"
              preload
            />
          </div>
        </div>
      </section>
      <CapabilityRibbon />
      <section className="intro-section container" id="about">
        <span className="eyebrow section-label">
          <span className="tiny-square" /> A little about us
        </span>
        <Reveal>
          <h2>
            <SentenceReveal text="Ordinary is easy." />
            <br />
            <SentenceReveal text="Let’s build" />{" "}
            <span className="blue-text">
              <SentenceReveal text="something" />
              <br className="desktop-break" />{" "}
              <SentenceReveal text="worth experiencing." />
            </span>
          </h2>
          <div className="intro-bottom">
            <div>
              <p>{studio.background}</p>
              <a className="text-link" href={`mailto:${studio.email}`}>
                Meet your next creative partner <ArrowUpRight size={19} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="work-section section-space" id="work">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="tiny-square" /> Design explorations / 01
              </span>
              <h2>
                <SentenceReveal text="Big ideas." />
                <br />
                <span className="muted-text">
                  <SentenceReveal text="Made tangible." />
                </span>
              </h2>
            </div>
            <p>
              A look at what thoughtful design
              <br />
              and considered engineering can do.
              <span className="concept-disclaimer">
                Studio concepts. Not client commissions.
              </span>
            </p>
          </Reveal>
          <div className="project-grid">
            {projects.map((project, i) => (
              <Reveal
                className={`project-card project-${project.theme}`}
                key={project.slug}
                delay={i * 0.08}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="project-visual"
                  aria-label={`Explore ${project.name}, a ${project.category.toLowerCase()} concept`}
                >
                  <span className="project-concept">STUDIO CONCEPT</span>
                  <div className="project-browser">
                    <div className="browser-bar">
                      <div>
                        <i />
                        <i />
                        <i />
                      </div>
                      <span>
                        {project.name.toLowerCase()} / design exploration
                      </span>
                      <span>↗</span>
                    </div>
                    {project.slug === "forma" ? (
                      <FormaPreview />
                    ) : (
                      <OrbitPreview />
                    )}
                  </div>
                  <span className="project-open">
                    <ArrowUpRight />
                  </span>
                </Link>
                <div className="project-caption">
                  <div>
                    <Link href={`/work/${project.slug}`}>
                      <h3>
                        {project.name}
                        <ArrowUpRight size={21} />
                      </h3>
                    </Link>
                    <p>{project.type}</p>
                  </div>
                  <span className="outline-tag">{project.category}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="services-section section-space" id="services">
        <ServiceLights />
        <div className="container services-layout">
          <Reveal className="services-heading">
            <span className="eyebrow">
              <span className="tiny-square" /> What we do / 02
            </span>
            <h2>
              <SentenceReveal text="From first" />
              <br />
              <SentenceReveal text="thought to" />
              <br />
              <span className="services-final-line">
                <SentenceReveal text="next big thing." />
              </span>
            </h2>
            <p>
              One creative partner.
              <br />
              Every part of your digital journey.
            </p>
            <Link className="button button-white" href="/start-project">
              Find your starting point <ArrowUpRight size={18} />
            </Link>
          </Reveal>
          <ServiceList />
        </div>
      </section>
      <section className="difference-section section-space">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="tiny-square" /> The Wilsy difference / 03
              </span>
              <h2>
                <SentenceReveal text="Beautiful on the surface." />
                <br />
                <span className="muted-text">
                  <SentenceReveal text="Better underneath." />
                </span>
              </h2>
            </div>
          </Reveal>
          <div className="difference-grid">
            {[
              {
                number: "01",
                title: "Your business. Your design.",
                text: "A custom experience shaped around your audience and goals, with responsive layouts that feel at home on every screen.",
              },
              {
                number: "02",
                title: "Craft meets code.",
                text: "Thoughtful design, performance-conscious architecture, SEO foundations, and maintainable code in one considered build.",
              },
              {
                number: "03",
                title: "Built together. Built to last.",
                text: "Clear communication, shared milestones, documented handover, and launch and ongoing support options that fit your needs.",
              },
            ].map((item) => (
              <Reveal className="difference-item" key={item.number}>
                <div className="difference-item-top">
                  <span>{item.number} /</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="process-section section-space" id="process">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="tiny-square" /> How we get there / 04
              </span>
              <h2>
                <SentenceReveal text="Great work." />
                <br />
                <span className="muted-text">
                  <SentenceReveal text="No guesswork." />
                </span>
              </h2>
            </div>
            <p>
              A clear path from “what if” to “it’s live.”
              <br />
              With you at every step.
            </p>
          </Reveal>
          <ProcessSteps />
        </div>
      </section>
      <section className="pricing-section section-space container" id="pricing">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow">
              <span className="tiny-square" /> An investment in what’s next / 05
            </span>
            <h2>
              <SentenceReveal text="Your ambition." />
              <br />
              <span className="muted-text">
                <SentenceReveal text="Our starting point." />
              </span>
            </h2>
          </div>
          <p>
            Every project is different. Your quote should be too.
            <br />
            Scope, requirements, and timelines shape the estimate.
          </p>
        </Reveal>
        <div className="pricing-grid">
          {packages.map((item, i) => (
            <Reveal
              className={`pricing-card ${i === 1 ? "pricing-featured" : ""}`}
              key={item.name}
            >
              <h3>{item.name}</h3>
              <p>{item.audience}</p>
              <div className="price">
                {item.price}
                <span>A proposal built around your needs</span>
              </div>
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={`/start-project?service=${item.service}`}
                className={`button ${i === 1 ? "button-blue" : "button-outline"}`}
              >
                Let’s explore your project <ArrowUpRight size={17} />
              </Link>
              <small>{item.delivery}</small>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-top">
            <span className="eyebrow">
              <span className="tiny-square" /> A good place to begin
            </span>
            <Asterisk size={48} strokeWidth={1.3} />
          </div>
          <Reveal>
            <h2>
              <SentenceReveal text="Have a project in mind?" />
              <br />
              <SentenceReveal text="Let’s build something" />
              <br />
              <span>
                <SentenceReveal text="remarkable." />
              </span>
              <ArrowUpRight className="contact-big-arrow" strokeWidth={1.1} />
            </h2>
          </Reveal>
          <div className="contact-bottom">
            <p>
              Tell us what you’re building.
              <br />
              We’ll explore how to bring your vision to life.
            </p>
            <div>
              <Link href="/start-project" className="button button-white">
                Start your project <ArrowUpRight size={18} />
              </Link>
              <a href={`mailto:${studio.email}`} className="contact-email">
                {studio.email}
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
