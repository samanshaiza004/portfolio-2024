import { Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Color, OctahedronGeometry, Vector3, MathUtils } from "three";

function Box(props: any) {
  const ref = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  const [rotate, setRotate] = useState(false);

  const color = new Color();
  const data = {
    n: 2,
  };

  function generateSquircle(n: number) {
    const g = new OctahedronGeometry(1, 16);
    const p = g.attributes.position.array;

    for (let i = 0; i < p.length; i += 3) {
      const v = new Vector3(p[i], p[i + 1], p[i + 2]);
      v.x = Math.tanh(v.x);
      v.y = Math.tanh(v.y);
      v.z = Math.tanh(v.z);
      p[i] = MathUtils.lerp(p[i], v.x, n);
      p[i + 1] = MathUtils.lerp(p[i + 1], v.y, n);
      p[i + 2] = MathUtils.lerp(p[i + 2], v.z, n);
    }
    g.computeBoundingBox();
    return g;
  }

  useFrame(() => {
    ref.current.scale.y = ref.current.scale.z = MathUtils.lerp(
      ref.current.scale.y,
      hovered ? 1.2 : 1,
      0.1
    );
    ref.current.material.color.lerp(color.set(hovered ? "cyan" : "white"), 0.1);
  });

  useFrame((_, delta) => {
    ref.current.rotation.y -= 1 * delta;
    if (ref.current.rotation.z > 0.5) {
      ref.current.rotation.z -= 0.1 * delta;
    } else if (ref.current.rotation.z < 0.3) {
      ref.current.rotation.z += 0.1 * delta;
    }
  });

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={(e) => {
        e.stopPropagation();
        setRotate(!rotate);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      geometry={generateSquircle(data.n)}
    >
      {hovered && (
        <Text3D position={[-0.9, -1, 1]} scale={0.2} font={"fonts/gt.json"}>
          {props.text}
        </Text3D>
      )}

      <boxGeometry onUpdate={(e) => e.rotateZ(Math.PI / 2)} />
      <meshPhysicalMaterial
        metalness={0}
        roughness={0.36}
        thickness={5}
        clearcoat={1}
        transmission={1}
        ior={1.53}
        color="blue"
      />
      {props.children}
    </mesh>
  );
}
