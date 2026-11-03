import { Link } from "react-router-dom";
import { profile } from "../../data/site";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper text-ink">
      <div className="wrap flex flex-col gap-4 py-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-2xl tracking-tight">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">
            {profile.role}, {profile.company}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link className="text-link" to="/#top">
            Back to top
          </Link>
          <a className="text-link" href={profile.resume}>
            Resume
          </a>
          <span className="text-muted">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
