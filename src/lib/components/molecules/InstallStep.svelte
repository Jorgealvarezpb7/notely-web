<script lang="ts">
	import Icon, { type IconName } from '#lib/components/atoms/Icon.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		step: number;
		icon: IconName;
		title: string;
		hasNext?: boolean;
		children: Snippet;
	}

	let { step, icon, title, hasNext = false, children }: Props = $props();
</script>

<li class="relative text-center">
	<div class="flex items-center justify-center gap-3 text-heading">
		<span
			class="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-sm font-medium"
			aria-hidden="true"
		>
			{step}
		</span>
		<Icon name={icon} size={40} strokeWidth={1.5} />
	</div>
	<h3 class="mt-5 text-xl font-semibold tracking-tight text-heading">{title}</h3>
	<div class="mt-1.5 leading-relaxed text-body">{@render children()}</div>

	{#if hasNext}
		<!-- Centered in the grid gap: below the step when stacked, beside it in a row. -->
		<span
			class="absolute -bottom-11 left-1/2 -translate-x-1/2 rotate-90 text-body lg:top-2 lg:bottom-auto lg:left-[calc(100%+1.25rem)] lg:translate-x-0 lg:rotate-0"
		>
			<Icon name="arrow-right" size={24} strokeWidth={1.5} />
		</span>
	{/if}
</li>
