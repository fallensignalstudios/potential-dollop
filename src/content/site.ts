/**
 * All marketing copy for the Phase 1 site.
 * Swap homepage, press, privacy, thanks, and 404 lines here.
 * The novel page text is the migrated chapter in `book.json`, re-exported below.
 * Grep for `TODO(copy)` before replacing a section.
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

/** Second sentence of the locked Steam short description (Option A). */
export const steamShort =
  "A cinematic single-player sci-fi action RPG of conquest, faith, loyalty and betrayal, with companions whose bonds carry consequences and skill-driven Echo combat.";

export const headline =
  "Two soldiers. Two competing visions of order. One galaxy approaching collapse.";

export const statusChip = "In development · PC (Steam) · Coming soon";

export const amazonUrl = "https://www.amazon.com/dp/B0HDWRBZTT";
export const kofiUrl = "https://ko-fi.com/sovereigncallorigins";

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
  ogHomeAlt: "Sovereign Call: Origins. Two armored figures, black and gold. In development for PC on Steam.",
  ogBook: "/og/book.jpg",
  ogBookAlt: book.coverAlt,
};

export const bookPage = book;

export const home = {
  title: "Sovereign Call: Origins — A sci-fi action RPG",
  description: steamShort,
  hero: {
    h1: "Sovereign Call: Origins",
    headline,
    sub: steamShort,
    status: statusChip,
    primary: "Wishlist on Steam",
    secondary: "Get dev updates",
  },
  gameplay: {
    eyebrow: "Gameplay",
    title: "First gameplay is coming.",
    body: "Get dev updates to see it first.",
    link: "Get dev updates",
  },
  protagonists: {
    placeholder: "TODO(copy)",
    eyebrow: "Two protagonists, two sides",
    title: "Two protagonists, two sides",
    tarrikName: "Tarrik Walcur",
    tarrik: "Dominion, bronze and red.",
    seleneName: "Selene Veyne",
    selene: "Reformation, blue-gray tech.",
    threat: "Both are playable. The threat is the Eclipse.",
  },
  combat: {
    placeholder: "TODO(copy)",
    eyebrow: "Combat and companions",
    title: "Echo",
    body: "Skill-driven Echo combat. Companions whose bonds carry consequences.",
  },
  novel: {
    placeholder: "TODO(copy)",
    eyebrow: "Adapted from the novel",
    title: "Adapted from the novel",
    lines: [book.tagline, book.storyDeck],
    read: "Read Chapter One",
    amazon: "Buy on Amazon",
  },
  email: {
    eyebrow: "Dev updates",
    title: "Get dev updates and playtest news.",
    cadence: "One or two emails a month, no spam.",
    label: "Email address",
    submit: "Get dev updates",
    pending:
      "TODO: Kit form id is not connected yet. Signup opens when the action is pasted into src/config.ts.",
  },
  closing: {
    eyebrow: "Wishlist",
    titleLead: "Sovereign Call:",
    titleEm: "Origins",
    line: headline,
    cta: "Wishlist on Steam",
  },
};

export const press = {
  title: "Press kit — Sovereign Call: Origins",
  description:
    "Factsheet, description, and assets for Sovereign Call: Origins, a PC sci-fi action RPG in development from Fallen Signal Studios.",
  summary: {
    heading: "Description",
    short: steamShort,
    paragraph: "TODO(copy): One-paragraph description.",
  },
  eyebrow: "Press kit",
  h1: "Sovereign Call: Origins",
  intro: statusChip,
  factsheet: {
    heading: "Factsheet",
    developer: "Fallen Signal Studios (Matthew Snodgrass, solo)",
    basedIn: "TODO(copy): [CONFIRM] Based in.",
    release: "TBA / Coming soon",
    platform: "PC (Steam)",
    price: "TBA",
    website: siteUrl,
    pressContact: pressEmail,
  },
  history: {
    heading: "History",
    body: "Sovereign Call: Origins began as a novel and is being built solo in Unreal Engine 5 with Cinemafy, Holofy, Icify, Grungify, and the Unreal MCP toolset.",
    ai: "TODO(copy): Use the same AI-use wording as the Steam AI content disclosure.",
  },
  features: {
    heading: "Features",
    placeholder: "TODO(copy)",
    items: [
      "Two playable protagonists: Tarrik Walcur and Selene Veyne.",
      "Adapted from the novel Sovereign Call: Origins.",
      "Companions whose bonds carry consequences.",
      "Skill-driven Echo combat.",
      "Progression without grind.",
      "A distinctive visual identity.",
    ],
  },
  videos: {
    heading: "Videos",
    placeholder:
      "TODO(copy): YouTube trailer embed. No trailer URL yet. Do not self-host video on Netlify.",
  },
  images: {
    heading: "Images",
    note: "TODO(copy): Current-build screenshots, capsule art, and game key art are not in hand. The file below is the novel cover already on the site.",
    coverLabel: "Novel cover (WebP)",
    coverJpegLabel: "Novel cover (JPEG)",
    zipLabel: "Press kit zip (off-site placeholder)",
    zipNote:
      "TODO: Off-site press-kit zip (screenshots, key art, capsule). Host it on Google Drive or itch.io, not on Netlify. The URL is not set.",
  },
  logo: {
    heading: "Logo and icon",
    note: "TODO(copy): Placeholder monogram only. Not a final studio or game logo.",
    dark: "Monogram, dark backgrounds (SVG)",
    darkPng: "Monogram, dark backgrounds (PNG)",
    light: "Monogram, light backgrounds (SVG)",
    lightPng: "Monogram, light backgrounds (PNG)",
  },
  coverage: {
    heading: "Selected articles and awards",
    empty: "None yet.",
  },
  quotes: {
    heading: "Quotes",
    empty: "None yet.",
  },
  team: {
    heading: "Team",
  },
  demo: {
    heading: "Legacy demo",
    note: "The April 2026 demo is an early prototype and is not representative of the current game.",
  },
  contact: {
    heading: "Contact",
  },
};

export const privacy = {
  title: "Privacy — Sovereign Call",
  description:
    "What the Sovereign Call website collects through its Kit email form, and how to unsubscribe.",
  h1: "Privacy",
  review:
    "Draft for Matthew Snodgrass to review before this site goes live. Not a finished legal policy.",
};

export const thanks = {
  title: "Check your inbox — Sovereign Call",
  description: "Confirm your Sovereign Call dev-update subscription, then wishlist the game on Steam.",
  eyebrow: "Subscription",
  h1: "Check your inbox to confirm.",
  body: "Open the confirmation email and confirm your subscription. If it is not in your inbox, look in spam.",
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
  rights: "© 2026 Matthew Snodgrass. All rights reserved.",
  back: "Back to top",
  kofi: "Support on Ko-fi",
  kofiNote: book.kofiNote,
};

export const nav = {
  game: "Game",
  novel: "Novel",
  press: "Press",
  updates: "Updates",
  privacy: "Privacy",
  wishlist: "Wishlist",
};
