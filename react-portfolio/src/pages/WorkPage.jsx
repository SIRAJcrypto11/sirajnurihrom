import { Link, useLocation } from "react-router-dom";
import { getWork, isListed } from "../data/work";
import { splitPath } from "../i18n/config";
import { useI18n } from "../i18n/useI18n";
import { CaseStudy } from "../components/work/CaseStudy";
import { NotFound } from "./NotFound";

export function WorkPage() {
  const { pathname } = useLocation();
  const { subpath } = splitPath(pathname);
  const slug = subpath.match(/^\/work\/([^/]+)$/)?.[1];
  const found = slug ? getWork(slug) : undefined;
  const entry = found && isListed(found) ? found : undefined;
  const { href, m } = useI18n();

  if (!entry) return <NotFound />;

  return (
    <div className="wrap py-16 md:py-24">
      <p>
        <Link className="text-sm font-semibold text-blue-deep underline decoration-blue/30 underline-offset-4" to={`${href()}#work`}>
          {m.nav.work}
        </Link>
      </p>
      <div className="mt-6">
        <CaseStudy entry={entry} headingLevel="h1" />
      </div>
    </div>
  );
}
