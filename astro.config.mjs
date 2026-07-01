import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://s-prestige.com.cy',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes('/legal/') &&
        !page.endsWith('/tourism/'),
      serialize(item) {
        item.lastmod = new Date().toISOString().split('T')[0];
        if (item.url === 'https://s-prestige.com.cy/') {
          item.changefreq = 'weekly';
          item.priority = 1.0;
        } else if (
          item.url.includes('/detailing') ||
          item.url.includes('/mechanical') ||
          item.url.includes('/recovery') ||
          item.url.includes('/tourism/taxi') ||
          item.url.includes('/tourism/rentals') ||
          item.url.includes('/tourism/excursions') ||
          item.url.includes('/buy-sell') ||
          item.url.includes('/about') ||
          item.url.includes('/contact')
        ) {
          item.changefreq = 'weekly';
          item.priority = 0.8;
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.6;
        }
        return item;
      },
    }),
  ],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  vite: {
    ssr: {
      noExternal: ['framer-motion'],
    },
  },
});
