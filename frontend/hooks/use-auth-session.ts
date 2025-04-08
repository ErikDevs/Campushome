// hooks/use-auth-session.ts
"use client";
import { useSession } from "next-auth/react";

export function useAuth(required = true) {
  const { data: session, status } = useSession();

  if (status === "loading") return { isLoading: true };
  if (required && !session) return { isUnauthorized: true };

  return { session, isAuthenticated: !!session };
}
