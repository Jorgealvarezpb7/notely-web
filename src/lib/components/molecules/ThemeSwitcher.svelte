<script lang="ts">
	import Icon, { type IconName } from '#lib/components/atoms/Icon.svelte';
	import { i18n } from '#lib/i18n/index.ts';
	import { PREFERENCES, setPreference, theme, type Preference } from '#lib/theme.svelte.ts';

	const t = $derived(i18n.t.footer);

	const options = $derived<{ value: Preference; icon: IconName; label: string }[]>([
		{ value: 'light', icon: 'sun', label: t.themeLight },
		{ value: 'dark', icon: 'moon', label: t.themeDark },
		{ value: 'system', icon: 'monitor', label: t.themeSystem }
	]);

	// Before the theme state loads, Auto takes the tab stop, as it is the default.
	const tabStop = $derived(theme.preference ?? 'system');

	let buttons: HTMLButtonElement[] = $state([]);

	/** WAI-ARIA radio group: arrows and Home/End move focus and select. */
	function onkeydown(event: KeyboardEvent, index: number) {
		const last = PREFERENCES.length - 1;
		const next = {
			ArrowRight: index === last ? 0 : index + 1,
			ArrowDown: index === last ? 0 : index + 1,
			ArrowLeft: index === 0 ? last : index - 1,
			ArrowUp: index === 0 ? last : index - 1,
			Home: 0,
			End: last
		}[event.key];
		if (next === undefined) return;
		event.preventDefault();
		setPreference(PREFERENCES[next]);
		buttons[next]?.focus();
	}
</script>

<div
	role="radiogroup"
	aria-label={t.themeLabel}
	data-theme-switcher
	class="inline-flex items-center gap-0.5 rounded-full border border-line p-0.5"
>
	{#each options as option, index (option.value)}
		{@const checked = theme.preference === option.value}
		<button
			bind:this={buttons[index]}
			type="button"
			role="radio"
			aria-checked={checked}
			aria-label={option.label}
			title={option.label}
			tabindex={option.value === tabStop ? 0 : -1}
			onclick={() => setPreference(option.value)}
			onkeydown={(event) => onkeydown(event, index)}
			class="grid size-7 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text {checked
				? 'bg-surface-raised text-heading'
				: 'text-body hover:text-heading'}"
		>
			<Icon name={option.icon} size={16} />
		</button>
	{/each}
</div>
