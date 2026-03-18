"use client";

import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, stack, github, live, featured } = project;

  return (
    <article
      className={[
        // Base surface
        "relative flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6",
        // Hover lift
        "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40",
        // Featured glow — neon cyan ring
        featured
          ? "ring-2 ring-cyan-400/60 shadow-[0_0_24px_0_rgba(34,211,238,0.15)]"
          : "hover:border-zinc-700",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Featured badge */}
      {featured && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-widest text-cyan-400">
          ★ Featured
        </span>
      )}

      {/* Title */}
      <h3 className="font-mono text-lg font-bold text-white leading-snug pr-20">
        {title}
      </h3>

      {/* Description — clamp to 2 lines */}
      <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 flex-1">
        {description}
      </p>

      {/* Stack tags */}
      <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
        {stack.map((tech) => (
          <li
            key={tech}
            className="rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
          >
            {tech}
          </li>
        ))}
      </ul>

      {/* Links */}
      {(github || live) && (
        <div className="flex items-center gap-3 pt-1">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} GitHub repository`}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono text-zinc-400 border border-zinc-700 hover:border-zinc-500 hover:text-white transition-colors"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              Code
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} live site`}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono text-cyan-400 border border-cyan-400/40 hover:border-cyan-400 hover:bg-cyan-400/10 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Live
            </a>
          )}
        </div>
      )}
    </article>
  );
}
