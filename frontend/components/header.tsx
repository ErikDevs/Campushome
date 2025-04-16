// components/navigation.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu"; // Update the path if the file is located elsewhere
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import SearchItem from "./Search";
import { LogIn, LogOut, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import UserProfile from "./User";
import { ThemeToggle } from "./ToggleTheme";

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Desktop Navigation */}
      <nav className="w-full justify-center flex h-14">
        <NavigationMenu>
          <ul className="flex justify-between w-full gap-32">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/">
                  <h2 className="text-2xl font-semibold font-stretch-50%">
                    myCampusHome
                  </h2>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>

            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components that you can copy
                            and paste into your apps. Accessible. Customizable.
                            Open Source.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <Link href="/docs" title="Introduction">
                      Re-usable components built using Radix UI and Tailwind
                      CSS.
                    </Link>
                    <Link href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </Link>
                    <Link href="/docs/primitives/typography" title="Typography">
                      Styles for headings, paragraphs, lists...etc
                    </Link>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <Link href="/post-listing">Start Selling</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>

            <NavigationMenuList>
              <NavigationMenuItem>
                <SearchItem />
              </NavigationMenuItem>
            </NavigationMenuList>

            <NavigationMenuList>
              {session ? (
                <UserProfile />
              ) : (
                <NavigationMenuItem className="flex">
                  <NavigationMenuLink>
                    <Link href="/signin" className="flex items-center gap-2">
                      {" "}
                      <LogIn size={20} /> Sign in
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    <Link href="/signup">Sign Up</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </ul>
        </NavigationMenu>
      </nav>

      {/* Mobile Navigation */}
      <div className="flex md:hidden w-full items-center justify-between  ml-auto">
        <h1>myCampusHome</h1>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col mt-16 gap-4 p-4 font-medium">
              <h2>{session?.user.name}</h2>
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

              {session ? (
                <div className="flex flex-col gap-4 font-medium">
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    My account
                  </Link>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    Team
                  </Link>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    Subscription
                  </Link>
                  <Link
                    className="text-muted-foreground flex items-center gap-2 hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                    href="/category"
                  >
                    Filter Products
                  </Link>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    <button
                      className="flex gap-2 items-center"
                      onClick={() => signOut()}
                    >
                      <LogOut />
                      Signout
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/signin"
                    className="text-muted-foreground flex items-center gap-2 hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn size={20} /> Sign in
                  </Link>

                  <Link
                    className="text-muted-foreground flex items-center gap-2 hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                    href="/signup"
                  >
                    <LogIn size={20} /> Sign Up
                  </Link>
                </div>
              )}
              <ThemeToggle />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
