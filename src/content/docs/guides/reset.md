---
title: Resetting & signing out
description: Three levels of clean-up, from "sign out" to "leave no trace".
---

HubMessage offers three levels of clean-up depending on how much state you want
to remove.

## 1. Sign out

**Settings → HubSpot → Sign out.**

What it does:

- Deletes OAuth tokens (or the Private App token) from your macOS Keychain.
- Stops the background sync timer.
- **Keeps** the local message cache on disk.
- **Keeps** HubSpot communication records and the inbox channel intact.

When to use it: you want to switch portals, hand off the Mac to someone
else for the day, or just stop syncing temporarily.

## 2. Clear local cache

**Settings → Advanced → Clear local cache.**

What it does:

- Deletes the local SwiftData store of "messages we've already synced".
- The next sync tick will re-read iMessage from the beginning of the
  sync window and re-evaluate everything.
- Duplicates are **not** created in HubSpot because of `hs_unique_id`
  deduplication.

When to use it: troubleshooting "stuck" sync state, or after a long
period of being signed out when you want HubMessage to re-check what
it would have synced.

## 3. Full Reset & Sign Out

**Settings → Advanced → Full Reset & Sign Out.**

:::danger
This is destructive. It deletes data from your HubSpot portal that
HubMessage created. There is no undo.
:::

What it does, in order:

1. Stops background sync.
2. **Deletes every HubSpot communication record HubMessage created.**
   The records are identified by being authored by the HubMessage app
   and having an `hs_unique_id` that matches the HubMessage format.
3. Removes the custom iMessage channel from your conversations inbox.
4. Wipes the local SwiftData cache.
5. Resets all in-memory sync state.
6. Deletes Keychain credentials.
7. Signs out of OAuth (revokes the refresh token server-side, where
   possible).

After a full reset, HubMessage is in the same state as a fresh install.
Communications created by other apps or by manual entry in HubSpot are
**not** touched.

When to use it: you're uninstalling HubMessage, you're handing the
portal over to a different team, or you want to start completely
clean.

## Uninstalling the app

After a full reset (or sign-out, if you don't mind the cache file
remaining), you can uninstall HubMessage by:

1. Quitting it from the menu bar.
2. Dragging **HubMessage.app** from `/Applications` to the Trash.

If you want to remove every trace of HubMessage from your Mac,
also delete:

- `~/Library/Preferences/uk.nvpartners.hubmessage.plist`
- `~/Library/Containers/uk.nvpartners.hubmessage/`
- `~/Library/Application Support/HubMessage/`
- Keychain items under service name `uk.nvpartners.hubmessage` (Keychain
  Access app → search "hubmessage")
