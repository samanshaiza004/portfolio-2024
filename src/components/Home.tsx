/* eslint-disable @typescript-eslint/no-explicit-any */
// App.tsx

import { useState } from "react";
// import { useMediaQuery } from "@/hooks/useMediaQuery";
/* import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/Navigation"; */
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
/* import { Contact } from "@/components/Contact"; */
import { Skeleton } from "@/components/ui/skeleton";
import { projects } from "@/data/projects";

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <Skeleton className="h-12 w-[250px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

function Home() {
  const [isLoading, _setIsLoading] = useState(false);
  // const isMobile = useMediaQuery("(max-width: 768px)");

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8" role="main">
        <Hero
          name="Saman Shaiza"
          pronunciation="suh-mon shy-zuh"
          description="Software developer focused on creating accessible and performant web applications"
          /* isMobile={isMobile} */
          imageUrl="/Photo-1.jpeg"
        />
        <Projects projects={projects} />
      </main>
    </div>
  );
}

export default Home;
