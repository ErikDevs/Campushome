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
import HeaderRight from "./headerRight";

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Desktop Navigation */}
      <nav className="w-full hidden  mx-auto justify-between container  gap-4 items-center md:flex h-14">
        <Link href="/">
          <h2 className="text-2xl font-semibold font-stretch-50%">
            myCampusHome
          </h2>
        </Link>
        <NavigationMenu className="gap-x-4">
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
                          Beautifully designed components that you can copy and
                          paste into your apps. Accessible. Customizable. Open
                          Source.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <Link href="/docs" title="Introduction">
                    <NavigationMenuLink>
                      Re-usable components built using Radix UI and Tailwind
                      CSS.
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/docs/installation" title="Installation">
                    <NavigationMenuLink>
                      How to install dependencies and structure your app.
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/docs/primitives/typography" title="Typography">
                    <NavigationMenuLink>
                      Styles for headings, paragraphs, lists...etc
                    </NavigationMenuLink>
                  </Link>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuLink>
              <Link href="/post-listing">Start Selling</Link>
            </NavigationMenuLink>
          </NavigationMenuList>
          <SearchItem />
        </NavigationMenu>

        {session ? <UserProfile /> : <HeaderRight />}
      </nav>

      {/* Mobile Navigation */}
      <div className="flex md:hidden px-2 w-full items-center justify-between h-14  ml-auto">
        <Link href="/">
          <h1 className="text-xl font-bold">myCampusHome</h1>
        </Link>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col mt-16 justify-between gap-4 p-4 font-medium">
              <div className="flex flex-col gap-4 font-medium">
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {session ? (
                    <h2>{session?.user.name}</h2>
                  ) : (
                    <h2>My Account</h2>
                  )}
                </Link>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>

                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
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
                  <Link
                    href="/post-listing"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    Start Selling
                  </Link>
                </Link>
              </div>

              <div className="gap-4 flex flex-col">
                {session ? (
                  <button
                    className="flex gap-2 mt-4 items-center"
                    onClick={() => signOut()}
                  >
                    <LogOut />
                    Signout
                  </button>
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
              </div>
              <ThemeToggle />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
