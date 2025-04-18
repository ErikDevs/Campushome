"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";

const UserSignin = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Welcome back to My Campus Home</CardTitle>
        <CardDescription>
          The safest est and the fastest way to sell or buy campus amenities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/signin" })}
          className="flex  w-full items-center rounded-md justify-center gap-2 border py-2 mb-4"
        >
          {" "}
          <FcGoogle /> Signin with Google
        </Button>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="name" placeholder="example@example.com" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input id="name" placeholder="******" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex w-full justify-between">
          <Button variant="outline">
            <Link href="/">Cancel</Link>
          </Button>
          <Button>Sign in</Button>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Don't have an account?{" "}
          <span className="text-neutral-50">
            <Link href="/signup">Signup here</Link>
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default UserSignin;
