/* eslint-disable @typescript-eslint/no-explicit-any */
// App.tsx

import { Suspense, useState } from "react";

import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";

import { Skeleton } from "@/components/ui/skeleton";
import { projects } from "@/data/projects";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import About from "./About";

import { DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { useTheme } from "@/hooks/ThemeContext";

function AbstractShape() {
  const { theme } = useTheme();
  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
      <mesh>
        <torusKnotGeometry args={[11, 3, 50, 8]} />
        <meshStandardMaterial
          color={theme === "dark" ? "#818cf8" : "#6366f1"} // Lighter color for dark mode
          wireframe
          transparent
          opacity={theme === "dark" ? 0.15 : 0.1}
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
  // const { theme } = useTheme();
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="relative">
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
          <EffectComposer>
            <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={4} />
          </EffectComposer>
        </Canvas>
      </div>
      <div className="relative" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-4">
          <div className="min-h-[60vh] flex items-center pt-16">
            <Hero
              name="Saman Shaiza"
              pronunciation="suh-mon shy-zuh"
              description="Software developer focused on creating accessible and performant web and desktop applications. (and i love serif fonts!)"
              imageUrl="https://pbs.twimg.com/profile_images/1668322144848060416/KERAb-I0_400x400.jpg"
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
