import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavItems() {
  const slideVar = {
    initial: {
      top: 0,
    },
    animate: {
      top: "80px",
      transition: {
        duration: 0.25,
        ease: cubicBezier(0.65, 0, 0.35, 1),
      },
    },
    exit: {
      top: 0,
      transition: {
        duration: 0.25,
        ease: cubicBezier(0.65, 0, 0.35, 1),
      },
    },
  };

  return (
    <motion.div
      variants={slideVar}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute z-[2] flex justify-center items-center left-0 w-full bg-primary"
    >
      <Link
        href={"/"}
        className="w-full border-[1px] text-center p-4 overflow-hidden hover:bg-accent transition-all font-medium"
      >
        TOURNAMENTS
      </Link>
      <Link
        href={"/"}
        className="w-full border-[1px] text-center p-4 overflow-hidden hover:bg-accent transition-all font-medium"
      >
        GAMES
      </Link>
      <Link
        href={"/"}
        className="w-full border-[1px] text-center p-4 overflow-hidden hover:bg-accent transition-all font-medium"
      >
        TEAMS
      </Link>
      <Link
        href={"/"}
        className="w-full border-[1px] text-center p-4 overflow-hidden hover:bg-accent transition-all font-medium"
      >
        BLOGS
      </Link>
      <Link
        href={"/"}
        className="w-full border-[1px] text-center p-4 overflow-hidden hover:bg-accent transition-all font-medium"
      >
        NEWS
      </Link>
      <Link
        href={"/"}
        className="w-full border-[1px] text-center p-4 overflow-hidden hover:bg-accent transition-all font-medium"
      >
        CONTACT
      </Link>
    </motion.div>
  );
}
