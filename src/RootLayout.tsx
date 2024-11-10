import { Link, Route, Routes } from "react-router-dom";
import ProjectPage from "./components/ProjectPage";
import NotFound from "./components/notFound";
import Contact from "./components/Contact";
import { BlogPost } from "./components/blog/BlogPost";
import { BlogIndex } from "./components/blog/BlogIndex";
import Home from "./components/Home";
import { ThemeProvider, ThemeToggle } from "./hooks/ThemeContext";
import { Github } from "lucide-react";

function RootLayout() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        <header
          role="banner"
          aria-label="Main navigation"
          className="fixed top-0 left-0 right-0 border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50"
        >
          <nav role="navigation" className="max-w-4xl mx-auto px-4 py-4">
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <div className="flex gap-4 items-center">
              <Link
                to="/"
                className="hover:underline transition-colors hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none rounded-md px-1 py-1"
              >
                Home
              </Link>
              <Link
                to="/blog"
                className="hover:underline transition-colors hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none rounded-md px-1 py-1"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="hover:underline transition-colors hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none rounded-md px-1 py-1"
              >
                Contact
              </Link>
              <div className="ml-auto">
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </header>

        <main className="pt-16" id="main-content" role="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:projectId" element={<ProjectPage />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
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
        </main>

        <footer className="mt-auto border-t bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-100">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Saman Shaiza. All rights reserved.
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
