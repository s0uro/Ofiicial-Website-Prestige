import type { CollectionEntry } from 'astro:content';
import { SITE } from './seo';

const ORG_ID = new URL('/#org', SITE.url).toString();

function abs(path: string): string {
  return new URL(path, SITE.url).toString();
}

function imageObject(url: string, width?: number, height?: number): Record<string, unknown> {
  const obj: Record<string, unknown> = { '@type': 'ImageObject', url };
  if (width) obj.width = width;
  if (height) obj.height = height;
  return obj;
}

const fuelTypeMap: Record<string, string> = {
  petrol: 'https://schema.org/GasolineEnergy',
  diesel: 'https://schema.org/DieselEnergy',
  hybrid: 'https://schema.org/HybridEnergy',
  electric: 'https://schema.org/ElectricEnergy',
};

const transmissionMap: Record<string, string> = {
  automatic: 'https://schema.org/AutomaticTransmission',
  manual: 'https://schema.org/ManualTransmission',
};

export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'AutomotiveBusiness'],
    '@id': ORG_ID,
    name: SITE.name,
    alternateName: SITE.shortName,
    description: SITE.description,
    url: SITE.url,
    telephone: '+35796471717',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.addressLocality,
      addressRegion: SITE.address.addressRegion,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    priceRange: '€€',
    image: abs(SITE.defaultOg),
    logo: abs('/prestige-logo.jpeg'),
    sameAs: [
      'https://www.instagram.com/prestige_detailing.cy/',
      'https://www.facebook.com/people/Prestige-Detailing/100076279789752/',
    ],
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': new URL('/#website', SITE.url).toString(),
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  };
}

export function aboutPageSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: abs('/about'),
    name: `About — ${SITE.name}`,
    description: 'Who we are, where we are, and how we work in Kissonerga, Pafos.',
    isPartOf: { '@id': new URL('/#website', SITE.url).toString() },
    about: { '@id': ORG_ID },
  };
}

export function contactPageSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: abs('/contact'),
    name: `Contact — ${SITE.name}`,
    description: 'Phone numbers, hours, and address for S.Prestige Services in Kissonerga, Pafos.',
    isPartOf: { '@id': new URL('/#website', SITE.url).toString() },
    mainEntity: { '@id': ORG_ID },
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

export function faqPageSchema(items: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.url),
    })),
  };
}

export function autoRepairSchema(input: {
  name: string;
  description: string;
  url: string;
  priceFromEUR?: number;
  priceUnit?: string;
}): Record<string, unknown> {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: input.name,
    description: input.description,
    url: abs(input.url),
    parentOrganization: { '@id': ORG_ID },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Pafos District, Cyprus',
    },
    image: imageObject(abs('/og/og-detailing.jpg'), 1200, 630),
    priceRange: '€€',
  };
  if (typeof input.priceFromEUR === 'number') {
    base.makesOffer = {
      '@type': 'Offer',
      url: abs(input.url),
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        minPrice: input.priceFromEUR,
        priceCurrency: 'EUR',
        unitText: input.priceUnit ?? 'starting from',
      },
    };
  }
  return base;
}

export function autoDealerSchema(input: { url: string }): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: `${SITE.shortName} — Buy & Sell`,
    description:
      'Curated inventory of prepared used cars. Transparent pricing, clean paperwork.',
    url: abs(input.url),
    parentOrganization: { '@id': ORG_ID },
    image: imageObject(abs('/og/og-detailing.jpg'), 1200, 630),
  };
}

export function carRentalSchema(input: { url: string }): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: `${SITE.shortName} — Rentals`,
    description:
      'Daily and weekly car rentals with hotel delivery in the Pafos district, Cyprus.',
    url: abs(input.url),
    parentOrganization: { '@id': ORG_ID },
    image: imageObject(abs('/og/og-tourism.jpg'), 1200, 630),
  };
}

export function taxiServiceSchema(input: { url: string }): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: `${SITE.shortName} — Taxi & Transfers`,
    description:
      'Fixed-quote taxi and airport transfers in the Pafos district, Cyprus.',
    url: abs(input.url),
    provider: { '@id': ORG_ID },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Cyprus',
    },
  };
}

export function touristTripSchema(
  entry: CollectionEntry<'excursions'>,
  url: string
): Record<string, unknown> {
  const d = entry.data;
  const unit = d.perPersonOrGroup === 'per-person' ? 'per person' : 'per group';
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: d.title,
    description: `${d.type} excursion — ${d.durationHours}h, from €${d.startingFromEUR} ${unit}.`,
    url: abs(url),
    provider: { '@id': ORG_ID },
    duration: `PT${d.durationHours}H`,
    maximumAttendeeCapacity: d.maxGroupSize,
    inLanguage: d.languagesOffered,
    itinerary: d.itinerary.map((s: { time: string; stop: string }) => ({
      '@type': 'Place',
      name: s.stop,
    })),
    offers: {
      '@type': 'Offer',
      price: d.startingFromEUR,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: d.startingFromEUR,
        priceCurrency: 'EUR',
        unitText: unit,
      },
      url: abs(url),
    },
  };
}

export function saleListingSchema(
  entry: CollectionEntry<'fleet'>,
  url: string,
  imageUrls: string[] = []
): Record<string, unknown> | null {
  const d = entry.data;
  if (d.listingType !== 'sale') return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: `${d.year} ${d.make} ${d.model}`,
    brand: { '@type': 'Brand', name: d.make },
    model: d.model,
    vehicleModelDate: String(d.year),
    vehicleTransmission: transmissionMap[d.transmission] ?? d.transmission,
    fuelType: fuelTypeMap[d.fuel] ?? d.fuel,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: d.mileageKm,
      unitCode: 'KMT',
    },
    bodyType: d.bodyStyle,
    numberOfSeats: d.seats,
    description: d.description,
    url: abs(url),
    image: imageUrls.length > 0
      ? imageUrls.map((u) => imageObject(abs(u)))
      : imageObject(abs('/og/og-detailing.jpg'), 1200, 630),
    offers: {
      '@type': 'Offer',
      price: d.priceEUR,
      priceCurrency: 'EUR',
      availability: d.sold
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
      seller: { '@id': ORG_ID },
      itemCondition: 'https://schema.org/UsedCondition',
    },
  };
}

export function aggregateRatingBlock(input: {
  ratingValue: number;
  reviewCount: number;
  reviews?: Array<{ author: string; rating: number; body: string }>;
}): Record<string, unknown> {
  const block: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'AutomotiveBusiness'],
    '@id': ORG_ID,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: input.ratingValue.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      reviewCount: input.reviewCount,
    },
  };
  if (input.reviews && input.reviews.length > 0) {
    block.review = input.reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(r.rating),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: r.body,
    }));
  }
  return block;
}

export function rentalListingSchema(
  entry: CollectionEntry<'fleet'>,
  url: string,
  imageUrls: string[] = []
): Record<string, unknown> | null {
  const d = entry.data;
  if (d.listingType !== 'rental') return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${d.year} ${d.make} ${d.model} rental`,
    description: d.description,
    brand: { '@type': 'Brand', name: d.make },
    url: abs(url),
    image: imageUrls.length > 0
      ? imageUrls.map((u) => imageObject(abs(u)))
      : imageObject(abs('/og/og-tourism.jpg'), 1200, 630),
    offers: {
      '@type': 'Offer',
      availability: d.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@id': ORG_ID },
    },
  };
}
