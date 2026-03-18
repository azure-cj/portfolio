"use client";

import { useEffect, useRef, useState } from "react";
import type { Skill } from "@/data/skills";

interface SkillBadgeProps {
  skill: Skill;
  /** Stagger delay in ms so badges animate in sequence */
  delay?: number;
}

export default function SkillBadge({ skill, delay = 0 }: SkillBadgeProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small timeout honours the stagger delay without blocking the thread
          const t = setTimeout(() => setVisible(true), delay);
          observer.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span
      ref={ref}
      title={skill.name}
      className={[
        // Base pill
        "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5",
        "font-mono text-sm font-medium select-none cursor-default",
        // Colours
        "border-zinc-700 bg-zinc-900 text-zinc-300",
        // Hover accent
        "transition-colors duration-200",
        "hover:border-cyan-400/70 hover:text-cyan-300 hover:bg-cyan-400/5",
        // Scroll-reveal animation wired via CSS class toggled by IO
        "skill-badge",
        visible ? "skill-badge--visible" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ animationDelay: `${delay}ms` }}
    >
      {skill.icon && (
        <span aria-hidden="true" className="text-base leading-none">
          {skill.icon}
        </span>
      )}
      {skill.name}
    </span>
  );
}
