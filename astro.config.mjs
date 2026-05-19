// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.switchmessage.com',
  trailingSlash: 'ignore',
  integrations: [
    starlight({
      title: 'SwitchMessage Docs',
      description:
        'Documentation for SwitchMessage — the macOS menu bar app that syncs iMessages to HubSpot CRM.',
      logo: {
        // Chat-bubbles only (wordmark cropped out at build time via ImageMagick);
        // pairs with the site title text in the header.
        src: './src/assets/switchmessage-icon.png',
      },
      favicon: '/favicon.png',
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png',
          },
        },
        // Social card. Static / site-wide for now; per-page OG image
        // generation can be added later if the docs grow into many
        // separately-shareable pages.
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: 'https://docs.switchmessage.com/og-image.png' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:width', content: '1200' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:height', content: '630' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:alt', content: 'SwitchMessage — sync iMessages straight into HubSpot CRM' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: 'https://docs.switchmessage.com/og-image.png' },
        },
      ],
      social: [
        { icon: 'external', label: 'Homepage', href: 'https://switchmessage.com' },
        { icon: 'email', label: 'Support', href: 'mailto:support@switchmessage.com' },
      ],
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
          label: 'Using SwitchMessage',
          items: [
            { label: 'How sync works', slug: 'guides/how-sync-works' },
            { label: 'The HubSpot inbox channel', slug: 'guides/inbox-channel' },
            { label: 'Settings reference', slug: 'guides/settings' },
            { label: 'Resetting & signing out', slug: 'guides/reset' },
          ],
        },
        {
          label: 'Privacy & security',
          items: [{ label: 'What SwitchMessage accesses', slug: 'privacy/data-handling' }],
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
