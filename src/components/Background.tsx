import { useRef, useState } from "react";
import { useThree, useFrame, Canvas } from "@react-three/fiber";
import { useTheme } from "@/hooks/ThemeContext";
import { Suspense } from "react";
import * as THREE from "three";
import { Environment } from "@react-three/drei";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";

function Box({ z }: { z: number }) {
  const ref = useRef<any>();
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  // Initialize box properties
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame(() => {
    ref.current.rotation.set(
      (data.rX += 0.001),
      (data.rY += 0.004),
      (data.rZ += 0.005)
    );
    ref.current.position.set(data.x * width, (data.y += 0.01), z);
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial
        color={z > -20 ? "#b6e3c2" : "#93cca3"}
        roughness={0.2}
        metalness={0.0}
      />
    </mesh>
  );
}

/**
 * Renders a 3D background using React Three Fiber and Drei, with dynamic lighting
 * and environment based on the current theme context.
 *
 * @param {Object} props - Component properties.
 * @param {number} [props.count=200] - Number of box elements to render.
 * @param {number} [props.depth=60] - Depth of the 3D scene.
 * @returns {JSX.Element} The background component.
 */

const Background = ({ count = 200, depth = 60 }) => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: -1 }}>
      <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 37 }}>
        <color
          attach="background"
          args={[theme === "dark" ? "#030712" : "#ffffff"]}
        />
        <ambientLight intensity={theme === "dark" ? 0.5 : 0.8} />
        <spotLight
          position={[10, 10, 10]}
          intensity={theme === "dark" ? 0.8 : 1}
          color={theme === "dark" ? "#4444ff" : "#ffffff"}
        />

        <Suspense fallback={null}>
          <Environment preset={theme === "dark" ? "night" : "sunset"} />
          {Array.from({ length: count }, (_, i) => (
            <Box key={i} z={-(i / count) * depth - 10} />
          ))}
          <EffectComposer>
            <DepthOfField
              target={[0, 0, depth / 4]}
              focalLength={0.5}
              bokehScale={theme === "dark" ? 8 : 11}
              height={700}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Background;
