import Link from "next/link";
import React from "react";
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

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 py-4 px-5 md:px-[5%] xl:px-[10%] flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://sanityesports.live/sanity_esports_logo.jpeg"
            alt="logo"
            height={40}
            width={40}
            className="rounded-xl"
          />
          <h1 className="text-2xl font-semibold mt-1">Sanity Gaming</h1>
        </Link>
      </div>

      {/* links */}
      <nav className="hidden lg:flex flex-row items-center mt-2 gap-8 transition-all">
        {navLinks.map((item, index) => (
          <Link key={index} href={item.href} className="font-medium">
            {item.title}
          </Link>
        ))}
      </nav>

      {/* buttons */}
      <div className="hidden lg:flex items-center gap-5 transition-all">
        <Link href="https://discord.gg/AB2vCdyw">
          <Button variant="outline" className="px-5 rounded-xl">
            Join Community
          </Button>
        </Link>
        <ModeToggle />
      </div>

      {/* ham menu */}
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
              <Link href="https://discord.gg/AB2vCdyw">
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
    title: "Home",
    href: "/",
  },
  {
    title: "Tournaments",
    href: "/tournaments",
  },
  {
    title: "Games",
    href: "/games",
  },

  {
    title: "Blogs",
    href: "/blogs",
  },
  {
    title: "About",
    href: "/about",
  },

  {
    title: "Contact",
    href: "/contact",
  },
];
