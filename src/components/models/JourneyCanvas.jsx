"use client";
import { pointsInner, pointsOuter } from "@/app/utils";
import { OrbitControls, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import Assistant from "@/components/models/Assistant";
import Avatar from "@/components/models/Avatar";
import Planet from "@/components/models/Planet";
import Spaceship from "@/components/models/Spaceship";

import {
  EffectComposer,
  Bloom,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

const journeyAvatar = {
  message: "Embark on\na new journey!",
  caracter: "Astronaut_BarbaraTheBee",
  avatar_animation: "Yes",
  position: [-13, 2.2, 0],
};

const JourneyCanvas = ({ searchData }) => {
  const ref = useRef();

  const [selectedPoint, setSelectedPoint] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const lightPosition = useRef();
  const vehicleRef = useRef();
  const [newPosition, setNewPosition] = useState([0, 0, 0]);
  const [isClicked, setClicked] = useState(false);
  const [travel, setTravel] = useState(0);

  const intensity = 0.8;

  const arrivalPosition = { x: 15, y: -55, z: 0 };
  const startPosition = { x: 3000, y: 1000, z: -2000 };

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

  const handleAvatarClick = () => {
    setClicked(!isClicked);
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

    if (isClicked) {
      setTravel(travel + 1);
      vehicleRef.current.position.x +=
        (arrivalPosition.x + 0.5 - vehicleRef.current.position.x) / 20;
      vehicleRef.current.position.y +=
        (arrivalPosition.y + 21 - vehicleRef.current.position.y) / 20;
      if (travel <= 80) {
        vehicleRef.current.position.z =
          startPosition.z + 10.34 * (Math.pow(travel * 0.134, 2) + travel);
      }
    } else {
      vehicleRef.current.position.x +=
        (startPosition.x + 0.5 - vehicleRef.current.position.x) / 60;
      vehicleRef.current.position.y +=
        (startPosition.y + 21 - vehicleRef.current.position.y) / 60;
      vehicleRef.current.position.z +=
        (startPosition.z + 4 - vehicleRef.current.position.z) / 60;
      setTravel(0);
    }
  });

  return (
    <group scale={0.077}>
      <group scale={6} onClick={handleAvatarClick}>
        <Avatar
          message="Embark on\na new journey!"
          caracter="Astronaut_BarbaraTheBee"
          avatar_animation="Yes"
          position={[-13, 2.2, 0]}
        />
      </group>
      <group ref={lightPosition}>
        <Assistant text={selectedSubject} idx={selectedPoint} />
      </group>

      <group
        ref={vehicleRef}
        position={[startPosition.x, startPosition.y, startPosition.z]}
        rotation={[0, -Math.PI / 10, 0]}
        scale={7}
      >
        <Spaceship
          vehicle="Spaceship_BarbaraTheBee"
          position={journeyAvatar.position}
        />
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
