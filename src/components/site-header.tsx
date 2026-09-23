"use client";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useRef } from "react";

const links = [
  ["Home", "/"],
  ["Work", "/#work"],
  ["Services", "/#services"],
  ["Process", "/#process"],
  ["About", "/#about"],
  ["Contact", "/#contact"],
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`logo ${light ? "logo-light" : ""}`}
      aria-label="Wilsy home"
    >
      wilsy<span className="logo-dot">.</span>
      <sup>™</sup>
    </Link>
  );
}

export function SiteHeader() {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([name, href]) => (
            <Link key={name} href={href}>
              {name}
            </Link>
          ))}
        </nav>
        <Link className="button button-blue header-cta" href="/start-project">
          Let’s talk <ArrowUpRight size={17} />
        </Link>
        <button
          className="menu-button"
          aria-label="Open navigation"
          onClick={() => dialog.current?.showModal()}
        >
          <Menu />
        </button>
      </div>
      <dialog ref={dialog} className="mobile-dialog">
        <div className="mobile-dialog-top">
          <Logo />
          <button
            className="icon-button"
            aria-label="Close navigation"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map(([name, href], i) => (
            <a onClick={() => dialog.current?.close()} key={name} href={href}>
              <span>0{i + 1}</span>
              {name}
              <ArrowUpRight />
            </a>
          ))}
        </nav>
        <Link
          onClick={() => dialog.current?.close()}
          href="/start-project"
          className="button button-blue"
        >
          Start a project <ArrowUpRight size={18} />
        </Link>
      </dialog>
    </header>
  );
}
