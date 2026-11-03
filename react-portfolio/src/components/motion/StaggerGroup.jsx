import { Children, cloneElement, isValidElement, useLayoutEffect, useRef } from "react";
import { observeInView } from "./inView";

const ITEM_CAP = 8;

/**
 * Sits above StaggerItems and hands each child a capped `--i` plus the
 * stagger timing. Every StaggerItem still observes itself, so long lists
 * reveal card by card instead of all at once.
 */
export function StaggerGroup({
  as = "div",
  stagger = 0.06,
  delayChildren = 0.02,
  once = true,
  amount = 0.15,
  className = "",
  style,
  children,
  ...rest
}) {
  const Tag = as;
  const items = Children.toArray(children).map((child, index) => {
    if (!isValidElement(child)) return child;
    return cloneElement(child, {
      style: {
        ...(child.props.style || {}),
        "--i": Math.min(index, ITEM_CAP),
      },
    });
  });

  return (
    <Tag
      data-once={once ? "" : undefined}
      data-amount={amount}
      className={className}
      style={{
        ...style,
        "--stagger-step": `${stagger}s`,
        "--stagger-delay": `${delayChildren}s`,
      }}
      {...rest}
    >
      {items}
    </Tag>
  );
}

export function StaggerItem({ as = "div", className = "", style, children, ...rest }) {
  const ref = useRef(null);
  const Tag = as;

  useLayoutEffect(() => observeInView(ref.current), []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-stagger-item=""
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
