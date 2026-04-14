"use client";

import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) =>
      !element.hasAttribute("disabled") &&
      !element.getAttribute("aria-hidden") &&
      element.getClientRects().length > 0,
  );
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const placeholder = `https://placehold.co/1200x680/141414/b9ff4b?text=${encodeURIComponent(project.title)}`;

  useEffect(() => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      setIsVisible(true);
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }

      const focusableElements = getFocusableElements(dialog);
      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (!activeElement || !dialog.contains(activeElement) || activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
        return;
      }

      if (!activeElement || !dialog.contains(activeElement) || activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;

      const previousFocus = previousFocusRef.current;
      if (previousFocus && document.contains(previousFocus)) {
        previousFocus.focus();
      }
    };
  }, [onClose]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6 md:p-8 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className={`relative my-auto flex max-h-[calc(100vh-2rem)] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border shadow-[0_24px_80px_rgba(0,0,0,0.55)] transition-all duration-200 ease-out ${
          isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.98] opacity-0"
        }`}
        style={{
          background: "#141414",
          borderColor: "var(--border)",
        }}
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close modal"
          className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border text-[#f5f5f5] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
          style={{
            background: "rgba(20,20,20,0.88)",
            borderColor: "var(--border)",
          }}
          onClick={onClose}
          onMouseEnter={(event) => {
            event.currentTarget.style.borderColor = "rgba(185,255,75,0.25)";
            event.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.borderColor = "var(--border)";
            event.currentTarget.style.color = "#f5f5f5";
          }}
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div
          className="relative aspect-[16/9] w-full shrink-0 overflow-hidden border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <Image
            src={project.image ?? placeholder}
            alt={`${project.title} screenshot`}
            fill
            unoptimized={!project.image || project.image.startsWith("https://placehold.co")}
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent" />
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 sm:bottom-5 sm:left-5">
            <span
              className="rounded-full px-3 py-1 font-jetbrains text-xs backdrop-blur-sm"
              style={{
                background: "rgba(0,0,0,0.72)",
                color: "var(--accent)",
                border: "1px solid var(--accent-dim)",
              }}
            >
              {project.category}
            </span>
            {project.featured ? (
              <span
                className="rounded-full px-3 py-1 font-jetbrains text-xs backdrop-blur-sm"
                style={{
                  background: "rgba(185,255,75,0.12)",
                  color: "#f5f5f5",
                  border: "1px solid rgba(185,255,75,0.24)",
                }}
              >
                Featured
              </span>
            ) : null}
          </div>
        </div>

        <div className="overflow-y-auto px-5 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-8">
          <h2
            id={titleId}
            className="font-syne text-4xl font-black leading-tight text-[#f5f5f5] sm:text-5xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            {project.title}
          </h2>

          <p
            id={descriptionId}
            className="mt-5 max-w-3xl text-sm leading-7 text-[#d4d4d4] sm:text-base"
          >
            {project.description}
          </p>

          <div className="mt-8">
            <p
              className="font-jetbrains text-[11px] tracking-[0.28em]"
              style={{ color: "var(--muted)" }}
            >
              [ TECH STACK ]
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full px-4 py-2 font-jetbrains text-xs"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    color: "var(--accent)",
                    border: "1px solid var(--accent-dim)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div
            className="mt-10 flex items-center justify-between gap-4 border-t pt-6"
            style={{ borderColor: "var(--border)" }}
          >
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-syne text-sm font-bold text-black transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
                style={{ background: "var(--accent)" }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.filter = "brightness(1.1)";
                  event.currentTarget.style.boxShadow = "0 8px 40px var(--accent-glow)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.filter = "";
                  event.currentTarget.style.boxShadow = "";
                }}
              >
                Visit Website
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <span
                className="inline-flex items-center rounded-full border px-4 py-2 font-jetbrains text-xs uppercase tracking-[0.2em]"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  color: "var(--muted)",
                  borderColor: "var(--border)",
                }}
              >
                No live demo
              </span>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
