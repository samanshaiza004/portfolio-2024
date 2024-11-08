import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "../hooks/SmoothScrollContext";
import { Circle, CircleOff } from "lucide-react";

export function SmoothScrollToggle() {
  const { isSmoothScrollEnabled, toggleSmoothScroll } = useSmoothScroll();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSmoothScroll}
      className="h-9 w-9 rounded-md"
      aria-label={`${
        isSmoothScrollEnabled ? "Disable" : "Enable"
      } smooth scrolling`}
    >
      {isSmoothScrollEnabled ? (
        <Circle className="h-4 w-4" />
      ) : (
        <CircleOff className="h-4 w-4" />
      )}
    </Button>
  );
}
