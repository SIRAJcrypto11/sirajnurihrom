import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "../../i18n/useI18n";
import { observeInView } from "../motion/inView";

const DAY_MS = 86400000;
const GAP = 3;
const MOBILE_CELL = 11;
const MONTH_ROW = 18;
const LABELLED_DAYS = [1, 3, 5];
const PROFILE_URL = "https://github.com/SIRAJcrypto11";

function parseDay(value) {
  const [y, mo, d] = value.split("-").map(Number);
  return Date.UTC(y, mo - 1, d);
}

function isoDay(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

/** Columns of 7 days (Sunday first), built in UTC so no timezone can shift a date. */
function buildWeeks(days) {
  if (!Array.isArray(days) || days.length === 0) return [];
  const map = new Map(days.map(([date, count, level]) => [date, { count, level }]));
  const first = parseDay(days[0][0]);
  const last = parseDay(days[days.length - 1][0]);
  const start = first - new Date(first).getUTCDay() * DAY_MS;
  const end = last + (6 - new Date(last).getUTCDay()) * DAY_MS;
  const weeks = [];
  for (let cursor = start; cursor <= end; cursor += 7 * DAY_MS) {
    const week = [];
    for (let d = 0; d < 7; d += 1) {
      const ms = cursor + d * DAY_MS;
      const date = isoDay(ms);
      const hit = map.get(date);
      week.push(hit ? { date, ms, count: hit.count, level: hit.level } : { date, ms, count: 0, level: -1 });
    }
    weeks.push(week);
  }
  return weeks;
}

function monthLabels(weeks) {
  const labels = [];
  weeks.forEach((week, w) => {
    const firstOfMonth = week.find((cell) => cell.level !== -1 && new Date(cell.ms).getUTCDate() === 1);
    if (firstOfMonth) labels.push({ week: w, ms: firstOfMonth.ms });
  });
  const firstReal = weeks[0]?.find((cell) => cell.level !== -1);
  if (firstReal && (!labels.length || labels[0].week >= 3)) labels.unshift({ week: 0, ms: firstReal.ms });
  return labels;
}

function cellSizeFor(width, weekCount) {
  if (!width || width < 720) return MOBILE_CELL;
  const size = Math.floor((width - (weekCount - 1) * GAP) / weekCount);
  return Math.max(MOBILE_CELL, Math.min(18, size));
}

export function ContributionHeatmap({ days, generatedAt }) {
  const { m, locale } = useI18n();
  const cardRef = useRef(null);
  const measureRef = useRef(null);
  const scrollRef = useRef(null);
  const gridRef = useRef(null);
  const activeRef = useRef(null);
  const tipRef = useRef(null);
  const atEndRef = useRef(true);
  const [cell, setCell] = useState(MOBILE_CELL);
  const [tip, setTip] = useState(null);
  const [cursor, setCursor] = useState(-1);

  const weeks = useMemo(() => buildWeeks(days), [days]);
  const labels = useMemo(() => monthLabels(weeks), [weeks]);
  const weekCount = weeks.length;
  const lang = locale.htmlLang;

  const fmt = useMemo(() => {
    const utc = { timeZone: "UTC" };
    return {
      weekday: new Intl.DateTimeFormat(lang, { ...utc, weekday: "short" }),
      month: new Intl.DateTimeFormat(lang, { ...utc, month: "short" }),
      full: new Intl.DateTimeFormat(lang, { ...utc, weekday: "long", day: "numeric", month: "long", year: "numeric" }),
      number: new Intl.NumberFormat(lang),
      plural: new Intl.PluralRules(lang),
      relative: new Intl.RelativeTimeFormat(lang, { numeric: "auto" }),
    };
  }, [lang]);

  // Size cells to the card on desktop; fixed size plus horizontal scroll on phones.
  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el || !weekCount) return undefined;
    const apply = () => {
      setCell(cellSizeFor(el.clientWidth, weekCount));
      requestAnimationFrame(() => {
        const scroller = scrollRef.current;
        if (scroller && atEndRef.current) scroller.scrollLeft = scroller.scrollWidth;
      });
    };
    apply();
    if (typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    if (scrollRef.current) ro.observe(scrollRef.current);
    return () => ro.disconnect();
  }, [weekCount]);

  // Start on the latest weeks when the calendar is wider than the screen.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el && atEndRef.current) el.scrollLeft = el.scrollWidth;
  }, [cell, weekCount]);

  useLayoutEffect(() => observeInView(gridRef.current), [weekCount]);

  // Keep the tooltip inside the card, whatever the language makes its width.
  useLayoutEffect(() => {
    const el = tipRef.current;
    const card = cardRef.current;
    if (!tip || !el || !card) return;
    const half = el.offsetWidth / 2;
    const x = Math.max(half + 4, Math.min(card.clientWidth - half - 4, tip.x));
    el.style.left = `${x}px`;
  }, [tip]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;
    const onEnd = (event) => {
      if (event.target.dataset?.w === "0" && event.target.dataset?.d === "6") grid.classList.add("is-done");
    };
    grid.addEventListener("transitionend", onEnd);
    return () => grid.removeEventListener("transitionend", onEnd);
  }, [weekCount]);

  const describe = useCallback(
    (entry) => {
      const count =
        entry.count === 0
          ? m.github.none
          : m.github[fmt.plural.select(entry.count) === "one" ? "countOne" : "countOther"].replace(
              "{n}",
              fmt.number.format(entry.count),
            );
      return { count, date: fmt.full.format(new Date(entry.ms)) };
    },
    [m, fmt],
  );

  const clearActive = () => {
    activeRef.current?.removeAttribute("data-active");
    activeRef.current = null;
  };

  const show = useCallback(
    (element) => {
      const w = Number(element?.dataset.w);
      const d = Number(element?.dataset.d);
      const entry = weeks[w]?.[d];
      const card = cardRef.current;
      if (!entry || entry.level === -1 || !card) return;
      if (activeRef.current !== element) {
        clearActive();
        element.setAttribute("data-active", "");
        activeRef.current = element;
      }
      const c = element.getBoundingClientRect();
      const k = card.getBoundingClientRect();
      const x = c.left - k.left + c.width / 2;
      const above = c.top - k.top > 64;
      setTip({
        ...describe(entry),
        x,
        y: above ? c.top - k.top - 8 : c.bottom - k.top + 8,
        above,
      });
    },
    [weeks, describe],
  );

  const hide = useCallback(() => {
    clearActive();
    setTip(null);
  }, []);

  useEffect(() => {
    if (!tip) return undefined;
    const onDown = (event) => {
      if (!gridRef.current?.contains(event.target)) hide();
    };
    const onScroll = () => hide();
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    const scroller = scrollRef.current;
    scroller?.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", onScroll);
      scroller?.removeEventListener("scroll", onScroll);
    };
  }, [tip, hide]);

  const onPointerOver = (event) => {
    if (event.pointerType === "touch") return;
    const target = event.target.closest?.(".gh-cell");
    if (target) show(target);
  };

  const onPointerUp = (event) => {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") return;
    const target = event.target.closest?.(".gh-cell");
    if (target) show(target);
  };

  const onKeyDown = (event) => {
    if (!weekCount) return;
    const lastIndex = weeks.reduce((acc, week, w) => {
      week.forEach((entry, d) => {
        if (entry.level !== -1) acc = w * 7 + d;
      });
      return acc;
    }, 0);
    const moves = { ArrowRight: 7, ArrowLeft: -7, ArrowDown: 1, ArrowUp: -1 };
    if (event.key === "Escape") {
      hide();
      return;
    }
    if (!(event.key in moves) && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    let next = cursor < 0 ? lastIndex : cursor + (moves[event.key] || 0);
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = lastIndex;
    next = Math.max(0, Math.min(lastIndex, next));
    while (next > 0 && weeks[Math.floor(next / 7)][next % 7].level === -1) next += moves[event.key] < 0 ? 1 : -1;
    setCursor(next);
    const el = gridRef.current?.querySelector(`[data-w="${Math.floor(next / 7)}"][data-d="${next % 7}"]`);
    if (el) {
      el.scrollIntoView({ block: "nearest", inline: "nearest" });
      show(el);
    }
  };

  const gridWidth = weekCount * cell + (weekCount - 1) * GAP;

  const cells = useMemo(
    () =>
      weeks.map((week, w) =>
        week.map((entry, d) => (
          <span
            key={entry.date}
            className="gh-cell"
            data-w={w}
            data-d={d}
            data-level={entry.level === -1 ? "none" : Math.min(entry.level, 4)}
            style={{ "--d": `${(weekCount - 1 - w) * 14 + d * 12}ms` }}
          />
        )),
      ),
    [weeks, weekCount],
  );

  const updated = useMemo(() => {
    const at = new Date(generatedAt).getTime();
    if (!generatedAt || Number.isNaN(at)) return "";
    const minutes = Math.round((Date.now() - at) / 60000);
    let rel;
    if (minutes < 60) rel = fmt.relative.format(-Math.max(1, minutes), "minute");
    else if (minutes < 1440) rel = fmt.relative.format(-Math.round(minutes / 60), "hour");
    else rel = fmt.relative.format(-Math.round(minutes / 1440), "day");
    return m.github.updated.replace("{time}", rel);
  }, [generatedAt, fmt, m]);

  const sunday = Date.UTC(2023, 0, 1);

  return (
    <div ref={cardRef} className="gh-card relative border border-line bg-paper p-4 sm:p-6 lg:p-8">
      <div className="flex gap-3">
        <div className="gh-days shrink-0 text-[10px] leading-none text-muted" aria-hidden="true" style={{ paddingTop: MONTH_ROW }}>
          {Array.from({ length: 7 }, (_, d) => (
            <span key={d} className="flex items-center" style={{ height: cell, marginBottom: d < 6 ? GAP : 0 }}>
              {LABELLED_DAYS.includes(d) ? fmt.weekday.format(new Date(sunday + d * DAY_MS)) : ""}
            </span>
          ))}
        </div>

        <div ref={measureRef} className="min-w-0 flex-1">
          <div
            ref={scrollRef}
            className="film-scroll overflow-x-auto pb-2 outline-none focus-visible:ring-2 focus-visible:ring-blue"
            dir="ltr"
            tabIndex={0}
            role="group"
            aria-label={m.github.calendarLabel}
            aria-describedby="gh-cal-hint"
            onKeyDown={onKeyDown}
            onBlur={hide}
            onScroll={(event) => {
              const el = event.currentTarget;
              atEndRef.current = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
            }}
          >
            <div style={{ width: gridWidth }}>
              <div className="relative text-[10px] leading-none text-muted" style={{ height: MONTH_ROW }} aria-hidden="true">
                {labels.map((label) => (
                  <span key={label.week} className="absolute top-0 whitespace-nowrap" style={{ left: label.week * (cell + GAP) }}>
                    {fmt.month.format(new Date(label.ms))}
                  </span>
                ))}
              </div>
              <div
                ref={gridRef}
                className="gh-grid"
                data-wave=""
                aria-hidden="true"
                style={{
                  display: "grid",
                  gridAutoFlow: "column",
                  gridTemplateRows: `repeat(7, ${cell}px)`,
                  gridAutoColumns: `${cell}px`,
                  gap: GAP,
                }}
                onPointerOver={onPointerOver}
                onPointerLeave={(event) => event.pointerType !== "touch" && hide()}
                onPointerUp={onPointerUp}
              >
                {cells}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={tipRef}
        className={`gh-tip pointer-events-none absolute z-20 whitespace-nowrap bg-ink px-3 py-2 text-center text-paper shadow-[0_10px_30px_-12px_rgba(7,21,44,0.45)] ${tip ? "is-on" : ""}`}
        style={{
          left: tip ? tip.x : "50%",
          top: tip ? tip.y : 0,
          visibility: tip ? "visible" : "hidden",
          transform: `translate(-50%, ${tip?.above ? "-100%" : "0"})`,
        }}
        aria-hidden="true"
      >
        {tip && (
          <>
            <span className="block text-sm font-semibold">{tip.count}</span>
            <span className="block text-xs opacity-75">{tip.date}</span>
          </>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {tip ? `${tip.count}, ${tip.date}` : ""}
      </p>
      <p id="gh-cal-hint" className="sr-only">
        {m.github.keyHint}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-4 text-xs text-muted">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {updated && <span>{updated}</span>}
          <a
            className="inline-flex items-center gap-1 font-semibold text-ink underline decoration-blue decoration-2 underline-offset-4 hover:text-blue-deep"
            href={PROFILE_URL}
            target="_blank"
            rel="noreferrer"
          >
            {m.github.profile}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </p>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="me-1">{m.github.less}</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span key={level} className="gh-swatch" data-level={level} />
          ))}
          <span className="ms-1">{m.github.more}</span>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted md:hidden">{m.github.scrollHint}</p>
    </div>
  );
}
