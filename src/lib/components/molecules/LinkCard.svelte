<script lang="ts">
	import Icon, { type IconName } from '#lib/components/atoms/Icon.svelte';
	import { NEW_TAB } from '#lib/site.ts';

	interface Props {
		icon: IconName;
		title: string;
		description: string;
		href: string;
	}

	let { icon, title, description, href }: Props = $props();
</script>

<a
	{href}
	{...NEW_TAB}
	class="group block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text"
>
	<span class="inline-flex text-heading">
		<Icon name={icon} size={40} strokeWidth={1.5} />
	</span>
	<h3 class="mt-5 text-xl font-semibold tracking-tight text-heading group-hover:text-accent-text">
		{title}
	</h3>
	<p class="mt-2 leading-relaxed text-body">{description}</p>
</a>
