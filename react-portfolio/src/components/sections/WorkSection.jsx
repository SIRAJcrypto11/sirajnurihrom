import { Link } from "react-router-dom";
import { displayHost, listedWork } from "../../data/work";
import { useI18n } from "../../i18n/useI18n";
import { workCopy } from "../../i18n/workCopy";
import { SplitHeading } from "../motion/SplitHeading";
import { StaggerGroup, StaggerItem } from "../motion/StaggerGroup";
import { Shot } from "../Shot";
import { ActiveScroll } from "../motion/ActiveScroll";

export function WorkSection() {
  const { m, href } = useI18n();
  const products = listedWork().filter((entry) => entry.kind === "product");
  const clients = listedWork().filter((entry) => entry.kind === "client");

  return (
    <section id="work" className="scroll-mt-24 border-b border-line">
      <div className="wrap py-20 lg:py-28">
        <p className="kicker">{m.work.kicker}</p>
        <SplitHeading
          as="h2"
          text={m.work.title}
          className="font-display mt-4 max-w-4xl text-4xl leading-[0.95] font-bold tracking-tight md:text-7xl"
        />
        <p className="mt-5 max-w-xl text-lg text-muted">{m.work.lede}</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
          <a className="border border-line bg-surface px-4 py-2 hover:border-blue" href="#own-products">{m.work.own}</a>
          <a className="border border-line bg-surface px-4 py-2 hover:border-blue" href="#client-work">{m.work.client}</a>
        </div>
      </div>
      <ProductGroup id="own-products" label={m.work.own} items={products} />
      <ProductGroup id="client-work" label={m.work.client} items={clients} />
    </section>
  );

  function ProductGroup({ id, label, items }) {
    return (
      <div id={id} className="scroll-mt-28 border-t border-line bg-paper">
        <div className="wrap py-14 lg:py-20">
          <h3 className="font-display text-4xl leading-none font-extrabold tracking-[-0.04em] md:text-6xl">
            {label}
            <span className="text-blue">.</span>
          </h3>
          <ActiveScroll>
          <StaggerGroup className="mt-6" stagger={0.05}>
            {items.map((entry, index) => (
              <StaggerItem
                as="article"
                key={entry.slug}
                className="sn-work-card sn-active-scroll grid items-center gap-8 border-t border-line py-10 lg:grid-cols-12 lg:py-16"
              >
                <ProductRow entry={entry} index={index} href={href(`/work/${entry.slug}`)} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          </ActiveScroll>
        </div>
      </div>
    );
  }
}

function ProductRow({ entry, index, href }) {
  const { m } = useI18n();
  const copy = workCopy(m, entry);
  const flip = index % 2 === 1;
  const body = (
    <>
      <p className="kicker">{entry.kind === "product" ? m.work.own : m.work.client}</p>
      <h4 className="font-display mt-3 text-4xl leading-[0.95] font-bold tracking-tight md:text-5xl">
        <a href={entry.url} target="_blank" rel="noreferrer" className="hover:text-blue-deep">
          {copy.title}
        </a>
      </h4>
      <p className="mt-4 text-lg leading-snug">{copy.summary}</p>
      {copy.built && <p className="mt-3 text-muted">{copy.built}</p>}
      <p className="mt-6 flex flex-wrap gap-3">
        <a className="bg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-blue-deep" href={entry.url} target="_blank" rel="noreferrer">
          {m.work.visit} {displayHost(entry.url)}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <Link className="border border-line px-4 py-2 text-sm font-semibold hover:border-blue" to={href}>
          {m.work.note}
        </Link>
      </p>
    </>
  );
  const media = (
    <a href={entry.url} target="_blank" rel="noreferrer" className="group block overflow-hidden border border-line bg-surface transition duration-300 hover:border-blue">
      <Shot entry={entry} className="transition duration-500 group-hover:scale-[1.015]" />
    </a>
  );

  return (
    <>
      <div className={flip ? "lg:col-span-5 lg:order-2" : "lg:col-span-5"}>{body}</div>
      <div className={flip ? "lg:col-span-7 lg:order-1" : "lg:col-span-7"}>{media}</div>
    </>
  );
}
