"use client";
import React from "react";
import Card from "@/components/models/Card";

import { Object3D } from "three";
import { DragControls } from "@react-three/drei";
import RenderModelTree from "../RenderModelTree";
let positionTable = [];

const lessonCount = 50;
const columns = lessonCount / 10;
const rows = lessonCount / 10;

for (let i = 0; i < lessonCount; i++) {
  const object = new Object3D();
  object.position.set(
    (i % columns) * 5 - columns * 2,
    -(Math.floor(i / rows) % rows) * 3 + rows,
    -Math.floor(i / 25) * 3 - 2
  );

  positionTable.push(object);
}

const DependencyTree = (props) => {
  const { idx } = props;

  return (
    <div className="z-40 flex-grow overflow-auto border-white shadow-lg shadow-white/100 bg-[#38285c] rounded-lg border-2 mb-5 mx-10 px-10 mt-24">
      <RenderModelTree>
        {positionTable.map((object, index) => (
          <DragControls key={index}>
            <Card
              key={index}
              position={object.position.toArray()}
              num={index}
              type={index % 3}
            />
          </DragControls>
        ))}
      </RenderModelTree>
    </div>
  );
};

export default DependencyTree;
