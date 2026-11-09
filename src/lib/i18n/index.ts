import { page } from '$app/state';
import { en } from '#lib/i18n/en.ts';
import { es, type Dictionary } from '#lib/i18n/es.ts';

export const LOCALES = ['es', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export type Anchor = keyof Dictionary['anchors'];

/** Each language named in itself, so it reads the same on every page. */
export const LOCALE_NAMES: Record<Locale, string> = { es: 'Español', en: 'English' };

export const DEFAULT_LOCALE: Locale = 'es';

const dictionaries: Record<Locale, Dictionary> = { es, en };

/** Reads the locale from the URL path, so unmatched routes like `/en/whatever` get one too. */
export function localeFromPath(pathname: string): Locale {
	return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : DEFAULT_LOCALE;
}

/** Builds the URL of the page, or of one of its sections, in the given locale. */
export function localizedPath(locale: Locale, anchor?: Anchor): string {
	const path = locale === DEFAULT_LOCALE ? '/' : `/${locale}`;
	return anchor ? `${path}#${dictionaries[locale].anchors[anchor]}` : path;
}

/** Finds which section a URL hash points to, so it can be carried to another locale. */
export function anchorFromHash(locale: Locale, hash: string): Anchor | undefined {
	const anchors = dictionaries[locale].anchors;
	return (Object.keys(anchors) as Anchor[]).find((anchor) => anchors[anchor] === hash.slice(1));
}

/** Current locale and copy. Read it from a component, e.g. `const t = $derived(i18n.t)`. */
export const i18n = {
	get locale(): Locale {
		return page.data.locale;
	},
	get t(): Dictionary {
		return dictionaries[this.locale];
	}
};
