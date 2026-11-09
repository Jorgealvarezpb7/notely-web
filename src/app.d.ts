import type { Locale } from '#lib/i18n/index.ts';

declare global {
	/** True when static/screenshots/hero.png exists at build time. */
	const __HAS_HERO_SCREENSHOT__: boolean;

	namespace App {
		interface PageData {
			locale: Locale;
		}
	}
}

export {};
