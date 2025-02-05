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
    { label: "sign", value: "gemini ♊" },
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
      <Card className="overflow-hidden bg-linear-to-br from-green-100/30 to-blue-100/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-6 font-calendas italic flex items-center">
            <img
              className="w-5 h-5 mr-2"
              src="https://web.archive.org/web/20091027065313/http://www.geocities.com/fmg1967/star.gif"
              alt="star"
            />{" "}
            my favorite things{" "}
            <img
              className="w-5 h-5 ml-2"
              src="https://web.archive.org/web/20091027065313/http://www.geocities.com/fmg1967/star.gif"
              alt="star"
            />{" "}
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
                      ? "bg-background/40 backdrop-blur-sm"
                      : "bg-background/50 backdrop-blur-sm"
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
  const [shouldReduceMotion, _setShouldReduceMotion] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const gravityContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (gravityContainerRef.current) {
        const rect = gravityContainerRef.current.getBoundingClientRect();
        const height = Math.max(400, rect.height); // Ensure a minimum height
        setContainerHeight(height); // Update the height for `Gravity`
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
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
      className="relative w-full "
    >
      <Card className="w-full h-full bg-background/60 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  who's saman?
                </h2>
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
                    Beyond coding, I'm an avid composer and sound designer. When
                    I'm not coding or making music, you'll find me exploring new
                    technologies, contributing to open-source projects, or
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
              </div>
            </motion.div>
            <PersonalSection />
          </div>

          <div
            ref={gravityContainerRef}
            className="relative h-full min-h-[400px] mt-12"
          >
            <h2 className="text-6xl sm:text-7xl text-center font-calendas italic mb-6">
              skills
            </h2>
            <div
              style={{ height: `${containerHeight}px` }}
              className="relative w-full"
            >
              <Gravity
                gravity={{ x: 0, y: 1 }}
                className="w-full h-full"
                autoStart={true}
                debug={true}
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
                        style={{
                          backgroundColor: colors[skill],
                          color: "white",
                          textShadow: "1px 1px 1px rgba(0,0,0,0.2)",
                          fontSize: "clamp(0.8rem, 1.5vw, 1.2rem)", // Responsive font size
                          padding: "0.5em 1em", // Adjust padding dynamically
                        }}
                        className={cn(
                          "text-sm md:text-lg lg:text-xl transform-gpu",
                          "cursor-default select-none",
                          "px-3 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3",
                          "hover:cursor-grab",
                          "whitespace-nowrap",
                          "transition-colors duration-200"
                        )}
                      >
                        {skill}
                      </Badge>
                    </MatterBody>
                  ))
                )}
              </Gravity>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}

export default About;
