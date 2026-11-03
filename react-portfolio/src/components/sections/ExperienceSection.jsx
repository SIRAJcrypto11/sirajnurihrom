import { displayHost } from "../../data/work";
import { experience } from "../../data/site";
import { Reveal } from "../Reveal";

export function ExperienceSection() {
  return (
    <section id="record" className="scroll-mt-24 border-t border-rule bg-paper-deep">
      <div className="wrap py-20 md:py-28">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12">
            <p className="kicker md:col-span-4">02 — Record</p>
            <div className="md:col-span-8">
              <h2 className="font-serif text-4xl leading-none tracking-tight md:text-6xl">
                Where the work has sat.
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-muted">
                Companies led since 2018, from the SNISHOP platform to the later products.
              </p>
            </div>
          </div>
        </Reveal>

        <ol className="mt-12 border-t border-rule">
          {experience.map((job) => (
            <li
              key={`${job.company}-${job.role}`}
              className="grid gap-4 border-b border-rule py-8 md:grid-cols-12 md:gap-6"
            >
              <p className="text-sm font-semibold tracking-wide text-accent md:col-span-3">
                {job.period}
              </p>
              <div className="md:col-span-4">
                <h3 className="font-serif text-3xl leading-tight">{job.role}</h3>
                <p className="mt-2 text-muted">{job.company}</p>
              </div>
              <div className="md:col-span-5">
                <p className="leading-relaxed">{job.summary}</p>
                {job.url && (
                  <a
                    className="text-link mt-4 inline-block text-sm"
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                  >
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
