/* eslint-disable @typescript-eslint/no-explicit-any */
// App.tsx

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";
import { Vector3 } from "three";
import TetrahedronObject from "./components/tetrahedron";

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new Vector3();

  useFrame(() => {
    vec.set(mouse.x * -0.9, mouse.y * -0.95, camera.position.z); // Adjust multiplier as needed
    camera.position.lerp(vec, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return <></>;
}

/*
const LinkText = ({ position = [0, 0, 0], children, ...props  }) => {
  const ref = useRef<any>(null);

  const [hovered, setHovered] = useState(false);
  const color = new Color();
  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.position.copy(camera.position).add(new Vector3(...position));
      ref.current.quaternion.copy(camera.quaternion);
      ref.current.scale.y = ref.current.scale.z = MathUtils.lerp(
        ref.current.scale.y,
        hovered ? 1.0 : 0.9,
        0.1
      );
      ref.current.scale.x = MathUtils.lerp(
        ref.current.scale.x,
        hovered ? 0.9 : 0.8,
        0.1
      );
      ref.current.position.z = MathUtils.lerp(
        ref.current.scale.z,
        hovered ? 1.1 : 1.2,
        0.1
      );
      ref.current.material.color.lerp(color.set(hovered ? "cyan" : "white"), 0.1);
    }
    
  });

  return (
    <Text
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      scale={3}
      ref={ref}
      {...props}
      color={color}
      onClick={() => window.location.replace("/about-saman")}
    >
      {children}
    </Text>
  );
};
*/

const WeirdText = ({ value }: { value: any }) => {
  const ref = useRef<any>(null);
  const letters = "abcdefghijklmnopqrstuvwxyz";

  const onHover = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      ref.current.innerText = ref.current.innerText
        .split("")
        .map((_letter: any, index: number) => {
          if (index < iterations) {
            return value[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
      if (iterations >= value.length) clearInterval(interval);
      iterations += 1 / 2;
    }, 30);
  };
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  const eventHandler = isMobile
    ? { onTouchStart: onHover }
    : { onMouseOver: onHover };

  return (
    <span className="hover:underline" ref={ref} {...eventHandler}>
      {value}
    </span>
  );
};

const StickyText = ({
  position = [0, 0, 0],
  scale = 1,
  color,
  font,
  children,
  ...props
}: {
  position?: number[];
  scale?: number;
  font: string;
  color?: string;
  children: any;
}) => {
  const ref = useRef<any>(null);

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.position.set(
        camera.position.x + position[0],
        camera.position.y + position[1],
        camera.position.z + position[2]
      );
      ref.current.quaternion.set(
        camera.quaternion.x,
        camera.quaternion.y,
        camera.quaternion.z,
        camera.quaternion.w
      );
    }
  });

  return (
    <Text font={font} color={color} scale={scale} ref={ref} {...props}>
      {children}
    </Text>
  );
};

function App() {
  const dialogRef1 = useRef<HTMLDivElement>(null);
  const [mouseInCanvas, setMouseInCanvas] = useState(false);
  const [envPreset, setEnvPreset] = useState<any>(undefined);
  const [textColor, setTextColor] = useState("white");
  useEffect(() => {
    document.body.style.cursor = mouseInCanvas ? "none" : "auto";
  });

  useEffect(() => {
    const presets = [
      { env: "city", color: "white" },
      { env: "forest", color: "white" },
      { env: "apartment", color: "purple" },
      { env: "lobby", color: "black" },
      { env: "night", color: "grey" },
      { env: "park", color: "white" },
      { env: "studio", color: "black" },
      { env: "sunset", color: "black" },
    ];

    const randomIndex = Math.floor(Math.random() * presets.length);
    const { env, color } = presets[randomIndex];

    setEnvPreset(env);
    setTextColor(color);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  return (
    <div>
      {isMobile ? (
        <img src="mega20joltik.png" alt="3D Representation" />
      ) : (
        <Canvas
          aria-label="3D visualization of Saman Shaiza"
          role="img"
          style={{ height: "88vh", width: "100vw" }}
          onPointerOver={() => setMouseInCanvas(true)}
          onPointerOut={() => setMouseInCanvas(false)}
        >
          <Environment
            preset={envPreset}
            background
            backgroundBlurriness={0.15}
          />
          <ambientLight intensity={0.1} />
          <directionalLight position={[0, 0, 1]} />
          <TetrahedronObject radius={0.1} segments={0} />

          <StickyText
            font="fonts/PPWriter-Bold.otf"
            color={textColor}
            scale={0.5}
            position={[0, 1.5, -5]} // Now correctly applied
          >
            My name is Saman Shaiza
          </StickyText>

          <StickyText
            font="fonts/PPWriter-RegularItalic.otf"
            color={textColor}
            scale={0.2}
            position={[0, 1.0, -6.5]}
          >
            pronounced "suh-mon shy-zuh"
          </StickyText>

          <StickyText
            font="fonts/PPWriter-Regular.otf"
            color={textColor}
            scale={0.2}
            position={[0, 0, -5.7]}
          >
            I like creating things on the internet and {"\n"}
            creating music.
          </StickyText>
          <Rig />
        </Canvas>
      )}
      <div>
        <div className="lg:w-[1200px] sm:w-full flex-col flex justify-center mr-auto ml-auto">
          <header className="p-4 mb-24 mt-3 text-4xl">2024</header>
          <main>

          </main>
          </div>
      </div>
    </div>
  );
}

export default App;
