import { Project } from "@/types/types";

/* export interface Project {
    id: string;
    title: string;
    description: string;
    link: string;
    technologies: string[];
    githubLink?: string;
    demoLink?: string;
    fullDescription?: string;
    screenshots?: Array<{
      url: string;
      caption: string;
    }>;
    features?: string[];
    challenges?: string[];
    learnings?: string[];
  } */

export const projects: Project[] = [
  {
    id: "punks",
    title: "punks",
    description: "progressive, user-friendly navigator for kits and samples",
    link: "https://github.com/samanshaiza004/punks",
    technologies: ["TypeScript", "Electron", "React", "Audio"],
    githubLink: "https://github.com/samanshaiza004/punks",
    screenshots: [
      {
        url: "https://utfs.io/f/59HxlDoACmIkdZHZbVD8L5YXlbcM4NZpRxUKBW3EmAwrjDIT",
        caption: "punks screenshot 1",
      },
      {
        url: "https://utfs.io/f/59HxlDoACmIkGCkJi9FXp107bg8YzOHmMSrtD2VcwQEA4qlP",
        caption: "punks screenshot 1",
      },
    ],
    features: [
      "Browse through audio sample libraries",
      "Preview samples quickly before deciding to use them.",
      "Drag and drop samples into a Digital Audio Workstation (DAW).",
    ],
  },
  {
    id: "fortunadws",
    title: "FortunaDWS",
    description: "High-performance web server built with C++ and Boost.ASIO",
    link: "https://github.com/samanshaiza004/fortunadws",
    githubLink: "https://github.com/samanshaiza004/fortunadws",
    technologies: ["C++", "Boost.ASIO", "Networking"],
    fullDescription:
      "FortunaDWS is a custom web server built from scratch in C++ with a focus on high-performance, event-driven, asynchronous I/O. The project is designed to handle multiple client connections simultaneously while maintaining a responsive and efficient architecture. By leveraging non-blocking I/O and event loops, the server aims to provide a scalable and robust foundation for web services.",

    features: [
      "Multi-threaded request handling",
      "Configurable routing system",
      "Static file serving",
    ],
    challenges: ["Implementing thread-safe logging", "Optimizing memory usage"],
    learnings: [
      "Advanced C++ memory management",
      "Network programming patterns",
    ],
  },
  // Add more projects here
];
