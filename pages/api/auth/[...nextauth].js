import NextAuth from "next-auth"
import { authConfig } from "@lib/utils/auth"


export default NextAuth(authConfig)