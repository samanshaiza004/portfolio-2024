import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  ReactNode,
} from "react";
import Matter from "matter-js";
import { cn } from "@/lib/utils";

// Types and Interfaces
interface GravityProps {
  children: ReactNode;
  gravity?: { x: number; y: number };
  className?: string;
  autoStart?: boolean;
  debug?: boolean;
  addWalls?: boolean;
}

interface MatterBodyProps {
  children: ReactNode;
  x?: string | number;
  y?: string | number;
  matterBodyOptions?: Matter.IBodyDefinition;
  className?: string;
}

export interface GravityRef {
  start: () => void;
  stop: () => void;
  reset: () => void;
}

interface PhysicsBody {
  element: HTMLElement;
  body: Matter.Body;
  props: MatterBodyProps;
}

// Helper function to calculate position
const calculatePosition = (
  value: string | number | undefined,
  containerSize: number,
  elementSize: number
): number => {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.endsWith("%")) {
    return (parseFloat(value) / 100) * containerSize - elementSize / 2;
  }
  return containerSize / 2 - elementSize / 2;
};

// MatterBody Component
export const MatterBody: React.FC<MatterBodyProps> = ({
  children,
  x = "50%",
  y = "50%",
  matterBodyOptions = {},
  className,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<string>(Math.random().toString(36).substring(7));

  return (
    <div
      ref={elementRef}
      className={cn("absolute", className)}
      data-matter-id={idRef.current}
    >
      {children}
    </div>
  );
};

// Gravity Component
const Gravity = forwardRef<GravityRef, GravityProps>(
  (
    {
      children,
      gravity = { x: 0, y: 1 },
      className,
      autoStart = true,
      debug = false,
      addWalls = true,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef(Matter.Engine.create());
    const renderRef = useRef<Matter.Render>();
    const runnerRef = useRef<Matter.Runner>();
    const bodiesMapRef = useRef(new Map<string, PhysicsBody>());
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize Matter.js engine and renderer
    const initializePhysics = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const engine = engineRef.current;

      // Set up renderer
      renderRef.current = Matter.Render.create({
        element: container,
        engine: engine,
        options: {
          width: container.clientWidth,
          height: container.clientHeight,
          wireframes: debug,
          background: "transparent",
          pixelRatio: window.devicePixelRatio,
        },
      });

      // Set gravity
      // engine.world.gravity = gravity;

      // Add walls if enabled
      if (addWalls) {
        const walls = [
          // Bottom wall
          Matter.Bodies.rectangle(
            container.clientWidth / 2,
            container.clientHeight + 50,
            container.clientWidth,
            100,
            { isStatic: true, render: { visible: debug } }
          ),
          // Left wall
          Matter.Bodies.rectangle(
            -50,
            container.clientHeight / 2,
            100,
            container.clientHeight,
            { isStatic: true, render: { visible: debug } }
          ),
          // Right wall
          Matter.Bodies.rectangle(
            container.clientWidth + 50,
            container.clientHeight / 2,
            100,
            container.clientHeight,
            { isStatic: true, render: { visible: debug } }
          ),
        ];

        Matter.World.add(engine.world, walls);
      }

      runnerRef.current = Matter.Runner.create();

      if (autoStart) {
        start();
      }

      setIsInitialized(true);
    };

    // Start physics simulation
    const start = () => {
      if (!renderRef.current || !runnerRef.current || !engineRef.current)
        return;

      Matter.Runner.run(runnerRef.current, engineRef.current);
      Matter.Render.run(renderRef.current);
    };

    // Stop physics simulation
    const stop = () => {
      if (!renderRef.current || !runnerRef.current) return;

      Matter.Runner.stop(runnerRef.current);
      Matter.Render.stop(renderRef.current);
    };

    // Reset physics simulation
    const reset = () => {
      stop();
      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
      }
      initializePhysics();
    };

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      start,
      stop,
      reset,
    }));

    // Initialize physics on mount
    useEffect(() => {
      initializePhysics();

      // Cleanup on unmount
      return () => {
        stop();
        if (renderRef.current) {
          renderRef.current.canvas.remove();
        }
        if (engineRef.current) {
          // Matter.World.clear(engineRef.current.world);
          Matter.Engine.clear(engineRef.current);
        }
      };
    }, []);

    // Update gravity when prop changes
    useEffect(() => {
      if (engineRef.current) {
        // engineRef.current.world.gravity = gravity;
      }
    }, [gravity.x, gravity.y]);

    return (
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden", className)}
        style={{ minHeight: "100px" }}
      >
        {isInitialized && children}
      </div>
    );
  }
);

// Add display name for React DevTools
Gravity.displayName = "Gravity";

export default Gravity;
