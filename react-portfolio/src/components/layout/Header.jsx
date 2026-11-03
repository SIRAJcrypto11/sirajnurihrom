import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { profile } from "../../data/site";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#record", label: "Record" },
  { href: "/#work", label: "Work" },
  { href: "/#practice", label: "Practice" },
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
      const open = typeof next === "function" ? next(currentOpen) : next;
      return { key: locationKey, open };
    });
  }

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenu({ key: locationKey, open: false });
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = [
        buttonRef.current,
        ...panelRef.current.querySelectorAll("a"),
      ].filter(Boolean);
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
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
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <div className="wrap flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link to="/" className="nav-link font-serif text-lg tracking-tight">
          {profile.name}
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} to={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
          <a className="text-link" href={`mailto:${profile.email}`}>
            Email
          </a>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="inline-flex h-11 items-center px-1 text-sm font-semibold md:hidden"
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
          className="border-t border-rule bg-paper md:hidden"
          aria-label="Mobile"
        >
          <ul className="wrap flex flex-col py-3">
            {links.map((link) => (
              <li key={link.href} className="border-b border-rule">
                <Link to={link.href} className="block py-4 text-lg">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a className="text-link block py-4" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
