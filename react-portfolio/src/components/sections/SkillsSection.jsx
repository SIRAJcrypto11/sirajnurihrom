import { skills } from "../../data/site";
import { Reveal } from "../Reveal";

export function SkillsSection() {
  return (
    <section id="practice" className="scroll-mt-24 border-t border-rule">
      <div className="wrap py-20 md:py-28">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12">
            <p className="kicker md:col-span-4">04 — Practice</p>
            <h2 className="font-serif text-4xl leading-none tracking-tight md:col-span-8 md:text-6xl">
              What the work draws on.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 border-t border-rule">
          {skills.map((group) => (
            <div
              key={group.title}
              className="grid gap-4 border-b border-rule py-8 md:grid-cols-12"
            >
              <h3 className="font-serif text-3xl md:col-span-4">{group.title}</h3>
              <ul className="flex flex-wrap gap-y-2 md:col-span-8 md:content-start">
                {group.items.map((item) => (
                  <li key={item} className="mr-6 text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
