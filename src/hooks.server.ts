import type { Handle } from '@sveltejs/kit/hooks';
import { localeFromParam } from '#lib/i18n/index.ts';

export const handle: Handle = ({ event, resolve }) => {
	const locale = localeFromParam(event.params.lang);
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale)
	});
};
