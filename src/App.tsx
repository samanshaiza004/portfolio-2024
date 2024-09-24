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
      { env: "dawn", color: "yellow" },
      { env: "lobby", color: "cyan" },
      { env: "night", color: "grey" },
      { env: "park", color: "white" },
      { env: "studio", color: "white" },
      { env: "sunset", color: "pink" },
    ];

    const randomIndex = Math.floor(Math.random() * presets.length);
    const { env, color } = presets[randomIndex];

    setEnvPreset(env);
    setTextColor(color);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <div>
      <Canvas
        style={{ height: "80vh", width: "100vw" }}
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
          scale={0.20}
          position={[0, 0, -5.7]}
        >
          I like creating things on the internet and {"\n"}
          creating music.
        </StickyText>
        <Rig />
      </Canvas>
      <div className="lg:w-[1200px] sm:w-full flex-col flex justify-center mr-auto ml-auto">
        <p className="p-4 mb-24 mt-3 text-4xl">2024</p>
        <div className="text-2xl sm:text-4xl p-4 w-full">
          <p>
            I like working on websites, mobile, and desktop apps that help
            people. I mainly work with bleeding edge technologies as well as
            learning about older ones.
          </p>
          <p ref={dialogRef1}>
            This is my portfolio website. It was built with React, React Three
            Fiber, and Tailwind.
          </p>
        </div>
        <div className="p-4">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            Projects I've worked on
          </h2>
          <div className="text-lg sm:text-2xl pt-4">
            <a
              className="hover:underline italic"
              href="https://github.com/samanshaiza004/veiled"
            >
              Veiled
            </a>{" "}
            is a minimal, quiet VSCode theme made to lessen distractions.
          </div>
          <div className="text-lg sm:text-2xl pt-4">
            <a
              className="hover:underline italic"
              href="https://github.com/samanshaiza004/pixie"
            >
              pixie
            </a>{" "}
            is a simple, multi-platform sample explorer designed to make music
            creation frictionless and fun again. With Pixie, you can easily
            browse, organize, and play your audio samples using an intuitive
            interface powered by Electron and React.
          </div>
          <br />
          <div className="text-lg sm:text-2xl pt-4">
            <a
              className="hover:underline italic"
              href="https://github.com/samanshaiza004/statusquo"
            >
              statusquo
            </a>{" "}
            is a social forum platform designed to facilitate the sharing of
            ideas and discussions among users.
          </div>
          <br />
          <div className="text-lg sm:text-2xl pt-4">
            <a
              className="hover:underline italic"
              href="https://github.com/samanshaiza004/genbu"
            >
              Genbu
            </a>{" "}
            is a minimal and frictionless budget and finance app made with Expo,
            Zustand for state management, and Tamagui for the UI. It is designed
            to provide a simple and fast way to track your money, focusing on
            simplicity and speed.
          </div>
          <br />
          <div className="flex flex-col">
            <h2 className="text-3xl sm:text-4xl font-semibold">contact me</h2>
            <a href="mailto:samanshaiza@yahoo.com">samanshaiza@yahoo.com</a>
            <a target="_blank" href="https://github.com/samanshaiza004">
              github
            </a>
            <span>972 654 2247</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
