import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import VerticalCutReveal from "./fancy/vertical-cut-reveal";
import NavBox from "./NavBox";
import { useTheme } from "@/hooks/ThemeContext";
interface HeroProps {
  name: string;
  pronunciation: string;
  description: string;
  imageUrl: string;
}

export function Hero({
  name,
  pronunciation,
  description,
  imageUrl,
}: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const motionPreferences = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  const shouldReduceMotion = motionPreferences.matches;

  const containerVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      opacity: 1,
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
    <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardContent className="relative w-full h-screen p-3">
        {/* Name Section - Responsive positioning */}
        <div className="flex flex-col">
          <p
            className="text-lg animate-opacity-flicker"
            style={{
              fontFamily: "'Courier New', monospace",
              color: "#00aaff",
            }}
          >
            &lt;website is under construction&gt;
          </p>
        </div>
        <motion.div
          variants={itemVariants}
          className=" md:top-12 md:left-12 mb-8 md:mb-0"
        >
          <h1 id="hero-title" className="tracking-tight break-words">
            <VerticalCutReveal
              splitBy="characters"
              staggerDuration={0.025}
              staggerFrom="first"
              containerClassName="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-bold bg-clip-text"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 21,
              }}
            >
              {name}
            </VerticalCutReveal>
          </h1>
          <p className="text-base md:text-2xl text-gray-300">
            pronounced {pronunciation}
          </p>
          <ul className="space-y-3 mt-12 text-sm md:text-base text-muted-foreground">
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
                  src="https://web.archive.org/web/20091019205144/http://www.geocities.com/specopsairsoftteam/usaflag.gif"
                  alt="usa flag"
                />
              </div>
              <span className="font-medium">working on:</span>
              <span>studying maths, computer science and making music!</span>
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
          </ul>
        </motion.div>

        {/* Social Handle - Responsive positioning */}
        <motion.div
          variants={itemVariants}
          className="md:absolute md:bottom-12 md:left-12 mb-8 md:mb-0"
        >
          <div className="flex items-center">
            <span className="animate-opacity-pulse text-sm md:text-base text-muted-foreground">
              @samanshaiza on everything
            </span>
          </div>
        </motion.div>

        {/* Description - Responsive positioning */}
        <motion.div
          variants={itemVariants}
          className="md:absolute md:bottom-12 md:right-12 md:max-w-[40%]"
        >
          <p className="text-base md:text-xl text-muted-foreground">
            {description}
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
}

export default Hero;
