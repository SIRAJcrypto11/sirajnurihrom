import { lazy, Suspense, useRef } from "react";
import { useMediaQuery } from "./useMediaQuery";

const ParallaxDesktop = lazy(() => import("./ParallaxDesktop"));

/**
 * Static wrapper everywhere. The framer-motion chunk is only imported on
 * desktop with a fine pointer and no reduced-motion preference.
 */
export function Parallax({ distance = 28, className = "", children, ...rest }) {
  const targetRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isFine = useMediaQuery("(pointer: fine)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const active = isDesktop && isFine && !reduce;

  return (
    <div ref={targetRef} className={`sn-parallax ${className}`} {...rest}>
      {children}
      {active ? (
        <Suspense fallback={null}>
          <ParallaxDesktop targetRef={targetRef} distance={distance} />
        </Suspense>
      ) : null}
    </div>
  );
}
