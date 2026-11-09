<script lang="ts">
	import FeatureCard from '#lib/components/molecules/FeatureCard.svelte';
	import { i18n } from '#lib/i18n/index.ts';
	import type { ComponentProps } from 'svelte';

	const t = $derived(i18n.t);

	const features: ComponentProps<typeof FeatureCard>[] = $derived([
		{ icon: 'layers', ...t.features.floating },
		{ icon: 'palette', ...t.features.color },
		{ icon: 'list-checks', ...t.features.lists },
		{ icon: 'text', ...t.features.markdown },
		{ icon: 'link', ...t.features.links },
		{ icon: 'github', ...t.features.github }
	]);
</script>

<section id={t.anchors.features} class="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-32">
	<h2 class="text-center text-section font-bold text-heading">{t.features.heading}</h2>
	<div class="mt-16 grid gap-x-20 gap-y-14 md:grid-cols-2 md:gap-y-20">
		{#each features as feature (feature.title)}
			<FeatureCard {...feature} />
		{/each}
	</div>
</section>
