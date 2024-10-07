import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

import SmoothScrolling from "../SmoothScrolling";

export const Route = createRootRoute({
  component: () => (
    <>
      <SmoothScrolling>
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            home
          </Link>{" "}
          <Link to="/blog" className="[&.active]:font-bold">
            blog
          </Link>
        </div>
        <hr />
        <Outlet />
      </SmoothScrolling>
    </>
  ),
});
