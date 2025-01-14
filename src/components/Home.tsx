/* eslint-disable @typescript-eslint/no-explicit-any */

import { Hero } from "@/components/Hero";
/* import { Projects } from "@/components/Projects";
 */
// import { Skeleton } from "@/components/ui/skeleton";
/* import { projects } from "@/data/projects";
 */

function Home() {
  return (
    <div className="">
      <div className="relative" style={{ zIndex: 2 }}>
        <Hero
          name="welcome to saman!"
          pronunciation="suh-mon"
          description="my personal website where i like to share my work, interests, and whatever else i can think of ^_^"
          imageUrl="/saman.jpg"
        />
      </div>
    </div>
  );
}
export default Home;
