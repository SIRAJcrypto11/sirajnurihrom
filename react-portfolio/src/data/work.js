/**
 * Single source for the Work section and /work/:slug pages.
 *
 * Checked against the live sites on 3 Nov 2026. Copy is taken from each
 * site's own title, meta description, or visible headline. Do not add
 * traffic, revenue, uptime, or other results the page does not state.
 *
 * `confirmed: false` keeps an entry out of the public index, case studies,
 * and sitemap. Nothing is flagged that way right now.
 *
 * Aliases, redirects, parked or default host pages, error pages,
 * nacreative.snishop.com, and ditaayusafitri.snishop.com are omitted.
 * Kopma UNIB and CV. Taksi Abang Group were removed after the owner said
 * they are not part of this catalog.
 *
 * kind: "product" | "client"
 */

export const workGroups = [
  { id: "product", label: "Own products" },
  { id: "client", label: "Client work" },
];

export const featureOrder = [
  "snishop-erp",
  "snishop-store",
  "keepitup",
  "quinn-of-spicy",
  "belangua",
  "learnjoin",
];

const entry = (fields) => ({
  year: "",
  problem: "",
  role: "",
  outcome: "",
  tags: [],
  image: "",
  imageAlt: "",
  also: [],
  confirmed: true,
  featured: false,
  ...fields,
});

export const work = [
  entry({
    slug: "snishop",
    title: "SNISHOP Network Indonesia",
    url: "https://snishop.com",
    kind: "product",
    summary:
      "Company site for autonomous SaaS and industry-standard enterprise customization.",
    built:
      "The live page titles itself SNISHOP Network Indonesia. Its line is “Solusi SaaS otonom & kustomisasi enterprise berstandar industri.”",
  }),
  entry({
    slug: "snishop-store",
    title: "SNISHOP Store",
    url: "https://app.snishop.com",
    kind: "product",
    featured: true,
    summary:
      "A digital product store for UMKM: ebooks, AI prompts, templates, Turnitin checks, and Canva Pro and Zoom Pro.",
    built:
      "The store’s headline is “Cek Turnitin, ebook UMKM, dan akun premium. Belanja di satu toko.” It sells UMKM digital-marketing ebooks, AI prompts, and social and WhatsApp templates from Rp10,000, plus Turnitin checks, Canva Pro, and Zoom Pro. The page says payment is by QRIS, with instant download, and that the catalog includes 70+ UMKM digital-marketing ebooks.",
  }),
  entry({
    slug: "snishop-erp",
    title: "SNISHOP ERP",
    url: "https://erp.snishop.com",
    kind: "product",
    featured: true,
    summary: "SNISHOP ERP, a smart business operating system.",
    built:
      "The site calls it a modern, all-in-one ERP platform for productivity and digital business management, for companies and individuals.",
  }),
  entry({
    slug: "todoit",
    title: "TODOIT",
    url: "https://todoit.snishop.com",
    kind: "product",
    summary: "A productivity platform for tasks, notes, and collaboration.",
    built:
      "The page calls TODOIT a next-generation productivity platform. It says the app combines tasks, notes, and collaboration in one AI-powered product, with an assistant for creating tasks, summarizing notes, and suggesting ideas, plus real-time collaboration in one workspace.",
  }),
  entry({
    slug: "keepitup",
    title: "KeepitUP",
    url: "https://keepitup.snishop.com",
    kind: "product",
    featured: true,
    summary:
      "A community app for runners, cyclists, hikers, and walkers.",
    built:
      "KeepitUP connects runners, cyclists, hikers, walkers, and other active people through the sports they do, on a mobile app and a website.",
  }),
  entry({
    slug: "bangunweb",
    title: "BangunWeb",
    url: "https://bangunweb.snishop.com",
    kind: "product",
    summary: "Website building for businesses and UMKM.",
    built:
      "BangunWeb by snishop.com describes a professional website service for businesses and UMKM. The page lists responsive layout, fast loading, free SSL, and mobile-friendly pages.",
  }),
  entry({
    slug: "sninonton",
    title: "sninonton",
    url: "https://sninonton.snishop.com",
    kind: "product",
    summary: "Netflix as pay-as-you-go.",
    built:
      "sninonton offers Netflix on a pay-as-you-go basis: pay for the time used, rather than a full monthly subscription. The page presents it as a service from sninonton.snishop.com.",
  }),
  entry({
    slug: "snidesain",
    title: "snidesain",
    url: "https://snidesain.snishop.com",
    kind: "product",
    summary: "Canva Pro as pay-as-you-go.",
    built:
      "snidesain, from snishop.com, offers Canva Pro pay-as-you-go so it can be used without a monthly subscription.",
  }),
  entry({
    slug: "snijadwalin",
    title: "SNIJadwalin",
    url: "https://snijadwalin.snishop.com",
    kind: "product",
    summary: "Zoom Meeting rental, pay-as-you-go.",
    built:
      "SNIJadwalin rents Zoom Meeting on a pay-as-you-go basis for meetings, webinars, and online classes.",
  }),
  entry({
    slug: "smm-pedia",
    title: "SMM Pedia",
    url: "https://smmpedia.snishop.com",
    kind: "product",
    summary: "An Indonesian social media marketing panel.",
    built:
      "The live page presents an SMM panel for social media management, from the snishop.com team. The working address is smmpedia.snishop.com.",
  }),
  entry({
    slug: "tangani",
    title: "Tangani",
    url: "https://tangani.snishop.com",
    kind: "product",
    summary: "Digital business transformation for businesses in Bengkulu.",
    built:
      "The page describes a combined offer for distributors and wholesale, healthcare, education, palm-oil and coffee plantations, and fleet logistics.",
  }),
  entry({
    slug: "rupiahin",
    title: "RupiahIN",
    url: "https://rupiahin.snishop.com",
    kind: "product",
    summary:
      "A competition-prep second brain that turns documents into modules and quizzes.",
    built:
      "The site calls RupiahIN an intelligent second brain for competition prep. It turns documents, photos, and links into interactive modules, quizzes, and structured notes.",
  }),
  entry({
    slug: "learnjoin",
    title: "LearnJoin",
    url: "https://learnjoin.com",
    kind: "client",
    featured: true,
    summary:
      "A learning ecosystem of tutoring and progress tracking. An Arabic version is at ar.learnjoin.com.",
    built:
      "LearnJoin describes an integrated ecosystem of tutoring and cognitive intelligence, combining real-time instruction with progress tracking. Both learnjoin.com and the Arabic site ar.learnjoin.com open on the login page.",
    also: [{ label: "Arabic", url: "https://ar.learnjoin.com" }],
  }),
  entry({
    slug: "belangua",
    title: "Belangua",
    url: "https://belangua.com",
    kind: "client",
    featured: true,
    summary:
      "Live and on-demand classes, plus a digital product marketplace.",
    built:
      "Belangua describes a learning platform that combines live and on-demand classes with a digital-product marketplace, AI for teachers and learners, and multi-tier membership.",
  }),
  entry({
    slug: "jamu-kito-internasional",
    title: "Jamu Kito Internasional",
    url: "https://jamukitointernasional.com",
    kind: "client",
    summary: "Jamu, spa, and herbal wellness.",
    built:
      "The site titles itself Jamu Kito Internasional. Its lines are “Jamu, Spa & Herbal Wellness” and “Your TRULY Solutions for Health & Wellness.”",
  }),
  entry({
    slug: "jamu-kito",
    title: "Jamu Kito",
    url: "https://jamukito.snishop.com",
    kind: "client",
    summary: "Herbal remedies and traditional massage in Bengkulu.",
    built:
      "The page headline is “Warisan Alam & Sentuhan Tradisi.” It describes certified, fully natural herbal remedies from Bengkulu and professional traditional massage with herbal oils.",
  }),
  entry({
    slug: "quinn-of-spicy",
    title: "Quinn of Spicy",
    url: "https://quinnsambal.com",
    kind: "client",
    featured: true,
    summary: "Quinn of Spicy, a sambal brand.",
    built: "",
  }),
  entry({
    slug: "hi-ameerah",
    title: "Hi Ameerah",
    url: "https://hiameerah.id",
    kind: "client",
    summary: "Hi Ameerah. “Enhance Your Beauty.”",
    built: "",
  }),
  entry({
    slug: "dw-store-mebel",
    title: "DW Store Mebel",
    url: "https://dwgroup.id",
    kind: "client",
    summary: "Custom kitchen sets and interiors in Bengkulu Tengah.",
    built:
      "DW Store Mebel (Halim Mebel Puri), in Bengkulu Tengah, specialises in custom kitchen sets, wardrobes, and premium interiors, with more than 10 years of experience and anti-termite material.",
  }),
];

export function isListed(entry) {
  return entry.confirmed !== false;
}

export function hasNarrative(item) {
  return [item.problem, item.role, item.built, item.outcome, item.summary].some(
    (value) => typeof value === "string" && value.trim().length > 0,
  );
}

export function isFeaturedCase(item) {
  return Boolean(item.featured) && isListed(item) && hasNarrative(item);
}

export function getWork(slug) {
  return work.find((item) => item.slug === slug);
}

export function displayHost(url) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function kindLabel(kind) {
  return workGroups.find((group) => group.id === kind)?.label ?? kind;
}

export function listedWork() {
  return work.filter(isListed);
}

export function featuredWork() {
  return listedWork()
    .filter(isFeaturedCase)
    .sort(
      (a, b) => featureOrder.indexOf(a.slug) - featureOrder.indexOf(b.slug),
    );
}
