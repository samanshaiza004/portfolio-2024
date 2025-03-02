import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { reviews } from "@/data/reviews";
import { Badge } from "@/components/ui/badge";
import { Card } from "../ui/card";
import { Review } from "@/types/types";

export function ReviewPost() {
  const { reviewId } = useParams();
  const review = reviews.find((r) => r.id === reviewId);
  const [ReviewComponent, setReviewComponent] =
    useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (reviewId) {
      // Convert kebab-case to PascalCase for component name
      const componentName =
        reviewId
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join("") + "Review";

      // Dynamically import the review component
      import(`./${componentName}`)
        .then((module) => {
          setReviewComponent(() => module.default);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load review component:", err);
          setError(true);
          setLoading(false);
        });
    }
  }, [reviewId]);

  if (!review) {
    return <Navigate to="/404" replace />;
  }

  if (loading) {
    return (
      <Card className="bg-background/60 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
          <p>Loading review...</p>
        </div>
      </Card>
    );
  }

  if (error || !ReviewComponent) {
    // Fallback to the old rendering method if component doesn't exist
    return <FallbackReviewContent review={review} />;
  }

  // Render the dynamically imported component
  return <ReviewComponent />;
}

// Fallback component that uses the old HTML content approach
const FallbackReviewContent = ({ review }: { review: Review }) => {
  const motionPreferences = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  const shouldReduceMotion = motionPreferences.matches;

  const containerVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <Card className="bg-background/60 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <motion.article
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-8 max-w-4xl"
      >
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-3xl font-bold mb-3">
            {review.title}
          </h1>
          {review.artist && (
            <h2 className="text-2xl text-muted-foreground mb-8">
              {review.artist}
            </h2>
          )}
          {review.coverImage && (
            <div className="flex justify-center items-center">
              <img
                src={review.coverImage}
                alt={`${review.title} cover`}
                className="w-64 h-64 object-cover rounded-md"
              />
            </div>
          )}
        </header>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-2 mb-6 justify-center"
        >
          {review.tags.map((tag: string) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-thin select-none"
            >
              {tag}
            </Badge>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-2xl mb-4">Overview</h3>
          <p className="text-muted-foreground">{review.description}</p>
        </motion.div>

        {review.content && (
          <motion.div
            variants={itemVariants}
            className="max-w-none"
            dangerouslySetInnerHTML={{ __html: review.content }}
          />
        )}

        <motion.div
          variants={itemVariants}
          className="text-3xl text-center my-8"
        >
          Rating: ({review.rating}/10)
        </motion.div>
      </motion.article>
    </Card>
  );
};

export default ReviewPost;
