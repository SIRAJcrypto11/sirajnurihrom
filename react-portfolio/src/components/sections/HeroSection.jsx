import { useEffect, useState } from "react";
import { featuredWork } from "../../data/work";
import { useI18n } from "../../i18n/useI18n";
import { workCopy } from "../../i18n/workCopy";
import { MagneticButton } from "../motion/MagneticButton";
import { Parallax } from "../motion/Parallax";
import { Shot } from "../Shot";

export function HeroSection() {
  const { m } = useI18n();
  const frames = featuredWork();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (frames.length < 2) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % frames.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [frames.length]);

  const frame = frames[index] || frames[0];
  const frameCopy = frame ? workCopy(m, frame) : null;

  return (
    <section id="top" className="grid-field relative overflow-hidden border-b border-line bg-surface">
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
          <p className="mt-8 max-w-xl text-xl leading-snug text-ink md:text-2xl">{m.hero.role}</p>
          <p className="mt-4 max-w-lg text-muted">{m.hero.lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton className="align-top">
              <a className="block bg-blue px-5 py-3 text-sm font-semibold text-white hover:bg-blue-deep" href="#work">
                {m.hero.see}
              </a>
            </MagneticButton>
            <a className="border border-ink px-5 py-3 text-sm font-semibold text-ink hover:border-blue hover:text-blue-deep" href="#contact">
              {m.hero.write}
            </a>
          </div>
        </div>

        {frame && (
          <Parallax distance={48} className="lg:col-span-5">
            <figure className="border border-line bg-surface shadow-[0_24px_60px_-36px_rgba(12,27,51,0.45)]">
              <Shot entry={frame} eager className="border-b border-line" />
              <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                <span className="font-semibold">{frameCopy.title}</span>
                <span className="text-muted">{String(index + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          </Parallax>
        )}
      </div>
    </section>
  );
}
