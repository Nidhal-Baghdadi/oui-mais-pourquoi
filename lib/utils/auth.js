import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { getServerSession } from "next-auth";

const prismaClientSingleton = () => {
  return new PrismaClient()
}

if (!globalThis.prismaGlobal) {
  globalThis.prismaGlobal = prismaClientSingleton();
}

const prisma = globalThis.prismaGlobal;

const githubID = process.env.GITHUB_ID
const githubSecret = process.env.GITHUB_SECRET

const googleID = process.env.GOOGLE_ID
const googleSecret = process.env.GOOGLE_SECRET

if (!githubID || !githubSecret) {
  throw new Error('Missing credentials')
}

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [GithubProvider({
    clientId: githubID,
    clientSecret: githubSecret
  }
  ),
  GoogleProvider({
    clientId: googleID,
    clientSecret: googleSecret
  })],

  debug: process.env.NODE_ENV !== "production",

  secret: process.env.NEXTAUTH_SECRET
}

export async function getAdapter() {
  return authConfig?.adapter;
}

export async function getCurrentSession() {
  const session = await getServerSession(authConfig);
  if (session) return session
}

