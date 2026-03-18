import projects from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 px-6 md:px-12 lg:px-24"
      aria-labelledby="projects-heading"
    >
      {/* Subtle dot-grid background overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #67e8f9 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-12 flex flex-col gap-2">
          <span className="font-mono text-sm font-semibold uppercase tracking-widest text-cyan-400">
            // work
          </span>
          <h2
            id="projects-heading"
            className="text-3xl font-bold tracking-tight text-white md:text-4xl"
          >
            Projects
          </h2>
          <p className="mt-1 max-w-xl text-sm text-zinc-400 leading-relaxed">
            A selection of things I&apos;ve built. Featured projects are highlighted
            with a neon border.
          </p>
        </div>

        {/* Grid */}
        {projects.length === 0 ? (
          /* Empty state — visible during development */
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 py-24 text-center">
            <span className="font-mono text-3xl">{"{ }"}</span>
            <p className="font-mono text-sm text-zinc-500">
              No projects yet — add entries to{" "}
              <code className="text-cyan-400">data/projects.ts</code>
            </p>
          </div>
        ) : (
          <ul
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Project list"
          >
            {projects.map((project) => (
              <li key={project.title}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
