/**
 * Touch stand-in for hover: the element crossing the middle band of the
 * screen gets `is-active`. One shared IntersectionObserver, no scroll handler.
 * Perf: only one element is active at a time; class is written only when the
 * active element actually changes.
 */
let io = null;
let currentActive = null;

function observer() {
  if (io || typeof IntersectionObserver === "undefined") return io;
  io = new IntersectionObserver(
    (entries) => {
      let next = null;
      for (const e of entries) {
        if (e.isIntersecting) {
          if (!next || e.intersectionRatio > next.intersectionRatio) {
            next = e;
          }
        }
      }
      if (next) {
        if (next.target !== currentActive) {
          if (currentActive) currentActive.classList.remove("is-active");
          currentActive = next.target;
          currentActive.classList.add("is-active");
        }
      } else {
        for (const e of entries) {
          if (e.target === currentActive && !e.isIntersecting) {
            currentActive.classList.remove("is-active");
            currentActive = null;
            break;
          }
        }
      }
    },
    { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.5] },
  );
  return io;
}

export function observeActive(el) {
  const o = el && observer();
  if (!o) return undefined;
  o.observe(el);
  return () => {
    o.unobserve(el);
    if (currentActive === el) currentActive = null;
  };
}
