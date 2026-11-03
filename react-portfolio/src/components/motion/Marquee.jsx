export function Marquee({
  items,
  renderItem,
  duration = 36,
  reverse = false,
  pauseOnHover = true,
  ariaLabel,
  className = "",
  trackClassName = "",
}) {
  function group(hidden) {
    return (
      <ul className="sn-marquee-group" aria-hidden={hidden || undefined}>
        {items.map((item, index) => (
          <li className="sn-marquee-item" key={`${index}-${typeof item === "string" ? item : index}`}>
            {renderItem(item, index)}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      className={`sn-marquee ${pauseOnHover ? "sn-marquee-pause" : ""} ${className}`}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        className={`sn-marquee-track ${trackClassName}`}
        style={{
          "--marquee-duration": `${duration}s`,
          "--marquee-direction": reverse ? "reverse" : "normal",
        }}
      >
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
