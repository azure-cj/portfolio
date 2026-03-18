import skills, { type SkillCategory } from "@/data/skills";
import SkillBadge from "@/components/SkillBadge";

const CATEGORY_ORDER: SkillCategory[] = [
  "Frontend",
  "Backend",
  "DevOps",
  "Tools",
];

/** Neon accent colour per category */
const CATEGORY_ACCENT: Record<SkillCategory, string> = {
  Frontend: "text-cyan-400",
  Backend:  "text-green-400",
  DevOps:   "text-violet-400",
  Tools:    "text-amber-400",
};

const CATEGORY_LABEL: Record<SkillCategory, string> = {
  Frontend: "// frontend",
  Backend:  "// backend",
  DevOps:   "// devops",
  Tools:    "// tools",
};

export default function Skills() {
  // Group skills by category, preserving display order
  const grouped = CATEGORY_ORDER.reduce<Record<SkillCategory, typeof skills>>(
    (acc, cat) => {
      acc[cat] = skills.filter((s) => s.category === cat);
      return acc;
    },
    { Frontend: [], Backend: [], DevOps: [], Tools: [] }
  );

  const hasAny = skills.length > 0;

  return (
    <section
      id="skills"
      className="relative py-24 px-6 md:px-12 lg:px-24"
      aria-labelledby="skills-heading"
    >
      {/* Subtle horizontal rule line at top */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-12 flex flex-col gap-2">
          <span className="font-mono text-sm font-semibold uppercase tracking-widest text-cyan-400">
            // stack
          </span>
          <h2
            id="skills-heading"
            className="text-3xl font-bold tracking-tight text-white md:text-4xl"
          >
            Skills
          </h2>
          <p className="mt-1 max-w-xl text-sm text-zinc-400 leading-relaxed">
            Technologies I work with, grouped by discipline.
          </p>
        </div>

        {!hasAny ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 py-24 text-center">
            <span className="font-mono text-3xl">{"[ ]"}</span>
            <p className="font-mono text-sm text-zinc-500">
              No skills yet — add entries to{" "}
              <code className="text-cyan-400">data/skills.ts</code>
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {CATEGORY_ORDER.map((category) => {
              const items = grouped[category];
              if (items.length === 0) return null;

              return (
                <div key={category} className="flex flex-col gap-3">
                  {/* Category label */}
                  <h3
                    className={`font-mono text-xs font-semibold uppercase tracking-widest ${CATEGORY_ACCENT[category]}`}
                  >
                    {CATEGORY_LABEL[category]}
                  </h3>

                  {/* Divider line */}
                  <div className="h-px w-full bg-zinc-800" />

                  {/* Badge row */}
                  <ul
                    className="flex flex-wrap gap-2 pt-1"
                    aria-label={`${category} skills`}
                  >
                    {items.map((skill, i) => (
                      <li key={skill.name}>
                        {/* Stagger: 40ms per badge, max ~600ms */}
                        <SkillBadge skill={skill} delay={i * 40} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
