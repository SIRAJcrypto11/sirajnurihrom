import { useEffect, useMemo, useRef, useState } from "react";

function formatNumber(value, decimals, locale, grouping) {
  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: grouping,
    }).format(value);
  } catch {
    return value.toFixed(decimals);
  }
}

/**
 * Renders the final number on the first paint (so prerender and no-JS output
 * already show it) and reserves its width. The count only runs once the number
 * is 40% visible, and never under reduced motion.
 */
export function CountUp({
  value,
  from = 0,
  duration = 1.1,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale = "en",
  grouping = true,
  className = "",
  ...rest
}) {
  const ref = useRef(null);
  const frameRef = useRef(0);
  const finalLabel = useMemo(
    () => formatNumber(value, decimals, locale, grouping),
    [value, decimals, locale, grouping],
  );
  const finalText = `${prefix}${finalLabel}${suffix}`;
  const [text, setText] = useState(finalText);

  useEffect(() => {
    setText(finalText);
  }, [finalText]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const element = ref.current;
    if (!element || value === from) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        io.disconnect();
        const started = performance.now();
        // Cached formatter and direct text-node writes: no React render per frame.
        let nf = null;
        try {
          nf = new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: grouping });
        } catch {
          nf = null;
        }
        const node = element.firstChild;
        const write = (t) => {
          if (node && node.nodeType === 3) node.nodeValue = t;
          else element.textContent = t;
        };
        const tick = (now) => {
          const progress = Math.min(1, (now - started) / (duration * 1000));
          const eased = 1 - (1 - progress) ** 3;
          const current = from + (value - from) * eased;
          write(`${prefix}${nf ? nf.format(current) : current.toFixed(decimals)}${suffix}`);
          if (progress < 1) {
            frameRef.current = requestAnimationFrame(tick);
          } else {
            write(finalText);
          }
        };
        frameRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(element);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, [from, value, duration, decimals, locale, grouping, prefix, suffix, finalText]);

  const width = `${prefix.length + finalLabel.length + suffix.length}ch`;

  return (
    <span
      ref={ref}
      className={`sn-count inline-block text-start tabular-nums ${className}`}
      style={{ minWidth: width }}
      {...rest}
    >
      {text}
    </span>
  );
}
