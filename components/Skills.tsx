import skills, { type SkillCategory } from "@/data/skills";
import SkillBadge from "@/components/SkillBadge";

const CATEGORIES: SkillCategory[] = ["Frontend", "Backend", "DevOps", "Tools"];

// Two-column split
const LEFT_CATS:  SkillCategory[] = ["Frontend", "Backend"];
const RIGHT_CATS: SkillCategory[] = ["DevOps", "Tools"];

function SkillGroup({ category, items }: { category: SkillCategory; items: typeof skills }) {
  if (items.length === 0) return null;
  return (
    <div className="mb-10">
      <p
        className="mb-3 font-jetbrains text-xs uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,0.15)" }}
      >
        // {category.toLowerCase()}
      </p>
      <ul className="flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <li key={skill.name}>
            <SkillBadge skill={skill} delay={i * 40} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  const grouped = CATEGORIES.reduce<Record<SkillCategory, typeof skills>>(
    (acc, cat) => { acc[cat] = skills.filter((s) => s.category === cat); return acc; },
    { Frontend: [], Backend: [], DevOps: [], Tools: [] }
  );

  return (
    <section id="skills" className="px-6 py-28 md:px-16 lg:px-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <p className="font-jetbrains text-xs tracking-widest mb-4" style={{ color: "var(--muted)" }}>
            [ TECH STACK ]
          </p>
          <h2
            className="font-syne font-black text-5xl text-[#f5f5f5] leading-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            Tech{" "}
            <span className="word-highlight">Stack</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            {LEFT_CATS.map((cat) => (
              <SkillGroup key={cat} category={cat} items={grouped[cat]} />
            ))}
          </div>
          <div>
            {RIGHT_CATS.map((cat) => (
              <SkillGroup key={cat} category={cat} items={grouped[cat]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
