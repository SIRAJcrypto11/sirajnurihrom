import { achievements } from "../../data/achievements";
import { achievementContent } from "../../i18n/achievements";
import { useI18n } from "../../i18n/useI18n";
import { CountUp } from "../motion/CountUp";
import { SlideIn } from "../motion/SlideIn";
import { SplitHeading } from "../motion/SplitHeading";

export function AchievementsSection() {
  const { locale } = useI18n();
  const copy = achievementContent(locale.code);

  return (
    <section id="prestasi" className="sn-clip-x scroll-mt-24 border-y border-line bg-surface">
      <div className="h-1 bg-blue" aria-hidden="true" />
      <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <p className="kicker">{copy.kicker}</p>
          <SplitHeading
            as="h2"
            text={copy.title}
            className="font-display mt-4 text-4xl leading-[0.95] font-bold tracking-tight md:text-5xl"
          />
          <p className="mt-4 text-muted">{copy.lede}</p>
        </div>
        <ol className="sn-stack lg:col-span-8">
          {achievements.map((item, index) => {
            const text = copy.items[item.id];
            const year = /^\d{4}$/.test(item.year) ? Number(item.year) : null;
            return (
              <SlideIn
                as="li"
                key={item.id}
                index={index}
                className="sn-stack-item grid gap-2 border-t border-line py-7 sm:grid-cols-12 sm:gap-6"
                style={{ "--si": index }}
              >
                <p className="text-sm font-semibold tracking-wide text-blue-deep sm:col-span-3">
                  {year ? (
                    <CountUp value={year} from={Math.max(year - 8, 0)} duration={0.9} grouping={false} />
                  ) : (
                    item.year
                  )}
                </p>
                <div className="sm:col-span-9">
                  <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">{copy.kinds[item.kind]}</p>
                  <h3 className="font-display mt-1 text-2xl leading-tight font-bold">{text.title}</h3>
                  <p className="mt-2 text-muted">{text.detail}</p>
                </div>
              </SlideIn>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
