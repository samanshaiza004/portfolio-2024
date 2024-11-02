import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/posts";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown, { Components, ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ClassAttributes, HTMLAttributes } from "react";
import { Highlight } from "prism-react-renderer";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

export function BlogPost() {
  const { postId } = useParams();
  const post = blogPosts.find((p) => p.id === postId);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const markdownComponents: Components = {
    code: ({
      inline,
      className,
      children,
      ...props
    }: {
      inline?: boolean; // Add this line
    } & ClassAttributes<HTMLElement> &
      HTMLAttributes<HTMLElement> &
      ExtraProps) => {
      const match = /language-(\w+)/.exec(className || "");

      if (!inline && match) {
        const language = match[1];
        return (
          <Highlight
            code={String(children).replace(/\n$/, "")}
            language={language}
            theme={{
              plain: {
                color: "#F8F8F2",
                backgroundColor: "#282A36",
              },
              styles: [
                {
                  types: ["prolog", "constant", "builtin"],
                  style: {
                    color: "#FF79C6",
                  },
                },
                {
                  types: ["inserted", "function"],
                  style: {
                    color: "#50FA7B",
                  },
                },
                {
                  types: ["deleted"],
                  style: {
                    color: "#FF5555",
                  },
                },
                {
                  types: ["changed"],
                  style: {
                    color: "#FFB86C",
                  },
                },
                {
                  types: ["punctuation", "symbol"],
                  style: {
                    color: "#F8F8F2",
                  },
                },
                {
                  types: ["string", "char", "tag", "selector"],
                  style: {
                    color: "#FF79C6",
                  },
                },
                {
                  types: ["keyword", "variable"],
                  style: {
                    color: "#BD93F9",
                    fontStyle: "italic",
                  },
                },
                {
                  types: ["comment"],
                  style: {
                    color: "#6272A4",
                  },
                },
                {
                  types: ["attr-name"],
                  style: {
                    color: "#50FA7B",
                  },
                },
              ],
            }}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={cn(
                  className,
                  "p-4 rounded-lg overflow-x-auto text-sm my-4"
                )}
                style={style}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    <span className="text-gray-500 mr-4 select-none">
                      {i + 1}
                    </span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        );
      }

      return (
        <code
          className={cn("px-1.5 py-0.5 rounded-md bg-muted", className)}
          {...props}
        >
          {children}
        </code>
      );
    },
    a: ({ href, children, ...props }: React.ComponentPropsWithoutRef<"a">) => {
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          className={cn(
            "text-primary underline decoration-primary/30 underline-offset-2",
            "transition-all duration-200",
            "hover:decoration-primary/100 hover:text-primary/80",
            "inline-flex items-center gap-1"
          )}
          {...props}
        >
          {children}
          {isExternal && <ExternalLink className="h-3 w-3 inline-block" />}
        </a>
      );
    },
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
    ),
    p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/20 pl-4 italic mb-4 text-muted-foreground">
        {children}
      </blockquote>
    ),
  };

  return (
    <motion.article
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <motion.div
          variants={itemVariants}
          className="text-muted-foreground mb-4"
        >
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </motion.div>
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-thin select-none"
            >
              {tag}
            </Badge>
          ))}
        </motion.div>
      </header>

      <motion.div
        variants={itemVariants}
        className="prose dark:prose-invert max-w-none"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {post.content}
        </ReactMarkdown>
      </motion.div>
    </motion.article>
  );
}
