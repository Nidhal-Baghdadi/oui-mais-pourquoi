"use client"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import dynamic from "next/dynamic";
// import RenderModel from "@/components/RenderModel"
import Avatar from "@/components/models/Avatar"
import { useRouter } from "next/navigation"

const RenderModel = dynamic(() => import("@/components/RenderModel"), { ssr: false })

export default function Home() {

  const message = "Get in...\nWe've been waiting!"
  const caracter = "Astronaut_RaeTheRedPanda"
  const router = useRouter()
  const { data } = useSession();
  const route = "/login";

  useEffect(() => {
    if (data) {
      router.push("/home")
    }
  }, [data, router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-gradient-to-b from-[#131862] to-[#546bab]">
      <div className="w-full h-screen">
        <RenderModel >
          <group rotation={[0, -Math.PI / 4, 0]} scale={3}>
            <Avatar message={message} caracter={caracter} avatar_animation={"Wave"} position={[0, -1, 0]} route={route} />
          </group>

        </RenderModel>
      </div>
    </main>
  );
}
