"use client";
import React from "react";
import { Float } from "@react-three/drei";
import Journey from "@/components/models/Journey";
import NoteBook from "@/components/models/NoteBook";
import Door from "@/components/models/Door";

const NavigationMenu = () => {
  return (
    <group>
      <Float speed={1}>
        <Journey />
      </Float>
      <Float speed={1}>
        <NoteBook />
      </Float>
      <Float speed={1}>
        <Door />
      </Float>
    </group>
  );
};

export default NavigationMenu;
