/**
 * One passive scroll/resize listener and one rAF per frame for every
 * scroll-linked effect on the page. Subscribers only read cached geometry and
 * write transforms, so a frame never mixes layout reads with style writes
 * across components.
 */
const subscribers = new Set();
let ticking = false;
let bound = false;

function run() {
  ticking = false;
  const y = window.scrollY;
  const vh = window.innerHeight;
  subscribers.forEach((fn) => fn(y, vh));
}

function request() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(run);
}

export function onScrollFrame(fn) {
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
  if (bound) request();
}
