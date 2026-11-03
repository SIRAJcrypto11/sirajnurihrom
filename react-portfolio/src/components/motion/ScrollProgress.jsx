import { useEffect } from "react";

function supportsScrollTimeline() {
  return typeof CSS !== "undefined" && typeof CSS.supports === "function" && CSS.supports("animation-timeline: scroll()");
}

/**
 * Thin cobalt bar. Modern browsers animate it with a CSS scroll-driven
 * timeline; the rest get one passive, rAF-throttled scroll listener.
 */
export function ScrollProgress() {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (supportsScrollTimeline()) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      const value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty("--scroll-progress", value.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.style.removeProperty("--scroll-progress");
    };
  }, []);

  return (
    <div className="sn-progress" aria-hidden="true">
      <span className="sn-progress-bar" />
    </div>
  );
}
