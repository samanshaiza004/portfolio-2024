import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { projects } from "@/data/projects";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";

// Types
interface Project {
  id: string; // URL-friendly identifier
  title: string;
  description: string;
  link: string;
  technologies: string[];
  fullDescription?: string; // Detailed description for project page
  images?: string[]; // Project screenshots/images
  githubLink?: string;
  demoLink?: string;
}

// Project Page Component
function ProjectPage() {
  const { projectId } = useParams();
  const project = projects.find(
    (p: { id: string | undefined }) => p.id === projectId
  );

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <Link to="/" className="text-blue-500 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <Link to="/" className="text-blue-500 hover:underline mb-8 block">
        ← Back to Projects
      </Link>

      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map(
          (
            tech:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined,
            index: React.Key | null | undefined
          ) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm font-light"
            >
              {tech}
            </span>
          )
        )}
      </div>

      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          {project.fullDescription || project.description}
        </p>

        <div className="flex gap-4 mb-6">
          {project.githubLink && (
            <Button variant="outline" asChild>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Github className="mr-2 h-4 w-4" />
                View Code
              </a>
            </Button>
          )}
          {project.demoLink && (
            <Button asChild>
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {project.screenshots.map((screenshot, index) => (
                <figure key={index} className="relative">
                  <img
                    src={screenshot.url}
                    alt={screenshot.caption}
                    className="rounded-lg shadow-md"
                  />
                  <figcaption className="text-sm text-muted-foreground mt-2">
                    {screenshot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
        {project.features && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc pl-6">
              {project.features.map((feature, index) => (
                <li key={index} className="mb-2">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.challenges && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Technical Challenges
            </h2>
            <ul className="list-disc pl-6">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="mb-2">
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.learnings && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Key Learnings</h2>
            <ul className="list-disc pl-6">
              {project.learnings.map((learning, index) => (
                <li key={index} className="mb-2">
                  {learning}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ProjectPage;
