"use client";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { useRouter } from "next/navigation";
import Banner from "@/components/models/Banner";
import font from "@public/fonts/gt.json";

export default function Model(props) {
  const { nodes, materials } = useGLTF(
    "/models/flying_saucer_from_poly_by_google.glb"
  );
  const moveRef = useRef();

  const [hovered, setHovered] = useState(false);
  const [text, setText] = useState("");

  const router = useRouter();

  const handlePointerDown = () => {
    if (hovered) {
      // Perform actions when the object is clicked
      router.push("/journey");
    }
  };

  const handlePointerLeave = () => {
    setHovered(false);
  };

  const handlePointerEnter = () => {
    setHovered(true);
  };

  useFrame(() => {
    if (hovered) {
      moveRef.current.rotation.y += 0.05;
      setText("Learn something, for once!");
    } else {
      moveRef.current.rotation.y += 0.01;
      setText("");
    }
  });

  return (
    <group
      {...props}
      dispose={null}
      scale={0.33}
      position={[2.4, 1.95, 0]}
      rotation={[0.4, 0, 0]}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <Banner
        text={text}
        color={"yellow"}
        position={[0, 0.95, 0]}
        scale={0.2}
        font={font}
      />
      <group ref={moveRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.lambert9SG}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.lambert8SG}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials.lambert10SG}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials.lambert7SG}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/flying_saucer_from_poly_by_google.glb");
