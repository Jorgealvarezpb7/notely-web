import { defineParams } from '@sveltejs/kit/params';

export const params = defineParams({
	// Spanish lives at `/`, so `es` is deliberately not a valid prefix.
	lang: (param) => (param === 'en' ? param : undefined)
});
