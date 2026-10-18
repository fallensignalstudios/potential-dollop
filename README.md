# Sovereign Call

Phase 1 marketing site for [sovereigncall.com](https://sovereigncall.com). Static [Astro](https://astro.build) site, meant for Netlify Free. The live site stays on Vercel until Matthew approves a Netlify preview and the DNS cutover below.

Nothing in this repo changes DNS, the Netlify account, or the current site.

## Local development

Requires Node 22.

```bash
npm install
npm run dev
```

Dev server: `http://localhost:4321`.

```bash
npm run build          # writes dist/
npm run check:links    # internal links in dist/ must resolve
npm run preview        # serve the production build
```

`npm run images` re-downloads the novel cover and author portrait from the current site and regenerates the AVIF, WebP, JPEG, Open Graph card, and favicon set. The optimized files are already committed, so a normal build does not need this. The original 1.99 MB cover JPEG is not committed.

## Netlify

Hosting is Netlify Free (300 credits / month). Bandwidth is about 20 credits per GB and a production deploy is about 15 credits, so this site stays small on purpose: no self-hosted video, no press-kit zips in the repo, optimized images, subset fonts, and no JavaScript.

1. In Netlify, add a site from this Git repository. Pull requests get deploy previews. Do not attach the custom domain until a preview is approved.
2. Build settings are in `netlify.toml`. If the UI asks: build command `npm run build`, publish directory `dist`, Node 22.
3. Leave the production branch as whatever you merge (do not point Netlify at a force-push of `main` from this work).

`public/_redirects` is copied into the build:

- `https://www.sovereigncall.com/*` → `https://sovereigncall.com/:splat` (301)
- `/presskit` and `/press-kit` → `/press` (301)
- `/book.html` and the other page `.html` paths → the extensionless URL (301)

The www redirect only runs after www is pointed at Netlify. Until then, www still serves the current Vercel site.

## Kit email form

Matthew has not created the Kit account yet. The signup block is `src/components/SignupForm.astro`. It reads one value:

```ts
// src/config.ts
export const kitFormAction = "";
```

Paste either the numeric form id (`1234567`) or the full action URL from Kit’s HTML embed:

`https://app.kit.com/forms/1234567/subscriptions`

Until that value is set, the form renders and the submit button stays disabled.

In the Kit form settings, after the account exists:

- Turn on the confirmation email (double opt-in).
- Set **Redirect to another page** to `https://sovereigncall.com/thanks`. That redirect is stored in Kit, not in this repo. Signups land on `/thanks` only after Kit is told to send them there.
- The homepage form posts a hidden `fields[source]=source-home` and an optional `fields[first_name]`. Create a Kit custom field named `source` if you want that value stored. Tag the form `source-home`.

## Where the copy lives

Marketing copy is page copy v1 in `src/content/site.ts`. The novel page text that moved over from the current site is in `src/content/book.json` and should stay intact. Grep for `TODO(copy)` for every unfilled blank. Bracketed `[CONFIRM]` flags are also left visible and are not filled in.

### TODO(copy)

Visible on the site, all defined in `src/content/site.ts`:

- Email frequency in the homepage signup blurb.
- Press factsheet: release date (shown as “Coming soon” plus a blank), price, based in, languages, and socials.
- Press history: AI-use line, left out until it matches the Steam AI content disclosure.
- Press assets: logo pack, key art, screenshots, Steam capsule, trailer, novel cover, and developer photo. Each is an off-site `[LINK: TBD]`. Do not upload those files to Netlify.
- Privacy: site operator, analytics tool (the page also says none is configured), and cookies.
- Footer copyright holder.
- Whether the novel text needs its own copyright line under the pen name.
- Social URLs (TikTok, YouTube, X) and Discord. The candidate URLs are printed as text and are not links.

Also still open:

- `src/config.ts` Kit form action.
- Homepage hero still uses the novel cover. An HTML comment marks it for key art or a current Aurelion-build capture. Do not use the April 2026 demo.
- The homepage status section says footage on the site comes from the Aurelion build. There is no current-build footage yet.

## Pages

| Path | Role |
|---|---|
| `/` | Game-first landing from page copy v1. `id="game"` is the protagonists section. `id="book"`, `id="excerpt"`, and `id="author"` stay on this page and point at `/book`. |
| `/book` | The current novel page, unchanged in `book.json`, plus a short intro above the hero and author line Option A. |
| `/press` | Factsheet, short and long descriptions, history, off-site asset list, contact, and boilerplate. Awards and quotes are omitted until they exist. |
| `/privacy` | Outline for Matthew to replace with a generated policy. Review banner at the top. |
| `/thanks` | Confirm-your-inbox, plus a wishlist button. `noindex`, and left out of the sitemap. |
| `/404` | Branded, links home and to Steam. |

Wishlist links go to Steam app `4032180` with `utm_source=website&utm_medium=owned&utm_campaign=site` and a placement in `utm_content` (`hero`, `status`, `footer_cta`, `nav`, `book_intro`, `book_game`, `press`, `thanks`, `404`). There is no link to the legacy demo.

Author line, on `/` and `/book`:

> Michael Vaylin Keyes is the pen name of Matthew Snodgrass, the author of the Sovereign Call novels and solo developer of Sovereign Call: Origins.

Press email: fallensignalstudios@gmail.com.

## DNS cutover (Namecheap)

Do this only after a Netlify preview is approved. Keep the domain at Namecheap. Do not change the nameservers away from Namecheap.

The apex A record currently points at Vercel (`76.76.21.21`). Leave it there until cutover. Leave the Microsoft 365 mail records untouched the whole time:

- MX `sovereigncall-com.mail.protection.outlook.com`
- SPF, DKIM, and autodiscover records

Losing those breaks mail on the domain.

When Matthew approves the switch:

1. In Netlify, add `sovereigncall.com` as the primary domain and `www.sovereigncall.com` as a domain alias. Netlify will show the exact records to create. Copy those. Do not guess the load-balancer address from memory.
2. At Namecheap, for the apex, replace the Vercel A record with the apex record Netlify shows (an A record, or an ALIAS/ANAME if Namecheap offers it for this zone).
3. For `www`, add the CNAME Netlify shows, aimed at this site’s `*.netlify.app` hostname.
4. Do not edit the MX, SPF, DKIM, or autodiscover records while doing that.
5. Wait for HTTPS on both hostnames. Apex should be canonical. `www` should 301 to `https://sovereigncall.com`. Check `/presskit` and `/press-kit` land on `/press`.
6. Only then retire the Vercel project. Until that check passes, the current site stays up.

## Verification

Built with `npm run build` (Astro static, 6 pages, no JavaScript). `npm run check:links` resolved 92 internal references across `/`, `/book`, `/press`, `/privacy`, `/thanks`, and `/404`.

Local Lighthouse 12.8 against the production build of `/` (headless Chrome, lab, not field data), after page copy v1:

| | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Weight |
|---|---|---|---|---|---|---|---|---|---|
| Mobile | 100 | 100 | 100 | 100 | 1.1 s | 1.7 s | 0 ms | 0 | 150 KiB |
| Desktop | 100 | 100 | 100 | 100 | 0.3 s | 0.4 s | 0 ms | 0 | 127 KiB |

The previous homepage was about 2,228 KiB, most of it the 1.99 MB cover JPEG. The new cover is 22 KB AVIF at 800 px wide and 11 KB at 480 px wide. CSS is about 13 KB. Fonts are latin subsets of Geist and Cormorant Garamond (SIL Open Font License, notices in `public/fonts/`).

## Open questions

These match the blanks left visible in the copy. Do not fill them in the repo until Matthew decides.

1. Name companions (Lyessa, Tharne, Lyric) and weapons or abilities on the homepage? The page uses the no-names version.
2. Do “decisions change who stands with you” and the companion consequences hold for the full game?
3. Eclipse line: “older than either power,” or “ancient Remnant environments”?
4. Email frequency for the signup blurb.
5. Copyright holder: Matthew Snodgrass or Fallen Signal Studios? Does the novel text need its own line under the pen name?
6. Social URLs (TikTok, YouTube, X), and whether Discord appears. Candidate URLs are shown as text only.
7. Press factsheet: based in, languages, price, and the release-date wording beyond “Coming soon.”
8. AI-use line in the press history: include it in the Steam disclosure’s wording, or leave it out?
9. Ko-fi in the shared footer? It is left out. The `/book` game block still has the Ko-fi link that was already in `book.json`.
10. Privacy page is an outline. Replace it with a generated policy before go-live.
