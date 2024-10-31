import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface Props {
  radius: number;
  segments: number;
}

export default function TetrahedronCursor({ radius, segments }: Props) {
  const { viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(
    () => new THREE.TetrahedronGeometry(radius, segments),
    [radius, segments]
  );

  const firstVertex = useMemo(() => {
    const positionAttribute = geometry.getAttribute("position");
    const positions = positionAttribute.array;

    const x = positions[6];
    const y = positions[7];
    const z = positions[8];

    return new THREE.Vector3(x, y, z);
  }, [geometry]);

  // Define the rotation axis as the vector from the origin to the first vertex
  const rotationAxis = useMemo(
    () => firstVertex.clone().normalize(),
    [firstVertex]
  );

  // Set rotation speed
  const rotationSpeed = Math.PI / 2; // Adjust as needed (radians per second)

  // Position the mesh at the mouse coordinates
  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    if (meshRef.current) {
      meshRef.current.position.set(x, y, 0);
    }
  });

  // Rotate the mesh around the custom axis
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotateOnAxis(rotationAxis, rotationSpeed * delta);
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <MeshTransmissionMaterial backside backsideThickness={3} thickness={1} />
    </mesh>
  );
}
