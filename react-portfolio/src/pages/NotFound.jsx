import { Link } from "react-router-dom";
import { useI18n } from "../i18n/useI18n";

export function NotFound() {
  const { m, href } = useI18n();

  return (
    <section className="wrap py-24 md:py-36">
      <p className="kicker">{m.notFound.kicker}</p>
      <h1 className="font-display mt-4 max-w-xl text-5xl leading-none font-bold tracking-tight md:text-7xl">
        {m.notFound.title}
      </h1>
      <p className="mt-6 max-w-lg text-lg text-muted">{m.notFound.body}</p>
      <p className="mt-8">
        <Link className="bg-blue px-5 py-3 text-sm font-semibold text-white" to={href()}>
          {m.notFound.home}
        </Link>
      </p>
    </section>
  );
}
