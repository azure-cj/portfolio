"use client";

import ContactForm from "@/components/ContactForm";
import { Github } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-6 py-28 md:px-16 lg:px-24"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_auto_1fr]">

          {/* ── Left column ──────────────────────────────────────────────── */}
          <div className="flex flex-col justify-center">
            <p className="font-jetbrains text-xs tracking-widest mb-4" style={{ color: "var(--muted)" }}>
              [ GET IN TOUCH ]
            </p>
            <h2
              className="font-syne font-black text-5xl text-[#f5f5f5] leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Let&apos;s{" "}
              <span className="word-highlight">Work</span>
              <br />
              Together.
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Open for freelance and full-time opportunities. Let&apos;s
              build something great together.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://github.com/nodeshift"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{ color: "var(--muted)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
                className="transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Vertical divider */}
          <div
            className="hidden self-stretch md:block"
            style={{ width: 1, background: "var(--border)", margin: "0 2rem" }}
            aria-hidden="true"
          />

          {/* ── Right column — form ───────────────────────────────────────── */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
