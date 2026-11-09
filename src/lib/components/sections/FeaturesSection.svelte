<script lang="ts">
	import FeatureCard from '#lib/components/molecules/FeatureCard.svelte';
	import type { ComponentProps } from 'svelte';

	const features: ComponentProps<typeof FeatureCard>[] = [
		{
			icon: 'layers',
			title: 'Notas flotantes',
			description:
				'Cada nota vive en su propia ventana y recuerda su texto, su tamaño y su posición entre sesiones.'
		},
		{
			icon: 'palette',
			title: 'Un color para cada nota',
			description: 'Elige el tono de cada nota para distinguir tus temas de un vistazo.'
		},
		{
			icon: 'list-checks',
			title: 'Listas de tareas',
			description: 'Crea listas con su propio título y marca cada elemento cuando lo termines.'
		},
		{
			icon: 'text',
			title: 'Descripciones en Markdown',
			description:
				'Añade a los elementos enlazados con un issue una descripción con formato básico: títulos, listas, casillas y código.'
		},
		{
			icon: 'link',
			title: 'Enlaces con vista previa',
			description:
				'Escribe una dirección web y Notely muestra una tarjeta con el título, la descripción y la imagen de la página.'
		},
		{
			icon: 'github',
			title: 'Sincronización con GitHub',
			description:
				'Mantén tus notas sincronizadas con issues de GitHub. Tu token se guarda en el Llavero de macOS.'
		}
	];
</script>

<section id="funciones" class="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-32">
	<h2 class="text-center text-section font-bold text-heading">Funciones</h2>
	<div class="mt-16 grid gap-x-20 gap-y-14 md:grid-cols-2 md:gap-y-20">
		{#each features as feature (feature.title)}
			<FeatureCard {...feature} />
		{/each}
	</div>
</section>
