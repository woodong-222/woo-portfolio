import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Common (language-independent) data
import techStack from '@/utils/locales/common/techStack.json';
import language from '@/utils/locales/common/language.json';

// Korean translations
import koCommon from '@/utils/locales/ko/common.json';
import koHero from '@/utils/locales/ko/hero.json';
import koAboutMe from '@/utils/locales/ko/aboutMe.json';
import koExperience from '@/utils/locales/ko/experience.json';
import koContactMe from '@/utils/locales/ko/contactMe.json';
// no thankyou namespace

// English translations
import enCommon from '@/utils/locales/en/common.json';
import enHero from '@/utils/locales/en/hero.json';
import enAboutMe from '@/utils/locales/en/aboutMe.json';
import enExperience from '@/utils/locales/en/experience.json';
import enContactMe from '@/utils/locales/en/contactMe.json';
// no thankyou namespace

const resources = {
	ko: {
		common: { ...koCommon, ...language },
		hero: koHero,
		aboutMe: koAboutMe,
		experience: koExperience,
		contactMe: koContactMe,
		about: { techStack },
	},
	en: {
		common: { ...enCommon, ...language },
		hero: enHero,
		aboutMe: enAboutMe,
		experience: enExperience,
		contactMe: enContactMe,
		about: { techStack },
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
		ns: ['common', 'hero', 'aboutMe', 'experience', 'contactMe', 'about'],
		
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
