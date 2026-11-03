import { useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";

/**
 * Lazy desktop-only chunk. Writes a transform onto the wrapper supplied by
 * Parallax so the static markup never remounts while this loads.
 */
export default function ParallaxDesktop({ targetRef, distance = 28 }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, distance]);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return undefined;
    const write = (value) => {
      element.style.transform = `translate3d(0, ${value.toFixed(2)}px, 0)`;
    };
    write(y.get());
    const unsubscribe = y.on("change", write);
    return () => {
      unsubscribe();
      element.style.transform = "";
    };
  }, [targetRef, y]);

  return null;
}
