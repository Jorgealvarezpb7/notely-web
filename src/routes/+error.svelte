<script lang="ts">
	import { page } from '$app/state';
	import Button from '#lib/components/atoms/Button.svelte';
	import FooterSection from '#lib/components/sections/FooterSection.svelte';
	import HeaderSection from '#lib/components/sections/HeaderSection.svelte';
	import { i18n, localizedPath } from '#lib/i18n/index.ts';

	const t = $derived(i18n.t.notFound);

	// Every language shares one static 404.html, so the build can't set this.
	$effect(() => {
		document.documentElement.lang = i18n.locale;
	});
</script>

<svelte:head>
	<title>{t.metaTitle}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<!-- Full page loads, so visitors leave for the prerendered pages and their build-time data. -->
<div class="flex min-h-screen flex-col" data-sveltekit-reload>
	<HeaderSection />
	<main class="flex flex-1 items-center">
		<section
			class="hero-glow relative isolate mx-auto w-full max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-32"
		>
			<p class="text-hero font-bold text-heading">{page.status}</p>
			<h1 class="mt-6 text-section font-bold text-heading">{t.heading}</h1>
			<p class="mx-auto mt-5 max-w-2xl text-xl leading-relaxed text-body">{t.message}</p>
			<div class="mt-10">
				<Button href={localizedPath(i18n.locale)} size="lg">{t.home}</Button>
			</div>
		</section>
	</main>
	<FooterSection />
</div>
