"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface FormFields {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!fields.message.trim()) {
    errors.message = "Message is required.";
  } else if (fields.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

// Shared input/textarea class builder
const inputBase = [
  "w-full rounded-md border bg-zinc-900 px-4 py-3",
  "font-mono text-sm text-zinc-100 placeholder-zinc-600",
  "outline-none transition-colors duration-150",
  "border-zinc-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40",
].join(" ");

const errorBase = "mt-1.5 font-mono text-xs text-red-400";

export default function ContactForm() {
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string>("");

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear the inline error for the field being edited
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = (await res.json()) as { success: boolean; error?: string };

      if (data.success) {
        setStatus("success");
        setFields({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setServerError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerError("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-cyan-400/30 bg-cyan-400/5 px-8 py-14 text-center">
        <CheckCircle className="h-10 w-10 text-cyan-400" aria-hidden="true" />
        <h3 className="font-mono text-lg font-semibold text-white">
          Message sent!
        </h3>
        <p className="text-sm text-zinc-400">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 font-mono text-xs text-cyan-400 underline underline-offset-4 hover:text-cyan-300 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400"
        >
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          value={fields.name}
          onChange={handleChange}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          aria-invalid={!!errors.name}
          className={`${inputBase} ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""}`}
        />
        {errors.name && (
          <p id="contact-name-error" role="alert" className={errorBase}>
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400"
        >
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@example.com"
          value={fields.email}
          onChange={handleChange}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          aria-invalid={!!errors.email}
          className={`${inputBase} ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""}`}
        />
        {errors.email && (
          <p id="contact-email-error" role="alert" className={errorBase}>
            {errors.email}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder="Tell me about your project…"
          value={fields.message}
          onChange={handleChange}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          aria-invalid={!!errors.message}
          className={`${inputBase} resize-none ${errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""}`}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className={errorBase}>
            {errors.message}
          </p>
        )}
      </div>

      {/* Server-level error */}
      {status === "error" && serverError && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 font-mono text-sm text-red-400"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {serverError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className={[
          "mt-1 inline-flex items-center justify-center gap-2 rounded-md px-6 py-3",
          "font-mono text-sm font-semibold tracking-wide text-zinc-900",
          "bg-cyan-400 transition-all duration-200",
          "hover:bg-cyan-300 hover:shadow-[0_0_20px_0_rgba(34,211,238,0.45)]",
          "disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
        ].join(" ")}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
