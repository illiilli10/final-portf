import { AboutSection } from "../sections/AboutSection";
import { CapabilitiesSection } from "../sections/CapabilitiesSection";
import { FooterSection } from "../sections/FooterSection";
import { HeroSection } from "../sections/HeroSection";
import { PrinciplesSection } from "../sections/PrinciplesSection";
import { ToolkitSection } from "../sections/ToolkitSection";
import { WorkSection } from "../sections/WorkSection";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f6f2] text-[#111111]">
      <main className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <AboutSection />
        <ToolkitSection />
        <WorkSection />
        <CapabilitiesSection />
        <PrinciplesSection />
      </main>
      <FooterSection />
    </div>
  );
}
