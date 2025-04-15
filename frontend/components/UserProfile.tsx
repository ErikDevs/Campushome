"use client";

import { useSession } from "next-auth/react";
import moment from "moment";
import { Button } from "@/components/ui/button";

import { ProfileForm } from "@/components/ProfileForm";
import Image from "next/image";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

const UserProfile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="flex flex-col mx-4 mt-8 w-full gap-2">
      <div className="min-w-7xl flex w-full mx-auto justify-between gap-2">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold capitalize">
            Welcome, {session?.user.name}
          </h2>
          <p className="text-gray-500 text-sm">{moment().format("ll")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={session?.user.image || "/default-profile.png"}
            alt="user-profile"
            width={32}
            height={32}
            className="rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col bg-gradient-to-tr from-blue-300 h-20 rounded-t-md to-yellow-200"></div>
      <div className="flex flex-col">
        <div className="flex gap-4 justify-between mt-4">
          <div className="flex gap-4">
            <Image
              src={session?.user.image || "/default-profile.png"}
              alt="user-profile"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold capitalize">
                {session?.user.name}
              </h2>
              <p className="text-gray-500 text-sm">{session?.user.email}</p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <Button>Edit</Button>
            <Link href="/" className="flex ">
              <ArrowBigLeft />
              Go back home
            </Link>
          </div>
        </div>
        <div className="flex flex-col mt-10">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
