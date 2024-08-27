"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
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

const Navbar = () => {
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
      className={`sticky top-0 z-50 py-4 px-5 xl:px-[10%] flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all
      ${scrolled ? "border-b" : ""}
    `}
    >
      <div className="flex items-center gap-10">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/sanity_esports_logo.jpg"
              alt="logo"
              height={30}
              width={30}
              className="rounded"
            />
            <h1 className="text-2xl font-semibold tracking-tight mt-1">
              Sanity Gaming
            </h1>
          </Link>
        </div>

        {/* links */}
        <nav className="hidden lg:flex flex-row items-center pt-2 gap-4 transition-all">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`font-medium hover:text-foreground/90 transition-all
                ${isActive(pathname, item.href) ? "text-foreground" : "text-foreground/60"}
              `}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* buttons */}
      <div className="hidden lg:flex items-center gap-4 transition-all">
        <Link href="https://discord.com/invite/rUYVa93Svr">
          <Button variant="outline" className="px-5 rounded-md">
            Join Community
          </Button>
        </Link>
        <ModeToggle />
      </div>

      {/* mobile nav menu */}
      <div className="lg:hidden transition-all">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <AlignJustify />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start justify-start">
            <SheetHeader>
              <SheetTitle>
                <ModeToggle />
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 mt-10">
              <nav className="flex flex-col gap-4">
                {navLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="font-medium text-lg"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
            <SheetFooter className="mt-10">
              <Link href="https://discord.com/invite/rUYVa93Svr">
                <Button variant="link" className="px-5 -ml-5 text-lg underline">
                  Join Community
                </Button>
              </Link>
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
  {
    title: "Contact",
    href: "/contact",
  },
];
