"use client"
import Banner from "@/components/models/Banner";
import RenderModel from "@/components/RenderModel"

import { useParams } from "next/navigation";
import font from "@public/fonts/gt.json";


export default function Home() {

    const params = useParams()
    return (



        <main className="z-50 flex h-screen w-full items-center absolute justify-between  bg-gradient-to-b from-[#131862] to-[#546bab]">


            <RenderModel >

                <Banner
                    text={"Your profile here"}
                    color={"yellow"}
                    position={[0, 0, 0]}
                    scale={0.2}
                    font={font}
                />


            </RenderModel>


        </main >




    );
}
