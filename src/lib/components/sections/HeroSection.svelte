<script lang="ts">
	import Badge from '#lib/components/atoms/Badge.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import Icon from '#lib/components/atoms/Icon.svelte';
	import { i18n } from '#lib/i18n/index.ts';
	import { DOWNLOAD_URL } from '#lib/site.ts';

	let { version }: { version: string | null } = $props();

	const t = $derived(i18n.t.hero);
	const requirements = $derived([version, t.requirements].filter(Boolean).join(' · '));
</script>

<section
	class="hero-glow relative isolate mx-auto max-w-5xl px-4 pt-16 pb-10 text-center sm:px-6 sm:pt-24 sm:pb-14"
>
	<Badge>{t.badge}</Badge>
	<span class="app-icon mx-auto mt-8 size-40 sm:size-48">
		<img src="/logo-384.png" alt={t.iconAlt} width="192" height="192" />
	</span>
	<h1 class="mx-auto mt-10 max-w-5xl text-hero font-bold text-balance text-heading">
		<span class="block">{t.titleLead}</span>
		<span class="block text-body">{t.titleRest}</span>
	</h1>
	<p class="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-body sm:text-2xl">
		{t.subtitle}
	</p>
	<div class="mt-10">
		<Button href={DOWNLOAD_URL} size="lg">
			<Icon name="download" />
			{t.download}
		</Button>
	</div>
	<p class="mt-4 text-sm text-body">{requirements}</p>
</section>
