// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.hubmessage.app',
  trailingSlash: 'ignore',
  integrations: [
    starlight({
      title: 'HubMessage Docs',
      description:
        'Documentation for HubMessage — the macOS menu bar app that syncs iMessages to HubSpot CRM.',
      favicon: '/favicon.svg',
      social: [
        { icon: 'external', label: 'Homepage', href: 'https://hubmessage.app' },
        { icon: 'email', label: 'Support', href: 'mailto:support@hubmessage.app' },
      ],
      editLink: {
        // Internal repo; expose for now in case a future contributor needs it.
        baseUrl: 'https://github.com/stuartw1/hub-message-doc/edit/main/',
      },
      lastUpdated: true,
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Welcome', slug: 'index' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Connecting to HubSpot', slug: 'getting-started/connecting-hubspot' },
          ],
        },
        {
          label: 'Using HubMessage',
          items: [
            { label: 'How sync works', slug: 'guides/how-sync-works' },
            { label: 'The HubSpot inbox channel', slug: 'guides/inbox-channel' },
            { label: 'Settings reference', slug: 'guides/settings' },
            { label: 'Resetting & signing out', slug: 'guides/reset' },
          ],
        },
        {
          label: 'Privacy & security',
          items: [{ label: 'What HubMessage accesses', slug: 'privacy/data-handling' }],
        },
        {
          label: 'Billing',
          items: [{ label: 'Subscriptions', slug: 'billing/subscriptions' }],
        },
        {
          label: 'Help',
          items: [
            { label: 'Troubleshooting', slug: 'help/troubleshooting' },
            { label: 'Contact support', slug: 'help/contact' },
          ],
        },
        {
          label: 'Legal',
          items: [
            { label: 'Privacy Policy', slug: 'legal/privacy-policy' },
            { label: 'Terms of Service', slug: 'legal/terms-of-service' },
            { label: 'Refund Policy', slug: 'legal/refund-policy' },
          ],
        },
      ],
    }),
  ],
});
