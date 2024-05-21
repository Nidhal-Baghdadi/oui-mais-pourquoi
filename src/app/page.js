"use client"
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import RenderModel from "@/components/RenderModel"
import Avatar from "@/components/models/Avatar"
import { useRouter } from "next/navigation"


export default function Home() {

  const message = "Get in...\nWe've been waiting!"
  const caracter = "Astronaut_RaeTheRedPanda"
  const router = useRouter()
  const { data } = useSession();
  const handleClick = () => {
    signIn()
  }

  useEffect(() => {
    if (data) {
      router.push("/home")
    }
  }, [data])




  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-gradient-to-b from-[#131862] to-[#546bab]">
      <div className="w-full h-screen">
        <RenderModel >
          <group rotation={[0, -Math.PI / 4, 0]} scale={3} onClick={handleClick}>
            <Avatar message={message} caracter={caracter} avatar_animation={"Wave"} position={[0, -1, 0]} />
          </group>
        </RenderModel>
      </div>
    </main>
  );
}
