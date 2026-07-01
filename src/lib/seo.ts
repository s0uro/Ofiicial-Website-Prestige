export const SITE = {
  name: 'S.Prestige Services',
  homeTitle: 'Car Detailing, Rentals & Recovery in Paphos, Cyprus | S.Prestige Services',
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
    latitude: 34.8264,
    longitude: 32.3858,
  },
  openingHours: 'Mo-Sa 08:00-18:00',
  foundingDate: '2017',
  googleRating: 4.9,
  googleReviewCount: 0, // TODO: update with real Google review count
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
  if (!title || title === SITE.name) return SITE.homeTitle;
  return `${title} — ${SITE.name}`;
}
