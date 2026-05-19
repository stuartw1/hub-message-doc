---
title: How sync works
description: A plain-English walkthrough of what SwitchMessage does on every sync tick.
---

SwitchMessage's sync engine is **contacts-first**. It does not try to push every
iMessage you've ever sent into HubSpot. Instead, it asks HubSpot what contacts
you care about, and then only looks at iMessage conversations involving those
people.

This keeps sync fast, predictable, and respectful of HubSpot's rate limits.

## On every tick

By default, SwitchMessage runs a sync cycle every **60 seconds** (you can change
this in [Settings](/guides/settings/)). On each tick it does roughly this:

1. **Check network.** If you're offline, sync is paused; any messages
   captured while offline are queued and synced when you reconnect.
2. **Check the iMessage database modification time.** If `chat.db` hasn't
   been touched since the last successful sync, the cycle exits early.
3. **Refresh contacts.**
   - On first run, fetch the entire contact list from HubSpot.
   - On subsequent runs, fetch only contacts whose `lastmodifieddate` has
     changed since the last fetch.
   - Every 5 minutes, a full refresh runs as a safety net.
4. **Build phone-number variants** for each cached contact (HubSpot stores
   numbers in many formats; iMessage stores them in another). SwitchMessage
   generates the likely E.164 / national / no-prefix variants used by
   iMessage so the join works.
5. **Query iMessage for new messages** only on conversations whose
   identifier matches one of those variants. The SQL `IN (...)` is batched
   at 500 identifiers per query (SQLite has a 999-parameter limit).
6. **For each new message**, build a HubSpot **communication** record:
   - Type: SMS communication
   - Direction: incoming or outgoing
   - Body: the message text
   - Timestamp: the iMessage `date`
   - Associated to: the matched contact (association type 81)
   - `hs_unique_id`: a stable hash of `chat_id + message_guid` (used for
     dedup — see below)
7. **POST the records** to HubSpot. If you have the
   [inbox channel](/guides/inbox-channel/) enabled, the same messages are
   also posted to the custom channel.
8. **Mark each message** as synced in the local SwiftData cache so it
   isn't considered again.

## Deduplication

HubSpot has built-in support for deduplicating communication records by
the `hs_unique_id` property. SwitchMessage relies on that:

- Every record carries an `hs_unique_id` deterministic for the source
  message.
- If SwitchMessage retries a POST that already succeeded, HubSpot returns
  an HTTP 400 with the existing record ID; SwitchMessage treats this as a
  success and moves on.

You should not see duplicate communications under a contact even after
a crash, network blip, or laptop sleep.

## Incremental contact refresh

The contact cache is incremental:

- **Initial load:** every contact in the portal (paginated).
- **Per tick:** fetch contacts whose `lastmodifieddate` is `>=` the
  last refresh timestamp.
- **Every 5 minutes:** a full refresh, as a belt-and-braces step in
  case an incremental fetch missed something due to clock skew.

For a portal with thousands of contacts, this means SwitchMessage uses
very few API calls per minute once it's warmed up.

## Rate limit handling

If HubSpot returns HTTP 429 (rate limit exceeded), SwitchMessage backs off
exponentially: 60s → 120s → 240s → … up to a maximum of 3600s (1 hour).
The next successful response resets the backoff to zero.

This protects both your portal's daily quota and SwitchMessage's own
developer credentials.

## What SwitchMessage **doesn't** sync

To set expectations clearly, the current sync engine:

- Does not sync **attachments** (images, audio, files). It only sends
  the text body of a message.
- Does not sync **read receipts** or **typing indicators**.
- Does not sync **group chats**. Each communication record is associated
  with a single contact; SwitchMessage skips chats with more than one
  non-self participant.
- Does not sync **iMessage reactions** as a separate event. A reaction
  shows up in `chat.db` as a new message; SwitchMessage doesn't currently
  collapse them into the parent message.
- Does not sync messages **from before the date you first installed
  SwitchMessage** by default — only new traffic forwards. (You can change
  this in [Settings](/guides/settings/) if you want a backfill.)

If any of these matter for your workflow, please
[get in touch](/help/contact/) — the priority list is driven by user
requests.
