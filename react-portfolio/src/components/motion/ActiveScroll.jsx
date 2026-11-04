import { useLayoutEffect, useRef } from "react";
import { observeActive } from "./scrollActive";

/**
 * Wrapper that hands every `.sn-active-scroll` descendant to the shared
 * centre-band observer. Only runs on narrow screens with motion allowed;
 * desktop keeps real hover.
 */
const QUERY = "(max-width: 1023px)";

export function ActiveScroll({ as = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  const Tag = as;

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || typeof window.matchMedia !== "function") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (!window.matchMedia(QUERY).matches) return undefined;
    const offs = [...root.querySelectorAll(".sn-active-scroll")].map(observeActive);
    return () => offs.forEach((off) => off && off());
  }, []);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
