import { useLayoutEffect, useRef } from "react";
import { onScrollFrame } from "./scrollLoop";

/**
 * Vertical scroll drives a horizontal card track: the outer block is as tall
 * as the track is wide, the inner block sticks under the header, and the track
 * slides sideways (towards the reading end, so RTL slides the other way).
 * Only transform is written per frame; geometry is measured on resize.
 *
 * Perf: rAF loop is gated by IntersectionObserver — subscribers only run while
 * the viewport is visible. will-change is added on enter, removed on exit.
 * One transform write per frame; class toggle on old+new active element only.
 */
export function PinnedTrack({ className = "", trackClassName = "", label, children, intro }) {
  const outerRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const glowRef = useRef(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!outer || !viewport || !track) return undefined;
    let top = 0;
    let travel = 0;
    let span = 1;
    let rtl = false;
    const items = [...track.children];

    const measure = () => {
      const vh = window.innerHeight;
      const header = parseFloat(getComputedStyle(outer.firstElementChild).top) || 0;
      rtl = getComputedStyle(track).direction === "rtl";
      const tw = track.scrollWidth;
      const tc = track.clientWidth;
      travel = Math.max(0, tw - tc);
      const stickyH = vh - header;
      outer.style.height = `${stickyH + travel}px`;
      top = outer.getBoundingClientRect().top + window.scrollY - header;
      span = Math.max(1, travel);
    };
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 120);
    };
    measure();
    window.addEventListener("resize", onResize, { passive: true });

    let last = -1;
    let lastIdx = -1;
    let off = null;

    const tick = (y) => {
      const p = Math.min(1, Math.max(0, (y - top) / span));
      if (p === last) return;
      last = p;
      const x = (rtl ? 1 : -1) * p * travel;
      track.style.transform = `translate3d(${x}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      const idx = Math.round(p * (items.length - 1));
      if (idx !== lastIdx) {
        if (lastIdx >= 0 && lastIdx < items.length) items[lastIdx].classList.remove("is-active");
        lastIdx = idx;
        if (idx >= 0 && idx < items.length) items[idx].classList.add("is-active");
      }
    };

    const activate = () => {
      if (off) return;
      track.style.willChange = "transform";
      viewport.classList.add("is-active");
      off = onScrollFrame(tick);
    };
    const deactivate = () => {
      if (off) { off(); off = null; }
      track.style.willChange = "";
      viewport.classList.remove("is-active");
      last = -1;
    };

    const io = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? activate() : deactivate(); },
      { threshold: 0 },
    );
    io.observe(viewport);

    return () => {
      deactivate();
      io.disconnect();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      outer.style.height = "";
      track.style.transform = "";
      track.style.willChange = "";
    };
  }, []);

  return (
    <div ref={outerRef} className={`sn-pin ${className}`}>
      <div className="sn-pin-sticky">
        {intro}
        <div ref={viewportRef} className="sn-pin-viewport" role="region" aria-label={label}>
          <div ref={glowRef} className="sn-pin-glow" aria-hidden="true" />
          <div ref={trackRef} className={`sn-pin-track ${trackClassName}`}>
            {children}
          </div>
        </div>
        <div className="sn-pin-bar" aria-hidden="true">
          <span ref={barRef} />
        </div>
      </div>
    </div>
  );
}
