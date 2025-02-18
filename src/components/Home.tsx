/* eslint-disable @typescript-eslint/no-explicit-any */

import { motion } from "motion/react";
import { useState, useEffect } from "react";
/* import { Projects } from "@/components/Projects";
 */
// import { Skeleton } from "@/components/ui/skeleton";
/* import { projects } from "@/data/projects";
 */
import { Card, CardContent } from "@/components/ui/card";
import VerticalCutReveal from "./fancy/vertical-cut-reveal";

function Home() {
  const [mounted, setMounted] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative h-full"
      >
        <Card className="min-h-[750px] bg-background/60 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
          <CardContent className="relative w-full p-6 flex flex-col gap-8">
            <div className="flex flex-col flex-1 gap-8">
              {/* Hero Section */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-4"
              >
                <h1 id="hero-title" className="tracking-tight break-words">
                  <VerticalCutReveal
                    splitBy="characters"
                    staggerDuration={0.025}
                    staggerFrom="first"
                    containerClassName="responsive-header font-bold bg-clip-text"
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 21,
                    }}
                  >
                    welcome to saman!
                  </VerticalCutReveal>
                </h1>
                <p className="text-base md:text-2xl text-gray-300">
                  pronounced suh-mon
                </p>
              </motion.div>

              {/* Status List */}
              <motion.div variants={itemVariants} className="flex-1">
                <ul className="space-y-3 text-sm md:text-base text-muted-foreground max-w-2xl">
                  {/* ... existing status list items ... */}
                  <li className="flex items-center gap-2 group">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <img
                        className="w-6 h-5 transition-transform"
                        src="https://web.archive.org/web/20090831092929/http://geocities.com/shanelaffond13/gamerzfirexboxlogo2.gif"
                        alt="xbox logo on fire"
                      />
                    </div>
                    <span className="font-medium">playing:</span>
                    <span>Metaphor: ReFantazio | Yakuza: Like a Dragon</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-6 h-6 flex items-center justify-center"
                        src="https://web.archive.org/web/20091019205144/http://www.geocities.com/specopsairsoftteam/usaflag.gif"
                        alt="usa flag"
                      />
                    </div>
                    <span className="font-medium">working on:</span>
                    <span>studying computer science and making music!</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-6 h-6 flex items-center justify-center"
                        src="https://web.archive.org/web/20091027073622/http://www.geocities.com/daisy_my_girl/Cheesedancing.gif"
                        alt="cheese dancing"
                      />
                    </div>
                    <span className="font-medium">watching:</span>
                    <span>The Simpsons S3 | Puchi Puri * Yuushi</span>
                  </li>

                  <li className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-6 h-6 flex items-center justify-center"
                        src="https://web.archive.org/web/20091024184824/http://www.geocities.com/lankan_blood_rd/a-starsngl.gif"
                        alt="star"
                      />
                    </div>
                    <span className="font-medium">recently just watched:</span>
                    <span>Blade Runner 2047 (2017)</span>
                  </li>

                  <li className="flex items-center gap-2 pt-2 text-xs md:text-sm border-t border-border/40">
                    <span>Last updated: 1/13/2025</span>
                  </li>
                  {/* ... rest of the status items ... */}
                </ul>
              </motion.div>

              {/* Bottom Section */}
              <div className="flex flex-col md:flex-row justify-between gap-6 mt-auto pt-6 border-t border-border/40">
                {/* Social Handle */}
                <motion.div variants={itemVariants}>
                  <span className="animate-opacity-pulse text-sm md:text-base text-muted-foreground">
                    @samanshaiza on everything
                  </span>
                </motion.div>

                {/* Description */}
                <motion.div variants={itemVariants} className="md:max-w-[40%]">
                  <p className="text-base md:text-xl text-muted-foreground">
                    my personal website where i like to share my work,
                    interests, and whatever else i can think of ^_^
                  </p>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}

export default Home;
