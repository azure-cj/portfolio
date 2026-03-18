"use client";

import { useState } from "react";
import projects, { type ProjectCategory } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

type FilterTab = "All" | ProjectCategory;
const TABS: FilterTab[] = ["All", "Website", "Mobile", "Desktop", "Design"];

export default function ProjectsPage() {
  const [active, setActive] = useState<FilterTab>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>

      {/* ── Page hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b px-6 py-28 md:px-16 lg:px-24"
        style={{ borderColor: "var(--border)" }}
      >
        {/* Blob */}
        <div
          className="blob"
          style={{
            width: 400, height: 400,
            background: "#b9ff4b",
            top: -80, right: -80,
            filter: "blur(120px)",
            opacity: 0.14,
          }}
        />

        <div className="relative z-10 max-w-3xl">
          <p
            className="mb-4 font-jetbrains text-xs tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            [ MY WORK ]
          </p>
          <h1
            className="font-syne font-black text-6xl leading-none text-[#f5f5f5]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Things We&apos;ve
            <br />
            <span className="word-highlight">Built.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm" style={{ color: "var(--muted)" }}>
            A collection of projects across web, mobile, and design.
          </p>

          {/* Filter tabs */}
          <nav aria-label="Filter by category" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {TABS.map((tab) => (
                <li key={tab}>
                  <button
                    type="button"
                    onClick={() => setActive(tab)}
                    className="rounded-full px-5 py-2 font-jetbrains text-xs transition-all duration-150"
                    style={
                      active === tab
                        ? {
                            background: "var(--accent)",
                            color: "#0a0a0a",
                            border: "1px solid var(--accent)",
                            fontWeight: 700,
                          }
                        : {
                            background: "transparent",
                            color: "var(--muted)",
                            border: "1px solid var(--border)",
                          }
                    }
                    onMouseEnter={(e) => {
                      if (active !== tab) {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                        (e.currentTarget as HTMLElement).style.color = "#d4d4d4";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (active !== tab) {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                        (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                      }
                    }}
                    aria-pressed={active === tab}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ── Projects grid ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-16 lg:px-24">
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border py-24 text-center"
            style={{ border: "1px dashed var(--border)" }}
          >
            <span className="font-syne text-3xl text-[#f5f5f5]">{"{ }"}</span>
            <p className="font-jetbrains text-sm" style={{ color: "var(--muted)" }}>
              No projects in this category yet.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <li key={project.title}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
