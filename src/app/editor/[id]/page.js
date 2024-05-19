"use client"
import EditorCanvas from "@/components/EditorCanvas"
import { useParams } from "next/navigation";

export default function Home() {

    const params = useParams()
    return (



        <main className="flex h-screen w-full items-center justify-between  bg-gradient-to-b from-[#131862] to-[#546bab]">


            <EditorCanvas className="flex items-center w-full h-screen" idx={params.id} />


        </main >




    );
}
