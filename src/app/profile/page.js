"use client"
import Banner from "@/components/models/Banner";
import Avatar from "@/components/models/Avatar";
import RenderModel from "@/components/RenderModel"

import font from "@public/fonts/gt.json";


export default function Home() {

    const message = "Hello again!"
    const caracter = "Astronaut_RaeTheRedPanda"


    return (



        <main className="z-50 flex h-screen w-full items-center absolute justify-between  bg-gradient-to-b from-[#131862] to-[#546bab]">


            <RenderModel >

                <Banner
                    text={"profile settings\nhere"}
                    color={"yellow"}
                    position={[0, -2, 0]}
                    scale={0.2}
                    font={font}
                />
                <Avatar message={message} caracter={caracter} />


            </RenderModel>


        </main >




    );
}
