"use client";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Raycaster, Vector2 } from "three";
import { useRouter } from "next/navigation";
import Banner from "@/components/models/Banner";
import font from "@public/fonts/JMH_Typewriter_Bold.json";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/building_bot-assistant.glb");
  const modelRef = useRef();
  const { text, idx } = props;
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const router = useRouter();
  const raycaster = new Raycaster();
  const mouse = new Vector2();

  useFrame((state, delta, xrFrame) => {
    modelRef.current.position.y =
      1.95 + 0.05 * Math.sin(3.5 * state.clock.elapsedTime);
    if (hovered) {
      modelRef.current.rotation.y =
        0.1 * Math.sin(5.6 * state.clock.elapsedTime);
    }
  });

  const handlePointerMove = (event) => {
    const { clientX, clientY } = event;
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY / window.innerHeight) * 2 + 1;
  };

  const handlePointerDown = () => {
    if (hovered) {
      router.push("/journey/" + idx + "?subject=" + text);
    }
  };

  useFrame(() => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(modelRef.current, true);
    setHovered(intersects.length > 0);
  });

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
        rotation={[Math.PI / 2, Math.PI, Math.PI / 2]}
        scale={0.004}
        ref={modelRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
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
