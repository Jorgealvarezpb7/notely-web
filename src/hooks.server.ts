import type { Handle } from '@sveltejs/kit/hooks';
import { localeFromPath } from '#lib/i18n/index.ts';

export const handle: Handle = ({ event, resolve }) => {
	const locale = localeFromPath(event.url.pathname);
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale)
	});
};
