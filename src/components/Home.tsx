/* eslint-disable @typescript-eslint/no-explicit-any */

import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";

// import { Skeleton } from "@/components/ui/skeleton";
import { projects } from "@/data/projects";

import About from "./About";

import { Background } from "./Background";

function Home() {
  return (
    <div className="relative">
      <Background />
      <div className="relative" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-4">
          <div className="min-h-[60vh] flex items-center pt-16">
            <Hero
              name="Saman Shaiza"
              pronunciation="suh-mon shy-zuh"
              description="Software developer focused on creating accessible and performant web and desktop applications.
              When I'm not coding, I'm making music...
              "
              imageUrl="/saman.jpg"
            />
          </div>

          <About />

          <Projects projects={projects} />
        </div>
      </div>
    </div>
  );
}
export default Home;
