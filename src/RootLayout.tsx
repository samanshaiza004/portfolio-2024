// src/RootLayout.tsx
import { Link, Route, Routes } from "react-router-dom";
import ProjectPage from "./components/ProjectPage";
import NotFound from "./components/notFound";
import Contact from "./components/Contact";
import { BlogPost } from "./components/blog/BlogPost";
import { BlogIndex } from "./components/blog/BlogIndex";
import Home from "./components/Home";

function RootLayout() {
  return (
    <div>
      <header className="border-b">
        <nav className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/blog" className="hover:underline">
              Blog
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <main>
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
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default RootLayout;
