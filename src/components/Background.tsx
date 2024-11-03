import { Suspense, useState, useEffect, useMemo } from "react";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { useTheme } from "@/hooks/ThemeContext";
import { TorusKnotGeometry } from "three";
// Utility to detect WebGL support
const hasWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
};

// Fallback component for when WebGL isn't available
const FallbackBackground = ({ theme }: { theme: string }) => {
  return (
    <div
      className="fixed inset-0 transition-colors duration-300"
      style={{
        background:
          theme === "dark"
            ? "radial-gradient(circle at 50% 50%, #1e1e2e 0%, #0f0f1f 100%)"
            : "radial-gradient(circle at 50% 50%, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, transparent 90%, rgba(0,0,0,0.1) 100%)",
          opacity: 0.5,
        }}
      />
    </div>
  );
};

// Optimized Abstract Shape
const AbstractShape = ({ theme }: { theme: string }) => {
  // Memoize geometry to prevent recreating it on every render
  const geometry = useMemo(() => new TorusKnotGeometry(11, 3, 50, 8), []);

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={theme === "dark" ? "#818cf8" : "#880808"}
          wireframe
          transparent
          opacity={theme === "dark" ? 0.15 : 0.1}
        />
      </mesh>
    </Float>
  );
};

// Performance-optimized stars
const OptimizedStars = () => {
  return (
    <Stars
      radius={80}
      depth={50}
      count={1500}
      factor={3}
      saturation={0}
      fade
      speed={0.5}
    />
  );
};

// Main background component
export const Background = () => {
  const { theme } = useTheme();
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false);

  useEffect(() => {
    // Check WebGL support and device performance
    setWebGLSupported(hasWebGL());
    setIsLowPerfDevice(window.navigator.hardwareConcurrency <= 4);
  }, []);

  if (!webGLSupported) {
    return <FallbackBackground theme={theme} />;
  }

  return (
    <div className="fixed inset-0" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        dpr={[1, isLowPerfDevice ? 1.5 : 2]} // Limit DPR on low-performance devices
        performance={{ min: 0.5 }} // Allow frame rate to drop to 30fps
        gl={{
          powerPreference: "high-performance",
          antialias: !isLowPerfDevice, // Disable antialiasing on low-performance devices
          alpha: true,
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AbstractShape theme={theme} />
          <OptimizedStars />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
        {!isLowPerfDevice && (
          <EffectComposer>
            <DepthOfField focusDistance={0} focalLength={0.1} bokehScale={4} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};
