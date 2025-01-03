"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Vortex } from "../@/components/ui/vortex";

export default function HeroSection() {
  return (
    <motion.section
      className="container mx-auto px-4 lg:py-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <Vortex>
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="flex items-center  gap-2 w-fit mx-auto px-4 py-1.5  rounded-full text-sm font-medium border border-neutral-700">
            <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-white">
              Discover new heights{" "}
            </p>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Manage your gaming competitions{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-white">
              with the right tools
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sanity is a suite of powerful tools for organizers, agencies,
            studios and publishers to manage and showcase their tournaments.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="#feature-section" passHref>
              <button className="p-[3px] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                  Host a Tournament
                </div>
              </button>
            </Link>
            <Link href="#faq-section" passHref>
              <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Learn More
                </span>
              </button>
            </Link>
          </div>
        </div>
      </Vortex>

      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Image
          src="/hero.jpg"
          height={1000}
          width={1200}
          className="rounded-2xl shadow-2xl mx-auto w-11/12 md:w-3/4"
          alt="Sanity Esports Hero"
          priority
        />
      </motion.div>
    </motion.section>
  );
}
