export type ProjectCategory = "Website" | "Mobile" | "Desktop" | "Design";

export interface Project {
  title: string;
  description: string;
  stack: string[];
  category: ProjectCategory;
  image?: string;
  github?: string;
  live?: string;
  featured?: boolean;
}

const projects: Project[] = [
  // --- Featured ---
  {
    title: "Gesture Mouse",
    description:
      "Control your desktop with your hands. Uses a standard webcam to track hand movements and translate them into mouse coordinates and click events, eliminating the need for physical hardware.",
    stack: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    category: "Desktop",
    image: "https://placehold.co/600x340/141414/b9ff4b?text=Gesture+Mouse",
    github: "https://github.com/nodeshift/gesture-mouse",
    featured: true,
  },
  {
    title: "Moneda",
    description:
      "A Filipino-focused personal finance PWA targeting freelancers, students, and fresh graduates. Built with an emotional narrative-driven design sensibility, offering clean UX and reliable performance.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Chart.js",
      "PWA",
      "WebSockets",
    ],
    category: "Website",
    image: "https://placehold.co/600x340/141414/b9ff4b?text=Moneda",
    live: "https://moneda-nine.vercel.app",
    featured: true,
  },
  {
    title: "Vince — Real-Time Team Workspace",
    description:
      "A lightweight, real-time collaboration app for small freelance teams and student groups (2–6 people). Combines a 5-column kanban board, shared notes, group chat, and an activity feed into one focused workspace — no bloat, no enterprise overhead. Built to help small teams get clarity and move work forward.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Zustand",
      "dnd-kit",
      "shadcn/ui",
      "Framer Motion",
    ],
    category: "Website",
    image: "https://placehold.co/600x340/141414/b9ff4b?text=Vince",
    github: "https://github.com/imainzed5",
    live: "https://vince-app.dev",
    featured: true,
  },
  // --- Other Projects ---
  {
    title: "Sahagun Dental Care Services",
    description:
      "A fully responsive, professional landing page for a dental clinic in Camarin, Caloocan. Features a clean, modern UI with smooth animations, scroll-triggered reveals, and an inquiry form with Formspree backend integration.",
    stack: ["HTML5", "CSS3", "Vanilla JavaScript", "Formspree API"],
    category: "Website",
    image: "https://placehold.co/600x340/141414/b9ff4b?text=Sahagun+Dental",
    github: "https://github.com/imainzed5/sahagun-dental-care",
    live: "https://sahagun-dental-care.vercel.app",
  },
  {
    title: "Pc-Part-Picker",
    description:
      "A PC Part Picker mobile app using Kotlin and SQLite that checks the compatibility of PC parts to guide users on building a PC.",
    stack: ["Kotlin", "SQLite", "Android Studio"],
    category: "Mobile",
    image: "https://placehold.co/600x340/141414/b9ff4b?text=PC+Part+Picker",
    github: "https://github.com/nodeshift/Pc-part-picker_proj",
  },
  {
    title: "ColorDetector",
    description:
      "A mobile app for color detection — scans the color of any object you point at with your phone's camera and identifies it in real time.",
    stack: ["Kotlin", "Android Camera API", "SQLite"],
    category: "Mobile",
    image: "https://placehold.co/600x340/141414/b9ff4b?text=ColorDetector",
    github: "https://github.com/nodeshift/ColorDetectorApp",
  },
  {
    title: "Empire Fitness",
    description:
      "Gym management website for Empire Fitness Camarin, Caloocan City — member tracking, schedules, and admin dashboard.",
    stack: ["PHP", "MySQL", "HTML", "CSS"],
    category: "Website",
    image: "https://placehold.co/600x340/141414/b9ff4b?text=Empire+Fitness",
    github: "https://github.com/nodeshift/empire-fitness",
  },
  {
    title: "NU FV Lost & Found",
    description:
      "Lost and Found website for National University Fairview — lets students report and claim lost items with an admin moderation panel.",
    stack: ["PHP", "MySQL", "HTML", "CSS"],
    category: "Website",
    image: "https://placehold.co/600x340/141414/b9ff4b?text=NU+Lost+%26+Found",
    github: "https://github.com/nodeshift/nufv-lostandfound",
    live: "https://nufvlostandfound.wuaze.com/nufvLostAndFound/index.php?i=1",
  },
];

export default projects;
