import { Fragment, useLayoutEffect, useMemo, useRef } from "react";
import { observeInView } from "./inView";

const WORD_CAP = 14;
const CJK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uac00-\ud7af]/;

/**
 * Splits a heading into real inline spans so the full text stays in the DOM.
 * Latin words stay whole; CJK runs split per character so long titles can wrap.
 */
function tokenize(text) {
  const tokens = [];
  const chunks = String(text ?? "").split(/(\s+)/);

  for (let index = 0; index < chunks.length; index += 1) {
    const chunk = chunks[index];
    if (!chunk || /^\s+$/.test(chunk)) continue;
    const spacedAfter = /^\s+$/.test(chunks[index + 1] || "");

    let buffer = "";
    for (const character of chunk) {
      if (CJK.test(character)) {
        if (buffer) {
          tokens.push({ text: buffer, space: false });
          buffer = "";
        }
        tokens.push({ text: character, space: false });
      } else {
        buffer += character;
      }
    }
    if (buffer) tokens.push({ text: buffer, space: false });
    if (spacedAfter && tokens.length) tokens[tokens.length - 1].space = true;
  }

  return tokens;
}

export function SplitHeading({
  as = "h2",
  text,
  wordClassName = "",
  delay = 0,
  stagger = 0.045,
  duration = 0.45,
  y = 14,
  fade = true,
  once = true,
  amount = 0.35,
  immediate = false,
  className = "",
  style,
  ...rest
}) {
  const ref = useRef(null);
  const Tag = as;
  const tokens = useMemo(() => tokenize(text), [text]);

  useLayoutEffect(() => {
    if (immediate) return undefined;
    return observeInView(ref.current);
  }, [immediate]);

  return (
    <Tag
      ref={immediate ? undefined : ref}
      {...(immediate ? {} : { "data-words": "" })}
      data-once={once ? "" : undefined}
      data-amount={amount}
      className={`sn-split ${className}`}
      style={{
        ...style,
        "--word-delay": `${delay}s`,
        "--word-duration": `${duration}s`,
        "--word-y": `${y}px`,
        "--word-step": `${stagger}s`,
        "--word-opacity": fade ? 0 : 1,
      }}
      aria-label={typeof text === "string" ? text : undefined}
      {...rest}
    >
      {tokens.map((token, index) => (
        <Fragment key={`${index}-${token.text}`}>
          <span
            className={`sn-word ${wordClassName}`}
            style={{ "--i": Math.min(index, WORD_CAP) }}
          >
            {token.text}
          </span>
          {token.space ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
