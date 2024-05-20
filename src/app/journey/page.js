"use client"
import { useState } from 'react';
import RenderModel from "@/components/RenderModel"
import JourneyCanvas from "@/components/models/JourneyCanvas"
import Menu from "@/components/models/Menu"
import { useParams } from "next/navigation";


export default function Home() {

  const [searchData, setSearchData] = useState('');
  const { id } = useParams()

  const handleSearchdData = (data) => {
    setSearchData(data);

  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-gradient-to-b from-[#0d1044] to-[#435588]">
      <div className="w-full h-screen">
        <Menu title="Journeys" onData={handleSearchdData} />
        < RenderModel >
          <JourneyCanvas searchData={searchData} />
        </RenderModel >
      </div >
    </main >
  );
}
