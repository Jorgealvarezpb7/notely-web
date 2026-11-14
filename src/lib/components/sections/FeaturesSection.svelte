<script lang="ts">
	import FeatureCard from '#lib/components/molecules/FeatureCard.svelte';
	import colorsImage from '#lib/assets/features/colors.webp';
	import floatingImage from '#lib/assets/features/floating.webp';
	import githubImage from '#lib/assets/features/github.webp';
	import linksImage from '#lib/assets/features/links.webp';
	import listsImage from '#lib/assets/features/lists.webp';
	import markdownImage from '#lib/assets/features/markdown.webp';
	import { i18n } from '#lib/i18n/index.ts';
	import type { ComponentProps } from 'svelte';

	const t = $derived(i18n.t);

	// Order and spans form the bento: at lg each row pairs a wide and a narrow card;
	// at md floating and github take full rows and the rest pair up.
	const features: ComponentProps<typeof FeatureCard>[] = $derived([
		{
			...t.features.floating,
			image: floatingImage,
			imageWidth: 1936,
			imageHeight: 1418,
			span: 'md',
			glow: '1 179 108',
			bleed: true,
			row: 1
		},
		{
			...t.features.color,
			image: colorsImage,
			imageWidth: 1192,
			imageHeight: 798,
			glow: '255 55 95',
			row: 1
		},
		{
			...t.features.lists,
			image: listsImage,
			imageWidth: 990,
			imageHeight: 672,
			glow: '254 188 46',
			row: 2
		},
		{
			...t.features.github,
			image: githubImage,
			imageWidth: 988,
			imageHeight: 718,
			span: 'md',
			glow: '175 82 222',
			row: 2
		},
		{
			...t.features.markdown,
			image: markdownImage,
			imageWidth: 1712,
			imageHeight: 746,
			span: 'lg',
			glow: '10 132 255',
			row: 3
		},
		{
			...t.features.links,
			image: linksImage,
			imageWidth: 892,
			imageHeight: 864,
			glow: '48 176 199',
			row: 3
		}
	]);
</script>

<section id={t.anchors.features} class="mx-auto max-w-6xl px-4 section-y sm:px-6">
	<h2 class="text-center text-section font-bold text-heading">{t.features.heading}</h2>
	<div class="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
		{#each features as feature (feature.title)}
			<FeatureCard {...feature} />
		{/each}
	</div>
</section>
