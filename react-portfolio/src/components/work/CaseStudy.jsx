import { Link } from "react-router-dom";
import { displayHost, hasNarrative, kindLabel } from "../../data/work";

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
    <article className="border-t border-rule py-10 md:py-14">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="kicker">
            {kindLabel(entry.kind)}
            {entry.year ? ` · ${entry.year}` : ""}
          </p>
          <Heading className="mt-3 font-serif text-4xl leading-none tracking-tight md:text-5xl">
            {entry.title}
          </Heading>
          {entry.tags?.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
              {entry.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="md:col-span-8">
          {entry.image ? (
            <figure className="mb-6">
              <img
                src={entry.image}
                alt={entry.imageAlt || ""}
                className="w-full border border-rule"
              />
            </figure>
          ) : null}

          {entry.summary && (
            <p className="font-serif text-2xl leading-snug text-ink">{entry.summary}</p>
          )}

          {details.length > 0 && (
            <dl className="mt-8 grid gap-6">
              {details.map(([key, label]) => (
                <div key={key} className="grid gap-1 md:grid-cols-12">
                  <dt className="text-sm font-semibold tracking-[0.14em] text-accent uppercase md:col-span-3">
                    {label}
                  </dt>
                  <dd className="text-ink md:col-span-9">{entry[key]}</dd>
                </div>
              ))}
            </dl>
          )}

          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            <a className="text-link" href={entry.url} target="_blank" rel="noreferrer">
              Visit {displayHost(entry.url)}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {entry.also?.map((link) => (
              <a
                key={link.url}
                className="text-link"
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
            {headingLevel === "h3" && hasNarrative(entry) && (
              <Link className="text-link" to={`/work/${entry.slug}`}>
                Open the case note
              </Link>
            )}
          </p>
        </div>
      </div>
    </article>
  );
}
