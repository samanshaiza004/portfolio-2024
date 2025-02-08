import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

interface Review {
  id: string;
  title: string;
  artist?: string;
  type: "music" | "game" | "movie" | "show" | "book";
  description: string;
  rating: number;
  date: string;
  coverImage?: string;
  tags: string[];
}
const reviews: Review[] = [
  {
    id: "nurture",
    title: "Nurture",
    artist: "Porter Robinson",
    type: "music",
    description:
      "A masterful blend of electronic production and organic instrumentation, creating a deeply personal and emotionally resonant experience.",
    rating: 9.5,
    date: "2024-01-15",
    coverImage:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fedm.com%2F.image%2Ft_share%2FMTgwNTE1MDU3Mzg0MzAxOTI4%2Fporterrobinson-nurture-album-cover-1-1611778054-scaled-1.jpg",
    tags: ["electronic", "ambient", "pop"],
  },
  // Add more reviews here
];

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
                {review.type.toUpperCase()}
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
              <span className="font-semibold">{review.rating}/10</span>
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
