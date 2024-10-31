import { parseMarkdown } from "@/lib/utils";

const modules = import.meta.glob("./blog/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const posts = Object.entries(modules).map(([path, content]) => {
  const id = path.split("/").pop()?.replace(".md", "") || "";
  return parseMarkdown(id, content as string);
});

export const blogPosts = posts.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
