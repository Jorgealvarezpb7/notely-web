<script lang="ts">
	import Badge from '#lib/components/atoms/Badge.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import Icon from '#lib/components/atoms/Icon.svelte';
	import MacWindow from '#lib/components/molecules/MacWindow.svelte';
	import { i18n } from '#lib/i18n/index.ts';
	import { DOWNLOAD_URL } from '#lib/site.ts';

	let { version }: { version: string | null } = $props();

	const t = $derived(i18n.t.hero);
	const requirements = $derived([version, t.requirements].filter(Boolean).join(' · '));
</script>

<section
	class="hero-glow relative isolate mx-auto max-w-5xl px-4 pt-16 pb-20 text-center sm:px-6 sm:pt-24 sm:pb-32"
>
	<Badge>{t.badge}</Badge>
	<span class="app-icon mx-auto mt-8 size-40 sm:size-48">
		<img src="/logo-384.png" alt={t.iconAlt} width="192" height="192" />
	</span>
	<h1 class="mx-auto mt-10 max-w-4xl text-hero font-bold text-heading">
		{t.title}
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

	<div class="mt-16 sm:mt-24">
		<MacWindow>
			{#if __HAS_HERO_SCREENSHOT__}
				<!-- Same 16:9 ratio as the placeholder below; update if the screenshot differs. -->
				<img
					src="/screenshots/hero.png"
					alt={t.screenshotAlt}
					width="1920"
					height="1080"
					loading="lazy"
					class="block h-auto w-full"
				/>
			{:else}
				<div class="flex aspect-video items-center justify-center p-6">
					<p class="text-sm font-medium text-body">{t.screenshotPending}</p>
				</div>
			{/if}
		</MacWindow>
	</div>
</section>
