import { Link } from "react-router-dom";
import { displayHost, hasNarrative, kindLabel } from "../../data/work";
import { Shot } from "../Shot";

const fields = [
  ["problem", "Problem"],
  ["role", "Role"],
  ["built", "What was built"],
  ["outcome", "Outcome"],
];

export function CaseStudy({ entry, headingLevel = "h3" }) {
  const Heading = headingLevel;
  const details = fields.filter(([key]) => entry[key]?.trim());

  return (
    <article className="border-t border-line py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="kicker">
            {kindLabel(entry.kind)}
            {entry.year ? ` · ${entry.year}` : ""}
          </p>
          <Heading className="font-display mt-3 text-4xl leading-none font-bold tracking-tight md:text-6xl">
            {entry.title}
          </Heading>
          {entry.summary && <p className="mt-5 text-xl leading-snug">{entry.summary}</p>}
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
            {headingLevel === "h3" && hasNarrative(entry) && (
              <Link className="text-blue-deep underline decoration-blue/30 underline-offset-4" to={`/work/${entry.slug}`}>
                Case note
              </Link>
            )}
          </p>
        </div>
        <div className="lg:col-span-7">
          <div className="overflow-hidden border border-line">
            <Shot entry={entry} />
          </div>
          {details.length > 0 && (
            <dl className="mt-8 grid gap-5">
              {details.map(([key, label]) => (
                <div key={key}>
                  <dt className="text-xs font-semibold tracking-[0.16em] text-blue-deep uppercase">{label}</dt>
                  <dd className="mt-2 text-ink">{entry[key]}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </article>
  );
}
