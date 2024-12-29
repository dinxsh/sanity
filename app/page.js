// import HeroSection from "../components/HeroSection";
// import FeatureSection from "../components/FeatureSection/FeatureSection";
// import FaqSection from "../components/FaqSection";

// export default async function Home() {
//   return (
//     <main className="">
//       <HeroSection />
//       <FeatureSection />
//       <FaqSection />
//     </main>
//   );
// }
// pages/index.js
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection/FeatureSection";
import FaqSection from "../components/FaqSection";

export default async function Home() {
  return (
    <main className="">
      <HeroSection />
      <div id="feature-section">
        <FeatureSection />
      </div>
      <div id="faq-section">
        <FaqSection />
      </div>
    </main>
  );
}
