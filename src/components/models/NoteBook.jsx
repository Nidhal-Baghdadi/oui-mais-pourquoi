"use client";
import React, { useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Banner from "@/components/models/Banner";
import font from "@public/fonts/gt.json";

export default function Model(props) {
  const { nodes, materials } = useGLTF(
    "/models/3d_icons___folder_theme__with_animation.glb"
  );

  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [text, setText] = useState("");

  useFrame((state, delta, xrFrame) => {
    modelRef.current.rotation.y = 0.07 * Math.sin(2 * state.clock.elapsedTime);

    if (hovered) {
      modelRef.current.position.y =
        2 + 0.05 * Math.sin(3.5 * state.clock.elapsedTime);
      setText("Your room... \nHomework...\nNOW!");
    } else {
      setText("");
    }
  });

  const handlePointerDown = () => {
    if (hovered) {
      // Perform actions when the object is clicked
    }
  };

  const handlePointerLeave = () => {
    setHovered(false);
  };

  const handlePointerEnter = () => {
    setHovered(true);
  };

  return (
    <group
      {...props}
      dispose={null}
      ref={modelRef}
      scale={0.9}
      position={[-2.8, 2, 0]}
      rotation={[0.34, 0, -0.1]}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <Banner
        text={text}
        color={"yellow"}
        position={[0, 0.95, 0]}
        scale={0.085}
        font={font}
      />
      <group name="save_1" scale={0.028}>
        <mesh
          name="save_1_save_1_0"
          castShadow
          receiveShadow
          geometry={nodes.save_1_save_1_0.geometry}
          material={materials.save_1}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/3d_icons___folder_theme__with_animation.glb");
