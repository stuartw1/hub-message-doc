---
title: Subscriptions
description: How HubMessage billing works, who runs the checkout, and how to manage your subscription.
---

HubMessage is a **subscription-based product**. Your subscription unlocks
sync into HubSpot from the app on every Mac you sign in on with the same
account.

Specific plans and prices will be listed on
[hubmessage.app](https://hubmessage.app) when they are finalized. This
page covers the policies that apply regardless of which plan you're on.

## Who handles payments

Payments and recurring billing are processed by
[**Paddle**](https://www.paddle.com/), our Merchant of Record. This means:

- Paddle (not Neko Venture Partners Limited) appears on your bank
  statement and is the entity that issues your invoice / receipt.
- Paddle handles applicable sales tax, VAT, and GST for your country.
- Card details are entered into Paddle's checkout — Neko Venture
  Partners Limited never sees or stores your card number or CVV.

We receive from Paddle only the information needed to associate your
subscription with your HubMessage account: your email address, the
plan, the subscription status, and Paddle's customer/subscription IDs.

## Managing your subscription

You can update your payment method, change plans, switch billing
cycles, or cancel at any time:

- **From inside the app:** HubMessage Settings → **Account** → **Manage
  subscription** opens Paddle's customer portal for your account.
- **From email:** every receipt from Paddle includes a "Manage
  subscription" link.
- **By email:** if you can't access either, write to
  [support@hubmessage.app](mailto:support@hubmessage.app) and we'll
  help.

## Cancellation

Cancelling stops the subscription from renewing at the end of the
current billing period. The app continues to work for the remainder of
that period — you don't lose access immediately on cancellation, and we
do not pro-rate refunds for the unused portion of a billing period by
default. (See [Refunds](#refunds) for when we will.)

## Refunds

**Within 14 days of a payment**, you can request a full refund for any
reason — no questions asked. This applies to:

- The first payment on a new subscription.
- Any recurring renewal payment, counted from the date the renewal was
  charged.
- Plan upgrades, counted from the date the upgrade was charged.

To request a refund, email
[support@hubmessage.app](mailto:support@hubmessage.app) with the
Paddle receipt number (it's at the top of the receipt email) and we'll
process it within a few business days. The refund goes back to the
same card or payment method that was charged.

After 14 days have passed, refunds become discretionary. We're not
unreasonable about it — if something genuinely went wrong, talk to us.

:::caution[Repeated refund requests]
The 14-day refund window is generous on the assumption it'll be used in
good faith. Patterns that look like abuse — for example, repeatedly
subscribing, requesting a refund, then re-subscribing — may be handled
on a case-by-case basis and a refund may be declined.
:::

For the full formal policy, see the [Refund Policy](/legal/refund-policy/).

## Failed payments

If a renewal payment fails (expired card, insufficient funds, etc.):

1. Paddle will email you to ask you to update your payment method.
2. Paddle retries the charge a few times over the following days.
3. If all retries fail, your subscription enters a "past due" state.
   The app will warn you in the menu bar.
4. After Paddle's grace period expires, the subscription is cancelled
   and the app stops syncing.

You can re-subscribe at any time and HubMessage will pick up where it
left off — your local cache and HubSpot data remain in place.
