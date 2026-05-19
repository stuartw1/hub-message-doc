---
title: Troubleshooting
description: Common problems and how to fix them.
---

If something below doesn't help, please
[email support](/help/contact/) and include your debug log
(**Settings → Advanced → Export debug log**).

## "No messages are syncing"

**Most likely cause: Full Disk Access wasn't granted, or the app
wasn't restarted after granting it.**

Check:

1. Open **System Settings → Privacy & Security → Full Disk Access**.
   Make sure **SwitchMessage** is in the list and the toggle is on.
2. **Quit** SwitchMessage from the menu bar and **re-launch** it. macOS
   only picks up the entitlement at launch.
3. Open the menu bar popover — the status row should now read
   "Syncing" rather than "Full Disk Access required".

Other possibilities:

- **Your iMessage participants don't match any HubSpot contacts.**
  SwitchMessage only syncs conversations involving people who exist in
  your portal. Add the contact in HubSpot first.
- **Sync is paused.** Settings → Sync — make sure "Pause when on
  battery" / "Pause when on metered network" aren't kicking in.
- **You're rate-limited.** Check the debug log for "429" responses;
  SwitchMessage backs off exponentially in that case (see
  [How sync works](/guides/how-sync-works/#rate-limit-handling)).

## "OAuth sign-in just hangs"

**Most likely cause: Safari.**

Safari refuses to redirect to `http://localhost`, which is what
HubSpot needs to send the OAuth callback to. Workaround:

1. Set Firefox or Chrome as your **default browser** in
   System Settings → Desktop & Dock → Default web browser.
2. Click **Sign in with HubSpot** in SwitchMessage again.
3. Complete sign-in in the new default browser.
4. Switch your default browser back to Safari afterwards if you like.

This is a Safari restriction, not a HubSpot or SwitchMessage bug, and
HubSpot does not currently support a custom URL scheme
(`switchmessage://`) as an alternative redirect target.

## "Contacts I just added in HubSpot don't pick up"

SwitchMessage refreshes the contact cache:

- **Incrementally** on every sync tick (every 60s by default).
- **Fully** every 5 minutes as a safety net.

So new contacts should appear in SwitchMessage within ~1 minute. If
they don't:

- Confirm the contact has a **phone number** field set. SwitchMessage
  matches iMessage participants by phone number (or email, for the
  email-based iMessage accounts).
- The number should be in HubSpot in any reasonable format (E.164,
  international with spaces, national-format — SwitchMessage tries
  several variants). What it can't handle is a contact with no
  phone number at all.

## "I'm getting 401 Unauthorized errors"

Your OAuth token has expired and the refresh didn't succeed (this can
happen if HubSpot revoked the token at the portal side, or if
SwitchMessage was offline for longer than the refresh-token validity).

Fix:

1. Settings → HubSpot → **Sign out**.
2. Sign in again with **Sign in with HubSpot**.

## "Communications appear under the wrong contact"

This usually means two HubSpot contacts share a phone number (e.g. a
shared family or office number). SwitchMessage attaches the
communication to the first contact it finds that matches; HubSpot
doesn't currently let an API caller distinguish between them.

Workarounds:

- Deduplicate the contacts in HubSpot.
- Or, set a "merge" rule in HubSpot for the duplicated number.

If a clean answer to this would unblock your workflow, please
[get in touch](/help/contact/) — multi-contact association is on the
roadmap.

## "The inbox channel disappeared"

If you (or another admin) deleted the iMessage Custom Channel from
HubSpot directly, SwitchMessage will notice on the next sync tick and
flag it in Settings → Inbox. To restore:

1. Settings → Inbox → **Set up iMessage channel** (this re-creates
   it).
2. Existing communication records on contacts are unaffected;
   only the inbox channel feed needs to be re-created.

## "Sync got stuck after my Mac slept for a long time"

This is rare but if you suspect it:

1. Settings → Advanced → **Clear local cache**. The next sync tick
   will re-evaluate everything; HubSpot's `hs_unique_id` dedup
   prevents duplicates.

If the cache clear doesn't help, [export the debug log](/help/contact/)
and send it to support.
