"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section
      className="relative overflow-hidden px-6 py-32 text-center md:px-16 lg:px-24"
      style={{ background: "var(--bg-alt)" }}
    >
      {/* Blob */}
      <div
        className="blob"
        style={{
          width: 600, height: 300,
          background: "#b9ff4b",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(150px)",
          opacity: 0.12,
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl flex flex-col items-center gap-6">
        <p className="font-jetbrains text-xs tracking-widest" style={{ color: "var(--muted)" }}>
          [ READY? ]
        </p>
        <h2
          className="font-syne font-black text-5xl text-[#f5f5f5] leading-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          Ready to build
          <br />
          something{" "}
          <span className="word-accent">great?</span>
        </h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Open for freelance and full-time opportunities.
        </p>
        <Link
          href="/contact"
          className="rounded-full font-syne font-bold text-sm px-8 py-4 text-black transition-all duration-200"
          style={{ background: "var(--accent)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px var(--accent-glow)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "";
            (e.currentTarget as HTMLElement).style.boxShadow = "";
          }}
        >
          Get In Touch
        </Link>
      </div>
    </section>
  );
}
