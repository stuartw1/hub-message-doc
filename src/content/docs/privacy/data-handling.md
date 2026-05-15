---
title: What HubMessage accesses
description: A plain-English overview of where your data flows when you use HubMessage.
---

This page is a **summary**. For the formal document, see the
[Privacy Policy](/legal/privacy-policy/).

## On your Mac

HubMessage reads two things from your Mac:

1. **The iMessage database** at `~/Library/Messages/chat.db`. This is a
   SQLite file that macOS keeps for the Messages app. Reading it
   requires you to grant Full Disk Access in System Settings;
   HubMessage cannot read it otherwise.
2. **Its own settings and Keychain entries** that it writes itself —
   sync configuration, your HubSpot OAuth tokens, the numeric ID of
   the custom inbox channel.

That's it. HubMessage does not read:

- Any other application's data
- Your Safari history, contacts, calendar, or photos
- Any file outside its own container *and* the iMessage database

## What gets sent to HubSpot

HubMessage sends the following to your HubSpot portal (and only your
HubSpot portal):

- **Communication records** containing message text, timestamp, and
  direction, associated with the matching contact.
- **Custom channel messages** (when the inbox channel is enabled) —
  the same content as the communication records, just in a different
  HubSpot representation.
- **Standard API metadata** required by HubSpot (your Bearer token,
  the request body, request timestamps).

HubMessage does not send to HubSpot:

- Messages from people who don't match any contact in your portal.
- Attachments (the current version is text-only).
- Group chat messages.
- Anything from any file other than `chat.db`.

## What flows through our servers

The vast majority of HubMessage's traffic goes **directly** from your
Mac to `api.hubapi.com` using your OAuth token. A small subset routes
through our Cloudflare Worker at `api.hubmessage.app`:

| Endpoint | Why proxied |
|---|---|
| `POST /oauth/v1/token` | To keep the OAuth `client_secret` out of the macOS binary. |
| `POST /conversations/v3/custom-channels/...` and related | HubSpot requires a developer `hapikey` on every Custom Channels call; we keep that key on the server. |

The worker:

- **Does not log** message bodies, request bodies, or response bodies.
- **Does log** HTTP method, path, status code, IP address, and a
  SHA-256 hash of the Bearer token — for rate-limit enforcement.
  These logs are retained for at most 24 hours.

For more on why this proxy exists and how it's hardened, see the
[Privacy Policy](/legal/privacy-policy/) section "How requests reach
HubSpot".

## What HubMessage does not do

- **No analytics.** HubMessage does not send usage telemetry to us or
  any third party.
- **No crash reports.** If the app crashes, macOS will collect a
  standard crash log on your Mac — HubMessage does not upload it.
- **No tracking identifiers.** No advertising ID, no fingerprint, no
  cross-app identifier.
- **No third-party SDKs** except [Sparkle](https://sparkle-project.org/)
  for auto-updates, which only contacts our update feed URL.
