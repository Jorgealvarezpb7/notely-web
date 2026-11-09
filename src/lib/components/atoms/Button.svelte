<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		variant?: 'primary' | 'secondary';
		size?: 'sm' | 'md' | 'lg';
		onclick?: () => void;
		children: Snippet;
	}

	let { href, variant = 'primary', size = 'md', onclick, children }: Props = $props();

	const variants = {
		primary: 'bg-accent text-on-accent hover:bg-accent-hover',
		secondary: 'border border-line text-body-on-surface hover:text-heading'
	};

	const sizes = {
		sm: 'px-3.5 py-1.5 text-sm',
		md: 'px-5 py-2 text-sm',
		lg: 'px-7 py-3.5 text-lg'
	};

	const classes = $derived(
		`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${variants[variant]} ${sizes[size]}`
	);
</script>

{#if href}
	<a {href} class={classes}>{@render children()}</a>
{:else}
	<button type="button" {onclick} class={classes}>{@render children()}</button>
{/if}
