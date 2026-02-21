import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import { ParticleBackground } from './components/ui/ParticleBackground';
import { PreLoader } from './components/ui/PreLoader';
import { EcosystemDock } from './components/ui/EcosystemDock';
import { LaunchpadModal } from './components/ui/LaunchpadModal';
import { FloatingAIAssistant } from './components/ui/FloatingAIAssistant';
import { SystemStatusTicker } from './components/ui/SystemStatusTicker';
import { CommandPalette } from './components/ui/CommandPalette';
import { EasterEggHandler } from './components/ui/EasterEggHandler';

import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { MetricsSection } from './components/sections/MetricsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { GalaxySection } from './components/sections/GalaxySection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ContactSection } from './components/sections/ContactSection';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Mencegah browser melakukan auto-scroll ke posisi terakhir saat direfresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Pastikan selalu mulai dari pixel paling atas
    window.scrollTo(0, 0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative bg-neutral-900 text-text-primary">
      <AnimatePresence mode="wait">
        {isLoading && <PreLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <ParticleBackground />
      <Navbar />
      <CommandPalette />
      <EasterEggHandler />

      <LaunchpadModal isOpen={isLaunchpadOpen} onClose={() => setIsLaunchpadOpen(false)} />
      <EcosystemDock onOpenLaunchpad={() => setIsLaunchpadOpen(true)} />
      <FloatingAIAssistant />

      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <MetricsSection />
        <ExperienceSection />
        <ProjectsSection onOpenLaunchpad={() => setIsLaunchpadOpen(true)} />
        <GalaxySection />
        <SkillsSection />
        <ContactSection />
      </main>

      <SystemStatusTicker />
      <Footer />
    </div>
  );
}

export default App;
