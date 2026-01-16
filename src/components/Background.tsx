import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three"; // Add this import

const vertexShader = `
  uniform float time;
  varying vec2 vUv;
  varying float vElevation;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    float elevation = sin(pos.x * 3.0 + time * 0.5) * 0.2
                   + cos(pos.z * 2.0 + time * 0.3) * 0.2;
    
    pos.y += elevation + time * 0.2;
    pos.y = mod(pos.y, 5.0) - 2.5;
    
    vElevation = elevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;
  varying float vElevation;
  
  void main() {
    vec3 color = vec3(0.5 + vElevation, 0.8, 1.0);
    gl_FragColor = vec4(color, 0.7);
  }
`;

function Cubes() {
  const count = 50;
  const meshRefs = useRef<(Mesh | null)[]>([]); // Add proper typing here

  const uniforms = useRef({
    time: { value: 0 },
  });

  useFrame((state) => {
    uniforms.current.time.value = state.clock.elapsedTime;

    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x += 0.01 * (i % 2 ? 1 : -1);
        mesh.rotation.z += 0.01 * (i % 3 ? 1 : -1);
      }
    });
  });

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (meshRefs.current[i] = el)}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <shaderMaterial
            uniforms={uniforms.current}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            transparent={true}
          />
        </mesh>
      ))}
    </>
  );
}

const Background = () => {
  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden"
      style={{ zIndex: -1 }}
    >
      <Canvas camera={{ position: [0, 0, 10] }}>
        <color attach="background" args={["#f5f5f5"]} />
        <Cubes />
      </Canvas>
    </div>
  );
};

export default Background;
