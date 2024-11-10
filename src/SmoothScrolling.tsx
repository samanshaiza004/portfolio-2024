import { ReactLenis } from "@studio-freight/react-lenis";
import { useSmoothScroll } from "./hooks/SmoothScrollContext";

function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const { isSmoothScrollEnabled } = useSmoothScroll();

  const lenisOptions = {
    lerp: 0.1,
    duration: 1.4,
    smoothTouch: false,
    smooth: isSmoothScrollEnabled,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
