# hub-message-doc

Public documentation site for [HubMessage](https://hubmessage.app),
served from **https://docs.hubmessage.app**.

Built with [Astro Starlight](https://starlight.astro.build/) (static HTML)
and hosted on Cloudflare Workers, with the Worker enforcing **HTTP Basic
Auth** in front of the static assets while the docs are still in private
preview.

## Stack

- **Content**: Markdown / MDX under `src/content/docs/`
- **Framework**: Astro 6 + Starlight
- **Hosting**: Cloudflare Workers (static assets) + a small Worker for
  the password gate (`worker/index.ts`)
- **Domain**: `docs.hubmessage.app` (custom domain, same Cloudflare
  account as `api.hubmessage.app`)

## Local development

```sh
npm install
npm run dev
```

`npm run dev` runs Astro's dev server on `http://localhost:4321/` with
hot reload — no Worker, no auth. Perfect for writing content.

To test the **Basic Auth gate** locally:

```sh
echo 'DOCS_PASSWORD="dev-password"' > .dev.vars
npm run preview
```

`npm run preview` builds the site and runs `wrangler dev`, which serves
the built site through the Worker on `http://localhost:8787/`. You'll
get a browser auth prompt; enter any username and the password you set
in `.dev.vars`.

`.dev.vars` is gitignored.

## Deploy

```sh
npx wrangler login                          # first time on a machine
npx wrangler secret put DOCS_PASSWORD       # only when the password changes
npm run deploy
```

`npm run deploy` runs `astro build` then `wrangler deploy`. The Worker
script and `dist/` upload together; Cloudflare's edge starts serving
the new build within seconds.

## Adding pages

1. Drop a new `.md` or `.mdx` file under `src/content/docs/<section>/`.
2. Add it to the sidebar in `astro.config.mjs`.
3. `npm run dev` will hot-reload it.

The slug is the file's path under `src/content/docs/` minus the
extension; the title comes from the page's frontmatter `title:`.

## Project layout

```
src/
  content/
    docs/             # all docs pages (Markdown / MDX)
    config.ts         # Starlight content collection definition
public/
  favicon.svg
worker/
  index.ts            # Basic Auth gate + ASSETS.fetch
  tsconfig.json
astro.config.mjs      # Astro + Starlight integration config
wrangler.toml         # Worker + static assets binding + custom domain
```

## Related repos

- `hub-message-api/` — the API proxy Worker (`api.hubmessage.app`)
- `xcode/HubMessage/` — the macOS client (separate repo)

When the docs reference behaviour of the app or the API proxy, that
behaviour is **authoritatively defined** in those repos, not here. Keep
docs in sync with the code.
