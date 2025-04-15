// app/signin/page.tsx (or your login page)
import { authConfig } from "@/app/auth.config";
import UserSignin from "@/components/signin";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

export default async function SignInPage() {
  // Check if user is already logged in
  const session = await getServerSession(authConfig);

  if (session) {
    // If logged in, redirect to dashboard (or home page)
    redirect("/admin");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <UserSignin />
    </div>
  );
}
