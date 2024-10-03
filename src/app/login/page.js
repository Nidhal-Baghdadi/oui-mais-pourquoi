import LoginForm from "@/components/models/LoginForm"
import { getServerSession } from "next-auth";
import { authConfig } from "@lib/utils/auth";
import { redirect } from "next/navigation";


export default async function Home() {

    const session = await getServerSession(authConfig);

    if (session) return redirect("/home");

    return (
        <main className="z-50 flex h-screen w-full items-center absolute justify-between bg-gradient-to-b from-[#131862] to-[#546bab]">
            <LoginForm className="flex items-center w-full h-screen" />
        </main>
    );
}
