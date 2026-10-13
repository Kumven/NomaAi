import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ha from './locales/ha.json';
import yo from './locales/yo.json';
import ig from './locales/ig.json';
import pcm from './locales/pcm.json';

const savedLang = localStorage.getItem('nomaai_language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ha: { translation: ha },
      yo: { translation: yo },
      ig: { translation: ig },
      pcm: { translation: pcm }
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export const languageOptions = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'ha', label: 'Hausa', native: 'Harshen Hausa', flag: '🇳🇬' },
  { code: 'yo', label: 'Yoruba', native: 'Èdè Yorùbá', flag: '🇳🇬' },
  { code: 'ig', label: 'Igbo', native: 'Asụsụ Igbo', flag: '🇳🇬' },
  { code: 'pcm', label: 'Pidgin', native: 'Naija Pidgin', flag: '🇳🇬' }
] as const;

export default i18n;
