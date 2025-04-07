// components/navigation.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

import { LogIn, LogOut, Menu, Settings, UserRoundPlus } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"; // Update the path if the file is located elsewhere
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import SearchItem from "./Search";
import { ThemeToggle } from "./ToggleTheme";

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl px-6 flex justify-between w-full mx-auto h-14 items-center">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between w-full">
          <NavigationMenu className="flex-1">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/">
                  <h2 className="font-bold">myCampus Home</h2>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu className="flex-1">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
            <SearchItem />
          </NavigationMenu>
          <NavigationMenu className="flex gap-3 flex-1">
            <SignedOut>
              <div className="text-sm flex gap-1 items-center font-semibold">
                <LogIn size={16} />
                <SignInButton />
              </div>
              <Button>
                <SignUpButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <ThemeToggle />
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
                <SignedOut>
                  <div className="flex gap-2">
                    <LogIn />
                    <SignInButton />
                  </div>
                  <div className="flex gap-2">
                    <UserRoundPlus /> <SignUpButton />
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="flex gap-2">
                    <LogOut />
                    <SignOutButton />
                  </div>
                  <div className="flex gap-2">
                    <Settings />
                    <h2>Settings</h2>
                  </div>
                </SignedIn>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
