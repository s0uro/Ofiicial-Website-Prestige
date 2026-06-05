import { telFor, type Lane } from './wa';

export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`;
}

export function telHrefFor(lane: Lane): string {
  return telHref(telFor(lane));
}

export { telFor };
