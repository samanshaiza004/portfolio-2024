/* eslint-disable @typescript-eslint/no-explicit-any */
// App.tsx

import { Suspense, useState } from "react";
// import { useMediaQuery } from "@/hooks/useMediaQuery";
/* import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/Navigation"; */
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
/* import { Contact } from "@/components/Contact"; */
import { Skeleton } from "@/components/ui/skeleton";
import { projects } from "@/data/projects";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import About from "./About";

// Abstract 3D shape component
function AbstractShape() {
  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
      <mesh>
        <torusKnotGeometry args={[11, 3, 50, 8]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </Float>
  );
}

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

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="relative">
      {/* 3D Background */}
      <div className="fixed inset-0" style={{ zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AbstractShape />
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-4">
          {/* Hero section */}
          <div className="min-h-[60vh] flex items-center pt-16">
            <Hero
              name="Saman Shaiza"
              pronunciation="suh-mon shy-zuh"
              description="Software developer focused on creating accessible and performant web and desktop applications"
              imageUrl="/Photo-1.jpeg"
            />
          </div>

          {/* About section */}
          <About />

          {/* Projects section */}
          <Projects projects={projects} />
        </div>
      </div>
    </div>
  );
}
export default Home;
