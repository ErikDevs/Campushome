"use client";

import { FcGoogle } from "react-icons/fc";

import { signIn } from "next-auth/react";

export function SignUpButton() {
  return (
    <button className="border w-full my-4 py-2" onClick={() => signIn()}>
      <h2 className="flex items-center gap-2 justify-center">
        <FcGoogle size={32} />
        Sign up with Google
      </h2>
    </button>
  );
}
