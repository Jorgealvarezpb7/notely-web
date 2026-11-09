<script lang="ts">
	import DemoSection from '#lib/components/sections/DemoSection.svelte';
	import FeaturesSection from '#lib/components/sections/FeaturesSection.svelte';
	import FooterSection from '#lib/components/sections/FooterSection.svelte';
	import HeaderSection from '#lib/components/sections/HeaderSection.svelte';
	import HeroSection from '#lib/components/sections/HeroSection.svelte';
	import InstallSection from '#lib/components/sections/InstallSection.svelte';
	import OpenSourceSection from '#lib/components/sections/OpenSourceSection.svelte';
	import PositioningSection from '#lib/components/sections/PositioningSection.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<HeaderSection />
<main>
	<HeroSection version={data.release.version} />
	<PositioningSection />
	<FeaturesSection />
	<DemoSection />
	<InstallSection />
	<OpenSourceSection />
</main>
<FooterSection />
