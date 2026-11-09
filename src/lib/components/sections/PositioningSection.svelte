<script lang="ts">
	import Icon from '#lib/components/atoms/Icon.svelte';
	import { i18n } from '#lib/i18n/index.ts';
</script>

<section class="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-32">
	<h2 class="sr-only">{i18n.t.positioning.heading}</h2>
	<div class="flex items-start gap-5 rounded-card bg-surface p-7 sm:gap-8 sm:p-14">
		<span class="shrink-0 text-heading">
			<Icon name="info" size={36} strokeWidth={1.5} />
		</span>
		<p class="text-xl leading-snug font-medium tracking-tight text-heading sm:text-3xl">
			{i18n.t.positioning.text}
		</p>
	</div>
</section>
