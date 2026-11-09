<script lang="ts">
	import Badge from '#lib/components/atoms/Badge.svelte';
	import Button from '#lib/components/atoms/Button.svelte';
	import Icon from '#lib/components/atoms/Icon.svelte';
	import MacWindow from '#lib/components/molecules/MacWindow.svelte';
	import { DOWNLOAD_URL } from '#lib/site.ts';

	let { version }: { version: string | null } = $props();

	const requirements = $derived(
		[version, 'macOS 14 o superior', 'Apple Silicon e Intel'].filter(Boolean).join(' · ')
	);
</script>

<section
	class="hero-glow relative isolate mx-auto max-w-5xl px-4 pt-16 pb-20 text-center sm:px-6 sm:pt-24 sm:pb-32"
>
	<Badge>En desarrollo</Badge>
	<span class="app-icon mx-auto mt-8 size-40 sm:size-48">
		<img src="/AppIcon_transparent_full_logo.png" alt="Icono de Notely" width="192" height="192" />
	</span>
	<h1 class="mx-auto mt-10 max-w-4xl text-hero font-bold text-heading">
		Notas adhesivas para macOS: nativas, de código abierto y gratis.
	</h1>
	<p class="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-body sm:text-2xl">
		Notely deja tus ideas a la vista en notas flotantes sobre el escritorio. Apunta algo rápido,
		dale un color y sigue con lo tuyo.
	</p>
	<div class="mt-10">
		<Button href={DOWNLOAD_URL} size="lg">
			<Icon name="download" />
			Descargar para macOS
		</Button>
	</div>
	<p class="mt-4 text-sm text-body">{requirements}</p>

	<div class="mt-16 sm:mt-24">
		<MacWindow>
			{#if __HAS_HERO_SCREENSHOT__}
				<img
					src="/screenshots/hero.png"
					alt="Varias notas de Notely flotando sobre el escritorio de macOS"
					class="block h-auto w-full"
				/>
			{:else}
				<div class="flex aspect-video items-center justify-center p-6">
					<p class="text-sm font-medium text-body">Captura de pantalla próximamente</p>
				</div>
			{/if}
		</MacWindow>
	</div>
</section>
