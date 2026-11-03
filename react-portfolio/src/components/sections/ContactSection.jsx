import { useState } from "react";
import { profile } from "../../data/site";

export function ContactSection() {
  const [notice, setNotice] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = `Portfolio inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    setNotice("Opening your email app with this note filled in.");
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-navy text-white">
      <div className="wrap py-20 lg:py-28">
        <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase">05 — Contact</p>
        <h2 className="font-display mt-4 max-w-4xl text-5xl leading-[0.92] font-bold tracking-tight md:text-7xl">
          For a platform, a consultation, or an architecture conversation.
        </h2>
        <p className="mt-5 max-w-xl text-lg text-white/75">
          Based in {profile.location} ({profile.timezone}).
        </p>

        <div className="mt-12 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a
              className="inline-block max-w-full font-display text-xl leading-tight font-bold break-words underline decoration-blue decoration-2 underline-offset-8 md:text-3xl"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
            <p className="mt-6">
              <a className="underline decoration-white/30 underline-offset-4" href={`tel:${profile.phoneTel}`}>
                {profile.phoneDisplay}
              </a>
            </p>
            <ul className="mt-8 flex flex-col gap-2">
              {profile.links.map((link) => (
                <li key={link.href}>
                  <a className="underline decoration-white/30 underline-offset-4" href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <a className="underline decoration-white/30 underline-offset-4" href={profile.resume}>
                  Resume (PDF)
                </a>
              </li>
            </ul>
          </div>

          <form className="contact-form lg:col-span-6 lg:col-start-7" onSubmit={onSubmit}>
            <p className="text-sm text-white/70">
              This form does not store the message. It opens your email app with the note filled in.
            </p>
            <div className="mt-4">
              <label htmlFor="contact-name" className="text-sm font-semibold">Name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="mt-4">
              <label htmlFor="contact-email" className="text-sm font-semibold">Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="mt-4">
              <label htmlFor="contact-message" className="text-sm font-semibold">Message</label>
              <textarea id="contact-message" name="message" required />
            </div>
            <button type="submit" className="mt-8 min-h-12 bg-blue px-6 font-semibold text-white hover:bg-white hover:text-navy">
              Open in email
            </button>
            {notice && (
              <p className="mt-4 text-sm text-white/80" role="status">{notice}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
