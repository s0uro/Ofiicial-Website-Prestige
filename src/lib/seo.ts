export const SITE = {
  name: 'S.Prestige Services',
  shortName: 'S.Prestige',
  url: 'https://s-prestige.com.cy',
  locale: 'en_CY',
  defaultOg: '/og/og-default.jpg',
  description:
    'Detailing, ceramic coating, headlight restoration, rentals, excursions, and transfers in Kissonerga, Cyprus.',
  address: {
    streetAddress: 'Eustathios Plaza, Leoforos Chrisoneras, Kat.5',
    addressLocality: 'Kissonerga',
    addressRegion: 'Pafos',
    postalCode: '8574',
    addressCountry: 'CY',
  },
  geo: {
    // Efstathiou Plaza, Leoforos Kissonergas, Kissonerga 8574 — anchored to
    // the plaza (same building as Pafos Computers, per OSM). Replace with the
    // exact Google Maps pin if it differs.
    latitude: 34.82334,
    longitude: 32.39217,
  },
  openingHours: 'Mo-Sa 08:00-18:00',
} as const;

export interface SeoProps {
  title?: string;
  description?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function canonical(path: string = '/'): string {
  return new URL(path, SITE.url).toString();
}

export function buildTitle(title?: string): string {
  if (!title || title === SITE.name) return SITE.name;
  return `${title} — ${SITE.name}`;
}
