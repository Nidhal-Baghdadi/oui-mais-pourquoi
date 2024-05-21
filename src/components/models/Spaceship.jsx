"use client";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, Float } from "@react-three/drei";
import Banner from "@/components/models/Banner";
import { Mesh } from "three";
import font from "@public/fonts/gt.json";

export default function Model(props) {
  const { vehicle, position } = props;

  const { scene } = useGLTF(`/models/${vehicle}.gltf`);

  const modelRef = useRef();

  const [clicked, setClicked] = useState(false);

  const handlePointerDown = () => {
    setClicked(true);
  };

  const handlePointerEnter = () => {};

  const handlePointerLeave = () => {};

  return (
    <Float speed={1} floatingRange={[0, 0.1]}>
      <group
        {...props}
        dispose={null}
        ref={modelRef}
        position={position}
        rotation={[0, Math.PI / 4, 0]}
        scale={0.8}
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <Banner
          text={"Hello"}
          color={"yellow"}
          position={[-0.5, 2.4, 1]}
          scale={0.35}
          font={font}
        />

        <primitive object={scene} />
      </group>
    </Float>
  );
}
