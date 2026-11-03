import { Link } from "react-router-dom";
import { profile } from "../../data/site";
import { useI18n } from "../../i18n/useI18n";

export function Footer() {
  const { m, href } = useI18n();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="wrap flex flex-col gap-4 py-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{m.hero.role}</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          <Link className="text-blue-deep underline decoration-blue/40 underline-offset-4" to={`${href()}#top`}>
            {m.footer.top}
          </Link>
          <a className="text-blue-deep underline decoration-blue/40 underline-offset-4" href={profile.resume}>
            {m.footer.resume}
          </a>
          <span className="text-muted">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
