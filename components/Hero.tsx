"use client";

import Link from "next/link";

const MARQUEE_WORDS = "FULL STACK DEVELOPER · NEXT.JS · REACT · NODE.JS · AVAILABLE FOR WORK · ";
const STATS = [
  { value: "4+", label: "Years of Experience" },
  { value: "7", label: "Projects Delivered" },
  { value: "7", label: "Satisfied Clients" },
];

export default function Hero() {
  return (
    <>
      {/* ── Hero section ─────────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 md:px-16 lg:px-24"
        aria-label="Hero"
      >
        {/* Blob 1 — top left */}
        <div
          className="blob"
          style={{
            width: 500, height: 500,
            background: "#b9ff4b",
            top: -100, left: -100,
            filter: "blur(120px)",
            opacity: 0.18,
          }}
        />
        {/* Blob 2 — bottom right */}
        <div
          className="blob"
          style={{
            width: 400, height: 400,
            background: "#b9ff4b",
            bottom: -80, right: -80,
            filter: "blur(120px)",
            opacity: 0.14,
          }}
        />

        {/* Vertical social handle — left edge */}
        <div
          className="absolute hidden flex-col items-center gap-3 lg:flex"
          style={{ left: -55, bottom: "38%", transform: "rotate(-90deg)" }}
          aria-hidden="true"
        >
          <span className="font-jetbrains text-xs text-zinc-600 whitespace-nowrap">
            @nodeshift.dev
          </span>
          <div className="h-16 w-px bg-zinc-800" style={{ transform: "rotate(90deg)" }} />
        </div>

        {/* ── Main content ───────────────────────────────────────────────── */}
        <div className="relative z-10 max-w-5xl">

          {/* 1 — Badge */}
          <div className="animate-fade-up mb-8 flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "var(--accent)", animation: "pulse-dot 2s ease-in-out infinite" }}
            />
            <span className="font-jetbrains text-xs tracking-widest text-zinc-400 uppercase">
              Available for Work
            </span>
          </div>

          {/* 2 — Oversized 3-line heading */}
          <h1
            className="font-syne font-black leading-none"
            style={{ letterSpacing: "-0.04em", fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            <span className="animate-fade-up-d1 block text-[#f5f5f5]">
              Complex <span className="word-highlight">Problems.</span>
            </span>
            <span className="animate-fade-up-d2 block text-[#f5f5f5]">
              Smart <span className="word-accent">Solutions.</span>
            </span>
          </h1>

          {/* 3 — Two-column row */}
          <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            {/* Bio */}
            <p
              className="animate-fade-up-d4 max-w-sm text-base leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              A two-person full-stack team turning complex product ideas into
              fast, polished, and scalable web applications.
            </p>

            {/* Stats */}
            <div className="animate-fade-up-d5 flex items-center">
              {STATS.map(({ value, label }, idx) => (
                <div
                  key={label}
                  className="flex flex-col items-center px-8"
                  style={{
                    borderLeft: idx > 0 ? "1px solid var(--border)" : undefined,
                  }}
                >
                  <span
                    className="font-syne font-black text-3xl text-[#f5f5f5]"
                    style={{ textShadow: "0 0 20px var(--accent-glow)" }}
                  >
                    {value}
                  </span>
                  <span className="font-jetbrains text-xs uppercase tracking-wider mt-1"
                    style={{ color: "var(--muted)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4 — CTAs */}
          <div className="animate-fade-up-d6 mt-10">
            <Link
              href="/projects"
              className="rounded-full font-syne font-bold text-sm px-7 py-4 text-black transition-all duration-200"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 0 0 var(--accent-glow)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px var(--accent-glow)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.filter = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 var(--accent-glow)";
              }}
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* ── Lime marquee strip ────────────────────────────────────────────── */}
      <div
        className="overflow-hidden py-3"
        style={{ background: "var(--accent)" }}
        aria-hidden="true"
      >
        <div className="marquee-track">
          {[MARQUEE_WORDS, MARQUEE_WORDS].map((text, i) => (
            <span
              key={i}
              className="whitespace-nowrap pr-8 font-jetbrains text-xs font-bold uppercase tracking-widest"
              style={{ color: "#0a0a0a" }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
