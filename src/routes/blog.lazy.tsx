import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/blog")({
  component: Blog,
});

function Blog() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-2">
        <h1 className="font-semibold text-3xl sm:text-4xl">Blog</h1>
        <p>Unbelievably, these are my thoughts.</p>
      </div>
      <div className="text-lg sm:text-2xl pt-4">
        <Link
          className="hover:underline"
          to={`/blogs/$id`}
          params={{ id: "1" }}
        >
          You should give Linux a shot
        </Link>
      </div>
    </div>
  );
}
