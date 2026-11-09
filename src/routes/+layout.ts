import { localeFromParam } from '#lib/i18n/index.ts';
import type { LayoutLoad } from './$types';

export const prerender = true;

export const load: LayoutLoad = ({ params }) => ({ locale: localeFromParam(params.lang) });
