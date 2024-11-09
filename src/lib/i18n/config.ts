import i18n from 'sveltekit-i18n';
import lang from './lang.json';

/** @type {import('sveltekit-i18n').Config} */
const config = {
	translations: {
		en : {lang},
		au : {lang},
		de : {lang},
		fe : {lang},
		no : {lang},
		it : {lang}
	},
	loaders: [
		//store
		{
			locale: 'en',
			key: 'store',
			loader: async () => (await import('./en/store.json')).default
		},
		{
			locale: 'au',
			key: 'store',
			loader: async () => (await import('./au/store.json')).default
		},
		{
			locale: 'de',
			key: 'store',
			loader: async () => (await import('./de/store.json')).default
		},
		{
			locale: 'no',
			key: 'store',
			loader: async () => (await import('./no/store.json')).default
		},
		{
			locale: 'fe',
			key: 'store',
			loader: async () => (await import('./fe/store.json')).default
		},
		{
			locale: 'it',
			key: 'store',
			loader: async () => (await import('./it/store.json')).default
		},
			// dm
		{
			locale: 'en',
			key: 'dm',
			loader: async () => (await import('./en/dm.json')).default
		},
		{
			locale: 'au',
			key: 'dm',
			loader: async () => (await import('./au/dm.json')).default
		},
		{
			locale: 'de',
			key: 'dm',
			loader: async () => (await import('./de/dm.json')).default
		},
		{
			locale: 'no',
			key: 'dm',
			loader: async () => (await import('./no/dm.json')).default
		},
		{
			locale: 'fe',
			key: 'dm',
			loader: async () => (await import('./fe/dm.json')).default
		},
		{
			locale: 'it',
			key: 'dm',
			loader: async () => (await import('./it/dm.json')).default
		},
		//kit
		{
			locale: 'en',
			key: 'kit',
			loader: async () => (await import('./en/kit.json')).default
		},
		{
			locale: 'au',
			key: 'kit',
			loader: async () => (await import('./au/kit.json')).default
		},
		{
			locale: 'de',
			key: 'kit',
			loader: async () => (await import('./de/kit.json')).default
		},
		{
			locale: 'no',
			key: 'kit',
			loader: async () => (await import('./no/kit.json')).default
		},
		{
			locale: 'fe',
			key: 'kit',
			loader: async () => (await import('./fe/kit.json')).default
		},
		{
			locale: 'it',
			key: 'kit',
			loader: async () => (await import('./it/kit.json')).default
		},
		//pb
		{
			locale: 'en',
			key: 'pb',
			loader: async () => (await import('./en/pb.json')).default
		},
		{
			locale: 'au',
			key: 'pb',
			loader: async () => (await import('./au/pb.json')).default
		},
		{
			locale: 'de',
			key: 'pb',
			loader: async () => (await import('./de/pb.json')).default
		},
		{
			locale: 'no',
			key: 'pb',
			loader: async () => (await import('./no/pb.json')).default
		},
		{
			locale: 'fe',
			key: 'pb',
			loader: async () => (await import('./fe/pb.json')).default
		},
		{
			locale: 'it',
			key: 'pb',
			loader: async () => (await import('./it/pb.json')).default
		}
	]
};


export const {t, locale, locales, loading, loadTranslations} = new i18n(config);

loading.subscribe(($loading) => $loading);