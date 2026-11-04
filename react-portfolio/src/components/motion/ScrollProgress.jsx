import { useEffect, useRef } from "react";

function supportsScrollTimeline() {
  return typeof CSS !== "undefined" && typeof CSS.supports === "function" && CSS.supports("animation-timeline: scroll()");
}

/**
 * Thin cobalt bar. Modern browsers animate it with a CSS scroll-driven
 * timeline; the rest get one passive, rAF-throttled scroll listener.
 * Perf: writes transform directly on the bar element, NOT a custom property
 * on documentElement (which would invalidate every descendant's style).
 */
export function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (supportsScrollTimeline()) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const mobileMq = window.matchMedia("(max-width: 1023px)");
    if (!mobileMq.matches) return undefined;

    const bar = barRef.current;
    if (!bar) return undefined;
    let frame = 0;
    let max = 0;

    const updateMax = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
    };
    updateMax();

    const update = () => {
      frame = 0;
      const value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${value})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      updateMax();
      onScroll();
    }, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      bar.style.transform = "";
    };
  }, []);

  return (
    <div className="sn-progress" aria-hidden="true">
      <span ref={barRef} className="sn-progress-bar" />
    </div>
  );
}
