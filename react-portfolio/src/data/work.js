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
      "SNISHOP Network Indonesia. Autonomous SaaS and industry-standard enterprise customization: solusi SaaS otonom & kustomisasi enterprise berstandar industri.",
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
      "One shop for Turnitin checks, UMKM ebooks, and premium accounts. Digital-marketing ebooks, AI prompts, and social and WhatsApp templates from Rp10,000, plus Turnitin checks, Canva Pro, and Zoom Pro. Payment is by QRIS, with instant download. The catalog includes 70+ UMKM digital-marketing ebooks.",
  }),
  entry({
    slug: "snishop-erp",
    title: "SNISHOP ERP",
    url: "https://erp.snishop.com",
    kind: "product",
    featured: true,
    summary: "A smart business operating system.",
    built:
      "An all-in-one ERP for productivity and digital business management, for companies and individuals.",
  }),
  entry({
    slug: "todoit",
    title: "TODOIT",
    url: "https://todoit.snishop.com",
    kind: "product",
    summary: "A productivity platform for tasks, notes, and collaboration.",
    built:
      "A next-generation productivity platform. Tasks, notes, and collaboration in one AI-powered app, with an assistant for creating tasks, summarizing notes, and suggesting ideas, and real-time collaboration in one workspace.",
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
    image: "/work/bangunweb.webp",
    imageMobile: "/work/bangunweb-mobile.webp",
    summary: "BangunWeb by SNISHOP. Websites for businesses and UMKM, starting with a consultation.",
    built:
      "Builds company-profile, online-store, school, and custom websites. Cost and schedule are set after the consultation.",
  }),
  entry({
    slug: "sninonton",
    title: "SNINonton",
    url: "https://sninonton.snishop.com",
    kind: "product",
    image: "/work/sninonton.webp",
    imageMobile: "/work/sninonton-mobile.webp",
    summary: "SNINonton by SNISHOP. Netflix Premium subscription, Rp89.000 a month.",
    built:
      "Order Netflix Premium for 1 month on app.snishop.com. A SNISHOP admin sends the access details on WhatsApp.",
  }),
  entry({
    slug: "snidesain",
    title: "SNIDesain",
    url: "https://snidesain.snishop.com",
    kind: "product",
    image: "/work/snidesain.webp",
    imageMobile: "/work/snidesain-mobile.webp",
    summary: "SNIDesain by SNISHOP. Canva Pro for your own account, from Rp25.500 a month.",
    built:
      "Turns on Canva Pro for the email of your own Canva account. Designs stay in your account. Choose 1 month or 1 year.",
  }),
  entry({
    slug: "snijadwalin",
    title: "SNIJadwalin",
    url: "https://snijadwalin.snishop.com",
    kind: "product",
    image: "/work/snijadwalin.webp",
    imageMobile: "/work/snijadwalin-mobile.webp",
    summary: "SNIJadwalin by SNISHOP. Premium Zoom rental, paid by duration.",
    built:
      "Rents Zoom Pro for meetings, online classes, and webinars, with no 40-minute limit and no monthly subscription.",
  }),
  entry({
    slug: "smm-pedia",
    title: "SMM Pedia",
    url: "https://smmpedia.snishop.com",
    kind: "product",
    summary: "An Indonesian social media marketing panel.",
    built:
      "A social media marketing panel from the SNISHOP team.",
  }),
  entry({
    slug: "tangani",
    title: "Tangani",
    url: "https://tangani.snishop.com",
    kind: "product",
    summary: "Digital business transformation for businesses in Bengkulu.",
    built:
      "For distributors and wholesale, healthcare, education, palm-oil and coffee plantations, and fleet logistics.",
  }),
  entry({
    slug: "rupiahin",
    title: "RupiahIN",
    url: "https://rupiahin.snishop.com",
    kind: "product",
    summary:
      "A competition-prep second brain that turns documents into modules and quizzes.",
    built:
      "Turns documents, photos, and links into interactive modules, quizzes, and structured notes.",
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
      "An integrated ecosystem of tutoring and cognitive intelligence, with real-time instruction and progress tracking. learnjoin.com and the Arabic site open on the login page.",
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
      "A learning platform with live and on-demand classes, a digital-product marketplace, AI for teachers and learners, and multi-tier membership.",
  }),
  entry({
    slug: "jamu-kito-internasional",
    title: "Jamu Kito Internasional",
    url: "https://jamukitointernasional.com",
    kind: "client",
    summary: "Jamu, spa, and herbal wellness.",
    built:
      "Jamu, spa, and herbal wellness. Your TRULY Solutions for Health & Wellness.",
  }),
  entry({
    slug: "jamu-kito",
    title: "Jamu Kito",
    url: "https://jamukito.snishop.com",
    kind: "client",
    summary: "Herbal remedies and traditional massage in Bengkulu.",
    built:
      "Warisan Alam & Sentuhan Tradisi. Certified, fully natural herbal remedies from Bengkulu, and professional traditional massage with herbal oils.",
  }),
  entry({
    slug: "quinn-of-spicy",
    title: "Quinn of Spicy",
    url: "https://quinnsambal.com",
    kind: "client",
    featured: true,
    summary: "A sambal brand.",
    built: "",
  }),
  entry({
    slug: "hi-ameerah",
    title: "Hi Ameerah",
    url: "https://hiameerah.id",
    kind: "client",
    summary: "Enhance Your Beauty.",
    built: "",
  }),
  entry({
    slug: "dw-store-mebel",
    title: "DW Store Mebel",
    url: "https://dwgroup.id",
    kind: "client",
    summary: "Custom kitchen sets and interiors in Bengkulu Tengah.",
    built:
      "Halim Mebel Puri in Bengkulu Tengah. Custom kitchen sets, wardrobes, and premium interiors, with more than 10 years of experience and anti-termite material.",
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
