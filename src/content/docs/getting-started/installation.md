---
title: Installation
description: Download HubMessage, grant Full Disk Access, and launch the app.
---

HubMessage is distributed as a notarized macOS application. It uses
[Sparkle](https://sparkle-project.org/) to deliver automatic updates, so once
installed you'll get new releases without re-downloading from the website.

## Requirements

- **macOS 14.0 (Sonoma) or later**
- An Apple-silicon or Intel Mac (a universal binary is shipped)
- A HubSpot account with permission to install apps in your portal
- An iMessage account signed in on the same Mac

## 1. Download

Download the latest release from
[hubmessage.app](https://hubmessage.app) (the download links live on the
homepage). The download is a notarized `.dmg` archive.

If your browser warns about the download being from "the internet", that's
normal for any signed Mac app — confirm and continue.

## 2. Install

1. Open the `.dmg` you just downloaded.
2. Drag **HubMessage** into your `Applications` folder.
3. Eject the `.dmg` (right-click → Eject), then open `Applications` and
   double-click **HubMessage**.
4. The first time you launch it, macOS may show a dialog asking you to
   confirm the app is from an identified developer — click **Open**.

HubMessage runs as a **menu bar app**: it has no dock icon. After launch,
look for the HubMessage icon in the menu bar at the top right of your
screen and click it to open the popover.

## 3. Grant Full Disk Access

HubMessage reads your iMessage history from
`~/Library/Messages/chat.db`. macOS protects this file behind the
**Full Disk Access** privacy entitlement; without it, HubMessage cannot
read any messages.

1. Open **System Settings → Privacy & Security → Full Disk Access**.
2. Click the **+** button.
3. Navigate to `Applications`, select **HubMessage**, and click **Open**.
4. Make sure the toggle next to HubMessage is **on**.
5. **Quit HubMessage** (menu bar icon → Quit) and **re-launch** it.

:::caution
HubMessage will not sync any messages until Full Disk Access is granted
**and** the app has been restarted after granting it. This is a macOS
requirement, not a HubMessage one — the entitlement is only picked up at
launch.
:::

## 4. Launch at login (optional)

If you want HubMessage to start automatically when you sign in:

1. Open the HubMessage menu bar popover.
2. Click the **gear** icon to open Settings.
3. Under **General**, enable **Launch at login**.

This uses Apple's standard `SMAppService` mechanism. You can also manage
the entry from **System Settings → General → Login Items**.

## Next steps

You're installed. Next, [connect HubMessage to your HubSpot
portal](/getting-started/connecting-hubspot/).
