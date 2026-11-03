function shotSrc(entry) {
  return entry.image || `/work/${entry.slug}.jpg`;
}

export function Shot({ entry, className = "", eager = false }) {
  return (
    <img
      src={shotSrc(entry)}
      alt={`Homepage of ${entry.title}`}
      width={1440}
      height={900}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`shot ${className}`}
    />
  );
}
