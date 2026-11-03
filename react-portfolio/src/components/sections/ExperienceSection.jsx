import { displayHost } from "../../data/work";
import { experienceLinks } from "../../data/site";
import { useI18n } from "../../i18n/useI18n";
import { SlideIn } from "../motion/SlideIn";
import { SplitHeading } from "../motion/SplitHeading";

export function ExperienceSection() {
  const { m } = useI18n();

  return (
    <section id="record" className="sn-clip-x scroll-mt-24 border-b border-line bg-surface">
      <div className="wrap py-20 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="kicker lg:col-span-4">{m.record.kicker}</p>
          <div className="lg:col-span-8">
            <SplitHeading
              as="h2"
              text={m.record.title}
              className="font-display text-4xl leading-none font-bold tracking-tight md:text-6xl"
            />
            <p className="mt-4 max-w-xl text-lg text-muted">{m.record.lede}</p>
          </div>
        </div>

        <ol className="relative mt-14">
          <div className="timeline-line absolute top-0 bottom-0 left-[7px] w-px bg-line" aria-hidden="true" />
          <div className="timeline-progress absolute top-0 bottom-0 left-[7px] w-px bg-blue" aria-hidden="true" />
          {m.experience.map((job, index) => {
            const url = experienceLinks[job.id];
            return (
              <SlideIn
                as="li"
                key={job.id}
                index={index}
                className="timeline-item relative grid gap-3 py-8 pl-10 md:grid-cols-12 md:gap-6"
              >
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
              </SlideIn>
            );
          })}
        </ol>
        <p className="mt-8 max-w-3xl border-t border-line pt-6 text-sm leading-relaxed text-muted">{m.archive}</p>
      </div>
    </section>
  );
}
