
import Banner from "@/components/models/Banner";
import Avatar from "@/components/models/Avatar";
import RenderModel from "@/components/RenderModel";
import ProfileSettings from "@/components/models/ProfileSettings"

import font from "@public/fonts/gt.json";
import { getCurrentSession } from "@lib/utils/auth";

export default async function Home() {

    let email, firstName, lastName;
    let message = "";
    const caracter = "Astronaut_RaeTheRedPanda";
    const route = "/login"

    const session = await getCurrentSession();


    if (session) {

        email = session.user.email;
        firstName = session.user.name.split("-")[0];
        lastName = session.user.name.split("-")[1];
        message = `Hello ${firstName}!`;
    }


    return (

        <main className="flex h-screen w-full items-center justify-between  bg-gradient-to-b from-[#131862] to-[#546bab]">

            <div className="flex  w-full h-screen absolute" >
                <div className="flex-grow border-white shadow-lg shadow-white/100 bg-[#38285c] rounded-lg border-2 mb-5 mx-10 px-10 mt-24">
                    <ProfileSettings className="flex items-center w-full" userData={{ email, firstName, lastName }} />
                </div>

            </div>
            <div className="w-full h-screen absolute ">
                <RenderModel>
                    <Banner
                        text={"profile settings here"}
                        color={"yellow"}
                        position={[-2, 2.8, 0]}
                        scale={0.088}
                        font={font}
                    />

                    <Avatar
                        message={message}
                        caracter={caracter}
                        avatar_animation={"Wave"}
                        position={[-13, 3.5, -7]}
                        route={route}

                    />


                </RenderModel>
            </div>
        </main>

    );
}
