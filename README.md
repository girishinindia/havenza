# Havenza — Web Portal (Next.js)

Home page for **Havenza — Create Your Beautiful Space**: home décor, hospitality décor, corporate gifting and custom manufacturing.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · WebGL**. Ready to deploy on **Vercel**.

---

## Run it locally

Requires **Node.js 24** (the version pinned for Vercel in `package.json`) (`node -v` to check).

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build check (the same command Vercel runs):

```bash
npm run build
npm start
```

---

## Deploy to Vercel

### Option A — via GitHub (recommended, auto-deploys on every push)
1. Create a new GitHub repository and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Havenza home page"
   git branch -M main
   git remote add origin https://github.com/<your-account>/havenza-web.git
   git push -u origin main
   ```
2. Go to **vercel.com → Add New → Project**, import the repository.
3. Framework preset is detected as **Next.js** — leave the defaults and click **Deploy**.

### Option B — Vercel CLI (no GitHub needed)
```bash
npm i -g vercel
vercel          # first run: log in, link the project, creates a preview URL
vercel --prod   # publish to production
```

### Connect your domain
Vercel → Project → **Settings → Domains** → add e.g. `havenza.in` and `www.havenza.in`, then add the DNS records Vercel shows at your domain registrar.

### Environment variables (optional)
| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Live URL used for social-share previews, e.g. `https://havenza.in` |

Add them in Vercel → Project → **Settings → Environment Variables**, then redeploy.

---

## Where to edit things

| What | File |
|---|---|
| Collections, B2C/B2B items, industries, occasions, festivals, "Why Havenza", contact details | `lib/data.ts` |
| Colours & fonts | `tailwind.config.ts`, `app/layout.tsx` |
| Page styles (cards, buttons, mega menu…) | `app/globals.css` |
| Page title / SEO / share preview | `app/layout.tsx` |
| Section order | `app/page.tsx` |
| Header & mega menus | `components/layout/Header.tsx`, `components/layout/MegaMenu.tsx` |
| Sections | `components/sections/*` |
| Logos & images | `public/images/*` (favicon: `app/icon.png`) |
| Card liquid-effect strength | `lib/cardFx.ts` → `CARD_STRENGTH` (1 = original, 0.6 = current) |
| Shaders (background, dark panels, cards) | `lib/gl.ts` |

---

## Before going live — checklist

- [ ] **Contact details** — replace the placeholder email/phone in `lib/data.ts` (`CONTACT`).
- [ ] **Enquiry form delivery** — the form posts to `app/api/enquiry/route.ts`, which validates the data and currently **only logs it** (visible in Vercel → Project → Logs). Connect it to an email service (e.g. Resend/SendGrid), Google Sheets or your CRM there.
- [ ] **Newsletter** — the footer subscribe box only shows a thank-you message; connect it to your mailing tool.
- [ ] **Social links** — set real URLs in `components/layout/Footer.tsx`.
- [ ] **Logos** — current logos are cropped from the brand sheet. Replace files in `public/images/` with original transparent PNG/SVG exports for the sharpest result (keep the same file names).
- [ ] **`NEXT_PUBLIC_SITE_URL`** — set once the domain is connected.

---

## Project structure

```
app/
  layout.tsx          fonts, SEO metadata
  page.tsx            home page (section order)
  globals.css         Tailwind + Havenza design layer
  api/enquiry/        quote-form endpoint
  icon.png, apple-icon.png
components/
  layout/             TopBar, Header, MegaMenu, Footer
  sections/           Hero, TwoWorlds, Collections, Marquee, Business, Bespoke, Occasions, WhyHavenza, Enquiry
  ui/                 UIProvider (shared state), CollectionDrawer, FloatingUI, PageEffects, Icon
  gl/                 BackgroundGL, LuxCanvas, CardGL (WebGL effects)
lib/
  data.ts             all content
  gl.ts               shaders + WebGL helpers
  cardFx.ts           shared WebGL engine for card backgrounds
public/images/        logos & monogram
```

### Performance notes
- The home page is **statically prerendered** — served from Vercel's CDN.
- All card effects share **one** WebGL context; only on-screen cards animate, and animation pauses when the tab is hidden.
- Visitors with "reduce motion" enabled get a still background.
