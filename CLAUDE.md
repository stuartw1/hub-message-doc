# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`docs.hubmessage.app` — the **public documentation site** for HubMessage. It is
served by a small Cloudflare Worker that gates the entire site behind HTTP
Basic Auth (single shared password) while the project is in private preview.

Authoritative content about app or proxy behaviour lives in the source repos
(`/Users/user/code/xcode/HubMessage/CLAUDE.md` for the Mac app,
`/Users/user/code/hub-message-api/CLAUDE.md` for the API proxy). This repo is
**downstream** of both — if docs and code disagree, the code wins.

## Architecture in one paragraph

Astro 6 + Starlight build the docs as static HTML/CSS/JS into `dist/`. A
Cloudflare Worker (`worker/index.ts`) is bound to the `dist/` directory via
the `ASSETS` binding and configured with `run_worker_first = true` so that
every request — asset hit or miss — passes through the Worker first. The
Worker checks HTTP Basic Auth against the `DOCS_PASSWORD` secret, then hands
the request to `env.ASSETS.fetch(request)`. There is no server-side rendering
and no per-request work beyond the auth check.

## Commands

```sh
npm run dev        # Astro dev server on :4321 (no auth, content authoring)
npm run preview    # Build + wrangler dev on :8787 (with auth, integration test)
npm run build      # Just `astro build` -> dist/
npm run deploy     # astro build && wrangler deploy
npm run icons      # Regenerate every brand asset from src/assets/hubmessage-logo.png
npm run typecheck  # astro check
```

The Basic Auth password during `wrangler dev` comes from `.dev.vars`
(`DOCS_PASSWORD="..."`); in production it's a Wrangler secret. Both are
gitignored / never committed.

## Layout

```
astro.config.mjs           — Starlight integration, sidebar config, site URL, OG meta
src/content.config.ts      — Astro content collection definition (Starlight schema)
src/content/docs/          — All docs pages, organised by section
src/assets/                — Canonical PNG sources; `hubmessage-logo.png` is the
                             one to replace if branding changes
public/                    — Generated favicons + apple-touch + OG image (output
                             of `npm run icons`)
scripts/build-icons.sh     — ImageMagick pipeline that builds every derivative
                             from src/assets/hubmessage-logo.png
worker/index.ts            — Basic Auth gate
worker/tsconfig.json       — Workers-types TS config, isolated from Astro
wrangler.toml              — Worker name, assets binding, custom domain
```

## Branding

The source of truth is `src/assets/hubmessage-logo.png` (500×500, bubbles +
wordmark). Everything else — the trimmed transparent header icon, the
favicon, the Apple touch icon, the Open Graph social card — is generated
by `npm run icons` (`scripts/build-icons.sh`). Generated outputs in
`public/` and `src/assets/hubmessage-icon.png` are committed so a fresh
checkout doesn't need ImageMagick installed to build; only re-running the
script does. **When the source logo changes, run `npm run icons` and
commit both the source and the regenerated derivatives in the same
commit** so they stay in lockstep.

The Astro tsconfig at the repo root **excludes** `worker/` because the Worker
uses `@cloudflare/workers-types`, not the DOM. The Worker has its own
tsconfig.

## Adding a page

1. Create the `.md` / `.mdx` file under `src/content/docs/<section>/`.
2. Add an entry to the sidebar in `astro.config.mjs` (Starlight does not
   auto-build the sidebar; explicit entries make ordering deterministic).
3. The slug is the path under `src/content/docs/` minus the extension. For
   `src/content/docs/billing/subscriptions.md` the URL is
   `/billing/subscriptions/`.

## Things to know

- **`run_worker_first = true` in `wrangler.toml` is load-bearing.** Without it
  the Worker only runs for asset *misses*, which means static files leak past
  the auth gate. Don't remove it while the docs are still gated.
- **`DOCS_PASSWORD` is checked with a constant-time comparison** in the
  Worker. Don't replace it with `===`.
- **`/__health` is intentionally unauthenticated** so uptime checks can verify
  the Worker is alive. Keep it returning a fixed string with no secrets.
- **The Cloudflare account ID is pinned** in `wrangler.toml` to the same
  account that hosts `hubmessage.app` (and `api.hubmessage.app`). Deploys
  from a different tenant will fail loudly; that's by design.
- **The publisher entity is `Neko Venture Partners Limited`**, support email
  `support@hubmessage.app`. The bundle ID `uk.nvpartners.hubmessage` is a
  historical short form ("NV Partners") that appears in old drafts — when
  writing user-facing content, prefer the full legal name.

## When to remove the Basic Auth gate

The gate is a temporary measure for private preview. When the docs go fully
public, deleting it cleanly means:

1. Remove the auth check from `worker/index.ts` (the Worker can stay for
   `/__health` and to set custom headers, or be deleted entirely — in which
   case remove `main` from `wrangler.toml` and `run_worker_first` from
   `[assets]`).
2. `wrangler secret delete DOCS_PASSWORD`.
3. Update this file and the README to drop the auth references.
