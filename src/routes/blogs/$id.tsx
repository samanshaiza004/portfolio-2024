import { createFileRoute } from "@tanstack/react-router";
import MarkdownRenderer from "../../components/HtmlRenderer";
export const Route = createFileRoute("/blogs/$id")({
  component: Post,
  loader: async ({ params }) => {
    try {
      const res = await fetch(`/api/blogs/${params.id}.html`);
      const text = await res.text();
      if (!res.ok) {
        throw new Error("failed to load post");
      } else {
        console.log(res);
      }

      return text;
    } catch (err) {
      console.error("err loading post: ", err);
      return { content: "error loading post." };
    }
  },
});

function Post() {
  const post = Route.useLoaderData();

  if (!post) {
    return <div>loading...</div>;
  }
  return <MarkdownRenderer src={post as string} />;
}
