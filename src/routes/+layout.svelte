<script lang="ts">
	import '../app.css';
	import { SITE_URL } from '#lib/site.ts';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	const title = 'Notely · Notas adhesivas para macOS';
	const description =
		'Notas adhesivas flotantes para macOS. Nativa, de código abierto y gratis, con listas de tareas, un color para cada nota y sincronización con issues de GitHub.';
	const socialImage = `${SITE_URL}/AppIcon.png`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
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
