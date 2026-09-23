"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowLeft,
  Search,
  Check,
  SlidersHorizontal,
} from "lucide-react";
import { OrbitPreview } from "./project-preview";

export function FormaConcept() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="forma-demo">
      <nav aria-label="Forma concept navigation">
        <span className="forma-demo-logo">forma✳</span>
        <div>
          <a href="#forma-work">Work</a>
          <a href="#forma-studio">Studio</a>
          <Link href="/start-project?service=custom-website">
            Start a conversation <ArrowUpRight size={15} />
          </Link>
        </div>
      </nav>
      <div className="forma-demo-heading">
        <span className="eyebrow">
          Architecture & interiors / A design concept
        </span>
        <h1>
          Spaces for
          <br />
          <em>better living.</em>
        </h1>
        <p>
          A quieter kind of architecture.
          <br />
          An intentional way to experience the everyday.
        </p>
      </div>
      <div className="forma-demo-photo" id="forma-work">
        <Image
          src="/images/forma-architecture.jpg"
          alt="A sunlit modern white house framed by trees"
          width={1600}
          height={1067}
          sizes="(max-width: 760px) 100vw, 90vw"
          priority
        />
        <div>
          <span>STUDY 001 / THE COURTYARD</span>
          <button
            aria-expanded={expanded}
            aria-controls="forma-study"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Close study" : "Explore the study"}
            <ArrowUpRight size={19} />
          </button>
        </div>
      </div>
      <div id="forma-study" className="forma-study" hidden={!expanded}>
        <span className="eyebrow">An architectural mood study</span>
        <h2>
          Light. Space.
          <br />A moment to pause.
        </h2>
        <p>
          This editorial layout explores how architecture photography, generous
          space, and restrained typography can shape a practice’s digital
          presence. The photograph is reference imagery; this is not an
          architectural commission or a Wilsy client project.
        </p>
      </div>
      <section className="forma-demo-studio" id="forma-studio">
        <span className="eyebrow">The idea behind the interface</span>
        <h2>
          A considered perspective.
          <br />
          In every detail.
        </h2>
        <p>
          Forma is an independent Wilsy design exploration. It demonstrates a
          possible visual direction for a studio that wants its work to lead the
          conversation.
        </p>
        <Link className="text-link" href="/work/forma">
          Read the design story
          <ArrowUpRight size={18} />
        </Link>
      </section>
    </div>
  );
}

const transactions = [
  { name: "Client payment", category: "Income", amount: 2400, date: "Jun 24" },
  {
    name: "Workspace subscription",
    category: "Expense",
    amount: -49,
    date: "Jun 23",
  },
  { name: "Design project", category: "Income", amount: 1600, date: "Jun 21" },
  { name: "Software tools", category: "Expense", amount: -85, date: "Jun 20" },
];
export function OrbitConcept() {
  const [filter, setFilter] = useState("All activity");
  const [search, setSearch] = useState("");
  const filtered = transactions.filter(
    (t) =>
      (filter === "All activity" || t.category === filter) &&
      t.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="orbit-demo">
      <div className="orbit-demo-heading">
        <span className="eyebrow blue-text">
          Orbit / An interface exploration
        </span>
        <h1>
          Your money,
          <br />
          <span>in focus.</span>
        </h1>
        <p>
          A calm workspace for the details that matter.
          <br />
          All figures below are illustrative demo data.
        </p>
      </div>
      <div
        className="orbit-demo-visual"
        aria-label="Orbit dashboard design preview"
      >
        <OrbitPreview />
      </div>
      <section className="transaction-demo">
        <div className="transaction-title">
          <h2>A clearer view of your activity.</h2>
          <span className="demo-data-tag">
            <Check size={12} /> Demo data only
          </span>
        </div>
        <div className="transaction-controls">
          <label className="demo-search">
            <Search size={17} />
            <span className="sr-only">Search transactions</span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find a transaction"
            />
          </label>
          <label className="demo-filter">
            <SlidersHorizontal size={16} />
            <span className="sr-only">Filter transactions</span>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              {["All activity", "Income", "Expense"].map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="demo-table-scroll">
          <table>
            <caption className="sr-only">Illustrative transactions</caption>
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Type</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.name}>
                  <td>{t.name}</td>
                  <td>
                    <span
                      className={`transaction-type ${t.category.toLowerCase()}`}
                    >
                      {t.category}
                    </span>
                  </td>
                  <td>{t.date}</td>
                  <td>
                    {t.amount > 0 ? "+" : "−"}$
                    {Math.abs(t.amount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="empty-transactions" role="status">
              No transactions match. Try another search or filter.
            </p>
          )}
        </div>
        <p className="form-hint" aria-live="polite">
          Showing {filtered.length} of {transactions.length} sample
          transactions.
        </p>
      </section>
    </div>
  );
}

export function ConceptShell({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <main id="main">
      <div className="concept-banner">
        <Link href={`/work/${name.toLowerCase()}`}>
          <ArrowLeft size={14} />
          Back to case study
        </Link>
        <span>{name} — Wilsy studio concept. Not a live business.</span>
      </div>
      {children}
    </main>
  );
}
