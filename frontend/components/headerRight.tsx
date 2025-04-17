import React from "react";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { LogIn } from "lucide-react";

const HeaderRight = () => {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="flex">
            <NavigationMenuLink>
              <Link href="/signin" className="flex items-center gap-2">
                <LogIn size={20} /> Sign in
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink>
              <Link href="/signup">Sign Up</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default HeaderRight;
