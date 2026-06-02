import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";
export const authOptions = {
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
          name: "hello",
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
