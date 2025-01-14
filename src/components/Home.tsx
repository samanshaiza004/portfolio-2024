/* eslint-disable @typescript-eslint/no-explicit-any */

import { Hero } from "@/components/Hero";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
/* import { Projects } from "@/components/Projects";
 */
// import { Skeleton } from "@/components/ui/skeleton";
/* import { projects } from "@/data/projects";
 */

function Home() {
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

  return (
    <div className="">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative"
      >
        <Hero
          name="welcome to saman!"
          pronunciation="suh-mon"
          description="my personal website where i like to share my work, interests, and whatever else i can think of ^_^"
          imageUrl="/saman.jpg"
        />
      </motion.section>
    </div>
  );
}
export default Home;
