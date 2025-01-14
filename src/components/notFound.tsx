import { Link } from "react-router-dom";
import Screensaver from "./Screensaver";
import { useRef } from "react";

import photo from "/Photo-1.jpeg";

function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
      {[...photo, ...photo].map((image, index) => (
        <Screensaver
          key={index}
          speed={1}
          startPosition={{ x: index * 3, y: index * 3 }}
          startAngle={40}
          containerRef={containerRef}
        >
          <div className="w-20 h-20 md:w-48 md:h-48 overflow-hidden">
            <img
              src={image}
              alt={`Example ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        </Screensaver>
      ))}
      <Link to="/" className="text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  );
}

export default NotFound;
