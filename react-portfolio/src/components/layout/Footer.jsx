import { Link } from "react-router-dom";
import { profile } from "../../data/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="wrap flex flex-col gap-4 py-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">
            {profile.role}, {profile.company}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          <Link className="text-blue-deep underline decoration-blue/40 underline-offset-4" to="/#top">
            Back to top
          </Link>
          <a className="text-blue-deep underline decoration-blue/40 underline-offset-4" href={profile.resume}>
            Resume
          </a>
          <span className="text-muted">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
