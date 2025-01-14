import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import Gravity, { MatterBody } from "./fancy/gravity";
import { useState, useEffect, useMemo } from "react";

function About() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const motionPreferences = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    setShouldReduceMotion(motionPreferences.matches);
  }, []);

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

  const skills = [
    {
      category: "Languages & Frameworks",
      items: ["React", "TypeScript", "Tailwind", "Rust"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "Electron"],
    },
    {
      category: "Database",
      items: ["PostgreSQL", "SQLite", "Drizzle"],
    },
    {
      category: "Tools",
      items: ["Git", "Docker"],
    },
  ];

  // Generate vibrant colors for skills
  const colors = useMemo(() => {
    const baseColors = [
      "#FF6B6B", // Coral Red
      "#4ECDC4", // Turquoise
      "#45B7D1", // Sky Blue
      "#96CEB4", // Sage Green
      "#FFEEAD", // Cream Yellow
      "#D4A5A5", // Dusty Rose
      "#9B59B6", // Purple
      "#3498DB", // Blue
      "#E67E22", // Orange
      "#1ABC9C", // Teal
    ];

    return skills.reduce((acc, category) => {
      category.items.forEach((skill) => {
        acc[skill] = baseColors[Math.floor(Math.random() * baseColors.length)];
      });
      return acc;
    }, {} as Record<string, string>);
  }, []);

  // Generate distributed positions for skills
  const positions = useMemo(() => {
    const totalSkills = skills.reduce(
      (sum, category) => sum + category.items.length,
      0
    );
    return skills.reduce((acc, category) => {
      category.items.forEach((skill, index) => {
        // Create a grid-like distribution
        const gridSize = Math.ceil(Math.sqrt(totalSkills));
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        // Add some randomness to the grid positions
        const randomOffset = () => (Math.random() - 0.5) * 20;

        acc[skill] = {
          x: `${(col * 100) / gridSize + randomOffset() + 10}%`,
          y: `${(row * 100) / gridSize + randomOffset() + 10}%`,
        };
      });
      return acc;
    }, {} as Record<string, { x: string; y: string }>);
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative"
    >
      <Card className="w-full bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="h-screen p-6">
          <div className="gap-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  who's saman?
                </h2>
              </div>

              <div className="prose prose-lg dark:prose-invert">
                <p className="text-lg text-muted-foreground">
                  Hi, my name is Saman, i'm the webmaster of this website! I'm a
                  passionate software developer with a strong focus on creating
                  exceptional web experiences. I created{" "}
                  <a
                    className={cn(
                      "text-primary underline decoration-primary/30 underline-offset-2",
                      "transition-all duration-200",
                      "hover:decoration-primary/100 hover:text-primary/80",
                      "inline-flex items-center gap-1"
                    )}
                    href="https://samanshaiza.com"
                  >
                    samanshaiza.com
                  </a>{" "}
                  to share my work, interests, and other things going on in my
                  life.
                </p>
                <br />
                <p className="text-lg text-muted-foreground">
                  Beyond coding, I'm an avid composer and sound designer. I love
                  exploring the intersection of technology and audio, whether
                  it's building interactive sound experiences or crafting unique
                  sonic landscapes.
                </p>
                <br />
                <p className="text-lg text-muted-foreground">
                  When I'm not coding or composing, you'll find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  my knowledge through{" "}
                  <Link
                    className={cn(
                      "text-primary underline decoration-primary/30 underline-offset-2",
                      "transition-all duration-200",
                      "hover:decoration-primary/100 hover:text-primary/80",
                      "inline-flex items-center gap-1"
                    )}
                    to="/blog"
                  >
                    blogs and technical writing.
                  </Link>
                </p>
              </div>
            </motion.div>

            <div className="w-full h-full flex flex-col relative font-azeretMono">
              <div className="pt-20 text-6xl sm:text-7xl md:text-8xl text-black w-full text-center font-calendas italic">
                skills
              </div>
              <div className="w-full h-[500px] relative">
                <Gravity
                  gravity={{ x: 0, y: 1 }}
                  className="w-full h-full"
                  autoStart={true}
                  debug={false}
                >
                  {skills.map((skillSet) =>
                    skillSet.items.map((skill) => (
                      <MatterBody
                        key={skill}
                        matterBodyOptions={{
                          friction: 0.3,
                          restitution: 0.5,
                          density: 0.001,
                        }}
                        x={positions[skill].x}
                        y={positions[skill].y}
                      >
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-lg sm:text-xl md:text-2xl",
                            "cursor-default select-none",
                            "rounded-full px-8 py-4",
                            "hover:cursor-grab",
                            "transition-colors duration-200"
                          )}
                          style={{
                            backgroundColor: colors[skill],
                            color: "white",
                            textShadow: "1px 1px 1px rgba(0,0,0,0.2)",
                          }}
                        >
                          {skill}
                        </Badge>
                      </MatterBody>
                    ))
                  )}
                </Gravity>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}

export default About;
