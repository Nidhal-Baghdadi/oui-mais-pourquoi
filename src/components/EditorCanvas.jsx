"use client";
import { useState } from "react";

import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import { Stars, Sparkles } from "@react-three/drei";

import Menu from "@/components/models/Menu";
import Lesson from "@/components/models/Lesson";

const EditorCanvas = (props) => {
  const [searchData, setSearchData] = useState("Lesson");
  const { className, idx } = props;

  const title = "Lesson ";
  const handleSearchdData = (data) => {
    setSearchData(data);
  };

  const handleToggle = () => {};

  return (
    <>
      <div className="flex flex-col w-full h-screen absolute">
        <Menu
          title={title}
          onData={handleSearchdData}
          onToggle={handleToggle}
          idx={idx}
        />

        <Lesson title="Lesson" idx={idx} />
      </div>
      <Canvas className={clsx("w-full h-screen z-10 relative", className)}>
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
      </Canvas>
    </>
  );
};

export default EditorCanvas;
