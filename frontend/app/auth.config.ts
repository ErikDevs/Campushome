// auth.config.ts
import Google from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { supabase } from "@/lib/superbaseclient";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // Add role to the Session user
    };
  }

  interface User {
    role?: string; // Extend User to include role
  }
}

export const authConfig: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  pages: {},
  callbacks: {
    async signIn({ user }) {
      // Check if user exists in Supabase and get their role
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("email", user.email)
        .single();

      if (error || !data) {
        // User not in Supabase - optionally create them
        console.log(error);
      } else {
        user.role = data.role;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // From signIn callback
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!; // Required for session validation
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
