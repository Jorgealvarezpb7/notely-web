import { localeFromPath } from '#lib/i18n/index.ts';
import type { LayoutLoad } from './$types';

export const prerender = true;

export const load: LayoutLoad = ({ url }) => ({ locale: localeFromPath(url.pathname) });
