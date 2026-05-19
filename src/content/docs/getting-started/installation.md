---
title: Installation
description: Download SwitchMessage, grant Full Disk Access, and launch the app.
---

SwitchMessage is distributed as a notarized macOS application. It uses
[Sparkle](https://sparkle-project.org/) to deliver automatic updates, so once
installed you'll get new releases without re-downloading from the website.

## Requirements

- **macOS 14.0 (Sonoma) or later**
- An Apple-silicon or Intel Mac (a universal binary is shipped)
- A HubSpot account with permission to install apps in your portal
- An iMessage account signed in on the same Mac

## 1. Download

Download the latest release from
[switchmessage.com](https://switchmessage.com) (the download links live on the
homepage). The download is a notarized `.dmg` archive.

If your browser warns about the download being from "the internet", that's
normal for any signed Mac app — confirm and continue.

## 2. Install

1. Open the `.dmg` you just downloaded.
2. Drag **SwitchMessage** into your `Applications` folder.
3. Eject the `.dmg` (right-click → Eject), then open `Applications` and
   double-click **SwitchMessage**.
4. The first time you launch it, macOS may show a dialog asking you to
   confirm the app is from an identified developer — click **Open**.

SwitchMessage runs as a **menu bar app**: it has no dock icon. After launch,
look for the SwitchMessage icon in the menu bar at the top right of your
screen and click it to open the popover.

## 3. Grant Full Disk Access

SwitchMessage reads your iMessage history from
`~/Library/Messages/chat.db`. macOS protects this file behind the
**Full Disk Access** privacy entitlement; without it, SwitchMessage cannot
read any messages.

1. Open **System Settings → Privacy & Security → Full Disk Access**.
2. Click the **+** button.
3. Navigate to `Applications`, select **SwitchMessage**, and click **Open**.
4. Make sure the toggle next to SwitchMessage is **on**.
5. **Quit SwitchMessage** (menu bar icon → Quit) and **re-launch** it.

:::caution
SwitchMessage will not sync any messages until Full Disk Access is granted
**and** the app has been restarted after granting it. This is a macOS
requirement, not a SwitchMessage one — the entitlement is only picked up at
launch.
:::

## 4. Launch at login (optional)

If you want SwitchMessage to start automatically when you sign in:

1. Open the SwitchMessage menu bar popover.
2. Click the **gear** icon to open Settings.
3. Under **General**, enable **Launch at login**.

This uses Apple's standard `SMAppService` mechanism. You can also manage
the entry from **System Settings → General → Login Items**.

## Next steps

You're installed. Next, [connect SwitchMessage to your HubSpot
portal](/getting-started/connecting-hubspot/).
