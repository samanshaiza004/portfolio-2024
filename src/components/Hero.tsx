// components/Hero.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroProps {
  name: string;
  pronunciation: string;
  description: string;
  isMobile: boolean;
  imageUrl: string;
}

export function Hero({
  name,
  pronunciation,
  description,
  isMobile,
  imageUrl,
}: HeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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

  return (
    <motion.section
      className="min-h-[60vh] flex flex-col justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-6 md:p-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {name}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {pronunciation}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 max-w-[42rem] text-lg md:text-xl text-muted-foreground"
          >
            <p>{description}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="group" asChild>
              <a
                href="https://github.com/samanshaiza004"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-5 w-5" />
                GitHub
                <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="group" asChild>
              <Link to={"/contact"}>
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
                <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-30 scale-150" />

              {/* Image wrapper with mask */}
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                  <img
                    src={imageUrl}
                    alt={`${name} profile`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Decorative circle */}
                <div className="absolute -inset-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-full animate-spin-slow" />
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
