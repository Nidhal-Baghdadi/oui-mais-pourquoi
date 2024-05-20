import RenderModel from "@/components/RenderModel"
import NavigationMenu from "@/components/models/NavigationMenu"
import Globe from "@/components/models/Globe"
import Avatar from "@/components/models/Avatar"



export default function Home() {

  const message = "Clean\nyour room!"
  const caracter = "Astronaut_FernandoTheFlamingo"

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-gradient-to-b from-[#131862] to-[#546bab]">
      <div className="w-full h-screen">
        <RenderModel >
          <NavigationMenu />
          <Globe />
          <Avatar message={message} caracter={caracter} />
        </RenderModel>
      </div>
    </main>
  );
}
