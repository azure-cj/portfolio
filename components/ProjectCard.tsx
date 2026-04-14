"use client";

import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import type { MouseEvent } from "react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onOpenProject?: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenProject }: ProjectCardProps) {
  const { title, description, stack, category, image, github, live, featured } = project;
  const placeholder = `https://placehold.co/600x340/141414/b9ff4b?text=${encodeURIComponent(title)}`;
  const isModalTrigger = typeof onOpenProject === "function";

  const cardBody = (
    <>
      {featured ? (
        <div
          className="absolute left-0 top-0 z-10 h-full w-1"
          style={{
            background: "var(--accent)",
            boxShadow: "inset 2px 0 12px var(--accent-glow)",
          }}
          aria-hidden="true"
        />
      ) : null}

      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={image ?? placeholder}
          alt={`${title} screenshot`}
          fill
          unoptimized={!image || image.startsWith("https://placehold.co")}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
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

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-syne text-lg font-bold text-[#f5f5f5]">{title}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          {description}
        </p>

        <p className="mt-3 font-jetbrains text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          {stack.join(" / ")}
        </p>

        {isModalTrigger ? (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex min-h-4 gap-3" aria-hidden="true">
              {github ? (
                <span style={{ color: "var(--muted)" }}>
                  <Github className="h-4 w-4" />
                </span>
              ) : null}
              {live ? (
                <span style={{ color: "var(--muted)" }}>
                  <ExternalLink className="h-4 w-4" />
                </span>
              ) : null}
            </div>
            <span className="font-jetbrains text-xs transition-colors duration-200" style={{ color: "var(--accent)" }}>
              View Details -&gt;
            </span>
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-3">
              {github ? (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} GitHub`}
                  style={{ color: "var(--muted)" }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = "var(--muted)";
                  }}
                  className="transition-colors duration-200"
                >
                  <Github className="h-4 w-4" />
                </a>
              ) : null}
              {live ? (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} live site`}
                  style={{ color: "var(--muted)" }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = "var(--muted)";
                  }}
                  className="transition-colors duration-200"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
            {live ? (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="font-jetbrains text-xs underline-offset-2 transition-colors duration-200 hover:underline"
                style={{ color: "var(--accent)" }}
              >
                View -&gt;
              </a>
            ) : null}
          </div>
        )}
      </div>
    </>
  );

  const sharedClassName = [
    "group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1",
    isModalTrigger
      ? "w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const sharedStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
  };

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.borderColor = "rgba(185,255,75,0.25)";
    event.currentTarget.style.boxShadow = "0 8px 32px var(--accent-glow)";
  };

  const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.borderColor = "var(--border)";
    event.currentTarget.style.boxShadow = "";
  };

  if (isModalTrigger) {
    return (
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`Open details for ${title}`}
        className={sharedClassName}
        style={sharedStyle}
        onClick={() => onOpenProject?.(project)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {cardBody}
      </button>
    );
  }

  return (
    <article
      className={sharedClassName}
      style={sharedStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {cardBody}
    </article>
  );
}
