import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { ScrollProgress } from "./components/motion/ScrollProgress";
import { I18nProvider, LocaleHead } from "./i18n/context";
import { findLocale, splitPath } from "./i18n/config";
import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";
import { WorkPage } from "./pages/WorkPage";

let lenisInstance = null;

function scrollToHash(hash) {
  const target = document.getElementById(hash.slice(1));
  if (!target) return false;
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -88, duration: 1 });
    return true;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  return true;
}

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash && scrollToHash(hash)) return;
    if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

/**
 * Lenis is a progressive enhancement for desktop mouse users only. Touch,
 * narrow screens, and reduced-motion users keep the native scroll — and never
 * download the library, because it is imported dynamically.
 */
function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const wide = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    let starting = false;
    let lenis = null;
    let frame = 0;

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (lenis) {
        if (lenisInstance === lenis) lenisInstance = null;
        lenis.destroy();
        lenis = null;
      }
    };

    const start = async () => {
      if (lenis || starting || cancelled) return;
      starting = true;
      try {
        const { default: Lenis } = await import("lenis");
        if (cancelled || !fine.matches || !wide.matches || reduce.matches) return;
        lenis = new Lenis({
          duration: 1.05,
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1,
        });
        lenisInstance = lenis;
        const loop = (time) => {
          if (!lenis) return;
          lenis.raf(time);
          frame = requestAnimationFrame(loop);
        };
        frame = requestAnimationFrame(loop);
      } finally {
        starting = false;
      }
    };

    const sync = () => {
      if (fine.matches && wide.matches && !reduce.matches) start();
      else stop();
    };

    sync();
    fine.addEventListener("change", sync);
    wide.addEventListener("change", sync);
    reduce.addEventListener("change", sync);

    return () => {
      cancelled = true;
      fine.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return null;
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
