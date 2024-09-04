"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import NavItems from "./NavItems";
import Link from "next/link";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [rotate, setRotate] = useState("rotate-0");
  const handleMenu = () => {
    if (menu) {
      setMenu(false);
      setRotate("rotate-0");
    } else {
      setMenu(true);
      setRotate("rotate-45");
    }
  };
  return (
    <div className="fixed backdrop-blur top-0 left-1/2 -translate-x-1/2 w-[80%] my-6 px-8 py-4 rounded-full z-10 bg-[rgba(0,0,0,0.75)] flex items-center justify-between">
      <Image
        className="h-[40px] w-auto rounded-full"
        src={"/assets/logo.jpg"}
        height={20}
        width={20}
        alt="Sanity Esports"
      />
      <div className="flex justify-between items-center gap-10">
        <Link href={"/tournaments"} className="link transition-all">
          TOURNAMENTS
        </Link>
        <Link href={"/teams"} className="link transition-all">
          TEAMS
        </Link>
        <Link href={"/blogs"} className="link transition-all">
          BLOGS
        </Link>
        <Link href={"/news"} className="link transition-all">
          NEWS
        </Link>
        <Link href={"/contact"} className="link transition-all">
          CONTACT
        </Link>
      </div>
    </div>
  );
}
