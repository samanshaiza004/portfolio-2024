import { Link, Route, Routes } from "react-router-dom";
import ProjectPage from "./components/ProjectPage";
import NotFound from "./components/notFound";
import Contact from "./components/Contact";
import { BlogPost } from "./components/blog/BlogPost";
import { BlogIndex } from "./components/blog/BlogIndex";
import Home from "./components/Home";
import { ThemeProvider, ThemeToggle } from "./hooks/ThemeContext";
import { Github } from "lucide-react";
import Music from "./components/Music";
import About from "./components/About";
import NavBox from "./components/NavBox";

function RootLayout() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        <main
          className="relative grid grid-cols-1 md:grid-cols-3 gap-1 min-h-screen p-1 md:p-2"
          id="main-content"
          role="main"
          tabIndex={-1}
        >
          <div className="page-info col-span-1 md:col-span-2">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:projectId" element={<ProjectPage />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
              <Route path="/music" element={<Music />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/contact"
                element={
                  <Contact
                    email="samanshaiza@yahoo.com"
                    github="https://github.com/samanshaiza004"
                    phone="972 654 2247"
                    linkedin="https://linkedin.com/in/samanshaiza"
                    discord="samanshaiza"
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <NavBox />
        </main>

        <footer className="mt-auto border-t bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-100">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                {new Date().getFullYear()} Saman Shaiza. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Crafted by</span>
                <a
                  href="https://github.com/samanshaiza004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary transition-colors font-medium"
                  aria-label="Visit Saman Shaiza's GitHub profile (opens in new tab)"
                >
                  <Github className="h-4 w-4" />
                  Saman Shaiza
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default RootLayout;
