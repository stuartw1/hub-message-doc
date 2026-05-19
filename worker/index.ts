/**
 * docs.switchmessage.com — Cloudflare Worker.
 *
 * Sits in front of the Starlight-built static site (served via the ASSETS
 * binding) and gates every request behind HTTP Basic Auth. The password is a
 * single shared value stored as the DOCS_PASSWORD Wrangler secret; username is
 * accepted but ignored, so users can type anything they like in the username
 * field.
 *
 * Once a request passes the auth check, the Worker hands it off to the static
 * asset handler via `env.ASSETS.fetch(request)`. `run_worker_first = true` in
 * `wrangler.toml` makes the Worker run for every request including asset hits;
 * without it the gate would only protect requests that miss the asset
 * directory (i.e. effectively nothing).
 *
 * 404s from inside the asset handler are served from `dist/404.html` (built
 * from `src/content/docs/404.md`) because `not_found_handling = "404-page"` is
 * set in wrangler.toml. The two error pages the Worker itself can return —
 * 401 (auth required, body shown only when the browser auth prompt is
 * cancelled) and 500 (DOCS_PASSWORD secret missing) — are rendered inline
 * with the small `errorPage()` template below so we don't have to fetch into
 * ASSETS and risk a loop on misconfig.
 *
 * Health check at /__health is intentionally unauthenticated so uptime checks
 * (and `wrangler tail` smoke tests) can confirm the worker is alive without
 * needing the password.
 */

export interface Env {
  /** Shared Basic Auth password; set via `wrangler secret put DOCS_PASSWORD`. */
  DOCS_PASSWORD: string;
  /** Static asset binding pointing at the Astro `dist/` build output. */
  ASSETS: Fetcher;
}

const REALM = 'SwitchMessage Docs (private preview)';

/**
 * Self-contained HTML for the two error responses the Worker can produce on
 * its own (401 and 500). Kept minimal and styled inline so they render
 * correctly even before any asset request has succeeded, and so a misconfig
 * can never trigger an asset-fetch loop.
 */
function errorPage(opts: {
  status: number;
  title: string;
  heading: string;
  body: string;
}): string {
  // prettier-ignore
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>${opts.status} · ${opts.title} · SwitchMessage Docs</title>
  <link rel="icon" type="image/png" href="/favicon.png">
  <style>
    :root { color-scheme: light dark; }
    html, body { margin: 0; height: 100%; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #0d1117;
      color: #e6edf3;
      display: grid;
      place-items: center;
      padding: 2rem;
      line-height: 1.5;
    }
    @media (prefers-color-scheme: light) {
      body { background: #fff; color: #1f2328; }
      .status { color: #57606a; }
      a { color: #0969da; }
    }
    main {
      max-width: 30rem;
      text-align: center;
    }
    .status {
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
      font-size: 0.95rem;
      letter-spacing: 0.02em;
      color: #8b949e;
      margin: 0 0 0.5rem;
    }
    h1 {
      font-size: 1.75rem;
      margin: 0 0 1rem;
      font-weight: 600;
    }
    p { margin: 0 0 1rem; }
    a { color: #ff7a59; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .accent { color: #ff7a59; }
  </style>
</head>
<body>
  <main>
    <p class="status">${opts.status} ${opts.title}</p>
    <h1>${opts.heading}</h1>
    ${opts.body}
  </main>
</body>
</html>`;
}

function unauthorized(): Response {
  const html = errorPage({
    status: 401,
    title: 'Authentication required',
    heading: 'These docs are gated during private preview.',
    body: `
      <p>If you've been given a password, your browser should prompt for it.
      Reload this page to bring the prompt back.</p>
      <p>If you don't have a password yet, email
      <a href="mailto:support@switchmessage.com">support@switchmessage.com</a>
      and we'll get you set up.</p>
    `,
  });
  return new Response(html, {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Cache-Control': 'no-store',
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

function misconfigured(): Response {
  const html = errorPage({
    status: 500,
    title: 'Server misconfiguration',
    heading: 'docs.switchmessage.com is misconfigured.',
    body: `
      <p>The <code>DOCS_PASSWORD</code> secret hasn't been set on this
      Worker. The gate is fail-closed by design, so nothing is being
      served until that's fixed.</p>
      <p>If you administer this site:
      <code>wrangler secret put DOCS_PASSWORD</code>.</p>
      <p>If you're a visitor: please email
      <a href="mailto:support@switchmessage.com">support@switchmessage.com</a>
      and let us know — we're sorry for the trouble.</p>
    `,
  });
  return new Response(html, {
    status: 500,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

/**
 * Constant-time comparison so we don't leak the password length / prefix via
 * timing. Returns false if the inputs differ in length OR content.
 */
function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const aBytes = enc.encode(a);
  const bBytes = enc.encode(b);
  if (aBytes.length !== bBytes.length) return false;
  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) {
    diff |= aBytes[i]! ^ bBytes[i]!;
  }
  return diff === 0;
}

function checkBasicAuth(request: Request, expectedPassword: string): boolean {
  const header = request.headers.get('Authorization');
  if (!header || !header.toLowerCase().startsWith('basic ')) return false;

  let decoded: string;
  try {
    decoded = atob(header.slice('basic '.length).trim());
  } catch {
    return false;
  }

  // `decoded` is "username:password"; password may itself contain colons,
  // username cannot.
  const colon = decoded.indexOf(':');
  if (colon < 0) return false;
  const password = decoded.slice(colon + 1);

  return timingSafeEqual(password, expectedPassword);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Unauthenticated health check.
    if (url.pathname === '/__health') {
      return new Response('ok', {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    // Misconfiguration guard — if the secret was never set, fail closed
    // rather than silently letting everyone through.
    if (!env.DOCS_PASSWORD) {
      return misconfigured();
    }

    if (!checkBasicAuth(request, env.DOCS_PASSWORD)) {
      return unauthorized();
    }

    // Hand the request off to the static asset handler. Misses are served
    // from dist/404.html with status 404 (see wrangler.toml
    // `not_found_handling = "404-page"`).
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
