/**
 * One passive scroll/resize listener and one rAF per frame for every
 * scroll-linked effect on the page. Subscribers only read cached geometry and
 * write transforms, so a frame never mixes layout reads with style writes
 * across components.
 * Perf: only binds on mobile viewports where scroll effects are active.
 */
const subscribers = new Set();
let ticking = false;
let bound = false;
let isMobile = typeof window !== "undefined" && window.matchMedia?.("(max-width: 1023px)").matches;

if (typeof window !== "undefined" && window.matchMedia) {
  const mql = window.matchMedia("(max-width: 1023px)");
  const handler = (e) => { isMobile = e.matches; };
  mql.addEventListener("change", handler);
}

function run() {
  ticking = false;
  if (!isMobile) return;
  const y = window.scrollY;
  const vh = window.innerHeight;
  subscribers.forEach((fn) => fn(y, vh));
}

function request() {
  if (!isMobile || ticking) return;
  ticking = true;
  requestAnimationFrame(run);
}

export function onScrollFrame(fn) {
  if (!isMobile) return () => {};
  subscribers.add(fn);
  if (!bound) {
    bound = true;
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
  }
  request();
  return () => {
    subscribers.delete(fn);
    if (!subscribers.size && bound) {
      bound = false;
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    }
  };
}

export function requestScrollFrame() {
  if (bound && isMobile) request();
}
