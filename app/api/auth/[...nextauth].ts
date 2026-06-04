import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { AsyncCallbackSet } from "next/dist/server/lib/async-callback-set";

import { JWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
    Credentials({
      name: "Credentials",
      credentials: {
        name: { label: "Name", placeholder: "Name", type: "text" },
        email: { label: "Email", placeholder: "", type: "email" },
        password: { label: "Password", placeholder: "", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) {
          // Do not auto-create users on sign-in. Signal that account wasn't found.
          throw new Error("AccountNotFound");
        }
        const comparepassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!comparepassword) {
          return null;
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) {
        return false;
      }
      if (account?.provider == "google") {
        const userExist = await prisma.user.findFirst({
          where: {
            email: user.email,
          },
        });
        if (userExist) {
          return false;
        }
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
          },
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
