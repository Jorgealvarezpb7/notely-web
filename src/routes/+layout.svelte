<script lang="ts">
	import '../app.css';
	import { i18n } from '#lib/i18n/index.ts';
	import { es } from '#lib/i18n/es.ts';
	import { SITE_URL } from '#lib/site.ts';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	// Only the document title and description are localized so far.
	const { title, description } = es.meta;
	const socialImage = `${SITE_URL}/AppIcon.png`;
</script>

<svelte:head>
	<title>{i18n.t.meta.title}</title>
	<meta name="description" content={i18n.t.meta.description} />
	<link rel="canonical" href={SITE_URL} />
	<link rel="icon" type="image/png" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/AppIcon.png" />

	<meta property="og:type" content="website" />
	<meta property="og:locale" content="es_ES" />
	<meta property="og:site_name" content="Notely" />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={socialImage} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={socialImage} />
</svelte:head>

<div class="isolate min-h-screen overflow-clip bg-bg text-body antialiased">
	{@render children()}
</div>
