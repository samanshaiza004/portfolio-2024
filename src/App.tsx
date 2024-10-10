/* eslint-disable @typescript-eslint/no-explicit-any */
// App.tsx

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";
import { Vector3 } from "three";

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
    <span className="hover:underline max-w-4" ref={ref} {...eventHandler}>
      {value}
    </span>
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
    document.body.style.cursor = mouseInCanvas ? "crosshair" : "auto";
  });

  useEffect(() => {
    const presets = [
      { env: "city", color: "white" },
      { env: "forest", color: "white" },
      { env: "apartment", color: "purple" },
      { env: "lobby", color: "black" },
      { env: "night", color: "white" },
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
          style={{ height: "86vh", width: "100vw" }}
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
            I like putting things on the internet and {"\n"}
            creating music.
          </StickyText>
          <Rig />
        </Canvas>
      )}
      <div>
        <div className="lg:w-[1200px] sm:w-full flex-col flex max-w-4xl mx-auto p-6">
          <header className="mb-24 text-4xl flex gap-3">
            <span>2024</span>
          </header>

          <main>
            <div className="text-2xl sm:text-4xl p-4 w-full">
              <p>
                I like working on websites, mobile, and desktop apps that help
                people. I mainly work with bleeding edge technologies as well as
                learning about older ones.
              </p>
              <p className="pt-4" ref={dialogRef1}>
                This is my portfolio website. It was built with React, React
                Three Fiber, and Tailwind.
              </p>
            </div>
            <section className="p-4">
              <h2 className="text-3xl sm:text-4xl font-semibold">
                Projects I've worked on
              </h2>
              <div className="text-lg sm:text-2xl pt-4">
                <a
                  className="hover:underline italic"
                  target="_blank"
                  href="https://github.com/samanshaiza004/fortunadws"
                >
                  FortunaDWS
                </a>{" "}
                is a custom web server built in C++ and the Boost.ASIO library
                with a focus on high-performance, event-driven, asynchronous
                I/O.
              </div>
              <div className="text-lg sm:text-2xl pt-4">
                <a
                  className="hover:underline italic .c-home-about_link"
                  target="_blank"
                  href="https://github.com/samanshaiza004/pixie"
                >
                  Pixie
                </a>{" "}
                is a simple, multi-platform sample explorer designed to make
                music creation frictionless and fun again. You can easily
                browse, organize, and play your audio samples using an intuitive
                interface built on Electron and React.
              </div>
              <br />
              <div className="text-lg sm:text-2xl pt-4">
                <a
                  className="hover:underline italic .c-home-about_link"
                  target="_blank"
                  href="https://github.com/samanshaiza004/thestatusquo"
                >
                  thestatusquo
                </a>{" "}
                is a social forum platform designed to facilitate the sharing of
                ideas and discussions among users.
              </div>
              <br />
              <div className="text-lg sm:text-2xl pt-4">
                <a
                  className="hover:underline italic .c-home-about_link"
                  href="https://github.com/samanshaiza004/genbu"
                >
                  Genbu
                </a>{" "}
                is a minimal and frictionless budget and finance app made with
                Expo, Zustand for state management, and Tamagui for the UI. It
                is designed to provide a simple and fast way to track your
                money, focusing on simplicity and speed.
              </div>
              <div className="text-lg sm:text-2xl pt-4">
                <a
                  className="hover:underline italic"
                  target="_blank"
                  href="https://github.com/samanshaiza004/veiled"
                >
                  Veiled
                </a>{" "}
                is a minimal, quiet VSCode theme made to lessen distractions.
              </div>
              <br />
              <div className="flex flex-col">
                <h2 className="text-3xl sm:text-4xl font-semibold">
                  contact me
                </h2>
                <a href="mailto:samanshaiza@yahoo.com">samanshaiza@yahoo.com</a>
                <a
                  className="hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/samanshaiza004"
                >
                  github
                </a>
                <span>972 654 2247</span>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
