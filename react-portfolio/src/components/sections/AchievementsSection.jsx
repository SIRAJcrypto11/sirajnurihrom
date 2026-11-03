import { motion, useReducedMotion } from "framer-motion";
import { achievements } from "../../data/achievements";
import { achievementContent } from "../../i18n/achievements";
import { useI18n } from "../../i18n/useI18n";

const MotionLi = motion.li;

export function AchievementsSection() {
  const { locale } = useI18n();
  const copy = achievementContent(locale.code);
  const reduce = useReducedMotion();

  return (
    <section id="prestasi" className="scroll-mt-24 border-y border-line bg-surface">
      <div className="h-1 bg-blue" aria-hidden="true" />
      <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <p className="kicker">{copy.kicker}</p>
          <h2 className="font-display mt-4 text-4xl leading-[0.95] font-bold tracking-tight md:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-muted">{copy.lede}</p>
        </div>
        <ol className="lg:col-span-8">
          {achievements.map((item, index) => {
            const text = copy.items[item.id];
            return (
              <MotionLi
                key={item.id}
                className="grid gap-2 border-t border-line py-7 sm:grid-cols-12 sm:gap-6"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.4, delay: Math.min(index, 4) * 0.03 }}
              >
                <p className="text-sm font-semibold tracking-wide text-blue-deep sm:col-span-3">{item.year}</p>
                <div className="sm:col-span-9">
                  <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">{copy.kinds[item.kind]}</p>
                  <h3 className="font-display mt-1 text-2xl leading-tight font-bold">{text.title}</h3>
                  <p className="mt-2 text-muted">{text.detail}</p>
                </div>
              </MotionLi>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
