import { Route, Routes, useLocation } from "react-router-dom";
import ProjectPage from "./components/ProjectPage";
import NotFound from "./components/notFound";
import Contact from "./components/Contact";
import { BlogPost } from "./components/blog/BlogPost";
import { BlogIndex } from "./components/blog/BlogIndex";
import Home from "./components/Home";
import { Github } from "lucide-react";
import Music from "./components/Reviews";
import About from "./components/About";
import NavBox from "./components/NavBox";
import Background from "./components/Background";
import BlogBackground from "./components/BlogBackground";
import Reviews from "./components/Reviews";
import { ReviewPost } from "./components/reviews/ReviewPost";

function RootLayout() {
  const location = useLocation();
  const isBlogPost = location.pathname.match(/^\/blog\/[^/]+$/);
  return (
    <div className="min-h-screen">
        <div className="fixed inset-0 z-0">
          {isBlogPost ? <BlogBackground /> : <Background />}
        </div>
        <div className="relative z-10 flex-1">
          <main
            className="mx-auto max-w-screen px-4 py-6 sm:px-6 lg:px-8"
            id="main-content"
            role="main"
            tabIndex={-1}
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="page-info col-span-1 md:col-span-2">
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
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/project/:projectId" element={<ProjectPage />} />
                  <Route path="/blog" element={<BlogIndex />} />
                  <Route path="/blog/:postId" element={<BlogPost />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/reviews/:reviewId" element={<ReviewPost />} />
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
              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  <NavBox />
                </div>
              </div>
            </div>
          </main>
        </div>

        <footer className="relative z-10 mt-auto border-t bg-background/60 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-muted-foreground">
                {new Date().getFullYear()} Saman Shaiza. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Crafted by</span>
                <a
                  href="https://github.com/samanshaiza004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-medium transition-colors hover:text-primary"
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
  );
}

export default RootLayout;
