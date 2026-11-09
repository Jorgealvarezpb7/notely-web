<script lang="ts">
	import '../app.css';
	import { AUTHOR_NAME, AUTHOR_URL } from '#lib/site.ts';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<!-- Matches --bg in app.css. -->
	<meta name="theme-color" content="#0b0b0c" />
	<meta name="author" content={AUTHOR_NAME} />
	<link rel="me" href={AUTHOR_URL} />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
	<link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
</svelte:head>

<div class="isolate min-h-screen overflow-clip bg-bg text-body antialiased">
	{@render children()}
</div>
