import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

function About() {
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
      className="py-16 relative z-10"
    >
      <Card className="w-full bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-6 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
                <div className="h-1 w-20 bg-primary rounded" />
              </div>

              <div className="prose prose-lg dark:prose-invert">
                <p className="text-lg text-muted-foreground">
                  I'm a passionate software developer with a strong focus on
                  creating exceptional web experiences. My journey in tech
                  started with a curiosity about how the web worked, which
                  evolved into a passion building software that improves
                  people's lives.
                </p>
                <br />
                <p className="text-lg text-muted-foreground">
                  When I'm not coding, you'll find me making music, exploring
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
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}

export default About;
