import { about } from "../../data/site";

const beats = [
  {
    label: "Since 2018",
    text: about.paragraphs[0],
  },
  {
    label: "The practice",
    text: about.paragraphs[1],
  },
  {
    label: "Open",
    text: about.paragraphs[2],
  },
];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-line">
      <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <p className="kicker">01 — Practice</p>
          <h2 className="font-display mt-4 text-4xl leading-[0.95] font-700 tracking-tight md:text-6xl">
            {about.pull}
          </h2>
        </div>
        <ol className="lg:col-span-7">
          {beats.map((beat, index) => (
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
