"use client";

import Link from "next/link";
import { Button } from "./ui/button";
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
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-hover"
                aria-label="host-tournament-btn"
              >
                Host a Tournament
              </Button>
            </Link>
            <Link href="#faq-section" passHref>
              <Button size="lg" variant="outline" aria-label="learn-more-btn">
                Learn More
              </Button>
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
