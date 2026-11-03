/**
 * Facts already published on the portfolio, tightened for clarity.
 * Do not add metrics, awards, client counts, or dates that are not here.
 *
 * Unresolved, intentionally omitted:
 * - The older static site lists sirajnurihrom@gmail.com and +62 815-3216-8812.
 *   The React site lists the address and number below. They disagree, so only
 *   the React site's contact details are shown.
 * - The older static site claims "3 major awards", "4 companies founded",
 *   "6+ years" (while the prose says over 7), and "2000+ monthly transactions".
 *   The React site claims 99.9% uptime, 24+ apps, 50k monthly requests, and
 *   1.2M lines of code. None of those figures are used.
 * - "PT SNISHOP Network Indonesia" is the legal name given for this redesign.
 *   The previous site said SNISHOP.ID / SNISHOP.COM and did not print the PT name.
 * - Budgy AI, CoTrade.ID, and CryptoCurrent.id remain in the record from the
 *   previous site. On 3 Nov 2026 budgy.snishop.com, cotrade.id, and
 *   cryptocurrent.id did not resolve, so those three have no link.
 * - BMW funding is printed as stated. The initials are not expanded.
 */

export const siteUrl = (
  import.meta.env.VITE_SITE_URL || "https://sirajnurihrom.snishop.com"
).replace(/\/$/, "");

export const profile = {
  name: "Siraj Nur Ihrom",
  role: "Founder and chief executive",
  company: "PT SNISHOP Network Indonesia",
  location: "Bengkulu, Indonesia",
  timezone: "WIB, UTC+7",
  since: "2018",
  email: "sirajnurihrom11@gmail.com",
  phoneDisplay: "+62 851-8515-1356",
  phoneTel: "+6285185151356",
  resume: "/Siraj_Nur_Ihrom_Resume.pdf",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/sirajnurihrom" },
    { label: "Instagram", href: "https://instagram.com/sirajnurihrom" },
    { label: "GitHub", href: "https://github.com/SIRAJcrypto11" },
    { label: "SNISHOP", href: "https://snishop.com" },
  ],
};

export const about = {
  pull: "Committed to empowering SMEs and students through digital solutions.",
  paragraphs: [
    "I am an entrepreneur and technical leader with over seven years of experience engineering digital platforms, fintech services, and startups. Since 2018 I have led SNISHOP as founder and chief executive, first as an integrated platform for digital payments and products.",
    "The work covers system architecture, product development, project management, e-commerce, and business development, including raising support to grow the companies. I am committed to practical tools for SMEs and students.",
    "I am open to software architecture, SaaS development, and technical co-founder conversations.",
  ],
};

export const experienceLinks = {
  snishop: "https://snishop.com",
  erp: "https://erp.snishop.com",
  todoit: "https://todoit.snishop.com",
};

export const experienceIds = ["snishop", "erp", "todoit"];

export const archiveIds = ["budgy", "cotrade", "cryptocurrent"];

export const skills = [
  {
    title: "Leadership",
    items: [
      "Team management",
      "Project management",
      "Strategic planning",
      "Agile",
      "Product development",
      "Cross-functional leadership",
      "Conflict resolution",
      "Mentorship",
    ],
  },
  {
    title: "Engineering",
    items: [
      "Full-stack web development",
      "React",
      "NestJS and Node.js",
      "System architecture",
      "Cloud deployment, VPS, and Docker",
      "PostgreSQL and Redis",
      "Tailwind CSS",
    ],
  },
  {
    title: "Business",
    items: [
      "Startup development",
      "Market analysis",
      "Venture funding",
      "B2B SaaS",
      "Financial forecasting",
      "Performance measurement",
      "Product-led growth",
      "Customer acquisition",
    ],
  },
];
