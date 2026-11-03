import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const MotionDiv = motion.div;
import Lenis from "lenis";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { I18nProvider, LocaleHead } from "./i18n/context";
import { findLocale, splitPath } from "./i18n/config";
import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";
import { WorkPage } from "./pages/WorkPage";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return undefined;
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });
    let frame = 0;
    const loop = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduce]);

  return null;
}

function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  if (reduce) return null;
  return (
    <MotionDiv
      className="fixed top-0 right-0 left-0 z-[60] h-0.5 origin-left bg-blue"
      style={{ scaleX }}
    />
  );
}

function Shell() {
  const { pathname } = useLocation();
  const locale = findLocale(pathname);
  const { subpath } = splitPath(pathname);
  const slug = subpath.match(/^\/work\/([^/]+)$/)?.[1];
  const missing = Boolean(subpath) && !slug;

  return (
    <I18nProvider locale={locale}>
      <LocaleHead />
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <Header />
      <main id="content" className="flex-1">
        {missing ? <NotFound /> : slug ? <WorkPage /> : <HomePage />}
      </main>
      <Footer />
    </I18nProvider>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <SmoothScroll />
      <ScrollProgress />
      <ScrollManager />
      <Routes>
        <Route path="/*" element={<Shell />} />
      </Routes>
    </div>
  );
}
