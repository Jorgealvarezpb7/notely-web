<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="overflow-hidden rounded-xl border border-line bg-surface shadow-window">
	<div class="flex gap-2 border-b border-line bg-surface-raised px-4 py-3" aria-hidden="true">
		<span class="size-3 rounded-full bg-traffic-red"></span>
		<span class="size-3 rounded-full bg-traffic-yellow"></span>
		<span class="size-3 rounded-full bg-traffic-green"></span>
	</div>
	{@render children()}
</div>
