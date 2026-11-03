import { useMemo, useState } from "react";
import { displayHost, featuredWork, kindLabel, listedWork, workGroups } from "../../data/work";
import { Reveal } from "../Reveal";
import { CaseStudy } from "../work/CaseStudy";

export function WorkSection() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const catalog = useMemo(() => listedWork(), []);
  const featured = useMemo(() => featuredWork(), []);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return catalog.filter((entry) => {
      if (filter !== "all" && entry.kind !== filter) return false;
      if (!needle) return true;
      const haystack = [entry.title, entry.summary, entry.url, kindLabel(entry.kind)]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [catalog, filter, query]);

  return (
    <section id="work" className="scroll-mt-24 border-t border-rule">
      <div className="wrap py-20 md:py-28">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="kicker">03 — Work</p>
            </div>
            <div className="md:col-span-8">
              <h2 className="font-serif text-4xl leading-none tracking-tight md:text-6xl">
                Products and client sites.
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-muted">
                Own products under SNISHOP, and sites built for clients. Open a row to visit the site.
              </p>
            </div>
          </div>
        </Reveal>

        {featured.length > 0 && (
          <div className="mt-12">
            <h3 className="kicker">Selected case notes</h3>
            {featured.map((entry) => (
              <CaseStudy key={entry.slug} entry={entry} />
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-col gap-4 border-y border-rule py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter work by type">
            <FilterButton
              pressed={filter === "all"}
              onClick={() => setFilter("all")}
              label={`All (${catalog.length})`}
            />
            {workGroups.map((group) => {
              const count = catalog.filter((entry) => entry.kind === group.id).length;
              return (
                <FilterButton
                  key={group.id}
                  pressed={filter === group.id}
                  onClick={() => setFilter(group.id)}
                  label={`${group.label} (${count})`}
                />
              );
            })}
          </div>
          <label className="block md:w-72">
            <span className="sr-only">Search work</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name"
              className="search-field"
            />
          </label>
        </div>

        {visible.length === 0 ? (
          <p className="py-12 text-muted">No entries match that filter.</p>
        ) : (
          workGroups
            .filter((group) => filter === "all" || filter === group.id)
            .map((group) => {
              const entries = visible.filter((entry) => entry.kind === group.id);
              if (entries.length === 0) return null;
              return (
                <div key={group.id} className="mt-10">
                  <h3 className="font-serif text-2xl">{group.label}</h3>
                  <ol className="mt-4 border-t border-rule">
                    {entries.map((entry, index) => (
                      <li key={entry.slug}>
                        <WorkRow entry={entry} index={index + 1} />
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })
        )}
      </div>
    </section>
  );
}

function FilterButton({ pressed, onClick, label }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`min-h-11 px-3 text-sm font-semibold ${
        pressed ? "bg-ink text-paper" : "text-ink hover:text-accent"
      }`}
    >
      {label}
    </button>
  );
}

function WorkRow({ entry, index }) {
  const number = String(index).padStart(2, "0");
  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noreferrer"
      className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-b border-rule py-5 text-ink no-underline hover:bg-paper-deep sm:grid-cols-12 sm:items-baseline"
    >
      <span className="pt-1 text-xs text-muted tabular-nums sm:col-span-1" aria-hidden="true">
        {number}
      </span>
      <span className="sm:col-span-7">
        <span className="block font-serif text-2xl leading-tight tracking-tight md:text-3xl">
          {entry.title}
        </span>
        {entry.summary?.trim() && (
          <span className="mt-2 block max-w-xl text-base text-muted">{entry.summary}</span>
        )}
      </span>
      <span className="col-start-2 text-sm font-semibold text-accent-deep sm:col-span-4 sm:col-start-auto sm:text-right">
        {displayHost(entry.url)}
        <span className="sr-only"> (opens in a new tab)</span>
      </span>
    </a>
  );
}
