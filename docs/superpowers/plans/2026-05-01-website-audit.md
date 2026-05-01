# BerryDesign Website Audit — Problems & Fixes

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Audit and fix all identified issues on berrydesign.online

**Architecture:** Next.js + next-intl (i18n) deployed on Vercel. Source repo: `berrydesignonline-lab/berrydesignwebsiteblog`

**Tech Stack:** Next.js, Tailwind CSS, next-intl, Framer Motion, Sanity CMS, Vercel

**Audit Date:** 2026-05-01
**Audit Tools:** Playwright (headless Chromium), GitHub repo code review

---

## Findings Summary

| # | Priority | Issue | Impact |
|---|----------|-------|--------|
| 1 | CRITICAL | Invalid SSL Certificate | Browser blocks site with warning |
| 2 | CRITICAL | 5 Missing/Broken Images | Portfolio + social icons show broken |
| 3 | CRITICAL | Mobile Horizontal Overflow (411px > 375px) | Horizontal scroll on mobile |
| 4 | HIGH | Root Layout Missing `lang` Attribute | SEO + Accessibility penalty |
| 5 | HIGH | Image Optimization Disabled (`unoptimized: true`) | Slow load, large payloads |
| 6 | HIGH | `LocaleHtml` Uses Client-Side `useEffect` for `lang`/`dir` | Hydration mismatch, SSR loses attributes |
| 7 | MEDIUM | Desktop Load ~4s (with SSL retry) | Poor UX, SEO penalty |
| 8 | MEDIUM | Poppins Fonts Loaded as TTF (not WOFF2) | 335KB of fonts, slow render |
| 9 | MEDIUM | Sitemap Missing Dynamic Routes | Blog posts/work pages not in sitemap |
| 10 | LOW | Facebook Link Returns 400 | Broken external link |
| 11 | LOW | Footer Services Are Plain Text, Not Links | Poor UX |
| 12 | LOW | No `theme-color` meta tag | Mobile browser bar doesn't match brand |

---

### Problem 1: Invalid SSL Certificate

**Severity:** CRITICAL
**Source:** Playwright audit
**Error:** `net::ERR_CERT_COMMON_NAME_INVALID`

The SSL certificate does not match `berrydesign.online`. Users see a "Your connection is not private" warning in Chrome.

**Root cause:** Certificate is likely issued for a different domain (e.g., `*.vercel.app` or a custom domain not yet configured in Vercel's certificate system).

**How to fix:**
1. Go to Vercel Dashboard → berrydesignwebsiteblog project → Settings → Domains
2. Verify `berrydesign.online` and `www.berrydesign.online` are both added
3. If domain shows "Invalid Configuration" — remove and re-add the domain
4. Check DNS records:
   - `berrydesign.online` → CNAME → `cname.vercel-dns.com`
   - `www.berrydesign.online` → CNAME → `cname.vercel-dns.com`
5. Wait for Vercel to auto-provision a Let's Encrypt certificate (usually 5-10 min)
6. Verify with: `curl -I https://berrydesign.online`

---

### Problem 2: Missing/Broken Images

**Severity:** CRITICAL
**Source:** Playwright audit + code review
**Broken images:**
- `/assets/portfolio/1.jpg`
- `/assets/portfolio/2.jpg`
- `/assets/portfolio/3.jpg`
- `/assets/social/facebook.png`
- `/assets/social/instagram.png`

Files exist in `public/assets/` directory but are returning 404 or failing to load on the deployed site.

**Root cause:** Likely a deployment mismatch — the deployed build on Vercel may not include the latest `public/` assets, or the images are in a different branch/commit than what's deployed.

**How to fix:**
1. Verify images exist in the branch that's deployed to production:
   ```bash
   gh repo clone berrydesignonline-lab/berrydesignwebsiteblog /tmp/verify-repo
   ls /tmp/verify-repo/public/assets/portfolio/
   ls /tmp/verify-repo/public/assets/social/
   ```
2. Check Vercel deployment logs for asset-related errors
3. Trigger a fresh deployment:
   ```bash
   git push origin main --force-with-lease
   ```
   Or redeploy from Vercel dashboard
4. If using `output: 'export'` (static export), ensure `public/` is not being excluded from the build
5. Verify the deployed URL directly: `https://berrydesign.online/assets/portfolio/1.jpg`

---

### Problem 3: Mobile Horizontal Overflow

**Severity:** CRITICAL
**Source:** Playwright mobile audit
**Data:** `scrollWidth: 411px` vs `viewportWidth: 375px` (36px overflow)

Something on the page is 36px wider than the mobile viewport, causing unwanted horizontal scrolling.

**Root cause:** Likely one of these elements has fixed width or large padding:
- `Navbar` with `h-16` and `px-4` may overflow when combined with container
- `PortfolioSection` cards with `aspect-[3/4]` and fixed padding
- `HeroSection` or `ContactSection` with oversized elements

**How to fix:**

Modify `app/globals.css` — add overflow guard:
```css
/* Add to end of globals.css */
html, body {
  overflow-x: hidden;
  max-width: 100vw;
}

/* Ensure container doesn't exceed viewport */
.container {
  max-width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
}
```

Then audit each section component for elements exceeding viewport. Common culprits:
- Check `components/hero-section.tsx` for any element with `w-[...]` or fixed widths
- Check `components/portfolio-section.tsx` for `gap-6 lg:gap-8` combined with padding
- Check `components/navbar.tsx` for mobile menu overlay width

---

### Problem 4: Root Layout Missing `lang` Attribute

**Severity:** HIGH
**Source:** Code review of `app/layout.tsx`

```tsx
// app/layout.tsx line 21
<html suppressHydrationWarning>  // ← NO lang attribute!
```

The root `<html>` tag has no `lang` attribute. The `LocaleHtml` component sets it client-side via `useEffect`, but during SSR the attribute is missing.

**Impact:**
- Screen readers can't determine language
- Search engines can't properly index content language
- Fails WCAG 3.1.1 (Level A)

**How to fix:**

Modify `app/layout.tsx` to pass lang through:
```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {/* ... rest unchanged */}
      </body>
    </html>
  )
}
```

Then modify `[locale]/layout.tsx` to override these via server-side injection rather than client-side `useEffect` (see Problem 6).

---

### Problem 5: Image Optimization Disabled

**Severity:** HIGH
**Source:** Code review of `next.config.mjs`

```js
// next.config.mjs line 7-8
images: {
  unoptimized: true,  // ← All images sent at full size!
```

With `unoptimized: true`, every image is served at its original file size — no resizing, no WebP/AVIF conversion, no lazy loading optimizations from Next.js.

**How to fix:**

Modify `next.config.mjs`:
```js
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}
```

Then audit all `Image` components to ensure they have proper `width`/`height` or `fill` + `sizes`:
- `components/navbar.tsx` — logo has explicit width/height (OK)
- `components/portfolio-section.tsx` — uses `fill` + `sizes` (OK)
- `components/footer.tsx` — social icons have explicit width/height (OK)

---

### Problem 6: `LocaleHtml` Uses Client-Side `useEffect`

**Severity:** HIGH
**Source:** Code review of `components/locale-html.tsx`

```tsx
// components/locale-html.tsx
export function LocaleHtml({ locale, dir }: { locale: string; dir: string }) {
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale, dir])
  return null  // ← Only updates AFTER hydration
}
```

The `lang` and `dir` attributes are only set after the client hydrates. During SSR and initial paint, the HTML has no language or text direction set.

**How to fix:**

Replace `LocaleHtml` with server-side attribute injection. Modify `[locale]/layout.tsx`:

```tsx
// In [locale]/layout.tsx, replace the LocaleHtml component with:
return (
  <html lang={locale} dir={dir} suppressHydrationWarning>
    <head />
    <body>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </body>
  </html>
)
```

Then you can **delete** `components/locale-html.tsx` entirely since the attributes are now set server-side in the layout.

---

### Problem 7: Desktop Load ~4 Seconds

**Severity:** MEDIUM
**Source:** Playwright audit

Desktop load: 3.97s. The SSL certificate error causes a retry. After that, the actual content loads quickly (~1.5s).

**Contributing factors:**
- 30+ JS chunks loaded (Next.js RSC architecture)
- 5 Poppins TTF font files (335KB total)
- Cairo variable font (171KB)
- Google Analytics script blocking

**How to fix:**
1. Fix SSL certificate (Problem 1) — this alone saves ~2s
2. Optimize fonts (Problem 8) — switch to WOFF2
3. Consider `next/font` instead of self-hosted TTF files
4. Add `font-display: swap` to font CSS (already present if using `next/font`)

---

### Problem 8: Poppins Fonts Loaded as TTF

**Severity:** MEDIUM
**Source:** Playwright resource analysis

5 Poppins font files loaded as TTF (total ~335KB):
- Poppins-Regular.ttf (68KB)
- Poppins-Medium.ttf (67KB)
- Poppins-Bold.ttf (67KB)
- Poppins-SemiBold.ttf (67KB)
- Poppins-ExtraBold.ttf (67KB)

TTF files are 20-30% larger than WOFF2.

**How to fix:**

Option A — Use `next/font/google` (recommended):
```tsx
// In app/layout.tsx, replace manual font loading:
import { Poppins } from 'next/font/google'
import { Cairo } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
})

const cairo = Cairo({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-cairo',
})
```

Option B — Convert TTF to WOFF2 and update CSS:
```bash
# Use a tool like fonttools or online converter
# Then update globals.css to reference .woff2 files
```

---

### Problem 9: Sitemap Missing Dynamic Routes

**Severity:** MEDIUM
**Source:** Code review of `app/sitemap.ts`

The sitemap only lists static routes (`/en`, `/ar`, `/en/work`, `/ar/work`, `/en/blog`, `/ar/blog`). It doesn't include individual blog posts or portfolio items from Sanity CMS.

**How to fix:**

Modify `app/sitemap.ts`:
```tsx
import type { MetadataRoute } from "next"
import { sanityFetch } from "@/lib/sanity/client"
import { getAllBlogPosts, getAllPortfolioItems } from "@/lib/sanity/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://berrydesign.online"

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/ar`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/en/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/ar/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/en/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/ar/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ]

  // Dynamic blog posts
  try {
    const posts = await getAllBlogPosts()
    for (const post of posts) {
      routes.push({
        url: `${baseUrl}/en/blog/${post.slug}`,
        lastModified: new Date(post._updatedAt || post._createdAt),
        changeFrequency: "monthly",
        priority: 0.6,
      })
      routes.push({
        url: `${baseUrl}/ar/blog/${post.slug}`,
        lastModified: new Date(post._updatedAt || post._createdAt),
        changeFrequency: "monthly",
        priority: 0.6,
      })
    }
  } catch {
    // Silently fail — sitemap should not break the build
  }

  // Dynamic portfolio items
  try {
    const items = await getAllPortfolioItems()
    for (const item of items) {
      routes.push({
        url: `${baseUrl}/en/work/${item.slug}`,
        lastModified: new Date(item._updatedAt || item._createdAt),
        changeFrequency: "monthly",
        priority: 0.7,
      })
      routes.push({
        url: `${baseUrl}/ar/work/${item.slug}`,
        lastModified: new Date(item._updatedAt || item._createdAt),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    }
  } catch {
    // Silently fail
  }

  return routes
}
```

Note: Adjust query function names to match your actual Sanity query exports.

---

### Problem 10: Facebook Link Returns 400

**Severity:** LOW
**Source:** Playwright broken links audit

`https://www.facebook.com/berrydesignonline` returns HTTP 400.

**How to fix:**
1. Verify the correct Facebook URL by visiting `facebook.com/berrydesignonline` manually
2. If the page doesn't exist, create it or update to the correct URL
3. Update `components/footer.tsx` line 102:
   ```tsx
   href="https://www.facebook.com/berrydesignonline"  // ← fix to correct URL
   ```

---

### Problem 11: Footer Services Are Plain Text

**Severity:** LOW
**Source:** Code review of `components/footer.tsx`

```tsx
// footer.tsx lines 64-69
{serviceLinks.map((link, i) => (
  <li key={i}>
    <span className="text-sm text-ink/60">{link.label}</span>  {/* Not a link! */}
  </li>
))}
```

Services are rendered as plain `<span>` elements, not clickable links. Users can't navigate to service pages.

**How to fix:**

Modify `components/footer.tsx`:
```tsx
const serviceLinks = [
  { href: "#services", label: t("brandIdentity") },
  { href: "#services", label: t("websiteDesign") },
  { href: "#services", label: t("printDesign") },
  { href: "#services", label: t("signage") },
  { href: "#services", label: t("socialMedia") },
  { href: "#services", label: t("marketing") },
]

// Then in the render:
{serviceLinks.map((link, i) => (
  <li key={i}>
    <a href={link.href} className="text-sm text-ink/60 hover:text-coral transition-colors">
      {link.label}
    </a>
  </li>
))}
```

---

### Problem 12: No `theme-color` Meta Tag

**Severity:** LOW
**Source:** Code review

Mobile browsers (Chrome on Android, Safari on iOS) don't have a branded theme color for the browser chrome.

**How to fix:**

Modify `app/layout.tsx` metadata:
```tsx
export const metadata: Metadata = {
  title: "Berry Design Qatar",
  description: "Design for Schools & Nurseries in Qatar",
  themeColor: "#FF6B6B",  // ← Add your brand coral color
}
```

Or add to `[locale]/layout.tsx` `generateMetadata`:
```tsx
themeColor: locale === "ar" ? "#1a1a2e" : "#FF6B6B",
```

---

## Recommended Fix Order

1. **Fix SSL Certificate** — blocks all users, most urgent
2. **Fix Missing Images** — visible broken elements on homepage
3. **Fix Mobile Overflow** — broken mobile experience
4. **Fix Root Layout `lang` + LocaleHtml** — SEO/accessibility
5. **Enable Image Optimization** — performance
6. **Optimize Fonts** — performance
7. **Update Sitemap** — SEO
8. **Fix Facebook Link** — broken external link
9. **Fix Footer Services** — UX polish
10. **Add theme-color** — visual polish

---

## Files To Modify

| File | Problems |
|------|----------|
| `next.config.mjs` | #5 (image optimization) |
| `app/layout.tsx` | #4 (lang attr), #8 (fonts), #12 (theme-color) |
| `app/[locale]/layout.tsx` | #4, #6 (server-side lang/dir) |
| `app/sitemap.ts` | #9 (dynamic routes) |
| `components/locale-html.tsx` | #6 (delete after fix) |
| `components/footer.tsx` | #10 (Facebook URL), #11 (service links) |
| `app/globals.css` | #3 (mobile overflow) |
| Vercel Dashboard (not code) | #1 (SSL certificate) |
