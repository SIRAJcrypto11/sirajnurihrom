import { profile } from "../../data/site";

export function HeroSection() {
  return (
    <section id="top" className="border-b border-rule">
      <div className="wrap grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-8">
          <p className="kicker">{profile.location}</p>
          <h1 className="mt-6 font-serif text-[clamp(3.15rem,12vw,7.4rem)] leading-[0.86] font-medium tracking-[-0.04em] text-ink">
            Siraj Nur
            <br />
            Ihrom
          </h1>
          <span className="mt-8 block h-px w-16 bg-accent" aria-hidden="true" />
          <p className="mt-6 max-w-md font-serif text-2xl leading-snug font-medium italic md:text-[2rem]">
            {profile.role} of {profile.company}.
          </p>
        </div>
        <div className="flex flex-col justify-end md:col-span-4">
          <p className="text-lg leading-relaxed text-muted">
            Over seven years building digital platforms, fintech services, and startups.
            SNISHOP began in 2018 as a platform for digital payments and products.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <a className="text-link" href="#work">
              View the work
            </a>
            <a className="text-link" href="#contact">
              Write
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-rule">
        <dl className="wrap grid gap-6 py-6 sm:grid-cols-3">
          <div>
            <dt className="kicker">Since</dt>
            <dd className="mt-2 font-serif text-3xl">{profile.since}</dd>
          </div>
          <div>
            <dt className="kicker">Based</dt>
            <dd className="mt-2 font-serif text-3xl">Bengkulu</dd>
          </div>
          <div>
            <dt className="kicker">Time</dt>
            <dd className="mt-2 font-serif text-3xl">{profile.timezone}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
