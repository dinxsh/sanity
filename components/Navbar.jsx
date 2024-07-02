import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="relative mt-5 mx-[10%] flex items-center justify-between">
      {/* Logo */}
      <div className="">
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
      <nav className="flex flex-row items-center gap-10">
        {navLinks.map((item, index) => (
          <Link key={index} href={item.href} className=" font-semibold">
            {item.title}
          </Link>
        ))}
      </nav>

      {/*  */}
      <div className="flex items-center gap-5">
        <Link href="https://discord.gg/AB2vCdyw">
          <Button variant="outline" className="px-5 rounded-xl">
            Join Community
          </Button>
        </Link>
        <ModeToggle />
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
    title: "About",
    href: "/about",
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
