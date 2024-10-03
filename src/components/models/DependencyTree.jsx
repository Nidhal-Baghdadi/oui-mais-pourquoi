"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Object3D } from "three";
import { extend } from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial, raycast } from "meshline";

import Card from "@/components/models/Card";

import RenderModelTree from "../RenderModelTree";
let positionTable = [];

extend({ MeshLineGeometry, MeshLineMaterial });

const lessonCount = 50;
const columns = lessonCount / 10;
const rows = lessonCount / 10;

for (let i = 0; i < 10; i++) {
  for (let j = -i; j <= i; j++) {
    const object = new Object3D();
    object.position.set(
      /*(i % columns) * 5 - columns * 2*/ j * 3.5,
      /*-(Math.floor(i / rows) % rows) * 3 + rows*/ -i * 2.5 + 5,
      /*-Math.floor(i / 25) * 3 - 2*/ 5 * Math.sin(i * j)
    );
    positionTable.push(object);
  }
}

const DependencyTree = (props) => {
  const { idx } = props;

  return (
    <div className="z-40 flex-grow overflow-auto border-white shadow-lg shadow-white/100 bg-[#38285c] rounded-lg border-2 mb-5 mx-10 px-10 mt-24">
      <RenderModelTree>
        {positionTable.map((object, index) => (
          <Card
            key={index}
            position={object.position.toArray()}
            num={idx}
            type={index % 3}
          />
        ))}
      </RenderModelTree>
    </div>
  );
};

export default DependencyTree;
