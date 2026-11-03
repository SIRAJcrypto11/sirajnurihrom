import { Link, useParams } from "react-router-dom";
import { usePageMeta } from "../components/usePageMeta";
import { CaseStudy } from "../components/work/CaseStudy";
import { getWork, hasNarrative, isListed } from "../data/work";
import { NotFound } from "./NotFound";

export function WorkPage() {
  const { slug } = useParams();
  const found = getWork(slug);
  const entry = found && isListed(found) ? found : undefined;

  usePageMeta({
    title: entry ? `${entry.title} | Siraj Nur Ihrom` : "Page not found | Siraj Nur Ihrom",
    description: entry?.summary || entry?.problem || "Work by Siraj Nur Ihrom.",
    path: entry ? `/work/${entry.slug}` : "/404",
  });

  if (!entry) return <NotFound />;

  return (
    <div className="wrap py-16 md:py-24">
      <p>
        <Link className="text-link text-sm" to="/#work">
          All work
        </Link>
      </p>
      <div className="mt-6">
        <CaseStudy entry={entry} headingLevel="h1" />
      </div>
      {!entry.summary?.trim() && !hasNarrative(entry) && (
        <p className="max-w-xl text-muted">
          A full case note for {entry.title} is not published on this page yet. The live site is linked above.
        </p>
      )}
    </div>
  );
}
