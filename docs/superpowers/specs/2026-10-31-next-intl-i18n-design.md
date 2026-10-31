# Design Specification: Bilingual Internationalization (VI / EN) with next-intl

## 1. Overview & Objectives

This specification defines the internationalization (i18n) architecture for the Long Gia / Hưng Thịnh Phát agricultural brand website using `next-intl` v4 and Next.js 16 App Router.

### Goals
- Support full bilingual routing for Vietnamese (`vi`) as the default language and English (`en`) as the international business partner language.
- Enforce explicit locale prefixes for SEO and clarity: `/vi/...` and `/en/...` with root `/` redirecting to the user's preferred or default locale (`/vi`).
- Restructure the application routing into `app/[locale]/` while preserving API routes and static asset serving.
- Establish clean, maintainable translation dictionaries (`messages/vi.json` and `messages/en.json`) structured by domain namespace.
- Introduce an editorial-style, accessible `LanguageSwitcher` pill in `SiteHeader` (desktop and mobile drawer).
- Translate the shared layout (`SiteHeader`, `Footer`, common controls) and the core brand showcase pages (Homepage `/`, About Us `/ve-chung-toi`, Products `/san-pham`, Process & Contact `/quy-trinh-lien-he`), while maintaining operational routing for interactive pages (`/long-gia-nha-toi`, `/quiz`, `/dashboard`).

---

## 2. Architecture & File Structure

The project uses a root-level Next.js layout (no `src/` directory). The i18n configurations, message bundles, and proxy middleware reside at the repository root.

```text
cichlid/
├── i18n/
│   ├── routing.ts                # Locale definitions & prefix routing configuration
│   ├── navigation.ts             # Locale-aware Link, useRouter, usePathname, redirect
│   └── request.ts                # Server-side request configuration loader
├── messages/
│   ├── vi.json                   # Vietnamese dictionary (domain namespaces)
│   └── en.json                   # English dictionary (domain namespaces)
├── proxy.ts                      # Next.js 16 middleware routing handler
├── middleware.ts                 # Backward-compatibility alias pointing to proxy.ts
├── next.config.mjs               # Wrapped with createNextIntlPlugin('./i18n/request.ts')
└── app/
    ├── globals.css               # Global styling & Tailwind tokens
    ├── api/                      # Unlocalized API routes
    │   └── analytics/route.ts
    └── [locale]/                 # Dynamic locale segment
        ├── layout.tsx            # Root HTML layout with NextIntlClientProvider & font definitions
        ├── page.tsx              # Homepage (renders LongGiaPage)
        ├── ve-chung-toi/page.tsx # About Us page (renders AboutPage)
        ├── san-pham/page.tsx     # Products showcase (renders ProductPage)
        ├── quy-trinh-lien-he/    # Process & Contact page
        │   └── page.tsx
        ├── long-gia-nha-toi/     # Farm adoption experience
        │   ├── page.tsx
        │   └── dang-ky/page.tsx
        ├── quiz/page.tsx         # Dragon fruit quiz experience
        └── dashboard/page.tsx    # Operational metrics view
```

---

## 3. Configuration & Routing Specifications

### 3.1 `i18n/routing.ts`
Defines supported locales and routing behaviors:
```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en"],
  defaultLocale: "vi",
  localePrefix: "always",
});
```

### 3.2 `i18n/navigation.ts`
Exports locale-aware navigation primitives:
```ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
```

### 3.3 `i18n/request.ts`
Loads the active locale's JSON dictionary per request:
```ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

### 3.4 `proxy.ts` (Next.js 16 Middleware)
Handles request routing and locale detection:
```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
```
*Note: A parallel `middleware.ts` will re-export `proxy.ts` to ensure compatibility across Next.js 16 build environments.*

### 3.5 `next.config.mjs`
Wraps Next.js config with the next-intl plugin:
```js
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
```

---

## 4. Layout & Provider Integration

### `app/[locale]/layout.tsx`
The single root layout wrapping all locale-scoped pages:
- Generates static params:
  ```ts
  export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
  }
  ```
- Validates the locale param with `hasLocale(routing.locales, locale)`; triggers `notFound()` if invalid.
- Calls `setRequestLocale(locale)` to enable static rendering on pages.
- Sets `<html lang={locale}>`.
- Wraps children in `<NextIntlClientProvider>` with the active messages.
- Preserves global font classes (`--font-geist`, `--font-geist-mono`, `--font-playfair`) and `<Analytics />`.

---

## 5. UI Components & Interaction

### 5.1 Language Switcher (`components/language-switcher.tsx`)
- **Visual Design**: Complies with `AGENTS.md` editorial styling. Segmented pill toggle:
  - Container: Soft Ivory background (`#fffaf3`), subtle border (`#e3d7ca`), rounded-full, padding `p-1`.
  - Active button: Dragon Berry background (`#ba466d`), crisp white text, rounded-full, font-semibold.
  - Inactive button: Muted text (`#626751`), subtle hover state (`hover:text-[#822944]`).
  - Labels: `VI` | `EN`.
- **Interaction**:
  - Uses `useLocale()`, `usePathname()`, and `useRouter()` from `@/i18n/navigation`.
  - Preserves current hash anchor (e.g. `#cau-chuyen`, `#lien-he`) and query string on language change.
  - Switches locale via `router.replace(pathname, { locale: nextLocale })`.

### 5.2 Header Integration (`components/site-header.tsx`)
- Imports `Link`, `usePathname` from `@/i18n/navigation`.
- Consumes `useTranslations('Nav')`.
- Displays `<LanguageSwitcher />`:
  - **Desktop**: In the navigation bar immediately preceding or adjacent to the primary "Liên hệ" button.
  - **Mobile**: Inside the mobile slide-down drawer menu.
- Replaces raw HTML `<a>` tags with `Link` for all internal routes (`/`, `/ve-chung-toi`, `/san-pham`, `/long-gia-nha-toi`, `/quiz`, `/quy-trinh-lien-he`).

### 5.3 Footer Integration (`components/footer.tsx`)
- Consumes `useTranslations('Footer')`.
- Translates brand descriptors, facility address labels, navigation links, and copyright text.
- Replaces raw internal links with locale-aware `Link`.

---

## 6. Translation Message Schema

Translations are organized into `messages/vi.json` and `messages/en.json` using standard namespaces:

```text
messages/
├── Nav: Menu items, dropdown links, CTAs
├── Footer: Company name, address, hotline, links, copyright
├── Common: Reusable action buttons ("Xem chi tiết", "Yêu cầu báo giá", "Liên hệ hợp tác")
├── Home:
│   ├── Hero: Headline, sub-headline, trust badges
│   ├── FeaturedProducts: Dragon fruit and coconut summaries
│   ├── Capabilities: GlobalGAP, factory capacity, cold storage
│   └── Press: Press clips and news headlines
├── About:
│   ├── OpenLetter: Chairman / founder letter
│   ├── VisionMission: Strategic pillars
│   └── CoreValues: Integrity, quality, farmer partnership
├── Products:
│   ├── Catalog: Red, White, Yellow dragon fruits, Diamond & Easy-open coconuts
│   ├── Specifications: Brix levels, weights, export packaging options
│   └── QuoteDialog: B2B quotation form fields and copy
└── ProcessContact:
    ├── ColdChainProcess: 6-step receiving, cleaning, drying, sorting, packing, cold storage
    └── ContactForm: Form fields (Name, Phone, Email, Company, Message, Submit button)
```

---

## 7. Migration & Rollout Plan

1. **Routing & Core Setup**:
   - Create `i18n/routing.ts`, `i18n/navigation.ts`, and `i18n/request.ts`.
   - Create `proxy.ts` and `middleware.ts`.
   - Update `next.config.mjs` with `createNextIntlPlugin`.
2. **Move Pages to `app/[locale]/`**:
   - Move `app/page.tsx`, `app/ve-chung-toi/`, `app/san-pham/`, `app/quy-trinh-lien-he/`, `app/long-gia-nha-toi/`, `app/quiz/`, and `app/dashboard/` into `app/[locale]/`.
   - Create `app/[locale]/layout.tsx` with `NextIntlClientProvider` and `generateStaticParams`.
3. **Dictionary Creation**:
   - Extract current Vietnamese strings into `messages/vi.json`.
   - Create corresponding high-standard English translation in `messages/en.json`.
4. **Component Localization**:
   - Build `components/language-switcher.tsx`.
   - Update `components/site-header.tsx` and `components/footer.tsx`.
   - Update page components for Home, About, Products, and Process & Contact to consume translations.
5. **Verification & Smoke Tests**:
   - Update `tests/homepage-smoke.mjs` to test `/vi` and `/en`.
   - Execute `npm run build` and `npm run test:home` to ensure zero compilation or routing regressions.
