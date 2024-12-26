import { useRef } from "react";
import { useThree, useFrame, extend, Canvas } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { Vector3 } from "three";
import { useTheme } from "@/hooks/ThemeContext";

// Create the shader material
const BackgroundMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new Vector3(),
    isDarkMode: 0,
  },
  // Vertex Shader
  `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,

  // Fragment shader
  `
uniform vec3 resolution; // Screen resolution
uniform float time; // Time for animation
uniform float isDarkMode; // Flag for dark mode
varying vec2 vUv; // Interpolated UV coordinates

vec3 getLightThemeColor(vec3 baseColor) {
  return mix(vec3(0.95, 0.95, 0.97), vec3(0.85, 0.85, 0.9), baseColor);
}

vec3 getDarkThemeColor(vec3 baseColor) {
  return mix(vec3(0.03, 0.02, 0.08), vec3(0.08, 0.08, 0.10), baseColor);
}

void main() {
  vec2 fragCoord = vUv * resolution.xy; // Convert UV to screen coordinates
  vec3 c; // Color components
  float l, z = time; // Length and time variable

  for (int i = 0; i < 3; i++) {
    vec2 uv, p = fragCoord / resolution.xy; // Normalize fragCoord
    uv = p; // Copy normalized coordinates
    p -= 0.5; // Center coordinates
    p.x *= resolution.x / resolution.y; // Adjust aspect ratio
    z += 0.07; // Increment z for each color channel
    l = length(p); // Calculate distance from center
    uv += p / l * (sin(z) + 1.0) * abs(sin(l * 9.0 - z - z)); // Apply distortion
    c[i] = 0.01 / length(mod(uv, 1.0) - 0.5); // Calculate color component
  }

  // Normalize the color values
  vec3 baseColor = c / l;

  // Mix between light and dark theme colors based on isDarkMode
  vec3 lightColor = getLightThemeColor(baseColor);
  vec3 darkColor = getDarkThemeColor(baseColor);
  vec3 finalColor = mix(lightColor, darkColor, isDarkMode);

  // Set the final fragment color
  gl_FragColor = vec4(finalColor, 1.0);
}
`
);

// Extend Three.js with our custom material
extend({ BackgroundMaterial });

// Extend JSX Intrinsic Elements
declare module "@react-three/fiber" {
  interface ThreeElements {
    backgroundMaterial: JSX.IntrinsicElements["shaderMaterial"] & {
      time?: number;
      resolution?: Vector3;
      isDarkMode?: number;
    };
  }
}

const ShaderBackground = () => {
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
