"use client";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import { useRouter } from "next/navigation";
import Banner from "@/components/models/Banner";
import font from "@public/fonts/JMH_Typewriter_Bold.json";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/building_bot-assistant.glb");
  const modelRef = useRef();
  const { text, idx } = props;
  const [hovered, setHovered] = useState(false);

  const router = useRouter();

  useFrame((state, delta, xrFrame) => {
    if (hovered) {
      modelRef.current.rotation.y +=
        0.02 * Math.sin(5.6 * state.clock.elapsedTime);
    }
  });

  const handlePointerDown = () => {
    if (hovered) {
      router.push("/journey/" + idx + "?subject=" + text);
    }
  };

  const handlePointerEnter = () => {
    setHovered(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
  };

  return (
    <group {...props} dispose={null}>
      <pointLight color={"white"} intensity={2} />
      <Banner
        text={text}
        color={"yellow"}
        position={[4, 0.5, 5]}
        scale={2}
        font={font}
      />
      <group
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.004}
        ref={modelRef}
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Icosphere__0.geometry}
            material={materials["Scene_-_Root"]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/building_bot-assistant.glb");
