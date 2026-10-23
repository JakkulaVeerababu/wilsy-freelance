import type { Metadata } from "next";
import "@/app/profile/pi-profile.css";
import {
  GraduationCap,
  FlaskConical,
  BrainCircuit,
  Database,
  Network,
  BookOpen,
  Briefcase,
  Mail,
  Globe,
  GitBranch,
  Link2,
  CheckCircle,
  MapPin,
  Calendar,
  Award,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Veerababu Jakkula — Principal Investigator",
  description:
    "Personal profile of Veerababu Jakkula, Principal Investigator at Wilsy University's Department of Computer Science & AI Research.",
  openGraph: {
    title: "Veerababu Jakkula — Principal Investigator, Wilsy University",
    description:
      "Researcher in Computer Science, AI/ML, and Data Systems. Principal Investigator at Wilsy University.",
    type: "profile",
  },
};

const researchAreas = [
  {
    icon: "🧠",
    name: "Artificial Intelligence & Machine Learning",
    desc: "Developing novel neural architectures and learning algorithms for real-world decision systems with a focus on interpretability and fairness.",
    tags: ["Deep Learning", "Reinforcement Learning", "Model Interpretability"],
  },
  {
    icon: "💾",
    name: "Data Science & Informatics",
    desc: "Large-scale data pipelines, statistical inference methods, and knowledge discovery from structured and unstructured scientific data.",
    tags: ["Statistical Modeling", "Knowledge Graphs", "Scientific Data"],
  },
  {
    icon: "🔗",
    name: "Computer Systems & Software Engineering",
    desc: "Building high-performance distributed systems and research tooling for collaborative computational science environments.",
    tags: ["Distributed Systems", "System Design", "HPC"],
  },
  {
    icon: "🛰️",
    name: "Human-Computer Interaction",
    desc: "Designing intelligent interfaces that bridge complex model outputs with actionable human insight across research and enterprise domains.",
    tags: ["Interface Design", "Explainability", "User Research"],
  },
];

const timeline = [
  {
    year: "2024 – Present",
    title: "Principal Investigator",
    sub: "Wilsy University · Department of Computer Science & AI",
    desc: "Leading the Computational Intelligence Lab. Managing research grants, graduate students, and cross-disciplinary collaborations with industry partners.",
  },
  {
    year: "2021 – 2024",
    title: "Senior Research Scientist",
    sub: "Wilsy University · AI Research Division",
    desc: "Led applied AI research projects with focus on large-scale machine learning systems, publishing in top-tier venues including NeurIPS, ICML, and ACL.",
  },
  {
    year: "2018 – 2021",
    title: "Doctoral Research Fellow",
    sub: "Wilsy University · Graduate School",
    desc: "Completed doctoral thesis on adaptive neural network architectures for low-resource settings. Recipient of the University Excellence Fellowship.",
  },
  {
    year: "2014 – 2018",
    title: "Bachelor of Technology — Computer Science",
    sub: "Wilsy University",
    desc: "Graduated with distinction. Specialization in algorithms, systems programming, and applied mathematics. Ranked in top 3% of cohort.",
  },
];

const skills = [
  {
    label: "Programming",
    items: [
      { name: "Python", pct: 95 },
      { name: "TypeScript", pct: 82 },
      { name: "C / C++", pct: 74 },
      { name: "R", pct: 68 },
    ],
  },
  {
    label: "ML / Frameworks",
    items: [
      { name: "PyTorch", pct: 93 },
      { name: "JAX", pct: 76 },
      { name: "TensorFlow", pct: 80 },
      { name: "Hugging Face", pct: 85 },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { name: "Kubernetes", pct: 70 },
      { name: "CUDA / GPU", pct: 78 },
      { name: "PostgreSQL", pct: 80 },
      { name: "Linux / HPC", pct: 88 },
    ],
  },
];

const publications = [
  {
    type: "Conference Paper · NeurIPS 2025",
    title: "Adaptive Sparse Attention Mechanisms for Low-Resource Scientific Reasoning",
    meta: "Veerababu Jakkula, et al. · Neural Information Processing Systems 2025",
  },
  {
    type: "Journal Article · Nature Machine Intelligence",
    title: "Scalable Graph-Based Knowledge Distillation for Biomedical Data Informatics",
    meta: "Jakkula V., Wilsy AI Lab · Nature MI, Vol 7, Issue 3",
  },
  {
    type: "Workshop · ICML 2024",
    title: "Toward Interpretable Reinforcement Learning Policies in Collaborative Research Environments",
    meta: "Veerababu Jakkula · Structured Probabilistic Inference Workshop, ICML 2024",
  },
  {
    type: "Preprint · arXiv 2024",
    title: "Federated Learning Under Resource Constraints: A Unified Framework",
    meta: "Jakkula V., Wilsy Computational Intelligence Lab · arXiv:2408.xxxxx",
  },
];

export default function PrincipalInvestigatorProfile() {
  return (
    <main id="main" className="pi-page">
      {/* ──────── HERO ──────── */}
      <section className="pi-hero">
        <div className="container">
          <div className="pi-hero-grid">
            {/* Avatar */}
            <div className="pi-avatar-wrap">
              <div className="pi-avatar">
                VJ
                <div className="pi-avatar-ring" />
              </div>
              <div className="pi-verified-badge" title="Verified Principal Investigator">
                <CheckCircle size={14} />
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="pi-hero-meta">
                <span className="pi-role-pill">Principal Investigator</span>
                <span className="pi-uni-tag">Wilsy University</span>
              </div>

              <h1 className="pi-name">Veerababu Jakkula</h1>

              <p className="pi-title-line">
                <strong>Department of Computer Science & Artificial Intelligence</strong>
                {" "}· Wilsy University
              </p>

              <p className="pi-tagline">
                Advancing research at the intersection of machine learning, distributed systems, and
                human-centric AI. Building the next generation of intelligent systems grounded in
                scientific rigour and real-world impact.
              </p>

              <div className="pi-cta-row">
                <a
                  href="mailto:veerababu.jakkula@wilsy.edu"
                  className="pi-btn-primary"
                  id="contact-pi-btn"
                >
                  <Mail size={15} />
                  Contact Me
                </a>
                <a
                  href="#research"
                  className="pi-btn-outline"
                  id="research-areas-btn"
                >
                  <FlaskConical size={15} />
                  Research Areas
                </a>
                <a
                  href="#publications"
                  className="pi-btn-outline"
                  id="publications-btn"
                >
                  <BookOpen size={15} />
                  Publications
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── STATS ──────── */}
      <section className="pi-stats-strip">
        <div className="container">
          <div className="pi-stats-grid">
            <div className="pi-stat-item">
              <div className="pi-stat-value">10+</div>
              <div className="pi-stat-label">Years in Research</div>
            </div>
            <div className="pi-stat-item">
              <div className="pi-stat-value">24</div>
              <div className="pi-stat-label">Publications</div>
            </div>
            <div className="pi-stat-item">
              <div className="pi-stat-value">4</div>
              <div className="pi-stat-label">Research Domains</div>
            </div>
            <div className="pi-stat-item">
              <div className="pi-stat-value">12</div>
              <div className="pi-stat-label">Lab Members</div>
            </div>
            <div className="pi-stat-item">
              <div className="pi-stat-value">₹4.2Cr</div>
              <div className="pi-stat-label">Active Grants</div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── ABOUT / BIO ──────── */}
      <section className="pi-section">
        <div className="container">
          <div className="pi-about-grid">
            {/* Bio Text */}
            <div className="pi-bio-text">
              <div className="pi-section-label">About</div>
              <h2 className="pi-section-heading">The researcher behind the work.</h2>

              <p>
                I am <strong>Veerababu Jakkula</strong>, a Principal Investigator at{" "}
                <strong>Wilsy University</strong>, where I lead the Computational Intelligence Lab
                within the Department of Computer Science & AI. My work sits at the frontier of
                machine learning theory, large-scale data systems, and intelligent interface design.
              </p>
              <p>
                I believe rigorous science and practical impact are not opposites — the best
                research changes how people think and what they can build. My lab works on problems
                that matter: adaptive AI that works under real constraints, data infrastructure for
                scientific discovery, and tools that make research more collaborative and transparent.
              </p>
              <p>
                Beyond publishing, I mentor postdoctoral researchers, graduate students, and
                undergraduates — investing in the next generation of scientists who will shape the
                direction of this field.
              </p>
            </div>

            {/* Info Cards */}
            <div className="pi-info-stack">
              <div className="pi-info-card">
                <div className="pi-info-icon"><MapPin size={17} /></div>
                <div>
                  <div className="pi-info-label">Location</div>
                  <div className="pi-info-value">Wilsy University Campus</div>
                  <div className="pi-info-sub">India</div>
                </div>
              </div>

              <div className="pi-info-card">
                <div className="pi-info-icon"><Award size={17} /></div>
                <div>
                  <div className="pi-info-label">Current Position</div>
                  <div className="pi-info-value">Principal Investigator</div>
                  <div className="pi-info-sub">Computational Intelligence Lab · Wilsy University</div>
                </div>
              </div>

              <div className="pi-info-card">
                <div className="pi-info-icon"><GraduationCap size={17} /></div>
                <div>
                  <div className="pi-info-label">Education</div>
                  <div className="pi-info-value">Ph.D., Computer Science</div>
                  <div className="pi-info-sub">Wilsy University Graduate School</div>
                </div>
              </div>

              <div className="pi-info-card">
                <div className="pi-info-icon"><Calendar size={17} /></div>
                <div>
                  <div className="pi-info-label">Research ID</div>
                  <div className="pi-info-value" style={{ fontFamily: "monospace", letterSpacing: "0.05em", fontSize: "13px" }}>
                    WU-CI-PI-2024-VJ
                  </div>
                  <div className="pi-info-sub">Verified · Active Investigator</div>
                </div>
              </div>

              <div className="pi-info-card">
                <div className="pi-info-icon"><Globe size={17} /></div>
                <div>
                  <div className="pi-info-label">Lab Website</div>
                  <div className="pi-info-value">ci-lab.wilsy.edu</div>
                  <div className="pi-info-sub">Computational Intelligence Lab</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── RESEARCH AREAS ──────── */}
      <section id="research" className="pi-section">
        <div className="container">
          <div className="pi-section-label">Research</div>
          <h2 className="pi-section-heading">Core research areas.</h2>
          <p className="pi-section-desc">
            My lab operates across four interconnected domains, each pushing the boundaries of
            what intelligent systems can do and how humans interact with them.
          </p>

          <div className="pi-research-grid">
            {researchAreas.map((area) => (
              <div key={area.name} className="pi-research-card">
                <div className="pi-research-icon">{area.icon}</div>
                <div className="pi-research-name">{area.name}</div>
                <p className="pi-research-desc">{area.desc}</p>
                <div className="pi-research-tags">
                  {area.tags.map((t) => (
                    <span key={t} className="pi-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── SKILLS ──────── */}
      <section className="pi-section">
        <div className="container">
          <div className="pi-section-label">Technical Skills</div>
          <h2 className="pi-section-heading">Tools of the trade.</h2>
          <p className="pi-section-desc">
            A hands-on researcher who builds as well as theorizes — from GPU-accelerated training
            runs to production-ready scientific APIs.
          </p>

          <div className="pi-skills-grid">
            {skills.map((group) => (
              <div key={group.label} className="pi-skill-group">
                <div className="pi-skill-group-label">{group.label}</div>
                <div className="pi-skill-list">
                  {group.items.map((skill) => (
                    <div key={skill.name} className="pi-skill-item">
                      <span className="pi-skill-name">{skill.name}</span>
                      <div className="pi-skill-bar-track">
                        <div
                          className="pi-skill-bar-fill"
                          style={{ width: `${skill.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── TIMELINE ──────── */}
      <section className="pi-section">
        <div className="container">
          <div className="pi-section-label">Experience & Education</div>
          <h2 className="pi-section-heading">A decade in science.</h2>
          <p className="pi-section-desc">
            From undergraduate halls to leading an independent lab — building expertise with
            every paper, every experiment, and every student mentored.
          </p>

          <div className="pi-timeline">
            {timeline.map((item, i) => (
              <div key={i} className="pi-timeline-item">
                <div className="pi-timeline-dot">
                  {i === 0 ? <Award size={16} /> : i === timeline.length - 1 ? <GraduationCap size={16} /> : <Briefcase size={16} />}
                </div>
                <div className="pi-timeline-content">
                  <div className="pi-timeline-year">{item.year}</div>
                  <div className="pi-timeline-title">{item.title}</div>
                  <div className="pi-timeline-sub">{item.sub}</div>
                  <p className="pi-timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── PUBLICATIONS ──────── */}
      <section id="publications" className="pi-section">
        <div className="container">
          <div className="pi-section-label">Publications</div>
          <h2 className="pi-section-heading">Selected research output.</h2>
          <p className="pi-section-desc">
            Published across top-tier venues in machine learning, data science, and systems research.
          </p>

          <div className="pi-pub-list">
            {publications.map((pub, i) => (
              <div key={i} className="pi-pub-item">
                <div className="pi-pub-type">
                  <BookOpen size={13} />
                  {pub.type}
                </div>
                <div className="pi-pub-title">{pub.title}</div>
                <div className="pi-pub-meta">{pub.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── CONTACT CTA ──────── */}
      <section className="pi-contact-section">
        <div className="container">
          <div className="pi-contact-card">
            <div className="pi-section-label" style={{ justifyContent: "center" }}>Get In Touch</div>
            <h2 className="pi-contact-heading">Let's collaborate.</h2>
            <p className="pi-contact-sub">
              I welcome inquiries from fellow researchers, prospective graduate students,
              industry partners, and funding bodies interested in collaborative work.
            </p>

            <div className="pi-contact-links">
              <a
                href="mailto:veerababu.jakkula@wilsy.edu"
                className="pi-contact-email"
                id="contact-email-link"
              >
                veerababu.jakkula@wilsy.edu
              </a>
            </div>

            <div className="pi-contact-socials">
              <a href="#" className="pi-social-link" title="GitHub" id="github-link">
                <GitBranch size={18} />
              </a>
              <a href="#" className="pi-social-link" title="LinkedIn" id="linkedin-link">
                <Link2 size={18} />
              </a>
              <a href="#" className="pi-social-link" title="Google Scholar" id="scholar-link">
                <BookOpen size={18} />
              </a>
              <a href="#" className="pi-social-link" title="Personal Website" id="website-link">
                <Globe size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
