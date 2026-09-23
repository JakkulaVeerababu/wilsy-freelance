"use client";
import { motion, useReducedMotion } from "motion/react";
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduce ? {} : { y: [28, 0], opacity: [0.25, 1] }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SentenceReveal({ text }: { text: string }) {
  const reduce = useReducedMotion();
  return (
    <span className="sentence-reveal">
      <span className="visually-hidden">{text}</span>
      {text.split(" ").map((word, index) => (
        <span
          className="sentence-word"
          aria-hidden="true"
          key={`${word}-${index}`}
        >
          <motion.span
            initial={false}
            whileInView={reduce ? {} : { y: ["105%", "0%"], opacity: [0, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.85,
              delay: index * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>{" "}
        </span>
      ))}
    </span>
  );
}
