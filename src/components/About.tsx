import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import Gravity, { MatterBody } from "./fancy/gravity";
import { useState, useEffect, useMemo, useRef } from "react";

const PersonalSection = () => {
  const favorites = [
    { label: "born", value: "2004" },
    { label: "sign", value: "cancer ♋" },
    { label: "game", value: "the great ace attorney, both of them!" },
    { label: "console", value: "3ds" },
    { label: "music", value: "all music (:" },
    { label: "food", value: "omelette" },
    { label: "drink", value: "black coffee" },
    { label: "color", value: "green (you couldn't tell?)" },
    { label: "animal", value: "cats!! 🐱" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12"
    >
      <Card className="overflow-hidden bg-gradient-to-br from-green-100/30 to-blue-100/30 backdrop-blur">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-6 font-calendas italic">
            ★ my favorites ★
          </h3>

          <table className="w-full border-collapse">
            <tbody>
              {favorites.map((item, index) => (
                <motion.tr
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={
                    index % 2 === 0
                      ? "bg-background/40 backdrop-blur"
                      : "bg-background/50 backdrop-blur"
                  }
                >
                  <td className="text-lg p-2 text-primary/70 font-azeretMono">
                    {item.label}
                  </td>
                  <td className="text-lg p-2 font-medium">{item.value}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

function About() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const gravityContainerRef = useRef<HTMLDivElement>(null);

  // Update container height on mount and resize
  useEffect(() => {
    const updateHeight = () => {
      if (gravityContainerRef.current) {
        const viewportHeight = window.innerHeight;
        const containerWidth = gravityContainerRef.current.offsetWidth;
        // Adjust height based on screen size
        const idealHeight = Math.min(
          viewportHeight * 0.6, // Max 60% of viewport height
          containerWidth * 0.8 // Or 80% of container width
        );
        setContainerHeight(idealHeight);
      }
    };

    const motionPreferences = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    setShouldReduceMotion(motionPreferences.matches);

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

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
      items: ["react", "typescript", "tailwind", "rust"],
    },
    {
      category: "Backend",
      items: ["node.js", "express", "electron"],
    },
    {
      category: "Database",
      items: ["postgresql", "sqlite", "drizzle"],
    },
    {
      category: "Tools",
      items: ["git", "docker"],
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
  // Adjust position calculation for better distribution
  const positions = useMemo(() => {
    const totalSkills = skills.reduce(
      (sum, category) => sum + category.items.length,
      0
    );

    return skills.reduce((acc, category) => {
      category.items.forEach((skill, index) => {
        // Create a more compact grid distribution
        const gridSize = Math.ceil(Math.sqrt(totalSkills));
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        // Scale offsets based on container size
        const randomOffset = () => (Math.random() - 0.5) * 15;

        // Keep positions more centered
        acc[skill] = {
          x: `${(col * 80) / gridSize + randomOffset() + 20}%`,
          y: `${(row * 80) / gridSize + randomOffset() + 20}%`,
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
      className="relative w-full min-h-screen "
    >
      <Card className="w-full bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="h-screen p-6">
          <div className="gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight">
                    who's saman?
                  </h2>
                </div>

                <div className="prose prose-lg dark:prose-invert">
                  <p className="text-lg text-muted-foreground">
                    Hi, my name is Saman, i'm the webmaster of this website! I'm
                    a passionate software developer with a strong focus on
                    creating exceptional web experiences. I created{" "}
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
                    Beyond coding, I'm an avid composer and sound designer. I
                    love exploring the intersection of technology and audio,
                    whether it's building interactive sound experiences or
                    crafting unique sonic landscapes.
                  </p>
                  <br />
                  <p className="text-lg text-muted-foreground">
                    When I'm not coding or composing, you'll find me exploring
                    new technologies, contributing to open-source projects, or
                    sharing my knowledge through{" "}
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
              <PersonalSection />
            </div>

            <div className="w-full h-full flex flex-col relative font-azeretMono">
              <div className="pt-20 text-6xl sm:text-7xl md:text-8xl text-black w-full text-center font-calendas italic">
                skills
              </div>

              <div
                ref={gravityContainerRef}
                className="w-full md:h-[500px] h-[400px] relative"
              >
                <Gravity
                  gravity={{ x: 0, y: 1 }}
                  className="w-full"
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
                          // Add mass scaling based on text length
                          mass: Math.max(1, skill.length * 0.1),
                        }}
                        x={positions[skill].x}
                        y={positions[skill].y}
                      >
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-sm md:text-lg lg:text-xl transform-gpu",
                            "cursor-default select-none",
                            "rounded-full px-3 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3",
                            "hover:cursor-grab",
                            "whitespace-nowrap",
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
