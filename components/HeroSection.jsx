"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
// import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    // <motion.section
    //   className="container mx-auto px-4 py-20"
    //   initial={{ opacity: 0, y: 50 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.8, delay: 0.4 }}
    // >
    <div>

      <div className="text-center max-w-4xl mx-auto space-y-6">
        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
          Discover new heights
        </span>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Level Up Your Esports Journey with{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Sanity Esports
          </span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The Go-To Esports Platform at the intersection of esports and mental well-being
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Button size="lg" className="bg-primary hover:bg-primary-hover">
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>

       {/* <motion.div  */}
      {/* //   className="mt-20"
      //   initial={{ opacity: 0, y: 20 }}
      //   animate={{ opacity: 1, y: 0 }}
      //   transition={{ delay: 0.6 }}
      // > */}
        <Image
          src="/hero.jpg"
          height={1000}
          width={1200}
          className="rounded-2xl shadow-2xl mx-auto"
          alt="Sanity Esports Hero"
          priority
        />
        </div>
    //   </motion.div>
    // </motion.section>
  );
}
