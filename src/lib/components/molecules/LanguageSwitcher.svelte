<script lang="ts">
	import { page } from '$app/state';
	import { anchorFromHash, i18n, LOCALE_NAMES, LOCALES, localizedPath } from '#lib/i18n/index.ts';

	const anchor = $derived(anchorFromHash(i18n.locale, page.url.hash));
</script>

<div role="group" aria-label={i18n.t.header.languageLabel} class="flex items-center gap-1.5 text-sm">
	{#each LOCALES as locale, index (locale)}
		{#if index > 0}
			<span class="text-body" aria-hidden="true">/</span>
		{/if}
		<!-- A full page load, so the <html lang> set at build time always matches the page. -->
		<a
			href={localizedPath(locale, anchor)}
			lang={locale}
			aria-label={LOCALE_NAMES[locale]}
			aria-current={locale === i18n.locale ? 'page' : undefined}
			data-sveltekit-reload
			class="uppercase hover:text-accent-text {locale === i18n.locale
				? 'font-semibold text-heading'
				: 'text-body'}"
		>
			{locale}
		</a>
	{/each}
</div>
