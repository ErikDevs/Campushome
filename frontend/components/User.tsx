"use client";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { ThemeToggle } from "./ToggleTheme";

export const dynamic = "force-dynamic";

const UserProfile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Please log in</div>;

  return (
    <div className="md:flex hidden  items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <h2 className="capitalize">{session?.user.name}</h2>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>

          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2"
              >
                <LogOut />
                signOut
              </button>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ThemeToggle />
    </div>
  );
};

export default UserProfile;
