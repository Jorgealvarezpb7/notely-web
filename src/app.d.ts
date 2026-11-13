import type { Locale } from '#lib/i18n/index.ts';

declare global {
	namespace App {
		interface PageData {
			locale: Locale;
		}
	}
}

export {};
