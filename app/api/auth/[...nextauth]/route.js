import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prismaDB } from "@/db/db.config";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("You must provide both an email and a password");
        }

        const user = await prismaDB.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          throw new Error("user not found or invalid email");
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Password is incorrect");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
        token.isAdmin = user.isAdmin;
        token.phone = user.phone;
      }
      return token;
    },

    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub;
        session.user.isAdmin = token.isAdmin;
        session.user.phone = token.phone;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
