<script lang="ts">
	import Button from '#lib/components/atoms/Button.svelte';
	import Icon from '#lib/components/atoms/Icon.svelte';
	import { DOWNLOAD_URL, REPO_URL } from '#lib/site.ts';

	const links = [
		{ href: '#funciones', label: 'Funciones', external: false },
		{ href: '#instalacion', label: 'Instalación', external: false },
		{ href: REPO_URL, label: 'GitHub', external: true }
	];

	let menuOpen = $state(false);
	let menuButton = $state<HTMLButtonElement>();

	function closeOnEscape(event: KeyboardEvent) {
		if (event.key !== 'Escape' || !menuOpen) return;
		menuOpen = false;
		menuButton?.focus();
	}
</script>

<svelte:window onkeydown={closeOnEscape} />

{#snippet navLinks(listClass: string, linkClass: string)}
	<ul class={listClass}>
		{#each links as link (link.href)}
			<li>
				<a
					href={link.href}
					class="inline-flex items-center gap-1 hover:text-accent {linkClass}"
					onclick={() => (menuOpen = false)}
				>
					{link.label}
					{#if link.external}
						<Icon name="external-link" size={14} />
					{/if}
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

<header
	class="sticky top-0 z-10 border-b border-line bg-bg/70 backdrop-blur-xl backdrop-saturate-150"
>
	<div class="mx-auto flex max-w-5xl items-center justify-between gap-6 px-4 py-4 sm:px-6 sm:py-5">
		<a href="/" class="flex items-center gap-3 text-lg font-semibold text-heading">
			<span class="app-icon size-10">
				<img src="/AppIcon_transparent_full_logo.png" alt="" width="40" height="40" />
			</span>
			Notely
		</a>

		<nav aria-label="Principal" class="ml-auto hidden sm:block">
			{@render navLinks('flex gap-8 text-base text-heading', '')}
		</nav>

		<div class="flex items-center gap-2">
			<Button href={DOWNLOAD_URL}>Descargar</Button>
			<button
				bind:this={menuButton}
				type="button"
				class="rounded-lg p-2 text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:hidden"
				aria-expanded={menuOpen}
				aria-controls="menu-movil"
				aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
				onclick={() => (menuOpen = !menuOpen)}
			>
				<Icon name={menuOpen ? 'x' : 'menu'} size={24} />
			</button>
		</div>
	</div>

	<nav
		id="menu-movil"
		aria-label="Principal"
		hidden={!menuOpen}
		class="border-t border-line px-4 py-2 sm:hidden"
	>
		{@render navLinks('flex flex-col text-base text-heading', 'w-full py-3')}
	</nav>
</header>
