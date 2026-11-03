import { useEffect, useRef } from "react";

/**
 * Pointer-follow for primary CTAs. No listener at all on touch or when the
 * user prefers reduced motion, and movement is written in a rAF transform.
 */
export function MagneticButton({ strength = 8, tilt = 3, className = "", children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === "undefined") return undefined;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      element.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${((x / strength) * tilt).toFixed(2)}deg)`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onMove = (event) => {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      x = ((event.clientX - rect.left) / rect.width - 0.5) * strength * 2;
      y = ((event.clientY - rect.top) / rect.height - 0.5) * strength * 2;
      schedule();
    };

    const onLeave = () => {
      x = 0;
      y = 0;
      schedule();
    };

    const enable = () => {
      element.addEventListener("pointermove", onMove);
      element.addEventListener("pointerleave", onLeave);
    };

    const disable = () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      frame = 0;
      x = 0;
      y = 0;
      element.style.transform = "";
    };

    const sync = () => {
      if (fine.matches && !reduce.matches) enable();
      else disable();
    };

    sync();
    fine.addEventListener("change", sync);
    reduce.addEventListener("change", sync);

    return () => {
      fine.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
      disable();
    };
  }, [strength, tilt]);

  return (
    <div ref={ref} className={`sn-magnetic ${className}`} {...rest}>
      {children}
    </div>
  );
}
