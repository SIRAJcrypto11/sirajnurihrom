import { useLayoutEffect, useRef } from "react";
import { observeInView } from "./inView";

const ITEM_CAP = 8;

/**
 * Alternating left/right entrance. The travel is 24px on mobile and 48px on
 * desktop, both set in index.css; the index only picks the direction.
 */
export function SlideIn({
  as = "div",
  index = 0,
  distance,
  duration = 0.55,
  once = true,
  amount = 0.12,
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const Tag = as;

  useLayoutEffect(() => observeInView(ref.current), []);

  const direction = index % 2 === 0 ? "left" : "right";

  return (
    <Tag
      ref={ref}
      data-slide={direction}
      data-once={once ? "" : undefined}
      data-amount={amount}
      className={className}
      style={{
        ...style,
        "--i": Math.min(index, ITEM_CAP),
        "--reveal-duration": `${duration}s`,
        ...(distance
          ? { "--slide-from": `${direction === "left" ? -distance : distance}px` }
          : {}),
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
