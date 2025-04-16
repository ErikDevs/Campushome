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
        <CardTitle>Welcome back to my Campus Home</CardTitle>
        <CardDescription>
          The safest est and the fastest way to sell or buy campus amenities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <button
          onClick={() => signIn("google", { callbackUrl: "/signin" })}
          className="flex  w-full items-center justify-center gap-2 border py-2 mb-4"
        >
          {" "}
          <FcGoogle /> Signin with Google
        </button>
        <form>
          <div className="grid w-full items-center gap-4">
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
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Link href="/">Cancel</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserSignin;
