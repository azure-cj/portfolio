"use client";

import { useEffect, useRef, useState } from "react";
import type { Skill } from "@/data/skills";

interface SkillBadgeProps {
  skill: Skill;
  delay?: number;
}

export default function SkillBadge({ skill, delay = 0 }: SkillBadgeProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={["skill-badge rounded-xl px-4 py-2 font-jetbrains text-sm cursor-default select-none transition-all duration-200", visible ? "skill-badge--visible" : ""].join(" ")}
      style={{
        background: hovered ? "var(--accent-dim)" : "var(--surface)",
        border: `1px solid ${hovered ? "var(--accent-glow)" : "var(--border)"}`,
        color: hovered ? "var(--accent)" : "var(--muted)",
        animationDelay: `${delay}ms`,
      }}
    >
      {hovered && <span aria-hidden="true" style={{ color: "var(--accent)" }}>· </span>}
      {skill.name}
    </span>
  );
}
