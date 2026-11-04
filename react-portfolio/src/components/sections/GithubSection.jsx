import { useLayoutEffect, useMemo, useRef } from "react";
import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { useI18n } from "../../i18n/useI18n";
import { CountUp } from "../motion/CountUp";
import { SplitHeading } from "../motion/SplitHeading";
import { StaggerGroup, StaggerItem } from "../motion/StaggerGroup";
import { observeInView } from "../motion/inView";
import { ContributionHeatmap } from "../github/ContributionHeatmap";
import { useGithubData } from "../github/useGithubData";

const PROFILE_URL = "https://github.com/SIRAJcrypto11";
const LANG_COLORS = ["#1239c7", "#3b5bff", "#6d8bff", "#9fb3ff", "#c5d2ff"];

function relativeTime(iso, rtf) {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diff / 60000);
  if (Number.isNaN(minutes)) return "";
  if (minutes < 60) return rtf.format(-Math.max(1, minutes), "minute");
  const hours = Math.round(minutes / 60);
  if (hours < 24) return rtf.format(-hours, "hour");
  const days = Math.round(hours / 24);
  if (days < 30) return rtf.format(-days, "day");
  const months = Math.round(days / 30);
  if (months < 12) return rtf.format(-months, "month");
  return rtf.format(-Math.round(months / 12), "year");
}

function hostOf(url) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function Heading({ m }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <p className="kicker flex items-center gap-3 lg:col-span-4">
        <span>06</span>
        <span className="h-px w-6 bg-current opacity-50" aria-hidden="true" />
        <span>{m.github.kicker}</span>
      </p>
      <div className="lg:col-span-8">
        <SplitHeading
          as="h2"
          text={m.github.title}
          className="font-display text-4xl leading-none font-bold tracking-tight md:text-6xl"
        />
        <p className="mt-5 max-w-2xl text-lg text-muted">{m.github.lede}</p>
      </div>
    </div>
  );
}

function Skel({ className = "", style }) {
  return <span className={`gh-skel block ${className}`} style={style} aria-hidden="true" />;
}

function Skeleton({ m }) {
  return (
    <div aria-busy="true">
      <span className="sr-only">{m.github.loading}</span>
      <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-12">
        <div className="bg-surface p-6 lg:col-span-4 lg:p-8">
          <Skel className="h-20 w-48 md:h-28" />
          <Skel className="mt-4 h-3 w-40" />
        </div>
        <div className="grid grid-cols-2 gap-px bg-line lg:col-span-8 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-surface p-5 lg:p-6">
              <Skel className="h-3 w-20" />
              <Skel className="mt-4 h-8 w-14" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 border border-line bg-paper p-4 sm:p-6 lg:p-8">
        <Skel className="h-[116px] w-full md:h-[150px]" />
        <Skel className="mt-6 h-3 w-48" />
      </div>
      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Skel className="h-6 w-48" />
          <Skel className="mt-6 h-2.5 w-full" />
          <Skel className="mt-6 h-40 w-full" />
        </div>
        <div className="lg:col-span-7">
          <Skel className="h-6 w-48" />
          <Skel className="mt-6 h-96 w-full" />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ m }) {
  return (
    <div className="mt-14 flex flex-col items-start gap-6 border border-line bg-paper p-8 md:flex-row md:items-center md:justify-between lg:p-10">
      <p className="max-w-xl text-lg text-muted">{m.github.empty}</p>
      <a
        className="inline-flex shrink-0 items-center gap-2 bg-blue px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-deep"
        href={PROFILE_URL}
        target="_blank"
        rel="noreferrer"
      >
        {m.github.profile}
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </div>
  );
}

function Stat({ label, children, unit }) {
  return (
    <div className="bg-surface p-5 lg:p-6">
      <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{label}</p>
      <p className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-3xl font-bold tracking-tight md:text-4xl">{children}</span>
        {unit && <span className="text-sm text-muted">{unit}</span>}
      </p>
    </div>
  );
}

function Languages({ languages, m, lang }) {
  const barRef = useRef(null);
  useLayoutEffect(() => observeInView(barRef.current), []);
  const pct = useMemo(() => new Intl.NumberFormat(lang, { style: "percent", maximumFractionDigits: 1 }), [lang]);
  const items = languages?.items || [];
  if (!items.length) return null;
  const color = (item, i) => (item.name === "__other" ? "var(--gh-other)" : LANG_COLORS[i % LANG_COLORS.length]);

  return (
    <div>
      <h3 className="font-display text-2xl font-bold">{m.github.languages}</h3>
      <div ref={barRef} className="gh-lang-bar mt-6 flex h-2.5 gap-[2px]" role="img" aria-label={items.map((item) => `${item.name === "__other" ? m.github.other : item.name} ${pct.format(item.share)}`).join(", ")}>
        {items.map((item, i) => (
          <span
            key={item.name}
            className="gh-lang-seg origin-left rtl:origin-right"
            style={{ width: `${Math.max(item.share * 100, 0.8)}%`, background: color(item, i), "--i": i }}
          />
        ))}
      </div>
      <ul className="mt-5 grid grid-cols-1 gap-x-6 min-[440px]:grid-cols-2 gap-y-3 text-sm">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 shrink-0" style={{ background: color(item, i) }} aria-hidden="true" />
            <span className="truncate font-medium">{item.name === "__other" ? m.github.other : item.name}</span>
            <span className="ms-auto tabular-nums text-muted">{pct.format(item.share)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted">{languages.method === "bytes" ? m.github.bytesNote : m.github.reposNote}</p>
    </div>
  );
}

function Activity({ activity, m, lang }) {
  const rtf = useMemo(() => new Intl.RelativeTimeFormat(lang, { numeric: "auto" }), [lang]);
  const abs = useMemo(() => new Intl.DateTimeFormat(lang, { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta" }), [lang]);

  return (
    <div>
      <h3 className="font-display text-2xl font-bold">{m.github.activity}</h3>
      {!activity?.length ? (
        <p className="mt-5 text-sm text-muted">{m.github.activityEmpty}</p>
      ) : (
        <StaggerGroup as="ol" className="mt-4 border-t border-line" stagger={0.07}>
          {activity.map((item) => {
            const repo = item.repo.split("/")[1] || item.repo;
            return (
              <StaggerItem key={item.sha + item.repo} as="li" className="border-b border-line">
                <a className="group block py-4" href={item.url} target="_blank" rel="noreferrer">
                  <span className="flex items-baseline gap-3">
                    <span className="truncate text-sm font-semibold text-ink group-hover:text-blue-deep">{repo}</span>
                    <time className="ms-auto shrink-0 text-xs text-muted" dateTime={item.date} title={abs.format(new Date(item.date))}>
                      {relativeTime(item.date, rtf)}
                    </time>
                  </span>
                  <span className="mt-1.5 flex items-start gap-3">
                    <span className="line-clamp-2 text-sm text-muted group-hover:text-ink" dir="auto">{item.message}</span>
                    <code className="ms-auto shrink-0 pt-0.5 font-mono text-[11px] text-blue">{item.sha}</code>
                  </span>
                </a>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      )}
    </div>
  );
}

function Featured({ featured, m, lang }) {
  const num = useMemo(() => new Intl.NumberFormat(lang), [lang]);
  const items = featured?.items || [];
  if (!items.length) return null;
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="font-display text-2xl font-bold">{m.github.featured}</h3>
        <p className="text-xs text-muted">{featured.source === "pinned" ? m.github.pinnedNote : m.github.topNote}</p>
      </div>
      <StaggerGroup className="gh-repo-rail mt-6 grid gap-px border border-line bg-line sm:grid-cols-2" stagger={0.06}>
        {items.map((repo) => {
          const host = hostOf(repo.homepage);
          return (
            <StaggerItem
              key={repo.fullName || repo.name}
              as="a"
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="gh-repo group flex min-h-[10.5rem] flex-col bg-surface p-6 transition-colors hover:bg-paper"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="font-display text-xl leading-tight font-bold [overflow-wrap:anywhere] group-hover:text-blue-deep">{repo.name}</span>
                <ArrowUpRight size={18} className="gh-repo-arrow mt-0.5 shrink-0 text-blue rtl:-scale-x-100" aria-hidden="true" />
              </span>
              <span className="mt-2 line-clamp-2 text-sm text-muted" dir="auto">
                {repo.description || (host ? host : m.github.noDescription)}
              </span>
              <span className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 text-xs text-muted">
                {repo.language && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 bg-blue" aria-hidden="true" />
                    {repo.language}
                  </span>
                )}
                <span className="inline-flex items-center gap-1" aria-label={`${m.github.stars} ${num.format(repo.stars)}`}>
                  <Star size={13} aria-hidden="true" />
                  {num.format(repo.stars)}
                </span>
                {repo.forks > 0 && (
                  <span className="inline-flex items-center gap-1" aria-label={`${m.github.forks} ${num.format(repo.forks)}`}>
                    <GitFork size={13} aria-hidden="true" />
                    {num.format(repo.forks)}
                  </span>
                )}
              </span>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </div>
  );
}

export function GithubSection() {
  const { m, locale } = useI18n();
  const sectionRef = useRef(null);
  const { status, data } = useGithubData(sectionRef);
  const lang = locale.htmlLang;

  return (
    <section id="github" ref={sectionRef} className="scroll-mt-24 border-t border-line bg-surface">
      <div className="wrap py-20 lg:py-28">
        <Heading m={m} />

        {status === "empty" && <EmptyState m={m} />}
        {(status === "idle" || status === "loading") && <Skeleton m={m} />}

        {status === "ready" && data && (
          <>
            <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-12">
              <div className="flex flex-col justify-end bg-surface p-6 lg:col-span-4 lg:p-8">
                <CountUp
                  value={data.stats.total}
                  locale={lang}
                  duration={1.6}
                  className="font-display text-[clamp(3.75rem,9vw,7.5rem)] leading-[0.9] font-bold tracking-[-0.04em] text-blue"
                />
                <p className="mt-3 text-sm text-muted">{m.github.totalLabel}</p>
              </div>
              <div className="grid grid-cols-2 gap-px bg-line lg:col-span-8 md:grid-cols-4">
                <Stat label={m.github.longest} unit={m.github.days}>
                  <CountUp value={data.stats.longestStreak} locale={lang} />
                </Stat>
                <Stat label={m.github.current} unit={m.github.days}>
                  <CountUp value={data.stats.currentStreak} locale={lang} />
                </Stat>
                <Stat label={m.github.repos}>
                  <CountUp value={data.stats.publicRepos} locale={lang} />
                </Stat>
                <Stat label={m.github.since}>{new Intl.NumberFormat(lang, { useGrouping: false }).format(data.stats.since)}</Stat>
              </div>
            </div>

            <div className="mt-6">
              <ContributionHeatmap days={data.contributions.days} generatedAt={data.generatedAt} />
            </div>

            <div className="gh-below mt-16 grid gap-14 lg:grid-cols-12 lg:gap-12">
              <div className="space-y-14 lg:col-span-5">
                <Languages languages={data.languages} m={m} lang={lang} />
                <Activity activity={data.activity} m={m} lang={lang} />
              </div>
              <div className="lg:col-span-7">
                <Featured featured={data.featured} m={m} lang={lang} />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
