export const LOCALES = [
  { code: "id", segment: "", hreflang: "id", htmlLang: "id", dir: "ltr", label: "Indonesia", short: "ID" },
  { code: "id", segment: "id", hreflang: null, htmlLang: "id", dir: "ltr", label: "Indonesia", short: "ID", alias: true },
  { code: "en", segment: "english", hreflang: "en", htmlLang: "en", dir: "ltr", label: "English", short: "EN" },
  { code: "ar", segment: "arabic", hreflang: "ar", htmlLang: "ar", dir: "rtl", label: "العربية", short: "AR" },
  { code: "zh", segment: "chinese", hreflang: "zh-Hans", htmlLang: "zh-Hans", dir: "ltr", label: "中文", short: "ZH" },
  { code: "ja", segment: "japanese", hreflang: "ja", htmlLang: "ja", dir: "ltr", label: "日本語", short: "JA" },
  { code: "ms", segment: "malay", hreflang: "ms", htmlLang: "ms", dir: "ltr", label: "Melayu", short: "MS" },
];

export const PUBLIC_LOCALES = LOCALES.filter((locale) => locale.hreflang);

export function localeBase(locale) {
  return locale.segment ? `/${locale.segment}` : "";
}

export function hrefFor(locale, subpath = "") {
  const path = `${localeBase(locale)}${subpath}`;
  return path || "/";
}

export function splitPath(pathname) {
  const clean = pathname.replace(/\/$/, "") || "/";
  const segments = LOCALES.map((locale) => locale.segment).filter(Boolean);
  for (const segment of segments) {
    if (clean === `/${segment}`) return { segment, subpath: "" };
    if (clean.startsWith(`/${segment}/`)) {
      return { segment, subpath: clean.slice(segment.length + 1) };
    }
  }
  return { segment: "", subpath: clean === "/" ? "" : clean };
}

export function findLocale(pathname) {
  const { segment } = splitPath(pathname);
  return LOCALES.find((locale) => locale.segment === segment) || LOCALES[0];
}
