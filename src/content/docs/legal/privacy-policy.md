---
title: Privacy Policy
description: How Neko Venture Partners Limited handles your personal data when you use HubMessage.
---

**Effective date:** 15 May 2026
**Last updated:** 15 May 2026

HubMessage ("the app", "we", "our") is a macOS menu bar utility that reads
messages from your local iMessage database and syncs them to your HubSpot
CRM. This document explains exactly what the app processes, what it stores,
and where your data goes.

If you are evaluating whether to install HubMessage, please read this in
full. By signing in to HubSpot through the app, you consent to the
processing described below.

## 1. Who is the data controller?

**Neko Venture Partners Limited** ("we") is the data controller for the
data the app stores about you on your own Mac and the limited
operational data our servers process when the app calls HubSpot
through our proxy. We do **not** operate a server that collects,
aggregates, or analyses your message content. The Cloudflare Worker we
run at `api.hubmessage.app` is a stateless proxy used only to inject
API keys into requests you make to HubSpot — it does not log message
bodies or store any user-identifiable data beyond standard request
metadata required for rate-limiting (hashed bearer tokens and IP
addresses, retained for at most 24 hours).

For data we send to HubSpot, **HubSpot, Inc. is the data controller**.
Their privacy policy governs what they do with it:
[https://legal.hubspot.com/privacy-policy](https://legal.hubspot.com/privacy-policy).

For subscription payments, **Paddle.com Market Limited** is our
Merchant of Record and the controller for payment data they process on
our behalf. Their privacy policy:
[https://www.paddle.com/legal/privacy](https://www.paddle.com/legal/privacy).

## 2. What data the app processes

### Read locally from your Mac

- **iMessage content** from `~/Library/Messages/chat.db`: message
  text, timestamps, sender/recipient identifiers (phone numbers and
  email addresses), and direction (incoming/outgoing). Reading this
  file requires you to grant Full Disk Access in System Settings; the
  app cannot read it otherwise.
- **macOS user defaults and Keychain** that the app itself writes —
  for example, sync intervals you configure, your HubSpot OAuth
  tokens, and the numeric IDs HubSpot returns for your custom
  channel.

### Fetched from HubSpot

- **Contacts** from your HubSpot CRM (name, phone number, email) so
  the app can match incoming iMessages to the correct contact record.
  The app caches contacts in memory and on disk to minimise API
  calls.
- **Owner profile** (your name, email, phone number from your
  HubSpot user profile) — used to determine which "delivery
  identifier" to attach to the custom channel.

### Sent to HubSpot

- **Communication records** containing your message text, timestamp,
  direction, and the associated contact ID. These appear in HubSpot
  as "SMS" communications and are visible in your HubSpot inbox.
- **Custom channel messages** (when the inbox feature is configured)
  representing the same content in HubSpot's Conversations Inbox.

### Processed by Paddle when you subscribe

- **Payment details** (card number, billing address) — entered
  directly into Paddle's checkout. We never see or store your full
  card number.
- **Email address and subscription state** — shared back to us so we
  can match your subscription to your HubMessage account.

## 3. What the app does NOT collect

- **Analytics**: the app does not send any usage telemetry.
- **Crash reports**: the app does not collect or send crash reports.
- **Tracking identifiers**: the app does not generate or store any
  cross-app or cross-device tracking identifier.
- **Third-party SDKs**: the only external library bundled with the app
  is Sparkle (for auto-updates). Sparkle communicates only with the
  update feed URL configured at build time; it does not collect
  analytics.

## 4. Where data is stored

| Data | Location | Retention |
|------|----------|-----------|
| Cached iMessage records | Local SwiftData database in the app's container | Until you "Clear Local Cache" or "Full Reset & Sign Out" |
| OAuth access / refresh tokens | macOS Keychain (your user account) | Until you sign out |
| Sync configuration | macOS user defaults (`uk.nvpartners.hubmessage`) | Until you reset macOS preferences or run a Full Reset |
| Debug log | A file under `~/Library/Application Support/HubMessage/Logs/` (one per app launch) | Until you delete it; the app also rotates older files |
| Communication records | Your HubSpot portal | Per your HubSpot retention policy |
| Proxy request metadata | Cloudflare Worker (`api.hubmessage.app`) | At most 24 hours |
| Subscription record | Paddle and our subscription database | For the life of your account plus 7 years for tax records, as required by UK law |

## 5. How requests reach HubSpot

Most API calls go directly from your Mac to `api.hubapi.com` using your
OAuth access token; we never see them. A small subset (HubSpot's
"Custom Channels" endpoints and the OAuth token-exchange endpoint)
route through our Cloudflare Worker at `api.hubmessage.app`, which:

- Adds the HubSpot developer API key / OAuth client secret server-side
  so those secrets never ship on your Mac.
- Validates that the request matches a small allowlist of HubSpot
  routes.
- Rate-limits per IP and per bearer-token hash to prevent abuse of
  our developer credentials.

The Worker does **not** log request or response bodies. It logs only
HTTP status codes, paths, hashed bearer tokens, and IP addresses (for
rate-limit enforcement), retained for at most 24 hours.

## 6. Your rights and controls

- **Sign out**: stops all background syncing and clears tokens from
  Keychain (the local message cache is preserved).
- **Clear Local Cache**: deletes the local SwiftData store. Messages
  are re-read from iMessage on the next sync; duplicates in HubSpot
  are skipped server-side.
- **Full Reset & Sign Out**: deletes all HubSpot communication
  records the app created, removes the custom channel from your
  inbox, clears the local cache, and signs you out. Use this to
  leave no trace of the app's activity in HubSpot.
- **Revoke OAuth**: you can also revoke the HubMessage app's access
  from inside HubSpot at any time. The app will then prompt you to
  re-sign in or quit it.

Under UK GDPR and the UK Data Protection Act 2018, you have the right
to access, rectify, erase, restrict, or port the personal data we hold
about you, and to object to processing. We hold almost none — only
what you've configured locally on your own Mac, the limited proxy
metadata described above, and your subscription record at Paddle.
To exercise these rights, contact us at
[support@hubmessage.app](mailto:support@hubmessage.app).

You also have the right to lodge a complaint with the UK Information
Commissioner's Office ([ico.org.uk](https://ico.org.uk)) if you
believe we have processed your personal data unlawfully.

## 7. International transfers

Our infrastructure is hosted on Cloudflare's global edge network; your
requests are routed to the nearest Cloudflare data centre. Where data
crosses borders, transfers are protected by the appropriate safeguards
(Cloudflare's Standard Contractual Clauses where relevant).

HubSpot is a US-headquartered company; data sent to your HubSpot
portal is processed according to HubSpot's own international transfer
mechanisms.

## 8. Children's privacy

HubMessage is not directed at children under 13 and we do not
knowingly process data about them. If you believe we have done so in
error, please contact us and we will delete it.

## 9. Changes to this policy

Any material change will be reflected in a new version of the app and
this document; the "Last updated" date above will change accordingly.
Material changes will also be communicated through the in-app release
notes.

## 10. Contact

Questions about this policy, or to exercise your data-protection
rights, email
[support@hubmessage.app](mailto:support@hubmessage.app).

Neko Venture Partners Limited
United Kingdom
