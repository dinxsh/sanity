import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection/FeatureSection";
import FaqSection from "../components/FaqSection";
import { prefetchTournaments } from "../lib/prefetchTournaments";

export default async function Home() {
  // Prefetch tournaments data
  await prefetchTournaments();

  return (
    <main className="">
      <HeroSection />
      <FeatureSection />
      <FaqSection />
    </main>
  );
}
