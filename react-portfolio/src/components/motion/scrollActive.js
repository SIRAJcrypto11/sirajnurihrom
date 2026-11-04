/**
 * Touch stand-in for hover: the element crossing the middle band of the
 * screen gets `is-active`. One shared IntersectionObserver, no scroll handler.
 */
let io = null;

function observer() {
  if (io || typeof IntersectionObserver === "undefined") return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) e.target.classList.toggle("is-active", e.isIntersecting);
    },
    { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
  );
  return io;
}

export function observeActive(el) {
  const o = el && observer();
  if (!o) return undefined;
  o.observe(el);
  return () => o.unobserve(el);
}
