import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { profile, siteUrl } from "../data/site";
import { getWork } from "../data/work";
import { hrefFor, PUBLIC_LOCALES, splitPath } from "./config";
import { MESSAGES } from "./messages";
import { I18nContext, useI18n } from "./useI18n";
import { achievementContent } from "./achievements";
import { achievements } from "../data/achievements";
import { workCopy } from "./workCopy";

export function I18nProvider({ locale, children }) {
  const value = {
    locale,
    m: MESSAGES[locale.code],
    href: (subpath = "") => hrefFor(locale, subpath),
  };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function upsertMeta(selector, attributes) {
  let node = document.head.querySelector(selector);
  if (!node) {
    const tag = selector.startsWith("meta") ? "meta" : "link";
    node = document.createElement(tag);
    document.head.appendChild(node);
  }
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
}

export function LocaleHead() {
  const { locale, m } = useI18n();
  const { pathname } = useLocation();
  const { subpath } = splitPath(pathname);
  const slug = subpath.match(/^\/work\/([^/]+)$/)?.[1];
  const entry = slug ? getWork(slug) : null;
  const copy = entry ? workCopy(m, entry) : null;
  const missing = Boolean(subpath) && !entry;
  const title = missing ? m.notFound.title : entry ? `${copy.title} | Siraj Nur Ihrom` : m.meta.title;
  const description = missing ? m.notFound.body : entry ? copy.summary || copy.built : m.meta.description;
  const pagePath = hrefFor(locale, entry ? `/work/${entry.slug}` : "");

  useLayoutEffect(() => {
    document.documentElement.lang = locale.htmlLang;
    document.documentElement.dir = locale.dir;
    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="title"]', { name: "title", content: title });
    upsertMeta('link[rel="canonical"]', { rel: "canonical", href: `${siteUrl}${pagePath}` });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: `${siteUrl}${pagePath}` });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[name="twitter:url"]', { name: "twitter:url", content: `${siteUrl}${pagePath}` });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });

    document.querySelectorAll("link[data-hreflang]").forEach((node) => node.remove());
    const tail = entry ? `/work/${entry.slug}` : "";
    for (const alt of PUBLIC_LOCALES) {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = alt.hreflang;
      link.href = `${siteUrl}${hrefFor(alt, tail)}`;
      link.dataset.hreflang = "1";
      document.head.appendChild(link);
    }
    const fallback = document.createElement("link");
    fallback.rel = "alternate";
    fallback.hreflang = "x-default";
    fallback.href = `${siteUrl}${tail || "/"}`;
    fallback.dataset.hreflang = "1";
    document.head.appendChild(fallback);

    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          name: profile.name,
          jobTitle: m.meta.jobTitle,
          url: `${siteUrl}${pagePath}`,
          email: `mailto:${profile.email}`,
          telephone: "+62-851-8515-1356",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bengkulu",
            addressCountry: "ID",
          },
          worksFor: {
            "@type": "Organization",
            name: profile.company,
            url: "https://snishop.com",
          },
          sameAs: profile.links.map((link) => link.href),
          award: ["wisudawan", "kmi"].map((id) => {
            const text = achievementContent(locale.code).items[id];
            const year = achievements.find((item) => item.id === id)?.year;
            return `${text.title} (${year})`;
          }),
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            name: achievementContent(locale.code).items.unib.title,
            description: achievementContent(locale.code).items.unib.detail,
          },
          memberOf: ["kopma", "tda"].map((id) => ({
            "@type": "Organization",
            name: achievementContent(locale.code).items[id].title,
            description: achievementContent(locale.code).items[id].detail,
          })),
        },
        {
          "@type": "Organization",
          name: profile.company,
          url: "https://snishop.com",
        },
      ],
    };
    let script = document.getElementById("jsonld");
    if (!script) {
      script = document.createElement("script");
      script.id = "jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(graph);
  }, [locale, title, description, pagePath, m, entry]);

  return null;
}
