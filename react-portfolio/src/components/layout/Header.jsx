import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { profile } from "../../data/site";

const links = [
  { href: "/#about", label: "Practice" },
  { href: "/#record", label: "Record" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const location = useLocation();
  const locationKey = `${location.pathname}${location.hash}`;
  const [menu, setMenu] = useState({ key: "", open: false });
  const open = menu.key === locationKey && menu.open;
  const panelId = useId();
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  function setOpen(next) {
    setMenu((current) => {
      const currentOpen = current.key === locationKey && current.open;
      const value = typeof next === "function" ? next(currentOpen) : next;
      return { key: locationKey, open: value };
    });
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
    panelRef.current?.querySelector("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, locationKey]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link to="/" className="font-display text-lg font-bold tracking-tight text-ink">
          {profile.name}
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} to={link.href} className="text-sm font-medium text-ink hover:text-blue-deep">
              {link.label}
            </Link>
          ))}
          <a
            className="bg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-blue-deep"
            href={`mailto:${profile.email}`}
          >
            Write
          </a>
        </nav>
        <button
          ref={buttonRef}
          type="button"
          className="min-h-11 px-1 text-sm font-semibold md:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav
          id={panelId}
          ref={panelRef}
          className="border-t border-line bg-white md:hidden"
          aria-label="Mobile"
        >
          <ul className="wrap flex flex-col py-4">
            {links.map((link) => (
              <li key={link.href} className="border-b border-line">
                <Link to={link.href} className="font-display block py-4 text-3xl font-bold">
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <a className="text-blue-deep font-semibold" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
