import projects, { getProjectsWithFeaturedFirst } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  const orderedProjects = getProjectsWithFeaturedFirst(projects);

  return (
    <section id="projects" className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Projects
          </h2>
          <div className="mt-2 h-1 w-16 rounded" style={{ background: "var(--accent)" }} />
        </div>

        {/* Grid */}
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {orderedProjects.map((project) => (
            <li key={project.title}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
