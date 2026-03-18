"use client";

import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="px-6 pb-6 pt-8 md:px-16 lg:px-24"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        {/* Left — name */}
        <div className="flex flex-col items-start">
          <span className="font-syne font-bold text-lg text-[#f5f5f5]">NodeShift</span>
          <span className="font-jetbrains text-xs mt-0.5" style={{ color: "var(--muted)" }}>
            Portfolio
          </span>
        </div>

        {/* Center */}
        <p className="font-jetbrains text-xs text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
          Designed &amp; Built by NodeShift · {new Date().getFullYear()}
        </p>

        {/* Right — icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/nodeshift"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NodeShift GitHub"
            className="transition-colors duration-200"
            style={{ color: "var(--muted)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f5f5f5")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
