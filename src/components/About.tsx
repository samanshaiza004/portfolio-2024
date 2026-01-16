import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

import { useState, useEffect } from "react";

const PersonalSection = () => {
  const favorites = [
    { label: "born", value: "2004" },
    { label: "sign", value: "gemini ♊" },
    { label: "game", value: "the great ace attorney, both of them!" },
    { label: "console", value: "3ds" },
    { label: "music", value: "all music (:" },
    { label: "food", value: "omelette" },
    { label: "drink", value: "black coffee" },
    { label: "color", value: "green (you couldn't tell?)" },
    { label: "animal", value: "cats!! 🐱" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12"
    >
      <Card className="overflow-hidden bg-linear-to-br from-green-100/30 to-blue-100/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-6 font-calendas italic flex items-center">
            <img
              className="w-5 h-5 mr-2"
              src="https://web.archive.org/web/20091027065313/http://www.geocities.com/fmg1967/star.gif"
              alt="star"
            />{" "}
            my favorite things{" "}
            <img
              className="w-5 h-5 ml-2"
              src="https://web.archive.org/web/20091027065313/http://www.geocities.com/fmg1967/star.gif"
              alt="star"
            />{" "}
          </h3>

          <table className="w-full border-collapse">
            <tbody>
              {favorites.map((item, index) => (
                <motion.tr
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={
                    index % 2 === 0
                      ? "bg-background/40 backdrop-blur-sm"
                      : "bg-background/50 backdrop-blur-sm"
                  }
                >
                  <td className="text-lg p-2 text-primary/70 font-azeretMono">
                    {item.label}
                  </td>
                  <td className="text-lg p-2 font-medium">{item.value}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

function About() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {};
    const motionPreferences = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    setShouldReduceMotion(motionPreferences.matches);
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

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

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative w-full "
    >
      <Card className="w-full h-full bg-background/60 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  who's saman?
                </h2>
                <div className="prose prose-lg">
                  <p className="text-lg text-muted-foreground">
                    Hi, my name is Saman, i'm the webmaster of this website! I'm
                    a passionate software developer with a strong focus on
                    creating exceptional web experiences. I created{" "}
                    <a
                      className={cn(
                        "text-primary underline decoration-primary/30 underline-offset-2",
                        "transition-all duration-200",
                        "hover:decoration-primary/100 hover:text-primary/80",
                        "inline-flex items-center gap-1"
                      )}
                      href="https://samanshaiza.com"
                    >
                      samanshaiza.com
                    </a>{" "}
                    to share my work, interests, and other things going on in my
                    life.
                  </p>
                  <br />
                  <p className="text-lg text-muted-foreground">
                    Beyond coding, I'm an avid composer and sound designer. When
                    I'm not coding or making music, you'll find me exploring new
                    technologies, contributing to open-source projects, or
                    sharing my knowledge through{" "}
                    <Link
                      className={cn(
                        "text-primary underline decoration-primary/30 underline-offset-2",
                        "transition-all duration-200",
                        "hover:decoration-primary/100 hover:text-primary/80",
                        "inline-flex items-center gap-1"
                      )}
                      to="/blog"
                    >
                      blogs and technical writing.
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
            <PersonalSection />
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}

export default About;
