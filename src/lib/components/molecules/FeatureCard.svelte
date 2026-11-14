<script lang="ts">
	interface Props {
		title: string;
		description: string;
		image: string;
		imageAlt: string;
		imageWidth: number;
		imageHeight: number;
		/** Space-separated RGB channels, e.g. "1 179 108", tinting the glow behind the image. */
		glow: string;
		/** Breakpoint from which the card spans two columns; none keeps it one column wide. */
		span?: 'md' | 'lg';
		/** Desktop bento row, which sets the image-area height so cards in a row line up. */
		row: 1 | 2 | 3;
		/** Lets the image sit flush with the bottom of the image area. */
		bleed?: boolean;
	}

	let {
		title,
		description,
		image,
		imageAlt,
		imageWidth,
		imageHeight,
		glow,
		span,
		row,
		bleed = false
	}: Props = $props();

	// Literal class strings so Tailwind can detect them.
	const spanClasses = { md: 'md:col-span-2', lg: 'lg:col-span-2' } as const;
	const rowHeights = { 1: 'lg:h-[25rem]', 2: 'lg:h-[21.25rem]', 3: 'lg:h-[22.5rem]' } as const;
</script>

<article
	class={[
		'flex flex-col overflow-hidden rounded-card border border-line bg-surface',
		span && spanClasses[span]
	]}
	style:--glow={glow}
>
	<div
		class={[
			'media flex h-80 items-center justify-center',
			rowHeights[row],
			bleed ? 'px-12 pt-10' : span ? 'px-12 py-9' : 'px-8 py-9'
		]}
	>
		<img
			src={image}
			alt={imageAlt}
			width={imageWidth}
			height={imageHeight}
			loading="lazy"
			decoding="async"
			class="h-auto max-h-full w-auto max-w-full min-w-0 object-contain"
		/>
	</div>
	<div class="px-8 pt-7 pb-8">
		<h3 class="text-xl font-semibold tracking-tight text-heading">{title}</h3>
		<p class="mt-2 leading-relaxed text-body">{description}</p>
	</div>
</article>

<style>
	.media {
		background: radial-gradient(
			120% 100% at 50% 0%,
			rgb(var(--glow) / var(--feature-glow-alpha)),
			rgb(var(--glow) / 0) 70%
		);
	}

	img {
		filter: var(--feature-shot-shadow);
	}

	@media (prefers-reduced-motion: no-preference) {
		img {
			transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
		}
	}

	article:hover img {
		transform: translateY(-6px) scale(1.015);
	}
</style>
