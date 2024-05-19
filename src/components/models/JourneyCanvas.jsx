"use client";
import { pointsInner, pointsOuter } from "@/app/utils";
import { OrbitControls, Sphere, Float } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Raycaster, Vector2 } from "three";
import React, { useRef, useState } from "react";
import Assistant from "@/components/models/Assistant";
import {
  EffectComposer,
  Bloom,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

/*
async function getData() {
  const response = await fetch("http://localhost:8080/api/tutorials", {
    method: "GET",
  });
  return response.json();
}
*/
const JourneyCanvas = ({ searchData }) => {
  const { camera } = useThree();
  const ref = useRef();
  const raycaster = new Raycaster();
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const lightPosition = useRef();
  const [newPosition, setNewPosition] = useState([0, 0, 0]);

  const intensity = 0.2;

  /*
  getData()
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
*/
  const handleClick = (event) => {
    const mouse = new Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(ref.current.children, true);

    if (intersects.length > 0) {
      const selectedObject = intersects[0].object;
      // Assuming each point has a unique id
      const selectedObjectId = selectedObject.name;
      setNewPosition(selectedObject.position);
      setSelectedSubject(selectedObject.subject);
      if (selectedPoint != selectedObjectId) {
        setSelectedSubject(selectedObject.subject);
        setSelectedPoint(selectedObjectId);
      } else {
        setSelectedPoint(null);
        setSelectedSubject(null);
      }
    }
  };

  const filteredPointsInner =
    searchData == ""
      ? pointsInner
      : pointsInner.filter((item) => {
          return item.data.subject
            .toLowerCase()
            .includes(searchData.toLowerCase());
        });

  const filteredPointsOuter =
    searchData == ""
      ? pointsOuter
      : pointsOuter.filter((item) => {
          return item.data.subject
            .toLowerCase()
            .includes(searchData.toLowerCase());
        });

  useFrame((state) => {
    if (selectedPoint != null) {
      lightPosition.current.position.x +=
        (newPosition.x + 0.5 - lightPosition.current.position.x) / 60;
      lightPosition.current.position.y +=
        (newPosition.y + 21 - lightPosition.current.position.y) / 60;
      lightPosition.current.position.z +=
        (newPosition.z + 24 - lightPosition.current.position.z) / 60;
    } else {
      lightPosition.current.position.x = state.pointer.x * 100;
      lightPosition.current.position.y = state.pointer.y * 100;
    }
  });

  return (
    <group scale={0.055}>
      <group ref={lightPosition}>
        <Assistant text={selectedSubject} idx={selectedPoint} />
      </group>

      <group ref={ref} rotation={[5.5, 0, 0]} onClick={handleClick}>
        <OrbitControls
          maxDistance={20}
          minDistance={0.5}
          enableRotate={false}
        />

        <EffectComposer disableNormalPass>
          <Bloom
            mipmapBlur
            luminanceThreshold={3}
            levels={10}
            intensity={intensity * 4}
          />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>

        {filteredPointsInner.map((point) => (
          <Shape
            key={point.idx}
            color={point.color}
            position={point.position}
            selected={selectedPoint == point.idx}
          >
            <Point
              key={point.idx}
              subject={point.data.subject}
              name={point.idx}
              position={point.position}
              color={point.color}
              selected={selectedPoint == point.idx}
            />
          </Shape>
        ))}

        {filteredPointsOuter.map((point) => (
          <Shape
            key={point.idx}
            color={point.color}
            position={point.position}
            selected={selectedPoint == point.idx}
          >
            <Point
              key={point.idx}
              subject={point.data.subject}
              name={point.idx}
              position={point.position}
              color={point.color}
              selected={selectedPoint == point.idx}
            />
          </Shape>
        ))}
      </group>
    </group>
  );
};

const Point = ({ subject, name, position, color, selected }) => {
  return (
    <Float speed={selected ? 0 : 1}>
      <Sphere
        position={position}
        args={[1.4, 20, 20]}
        name={name}
        subject={subject}
        scale={selected ? 2 : 1}
      >
        <meshStandardMaterial
          color={selected ? "#b0c4de" : color}
          emissive={selected ? "#b0c4de" : color}
          emissiveIntensity={selected ? 1.1 : 1}
          roughness={0.1}
          metalness={1}
        />
      </Sphere>
    </Float>
  );
};

function Shape({ children, color, selected }) {
  return (
    <mesh>
      {children}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={selected ? 0 : 0.5}
        toneMapped={false}
      />
    </mesh>
  );
}

export default JourneyCanvas;
