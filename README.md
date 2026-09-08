# Karaz Dev

Marketing site for **Karaz Dev** — a web & mobile development studio based in
Qara, Syria. Bilingual (English / Arabic, RTL), fully static, built to load
fast on a slow connection.

## Stack

Angular (standalone components, SSR/prerendering via `@angular/ssr`), built
with `outputMode: "static"` so `ng build` produces a fully prerendered static
site — no Node server required at runtime. Two locale builds (`en`, `ar`) are
generated via Angular's built-in i18n, each with its own prerendered HTML per
route, so a direct link to any page loads instantly with no client-side
routing or translation JS needed on first paint.

No CSS framework, no icon library, no webfonts — every typeface is a system
font stack (zero network requests), and the only images are the logo SVG.

## Local development

```bash
npm install
npm start          # serves the *English* build only, at http://localhost:4200
```

`ng serve` doesn't support Angular's i18n locale builds, so day-to-day dev
work happens against the `en` strings. To check the Arabic build (translations,
RTL layout), build and serve the static output instead:

```bash
npm run build
npx http-server dist/karaz-dev-site/browser -p 4300
# http://localhost:4300/en/
# http://localhost:4300/ar/
```

## i18n workflow

Copy lives in the templates in English, marked with `i18n="@@some.id"`.
Arabic translations live separately in `src/locale/messages.ar.xlf`, keyed by
that same id.

After changing or adding any `i18n`-marked string:

1. `npx ng extract-i18n --output-path src/locale` — regenerates
   `src/locale/messages.xlf` (the English source) with the new/changed ids.
2. Add or update the matching `<trans-unit id="...">` in
   `src/locale/messages.ar.xlf` by hand — this project has no translation
   service wired up, so Arabic copy is written directly.
3. `npm run build` — builds both locales and fails if a translation is
   missing.

## Build output

```
dist/karaz-dev-site/browser/en/...   English, served at /en/
dist/karaz-dev-site/browser/ar/...   Arabic (RTL), served at /ar/
```

There's no file at the output root — see `public-root/index.html` for the
tiny script that redirects `/` to `/en/` or `/ar/` based on the visitor's
browser language, copied into place by `npm run build`'s postbuild step.

## Deploying to Cloudflare Pages

1. Push this repo to GitHub (already done if you're reading this from a
   clone).
2. In Cloudflare Pages, create a project from the GitHub repo.
3. Build command: `npm run build`
4. Build output directory: `dist/karaz-dev-site/browser`
5. Once you've bought the domain, add it under the Pages project's **Custom
   domains** tab.

No environment variables or serverless functions needed — it's a static
site.

## What's still a placeholder

- `hello@karaz.dev` (footer + contact page) — needs the real domain email
  once it exists.
- The WhatsApp number in the footer and contact page
  (`wa.me/963000000000`) — replace with the real number before publishing.
- The Mazboot case study on `/work` — update once that project is actually
  live, and consider adding a screenshot.
