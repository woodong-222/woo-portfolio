import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Common (language-independent) data
import techStack from '@/utils/locales/common/techStack.json';
import language from '@/utils/locales/common/language.json';

// Korean translations
import koCommon from '@/utils/locales/ko/common.json';
import koHero from '@/utils/locales/ko/hero.json';
import koAbout from '@/utils/locales/ko/about.json';
import koThankYou from '@/utils/locales/ko/thankyou.json';

// English translations
import enCommon from '@/utils/locales/en/common.json';
import enHero from '@/utils/locales/en/hero.json';
import enAbout from '@/utils/locales/en/about.json';
import enThankYou from '@/utils/locales/en/thankyou.json';

const resources = {
	ko: {
		common: { ...koCommon, ...language },
		hero: koHero,
		about: { ...koAbout, techStack: { ...techStack, ...koAbout.techStack } },
		thankyou: koThankYou,
	},
	en: {
		common: { ...enCommon, ...language },
		hero: enHero,
		about: { ...enAbout, techStack: { ...techStack, ...enAbout.techStack } },
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
