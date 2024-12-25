import { useRef } from "react";
import { useThree, useFrame, extend, Canvas } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { Vector3 } from "three";
import { useTheme } from "@/hooks/ThemeContext";

// Create the shader material
const BackgroundMaterial = shaderMaterial(
  {
    time: 0,
    isDarkMode: 0,
    resolution: new Vector3(),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform vec3 resolution;
    uniform float time;
    uniform float isDarkMode;
    varying vec2 vUv;

    vec3 getLightThemeColor(vec3 baseColor) {
      return mix(vec3(0.95, 0.95, 0.97), vec3(0.85, 0.85, 0.9), baseColor);
    }

    vec3 getDarkThemeColor(vec3 baseColor) {
      return mix(vec3(0.05, 0.02, 0.08), vec3(0.08, 0.08, 0.02), baseColor);
    }

    void main() {
      vec3 c;
      float l;
      float z = time * 0.5;
      
      for(int i=0; i<3; i++) {
        vec2 uv;
        vec2 p = vUv;
        p = p * 2.0 - 1.0;
        p.x *= resolution.x/resolution.y;
        z += 0.07;
        l = length(p);
        uv = p/l * (sin(z) + 1.0) * abs(sin(l*9.0 - z*2.0));
        c[i] = 0.01/length(abs(mod(uv, 1.0) - 0.5));
      }
      
      // Normalize the color values
      vec3 baseColor = c/l;
      
      // Mix between light and dark theme colors based on isDarkMode
      vec3 lightColor = getLightThemeColor(baseColor);
      vec3 darkColor = getDarkThemeColor(baseColor);
      vec3 finalColor = mix(lightColor, darkColor, isDarkMode);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// Extend Three.js with our custom material
extend({ BackgroundMaterial });

// Extend JSX Intrinsic Elements for the custom material
declare module "@react-three/fiber" {
  interface ThreeElements {
    backgroundMaterial: JSX.IntrinsicElements["meshStandardMaterial"] & {
      time?: number;
      isDarkMode: number;
      resolution?: Vector3;
    };
  }
}

// Background mesh component
const ShaderBackground = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  const { viewport } = useThree();
  const { theme } = useTheme();

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.time += delta;
      materialRef.current.resolution.set(viewport.width, viewport.height, 1);
      materialRef.current.isDarkMode = theme === "dark" ? 1.0 : 0.0;
      materialRef.current.needsUpdate = true;
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <backgroundMaterial
        ref={materialRef}
        isDarkMode={theme === "dark" ? 1.0 : 0.0}
      />
    </mesh>
  );
};

// Main component
const Background = () => {
  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ShaderBackground />
      </Canvas>
    </div>
  );
};

export default Background;
