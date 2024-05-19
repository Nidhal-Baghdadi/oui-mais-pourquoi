"use client";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Raycaster, Vector2 } from "three";

import Banner from "./Banner";
import font from "@public/fonts/gt.json";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/raju_rocket.glb");

  const [hovered, setHovered] = useState(false);
  const [text, setText] = useState("");
  const { camera } = useThree();
  const raycaster = new Raycaster();
  const mouse = new Vector2();

  const handlePointerMove = (event) => {
    const { clientX, clientY } = event;
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY / window.innerHeight) * 2 + 1;
  };

  const handlePointerDown = () => {
    if (hovered) {
      // Perform actions when the object is clicked
    }
  };

  useFrame((state) => {
    if (hovered) {
      group.current.position.y =
        -3 + 0.07 * Math.sin(5 * state.clock.elapsedTime);
      group.current.position.x = -(
        0.2 +
        0.05 * Math.sin(5 * state.clock.elapsedTime)
      );
      setText("Get out!");
    } else {
      setText("");
    }
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(group.current, true);
    setHovered(intersects.length > 0);
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={0.044}
      position={[0.2, -3, 0]}
      rotation={[0, 0, Math.PI / 6]}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
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
