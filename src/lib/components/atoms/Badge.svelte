<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<span class="inline-block rounded-full border border-line px-3 py-1 text-xs font-medium text-accent">
	{@render children()}
</span>
