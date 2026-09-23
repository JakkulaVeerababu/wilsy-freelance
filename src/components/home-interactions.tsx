"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Plus, Minus } from "lucide-react";
import { services, process } from "@/lib/content";

export function ServiceList() {
  return (
    <div className="service-list">
      {services.map((service, i) => (
        <details
          className="service-item"
          key={service.id}
          open={i === 0 ? true : undefined}
        >
          <summary>
            <span className="service-number">0{i + 1}</span>
            <h3>{service.name}</h3>
            <Plus className="plus" size={22} />
            <Minus className="minus" size={22} />
          </summary>
          <div className="service-detail">
            <p>{service.description}</p>
            <div className="service-tags">
              {service.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <Link
              className="text-link"
              href={`/start-project?service=${service.id}`}
            >
              Let’s build it <ArrowUpRight size={18} />
            </Link>
          </div>
        </details>
      ))}
    </div>
  );
}

export function ProcessSteps() {
  const [active, setActive] = useState(0);
  return (
    <div className="process-interactive">
      <div
        className="process-tabs"
        role="tablist"
        aria-label="Our project process"
      >
        {process.map((step, i) => (
          <button
            id={`step-tab-${i}`}
            aria-controls={`step-panel-${i}`}
            aria-selected={active === i}
            role="tab"
            tabIndex={active === i ? 0 : -1}
            key={step.name}
            onKeyDown={(e) => {
              if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 5
                      : (active + (e.key === "ArrowRight" ? 1 : 5)) % 6;
                setActive(next);
                document.getElementById(`step-tab-${next}`)?.focus();
              }
            }}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            <span>{step.name}</span>
            <span className="step-dot" />
          </button>
        ))}
      </div>
      {process.map((step, i) => (
        <div
          key={step.name}
          id={`step-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`step-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
          className="process-panel"
        >
          <span className="process-big-number" aria-hidden="true">
            0{i + 1}
          </span>
          <div>
            <span className="eyebrow blue-text">{step.output}</span>
            <h3>
              {step.name}
              <span className="blue-text">.</span>
            </h3>
            <p>{step.description}</p>
            {i < 5 ? (
              <button className="text-link" onClick={() => setActive(i + 1)}>
                Next: {process[i + 1].name} <ArrowRight size={18} />
              </button>
            ) : (
              <Link className="text-link" href="/start-project">
                Let’s begin <ArrowUpRight size={18} />
              </Link>
            )}
          </div>
          <div className="process-diagram" aria-hidden="true">
            <div className="diagram-square">
              <span className="crosshair">+</span>
              <span className="diagram-label">YOUR VISION</span>
            </div>
            <ArrowRight />
            <div className="diagram-square solid">
              <span className="crosshair">✳</span>
              <span className="diagram-label">
                {
                  [
                    "OUR UNDERSTANDING",
                    "A CLEAR PLAN",
                    "YOUR EXPERIENCE",
                    "A WORKING PRODUCT",
                    "YOUR LAUNCH",
                    "WHAT’S NEXT",
                  ][i]
                }
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
