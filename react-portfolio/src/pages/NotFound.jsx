import { Link } from "react-router-dom";
import { usePageMeta } from "../components/usePageMeta";

export function NotFound() {
  usePageMeta({
    title: "Page not found | Siraj Nur Ihrom",
    description: "That page is not part of this portfolio.",
    path: "/404",
  });

  return (
    <section className="wrap py-24 md:py-36">
      <p className="kicker">404</p>
      <h1 className="mt-4 max-w-xl font-serif text-5xl leading-none tracking-tight md:text-7xl">
        This page is not in the portfolio.
      </h1>
      <p className="mt-6 max-w-lg text-lg text-muted">
        The address does not match a section or a case note.
      </p>
      <p className="mt-8">
        <Link className="text-link" to="/">
          Return home
        </Link>
      </p>
    </section>
  );
}
