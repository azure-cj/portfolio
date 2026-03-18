export interface Project {
  title: string;
  description: string;
  stack: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

const projects: Project[] = [];

export default projects;
