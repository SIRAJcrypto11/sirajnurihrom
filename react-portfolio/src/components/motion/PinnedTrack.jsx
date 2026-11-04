import { useLayoutEffect, useRef } from "react";
import { onScrollFrame } from "./scrollLoop";

/**
 * Vertical scroll drives a horizontal card track: the outer block is as tall
 * as the track is wide, the inner block sticks under the header, and the track
 * slides sideways (towards the reading end, so RTL slides the other way).
 * Only transform is written per frame; geometry is measured on resize.
 */
export function PinnedTrack({ className = "", trackClassName = "", label, children, intro }) {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return undefined;
    let top = 0;
    let travel = 0;
    let span = 1;
    let rtl = false;
    const items = [...track.children];

    const measure = () => {
      const vh = window.innerHeight;
      const header = parseFloat(getComputedStyle(outer.firstElementChild).top) || 0;
      rtl = getComputedStyle(track).direction === "rtl";
      travel = Math.max(0, track.scrollWidth - track.clientWidth);
      const stickyH = vh - header;
      outer.style.height = `${stickyH + travel}px`;
      top = outer.getBoundingClientRect().top + window.scrollY - header;
      span = Math.max(1, travel);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(document.documentElement);

    let last = -1;
    const off = onScrollFrame((y) => {
      const p = Math.min(1, Math.max(0, (y - top) / span));
      if (p === last) return;
      last = p;
      const x = (rtl ? 1 : -1) * p * travel;
      track.style.transform = `translate3d(${x}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      // Centre card gets the "active" state, the touch stand-in for hover.
      const idx = Math.round(p * (items.length - 1));
      items.forEach((el, i) => el.classList.toggle("is-active", i === idx));
    });
    return () => {
      off();
      ro.disconnect();
      outer.style.height = "";
      track.style.transform = "";
    };
  }, []);

  return (
    <div ref={outerRef} className={`sn-pin ${className}`}>
      <div className="sn-pin-sticky">
        {intro}
        <div className="sn-pin-viewport" role="region" aria-label={label}>
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
