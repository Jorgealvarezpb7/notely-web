import { LOCALES } from '#lib/i18n/index.ts';
import { hreflangAlternates, pageUrl } from '#lib/seo.ts';

export const prerender = true;

export function GET() {
	const lastmod = new Date().toISOString();
	const alternates = hreflangAlternates()
		.map(
			({ hreflang, href }) =>
				`\t\t<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`
		)
		.join('\n');
	const urls = LOCALES.map(
		(locale) =>
			`\t<url>\n\t\t<loc>${pageUrl(locale)}</loc>\n\t\t<lastmod>${lastmod}</lastmod>\n${alternates}\n\t</url>`
	).join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
