import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '../lib/seo';

function entry(
  path: string,
  priority: string,
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
  lastmod: string,
): string {
  return `  <url>
    <loc>${SITE.url}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const GET: APIRoute = async () => {
  const fleet = await getCollection('fleet');
  const excursions = await getCollection('excursions');
  const today = new Date().toISOString().split('T')[0];

  const staticUrls = [
    entry('/', '1.0', 'weekly', today),
    entry('/about/', '0.6', 'monthly', today),
    entry('/contact/', '0.7', 'monthly', today),
    entry('/detailing/', '0.9', 'weekly', today),
    entry('/detailing/ceramic-coating/', '0.8', 'monthly', today),
    entry('/detailing/headlight-restoration/', '0.8', 'monthly', today),
    entry('/detailing/interior-biological/', '0.8', 'monthly', today),
    entry('/mechanical/', '0.8', 'weekly', today),
    entry('/recovery/', '0.7', 'monthly', today),
    entry('/buy-sell/', '0.9', 'weekly', today),
    entry('/tourism/rentals/', '0.9', 'weekly', today),
    entry('/tourism/taxi/', '0.8', 'monthly', today),
    entry('/tourism/excursions/', '0.8', 'monthly', today),
  ];

  // Only active (non-sold) sale listings
  const saleUrls = fleet
    .filter((e: CollectionEntry<'fleet'>) => e.data.listingType === 'sale' && !e.data.sold)
    .map((e: CollectionEntry<'fleet'>) => entry(`/buy-sell/${e.slug}/`, '0.7', 'weekly', today));

  // Only available rental listings
  const rentalUrls = fleet
    .filter((e: CollectionEntry<'fleet'>) => e.data.listingType === 'rental' && e.data.available !== false)
    .map((e: CollectionEntry<'fleet'>) => entry(`/tourism/rentals/${e.slug}/`, '0.7', 'monthly', today));

  const excursionUrls = excursions.map((e: CollectionEntry<'excursions'>) =>
    entry(`/tourism/excursions/${e.slug}/`, '0.7', 'monthly', today),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...saleUrls, ...rentalUrls, ...excursionUrls].join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
