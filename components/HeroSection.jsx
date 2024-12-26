"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <motion.section
      className="container mx-auto px-4 py-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <div className="flex items-center  gap-2 w-fit mx-auto px-4 py-1.5  rounded-full text-sm font-medium border border-neutral-700">
          <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            &#10024; Discover new heights{" "}
          </p>
          <ArrowRight className="size-4" />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Level Up Your Esports Journey with{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Sanity Esports
          </span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The Go-To Esports Platform at the intersection of esports and mental
          well-being
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-hover"
            arial-label="get-started-btn"
          >
            Get Started
          </Button>
          <Button size="lg" variant="outline" arial-label="learn-more-btn">
            Learn More
          </Button>
        </div>
      </div>

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
          className="rounded-2xl shadow-2xl mx-auto"
          alt="Sanity Esports Hero"
          priority
        />
      </motion.div>
    </motion.section>
  );
}
