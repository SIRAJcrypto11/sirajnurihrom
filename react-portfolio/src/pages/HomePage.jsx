import { AboutSection } from "../components/sections/AboutSection";
import { ContactSection } from "../components/sections/ContactSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { HeroSection } from "../components/sections/HeroSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { WorkSection } from "../components/sections/WorkSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <WorkSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
