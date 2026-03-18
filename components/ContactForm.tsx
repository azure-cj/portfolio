"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface FormFields { name: string; email: string; message: string; }
interface FormErrors { name?: string; email?: string; message?: string; }
type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: FormFields): FormErrors {
  const e: FormErrors = {};
  if (!f.name.trim())                      e.name    = "Name is required.";
  if (!f.email.trim())                     e.email   = "Email is required.";
  else if (!EMAIL_RE.test(f.email.trim())) e.email   = "Enter a valid email.";
  if (!f.message.trim())                   e.message = "Message is required.";
  else if (f.message.trim().length < 10)   e.message = "At least 10 characters.";
  return e;
}

const labelCls = "block font-jetbrains text-xs uppercase tracking-wider mb-2";
const inputBase = [
  "w-full bg-transparent pb-3 pt-1 font-jetbrains text-sm text-[#f5f5f5]",
  "placeholder:text-zinc-700 outline-none transition-colors duration-200",
  "border-b border-zinc-800 focus:border-[var(--accent)]",
].join(" ");
const errCls = "mt-1.5 font-jetbrains text-xs text-red-400";

export default function ContactForm() {
  const [fields, setFields] = useState<FormFields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverErr, setServerErr] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormErrors])
      setErrors((p) => ({ ...p, [name]: undefined }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("loading"); setServerErr("");
    try {
      const res  = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fields) });
      const data = await res.json() as { success: boolean; error?: string };
      if (data.success) { setStatus("success"); setFields({ name: "", email: "", message: "" }); }
      else { setStatus("error"); setServerErr(data.error ?? "Something went wrong."); }
    } catch { setStatus("error"); setServerErr("Network error. Please try again."); }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <CheckCircle className="h-10 w-10" style={{ color: "var(--accent)" }} />
        <p className="font-syne font-bold text-xl text-[#f5f5f5]">Message sent!</p>
        <p className="font-jetbrains text-sm" style={{ color: "var(--muted)" }}>We&apos;ll get back to you soon.</p>
        <button type="button" onClick={() => setStatus("idle")}
          className="font-jetbrains text-xs underline underline-offset-4 transition-colors"
          style={{ color: "var(--accent)" }}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
      {/* Name */}
      <div>
        <label htmlFor="cf-name" className={labelCls} style={{ color: "var(--muted)" }}>Name</label>
        <input id="cf-name" name="name" type="text" autoComplete="name" placeholder="Jane Smith"
          value={fields.name} onChange={handleChange} aria-invalid={!!errors.name} className={inputBase} />
        {errors.name && <p role="alert" className={errCls}>{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="cf-email" className={labelCls} style={{ color: "var(--muted)" }}>Email</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" placeholder="jane@example.com"
          value={fields.email} onChange={handleChange} aria-invalid={!!errors.email} className={inputBase} />
        {errors.email && <p role="alert" className={errCls}>{errors.email}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className={labelCls} style={{ color: "var(--muted)" }}>Message</label>
        <textarea id="cf-message" name="message" rows={5} placeholder="Tell us about your project…"
          value={fields.message} onChange={handleChange} aria-invalid={!!errors.message}
          className={`${inputBase} resize-none`} />
        {errors.message && <p role="alert" className={errCls}>{errors.message}</p>}
      </div>

      {/* Server error */}
      {status === "error" && serverErr && (
        <div role="alert" className="flex items-center gap-2 rounded-lg border px-4 py-3 font-jetbrains text-sm text-red-400"
          style={{ borderColor: "rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)" }}>
          <AlertCircle className="h-4 w-4 shrink-0" />{serverErr}
        </div>
      )}

      {/* Submit */}
      <button type="submit" disabled={status === "loading"}
        className="w-full rounded-xl py-4 font-syne font-bold text-sm text-black transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
        style={{ background: "var(--accent)" }}
        onMouseEnter={(e) => {
          if (status !== "loading") {
            (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px var(--accent-glow)";
          }
        }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />Sending…
          </span>
        ) : "Send Message"}
      </button>
    </form>
  );
}
