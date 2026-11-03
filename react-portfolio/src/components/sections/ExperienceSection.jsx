import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { displayHost } from "../../data/work";
import { experienceLinks } from "../../data/site";
import { useI18n } from "../../i18n/useI18n";

const MotionDiv = motion.div;

export function ExperienceSection() {
  const { m } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section id="record" className="scroll-mt-24 border-b border-line bg-surface">
      <div className="wrap py-20 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="kicker lg:col-span-4">{m.record.kicker}</p>
          <div className="lg:col-span-8">
            <h2 className="font-display text-4xl leading-none font-bold tracking-tight md:text-6xl">
              {m.record.title}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted">{m.record.lede}</p>
          </div>
        </div>

        <ol ref={ref} className="relative mt-14">
          <div className="timeline-line absolute top-0 bottom-0 left-[7px] w-px bg-line" aria-hidden="true" />
          {!reduce && (
            <MotionDiv
              className="timeline-progress absolute top-0 bottom-0 left-[7px] w-px origin-top bg-blue"
              style={{ scaleY }}
            />
          )}
          {m.experience.map((job) => {
            const url = experienceLinks[job.id];
            return (
              <li key={job.id} className="timeline-item relative grid gap-3 py-8 pl-10 md:grid-cols-12 md:gap-6">
                <span className="timeline-dot absolute top-10 left-0 h-4 w-4 rounded-full border-2 border-surface bg-blue" aria-hidden="true" />
                <p className="text-sm font-semibold tracking-wide text-blue-deep md:col-span-3">{job.period}</p>
                <div className="md:col-span-4">
                  <h3 className="font-display text-2xl leading-tight font-bold md:text-3xl">{job.role}</h3>
                  <p className="mt-1 text-muted">{job.company}</p>
                </div>
                <div className="md:col-span-5">
                  <p>{job.summary}</p>
                  {url && (
                    <a className="mt-3 inline-block text-sm font-semibold text-blue-deep underline decoration-blue/30 underline-offset-4" href={url} target="_blank" rel="noreferrer">
                      {displayHost(url)}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-8 max-w-3xl border-t border-line pt-6 text-sm leading-relaxed text-muted">{m.archive}</p>
      </div>
    </section>
  );
}
