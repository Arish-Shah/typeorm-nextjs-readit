import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "../lib/prisma";
import { credentials } from "./credentials";

export const handler = NextAuth({
  providers: [Providers.Email({ ...credentials })],
  adapter: PrismaAdapter(prisma),
});
