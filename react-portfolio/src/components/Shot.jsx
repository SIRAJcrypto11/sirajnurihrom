function shotSrc(entry) {
  return entry.image || `/work/${entry.slug}.jpg`;
}

export function Shot({ entry, className = "", eager = false }) {
  const image = (
    <img
      src={shotSrc(entry)}
      alt={entry.imageAlt || `Homepage of ${entry.title}`}
      width={1440}
      height={900}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`shot ${entry.imageMobile ? "shot-has-mobile" : ""} ${className}`}
    />
  );
  if (!entry.imageMobile) return image;
  return (
    <picture className="block w-full">
      <source media="(max-width: 767px)" srcSet={entry.imageMobile} type="image/webp" />
      {image}
    </picture>
  );
}
