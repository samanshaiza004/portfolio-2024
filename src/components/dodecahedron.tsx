import { MeshTransmissionMaterial } from "@react-three/drei";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
interface Props {
  text: string;
  radius: number;
  height: number;
  segments: number;
  position: Vector3;
}

import { Vector3 } from "three";
export default function DodecahedronObject({
  text,
  radius,
  segments,
  position,
}: Props) {
  const { viewport } = useThree();
  const ref = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    ref.current.position.set(x, y, 0);
  });
  useFrame((_, delta) => {
    if (hovered) {
      ref.current.rotation.y -= 1 * delta;
      // ref.current.rotation.y -= 0.2 * delta;
      /* gsap.to(ref.current.rotation, {
        y: Math.PI,
        ease: "power1.inOut",
        repeat: 1,
        duration: 2,
      }); */
      // ref.current.rotation.x += 0.01;

      if (ref.current.rotation.z > 0.5) {
        ref.current.rotation.z -= 0.1 * delta;
      } else if (ref.current.rotation.z < 0.3) {
        ref.current.rotation.z += 0.1 * delta;
      }
    }
  });

  const textPosition: { x: number; z: number }[] = [];
  const angleStep = (2 * Math.PI) / text.length;

  for (let i = 0; i < text.length; i++) {
    const angle = i * angleStep;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    textPosition.push({ x, z });
  }
  return (
    <group position={position} ref={ref}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
      >
        <dodecahedronGeometry args={[radius, segments]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={3}
          thickness={1}
        />
      </mesh>
      {/* {text.split("").map((char: string, index: number) => (
        <Text
          key={index}
          font="fonts/PPWriter-RegularItalic.otf"
          position={[textPosition[index].x, 0, textPosition[index].z]}
          rotation={[0, -angleStep * index + Math.PI / 2, 0]}
          fontSize={0.3}
          lineHeight={1}
          letterSpacing={0.02}
          color="white"
          textAlign="center"
        >
          {char}
        </Text>
      ))} */}
    </group>
  );
}
