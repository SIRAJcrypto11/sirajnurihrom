import { AboutSection } from "../components/sections/AboutSection";
import { ContactSection } from "../components/sections/ContactSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { HeroSection } from "../components/sections/HeroSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { WorkSection } from "../components/sections/WorkSection";
import { usePageMeta } from "../components/usePageMeta";
import { profile } from "../data/site";

export function HomePage() {
  usePageMeta({
    title: `${profile.name} | Founder and CEO, PT SNISHOP Network Indonesia`,
    description:
      "Portfolio of Siraj Nur Ihrom, founder and chief executive of PT SNISHOP Network Indonesia. Software for businesses and students, built from Bengkulu.",
    path: "/",
  });

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
