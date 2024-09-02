"use client";

import Image from "next/image";
import NavMenu from "./NavMenu";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import NavItems from "./NavItems";

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
    <div className="sticky w-full top-0 left-0 z-10">
      <div className="relative z-10 bg-primary border-[1px] p-4 flex items-center justify-between">
      <Image
        className="h-[40px] w-auto"
        src={"/assets/logo.jpg"}
        height={20}
        width={20}
        alt="Sanity Esports"
      />
      <p className="text-2xl font-semibold">Sanity Esports</p>

      <button onClick={handleMenu}>
        <Image
          className={`h-[30px] w-auto ${rotate} transition-all`}
          src={"/assets/menu.svg"}
          height={40}
          width={40}
          alt="Menu"
        />
      </button></div>

      <AnimatePresence>{menu && <NavItems />}</AnimatePresence>
      {/* <NavItems /> */}
    </div>
  );
}
