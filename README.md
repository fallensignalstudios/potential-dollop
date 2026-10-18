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
- Tag submissions `website`. The form also posts `fields[source]=website`. Create a Kit custom field named `source` if you want that value stored.

## Where the copy lives

Marketing copy is in `src/content/site.ts`. The novel page text that moved over from the current site is in `src/content/book.json` and should stay intact. Grep for `TODO(copy)` before swapping a section.

### TODO(copy)

Visible on the site, all defined in `src/content/site.ts`:

- Homepage, two protagonists: fact stub, final prose not written.
- Homepage, Echo / companions: fact stub.
- Homepage, “Adapted from the novel”: the two lines are the novel’s existing tagline and deck, marked for replacement.
- Press, based in: `[CONFIRM]`.
- Press, one-paragraph description.
- Press, AI-use sentence. It must match the Steam AI content disclosure. That wording is not in the source material, so it is not invented here.
- Press, feature bullets: the brief’s six themes, wording not final.
- Press, YouTube trailer embed. No trailer URL yet. Do not upload video to Netlify.
- Press, current-build screenshots, capsule art, and game key art.
- Press, logo: the monogram is a placeholder, not a final mark.

Also still open, not all of them copy:

- `src/config.ts` Kit form action.
- Press-kit zip URL. The `/press` page links to an on-page note. Host the zip on Google Drive or itch.io.
- Footer copyright: personal name vs a Fallen Signal Studios entity.
- TikTok, YouTube, and X. They were not linked on the captured site, so they are not in the footer.
- Discord stays off the site until a non-expiring invite exists.
- Homepage hero still uses the novel cover. Replace it with current-build key art when a capture exists. Do not use the legacy demo.

## Pages

| Path | Role |
|---|---|
| `/` | Game-first landing. `id="book"` and `id="excerpt"` are stubs that link to `/book`, so old `/#book` and `/#excerpt` URLs still land somewhere. |
| `/book` | The current novel page: hero, story, Chapter One, Amazon, author bio, plus author line Option A. |
| `/press` | presskit()-style factsheet. Articles, awards, and quotes are empty on purpose. |
| `/privacy` | Kit, what is collected, how to unsubscribe. Draft banner for Matthew’s review. |
| `/thanks` | Confirm-your-inbox, plus a wishlist button. |
| `/404` | Branded, links home and to Steam. |

Wishlist links go to Steam app `4032180` with `utm_source=website&utm_medium=owned&utm_campaign=site` and a placement in `utm_content` (`hero`, `nav`, `footer_cta`, `book_game`, `press`, `thanks`, `404`). There is no link to the legacy demo.

Author line, on `/`, `/book`, and `/press`:

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

Built with `npm run build` (Astro static, 6 pages, no JavaScript). `npm run check:links` resolved 99 internal references across `/`, `/book`, `/press`, `/privacy`, `/thanks`, and `/404`.

Local Lighthouse 12 against the production build (headless Chrome, lab, not field data):

| | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Weight |
|---|---|---|---|---|---|---|---|---|---|
| Mobile | 100 | 100 | 100 | 100 | 1.1 s | 1.7 s | 0 ms | 0 | 149 KiB |
| Desktop | 100 | 100 | 100 | 100 | 0.3 s | 0.4 s | 0 ms | 0 | 127 KiB |

The previous homepage was about 2,228 KiB, most of it the 1.99 MB cover JPEG. The new cover is 22 KB AVIF at 800 px wide and 11 KB at 480 px wide. CSS is about 13 KB. Fonts are latin subsets of Geist and Cormorant Garamond (SIL Open Font License, notices in `public/fonts/`).

## Open questions

1. Kit account owner, sender name, and sender address. Is “one or two emails a month” the cadence to keep?
2. Based-in location for the press factsheet.
3. Footer copyright: Matthew Snodgrass, or a Fallen Signal Studios legal entity?
4. The Steam short description’s first sentence. The site uses the second sentence that was in the spec.
5. Steam AI disclosure wording, for the press history section.
6. YouTube trailer URL, current-build key art, and screenshots.
7. Where the press-kit zip should live (Google Drive or itch.io).
8. TikTok, YouTube, and X profile URLs. Discord invite, only if it does not expire.
9. Ko-fi is included because the current site links it. Confirm the stale GDC goal is fixed before launch.
10. Privacy page needs Matthew’s review before go-live.
