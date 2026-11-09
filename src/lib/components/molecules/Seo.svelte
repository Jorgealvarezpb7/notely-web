<script lang="ts">
	import { jsonLdScript, type SeoProps } from '#lib/seo.ts';

	let {
		title,
		description,
		url,
		alternates,
		ogLocale,
		ogLocaleAlternates,
		image,
		jsonLd
	}: SeoProps = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	{#each alternates as alternate (alternate.hreflang)}
		<link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
	{/each}

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Notely" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:locale" content={ogLocale} />
	{#each ogLocaleAlternates as alternate (alternate)}
		<meta property="og:locale:alternate" content={alternate} />
	{/each}
	<meta property="og:image" content={image.url} />
	<meta property="og:image:width" content={String(image.width)} />
	<meta property="og:image:height" content={String(image.height)} />
	<meta property="og:image:alt" content={image.alt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image.url} />
	<meta name="twitter:image:alt" content={image.alt} />

	{@html jsonLdScript(jsonLd)}
</svelte:head>
