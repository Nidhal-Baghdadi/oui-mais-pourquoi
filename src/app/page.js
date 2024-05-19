import RenderModel from "@/components/RenderModel"
import NavigationMenu from "@/components/models/NavigationMenu"
import Globe from "@/components/models/Globe"



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-gradient-to-b from-[#131862] to-[#546bab]">
      <div className="w-full h-screen">
        <RenderModel >
          <NavigationMenu />
          <Globe />

        </RenderModel>
      </div>
    </main>
  );
}
