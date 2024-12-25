import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface HeroProps {
  name: string;
  pronunciation: string;
  description: string;
  imageUrl: string;
}

export function Hero({
  name,
  pronunciation,
  description,
  imageUrl,
}: HeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      aria-labelledby="hero-title"
      className="min-h-[80vh] flex items-center py-8"
    >
      <Card className="w-full bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-6 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Column */}
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="">
                <h1
                  id="hero-title"
                  className="text-4xl md:text-6xl font-bold tracking-tight"
                >
                  {name}
                </h1>
                <div role="doc-subtitle" className="space-y-3">
                  <span className="animate-opacity-pulse text-sm md:text-md text-muted-foreground">
                    @samanshaiza on everything
                  </span>
                  <p className="text-lg md:text-xl text-muted-foreground">
                    {pronunciation}
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="max-w-[42rem] text-lg md:text-xl text-muted-foreground"
              >
                <p>{description}</p>
                
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 "
              >
                <Button size="lg" className="group" asChild>
                  <a
                    href="https://github.com/samanshaiza004"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                    <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="group" asChild>
                  <Link to="/contact">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Me
                    <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              variants={itemVariants}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-30" />

              <div className="relative">
                <div className="absolute -inset-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-full animate-[spin_60s_linear_infinite]" />

                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                  <img
                    src={imageUrl}
                    alt={`${name}'s profile`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}

export default Hero;
