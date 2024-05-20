"use client";
import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { planet } = props;

  const { scene } = useGLTF(`/models/Planet_${planet}.gltf`);

  console.log(scene);

  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      <primitive object={scene} />
    </group>
  );
}
