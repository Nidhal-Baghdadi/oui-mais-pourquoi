"use client";
import { pointsInner, pointsOuter } from "@/app/utils";
import { OrbitControls, Sphere, Float } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import Assistant from "@/components/models/Assistant";

import Planet from "@/components/models/Planet";

import {
  EffectComposer,
  Bloom,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

const JourneyCanvas = ({ searchData }) => {
  const ref = useRef();

  const [selectedPoint, setSelectedPoint] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const lightPosition = useRef();
  const [newPosition, setNewPosition] = useState([0, 0, 0]);

  const intensity = 0.8;

  const handleClick = (event) => {
    const selectedObject = event.eventObject;

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
        (newPosition.z + 4 - lightPosition.current.position.z) / 60;
    } else {
      lightPosition.current.position.x = state.pointer.x * 100;
      lightPosition.current.position.y = state.pointer.y * 100;
    }
  });

  return (
    <group scale={0.077}>
      <group ref={lightPosition}>
        <Assistant text={selectedSubject} idx={selectedPoint} />
      </group>

      <group rotation={[5.5, 0, 0]}>
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
            intensity={intensity}
          />
          <ToneMapping mode={ToneMappingMode.REINHARD} />
        </EffectComposer>

        {filteredPointsInner.map((point) => (
          <Float key={point.idx} speed={selectedPoint == point.idx ? 0 : 1.5}>
            <group
              ref={ref}
              onClick={handleClick}
              key={point.idx}
              subject={point.data.subject}
              name={point.idx}
              position={point.position}
              scale={selectedPoint == point.idx ? 1 : 0.5}
            >
              <Planet planet={(point.idx % 11) + 1} />
            </group>
          </Float>
        ))}

        {filteredPointsOuter.map((point) => (
          <Float key={point.idx} speed={selectedPoint == point.idx ? 0 : 1.5}>
            <group
              ref={ref}
              onClick={handleClick}
              key={point.idx}
              subject={point.data.subject}
              name={point.idx}
              position={point.position}
              scale={selectedPoint == point.idx ? 1 : 0.5}
            >
              <Planet planet={(point.idx % 11) + 1} />
            </group>
          </Float>
        ))}
      </group>
    </group>
  );
};

export default JourneyCanvas;
