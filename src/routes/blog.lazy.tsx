import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/blog")({
  component: Blog,
});

function Blog() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-2">
        <h1 className="font-bold text-4xl sm:text-4xl my-4">Blog</h1>
        <p className="mt-8 text-gray-300">
          Unbelievably, these are my thoughts.
        </p>
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
