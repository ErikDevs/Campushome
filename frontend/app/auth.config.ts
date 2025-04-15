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
  secret: process.env.NEXTAUTH_SECRET,
  pages: {},
  callbacks: {
    async signIn({ user }) {
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("email", user.email)
        .single();

      if (error || !data) {
        console.error("❌ Supabase user fetch failed", error);
      } else {
        console.log("🔓 Role from Supabase:", data.role);
        user.role = data.role; // ✅ role goes into user
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role ?? "user"; // ✅ move role into token
        console.log("✅ JWT callback set token.role:", token.role);
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as string; // ✅ move token.role into session
        console.log("🧠 Session created with role:", session.user.role);
      }
      return session;
    },
  },
};
