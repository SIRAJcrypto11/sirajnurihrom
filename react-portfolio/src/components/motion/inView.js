/**
 * One module-level IntersectionObserver for every reveal on the page.
 * Elements carrying `data-reveal` / `data-slide` / `data-words` register here
 * and get `is-in` once. The hidden state only exists under `html.motion-ok`,
 * which the inline script in index.html adds for no-preference users.
 */

const ROOT_MARGIN = "0px 0px -8% 0px";
const IN_VIEW_RATIO = 0.94;

let observer = null;

function motionEnabled() {
  return (
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("motion-ok")
  );
}

function getObserver() {
  if (observer || typeof IntersectionObserver === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: ROOT_MARGIN, threshold: 0.01 },
  );
  return observer;
}

export function observeInView(element) {
  if (!element || !motionEnabled()) return undefined;

  const rect = element.getBoundingClientRect();
  const viewport = window.innerHeight || document.documentElement.clientHeight;
  if (rect.top < viewport * IN_VIEW_RATIO && rect.bottom > 0) {
    element.classList.add("is-in");
    return undefined;
  }

  const io = getObserver();
  if (!io) {
    element.classList.add("is-in");
    return undefined;
  }

  io.observe(element);
  return () => io.unobserve(element);
}
