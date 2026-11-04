import { AchievementsSection } from "../components/sections/AchievementsSection";
import { AboutSection } from "../components/sections/AboutSection";
import { ContactSection } from "../components/sections/ContactSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { GithubSection } from "../components/sections/GithubSection";
import { HeroSection } from "../components/sections/HeroSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { WorkSection } from "../components/sections/WorkSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <AchievementsSection />
      <WorkSection />
      <SkillsSection />
      <GithubSection />
      <ContactSection />
    </>
  );
}
