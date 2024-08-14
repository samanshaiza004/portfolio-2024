// App.tsx

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import ScrollTrigger from "gsap/src/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";
import { Vector3 } from "three";

import DodecahedronObject from "./components/dodecahedron";

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new Vector3();

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x, mouse.y, camera.position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });
}

/* function Box(props: any) {
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

  useFrame((_, delta) => {
    ref.current.scale.y = ref.current.scale.z = MathUtils.lerp(
      ref.current.scale.y,
      hovered ? 1.2 : 1,
      0.1
    );
    ref.current.material.color.lerp(color.set(hovered ? "cyan" : "white"), 0.1);
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
 */
function App() {
  const dialogRef1 = useRef<HTMLDivElement>(null);
  const [mouseInCanvas, setMouseInCanvas] = useState(false);
  const [envPreset, setEnvPreset] = useState<any>(undefined);
  useEffect(() => {
    document.body.style.cursor = mouseInCanvas ? "none" : "auto";
  });

  useEffect(() => {
    let randomValue = Math.random();
    if (randomValue == 1) {
      setEnvPreset("city");
    } else if (randomValue > 0.9) {
      setEnvPreset("forest");
    } else if (randomValue > 0.8) {
      setEnvPreset("apartment");
    } else if (randomValue > 0.7) {
      setEnvPreset("dawn");
    } else if (randomValue > 0.6) {
      setEnvPreset("lobby");
    } else if (randomValue > 0.5) {
      setEnvPreset("night");
    } else if (randomValue > 0.4) {
      setEnvPreset("park");
    } else if (randomValue > 0.3) {
      setEnvPreset("studio");
    } else if (randomValue > 0.2) {
      setEnvPreset("sunset");
    }
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
  });

  return (
    <div className="">
      <Canvas
        style={{ height: "92vh", width: "100vw" }}
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
        {/* <Ring
          position={new Vector3(0, 2.2, 0)}
          text=" aziahs namas "
          radius={1.2}
          height={0.7}
          segments={4}
        /> */}
        <DodecahedronObject
          position={new Vector3(0, 2.2, -1)}
          text=" aziahs namas "
          radius={0.3}
          segments={0}
          height={0}
        />

        <Text
          font={"fonts/PPWriter-Bold.otf"}
          /* font={JSON.parse(JSON.stringify(PPWriter))} */
          color={"white"}
          scale={0.6}
          // anchorY={"bottom"}
          position={[-0.0, 1, -0.5]}
          // </Canvas>font={"/PPWriter-Regular.orf"}
        >
          My name is Saman Shaiza
        </Text>

        <Text
          font="fonts/PPWriter-RegularItalic.otf"
          scale={0.22}
          anchorY={"bottom"}
          position={[0, 0.55, -1.5]}
        >
          pronounced "suh-mon shy-zuh"
        </Text>
        <Text
          font="fonts/PPWriter-Regular.otf"
          scale={0.25}
          anchorY={"bottom"}
          position={[0, 0.0, -0.5]}
        >
          I like creating things on the internet and learn about software.
        </Text>
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
            This is my portfolio website. It was built with React, Tailwind, and
            React Three Fiber.
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
            is a minimal, quiet theme made to lessen distractions.
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
