import { useI18n } from "../../i18n/useI18n";

export function SkillsSection() {
  const { m } = useI18n();

  return (
    <section id="practice" className="scroll-mt-24 border-t border-line bg-paper">
      <div className="wrap py-20 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="kicker lg:col-span-4">{m.skills.kicker}</p>
          <h2 className="font-display text-4xl leading-none font-bold tracking-tight lg:col-span-8 md:text-6xl">
            {m.skills.title}
          </h2>
        </div>
        <div className="mt-12 border-t border-line">
          {m.skillGroups.map((group, index) => (
            <div key={group.title} className="grid gap-4 border-b border-line py-8 md:grid-cols-12">
              <p className="text-sm font-semibold tracking-[0.16em] text-blue md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-3xl font-bold md:col-span-3">{group.title}</h3>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 md:col-span-8">
                {group.items.map((item) => (
                  <li key={item} className="text-muted">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
