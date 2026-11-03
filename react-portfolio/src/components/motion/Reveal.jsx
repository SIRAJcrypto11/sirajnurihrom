import { useLayoutEffect, useRef } from "react";
import { observeInView } from "./inView";

/**
 * CSS/IntersectionObserver reveal. Only transform and opacity change.
 * `immediate` skips the hidden state entirely and is used above the fold.
 */
export function Reveal({
  as = "div",
  fade = true,
  y = 18,
  x = 0,
  delay = 0,
  duration = 0.55,
  once = true,
  amount = 0.18, // accepted for API parity; the shared observer uses one threshold
  immediate = false,
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const Tag = as;

  useLayoutEffect(() => {
    if (immediate) return undefined;
    return observeInView(ref.current);
  }, [immediate]);

  const motionStyle = immediate
    ? style
    : {
        ...style,
        "--reveal-y": `${y}px`,
        "--reveal-x": `${x}px`,
        "--reveal-delay": `${delay}s`,
        "--reveal-duration": `${duration}s`,
        "--reveal-opacity": fade ? 0 : 1,
      };

  return (
    <Tag
      ref={immediate ? undefined : ref}
      {...(immediate ? {} : { "data-reveal": "" })}
      data-once={once ? "" : undefined}
      data-amount={amount}
      className={className}
      style={motionStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
