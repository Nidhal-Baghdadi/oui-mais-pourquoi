"use client";

import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import { Stars, Sparkles } from "@react-three/drei";
import Avatar from "@/components/models/Avatar";
import {
  GithubSignInButton,
  GoogleSignInButton,
} from "@/components/models/authButtons";

const EditorCanvas = (props) => {
  const { className } = props;
  const message = "Hello again!";
  const caracter = "Astronaut_RaeTheRedPanda";

  return (
    <>
      <div className="flex flex-col w-full h-screen absolute">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="flex flex-col items-center mt-10 p-10 shadow-md z-10 rounded-lg border-2 border-white backdrop-blur-xs shadow-md shadow-white/40">
            <h1 className="mt-4 mb-4 text-4xl font-bold text-yellow-400">
              Sign In
            </h1>
            <GoogleSignInButton />
            <GithubSignInButton />
          </div>
        </div>
      </div>
      <Canvas className={clsx("w-full h-screen relative", className)}>
        <directionalLight position={[0, 3, 7]} intensity={1.7} />
        <Stars
          radius={100}
          depth={100}
          count={4000}
          factor={4}
          saturation={0}
          fade
          speed={0.3}
        />
        <Sparkles
          count={1000}
          size={3}
          speed={0.3}
          opacity={1}
          scale={56}
          color="#fff3b0"
        />
        <group rotation={[0, -Math.PI / 4, 0]} scale={3}>
          <Avatar
            message={message}
            caracter={caracter}
            avatar_animation={"Wave"}
            position={[0, -1, 0]}
          />
        </group>
      </Canvas>
    </>
  );
};

export default EditorCanvas;
