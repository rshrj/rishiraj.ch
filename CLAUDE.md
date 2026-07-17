# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website for rishiraj.ch — a Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 app, deployed on Vercel. Currently a "coming soon" placeholder. Next milestone: a minimal, good-looking landing page aimed at a recruiter who types "rishiraj.ch" and hits enter — content will be sourced from the user's LinkedIn profile + CV (see `docs/source/`), not built out speculatively. Package manager is pnpm (see `pnpm-lock.yaml`). Node version is pinned via `.nvmrc`.

The site owner recently completed a PhD in theoretical and mathematical physics from Sorbonne University (Paris) and is moving from academic research into applied research / industry roles. This is not a generic "fresher" portfolio — copy, framing, and design choices should read as elite technical/research credibility (strong computational and mathematical background), not entry-level. Do not invent biographical or career details; source them from the CV/LinkedIn material once provided.

`typescript` is pinned to 6.0.3 and `eslint` to the 9.x line (not the current `latest` npm tags) because `eslint-config-next`'s dependency on `typescript-eslint`/`eslint-plugin-react` doesn't yet support TypeScript 7 or ESLint 10 — bumping either breaks `pnpm lint`. Check upstream support before bumping past these.

## Commands

```bash
pnpm dev         # start dev server (Turbopack) at localhost:3000
pnpm build       # production build (Turbopack)
pnpm start       # run the production build
pnpm lint        # eslint (flat config, imports eslint-config-next/core-web-vitals + eslint-config-next/typescript directly)
pnpm typecheck   # tsc --noEmit
```

There is no test suite configured in this repo.

## Architecture

### Locale routing

All pages live under `app/[locale]/`, not `app/` directly (`app/page.tsx` has been removed in favor of this). Locale handling is split across two layers:

- `proxy.ts` — runs on every request except `_next`, `api`, and static assets. If the URL has no locale prefix, it detects the preferred locale from the `Accept-Language` header (falling back to `en`) and redirects to `/{locale}/...`. If the URL already has a locale prefix, it passes the locale through via the `x-locale` response header. Supported locales are hardcoded in this file: `en`, `de`, `fr`, `it` (default `en`).
- `app/layout.tsx` (root layout) — reads the `x-locale` header (set by `proxy.ts`) to set `<html lang="...">`. This only works because the proxy runs first and sets that header; there's no cookie or URL parsing here.
- `app/[locale]/layout.tsx` — reads `params.locale` directly (not the header) to generate locale-specific `<title>`/`<description>` metadata via `generateMetadata`.
- `app/[locale]/page.tsx` — reads `params.locale` directly for in-page translated content.

When adding new locale-aware routes/pages under `app/[locale]/`, get the locale from `params`, not from the `x-locale` header (that header is only reliably available in the root layout).

### Translations

- Translation strings live in `locales/{en,de,fr,it}.json`, one flat key/value file per locale.
- `lib/translations.ts` imports all four JSON files, exposes the `Locale` union type (`'en' | 'de' | 'fr' | 'it'`) and `getTranslations(locale)`.
- `lib/server-translations.ts` just re-exports `lib/translations.ts` — both exist as separate import paths (used from `app/[locale]/layout.tsx` vs `app/[locale]/page.tsx`), so keep them in sync rather than importing `lib/translations` everywhere.
- When adding a new locale, update all three of: the `locales` array in `proxy.ts`, the `translations` object in `lib/translations.ts`, and the `languages` list in `components/LanguageSwitcher.tsx` — plus add the new `locales/{code}.json` file with all existing keys.
- When adding a new translation key, add it to every file in `locales/`.

### Client-side locale switching

`components/LanguageSwitcher.tsx` is a client component that swaps the locale segment in the current pathname via `next/navigation`'s `useRouter`/`usePathname`/`useParams`, rather than doing a full navigation.

## Path aliases

`@/*` maps to the repo root (see `tsconfig.json`).

## Content source material

`docs/source/` (gitignored — never commit; personal repo is public) holds the LinkedIn profile export and CV the landing page copy will be drawn from.

## Deployment

Vercel project `rishiraj-ch` (org `rshrjs-projects`) is linked via GitHub integration — every push to `main` auto-deploys to production at `rishiraj.ch` / `www.rishiraj.ch`. Vercel's Node.js version setting is kept in sync with `.nvmrc`. `vercel` CLI is linked locally (`.vercel/repo.json`, gitignored); useful for `vercel ls` / `vercel inspect <url>` to check deploy status without leaving the terminal.

## Commit conventions

`[category] short imperative description`, lowercase, no trailing period. Categories used so far: `initial`, `content`, `chore`, `feature`, `docs`.
