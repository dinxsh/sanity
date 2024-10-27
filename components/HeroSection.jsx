"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section
      className="px-10 mx-auto md:px-[8%] xl:px-[15%] my-20 md:my-32 gap-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.4,
      }}
    >
      <div className="space-y-5 max-w-4xl mx-auto text-center">
        <h4 className="text-sm text-indigo-600 font-medium">
          Discover new heights
        </h4>

        <h1 className="text-4xl font-extrabold mx-auto md:text-5xl max-w-3xl">
          Level Up Your Esports Journey with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
            Sanity Esports
          </span>
        </h1>

        <h6 className="max-w-2xl mx-auto">
          The Go-To Esports Platform at the intersection of esports and mental
          well-being
        </h6>

        <div className="flex items-center justify-center gap-4">
          <Link href="/">
            <Button>Get Started</Button>
          </Link>

          <Link href="/">
            <Button variant="outline">Learn More</Button>
          </Link>
        </div>
      </div>

      <div className="mt-20">
        <Image
          src="/hero.jpg"
          height={1000}
          width={1200}
          className="mx-auto shadow-lg rounded-2xl"
          alt=""
          draggable={false}
        />
      </div>
    </motion.section>
  );
}
