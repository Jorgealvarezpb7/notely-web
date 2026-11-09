<script lang="ts">
	import Button from '#lib/components/atoms/Button.svelte';
	import Icon from '#lib/components/atoms/Icon.svelte';
	import InstallStep from '#lib/components/molecules/InstallStep.svelte';
	import { i18n } from '#lib/i18n/index.ts';

	const QUARANTINE_COMMAND = 'xattr -dr com.apple.quarantine /Applications/Notely.app';
	const COPIED_FEEDBACK_MS = 2000;

	const t = $derived(i18n.t.install);

	let copied = $state(false);
	let resetTimer: ReturnType<typeof setTimeout> | undefined;

	async function copyCommand() {
		try {
			await navigator.clipboard.writeText(QUARANTINE_COMMAND);
		} catch {
			// The command stays visible and selectable when the clipboard is unavailable.
			return;
		}
		copied = true;
		clearTimeout(resetTimer);
		resetTimer = setTimeout(() => (copied = false), COPIED_FEEDBACK_MS);
	}

	$effect(() => () => clearTimeout(resetTimer));
</script>

<section id={i18n.t.anchors.install} class="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-32">
	<h2 class="text-center text-section font-bold text-heading">{t.heading}</h2>

	<ol class="mt-16 grid gap-16 lg:grid-cols-3">
		<InstallStep step={1} icon="download" title={t.download.title} hasNext>
			<p>{t.download.description}</p>
		</InstallStep>
		<InstallStep step={2} icon="folder-input" title={t.drag.title} hasNext>
			<p>{t.drag.description}</p>
		</InstallStep>
		<InstallStep step={3} icon="mouse-pointer-click" title={t.open.title}>
			<p>{t.open.description}</p>
		</InstallStep>
	</ol>

	<details class="group mt-16 rounded-card bg-surface">
		<summary
			class="flex cursor-pointer list-none items-center justify-between gap-4 rounded-card p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-10 [&::-webkit-details-marker]:hidden"
		>
			<h3 class="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
				{t.help.heading}
			</h3>
			<span class="shrink-0 text-heading transition group-open:rotate-180">
				<Icon name="chevron-down" size={28} strokeWidth={1.5} />
			</span>
		</summary>

		<div class="px-6 pb-6 sm:px-10 sm:pb-10">
			<p class="leading-relaxed text-body-on-surface">
				{t.help.intro}
			</p>

			<div class="mt-8 grid gap-4 sm:grid-cols-2">
				{#each t.help.guides as guide (guide.title)}
					<div class="rounded-2xl bg-surface-raised p-5">
						<h4 class="font-semibold text-heading">{guide.title}</h4>
						<ol
							class="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-body-on-surface"
						>
							{#each guide.steps as step (step)}
								<li>{step}</li>
							{/each}
						</ol>
					</div>
				{/each}
			</div>

			<div class="mt-8">
				<h4 class="font-semibold text-heading">{t.help.advancedHeading}</h4>
				<div class="mt-3 flex flex-wrap items-center gap-2">
					<pre
						class="max-w-full min-w-0 flex-1 overflow-x-auto rounded-xl border border-line bg-bg px-4 py-3 font-mono text-sm text-heading"><code
							class="select-all">{QUARANTINE_COMMAND}</code></pre>
					<Button variant="secondary" size="sm" onclick={copyCommand}>
						<Icon name={copied ? 'check' : 'copy'} size={16} />
						<span aria-live="polite">{copied ? t.help.copied : t.help.copy}</span>
					</Button>
				</div>
				<p class="mt-3 text-sm leading-relaxed text-body-on-surface">
					{t.help.advancedNote}
				</p>
			</div>
		</div>
	</details>
</section>
