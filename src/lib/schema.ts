import type { CollectionEntry } from 'astro:content';
import { SITE } from './seo';

const ORG_ID = new URL('/#org', SITE.url).toString();

function abs(path: string): string {
  return new URL(path, SITE.url).toString();
}

export function organizationSchema(): Record<string, unknown> {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'AutomotiveBusiness'],
    '@id': ORG_ID,
    name: SITE.name,
    alternateName: SITE.shortName,
    description: SITE.description,
    url: SITE.url,
    telephone: '+357 96 471717',
    foundingDate: SITE.foundingDate,
    knowsLanguage: ['en', 'el', 'ru'],
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    currenciesAccepted: 'EUR',
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

  if (SITE.googleReviewCount > 0) {
    base.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: SITE.googleRating,
      bestRating: 5,
      worstRating: 1,
      reviewCount: SITE.googleReviewCount,
    };
  }

  return base;
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
    image: abs('/og/og-detailing.jpg'),
    priceRange: '€€',
  };
  if (typeof input.priceFromEUR === 'number') {
    base.makesOffer = {
      '@type': 'Offer',
      url: abs(input.url),
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: input.priceFromEUR,
        priceCurrency: 'EUR',
        minPrice: input.priceFromEUR,
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
      'Curated inventory of prepared used cars in Paphos, Cyprus. Transparent pricing, clean paperwork, free delivery across Cyprus.',
    url: abs(input.url),
    parentOrganization: { '@id': ORG_ID },
    image: abs('/og/og-detailing.jpg'),
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Cyprus',
    },
  };
}

export function carRentalSchema(input: { url: string }): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: `${SITE.shortName} — Luxury Car Rentals Paphos`,
    description:
      'Luxury daily and weekly car rentals with hotel delivery in the Pafos district, Cyprus. Insurance included.',
    url: abs(input.url),
    parentOrganization: { '@id': ORG_ID },
    image: abs('/og/og-tourism.jpg'),
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Pafos District, Cyprus',
    },
    priceRange: '€€€',
  };
}

export function taxiServiceSchema(input: { url: string }): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: `${SITE.shortName} — Airport Transfers & Taxi Paphos`,
    description:
      'Fixed-quote airport transfers and taxi in Paphos, Cyprus. Pafos and Larnaca airport transfers, on-demand taxi across Pafos district.',
    url: abs(input.url),
    provider: { '@id': ORG_ID },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Cyprus',
    },
  };
}

export function howToSchema(input: {
  name: string;
  description: string;
  priceFromEUR: number;
  totalTimeMinutes: number;
  steps: { name: string; text: string }[];
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: String(input.priceFromEUR),
    },
    totalTime: `PT${input.totalTimeMinutes}M`,
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Vehicle with yellowed or oxidised headlights',
      },
    ],
    step: input.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function personSchema(input: {
  id: string;
  name: string;
  jobTitle: string;
  telephone?: string;
  knowsLanguage?: string[];
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': new URL(input.id, SITE.url).toString(),
    name: input.name,
    jobTitle: input.jobTitle,
    worksFor: { '@id': ORG_ID },
    ...(input.telephone ? { telephone: input.telephone } : {}),
    ...(input.knowsLanguage ? { knowsLanguage: input.knowsLanguage } : {}),
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
    description: `${d.type} excursion from Paphos — ${d.durationHours}h, from €${d.startingFromEUR} ${unit}. Hotel pickup included. Small groups, English/Greek/Russian guides.`,
    url: abs(url),
    provider: { '@id': ORG_ID },
    duration: `PT${d.durationHours}H`,
    maximumAttendeeCapacity: d.maxGroupSize,
    inLanguage: d.languagesOffered,
    touristType: 'Tourist',
    itinerary: d.itinerary.map((stop) => ({
      '@type': 'Place',
      name: stop.stop,
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
    vehicleTransmission: d.transmission,
    fuelType: d.fuel,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: d.mileageKm,
      unitCode: 'KMT',
    },
    bodyType: d.bodyStyle,
    numberOfSeats: d.seats,
    description: d.description,
    url: abs(url),
    image: imageUrls.length > 0 ? imageUrls.map(abs) : abs('/og/og-detailing.jpg'),
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
    name: `${d.year} ${d.make} ${d.model} rental — Paphos, Cyprus`,
    description: d.description,
    brand: { '@type': 'Brand', name: d.make },
    url: abs(url),
    image: imageUrls.length > 0 ? imageUrls.map(abs) : abs('/og/og-tourism.jpg'),
    offers: {
      '@type': 'Offer',
      price: d.dailyRateFromEUR,
      priceCurrency: 'EUR',
      availability: d.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: d.dailyRateFromEUR,
        priceCurrency: 'EUR',
        unitText: 'per day',
      },
      seller: { '@id': ORG_ID },
    },
  };
}
