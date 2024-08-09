import { Link, createRootRoute } from "@tanstack/react-router";
import App from "../App";
import SmoothScrolling from "../SmoothScrolling";

export const Route = createRootRoute({
  component: () => (
    <>
      <SmoothScrolling>
        <App />
      </SmoothScrolling>
    </>
  ),
});
