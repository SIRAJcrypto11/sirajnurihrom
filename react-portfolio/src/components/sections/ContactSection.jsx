import { useState } from "react";
import { profile } from "../../data/site";
import { useI18n } from "../../i18n/useI18n";
import { Reveal } from "../motion/Reveal";
import { SplitHeading } from "../motion/SplitHeading";

export function ContactSection() {
  const { m } = useI18n();
  const [notice, setNotice] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = `${name}`;
    const body = `${m.contact.name}: ${name}\n${m.contact.email}: ${email}\n\n${message}`;
    setNotice(m.contact.opening);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-navy text-[#f4f7fb]">
      <div className="wrap py-20 lg:py-28">
        <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase">{m.contact.kicker}</p>
        <SplitHeading
          as="h2"
          text={m.contact.title}
          className="font-display mt-4 max-w-4xl text-5xl leading-[0.92] font-bold tracking-tight md:text-7xl"
        />
        <p className="mt-5 max-w-xl text-lg text-[#f4f7fb]/75">{m.contact.based}</p>
        <Reveal className="mt-12 grid gap-14 lg:grid-cols-12" y={16}>
          <div className="lg:col-span-5">
            <a className="inline-block max-w-full font-display text-xl leading-tight font-bold break-words underline decoration-blue decoration-2 underline-offset-8 md:text-3xl" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <p className="mt-6">
              <a className="underline decoration-white/30 underline-offset-4" href={`tel:${profile.phoneTel}`}>{profile.phoneDisplay}</a>
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
                <a className="underline decoration-white/30 underline-offset-4" href={profile.resume}>{m.contact.resume}</a>
              </li>
            </ul>
          </div>
          <form className="contact-form lg:col-span-6 lg:col-start-7" onSubmit={onSubmit}>
            <p className="text-sm text-[#f4f7fb]/70">{m.contact.form}</p>
            <div className="mt-4">
              <label htmlFor="contact-name" className="text-sm font-semibold">{m.contact.name}</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="mt-4">
              <label htmlFor="contact-email" className="text-sm font-semibold">{m.contact.email}</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="mt-4">
              <label htmlFor="contact-message" className="text-sm font-semibold">{m.contact.message}</label>
              <textarea id="contact-message" name="message" required />
            </div>
            <button type="submit" className="mt-8 min-h-12 bg-blue px-6 font-semibold text-white hover:bg-[#f4f7fb] hover:text-navy">
              {m.contact.submit}
            </button>
            {notice && <p className="mt-4 text-sm text-[#f4f7fb]/80" role="status">{notice}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
