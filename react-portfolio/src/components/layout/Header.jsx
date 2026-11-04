import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { profile } from "../../data/site";
import { LOCALES, hrefFor, splitPath } from "../../i18n/config";
import { useI18n } from "../../i18n/useI18n";

const sections = [
  { hash: "#about", key: "practice" },
  { hash: "#record", key: "record" },
  { hash: "#prestasi", key: "prestasi" },
  { hash: "#work", key: "work" },
  { hash: "#github", key: "code" },
  { hash: "#contact", key: "contact" },
];

export function Header() {
  const { m, locale } = useI18n();
  const location = useLocation();
  const { subpath } = splitPath(location.pathname);
  const locationKey = `${location.pathname}${location.hash}`;
  const [menu, setMenu] = useState({ key: "", open: false });
  const open = menu.key === locationKey && menu.open;
  const panelId = useId();
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const headerRef = useRef(null);

  // Sticky scroll effects sit just under the header; publish its real height.
  // Only needed on mobile where sticky effects use --header-h.
  useEffect(() => {
    const el = headerRef.current;
    if (!el || typeof window.matchMedia !== "function") return undefined;
    const mql = window.matchMedia("(max-width: 1023px)");
    if (!mql.matches) return undefined;
    const root = document.documentElement;
    const sync = () => root.style.setProperty("--header-h", `${el.offsetHeight}px`);
    if (typeof ResizeObserver === "undefined") {
      sync();
      return undefined;
    }
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute("data-theme") || "light");

  function setOpen(next) {
    setMenu((current) => {
      const currentOpen = current.key === locationKey && current.open;
      const value = typeof next === "function" ? next(currentOpen) : next;
      return { key: locationKey, open: value };
    });
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    localStorage.setItem("theme", next);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "dark" ? "#07101c" : "#f4f7fb");
  }

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenu({ key: locationKey, open: false });
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("a,button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, locationKey]);

  const languages = (
    <ul className="flex flex-wrap gap-x-3 gap-y-1" aria-label={m.langLabel}>
      {LOCALES.filter((item, index, list) => list.findIndex((other) => other.code === item.code) === index).map((item) => {
        const current = item.code === locale.code;
        return (
          <li key={item.code}>
            <Link
              to={`${hrefFor(item, subpath.startsWith("/work/") ? subpath : "")}${location.hash}`}
              className={`text-xs font-semibold tracking-wide ${current ? "text-blue-deep underline decoration-blue underline-offset-4" : "text-muted hover:text-ink"}`}
              aria-current={current ? "page" : undefined}
              hrefLang={item.htmlLang}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-line bg-surface">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link to={hrefFor(locale)} className="font-display text-lg font-bold tracking-tight text-ink">
          {profile.name}
        </Link>
        <nav className="hidden items-center gap-4 xl:gap-6 lg:flex" aria-label="Primary">
          {sections.map((link) => (
            <a key={link.hash} href={link.hash} className="text-sm font-medium text-ink hover:text-blue-deep">
              {m.nav[link.key]}
            </a>
          ))}
          <a className="bg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-blue-deep" href="#contact">
            {m.nav.write}
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="min-h-11 border border-line px-3 text-sm font-semibold"
            aria-pressed={theme === "dark"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? m.themeLight : m.themeDark}
          </button>
          <button
            ref={buttonRef}
            type="button"
            className="min-h-11 px-1 text-sm font-semibold lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? m.nav.close : m.nav.menu}
          </button>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="wrap py-2">{languages}</div>
      </div>
      {open && (
        <nav id={panelId} ref={panelRef} className="border-t border-line bg-surface lg:hidden" aria-label="Mobile">
          <ul className="wrap flex flex-col py-3">
            {sections.map((link) => (
              <li key={link.hash} className="border-b border-line">
                <a href={link.hash} className="font-display block py-4 text-3xl font-bold" onClick={() => setOpen(false)}>
                  {m.nav[link.key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
