# Fitback teaser: "Scene" → Fitback reveal

**Scene** is a made-up global event-discovery platform, in Arabic and laid out right to left. It lists real, upcoming music, cinema, art, sports and entertainment events, and its featured event is **SWE 444 – Software Engineering Fair** at King Saud University. The fair's "احجزي الآن" button is broken on purpose. When the visitor taps customer support, the site fades out and four glossy 3D puzzle pieces snap together into the official **Fitback** logo. Then the fair invitation appears.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and Framer Motion. It's frontend only: no backend, no payments, no logins, and it collects no personal data.

---

## Run it locally

You need **Node.js 20.9 or newer**.

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build (the same build Vercel runs):

```bash
npm run build && npm start
```

To test on your phone, use the same Wi‑Fi and open `http://<your-computer-ip>:3000`.

---

## What to edit

| What | File |
| --- | --- |
| Fair title, date, time, location (booking site **and** reveal) | `config/fitback.ts` → `fair` |
| Reveal text (Arabic), share text, share link | `config/fitback.ts` → `copy`, `share` |
| Fitback colours and logo | `config/fitback.ts` → `colors`, `logo` |
| Scene name, demo notice, palette | `config/site.ts` |
| Events, dates, descriptions, photos | `data/events.ts` |
| Link preview image / favicon | `public/og.png`, `app/icon.svg`, `app/apple-icon.png`, `app/favicon.ico` |

Current fair details: **Tuesday, December 1, 2026 · 11:00 AM – 1:00 PM · College of Computer and Information Sciences Lobby, King Saud University** (بهو كلية علوم الحاسب والمعلومات، جامعة الملك سعود).

---

## Events and how they were checked

Dates were checked on **27 November 2026** against official announcements and major news outlets. Events re-check themselves while the page is open: anything that has ended disappears, and anything on now or starting within 14 days is labelled "جارية الآن" or "قريباً جداً".

| Event | Dates | Checked against |
| --- | --- | --- |
| SWE 444 – Software Engineering Fair | 1 Dec 2026 | Your team |
| F1 Abu Dhabi Grand Prix (2026 finale) | 3–6 Dec 2026 | Formula 1 / Abu Dhabi Media Office, via Khaleej Times & Gulf News |
| Art Basel Miami Beach | 4–6 Dec 2026 (public days) | artbasel.com |
| Riyadh Season 2026 | From 21 Oct 2026, 10 weeks | Saudi Gazette, Gulf News, Arab News |
| Boulevard World | Open during Riyadh Season 2026 | Gulf News, GCC Business News |
| F1 Saudi Arabian Grand Prix | 19–21 Mar 2027 | 2027 F1 calendar, via Khaleej Times |
| Coachella 2027 | 9–11 & 16–18 Apr 2027 | Coachella announcement, via Khaleej Times, FOX LA, Pollstar |
| Festival de Cannes (80th) | 11–22 May 2027 | festival-cannes.com |
| Oasis Live '27 | Starts 21 May 2027, Glasgow | NME, Loudwire, ITV |
| Taylor Swift | **No tour announced** | Shown only as "على الرادار" (on the radar), never as an upcoming concert. The Eras Tour ended in December 2024. |

Left out on purpose: the **Red Sea International Film Festival** (its December 2026 edition was postponed to late 2027) and **MDLBEAST Soundstorm 2026** (cancelled).

Scene does **not** show prices or sell tickets for real events. Their sheets say that booking goes through the official organiser, and point the visitor back to SWE 444.

---

## Photos

- Every event photo is real photography from **Wikimedia Commons** under a free licence (CC0, CC BY 2.0, CC BY‑SA 2.0 or CC BY‑SA 4.0).
- Each photo's author and licence appear under the photo in its event sheet, and in **"حقوق الصور"** in the footer, with a link to the original file.
- Photos of people's faces were avoided. Taylor Swift's card uses a general stadium‑concert crowd shot, not a photo of her.
- By default, photos load from Wikimedia's image CDN. If one can't load, the page tries Commons' redirect link, then shows a plain colour tile.

**To host the photos yourself** (recommended before launch):

```bash
npm run photos        # downloads them into public/photos/
```

Then set `photos: "local"` in `config/site.ts`. If you swap a photo, update its `file`, `hash` and credit in `data/events.ts`. The `hash` is the `x/xy` part of the file's `upload.wikimedia.org` address.

---

## How the experience works

1. **Browse Scene.** Search, the city filter, category chips (موسيقى، سينما، فنون، رياضة، ترفيه، جامعات), "this week", the on-the-radar card with a Follow toggle, the event sheets and the photo credits all work.
2. **"احجزي الآن" on SWE 444**, from the banner or its sheet: a short spinner, then an error.
3. **2nd try.** It fails again. The support button starts glowing and shows **"تحتاجين مساعدة؟"**. The error now has a "كلمي الدعم" button. Support is on screen at all times.
4. **Support.** Scene fades out and four 3D pieces in the logo's colours fly in and snap together one at a time. The last one lands at its tilt from the logo. The real Fitback logo then takes over, and the copy and fair invitation appear (about 2.5s in total).

**Reduced motion.** If the phone has "reduce motion" turned on, the pieces fade in already assembled and everything else uses simple fades.

**No spoilers.** The page title, link preview, favicon and first page load never mention Fitback. The reveal code and logo download in the background after the first failed booking.

---

## Deploy to Vercel (when you're ready)

1. Push this folder to a GitHub repository (private is fine).
2. Go to https://vercel.com/new, sign in with GitHub, **Import** the repository, keep the defaults, and click **Deploy**.
3. You'll get a public `https://<project>.vercel.app` link that anyone can open without signing in. Every push to `main` updates that same link.
4. After the first deploy, set `share.url` in `config/fitback.ts` to the live link. For a custom domain, also set `NEXT_PUBLIC_SITE_URL` in Vercel's environment variables so the link preview uses it.
5. WhatsApp caches link previews. If you change `og.png`, add something like `?v=2` to the link you share.

---

## Project structure

```
app/                          layout (RTL, fonts, metadata), page, icons
config/fitback.ts             Fitback logo, colours, reveal text, fair details, sharing
config/site.ts                Scene name, demo notice, palette, photo mode
data/events.ts                events, verified dates, photo credits
scripts/fetch-photos.mjs      optional: download photos for self-hosting
lib/piece.ts                  puzzle-piece shapes matched to the logo
components/Experience.tsx     state: browse → failed booking → reveal
components/site/*             Scene (header, banner, cards, sheets, credits, support)
components/reveal/*           3D pieces, logo assembly, reveal page, share
public/fitback-logo.png       official logo (transparent)
public/og.png                 link preview (Scene branding only)
```
