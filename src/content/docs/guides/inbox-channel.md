---
title: The HubSpot inbox channel
description: How HubMessage's custom iMessage channel works inside HubSpot's conversations inbox.
---

In addition to logging every message as a communication record on a contact,
HubMessage can stream messages into a dedicated **iMessage channel** in your
HubSpot conversations inbox. This lets your team see, search, and reply to
iMessage threads alongside email and live chat — without leaving HubSpot.

## What it does

When the inbox channel is enabled, every synced message is posted to a
**Custom Channel** named "iMessage" in HubSpot. The result:

- Each iMessage conversation appears as a thread under the channel.
- The thread is associated with the matching HubSpot contact.
- Inbound messages show up in real time (within one sync tick).
- Outbound messages you send from iMessage on your Mac also show up
  in the inbox — useful for keeping the team in the loop on customer
  replies you handle personally.

## Enabling it

1. Open HubMessage Settings → **Inbox**.
2. Click **Set up iMessage channel**.
3. HubMessage will:
   - Create a Custom Channel named "iMessage" on your portal (if one
     doesn't already exist).
   - Attach it to your default conversations inbox.
   - Save the channel ID to your local settings.
4. After setup, new messages will start flowing into the inbox on the
   next sync tick.

## Requirements

- Your HubSpot subscription must include the **Conversations Inbox**
  (HubSpot's Service Hub or any paid tier). The Custom Channels API is
  not available on the free tier.
- You must have authorized HubMessage with the
  `conversations.custom_channels.*` scopes — see
  [Connecting to HubSpot](/getting-started/connecting-hubspot/).

## Replies from inside HubSpot

Reply-from-HubSpot is **not yet supported** in the current release.
HubMessage streams messages **in** (read-only into HubSpot); replies
must still be sent from iMessage on your Mac. Two-way reply support is
on the roadmap — see [Contact support](/help/contact/) if it would
unlock value for you, so we can prioritize accordingly.

## Disabling it

To remove the channel:

1. Open HubMessage Settings → **Inbox**.
2. Click **Remove iMessage channel**.

This deletes the channel from your portal and stops new messages from
being posted. Communication records on contacts are **not** removed
(use [Full Reset & Sign Out](/guides/reset/) if you also want to delete
those).

## Why it's a proxy, not a direct call

The Custom Channels endpoint is the one HubSpot API on the planet that
still requires **both** an OAuth Bearer token *and* a developer
`hapikey` query parameter on every request. To keep the developer key
out of the Mac binary (where any user could extract it and abuse our
developer account), HubMessage routes those specific requests through
our Cloudflare Worker at `api.hubmessage.app`, which injects the
developer key server-side.

The worker is stateless and does not log message bodies. See the
[Privacy Policy](/legal/privacy-policy/) for the full data flow.
