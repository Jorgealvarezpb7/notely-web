import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => [{}, { lang: 'en' }];

const RELEASE_API_URL = 'https://api.github.com/repos/Jorgealvarezpb7/Notely/releases/latest';
const RELEASE_TIMEOUT_MS = 8000;

interface ReleaseInfo {
	version: string | null;
	publishedAt: string | null;
}

const UNAVAILABLE: ReleaseInfo = { version: null, publishedAt: null };

async function fetchRelease(fetcher: typeof fetch): Promise<ReleaseInfo> {
	try {
		const response = await fetcher(RELEASE_API_URL, {
			headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'notely-landing' },
			signal: AbortSignal.timeout(RELEASE_TIMEOUT_MS)
		});

		if (!response.ok) {
			console.warn(`[release] GitHub API returned ${response.status}; hiding the version.`);
			return UNAVAILABLE;
		}

		const release: { tag_name?: unknown; published_at?: unknown } = await response.json();

		if (typeof release.tag_name !== 'string' || release.tag_name === '') {
			console.warn('[release] GitHub API response has no tag_name; hiding the version.');
			return UNAVAILABLE;
		}

		return {
			version: release.tag_name,
			publishedAt: typeof release.published_at === 'string' ? release.published_at : null
		};
	} catch (error) {
		console.warn('[release] GitHub API request failed; hiding the version.', error);
		return UNAVAILABLE;
	}
}

export const load: PageLoad = async ({ fetch }) => ({ release: await fetchRelease(fetch) });
