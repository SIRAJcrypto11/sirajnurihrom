import { useI18n } from "../../i18n/useI18n";
import { Marquee } from "../motion/Marquee";
import { SplitHeading } from "../motion/SplitHeading";
import { StaggerGroup, StaggerItem } from "../motion/StaggerGroup";

export function SkillsSection() {
  const { m } = useI18n();
  const skills = m.skillGroups.flatMap((group) => group.items);

  return (
    <section id="practice" className="scroll-mt-24 border-t border-line bg-paper">
      <div className="wrap py-20 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="kicker lg:col-span-4">{m.skills.kicker}</p>
          <SplitHeading
            as="h2"
            text={m.skills.title}
            className="font-display text-4xl leading-none font-bold tracking-tight lg:col-span-8 md:text-6xl"
          />
        </div>
        <div className="mt-10 border-y border-line py-5">
          <Marquee
            items={skills}
            duration={42}
            ariaLabel={m.skills.title}
            renderItem={(item) => (
              <span className="flex items-center gap-3 text-sm font-semibold tracking-wide text-muted">
                <span className="h-1 w-1 rounded-full bg-blue" aria-hidden="true" />
                {item}
              </span>
            )}
          />
        </div>
        <StaggerGroup className="mt-2" stagger={0.06}>
          {m.skillGroups.map((group, index) => (
            <StaggerItem key={group.title} className="grid gap-4 border-b border-line py-8 md:grid-cols-12">
              <p className="text-sm font-semibold tracking-[0.16em] text-blue md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-3xl font-bold md:col-span-3">{group.title}</h3>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 md:col-span-8">
                {group.items.map((item) => (
                  <li key={item} className="text-muted">{item}</li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
