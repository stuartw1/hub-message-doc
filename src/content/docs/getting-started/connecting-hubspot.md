---
title: Connecting to HubSpot
description: Sign in to SwitchMessage with OAuth, or use a HubSpot Private App token.
---

SwitchMessage needs access to your HubSpot portal to:

- read your contacts (to match iMessage participants against them),
- create **communication** records under those contacts, and
- (optionally) post messages into a **custom inbox channel**.

You can authorize SwitchMessage with either **OAuth** (recommended) or a
**Private App access token**.

## Option A: Sign in with OAuth (recommended)

1. Open the SwitchMessage menu bar popover.
2. Click **Sign in with HubSpot**.
3. Your browser will open to HubSpot's authorization page. Pick the
   portal you want to connect and click **Connect app**.
4. The browser will redirect to a local URL on your Mac
   (`http://localhost:8491/oauth/callback`). SwitchMessage handles the
   redirect automatically and the popover updates to show you're
   signed in.

OAuth gives SwitchMessage a refresh token, so it can keep syncing in the
background without you having to re-authenticate.

:::caution[Use Firefox or Chrome for sign-in]
Safari blocks redirects to `http://localhost`, which breaks the OAuth
callback. If sign-in appears to hang in Safari, set Firefox or Chrome
as your default browser temporarily, complete sign-in, and then switch
back. This is a Safari restriction; HubSpot does not currently support
custom URL schemes (`switchmessage://`) for redirects.
:::

### Scopes SwitchMessage requests

| Scope | Why |
|---|---|
| `oauth` | Required by HubSpot for any OAuth app. |
| `crm.objects.contacts.read` | Find contacts to match against iMessage participants. |
| `crm.objects.contacts.write` | Update `lastmodifieddate` after creating communications (HubSpot does this automatically; the scope is required to receive change events). |
| `crm.objects.owners.read` | Read your owner profile to pick the right delivery identifier for the inbox channel. |
| `conversations.read` / `conversations.write` | Read and write threads in the HubSpot inbox. |
| `conversations.custom_channels.read` / `conversations.custom_channels.write` | Create and update the custom iMessage channel. |

SwitchMessage **does not** request marketing, file, deal, ticket, or any
other scopes. You can revoke access at any time from inside HubSpot
(**Settings → Integrations → Connected Apps**).

## Option B: Private App access token

If you'd rather not use OAuth (for example, for a portal where you
don't have permission to install OAuth apps), you can provide a
HubSpot **Private App** access token.

1. In HubSpot, go to **Settings → Integrations → Private Apps**.
2. Click **Create a private app**.
3. Give it a name (e.g. *SwitchMessage Sync*).
4. Under **Scopes**, enable every scope listed in the table above.
5. Click **Create app**, then copy the **Access token** shown.
6. In SwitchMessage, open Settings → **HubSpot** → **Private App token**.
7. Paste the token and click **Save**.

:::note
The custom inbox channel feature requires the
`conversations.custom_channels.*` scopes. If those aren't enabled on
your Private App, SwitchMessage will still log communications under
contacts but the inbox channel will be disabled.
:::

## Where credentials are stored

OAuth tokens and Private App tokens are stored exclusively in your
**macOS Keychain** under the service name
`com.switchmessage.app`. They are never written to disk in plain
text and never sent anywhere except to HubSpot.

To remove credentials, open Settings → **HubSpot** and click
**Sign out**, or perform a full reset (see
[Resetting & signing out](/guides/reset/)).

## Next steps

Once you're connected, SwitchMessage will perform an initial contact
fetch and start syncing. See [How sync works](/guides/how-sync-works/)
to understand what happens behind the scenes, or
[The HubSpot inbox channel](/guides/inbox-channel/) to set up
two-way conversation threading.
