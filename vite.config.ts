import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			// Without a 404.html, Cloudflare Pages answers unknown paths with the home page.
			adapter: adapter({ pages: 'build', assets: 'build', fallback: '404.html', strict: true }),
			// Project code must use runes; dependencies keep their own mode.
			dynamicCompileOptions: ({ filename }) =>
				filename.includes('node_modules') ? undefined : { runes: true }
		})
	]
});
