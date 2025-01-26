/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

// Create theme context
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// Custom hook for using theme
export const useTheme = () => useContext(ThemeContext);

const darkSounds = [
  "https://utfs.io/f/59HxlDoACmIkMWgFm1lMY5L0DdkXj7I8qizUtaOBZvE1b2my",
  "https://utfs.io/f/59HxlDoACmIkDB2eIN5sHZweln0qYQr456R3IGy1LXVEAuDM",
];

const lightSounds = [
  "https://utfs.io/f/59HxlDoACmIkXzPz1zSvdFnlLPJz5QYp4OoWjhSc9TiM6AsN",
  "https://utfs.io/f/59HxlDoACmIkqJMwJp2xDm0R65zYkHo9vfj1KOFSngAUrB7t",
];

export const ThemeProvider = ({ children }: { children: any }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check for user's preferred theme on first load
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (prefersDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");

    // Play random sound based on theme
    const soundUrls = newTheme === "dark" ? darkSounds : lightSounds;
    const randomSound = soundUrls[Math.floor(Math.random() * soundUrls.length)];

    // Create a new Audio object to play the sound
    const audio = new Audio(randomSound);
    audio.volume = 0.5;
    audio.play().catch((error) => console.error("Error playing sound:", error));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      type="button"
      aria-pressed={theme === "dark"}
      aria-label={`Switch to ${theme ? "light" : "dark"} theme`}
      className="transition-all focus:ring-2 focus:ring-primary focus:outline-hidden w-9 h-9 rounded-full"
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
