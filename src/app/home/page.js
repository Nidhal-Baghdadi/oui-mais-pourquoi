"use server"
import RenderModel from "@/components/RenderModel"
import NavigationMenu from "@/components/models/NavigationMenu"
import { getCurrentSession } from "@lib/utils/auth"
import Globe from "@/components/models/Globe"
import Avatar from "@/components/models/Avatar"
import Banner from "@/components/models/Banner"

import font from "@public/fonts/gt.json";


export default async function Home() {

  const message = "Clean\nyour room!"
  const caracter = "Astronaut_FernandoTheFlamingo"

  const session = await getCurrentSession()
  if (session) {
    console.log(session.user)
  }




  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-gradient-to-b from-[#131862] to-[#546bab]">
      <div className="w-full h-screen">
        <RenderModel >
          <NavigationMenu />
          <Globe />
          <Banner
            text={"Hover\nover\nobjects..."}
            color={"yellow"}
            position={[0, 1, 0]}
            font={font}
            scale={0.1}
          />
          <Avatar message={message} caracter={caracter} avatar_animation={"Wave"} position={[-13, 3.5, -7]} />
        </RenderModel>
      </div>
    </main>
  );
}
