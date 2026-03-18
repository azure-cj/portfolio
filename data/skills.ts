export type SkillCategory = "Frontend" | "Backend" | "DevOps" | "Tools";

export interface Skill {
  name: string;
  category: SkillCategory;
}

const skills: Skill[] = [
  // Frontend
  { name: "React",       category: "Frontend" },
  { name: "Next.js",     category: "Frontend" },
  { name: "TypeScript",  category: "Frontend" },
  { name: "Tailwind CSS",category: "Frontend" },
  { name: "Vue 3",       category: "Frontend" },

  // Backend
  { name: "Node.js",     category: "Backend" },
  { name: "Express",     category: "Backend" },
  { name: "PostgreSQL",  category: "Backend" },
  { name: "Prisma",      category: "Backend" },
  { name: "Supabase",    category: "Backend" },

  // DevOps
  { name: "Docker",      category: "DevOps" },
  { name: "Vercel",      category: "DevOps" },
  { name: "GitHub Actions", category: "DevOps" },

  // Tools
  { name: "Git",         category: "Tools" },
  { name: "Figma",       category: "Tools" },
  { name: "Postman",     category: "Tools" },
];

export default skills;
