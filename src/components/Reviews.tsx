import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { reviews } from "@/data/reviews";
import { Review } from "@/types/types";

const ReviewCard: React.FC<{ review: Review; delay: number }> = ({
  review,
  delay,
}) => {
  return (
    <Link to={`/reviews/${review.id}`}>
      <motion.div
        className="relative overflow-hidden rounded-lg hover:shadow-lg transition-shadow bg-background/60 backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay }}
      >
        <div className="p-6 space-y-4">
          {review.coverImage && (
            <img
              src={review.coverImage}
              alt={`${review.title} cover`}
              className="w-full h-48 object-cover rounded-md"
            />
          )}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                {review.type}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-xl font-semibold">{review.title}</h3>
            {review.artist && (
              <p className="text-muted-foreground">{review.artist}</p>
            )}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {review.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {review.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function Reviews() {
  const [filter, setFilter] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Add this line to get unique types from reviews
  const types = Array.from(new Set(reviews.map((review) => review.type)));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="">
      <Card className="w-full bg-background/60 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
        <CardHeader>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">reviews</h2>
            <div className="flex gap-2">
              {types.map((type) => (
                <Badge
                  key={type}
                  variant={filter === type ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setFilter(filter === type ? null : type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews
              .filter((review) => !filter || review.type === filter)
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((review, index) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  delay={index * 0.1}
                />
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
