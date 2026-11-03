import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const MotionDiv = motion.div;
import { useRef } from "react";
import { displayHost } from "../../data/work";
import { experience } from "../../data/site";

export function ExperienceSection() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section id="record" className="scroll-mt-24 border-b border-line bg-white">
      <div className="wrap py-20 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="kicker lg:col-span-4">02 — Record</p>
          <div className="lg:col-span-8">
            <h2 className="font-display text-4xl leading-none font-700 tracking-tight md:text-6xl">
              Companies led since 2018.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted">
              From SNISHOP outward. Roles and what each company is for.
            </p>
          </div>
        </div>

        <ol ref={ref} className="relative mt-14">
          <div className="absolute top-0 bottom-0 left-[7px] w-px bg-line" aria-hidden="true" />
          {!reduce && (
            <MotionDiv
              className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-blue"
              style={{ scaleY }}
            />
          )}
          {experience.map((job) => (
            <li key={`${job.company}-${job.role}`} className="relative grid gap-3 py-8 pl-10 md:grid-cols-12 md:gap-6">
              <span className="absolute top-10 left-0 h-4 w-4 rounded-full border-2 border-white bg-blue" aria-hidden="true" />
              <p className="text-sm font-semibold tracking-wide text-blue-deep md:col-span-3">{job.period}</p>
              <div className="md:col-span-4">
                <h3 className="font-display text-2xl leading-tight font-bold md:text-3xl">{job.role}</h3>
                <p className="mt-1 text-muted">{job.company}</p>
              </div>
              <div className="md:col-span-5">
                <p>{job.summary}</p>
                {job.url && (
                  <a className="mt-3 inline-block text-sm font-semibold text-blue-deep underline decoration-blue/30 underline-offset-4" href={job.url} target="_blank" rel="noreferrer">
                    {displayHost(job.url)}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
