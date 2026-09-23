"use client";

import { useEffect, useRef } from "react";
import {
  SquareCode,
  Sparkles,
  Workflow,
  AppWindow,
  Command,
  CircleCheck,
  Box,
  GitBranch,
  Grid2X2Plus,
  SlidersHorizontal,
  SearchCode,
  Folder,
} from "lucide-react";

const items = [
  {
    title: "Web design",
    detail: "Distinctive digital experiences",
    icon: SquareCode,
  },
  { title: "AI solutions", detail: "Thoughtful automation", icon: Sparkles },
  { title: "Workflows", detail: "Connected business systems", icon: Workflow },
  {
    title: "Digital products",
    detail: "Interfaces made for people",
    icon: AppWindow,
  },
  { title: "Integrations", detail: "Tools that work together", icon: Command },
  {
    title: "Quality assurance",
    detail: "Careful testing before launch",
    icon: CircleCheck,
  },
  { title: "E-commerce", detail: "A better way to shop", icon: Box },
  { title: "Engineering", detail: "Maintainable code", icon: GitBranch },
  {
    title: "Design systems",
    detail: "Consistency in every detail",
    icon: Grid2X2Plus,
  },
  {
    title: "Optimization",
    detail: "Refine what matters",
    icon: SlidersHorizontal,
  },
  {
    title: "SEO foundations",
    detail: "Built to be discovered",
    icon: SearchCode,
  },
  { title: "Ongoing care", detail: "Support for what's next", icon: Folder },
];

export function CapabilityRibbon() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = host.current;
    if (!root) return;
    const cards = Array.from(
      root.querySelectorAll<HTMLElement>(".ribbon-card"),
    );
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      previous = 0,
      offset = 0,
      waveTime = 0,
      visible = true;
    let spacing = 108;
    let amplitude = 42;
    let wavelength = items.length * spacing;

    function measure() {
      const compact = window.innerWidth <= 760;
      spacing = compact ? 100 : 108;
      amplitude = compact ? 30 : 42;
      wavelength = items.length * spacing;
    }
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(root);

    function render(timestamp: number) {
      const delta = previous
        ? Math.min((timestamp - previous) / 1000, 0.05)
        : 0;
      previous = timestamp;
      const total = cards.length * spacing;
      if (!preference.matches) {
        offset = (offset + delta * 26 + total) % total;
        waveTime += delta * 0.55;
      }
      cards.forEach((card, index) => {
        const x = ((index * spacing - offset + total) % total) - spacing;
        const wave = (x / wavelength) * Math.PI * 2 + waveTime;
        const y = preference.matches ? 0 : Math.sin(wave) * amplitude;
        const scale = preference.matches
          ? 1
          : 0.96 + Math.abs(Math.sin(wave)) * 0.04;
        card.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      });
      frame =
        visible &&
        !document.hidden &&
        !preference.matches
          ? requestAnimationFrame(render)
          : 0;
    }

    function start() {
      if (!frame && visible && !document.hidden) {
        previous = 0;
        frame = requestAnimationFrame(render);
      }
    }
    function refresh() {
      cancelAnimationFrame(frame);
      frame = 0;
      start();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refresh();
    });
    observer.observe(root);
    preference.addEventListener("change", refresh);
    document.addEventListener("visibilitychange", refresh);
    start();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      preference.removeEventListener("change", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  return (
    <section className="capability-ribbon" aria-label="Wilsy capabilities">
      <ul className="ribbon-accessible">
        {items.map((item) => (
          <li key={item.title}>
            {item.title}: {item.detail}
          </li>
        ))}
      </ul>

      <div className="ribbon-window" ref={host} aria-hidden="true">
        {Array.from({ length: 3 }, (_, copy) =>
          items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                className="ribbon-card"
                title={`${item.title} — ${item.detail}`}
                key={`${copy}-${item.title}`}
                style={{
                  transform: `translate3d(calc(${copy * items.length + i - 1} * var(--ribbon-spacing)),0,0)`,
                }}
              >
                <span className="ribbon-icon">
                  <Icon size={28} strokeWidth={1.5} />
                </span>
              </div>
            );
          }),
        )}
      </div>
    </section>
  );
}
