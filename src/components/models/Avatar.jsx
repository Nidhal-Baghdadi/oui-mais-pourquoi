"use client";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, Float } from "@react-three/drei";
import { useRouter } from "next/navigation";
import Banner from "@/components/models/Banner";

import font from "@public/fonts/gt.json";

export default function Model(props) {
  const { message, caracter } = props;

  const { scene, animations } = useGLTF(`/models/${caracter}.gltf`);

  const modelRef = useRef();

  const router = useRouter();

  const [animation, setAnimation] = useState("Idle");
  const [text, setText] = useState("");

  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => actions[animation]?.fadeOut(0.5);
  }, [animation]);

  const handlePointerDown = () => {
    router.push("/profile");
  };

  const handlePointerEnter = () => {
    setAnimation("Wave");
    setText(message);
  };

  const handlePointerLeave = () => {
    setAnimation("Idle");
    setText("");
  };

  return (
    <Float speed={1} floatingRange={[0, 0.1]}>
      <group
        {...props}
        dispose={null}
        ref={modelRef}
        position={[-13, 3.5, -7]}
        rotation={[0, Math.PI / 4, 0]}
        scale={0.8}
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <Banner
          text={text}
          color={"yellow"}
          position={[-0.5, 2.4, 1]}
          scale={0.17}
          font={font}
        />

        <primitive object={scene} />
      </group>
    </Float>
  );
}
