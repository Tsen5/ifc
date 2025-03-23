import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en';
import fr from './fr';

// import LanguageDetector from 'i18next-browser-languagedetector';

export const resources = {
  fr,
  en,
} as const;

export type DefaultNS = keyof typeof fr;

export type Resources = typeof resources;

export const defaultNS: DefaultNS = 'global';

export const fallbackLng: keyof Resources = 'fr';

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'fr',
    fallbackLng,
    resources,
    defaultNS,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
