<script lang="ts" module>
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Bug from '@lucide/svelte/icons/bug';
	import Check from '@lucide/svelte/icons/check';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import Copy from '@lucide/svelte/icons/copy';
	import Download from '@lucide/svelte/icons/download';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import FolderInput from '@lucide/svelte/icons/folder-input';
	import Info from '@lucide/svelte/icons/info';
	import Layers from '@lucide/svelte/icons/layers';
	import Link from '@lucide/svelte/icons/link';
	import ListChecks from '@lucide/svelte/icons/list-checks';
	import Menu from '@lucide/svelte/icons/menu';
	import MousePointerClick from '@lucide/svelte/icons/mouse-pointer-click';
	import Palette from '@lucide/svelte/icons/palette';
	import Tag from '@lucide/svelte/icons/tag';
	import Text from '@lucide/svelte/icons/text';
	import X from '@lucide/svelte/icons/x';

	const lucideIcons = {
		'arrow-right': ArrowRight,
		bug: Bug,
		check: Check,
		'chevron-down': ChevronDown,
		copy: Copy,
		download: Download,
		'external-link': ExternalLink,
		'folder-input': FolderInput,
		info: Info,
		layers: Layers,
		link: Link,
		'list-checks': ListChecks,
		menu: Menu,
		'mouse-pointer-click': MousePointerClick,
		palette: Palette,
		tag: Tag,
		text: Text,
		x: X
	};

	export type IconName = keyof typeof lucideIcons | 'github';
</script>

<script lang="ts">
	interface Props {
		name: IconName;
		size?: number;
		strokeWidth?: number;
	}

	let { name, size = 20, strokeWidth = 2 }: Props = $props();
</script>

{#if name === 'github'}
	<!-- Lucide no longer ships brand icons, so the GitHub mark is inlined. -->
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path
			d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
		/>
		<path d="M9 18c-4.51 2-5-2-7-2" />
	</svg>
{:else}
	{@const LucideIcon = lucideIcons[name]}
	<LucideIcon {size} {strokeWidth} aria-hidden="true" />
{/if}
