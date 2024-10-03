"use client"
import LessonCanvas from "@/components/LessonCanvas"
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {

    const params = useParams()
    const searchParams = useSearchParams()
    const attributes = searchParams.getAll("subject")
    const [seed, setSeed] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/journey/courses/data?id=${params.id}`);
                const result = await response.json();
                if (seed == null) {
                    setSeed(result);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [seed]);



    return (

        <main className="flex h-screen w-full items-center justify-between  bg-gradient-to-b from-[#131862] to-[#546bab]">
            <LessonCanvas className="flex items-center w-full h-screen" idx={params.id} subject={attributes[0]} />

        </main >
    );
}
