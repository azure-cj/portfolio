export type SkillCategory = "Frontend" | "Backend" | "DevOps" | "Tools";

export interface Skill {
  name: string;
  category: SkillCategory;
  /** Emoji or short string shown before the skill name */
  icon?: string;
}

const skills: Skill[] = [];

export default skills;
