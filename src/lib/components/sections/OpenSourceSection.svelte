<script lang="ts">
	import LinkCard from '#lib/components/molecules/LinkCard.svelte';
	import { i18n } from '#lib/i18n/index.ts';
	import { NEW_ISSUE_URL, RELEASES_URL, REPO_URL } from '#lib/site.ts';

	const t = $derived(i18n.t.openSource);
</script>

<section class="mx-auto max-w-5xl px-4 section-y sm:px-6">
	<div class="rounded-card bg-surface p-7 sm:p-14">
		<h2 class="text-center text-section font-bold text-heading">{t.heading}</h2>
		<p
			class="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-body-on-surface sm:text-xl"
		>
			{t.intro}
		</p>
		<div class="mt-10 grid gap-12 md:mt-12 md:grid-cols-3">
			<LinkCard icon="github" {...t.repository} href={REPO_URL} />
			<LinkCard icon="bug" {...t.issue} href={NEW_ISSUE_URL} />
			<LinkCard icon="tag" {...t.releases} href={RELEASES_URL} />
		</div>
	</div>
</section>
