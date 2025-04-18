"use client";

import React from "react";
import { Button } from "@/components/ui/button";
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
import { FcGoogle } from "react-icons/fc";

const UserSignup = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>My Campus Home</CardTitle>
        <CardDescription>Join us today</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/signin" })}
          className="flex  w-full items-center rounded-md justify-center gap-2 border py-2 mb-4"
        >
          {" "}
          <FcGoogle /> SignIn with Google
        </Button>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex w-full justify-between">
          <Button variant="outline">
            <Link href="/">Cancel</Link>
          </Button>
          <Button>Sign up</Button>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <span className="text-neutral-50">
            <Link href="/signin">Signin here</Link>
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default UserSignup;
