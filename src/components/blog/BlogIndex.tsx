import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/posts";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/ThemeContext";
import AnimatedGradient from "../AnimatedGradient";
import { Card } from "../ui/card";
import NavBox from "../NavBox";

interface BlogCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  colors: string[];
  delay: number;
  description?: string;
  tags?: string[];
  link?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  value,
  subtitle,
  colors,
  delay,
  description,
  tags,
  link,
}) => {
  const { theme } = useTheme(); // Get current theme

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay + 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  };

  const content = (
    <motion.div
      className={`relative overflow-hidden h-full rounded-lg hover:shadow-lg transition-shadow
        ${
          theme === "dark"
            ? "bg-gray-800/50 hover:shadow-gray-700/50"
            : "bg-white hover:shadow-gray-200/50"
        }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* <AnimatedGradient
        colors={
          theme === "dark"
            ? colors.map((color) => adjustColorForDarkMode(color))
            : colors
        }
        speed={0.05}
        blur="medium"
      /> */}
      <motion.div
        className={`relative z-10 p-3 sm:p-5 md:p-8
          ${theme === "dark" ? "text-gray-100" : "text-foreground"}`}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          className={`text-sm mb-4 ${
            theme === "dark" ? "text-gray-300" : "opacity-80"
          }`}
          variants={item}
        >
          {value}
        </motion.p>
        <motion.h3
          className="text-xl sm:text-2xl md:text-3xl font-bold mb-2"
          variants={item}
        >
          {title}
        </motion.h3>

        {description && (
          <motion.p
            className={`mb-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
            variants={item}
          >
            {description}
          </motion.p>
        )}
        {tags && tags.length > 0 && (
          <motion.div className="flex  flex-wrap gap-2" variants={item}>
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={theme === "dark" ? "secondary" : "secondary"}
                className={`font-thin flex items-center select-none bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60
                  ${theme === "dark" ? "text-gray-200" : ""}`}
              >
                {tag}
              </Badge>
            ))}
          </motion.div>
        )}
        {subtitle && (
          <motion.p
            className={`text-sm mt-4 ${
              theme === "dark" ? "text-gray-400" : "opacity-80"
            }`}
            variants={item}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );

  return link ? <Link to={link}>{content}</Link> : content;
};

// Helper function to adjust colors for dark mode
const adjustColorForDarkMode = (color: string) => {
  // Convert hex to RGB, darken it slightly, and return new hex
  // This is a simple implementation - you might want to use a color library
  // for more sophisticated color manipulation
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Darken the color by reducing brightness
  const darkR = Math.max(0, r - 40);
  const darkG = Math.max(0, g - 40);
  const darkB = Math.max(0, b - 40);

  return `#${darkR.toString(16).padStart(2, "0")}${darkG
    .toString(16)
    .padStart(2, "0")}${darkB.toString(16).padStart(2, "0")}`;
};

export function BlogIndex() {
  const { theme } = useTheme();
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

  // Light mode gradients
  const lightGradients = [
    ["#A8E6CF", "#DCEDC1"],
    ["#95E1D3", "#EAFFD0"],
  ];

  // Dark mode gradients - slightly darker and more saturated
  const darkGradients = [
    ["#88C6AF", "#BCCD91"],
    ["#D36161", "#DCc36A"],
  ];

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Returns a random color pair from the list of gradients. If the theme is
   * dark, it will return a random color pair from the darkGradients array,
   * otherwise it will return a random color pair from the lightGradients array.
   * @returns {string[]} A random color pair.
   */

  /******  0dba0bb8-e892-4848-9e3e-d4ddd0d0f62b  *******/
  const getRandomColors = () => {
    const gradients = theme === "dark" ? darkGradients : lightGradients;
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  return (
    <div>
      <AnimatedGradient colors={lightGradients[0]} speed={0.05} blur="medium" />
      {/* Main Content Card */}
      <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <motion.div variants={itemVariants} className="grid gap-6">
          {blogPosts
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((post, index) => (
              <motion.div key={post.id} variants={itemVariants}>
                <BlogCard
                  title={post.title}
                  value={new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  description={post.description}
                  tags={post.tags}
                  colors={getRandomColors()}
                  delay={index * 0.1}
                  link={`/blog/${post.id}`}
                />
              </motion.div>
            ))}
        </motion.div>
      </Card>
    </div>
  );
}

export default BlogIndex;
