import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Korean translations
import koCommon from '@/locales/ko/common.json';
import koHero from '@/locales/ko/hero.json';
import koAbout from '@/locales/ko/about.json';
import koThankYou from '@/locales/ko/thankyou.json';

// English translations
import enCommon from '@/locales/en/common.json';
import enHero from '@/locales/en/hero.json';
import enAbout from '@/locales/en/about.json';
import enThankYou from '@/locales/en/thankyou.json';

const resources = {
	ko: {
		common: koCommon,
		hero: koHero,
		about: koAbout,
		thankyou: koThankYou,
	},
	en: {
		common: enCommon,
		hero: enHero,
		about: enAbout,
		thankyou: enThankYou,
	},
};

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		lng: 'ko',
		fallbackLng: 'ko',
		defaultNS: 'common',
		ns: ['common', 'hero', 'about', 'thankyou'],
		
		detection: {
			order: ['localStorage', 'navigator', 'htmlTag'],
			caches: ['localStorage'],
		},

		interpolation: {
			escapeValue: false,
		},

		react: {
			useSuspense: false,
		},
	});

export default i18n;