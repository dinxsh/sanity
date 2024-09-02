"use client";

import { cubicBezier, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Features from "@/components/section/Features";

export default function Home() {
  const initialVar = {
    initial: {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      top: "100px",
    },
    animate: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      top: "0px",
      transition: {
        ease: cubicBezier(0, 0.55, 0.45, 1),
        duration: 0.75,
      },
    },
  };

  return (
    <main className="">
      <div className="w-full h-[85vh] relative -z-[1]">
        <video
          className="w-full h-full object-cover border-[1px] mt-2"
          autoPlay
          muted
          loop
        >
          <source src="/assets/trailer.webm" type="video/mp4" />
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary to-transparent z-0 border-x-[1px]"></div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center leading-tight">
          <motion.h1
            variants={initialVar}
            initial="initial"
            animate="animate"
            className="text-[100px] font-semibold"
          >
            Sanity Esports
          </motion.h1>
          <motion.p
            variants={initialVar}
            initial="initial"
            animate="animate"
            className="text-[20px] font-medium"
          >
            The Go-To Esports Platform at the intersection of esports and mental
            well-being
          </motion.p>
        </div>
      </div>
      <div className="w-full flex justify-center gap-10 text-[15px] font-medium border-x-[1px]">
        <Link
          href={""}
          className="bg-accent px-7 py-3 hover:bg-[red] transition-all items-center inline-flex"
        >
          GET STARTED
        </Link>
        <Link
          href={""}
          className="bg-primary px-7 py-3 hover:bg-[#111111] transition-all inline-flex gap-4 items-center"
        >
          LEARN MORE{" "}
          <Image
            src="/assets/arrow-right.svg"
            className="h-[12] w-auto"
            height={32}
            width={32}
            alt="Learn More"
          />
        </Link>
      </div>
      <Features />
    </main>
  );
}
