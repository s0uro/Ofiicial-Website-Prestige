export type Lang = 'en' | 'el' | 'ru';

export interface NavLabels {
  buySell: string;
  rentals: string;
  detailing: string;
  mechanical: string;
  recovery: string;
  transfers: string;
  contact: string;
}

export interface UIStrings {
  nav: NavLabels;
  emergency: string;
}

export const ui: Record<Lang, UIStrings> = {
  en: {
    nav: {
      buySell: 'Buy & Sell',
      rentals: 'Rentals',
      detailing: 'Detailing',
      mechanical: 'Mechanical',
      recovery: 'Recovery',
      transfers: 'Transfers',
      contact: 'Contact',
    },
    emergency: 'Emergency 24/7',
  },
  el: {
    nav: {
      buySell: 'Αγορά & Πώληση',
      rentals: 'Ενοικιάσεις',
      detailing: 'Καθαρισμός',
      mechanical: 'Μηχανικός',
      recovery: 'Ρυμούλκηση',
      transfers: 'Μεταφορές',
      contact: 'Επικοινωνία',
    },
    emergency: 'Έκτακτη ανάγκη 24/7',
  },
  ru: {
    nav: {
      buySell: 'Купить и продать',
      rentals: 'Аренда',
      detailing: 'Детейлинг',
      mechanical: 'Механик',
      recovery: 'Эвакуация',
      transfers: 'Трансферы',
      contact: 'Контакты',
    },
    emergency: 'Экстренная помощь 24/7',
  },
};

export function getLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  return (localStorage.getItem('sprestige-lang') as Lang) || 'en';
}

export function setLang(lang: Lang): void {
  localStorage.setItem('sprestige-lang', lang);
  window.dispatchEvent(new CustomEvent('sprestige:lang', { detail: lang }));
}
