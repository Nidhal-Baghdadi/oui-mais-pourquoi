"use client";
import React, { useRef, useState } from "react";
import { useGLTF, Text, useTexture, useFont } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRouter } from "next/navigation";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/card.glb");
  const types = ["AI", "mathematics", "physics"];
  const { position, num, type } = props;
  const CARD_DESCRIPTIONS = {
    physics: "Study the physics of gravity and motion",
    AI: "Protect yourself from an attack",
    mathematics:
      "Study calculus to understand the movement of objects in space over time",
  };

  const texture = useTexture(`/cards/${types[type]}.jpg`);

  const modelRef = useRef();

  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const url = "/editor/" + num;

  const handlePointerDown = () => {
    if (hovered) {
      // Perform actions when the object is clicked
      router.push(url);
    }
  };
  const handlePointerEnter = () => {
    setHovered(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
  };

  useFrame((state) => {
    if (!hovered) {
      modelRef.current.position.y +=
        0.005 *
        Math.sin(2 * state.clock.elapsedTime + modelRef.current.position.x);
    }
  });

  return (
    <group
      {...props}
      dispose={null}
      ref={modelRef}
      scale={1}
      position={position}
      onDoubleClick={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <mesh castShadow receiveShadow geometry={nodes.Plane.geometry}>
        <meshStandardMaterial
          {...materials.Front}
          map={texture}
          color="white"
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane_1.geometry}
        material={materials.Borders}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane_2.geometry}
        material={materials.Back}
      />
      <Text
        font="/fonts/RobotoSlab-Bold.ttf"
        fontSize={0.1}
        anchorY={"top"}
        anchorX={"left"}
        position-x={-0.46}
        position-y={-0.3}
        position-z={0.01}
      >
        {types[type].toUpperCase()}
        <meshStandardMaterial
          color="white"
          roughness={materials.Front.roughness}
        />
      </Text>
      <Text
        font="/fonts/RobotoSlab-Regular.ttf"
        fontSize={0.06}
        maxWidth={0.9}
        anchorY={"top"}
        anchorX={"left"}
        position-x={-0.46}
        position-y={-0.44}
        position-z={0.01}
        lineHeight={1}
      >
        {CARD_DESCRIPTIONS[types[type]] || ""}
        <meshStandardMaterial
          color="white"
          roughness={materials.Front.roughness}
        />
      </Text>
    </group>
  );
}

useGLTF.preload("/models/card.glb");
useTexture.preload("/cards/physics.jpg");
useTexture.preload("/cards/AI.jpg");
useTexture.preload("/cards/mathematics.jpg");
useFont.preload("/fonts/RobotoSlab-Bold.ttf");
useFont.preload("/fonts/RobotoSlab-Regular.ttf");
