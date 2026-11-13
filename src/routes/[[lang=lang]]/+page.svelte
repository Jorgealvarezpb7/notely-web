<script lang="ts">
	import Seo from '#lib/components/molecules/Seo.svelte';
	import DemoSection from '#lib/components/sections/DemoSection.svelte';
	import FeaturesSection from '#lib/components/sections/FeaturesSection.svelte';
	import FooterSection from '#lib/components/sections/FooterSection.svelte';
	import HeaderSection from '#lib/components/sections/HeaderSection.svelte';
	import HeroSection from '#lib/components/sections/HeroSection.svelte';
	import InstallSection from '#lib/components/sections/InstallSection.svelte';
	import OpenSourceSection from '#lib/components/sections/OpenSourceSection.svelte';
	import { i18n } from '#lib/i18n/index.ts';
	import { landingSeo } from '#lib/seo.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const seo = $derived(landingSeo(i18n.locale, i18n.t, data.release.version));
</script>

<Seo {...seo} />

<HeaderSection />
<main>
	<HeroSection version={data.release.version} />
	<DemoSection />
	<FeaturesSection />
	<InstallSection />
	<OpenSourceSection />
</main>
<FooterSection />
