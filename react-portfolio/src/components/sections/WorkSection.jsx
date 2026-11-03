import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const MotionDiv = motion.div;
import { displayHost, featuredWork, kindLabel, listedWork } from "../../data/work";
import { Shot } from "../Shot";

export function WorkSection() {
  const featured = featuredWork();
  const rest = listedWork().filter((entry) => !entry.featured);

  return (
    <section id="work" className="scroll-mt-24">
      <div className="wrap pt-20 lg:pt-28">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="kicker lg:col-span-4">03 — Work</p>
          <div className="lg:col-span-8">
            <h2 className="font-display text-4xl leading-none font-bold tracking-tight md:text-6xl">
              Live products, shown as they ship.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Own software under SNISHOP, and sites built for clients. Scroll the reel, then the full shelf.
            </p>
          </div>
        </div>
      </div>
      <WorkFilm items={featured} />
      <WorkShelf items={rest} />
    </section>
  );
}

function useDesktop() {
  const [desktop, setDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : false,
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setDesktop(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return desktop;
}

function WorkFilm({ items }) {
  const reduce = useReducedMotion();
  const desktop = useDesktop();
  if (reduce || !desktop) return <FilmSnap items={items} />;
  return <FilmPin items={items} />;
}

function FilmPin({ items }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${(-100 * (items.length - 1)) / items.length}%`]);
  const count = useTransform(scrollYProgress, [0, 1], [1, items.length]);
  const [label, setLabel] = useState("01");

  useEffect(() => {
    const unsubscribe = count.on("change", (value) => {
      setLabel(String(Math.min(items.length, Math.max(1, Math.round(value)))).padStart(2, "0"));
    });
    return unsubscribe;
  }, [count, items.length]);

  return (
    <div id="reel" ref={ref} className="relative mt-12" style={{ height: `${items.length * 100}vh` }}>
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center overflow-hidden">
        <p className="absolute top-6 right-[4vw] z-10 text-sm font-semibold tracking-[0.16em] text-blue-deep">
          {label} / {String(items.length).padStart(2, "0")}
        </p>
        <MotionDiv style={{ x }} className="flex h-full w-max items-center">
          {items.map((entry) => (
            <article key={entry.slug} className="flex h-full w-[88vw] shrink-0 items-center px-[4vw]">
              <FilmPanel entry={entry} />
            </article>
          ))}
        </MotionDiv>
      </div>
    </div>
  );
}

function FilmSnap({ items }) {
  return (
    <div className="film-scroll mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6">
      {items.map((entry) => (
        <article key={entry.slug} className="w-[78vw] max-w-md shrink-0 snap-center">
          <FilmPanel entry={entry} stacked />
        </article>
      ))}
    </div>
  );
}

function FilmPanel({ entry, stacked = false }) {
  return (
    <div className={`grid w-full items-center gap-6 ${stacked ? "" : "lg:grid-cols-12"}`}>
      <a
        href={entry.url}
        target="_blank"
        rel="noreferrer"
        className={`block overflow-hidden border border-line bg-white ${stacked ? "" : "lg:col-span-7"}`}
      >
        <Shot entry={entry} className={stacked ? "" : "shot-limit"} />
      </a>
      <div className={`min-w-0 ${stacked ? "" : "lg:col-span-5"}`}>
        <p className="kicker">{kindLabel(entry.kind)}</p>
        <h3 className="font-display mt-3 text-[clamp(2rem,4vw,3.25rem)] leading-none font-bold tracking-tight">
          {entry.title}
        </h3>
        <p className="mt-4 text-lg leading-snug">{entry.summary}</p>
        {entry.built?.trim() && <p className="mt-3 text-muted">{entry.built}</p>}
        <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          <a className="text-blue-deep underline decoration-blue/30 underline-offset-4" href={entry.url} target="_blank" rel="noreferrer">
            {displayHost(entry.url)}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link className="text-blue-deep underline decoration-blue/30 underline-offset-4" to={`/work/${entry.slug}`}>
            Case note
          </Link>
        </p>
      </div>
    </div>
  );
}

function WorkShelf({ items }) {
  return (
    <div className="border-t border-line bg-white">
      <div className="wrap py-16 lg:py-24">
        <h3 className="font-display text-3xl font-bold tracking-tight md:text-5xl">The rest of the shelf.</h3>
        <p className="mt-3 max-w-xl text-muted">Every other live site, in the order it ships.</p>
        <div className="mt-10 flex flex-col gap-16">
          {items.map((entry, index) => (
            <ShelfRow key={entry.slug} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ShelfRow({ entry, index }) {
  const mode = index % 3;
  const media = (
    <a href={entry.url} target="_blank" rel="noreferrer" className="block overflow-hidden border border-line bg-paper">
      <Shot entry={entry} />
    </a>
  );
  const copy = (
    <div className={mode === 0 ? "max-w-xl" : ""}>
      <p className="kicker">{kindLabel(entry.kind)}</p>
      <h3 className="font-display mt-2 text-3xl leading-none font-bold tracking-tight md:text-4xl">
        <a href={entry.url} target="_blank" rel="noreferrer" className="hover:text-blue-deep">
          {entry.title}
        </a>
      </h3>
      <p className="mt-3 text-muted">{entry.summary}</p>
      <a className="mt-4 inline-block text-sm font-semibold text-blue-deep underline decoration-blue/30 underline-offset-4" href={entry.url} target="_blank" rel="noreferrer">
        {displayHost(entry.url)}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );

  if (mode === 0) {
    return (
      <article>
        {media}
        <div className="mt-5">{copy}</div>
      </article>
    );
  }

  const imageFirst = mode === 1;
  return (
    <article className="grid items-center gap-6 md:grid-cols-12">
      <div className={imageFirst ? "md:col-span-7" : "md:col-span-5 md:order-2"}>{media}</div>
      <div className={imageFirst ? "md:col-span-5" : "md:col-span-7"}>{copy}</div>
    </article>
  );
}
