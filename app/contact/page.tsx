"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

/* ── Validation helpers ───────────────────────────────────────────────────── */
function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

interface FormState {
  name: string;
  email: string;
  message: string;
}
interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate(): boolean {
    const e: Errors = {};
    if (!form.name.trim())            e.name    = "Name is required.";
    if (!form.email.trim())           e.email   = "Email is required.";
    else if (!validateEmail(form.email)) e.email = "Please enter a valid email.";
    if (!form.message.trim())         e.message = "Message is required.";
    else if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--accent)] outline-none text-white placeholder:text-zinc-700 font-jetbrains text-sm pb-3 pt-1 transition-colors duration-200";
  const labelClass = "font-jetbrains text-xs tracking-widest uppercase text-zinc-500 mb-2 block";
  const errorClass = "font-jetbrains text-xs text-red-400 mt-1";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_1.4fr]">

          {/* ── Left column ─────────────────────────────────────────────── */}
          <div className="md:sticky md:top-24 self-start">
            <p
              className="font-jetbrains text-xs tracking-[0.25em] uppercase mb-5"
              style={{ color: "var(--accent)" }}
            >
              [ GET IN TOUCH ]
            </p>

            {/* Heading */}
            <h1
              className="font-jetbrains font-black text-[#f5f5f5] leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
            >
              Let&apos;s{" "}
              <span
                style={{
                  display: "inline-block",
                  border: "2px solid #f5f5f5",
                  padding: "0 12px 4px",
                  borderRadius: 6,
                  lineHeight: 1.15,
                }}
              >
                Work
              </span>
              <br />
              Together.
            </h1>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              Open for freelance and full-time opportunities.
              Let&apos;s build something great together.
            </p>

            <div className="my-6 border-t" style={{ borderColor: "var(--border)" }} />

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              {[
                { icon: <Mail   size={16} />, text: "christopheraureo18@gmail.com",               href: "mailto:christopheraureo18@gmail.com" },
                { icon: <Phone  size={16} />, text: "09270658576",                                 href: "tel:09270658576" },
                { icon: <MapPin size={16} />, text: "Camarin, Caloocan City",                      href: null },
              ].map(({ icon, text, href }) => (
                <div key={text} className="flex items-center gap-3">
                  <span style={{ color: "var(--accent)" }}>{icon}</span>
                  {href ? (
                    <a href={href} className="font-jetbrains text-xs text-zinc-400 hover:text-white transition-colors duration-200">
                      {text}
                    </a>
                  ) : (
                    <span className="font-jetbrains text-xs text-zinc-400">{text}</span>
                  )}
                </div>
              ))}
              {/* Facebook */}
              <div className="flex items-center gap-3">
                <span style={{ color: "var(--accent)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </span>
                <a
                  href="https://www.facebook.com/christopher.aureo.1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-jetbrains text-xs text-zinc-400 hover:text-white transition-colors duration-200 underline-offset-2 hover:underline"
                >
                  Christopher Aureo
                </a>
              </div>
            </div>

            {/* Response time badge */}
            <div
              className="mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{
                background: "var(--accent-dim)",
                border: "1px solid var(--border)",
              }}
            >
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ background: "var(--accent)" }}
              />
              <span className="font-jetbrains text-xs" style={{ color: "var(--accent)" }}>
                Usually responds within 24hrs
              </span>
            </div>
          </div>

          {/* ── Right column — form ──────────────────────────────────────── */}
          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <span className="text-4xl">✓</span>
                <p className="font-jetbrains text-sm" style={{ color: "var(--accent)" }}>
                  Message sent! We&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="font-jetbrains text-xs text-zinc-500 hover:text-white transition-colors mt-2 underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
                {/* Name */}
                <div>
                  <label htmlFor="name" className={labelClass}>Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={inputClass}
                    autoComplete="name"
                  />
                  {errors.name && <p className={errorClass}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={inputClass}
                    autoComplete="email"
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelClass}>Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className={`${inputClass} resize-none`}
                  />
                  {errors.message && <p className={errorClass}>{errors.message}</p>}
                </div>

                {/* Error state */}
                {status === "error" && (
                  <p className="font-jetbrains text-xs text-red-400">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-xl py-4 font-jetbrains text-sm font-black tracking-wider uppercase text-black transition-all duration-200 mt-2"
                  style={{
                    background: "var(--accent)",
                    opacity: status === "loading" ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "loading") {
                      (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px var(--accent-glow)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.filter = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                >
                  {status === "loading" ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
