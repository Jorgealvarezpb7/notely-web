<script lang="ts">
	import { i18n } from '#lib/i18n/index.ts';
	import { AUTHOR_NAME, AUTHOR_URL, LICENSE_URL, NEW_TAB, REPO_URL } from '#lib/site.ts';

	const t = $derived(i18n.t.footer);
	const year = new Date().getFullYear();
</script>

<footer class="footer-glow relative border-t border-line">
	<div
		class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-8 text-xs text-body-on-surface sm:px-6"
	>
		<p>
			{t.madeBy}
			<a href={AUTHOR_URL} {...NEW_TAB} class="text-heading hover:text-accent">{AUTHOR_NAME}</a>
		</p>
		<div class="flex flex-wrap items-center gap-x-5 gap-y-2">
			<a href={REPO_URL} {...NEW_TAB} class="hover:text-accent">GitHub</a>
			<a href={LICENSE_URL} {...NEW_TAB} class="hover:text-accent">{t.license}</a>
			<span>{year}</span>
		</div>
	</div>
</footer>
