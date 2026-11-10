<script lang="ts">
	import Button from '#lib/components/atoms/Button.svelte';
	import Icon from '#lib/components/atoms/Icon.svelte';
	import LanguageSwitcher from '#lib/components/molecules/LanguageSwitcher.svelte';
	import { i18n, localizedPath } from '#lib/i18n/index.ts';
	import { DOWNLOAD_URL, NEW_TAB, REPO_URL } from '#lib/site.ts';

	const t = $derived(i18n.t);

	const links = $derived([
		{
			href: localizedPath(i18n.locale, 'features'),
			label: t.header.features,
			external: false
		},
		{
			href: localizedPath(i18n.locale, 'install'),
			label: t.header.install,
			external: false
		},
		{ href: REPO_URL, label: 'GitHub', external: true }
	]);

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
					{...link.external ? NEW_TAB : {}}
					class="inline-flex items-center gap-1 hover:text-accent-text {linkClass}"
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
	<div
		class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5 md:gap-6"
	>
		<a
			href={localizedPath(i18n.locale)}
			class="flex items-center gap-3 text-lg font-semibold text-heading"
		>
			<span class="app-icon size-10">
				<img src="/logo-80.png" alt="" width="40" height="40" />
			</span>
			Notely
		</a>

		<nav aria-label={t.header.navLabel} class="ml-auto hidden sm:block">
			{@render navLinks('flex gap-4 text-base text-heading md:gap-8', '')}
		</nav>

		<div class="hidden sm:block">
			<LanguageSwitcher />
		</div>

		<div class="flex items-center gap-2">
			<Button href={DOWNLOAD_URL}>{t.header.download}</Button>
			<button
				bind:this={menuButton}
				type="button"
				class="rounded-lg p-2 text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text sm:hidden"
				aria-expanded={menuOpen}
				aria-controls="menu-movil"
				aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
				onclick={() => (menuOpen = !menuOpen)}
			>
				<Icon name={menuOpen ? 'x' : 'menu'} size={24} />
			</button>
		</div>
	</div>

	<nav
		id="menu-movil"
		aria-label={t.header.navLabel}
		hidden={!menuOpen}
		class="border-t border-line px-4 py-2 sm:hidden"
	>
		{@render navLinks('flex flex-col text-base text-heading', 'w-full py-3')}
		<div class="py-3">
			<LanguageSwitcher />
		</div>
	</nav>
</header>
