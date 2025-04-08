"use client";

import { FcGoogle } from "react-icons/fc";

import { signIn } from "next-auth/react";

export function LoginButton() {
  return (
    <button
      className="border w-full rounded-md my-4 py-2"
      onClick={() => signIn()}
    >
      <h2 className="flex items-center gap-2 justify-center">
        <FcGoogle size={32} />
        Sign in with Google
      </h2>
    </button>
  );
}
