import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import matter from "gray-matter";

import type { BlogPost } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Parsing Markdown Content and Extracting Frontmatter
export function parseMarkdown(id: string, content: string): BlogPost {
  try {
    const { data, content: markdownContent } = matter(content);
    return {
      id,
      title: data.title || "Untitled",
      date: data.date || "Unknown Date",
      description: data.description || "",
      tags: data.tags || [],
      content: markdownContent,
    };
  } catch (error) {
    console.error(`Error parsing markdown for ${id}:`, error);
    throw error;
  }
}
