"use client";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import Banner from "@/components/models/Banner";
import font from "@public/fonts/gt.json";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/raju_rocket.glb");

  const [hovered, setHovered] = useState(false);
  const [text, setText] = useState("");

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

  useFrame((state) => {
    if (hovered) {
      group.current.position.y += 0.007 * Math.sin(5 * state.clock.elapsedTime);
      group.current.position.x -= 0.005 * Math.sin(5 * state.clock.elapsedTime);
      setText("Get out!");
    } else {
      setText("");
    }
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={0.044}
      position={[0.2, -3, 0]}
      rotation={[0, 0, Math.PI / 6]}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <Banner
        text={text}
        color={"yellow"}
        position={[15, 7, 4.34]}
        scale={2}
        font={font}
      />
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group
          position={[0.491, -2.438, 13.157]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Rocket_0.geometry}
            material={materials.White}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Rocket_1.geometry}
            material={materials.Black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Rocket_2.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Rocket_3.geometry}
            material={materials.Glass}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wings_0.geometry}
          material={materials["Red.001"]}
          position={[0.028, -4.481, 4.199]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={0.289}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/raju_rocket.glb");
