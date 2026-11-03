import { useI18n } from "../../i18n/useI18n";

export function AboutSection() {
  const { m } = useI18n();

  return (
    <section id="about" className="scroll-mt-24 border-b border-line">
      <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <p className="kicker">{m.about.kicker}</p>
          <h2 className="font-display mt-4 text-4xl leading-[0.95] font-bold tracking-tight md:text-6xl">
            {m.about.title}
          </h2>
        </div>
        <ol className="lg:col-span-7">
          {m.about.beats.map((beat, index) => (
            <li key={beat.label} className="border-t border-line py-10 first:border-t-0 first:pt-0">
              <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">
                {String(index + 1).padStart(2, "0")} {beat.label}
              </p>
              <p className="mt-4 text-lg leading-relaxed md:text-xl">{beat.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
