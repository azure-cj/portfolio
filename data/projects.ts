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
  },
];

export default projects;
