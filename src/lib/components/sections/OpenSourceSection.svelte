<script lang="ts">
	import FeatureCard from '#lib/components/molecules/FeatureCard.svelte';
	import { NEW_ISSUE_URL, RELEASES_URL, REPO_URL } from '#lib/site.ts';
</script>

<section class="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-32">
	<div class="rounded-card bg-surface p-7 sm:p-14">
		<h2 class="text-center text-section font-bold text-heading">Código abierto</h2>
		<p
			class="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-body-on-surface sm:text-xl"
		>
			Notely tiene licencia MIT y todo su código está en GitHub. Puedes ver cómo funciona, proponer
			mejoras o compilarla tú mismo.
		</p>
		<div class="mt-14 grid gap-12 md:grid-cols-3">
			<FeatureCard
				icon="github"
				title="Repositorio"
				description="Explora el código fuente de Notely en GitHub."
				href={REPO_URL}
			/>
			<FeatureCard
				icon="bug"
				title="Reportar un problema"
				description="¿Algo no funciona? Abre un issue y cuéntanoslo."
				href={NEW_ISSUE_URL}
			/>
			<FeatureCard
				icon="tag"
				title="Versiones y cambios"
				description="Consulta las versiones publicadas y qué cambia en cada una."
				href={RELEASES_URL}
			/>
		</div>
	</div>
</section>
