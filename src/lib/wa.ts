export const WA_AUTO = '35796471717';
export const WA_AUTO_2 = '35796005009';
export const WA_TOURISM = '35796828299';

export const TEL_AUTO = '+35796471717';
export const TEL_AUTO_2 = '+35796005009';
export const TEL_TOURISM = '+35796828299';

export const DISPLAY_PHONE_AUTO = '+357 96 471717';
export const DISPLAY_PHONE_AUTO_2 = '+357 96 005009';
export const DISPLAY_PHONE_TOURISM = '+357 96 828299';

export const DIMITRIS_LINES = [
  { wa: WA_AUTO, tel: TEL_AUTO, display: DISPLAY_PHONE_AUTO },
  { wa: WA_AUTO_2, tel: TEL_AUTO_2, display: DISPLAY_PHONE_AUTO_2 },
];

export const ALEXANDRA_LINE = {
  wa: WA_TOURISM,
  tel: TEL_TOURISM,
  display: DISPLAY_PHONE_TOURISM,
};

export type Lane = 'auto' | 'tourism';

export type TemplateKey =
  | 'detailing.general'
  | 'detailing.headlight'
  | 'detailing.ceramic'
  | 'detailing.interior'
  | 'buysell.sell'
  | 'buysell.inquire'
  | 'mechanical.general'
  | 'recovery.general'
  | 'rental.general'
  | 'rental.specific'
  | 'excursion.general'
  | 'excursion.specific'
  | 'taxi.airport'
  | 'taxi.ondemand'
  | 'contact.auto'
  | 'contact.tourism';

const LANE_BY_TEMPLATE: Record<TemplateKey, Lane> = {
  'detailing.general': 'auto',
  'detailing.headlight': 'auto',
  'detailing.ceramic': 'auto',
  'detailing.interior': 'auto',
  'buysell.sell': 'auto',
  'buysell.inquire': 'auto',
  'mechanical.general': 'auto',
  'recovery.general': 'auto',
  'contact.auto': 'auto',
  'rental.general': 'tourism',
  'rental.specific': 'tourism',
  'excursion.general': 'tourism',
  'excursion.specific': 'tourism',
  'taxi.airport': 'auto',
  'taxi.ondemand': 'auto',
  'contact.tourism': 'tourism',
};

const TEMPLATES: Record<TemplateKey, string> = {
  'detailing.general':
    "Hi S.Prestige — I'd like a detailing quote. Car: {car}. Area: {area}.",
  'detailing.headlight':
    "Hi — my headlights are yellowed. Car: {car}. Can I get a quote and the next available slot?",
  'detailing.ceramic':
    'Hi — interested in ceramic coating for my {car}. What tiers do you offer?',
  'detailing.interior':
    'Hi — I need interior + biological cleaning (sand / smell). Car: {car}.',
  'buysell.sell':
    'Hi — I want to sell my car. {car}, {km} km, condition: {condition}.',
  'buysell.inquire':
    "Hi — is the {listing} still available? I'd like to view it.",
  'mechanical.general':
    "Hi S.Prestige — I need a mechanical service quote. Car: {car}. Issue: {issue}.",
  'recovery.general':
    "Hi S.Prestige — I need recovery / towing. Car: {car}. Location: {location}.",
  'rental.general':
    "Hi — I'd like to rent a car. Dates: {from} – {to}. Pickup: {pickup}. Drivers: {drivers}.",
  'rental.specific':
    "Hi — I'd like to rent the {vehicle}. Dates: {from} – {to}.",
  'excursion.general':
    "Hi — I'd like info on excursions. Dates: {when}. Group size: {group}. Interest: {interest}.",
  'excursion.specific':
    "Hi — I'd like to book the {title}. Date: {when}. Group: {group}.",
  'taxi.airport':
    'Hi — airport transfer please. Flight: {flight}. Arrival: {arrival}. Passengers: {pax}. Drop-off: {drop}.',
  'taxi.ondemand':
    'Hi — taxi needed. Pickup: {pickup}, time {time}. Drop-off: {drop}. Passengers: {pax}.',
  'contact.auto': 'Hi S.Prestige — I have an auto question.',
  'contact.tourism': 'Hi S.Prestige — I have a rentals question.',
};

function fill(
  template: string,
  vars: Record<string, string | number | undefined> = {}
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const v = vars[key];
    return v !== undefined && v !== '' ? String(v) : `[${key}]`;
  });
}

export function laneFor(key: TemplateKey): Lane {
  return LANE_BY_TEMPLATE[key];
}

export function waNumberFor(lane: Lane): string {
  return lane === 'auto' ? WA_AUTO : WA_TOURISM;
}

export function telFor(lane: Lane): string {
  return lane === 'auto' ? TEL_AUTO : TEL_TOURISM;
}

export function displayPhoneFor(lane: Lane): string {
  return lane === 'auto' ? DISPLAY_PHONE_AUTO : DISPLAY_PHONE_TOURISM;
}

export function buildWaUrl(
  key: TemplateKey,
  vars?: Record<string, string | number | undefined>
): string {
  const lane = LANE_BY_TEMPLATE[key];
  const text = fill(TEMPLATES[key], vars);
  return `https://wa.me/${waNumberFor(lane)}?text=${encodeURIComponent(text)}`;
}

export function rawWaUrl(lane: Lane, text: string): string {
  return `https://wa.me/${waNumberFor(lane)}?text=${encodeURIComponent(text)}`;
}
