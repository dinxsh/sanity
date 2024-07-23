import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section>
      <div className="px-10 mx-auto md:px-[8%] xl:px-[15%] mt-28 md:mt-36 gap-20 transition-all">
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

        <div className="hidden md:block mt-20">
          <Image
            src="https://sanityesports.live/demo.png"
            height={1000}
            width={1200}
            className="w-full shadow-lg rounded-lg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
