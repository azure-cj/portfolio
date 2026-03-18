"use client";

import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, stack, category, image, github, live, featured } = project;
  const placeholder = `https://placehold.co/600x340/141414/b9ff4b?text=${encodeURIComponent(title)}`;

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(185,255,75,0.25)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px var(--accent-glow)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "";
      }}
    >
      {/* Featured vertical accent bar */}
      {featured && (
        <div
          className="absolute left-0 top-0 z-10 h-full w-1"
          style={{
            background: "var(--accent)",
            boxShadow: "inset 2px 0 12px var(--accent-glow)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Screenshot */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={image ?? placeholder}
          alt={`${title} screenshot`}
          fill
          unoptimized={!image || image.startsWith("https://placehold.co")}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Category badge */}
        <span
          className="absolute right-3 top-3 rounded-full px-3 py-1 font-jetbrains text-xs backdrop-blur-sm"
          style={{
            background: "rgba(0,0,0,0.7)",
            color: "var(--accent)",
            border: "1px solid var(--accent-dim)",
          }}
        >
          {category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-syne font-bold text-lg text-[#f5f5f5]">{title}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          {description}
        </p>

        {/* Stack as dot-separated string */}
        <p className="mt-3 font-jetbrains text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          {stack.join(" · ")}
        </p>

        {/* Bottom row */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} GitHub`}
                style={{ color: "var(--muted)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
                className="transition-colors duration-200"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} live site`}
                style={{ color: "var(--muted)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
                className="transition-colors duration-200"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-jetbrains text-xs underline-offset-2 hover:underline transition-colors duration-200"
              style={{ color: "var(--accent)" }}
            >
              View →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
