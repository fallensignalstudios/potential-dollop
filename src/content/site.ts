/**
 * Marketing copy for the Phase 1 site (page copy v2, Matthew's decisions of Oct 19).
 * Novel excerpt, story, bio, tagline, and author quote live in `book.json` and stay as captured.
 * Grep for `TODO(copy)` for every unfilled [TBD].
 */
import book from "./book.json";

export const siteUrl = "https://sovereigncall.com";
export const siteName = "Sovereign Call: Origins";
export const studio = "Fallen Signal Studios";
export const developer = "Matthew Snodgrass";
export const author = "Michael Vaylin Keyes";
export const pressEmail = "fallensignalstudios@gmail.com";

export const authorLine =
  "Michael Vaylin Keyes is the pen name of Matthew Snodgrass, the author of the Sovereign Call novels and solo developer of Sovereign Call: Origins.";

export const headline =
  "Two soldiers. Two competing visions of order. One galaxy approaching collapse.";

/** Locked short description, Option A, as split in the copy draft. */
export const steamShort =
  "Sovereign Call: Origins is a cinematic single-player sci-fi action RPG of conquest, faith, loyalty and betrayal, with companions whose bonds carry consequences and skill-driven Echo combat.";

export const shortDescription = `${headline} ${steamShort}`;

export const statusChip = "In development · PC (Steam) · Coming soon";

export const amazonUrl = "https://www.amazon.com/dp/B0HDWRBZTT";

export const socials = [
  { label: "TikTok", href: "https://www.tiktok.com/@sovereigncall" },
  { label: "Instagram", href: "https://www.instagram.com/_sovereigncall_" },
] as const;

export const steamAppId = "4032180";
const steamStore =
  "https://store.steampowered.com/app/4032180/Sovereign_Call_Origins/";

export function steamUrl(content: string): string {
  const url = new URL(steamStore);
  url.searchParams.set("utm_source", "website");
  url.searchParams.set("utm_medium", "owned");
  url.searchParams.set("utm_campaign", "site");
  url.searchParams.set("utm_content", content);
  return url.toString();
}

export const images = {
  cover: {
    alt: book.coverAlt,
    width: 800,
    height: 1277,
    src: "/images/cover-800.webp",
    avif: "/images/cover-480.avif 480w, /images/cover-800.avif 800w",
    webp: "/images/cover-480.webp 480w, /images/cover-800.webp 800w",
    jpeg: "/images/cover-800.jpg",
  },
  portrait: {
    alt: book.portraitAlt,
    width: 1000,
    height: 750,
    src: "/images/portrait.webp",
    avif: "/images/portrait.avif",
  },
  ogHome: "/og/home.jpg",
  ogHomeAlt: "Sovereign Call emblem beside the title Sovereign Call: Origins.",
  ogBook: "/og/book.jpg",
  ogBookAlt: book.coverAlt,
};

export const bookPage = book;

export const home = {
  title: "Sovereign Call: Origins: Sci-Fi Action RPG | Wishlist on Steam",
  description:
    "Two soldiers. Two competing visions of order. One galaxy approaching collapse. A cinematic single-player sci-fi action RPG in development. Wishlist on Steam.",
  ogTitle: "Sovereign Call: Origins",
  ogDescription:
    "Two soldiers. Two competing visions of order. One galaxy approaching collapse. Wishlist the cinematic single-player sci-fi action RPG on Steam.",
  hero: {
    eyebrow: "A cinematic single-player sci-fi action RPG",
    h1: "Sovereign Call: Origins",
    headline,
    sub: steamShort,
    status: statusChip,
    primary: "Wishlist on Steam",
    secondary: "Get development updates",
  },
  protagonists: {
    title: "Play both sides of the war",
    intro:
      "Tarrik Walcur and Selene Veyne fight on opposite sides of the same conflict. You play both of them, one at a time, as their stories cross.",
    tarrikName: "Tarrik Walcur, the Dominion",
    tarrik: "Tarrik fights for the imperial Dominion, an empire of bronze, oxblood and amber.",
    seleneName: "Selene Veyne, the Reformation",
    selene:
      "Selene fights for the technologically advanced Reformation, a world of navy, slate and blue-white precision.",
  },
  combat: {
    title: "Skill-driven combat",
    body: "Each protagonist fights their own way. Tarrik guards and counters; Selene relies on precision and deflection. Both carry firearms and abilities of their own. Combat is built around Echo, the game's signature resource, with classes, specializations and progression without grind.",
  },
  companions: {
    title: "Companions and consequences",
    body: "Fight alongside companions on each side of the war: Lyessa with Tarrik, and Tharne and Lyric with Selene. Relationships carry consequences, and decisions change who stands with you.",
  },
  eclipse: {
    title: "The Eclipse",
    body: "Beneath the war, an organic horror spreads its violet corruption. The Eclipse threatens Dominion and Reformation alike, in ancient environments older than either power.",
  },
  novel: {
    title: "Adapted from the novel",
    body: "Sovereign Call is an original universe adapted from the novels of Michael Vaylin Keyes. Four novels have been developed, and Origins alone runs to roughly 196,000 words.",
    read: "Read Chapter One",
    amazon: "Buy the novel on Amazon",
  },
  status: {
    title: "Where development stands",
    body: "Sovereign Call: Origins is in active development. We're currently building the Aurelion mission, where Tarrik and Selene fight toward the same locked door from opposite sides of a war. There's no gameplay footage on this site yet. As parts of the current build are ready, we'll share images from it here first. Nothing on this site comes from the old demo.",
    demo: "The demo released in April 2026 is an early prototype from an earlier iteration of the game and is not representative of the current game.",
    cta: "Wishlist on Steam",
  },
  email: {
    title: "Get development updates",
    blurb:
      "Follow the build of Sovereign Call: Origins: progress on the Aurelion mission, new footage, and news when playtests open. We'll email you about once a month, and you can unsubscribe anytime.",
    label: "Email address",
    firstName: "First name (optional)",
    submit: "Sign up",
    finePrint:
      "By signing up you agree to receive email updates about Sovereign Call. We use Kit to send them. See our",
    privacyLabel: "Privacy Policy",
    pending:
      "TODO: Kit form id is not connected yet. Signup opens when the action is pasted into src/config.ts.",
    source: "source-home",
  },
  closing: {
    line: "Two soldiers. One war. Wishlist Sovereign Call: Origins.",
    cta: "Wishlist on Steam",
  },
};

export const bookIntro = {
  body: "The world of this novel is the foundation of Sovereign Call: Origins, a cinematic single-player sci-fi action RPG in development.",
  cta: "Wishlist it on Steam",
};

export const bookMeta = {
  title: book.metaTitle,
  description: book.metaDescription,
  ogTitle: book.ogTitle,
  ogDescription: book.ogDescription,
};

export const press = {
  title: "Press Kit | Sovereign Call: Origins",
  description:
    "Factsheet, descriptions, logos, art and contact for Sovereign Call: Origins, a cinematic single-player sci-fi action RPG by Fallen Signal Studios.",
  ogTitle: "Sovereign Call: Origins Press Kit",
  ogDescription: "Factsheet, descriptions, assets and press contact for Sovereign Call: Origins.",
  h1: "Sovereign Call: Origins Press Kit",
  intro: "Everything you need to cover Sovereign Call: Origins. For keys, interviews or questions, email fallensignalstudios@gmail.com.",
  factsheet: {
    heading: "Factsheet",
    rows: [
      { term: "Title", value: "Sovereign Call: Origins" },
      { term: "Developer", value: "Fallen Signal Studios (independent, founder-led)" },
      { term: "Founder / solo developer", value: "Matthew Snodgrass" },
      { term: "Novel author", value: "Michael Vaylin Keyes (pen name of Matthew Snodgrass)" },
      { term: "Genre", value: "Cinematic single-player third-person sci-fi action RPG" },
      { term: "Engine", value: "Unreal Engine 5" },
      { term: "Platform", value: "PC (Steam)" },
      { term: "Steam", value: "steam" },
      { term: "Release date", value: "Coming soon", todo: "TODO(copy): [TBD]" },
      { term: "Price", value: "", todo: "TODO(copy): [TBD]" },
      { term: "Based in", value: "", todo: "TODO(copy): [TBD]" },
      { term: "Languages", value: "", todo: "TODO(copy): [TBD]" },
      { term: "Website", value: "website" },
      { term: "Press contact", value: "email" },
      { term: "Legal entity", value: "Fallen Signal Studios LLC" },
      { term: "Socials", value: "socials" },
    ],
  },
  short: {
    heading: "Short description",
    body: shortDescription,
  },
  long: {
    heading: "Description",
    paragraphs: [
      "Sovereign Call: Origins is a cinematic, single-player, third-person sci-fi action RPG in development in Unreal Engine 5: a story of political conflict, conquest, faith, loyalty and betrayal, and of the moral cost of power.",
      "Tarrik Walcur fights for the imperial Dominion, an empire of bronze, oxblood and amber. Selene Veyne fights for the technologically advanced Reformation, a world of navy, slate and blue-white precision. Players control both of them, one at a time, as their stories cross on opposite sides of the same conflict.",
      "Each protagonist fights their own way: Tarrik guards and counters; Selene relies on precision and deflection. Combat is built around Echo, the game's signature resource, with classes, specializations and progression without grind. Lyessa fights alongside Tarrik; Tharne and Lyric fight alongside Selene. Relationships carry consequences, and decisions change who stands with you. Beneath the war, an organic horror called the Eclipse spreads its violet corruption, threatening Dominion and Reformation alike.",
      "Sovereign Call is an original IP adapted from the novels of Michael Vaylin Keyes, the pen name of developer Matthew Snodgrass. Four novels have been developed, and Origins alone runs to roughly 196,000 words.",
      "The game is in active development. Current work focuses on the Aurelion mission. The demo released in April 2026 is an early prototype from an earlier iteration and is not representative of the current game.",
    ],
  },
  history: {
    heading: "Development history",
    body: "Sovereign Call began as a novel. Matthew Snodgrass, writing as Michael Vaylin Keyes, developed the universe across four novels before adapting the first, Origins, into a game. He is building it as a solo, founder-led project in Unreal Engine 5, using his own Unreal tools: Cinemafy (cinematography), Holofy (hologram shader), Icify (procedural ice), Grungify (procedural grunge) and an Unreal MCP toolset.",
  },
  assets: {
    heading: "Assets",
    emblem: {
      png: "/press/emblem.png",
      svg: "/press/emblem.svg",
      pngLabel: "Sovereign Call emblem, PNG",
      svgLabel: "Sovereign Call emblem, SVG",
    },
    note: "Please don't use footage or screenshots from the April 2026 demo; it's an early prototype and not representative of the current game.",
    items: [
      "Logo pack (PNG transparent + SVG, light/dark). TODO(copy): [LINK: off-site host, TBD]",
      "Key art (no text, plus a version with the logo). TODO(copy): [LINK: TBD]",
      "Screenshots (current Aurelion build only, 1920×1080+). TODO(copy): [LINK: TBD. Available once captured]",
      "Steam capsule art. TODO(copy): [LINK: TBD]",
      "Trailer (downloadable MP4). TODO(copy): [LINK: TBD. Once a current-build trailer exists]",
      "Novel cover. TODO(copy): [LINK: TBD]",
      "Developer photo. TODO(copy): [LINK: TBD. Only if Matthew wants one public]",
    ],
  },
  contact: {
    heading: "Contact",
    body: "Press, creators, festivals and publishers:",
  },
  boilerplate: {
    heading: "Boilerplate",
    body: "Fallen Signal Studios LLC is the independent, founder-led studio of Matthew Snodgrass, who writes the Sovereign Call novels as Michael Vaylin Keyes. Its first game, Sovereign Call: Origins, is a cinematic single-player sci-fi action RPG in development in Unreal Engine 5 for PC (Steam). Learn more at sovereigncall.com. © 2026 Fallen Signal Studios LLC.",
  },
};

export const privacy = {
  title: "Privacy Policy | Sovereign Call: Origins",
  description: "How sovereigncall.com handles email sign-ups and site data.",
  ogTitle: "Privacy Policy: Sovereign Call: Origins",
  ogDescription: "How sovereigncall.com handles email sign-ups and site data.",
  h1: "Privacy Policy",
  updated: "Last updated: October 19, 2026",
  review:
    "Not legal advice. Matthew should generate the final text with a reputable privacy-policy generator, or have it reviewed, and must make sure it matches how Kit, Netlify and any analytics are actually configured.",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        "Site operator: Fallen Signal Studios LLC.",
        "Contact: fallensignalstudios@gmail.com.",
      ],
    },
    {
      heading: "What we collect",
      paragraphs: [
        "Email sign-up: email address and optional first name, given voluntarily.",
        "Hosting logs: Netlify may process technical data (for example IP address and browser) to serve and secure the site.",
      ],
      todo: "TODO(copy): [TBD: name the tool if one is added. Otherwise say none]",
      analytics: "Analytics: none is configured on this site.",
    },
    {
      heading: "Why",
      paragraphs: [
        "To send the development updates you asked for, and to run and secure the site.",
      ],
    },
    {
      heading: "Email provider",
      paragraphs: [
        "Sign-ups are stored and sent by Kit, our email provider. The form is meant to be double opt-in.",
      ],
    },
    {
      heading: "Legal basis / consent",
      paragraphs: [
        "For visitors in the EU/UK and similar regions, the basis is consent, and you can withdraw it anytime.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        "Every email includes an unsubscribe link. You can request access or deletion via fallensignalstudios@gmail.com.",
      ],
    },
    {
      heading: "Retention",
      paragraphs: ["Kept until you unsubscribe or ask for deletion."],
    },
    {
      heading: "Cookies",
      paragraphs: [],
      todo: "TODO(copy): [TBD: state whether the site or embeds (Kit form, YouTube) set cookies]",
    },
    {
      heading: "Third-party links",
      paragraphs: ["Steam, Amazon, and social platforms have their own policies."],
    },
    {
      heading: "Children",
      paragraphs: ["This site is not directed at children."],
    },
    {
      heading: "Changes",
      paragraphs: ["We'll update this page and its date."],
    },
    {
      heading: "Contact",
      paragraphs: ["fallensignalstudios@gmail.com"],
    },
  ],
};

export const thanks = {
  title: "Check your inbox | Sovereign Call: Origins",
  description: "Confirm your email to start getting Sovereign Call development updates.",
  h1: "Almost there: check your inbox.",
  body: "Confirm your email to start getting Sovereign Call development updates.",
  cta: "Wishlist on Steam",
};

export const notFound = {
  title: "Page not found — Sovereign Call",
  description: "This page is not on sovereigncall.com.",
  h1: "404",
  body: "This page is not on the site.",
  home: "Back to the game",
  steam: "Wishlist on Steam",
};

export const footer = {
  name: "Sovereign Call: Origins",
  contactLabel: "Contact",
  rights: "© 2026 Fallen Signal Studios LLC. All rights reserved.",
  socials,
};

export const nav = {
  game: "The Game",
  novel: "The Book",
  press: "Press",
  privacy: "Privacy",
  wishlist: "Wishlist on Steam",
};
