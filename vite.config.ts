import { existsSync } from 'node:fs';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter({ pages: 'build', assets: 'build', strict: true }),
			// Project code must use runes; dependencies keep their own mode.
			dynamicCompileOptions: ({ filename }) =>
				filename.includes('node_modules') ? undefined : { runes: true }
		})
	],
	define: {
		// Checked at build time so the HTML never references a missing file.
		__HAS_HERO_SCREENSHOT__: JSON.stringify(existsSync('static/screenshots/hero.png'))
	}
});
