export interface Project {
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
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
}
