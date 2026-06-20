import { defineCollection, z } from 'astro:content';

const whatsappTemplateKey = z.enum([
  'detailing.general',
  'detailing.headlight',
  'detailing.ceramic',
  'detailing.interior',
  'buysell.sell',
  'buysell.inquire',
  'rental.general',
  'rental.specific',
  'excursion.general',
  'excursion.specific',
  'taxi.airport',
  'taxi.ondemand',
  'contact.auto',
  'contact.tourism',
]);

const services = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(['exterior', 'interior', 'protection', 'restoration']),
      shortDescription: z.string().max(200),
      painAnchor: z
        .enum([
          'yellow-headlights',
          'swirl-marks',
          'sand-smell',
          'hidden-charges',
          'none',
        ])
        .default('none'),
      tiers: z
        .array(
          z.object({
            name: z.string(),
            startingFromEUR: z.number().nonnegative(),
            durationHours: z.number().positive().optional(),
            includes: z.array(z.string()).default([]),
          })
        )
        .min(1),
      startingFromEUR: z.number().nonnegative(),
      duration: z.string().optional(),
      heroImage: image(),
      beforeAfter: z
        .array(
          z.object({
            before: image(),
            after: image(),
            plate: z.string().optional(),
          })
        )
        .optional(),
      faq: z
        .array(z.object({ q: z.string(), a: z.string() }))
        .optional(),
      whatsappTemplate: whatsappTemplateKey,
      order: z.number().default(0),
      featured: z.boolean().default(false),
    }),
});

const fleet = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z
      .object({
        make: z.string(),
        model: z.string(),
        year: z.number().int(),
        trim: z.string().optional(),
        bodyStyle: z.enum([
          'sedan',
          'suv',
          'hatchback',
          'convertible',
          'coupe',
          'estate',
          'van',
          '4x4',
        ]),
        transmission: z.enum(['manual', 'automatic']),
        fuel: z.enum(['petrol', 'diesel', 'hybrid', 'electric']),
        seats: z.number().int().positive(),
        images: z.array(image()).min(1),
        features: z.array(z.string()).default([]),
        available: z.boolean().default(true),
        sold: z.boolean().default(false),
        badge: z.string().optional(),
        description: z.string(),
        order: z.number().default(0),
      })
      .and(
        z.discriminatedUnion('listingType', [
          z.object({
            listingType: z.literal('rental'),
            dailyRateFromEUR: z.number().nonnegative(),
            weeklyRateFromEUR: z.number().nonnegative().optional(),
            minRentalDays: z.number().int().positive().optional(),
            insuranceIncluded: z.boolean().default(true),
          }),
          z.object({
            listingType: z.literal('sale'),
            priceEUR: z.number().nonnegative(),
            mileageKm: z.number().int().nonnegative(),
            registrationCountry: z.string().default('CY'),
          }),
        ])
      ),
});

const excursions = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      type: z.enum([
        'safari',
        'day-trip',
        'cultural',
        'beach',
        'wine',
        'sunset',
      ]),
      durationHours: z.number().positive(),
      startingFromEUR: z.number().nonnegative(),
      perPersonOrGroup: z.enum(['per-person', 'per-group']),
      maxGroupSize: z.number().int().positive(),
      pickupIncluded: z.boolean().default(true),
      languagesOffered: z
        .array(z.enum(['en', 'el', 'ru']))
        .default(['en']),
      itinerary: z
        .array(z.object({ time: z.string(), stop: z.string() }))
        .default([]),
      includes: z.array(z.string()).default([]),
      excludes: z.array(z.string()).default([]),
      heroImage: image(),
      gallery: z.array(image()).optional(),
      featured: z.boolean().default(false),
      order: z.number().default(0),
    }),
});

const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    locationOrNationality: z.string().optional(),
    quote: z.string(),
    rating: z.number().min(1).max(5),
    lane: z.enum(['auto', 'tourism']),
    date: z.coerce.date(),
  }),
});

export const collections = {
  services,
  fleet,
  excursions,
  testimonials,
};
