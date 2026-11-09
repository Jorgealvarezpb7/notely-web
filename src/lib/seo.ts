import type { Dictionary } from '#lib/i18n/es.ts';
import { DEFAULT_LOCALE, localizedPath, LOCALES, type Locale } from '#lib/i18n/index.ts';
import { AUTHOR_NAME, AUTHOR_URL, DOWNLOAD_URL, LICENSE_URL, SITE_URL } from '#lib/site.ts';

export interface Alternate {
	hreflang: string;
	href: string;
}

export interface SeoProps {
	title: string;
	description: string;
	url: string;
	alternates: Alternate[];
	ogLocale: string;
	ogLocaleAlternates: string[];
	image: { url: string; alt: string; width: number; height: number };
	jsonLd: Record<string, unknown>;
}

const OG_LOCALES: Record<Locale, string> = { es: 'es_ES', en: 'en_US' };
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

function absoluteUrl(path: string): string {
	return new URL(path, SITE_URL).href;
}

export function pageUrl(locale: Locale): string {
	return absoluteUrl(localizedPath(locale));
}

export function hreflangAlternates(): Alternate[] {
	return [
		...LOCALES.map((locale) => ({ hreflang: locale, href: pageUrl(locale) })),
		{ hreflang: 'x-default', href: pageUrl(DEFAULT_LOCALE) }
	];
}

/** Builds the `Seo` props of the landing page in the given locale. */
export function landingSeo(locale: Locale, t: Dictionary, version: string | null): SeoProps {
	const url = pageUrl(locale);

	return {
		title: t.meta.title,
		description: t.meta.description,
		url,
		alternates: hreflangAlternates(),
		ogLocale: OG_LOCALES[locale],
		ogLocaleAlternates: LOCALES.filter((other) => other !== locale).map((o) => OG_LOCALES[o]),
		image: {
			url: absoluteUrl(`/og/og-${locale}.png`),
			alt: t.meta.ogImageAlt,
			width: OG_IMAGE_WIDTH,
			height: OG_IMAGE_HEIGHT
		},
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'SoftwareApplication',
			name: 'Notely',
			description: t.meta.description,
			url,
			operatingSystem: 'macOS 14+',
			applicationCategory: 'UtilitiesApplication',
			offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
			...(version && { softwareVersion: version }),
			downloadUrl: DOWNLOAD_URL,
			license: LICENSE_URL,
			image: absoluteUrl('/icon-512.png'),
			inLanguage: locale,
			author: { '@type': 'Person', name: AUTHOR_NAME, url: AUTHOR_URL }
		}
	};
}

/** Renders JSON-LD as a script tag. Escaping `<` keeps the content from closing the tag. */
export function jsonLdScript(data: Record<string, unknown>): string {
	const json = JSON.stringify(data).replace(/</g, '\\u003c');
	return `<script type="application/ld+json">${json}</script>`;
}
