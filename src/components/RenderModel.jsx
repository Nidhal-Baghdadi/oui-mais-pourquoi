"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import clsx from "clsx";
import React, { Suspense, useRef } from "react";
import Loader from "@/components/models/Loader";
import { Stars, Sparkles } from "@react-three/drei";
const RenderModel = ({ children, className }) => {
  return (
    <Canvas className={clsx("w-screen h-screen z-10 relative", className)}>
      <directionalLight position={[0, 3, 7]} intensity={1.7} />
      <Stars
        radius={100}
        depth={100}
        count={4000}
        factor={4}
        saturation={0}
        fade
        speed={0.3}
      />
      <Sparkles
        count={1000}
        size={3}
        speed={0.3}
        opacity={1}
        scale={56}
        color="#fff3b0"
      />
      <Suspense fallback={<Loader />} scale={0.7}>
        {children}
      </Suspense>
    </Canvas>
  );
};

export default RenderModel;
