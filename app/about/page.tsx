"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import SkillBadge from "@/components/SkillBadge";
import type { Skill } from "@/data/skills";

// TODO: Replace placeholder images with real photos
// Add CJ's photo as:   /public/images/cj.jpg   → src="/images/cj.jpg"
// Add Lord's photo as: /public/images/lord.jpg  → src="/images/lord.jpg"

const SHARED_SKILLS: Skill[] = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "MongoDB", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "Java", category: "Backend" },
  { name: "PHP", category: "Backend" },
  { name: "Git", category: "Tools" },
  { name: "Vercel", category: "Tools" },
  { name: "Figma", category: "Tools" },
];

interface SpecialtyCard {
  variant: "accent" | "dark";
  title: string;
  content: string;
}

interface Developer {
  id: string;
  role: string;
  name: string;
  bio: string;
  photo: string;
  cards: [SpecialtyCard, SpecialtyCard];
  contactHref: string;
}

const DEVELOPERS: Developer[] = [
  {
    id: "cj",
    role: "FULL STACK · PROJECT MANAGER",
    name: "— CJ",
    bio: "Full Stack Developer turning complex requirements into polished, production-ready digital products across the entire stack.",
    photo: "https://placehold.co/400x500/141414/b9ff4b?text=CJ",
    cards: [
      { variant: "accent", title: "DEVELOPMENT", content: "Next.js, React, Node.js, MongoDB" },
      { variant: "dark", title: "MANAGEMENT", content: "Project Planning, Git Flow, Vercel, Agile" },
    ],
    contactHref: "/contact",
  },
  {
    id: "lord",
    role: "FULL STACK DEVELOPER",
    name: "— LORD",
    bio: "Full Stack Developer specialized in building robust, production-ready digital products. From designing secure, high-throughput backend systems to crafting high-fidelity frontend interfaces, I focus on creating seamless data flow and superior user interactions across the full application stack.",
    photo: "https://placehold.co/400x500/141414/b9ff4b?text=LORD",
    cards: [
      { variant: "accent", title: "STACK", content: "React, Next.js, Node.js, TypeScript" },
      { variant: "dark", title: "TOOLS", content: "MongoDB, PostgreSQL, Tailwind, Figma" },
    ],
    contactHref: "/contact",
  },
];

function DeveloperCard({ dev, delay }: { dev: Developer; delay: number }) {
  return (
    <article
      className="animate-fade-up overflow-hidden rounded-3xl"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        animationDelay: `${delay}s`,
        animationFillMode: "both",
      }}
    >
      <div className="flex flex-col md:flex-row">
        {/* ── Photo column ───────────────────────────────────────────────── */}
        <div
          className="relative flex-shrink-0 md:w-[38%]"
          style={{ background: "#1a1a1a", minHeight: 320 }}
        >
          <Image
            src={dev.photo}
            alt={`${dev.name} photo`}
            fill
            unoptimized
            className="object-cover"
            style={{ borderRight: "1px solid var(--border)" }}
            sizes="(max-width: 768px) 100vw, 38vw"
          />
          {/* Accent glow ring overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 0 1px rgba(185,255,75,0.12)" }}
            aria-hidden="true"
          />
        </div>

        {/* ── Info column ────────────────────────────────────────────────── */}
        <div className="flex flex-1 flex-col justify-between p-8 md:p-10">

          {/* Top block */}
          <div>
            <p
              className="font-jetbrains text-xs tracking-[0.2em] uppercase"
              style={{ color: "var(--accent)" }}
            >
              {dev.role}
            </p>
            <h2
              className="mt-1 font-jetbrains font-black text-[#f5f5f5]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em", lineHeight: 1 }}
            >
              {dev.name}
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
              {dev.bio}
            </p>

            {/* Education */}
            <div className="border-t my-4" style={{ borderColor: "var(--border)" }} />
            <div className="flex items-center gap-3">
              <GraduationCap size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
              <div>
                <p className="font-jetbrains text-[10px] tracking-widest uppercase text-zinc-600">Education</p>
                <p className="font-jetbrains text-xs text-zinc-300 font-medium">NU Fairview</p>
              </div>
            </div>
          </div>

          {/* Specialty cards */}
          <div
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "0.35s" }}
          >
            {dev.cards.map(({ variant, title, content }) =>
              variant === "accent" ? (
                <div
                  key={title}
                  className="flex-1 rounded-2xl p-5"
                  style={{ background: "var(--accent)" }}
                >
                  <p className="font-jetbrains text-xs font-bold tracking-wider uppercase text-black">
                    {title}
                  </p>
                  <p className="mt-2 text-sm font-bold text-black leading-relaxed">
                    {content}
                  </p>
                </div>
              ) : (
                <div
                  key={title}
                  className="flex-1 rounded-2xl p-5"
                  style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <p
                    className="font-jetbrains text-xs font-bold tracking-wider uppercase"
                    style={{ color: "var(--accent)" }}
                  >
                    {title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{content}</p>
                </div>
              )
            )}
          </div>

          {/* Bottom CTA row */}
          <div className="mt-8 flex items-center gap-4">
            <Link
              href={dev.contactHref}
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
              aria-label="Get in touch"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent-dim)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
              }}
            >
              <ArrowUpRight size={18} style={{ color: "var(--accent)" }} />
            </Link>
            <Link
              href={dev.contactHref}
              className="font-jetbrains text-sm text-[#f5f5f5] transition-colors duration-200 hover:text-[var(--accent)]"
            >
              Get In Touch
            </Link>
            {/* Available badge */}
            <div className="ml-auto flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "var(--accent)", animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <span className="font-jetbrains text-xs text-zinc-500">Available</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="px-6 pb-16 pt-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-jetbrains text-xs tracking-widest" style={{ color: "var(--accent)" }}>
            [ THE TEAM ]
          </p>
          <h1
            className="mt-3 font-syne font-black text-5xl text-[#f5f5f5]"
            style={{ letterSpacing: "-0.03em" }}
          >
            The Developers
          </h1>
          <p className="mt-3 text-base text-zinc-500">
            Two developers. One vision. Endless builds.
          </p>
          <div
            className="mt-4 h-0.5 w-10 rounded"
            style={{ background: "var(--accent)", boxShadow: "0 0 12px var(--accent-glow)" }}
          />
        </div>
      </div>

      {/* ── Developer cards ───────────────────────────────────────────────── */}
      <div className="px-6 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl flex flex-col gap-0">

          <DeveloperCard dev={DEVELOPERS[0]} delay={0.1} />

          {/* "& also" divider */}
          <div className="relative flex items-center py-6" aria-hidden="true">
            <div className="flex-1" style={{ borderTop: "1px solid var(--border)" }} />
            <span
              className="mx-4 font-jetbrains text-xs text-zinc-700"
              style={{ background: "var(--bg)", padding: "0 1rem" }}
            >
              &amp; also
            </span>
            <div className="flex-1" style={{ borderTop: "1px solid var(--border)" }} />
          </div>

          <DeveloperCard dev={DEVELOPERS[1]} delay={0.25} />
        </div>
      </div>

      {/* ── Combined tech stack ───────────────────────────────────────────── */}
      <div className="px-6 py-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <p
            className="mb-6 text-center font-jetbrains text-xs tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            [ COMBINED TECH STACK ]
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {SHARED_SKILLS.map((skill, i) => (
              <li key={skill.name}>
                <SkillBadge skill={skill} delay={i * 40} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── CTA strip ─────────────────────────────────────────────────────── */}
      <div
        className="px-6 py-12 text-center"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <p className="font-syne font-black text-3xl text-[#f5f5f5]">
          Want to work with us?
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          We&apos;re open for freelance and collaboration.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-xl px-7 py-4 font-syne font-bold text-sm text-black transition-all duration-200"
          style={{ background: "var(--accent)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px var(--accent-glow)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "";
            (e.currentTarget as HTMLElement).style.boxShadow = "";
          }}
        >
          Start a Project →
        </Link>
      </div>

    </div>
  );
}
