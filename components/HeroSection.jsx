"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import FaqSection from "./FaqSection";
import FeatureSectionGrid from "./FeatureSection/FeatureSectionGrid";

export default function HeroSection() {
  return (
    <motion.section
      className="container mx-auto px-4 lg:py-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <div className="flex items-center  gap-2 w-fit mx-auto px-4 py-1.5  rounded-full text-sm font-medium border border-neutral-700">
          <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            &#10024; Discover new heights{" "}
          </p>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl md:text-6xl font-bold leading-tight">
          Level Up Your Esports Journey with{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Sanity Esports
          </span>
        </h1>

        <p className="w-11/12 md:w-1/2 text-md lg:text-xl text-gray-400   text-center max-w-xl mx-auto">
          The Go-To Esports Platform at the intersection of esports and mental
          well-being
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link href="#feature-section" passHref>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-hover"
              aria-label="get-started-btn"
            >
              Get Started
            </Button>
          </Link>
          <Link href="#faq-section" passHref>
            <Button size="lg" variant="outline" aria-label="learn-more-btn">
              Learn More
            </Button>
          </Link>
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
          className="rounded-2xl shadow-2xl mx-auto w-11/12 md:w-3/4"
          alt="Sanity Esports Hero"
          priority
        />
      </motion.div>
    </motion.section>
  );
}
