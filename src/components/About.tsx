import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
                  started with a curiosity about how things work, which evolved
                  into a career building solutions that make a difference.
                </p>
                <br />
                <p className="text-lg text-muted-foreground">
                  When I'm not coding, you'll find me making music, exploring
                  new technologies, contributing to open-source projects, or
                  sharing my knowledge through technical writing and mentoring.
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
