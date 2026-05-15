/**
 * docs.hubmessage.app — Cloudflare Worker.
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

const REALM = 'HubMessage Docs (private preview)';

function unauthorized(): Response {
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Cache-Control': 'no-store',
      'Content-Type': 'text/plain; charset=utf-8',
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

    // Misconfiguration guard — if the secret was never set, fail closed rather
    // than silently letting everyone through.
    if (!env.DOCS_PASSWORD) {
      return new Response(
        'docs.hubmessage.app is misconfigured: DOCS_PASSWORD is not set.',
        { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
      );
    }

    if (!checkBasicAuth(request, env.DOCS_PASSWORD)) {
      return unauthorized();
    }

    // Hand the request off to the static asset handler.
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
