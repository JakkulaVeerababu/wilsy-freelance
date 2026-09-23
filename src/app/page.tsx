import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from "lucide-react";
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
                <span className="tiny-square" /> Selected concept work
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
                Self-initiated studio builds, selected to show our range, systems thinking, and craft.
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
                  <span className="project-concept">SELF-INITIATED CONCEPT</span>
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
              <span className="tiny-square" /> What we do
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
      <section className="difference-section section-space" id="proof">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="tiny-square" /> Clear at every stage
              </span>
              <h2>
                <SentenceReveal text="See the work take shape." />
                <br />
                <span className="muted-text">
                  <SentenceReveal text="Know what comes next." />
                </span>
              </h2>
            </div>
            <p>
              A transparent process gives you something tangible to review at
              every milestone.
            </p>
          </Reveal>
          <div className="difference-grid">
            {[
              {
                title: "Structure before surface.",
                text: "Review wireframes and page priorities before visual design begins, so the direction is clear before we polish it.",
              },
              {
                title: "A live view as we build.",
                text: "Get a private staging link at agreed checkpoints to explore the working build and share focused feedback.",
              },
              {
                title: "Reviews with clear boundaries.",
                text: "Your proposal sets out review milestones and included revision rounds. We gather feedback in batches and confirm any added scope first.",
              },
            ].map((item) => (
              <Reveal className="difference-item" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
          <p className="proof-footnote">You’ll always know what we’re working on, what we need from you, and what happens next.</p>
        </div>
      </section>
      <section className="process-section section-space" id="process">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="tiny-square" /> How we get there
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
                <span className="tiny-square" /> An investment in what’s next
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
              <div className="package-timeline">
                <span>{item.timingLabel}</span>
                <strong>{item.timing}</strong>
              </div>
              <p className="package-delivery">{item.delivery}</p>
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
      <section className="faq-section section-space" id="faq">
        <div className="container faq-layout">
          <Reveal className="faq-heading">
            <span className="eyebrow"><span className="tiny-square" /> Good to know</span>
            <h2>Before we begin.</h2>
            <p>Clear answers make for a better first conversation.</p>
          </Reveal>
          <div className="faq-list">
            {[
              {
                question: "How long does a project take?",
                answer: "A focused website is often around 2–4 weeks; a custom product build is more commonly 4–8 weeks. Those are planning ranges, not promises: your proposal will map milestones around scope, content readiness, and feedback.",
              },
              {
                question: "How do revisions work?",
                answer: "Your proposal lists the review points and revision rounds included at each stage. We ask for consolidated feedback at those checkpoints; if you want more rounds, we’ll agree the added time and cost before continuing.",
              },
              {
                question: "How are payments handled?",
                answer: "The proposal sets out the payment schedule before work starts, tied to clear project milestones. You’ll know the amounts and due dates in advance, with no surprise additions to the agreed scope.",
              },
              {
                question: "What if the requirements change mid-project?",
                answer: "We’ll pause on the new request, explain how it affects scope, timing, and cost, then share an updated plan for approval. We only proceed with that change once you’re comfortable with it.",
              },
            ].map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>{item.question}<span aria-hidden="true" /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-top">
            <span className="eyebrow">
              <span className="tiny-square" /> A good place to begin
            </span>
          </div>
          <Reveal>
            <h2>
              <SentenceReveal text="Have a " />
              <span className="contact-highlight">
                <SentenceReveal text="project in mind?" />
              </span>
              <br />
              <span className="contact-highlight">
                <SentenceReveal text="Let’s build something" />
              </span>
              {" "}
              <SentenceReveal text="remarkable." />
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
