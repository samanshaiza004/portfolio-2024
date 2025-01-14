import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import Gravity, { MatterBody } from "./fancy/gravity";
import { useState, useEffect } from "react";

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
      category: "Frontend",
      items: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "RESTful APIs", "Electron"],
    },
    {
      category: "Database",
      items: ["PostgreSQL", "MongoDB", "Drizzle", "Prisma"],
    },
    {
      category: "Tools",
      items: ["Git", "Docker"],
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="relative"
    >
      <Card className="w-full bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-6 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  who's saman?
                </h2>
                <div className="h-1 w-20 bg-primary rounded" />
              </div>

              <div className="prose prose-lg dark:prose-invert">
                <p className="text-lg text-muted-foreground">
                  Hi, I'm Saman, the webmaster of this website! I'm a passionate
                  software developer with a strong focus on creating exceptional
                  web experiences. I created{" "}
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
                  Beyond coding, I'm an avid composer and sound designer. This
                  creative background influences my approach to software
                  development, where I apply the same attention to detail and
                  creative problem-solving that I use in music composition. I
                  love exploring the intersection of technology and audio,
                  whether it's building interactive sound experiences or
                  crafting unique sonic landscapes.
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
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
                <div className="h-1 w-20 bg-primary rounded" />
              </div>

              <div className="grid gap-6">
                {skills.map((skillSet) => (
                  <motion.div
                    key={skillSet.category}
                    variants={itemVariants}
                    className="space-y-3"
                  >
                    <h3 className="text-xl font-semibold">
                      {skillSet.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillSet.items.map((skill) => (
                        <Badge
                          key={skill}
                          variant={"outline"}
                          className="px-3 py-1 font-thin text-sm cursor-default select-none"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <div className="w-full h-full flex flex-col relative font-azeretMono">
              <div className="pt-20 text-6xl sm:text-7xl md:text-8xl text-black w-full text-center font-calendas italic">
                skills
              </div>
              <p className="pt-4 text-base sm:text-xl md:text-2xl text-black w-full text-center">
                {/*  components made with: */}
              </p>
              <div className="w-full h-[600px] relative">
                <Gravity
                  gravity={{ x: 0, y: 1 }}
                  className="w-full h-full"
                  autoStart={true}
                  debug={false}
                >
                  <MatterBody
                    matterBodyOptions={{
                      friction: 0.5,
                      restitution: 0.2,
                      isStatic: false,
                    }}
                    x="30%"
                    y="10%"
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl bg-[#0015ff] text-white rounded-full px-8 py-4">
                      react
                    </div>
                  </MatterBody>
                  {/* ... other MatterBody components ... */}
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
