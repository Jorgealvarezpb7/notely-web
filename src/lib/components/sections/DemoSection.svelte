<script lang="ts">
	import demoVideo from '#lib/assets/demo/notely-demo.mp4';
	import demoPoster from '#lib/assets/demo/notely-demo-poster.webp';
	import laptopFrame from '#lib/assets/demo/macbook-pro-14-silver.webp';
	import { i18n } from '#lib/i18n/index.ts';

	const t = $derived(i18n.t.demo);
</script>

<!-- Wider than the other sections so the laptop slightly overhangs the header content. -->
<section class="px-4 pb-20 sm:px-6 sm:pb-32">
	<h2 class="sr-only">{t.heading}</h2>
	<div class="relative mx-auto max-w-6xl">
		<video
			src={demoVideo}
			poster={demoPoster}
			aria-label={t.videoLabel}
			autoplay
			muted
			loop
			playsinline
			preload="metadata"
			class="absolute object-cover"
			style="left: 10.829%; top: 11.339%; width: 78.342%; height: 77.323%;"
		></video>
		<img
			src={laptopFrame}
			alt=""
			width="2000"
			height="1316"
			class="pointer-events-none relative block h-auto w-full"
		/>
	</div>
</section>
