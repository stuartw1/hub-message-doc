---
title: Settings reference
description: Every setting in SwitchMessage and what it does.
---

Open settings from the menu bar popover by clicking the **gear** icon, or with
**⌘,** while the popover is focused.

## General

| Setting | Default | What it does |
|---|---|---|
| Launch at login | Off | Starts SwitchMessage automatically when you sign in to your Mac. Uses `SMAppService`. |
| Show in menu bar | On | Toggle the menu bar icon visibility. (Quitting also hides it.) |
| Notifications | On | Show macOS notifications for sync errors and credentials expiry. |

## HubSpot

| Setting | What it does |
|---|---|
| Sign in / Sign out | Start an OAuth flow, or revoke the local OAuth token. Sign-out clears tokens from Keychain but leaves your local message cache intact. |
| Private App token | Paste a HubSpot Private App access token as an alternative to OAuth. |
| Portal info | Read-only display of the connected portal name and account ID. |

## Sync

| Setting | Default | What it does |
|---|---|---|
| Sync interval | 60 s | How often the sync engine wakes up to look for new messages. Minimum 30 s, maximum 1 hr. |
| Backfill window | Off | If enabled, on first sign-in SwitchMessage will also sync messages older than the sign-in date, going back the chosen number of days. |
| Pause when on battery | Off | Skip sync ticks when your Mac is unplugged. Useful on long flights. |
| Pause when on metered network | On | Skip sync ticks when macOS reports the active connection as metered. |

## Inbox

| Setting | What it does |
|---|---|
| iMessage channel | Create / remove the Custom Channel in HubSpot conversations. See [The HubSpot inbox channel](/guides/inbox-channel/). |
| Delivery identifier | Auto-detected from your HubSpot owner profile (phone number). Override here if your iMessage account uses a different number. |

## Advanced

| Setting | What it does |
|---|---|
| Show debug log | Open the in-app log viewer. Logs are PII-redacted (phone numbers truncated to last 3 digits, emails to domain only, message bodies hidden). |
| Export debug log | Save the current debug log to disk for sending to support. |
| Clear local cache | Delete the local SwiftData store. Messages will be re-read from iMessage on the next sync; duplicates in HubSpot are skipped server-side via `hs_unique_id`. |
| Full Reset & Sign Out | **Destructive.** Deletes all HubSpot communication records SwitchMessage created, removes the custom inbox channel, clears the local cache, deletes Keychain credentials. Leaves no trace. See [Resetting & signing out](/guides/reset/). |
| Check for updates now | Manually trigger a Sparkle update check. |

## Where settings are stored

- **Configuration**: `~/Library/Preferences/com.switchmessage.app.plist`
- **Local message cache**: `~/Library/Containers/com.switchmessage.app/Data/Library/Application Support/`
- **Credentials**: macOS Keychain, service name `com.switchmessage.app`
- **Debug logs**: `~/Library/Application Support/SwitchMessage/Logs/` (one file per launch; older files rotate automatically)
