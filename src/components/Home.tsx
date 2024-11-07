/* eslint-disable @typescript-eslint/no-explicit-any */
// App.tsx

import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";

// import { Skeleton } from "@/components/ui/skeleton";
import { projects } from "@/data/projects";

import About from "./About";

import { Background } from "./Background";

/* function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <Skeleton className="h-12 w-[250px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
} */

function Home() {
  // const [isLoading, _setIsLoading] = useState(false);
  // const { theme } = useTheme();
  /* if (isLoading) {
    return <LoadingSkeleton />;
  } */

  return (
    <div className="relative">
      <Background />
      <div className="relative" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-4">
          <div className="min-h-[60vh] flex items-center pt-16">
            <Hero
              name="Saman Shaiza"
              pronunciation="suh-mon shy-zuh"
              description="Software developer focused on creating accessible and performant web and desktop applications. (and i love serif fonts!)"
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
