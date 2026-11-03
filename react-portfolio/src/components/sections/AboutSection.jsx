import { about } from "../../data/site";
import { Reveal } from "../Reveal";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-4">
          <p className="kicker">01 — About</p>
          <p className="mt-6 font-serif text-3xl leading-tight md:text-4xl">{about.pull}</p>
        </Reveal>
        <div className="md:col-span-7 md:col-start-6">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-6 text-lg leading-relaxed last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
