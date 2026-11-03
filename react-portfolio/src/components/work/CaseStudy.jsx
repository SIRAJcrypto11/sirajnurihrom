import { Link } from "react-router-dom";
import { displayHost } from "../../data/work";
import { useI18n } from "../../i18n/useI18n";
import { workCopy } from "../../i18n/workCopy";
import { Shot } from "../Shot";

export function CaseStudy({ entry, headingLevel = "h3" }) {
  const { m, href } = useI18n();
  const copy = workCopy(m, entry);
  const Heading = headingLevel;

  return (
    <article className="border-t border-line py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="kicker">{entry.kind === "product" ? m.work.own : m.work.client}</p>
          <Heading className="font-display mt-3 text-4xl leading-none font-bold tracking-tight md:text-6xl">
            {copy.title}
          </Heading>
          {copy.summary && <p className="mt-5 text-xl leading-snug">{copy.summary}</p>}
          {copy.built && <p className="mt-4 text-muted">{copy.built}</p>}
          <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            <a className="text-blue-deep underline decoration-blue/30 underline-offset-4" href={entry.url} target="_blank" rel="noreferrer">
              {displayHost(entry.url)}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {entry.also?.map((link) => (
              <a key={link.url} className="text-blue-deep underline decoration-blue/30 underline-offset-4" href={link.url} target="_blank" rel="noreferrer">
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
            {headingLevel === "h3" && (
              <Link className="text-blue-deep underline decoration-blue/30 underline-offset-4" to={href(`/work/${entry.slug}`)}>
                {m.work.note}
              </Link>
            )}
          </p>
        </div>
        <div className="lg:col-span-7">
          <div className="overflow-hidden border border-line bg-surface">
            <Shot entry={entry} />
          </div>
        </div>
      </div>
    </article>
  );
}
