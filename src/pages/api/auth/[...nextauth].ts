import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/common/lib/prisma";

export default NextAuth({
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: +process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    verifyRequest: "/auth/verify-request",
    error: "/auth/signin",
  },
  callbacks: {
    session: async (session, user) => {
      session.user.id = user.id as string;
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
});
