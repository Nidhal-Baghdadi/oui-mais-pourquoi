"use client";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Model(props) {
  const group = useRef();

  const { nodes, materials } = useGLTF(
    "/models/goldsand_hourglass_magic_items.glb"
  );

  useFrame((state) => {
    group.current.rotation.y +=
      0.07 * Math.abs(Math.sin(2 * state.clock.elapsedTime));
  });

  return (
    <group ref={group} {...props} dispose={null} scale={0.015}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GeoSphere004_Glass_0.geometry}
        material={materials.Glass}
        position={[0, -6.018, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[-1.713, 1.713, 1.713]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Torus001_14_-_Default_0"].geometry}
        material={materials["14_-_Default"]}
        position={[0, 7.032, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1.019, 1.019, 1.769]}
      />
    </group>
  );
}

useGLTF.preload("/models/goldsand_hourglass_magic_items.glb");
