"use client"
import LessonCanvas from "@/components/LessonCanvas"
import { useParams, useSearchParams } from "next/navigation";

export default function Home() {

    const params = useParams()
    const searchParams = useSearchParams()
    const attributes = searchParams.getAll("subject")

    return (



        <main className="flex h-screen w-full items-center justify-between  bg-gradient-to-b from-[#131862] to-[#546bab]">


            <LessonCanvas className="flex items-center w-full h-screen" idx={params.id} subject={attributes[0]} />


        </main >




    );
}
