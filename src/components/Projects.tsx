// components/Projects.tsx
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Project } from "@/types/types";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <h2 className="text-3xl font-bold tracking-tight mb-8">
          Featured Projects
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.div key={project.title} variants={projectVariants}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-all hover:scale-[1.02] transform duration-100 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Link to={`/project/${project.id}`}>
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                      <span>{project.title}</span>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="select-none font-thin"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-4">
                    {project.githubLink && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.demoLink && (
                      <Button size="sm" asChild>
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
