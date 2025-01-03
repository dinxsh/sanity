"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { usePathname } from "next/navigation";
import NotificationBar from "../components/Notification";
import { useSession } from "next-auth/react";
import UserProfile from "../components/UserProfile";
import { LogoutButton } from "./LogoutButton";
import { BiExit } from "react-icons/bi";

const Navbar = () => {
  const session = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pathname = usePathname();

  const isActive = (pathname, href) => {
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <div
      className={`sticky top-0 z-50 py-4 px-5 xl:px-[10%] flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 
      ${scrolled ? "border-b border-neutral-700" : ""}
    `}
    >
      <div className="flex gap-20">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="home-page"
          >
            <Image
              src="/sanity_esports_logo.jpg"
              alt="logo"
              height={35}
              width={35}
              className="rounded"
            />
            <h1 className="text-4xl lg:text-xl font-bold tracking-normal mt-1">
              Sanity
            </h1>
          </Link>
        </div>
      </div>
      {/* links */}
      <nav className="hidden lg:flex flex-row items-center pt-2 gap-6 xl:gap-10 transition-all">
        {navLinks.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`font-medium hover:text-foreground/90 transition-all
                ${isActive(pathname, item.href) ? "text-foreground" : "text-foreground/60"}
              `}
            aria-label={`${item.href}-nav-item`}
          >
            {item.title}
          </Link>
        ))}
      </nav>

      {/* buttons */}
      <div className="hidden lg:flex lg:items-center pt-2 gap-4 transition-all">
        {session.status == "authenticated" ? (
          <div className="flex flex-row justify-start space-x-4">
            <NotificationBar />
            <UserProfile />
          </div>
        ) : (
          <Link href="/sign-up" aria-label="join-community">
            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-1.5 px-4 ring-1 ring-white/10 ">
                <span className="text-sm font-semibold">Sign Up</span>
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
          </Link>
        )}
      </div>

      {/* mobile nav menu */}
      <div className="lg:hidden flex flex-row gap-8 items-center transition-all">
        {session.status == "authenticated" && <NotificationBar />}
        <Sheet>
          <SheetTrigger>
            <AlignJustify aria-label="nav-toggle-mob" className="size-7" />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start justify-start bg-black">
            <SheetHeader>
              <SheetTitle>Contents</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 mt-2">
              <nav className="flex flex-col gap-4">
                {navLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="font-medium text-lg"
                    aria-label={`${item.title}-nav-item`}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
            <SheetFooter className="mt-2 w-full items-center flex justify-center">
              {session.status == "authenticated" ? (
                <div className="w-full flex items-center justify-center">
                  <LogoutButton>
                    <BiExit className="text-red-400 w-5 h-5 mr-2" />
                    <span>Logout</span>
                  </LogoutButton>
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  aria-label="join-community"
                  className="w-full"
                >
                  <Button
                    variant="outline"
                    className="bg-primary hover:bg-primary-hover border border-neutral-700 w-full "
                    arial-label="join-community-btn"
                  >
                    SignIn
                  </Button>
                </Link>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;

const navLinks = [
  {
    title: "Tournaments",
    href: "/tournaments",
  },
  {
    title: "Bracket",
    href: "/bracket",
  },
  {
    title: "Games",
    href: "/games",
  },
  {
    title: "Teams",
    href: "/teams",
  },
  {
    title: "Blogs",
    href: "/blogs",
  },
  {
    title: "News",
    href: "/news",
  },
];
