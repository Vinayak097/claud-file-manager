import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { AsyncCallbackSet } from "next/dist/server/lib/async-callback-set";

import { JWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module 'next-auth/jwt' {
  interface JWT{
    id:string
  }
}
declare module 'next-auth'{
  interface Session{
    user:{
      id:string
    }& DefaultSession["user"]
  }
}
export const authOptions:NextAuthOptions = {
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
        email: { label: "Email", placeholder: "", type: "email" },
        password: { label: "Password", placeholder: "", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        
        
        return {
          id: "2",
          email:credentials.email,
          
          name: "hello",
        };
      },
      
    }),
    
  ],
   callbacks: {
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
