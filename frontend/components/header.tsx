// components/navigation.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu"; // Update the path if the file is located elsewhere
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import SearchItem from "./Search";
import { ThemeToggle } from "./ToggleTheme";
import { LogIn, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import UserProfile from "./User";
import Image from "next/image";

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-6 flex justify-between w-full mx-auto h-14 items-center">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between w-full">
          <NavigationMenu>
            <NavigationMenuList>
              <Link href="/">
                <NavigationMenuItem>
                  <span className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold font-stretch-50%">
                      myCampusHome
                    </h2>
                  </span>
                </NavigationMenuItem>
              </Link>
            </NavigationMenuList>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="mx-2">
                  Category
                </NavigationMenuTrigger>
                <NavigationMenuContent></NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <SearchItem />
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              {session ? (
                <UserProfile />
              ) : (
                <div className="flex gap-2 flex-1">
                  <Button variant="ghost">
                    <Link href="/signin" className="flex items-center gap-2">
                      {" "}
                      <LogIn size={20} /> Sign in
                    </Link>
                  </Button>
                  <Button>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </NavigationMenuList>
            <NavigationMenuList className="mx-2">
              <ThemeToggle />
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden w-full items-center justify-between  ml-auto">
          <h1>myCampusHome</h1>
          <SearchItem />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col mt-16 gap-4 p-4 font-medium">
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <ThemeToggle />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
