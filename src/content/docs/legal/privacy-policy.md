---
title: Privacy Policy
description: How Neko Venture Partners Limited handles your personal data when you use SwitchMessage.
---

**Effective date:** 18 May 2026
**Last updated:** 18 May 2026

SwitchMessage ("the app", "we", "our") is a macOS menu bar utility that reads
messages from your local iMessage database and syncs them to your HubSpot
CRM. This document explains exactly what the app processes, what it stores,
and where your data goes.

If you are evaluating whether to install SwitchMessage, please read this in
full. By signing in to HubSpot through the app, you consent to the
processing described below.

## 1. Who is the data controller?

**Neko Venture Partners Limited** ("we") is the data controller for the data
the app stores about you on your own Mac and the limited operational data
our servers process when the app calls HubSpot through our proxy. We are a
company registered in England and Wales under company number **14784729**,
with our registered office at **71–75 Shelton Street, Covent Garden, London,
WC2H 9JQ, United Kingdom**. We do **not** operate a server that collects,
aggregates, or analyses your message content. The Cloudflare Worker we run
at `api.switchmessage.com` is a stateless proxy used only to inject API keys
into requests you make to HubSpot — it does not log message bodies or store
any user-identifiable data beyond standard request metadata required for
rate-limiting (hashed bearer tokens and IP addresses, retained for at most
24 hours).

For data we send to HubSpot, **HubSpot, Inc. is the data controller**. Their
privacy policy governs what they do with it:
[https://legal.hubspot.com/privacy-policy](https://legal.hubspot.com/privacy-policy).

For subscription payments, **Paddle.com Market Limited** is our Merchant of
Record and the controller for payment data they process on our behalf. Their
privacy policy:
[https://www.paddle.com/legal/privacy](https://www.paddle.com/legal/privacy).

## 2. Which privacy laws apply

Our processing is governed by the **UK GDPR** and the **UK Data Protection
Act 2018**.

SwitchMessage is **not currently offered to residents of the European
Economic Area (EEA)**, and checkout is restricted to non-EEA countries.
Because the service is not offered there, this policy does not describe the
additional rights, transfer mechanisms, and supervisory-authority routes
that the EU GDPR would add — they do not currently apply. This policy will
be updated before that changes.

If you are in the EEA and would like to use SwitchMessage, you can register
your interest at
[support@switchmessage.com](mailto:support@switchmessage.com) and we will
let you know if and when we begin offering the service in the EEA.

California residents have additional rights described in Section 8.

## 3. What data the app processes

### Read locally from your Mac

- **iMessage content** from `~/Library/Messages/chat.db`: message text,
  timestamps, sender/recipient identifiers (phone numbers and email
  addresses), and direction (incoming/outgoing). Reading this file requires
  you to grant Full Disk Access in System Settings; the app cannot read it
  otherwise.
- **macOS user defaults and Keychain** that the app itself writes — for
  example, sync intervals you configure, your HubSpot OAuth tokens, and the
  numeric IDs HubSpot returns for your custom channel.

### Fetched from HubSpot

- **Contacts** from your HubSpot CRM (name, phone number, email) so the app
  can match incoming iMessages to the correct contact record. The app caches
  contacts in memory and on disk to minimise API calls.
- **Owner profile** (your name, email, phone number from your HubSpot user
  profile) — used to determine which "delivery identifier" to attach to the
  custom channel.

### Sent to HubSpot

- **Communication records** containing your message text, timestamp,
  direction, and the associated contact ID. These appear in HubSpot as "SMS"
  communications and are visible in your HubSpot inbox.
- **Custom channel messages** (when the inbox feature is configured)
  representing the same content in HubSpot's Conversations Inbox.

### Processed by Paddle when you subscribe

- **Payment details** (card number, billing address) — entered directly into
  Paddle's checkout. We never see or store your full card number.
- **Email address and subscription state** — shared back to us so we can
  match your subscription to your SwitchMessage account.

## 4. What the app does NOT collect

- **Analytics**: the app does not send any usage telemetry.
- **Crash reports**: the app does not collect or send crash reports.
- **Tracking identifiers**: the app does not generate or store any cross-app
  or cross-device tracking identifier.
- **Third-party SDKs**: the only external library bundled with the app is
  Sparkle (for auto-updates). Sparkle is configured to fetch the update feed
  only; the optional system-profiling feature (`SUEnableSystemProfiling`) is
  disabled, so no analytics or system information is sent with update checks.

## 5. Where data is stored

| Data | Location | Retention |
|------|----------|-----------|
| Cached iMessage records | Local SwiftData database in the app's container | Until you "Clear Local Cache" or "Full Reset & Sign Out" |
| OAuth access / refresh tokens | macOS Keychain (your user account) | Until you sign out |
| Sync configuration | macOS user defaults (`uk.nvpartners.hubmessage`) | Until you reset macOS preferences or run a Full Reset |
| Debug log | A file under `~/Library/Application Support/SwitchMessage/Logs/` (one per app launch) | Until you delete it; the app also rotates older files |
| Communication records | Your HubSpot portal | Per your HubSpot retention policy |
| Proxy request metadata | Cloudflare Worker (`api.switchmessage.com`) | At most 24 hours |
| Subscription record | Paddle and our subscription database | For the life of your account plus 7 years for tax records, as required by UK law |

## 6. How requests reach HubSpot

Most API calls go directly from your Mac to `api.hubapi.com` using your OAuth
access token; we never see them. A small subset (HubSpot's "Custom Channels"
endpoints and the OAuth token-exchange endpoint) route through our Cloudflare
Worker at `api.switchmessage.com`, which:

- Adds the HubSpot developer API key / OAuth client secret server-side so
  those secrets never ship on your Mac.
- Validates that the request matches a small allowlist of HubSpot routes.
- Rate-limits per IP and per bearer-token hash to prevent abuse of our
  developer credentials.

The Worker does **not** log request or response bodies. It logs only HTTP
status codes, paths, hashed bearer tokens, and IP addresses (for rate-limit
enforcement), retained for at most 24 hours.

## 7. Subprocessors

We use a small number of subprocessors to run the service. Each is bound by
a data-processing agreement that requires them to process personal data only
on our instructions and to maintain appropriate security measures.

| Subprocessor | Purpose | Data shared | Location |
|---|---|---|---|
| Cloudflare, Inc. | Hosts the marketing site, docs site, and the API proxy Worker | Request metadata (IP, path, hashed bearer token) for ≤ 24 h | Global edge — request routed to nearest data centre |
| Paddle.com Market Limited | Merchant of Record — checkout, billing, tax, invoicing, refunds | Name, email, billing address, payment details, subscription state | United Kingdom (Paddle HQ); payment networks operate globally |
| HubSpot, Inc. | The CRM your iMessage data syncs into (you choose to connect it) | The communication records the app sends to your HubSpot portal | United States |

We will give at least **30 days' notice** in this policy before adding a new
subprocessor or replacing one of the above. If you object to a new
subprocessor, your remedy is to cancel your subscription (see the
[Refund Policy](/legal/refund-policy/)).

## 8. Your rights and controls

### Controls inside the app

- **Sign out**: stops all background syncing and clears tokens from Keychain
  (the local message cache is preserved).
- **Clear Local Cache**: deletes the local SwiftData store. Messages are
  re-read from iMessage on the next sync; duplicates in HubSpot are skipped
  server-side.
- **Full Reset & Sign Out**: deletes all HubSpot communication records the
  app created, removes the custom channel from your inbox, clears the local
  cache, and signs you out. Use this to leave no trace of the app's activity
  in HubSpot.
- **Revoke OAuth**: you can also revoke the SwitchMessage app's access from
  inside HubSpot at any time. The app will then prompt you to re-sign in or
  quit it.

### UK residents (UK GDPR)

You have the right to access, rectify, erase, restrict, or port the personal
data we hold about you, and to object to processing. We hold almost none —
only what you've configured locally on your own Mac, the limited proxy
metadata described above, and your subscription record at Paddle. To
exercise these rights, contact us at
[support@switchmessage.com](mailto:support@switchmessage.com).

You also have the right to lodge a complaint with the UK Information
Commissioner's Office ([ico.org.uk](https://ico.org.uk)) if you believe we
have processed your personal data unlawfully.

### California residents (CCPA / CPRA)

If you are a California resident, the California Consumer Privacy Act (CCPA),
as amended by the California Privacy Rights Act (CPRA), gives you:

- **The right to know** what personal information we collect about you,
  where it came from, the purposes for which we use it, and the categories
  of third parties with whom we share it.
- **The right to delete** personal information we hold about you, subject to
  limited exceptions (for example, where retention is required by law).
- **The right to correct** inaccurate personal information.
- **The right to opt out of "sale" or "sharing"** of personal information.
  **We do not sell or share personal information** as those terms are
  defined in California law, including for cross-context behavioural
  advertising.
- **The right to limit the use of sensitive personal information**. We do
  not use sensitive personal information for any purpose beyond what is
  necessary to provide the service you've requested.
- **The right to non-discrimination** for exercising any of the above
  rights.

To exercise any of these rights, email
[support@switchmessage.com](mailto:support@switchmessage.com) from the
address associated with your SwitchMessage account. We will verify your
identity by replying to that address and will respond within 45 days
(extendable by a further 45 days if reasonably necessary, in which case we
will tell you).

## 9. International transfers

Our infrastructure is hosted on Cloudflare's global edge network; your
requests are routed to the nearest Cloudflare data centre, which may be
outside the UK. Transfers of UK users' personal data to Cloudflare are
protected by the **UK International Data Transfer Agreement (IDTA)** or the
**UK Addendum to the EU Standard Contractual Clauses**, as applicable.

HubSpot is a US-headquartered company. Data you sync to your HubSpot portal
is transferred to HubSpot's US infrastructure under HubSpot's certification
to the **UK Extension to the EU–U.S. Data Privacy Framework**, with the UK
IDTA as a fallback safeguard for any transfer not covered by that
certification.

Paddle is a UK-headquartered company; payments are processed by Paddle's UK
entity, with onward transfers to global payment networks under the
safeguards described in Paddle's own privacy policy.

## 10. Data breach notifications

We follow the breach-notification requirements of the UK GDPR:

- If we become aware of a personal-data breach that is likely to result in a
  risk to your rights and freedoms, we will notify the UK Information
  Commissioner's Office **without undue delay and, where feasible, within 72
  hours** of becoming aware of it.
- If the breach is likely to result in a **high** risk to your rights and
  freedoms, we will notify you directly at the email address associated with
  your account, without undue delay, with a description of what happened,
  the categories of data affected, the steps we have taken or propose to
  take, and what you can do.

## 11. About this website

This policy is primarily about the SwitchMessage Mac app. The marketing site
at `switchmessage.com` is a static site with no analytics, no third-party
trackers, and no cookies set by us. We do load the Inter font stylesheet
from `rsms.me`; that request transmits your IP address and User-Agent to
`rsms.me` as any HTTP request would, but no cookies are exchanged and we
receive no analytics about your visit.

Our documentation site (`docs.switchmessage.com`) and download host
(`download.switchmessage.com`) behave the same way.

## 12. Children's privacy

SwitchMessage is not directed at children under **16 years of age**, or any
higher minimum age required by the law of your country, and we do not
knowingly process data about them. If you believe we have done so in error,
please contact us and we will delete it.

## 13. Changes to this policy

Any material change will be reflected in a new version of the app and this
document; the "Last updated" date above will change accordingly. Material
changes will also be communicated through the in-app release notes.

## 14. Contact

Questions about this policy, or to exercise your data-protection rights,
email [support@switchmessage.com](mailto:support@switchmessage.com).

**Neko Venture Partners Limited**
71–75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom
Registered in England and Wales · Company number 14784729
