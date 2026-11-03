import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const MotionDiv = motion.div;
import { featuredWork } from "../../data/work";
import { profile } from "../../data/site";
import { Shot } from "../Shot";

export function HeroSection() {
  const reduce = useReducedMotion();
  const frames = featuredWork();
  const [index, setIndex] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 48]);

  useEffect(() => {
    if (reduce || frames.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % frames.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [reduce, frames.length]);

  const frame = frames[index] || frames[0];

  return (
    <section id="top" className="grid-field relative overflow-hidden border-b border-line bg-white">
      <div className="wrap grid items-end gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-[0.7rem] font-semibold tracking-[0.16em] text-blue-deep uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />
            PT SNISHOP Network Indonesia
          </p>
          <h1 className="font-display mt-6 text-[clamp(3.4rem,8vw,7.2rem)] leading-[0.88] font-extrabold tracking-[-0.045em] text-ink">
            Siraj Nur
            <span className="mt-1 block text-blue">Ihrom</span>
          </h1>
          <p className="mt-8 max-w-xl text-xl leading-snug text-ink md:text-2xl">
            {profile.role} of {profile.company}.
          </p>
          <p className="mt-4 max-w-lg text-muted">
            Software for businesses and students. Platforms, fintech, and the products under SNISHOP, from Bengkulu since {profile.since}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="bg-blue px-5 py-3 text-sm font-semibold text-white hover:bg-blue-deep" href="#work">
              See the work
            </a>
            <a className="border border-ink px-5 py-3 text-sm font-semibold text-ink hover:border-blue hover:text-blue-deep" href="#contact">
              Write
            </a>
          </div>
        </div>

        {frame && (
          <MotionDiv style={{ y }} className="lg:col-span-5">
            <figure className="border border-line bg-white shadow-[0_24px_60px_-36px_rgba(12,27,51,0.45)]">
              <Shot entry={frame} eager className="border-b border-line" />
              <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                <span className="font-semibold">{frame.title}</span>
                <span className="text-muted">{String(index + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          </MotionDiv>
        )}
      </div>
    </section>
  );
}
