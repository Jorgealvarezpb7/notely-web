/** Source of truth for the copy. Every other locale is typed against this shape. */
export const es = {
	meta: {
		title: 'Notely: notas adhesivas gratis y de código abierto en macOS',
		description:
			'Notely: notas adhesivas flotantes para macOS, gratis y de código abierto. App nativa con listas de tareas, colores y sincronización con issues de GitHub.',
		ogImageAlt:
			'Icono de Notely junto al texto: Notas adhesivas para macOS. Nativas, de código abierto y gratis.'
	},
	// Section ids, so links read naturally in each language.
	anchors: {
		features: 'funciones',
		install: 'instalacion'
	},
	header: {
		navLabel: 'Principal',
		features: 'Funciones',
		install: 'Instalación',
		download: 'Descargar',
		openMenu: 'Abrir menú',
		closeMenu: 'Cerrar menú',
		languageLabel: 'Idioma'
	},
	hero: {
		badge: 'En desarrollo',
		iconAlt: 'Icono de Notely',
		title: 'Notas adhesivas para macOS: nativas, de código abierto y gratis.',
		subtitle:
			'Notely deja tus ideas a la vista en notas flotantes sobre el escritorio. Apunta algo rápido, dale un color y sigue con lo tuyo.',
		download: 'Descargar para macOS',
		requirements: 'macOS 14 o superior · Apple Silicon e Intel',
		screenshotAlt: 'Varias notas de Notely flotando sobre el escritorio de macOS',
		screenshotPending: 'Captura de pantalla próximamente'
	},
	positioning: {
		heading: '¿Para qué sirve Notely?',
		text: 'Notely no pretende ser tu app de notas definitiva. Es para lo rápido: esa idea, esa lista o ese recordatorio que quieres tener delante mientras trabajas, flotando en tu escritorio hasta que ya no lo necesites.'
	},
	features: {
		heading: 'Funciones',
		floating: {
			title: 'Notas flotantes',
			description:
				'Cada nota vive en su propia ventana y recuerda su texto, su tamaño y su posición entre sesiones.'
		},
		color: {
			title: 'Un color para cada nota',
			description: 'Elige el tono de cada nota para distinguir tus temas de un vistazo.'
		},
		lists: {
			title: 'Listas de tareas',
			description: 'Crea listas con su propio título y marca cada elemento cuando lo termines.'
		},
		markdown: {
			title: 'Descripciones en Markdown',
			description:
				'Añade a los elementos enlazados con un issue una descripción con formato básico: títulos, listas, casillas y código.'
		},
		links: {
			title: 'Enlaces con vista previa',
			description:
				'Escribe una dirección web y Notely muestra una tarjeta con el título, la descripción y la imagen de la página.'
		},
		github: {
			title: 'Sincronización con GitHub',
			description:
				'Mantén tus notas sincronizadas con issues de GitHub. Tu token se guarda en el Llavero de macOS.'
		}
	},
	install: {
		heading: 'Instalación',
		download: {
			title: 'Descarga Notely',
			description: 'Descarga el archivo Notely.dmg.'
		},
		drag: {
			title: 'Arrástrala a Aplicaciones',
			description: 'Abre el archivo .dmg y arrastra Notely a la carpeta Aplicaciones.'
		},
		open: {
			title: 'Ábrela',
			description:
				'Abre Notely desde Aplicaciones. La primera vez, macOS te pedirá que lo autorices.'
		},
		help: {
			heading: '¿macOS no te deja abrirla?',
			intro:
				'Es normal y tiene fácil solución. Notely es gratis y de código abierto, pero no está notarizada por Apple, así que macOS muestra un aviso la primera vez que la abres. Puedes autorizarla en unos segundos, y todo el código está en GitHub por si quieres revisarlo.',
			guides: [
				{
					title: 'macOS 14',
					steps: [
						'Busca Notely en la carpeta Aplicaciones.',
						'Haz Control-clic (o clic derecho) sobre la app y elige Abrir.',
						'En el aviso que aparece, pulsa Abrir otra vez.'
					]
				},
				{
					title: 'macOS 15 o posterior',
					steps: [
						'Intenta abrir Notely una vez. macOS la bloqueará.',
						'Ve a Ajustes del Sistema → Privacidad y seguridad.',
						'Busca el aviso sobre Notely y pulsa "Abrir igualmente".'
					]
				}
			],
			advancedHeading: '¿Sigue sin abrirse? Para usuarios avanzados',
			copy: 'Copiar',
			copied: 'Copiado',
			advancedNote:
				'Este comando del Terminal quita la marca de cuarentena que macOS pone a las apps descargadas, para que deje de bloquear Notely.'
		}
	},
	openSource: {
		heading: 'Código abierto',
		intro:
			'Notely tiene licencia MIT y todo su código está en GitHub. Puedes ver cómo funciona, proponer mejoras o compilarla tú mismo.',
		repository: {
			title: 'Repositorio',
			description: 'Explora el código fuente de Notely en GitHub.'
		},
		issue: {
			title: 'Reportar un problema',
			description: '¿Algo no funciona? Abre un issue y cuéntanoslo.'
		},
		releases: {
			title: 'Versiones y cambios',
			description: 'Consulta las versiones publicadas y qué cambia en cada una.'
		}
	},
	footer: {
		madeBy: 'Hecho por',
		license: 'Licencia MIT'
	}
} as const;

type Widen<T> = T extends string ? string : { [K in keyof T]: Widen<T[K]> };

/** The shape of `es` with its values widened to `string`, tuples kept at their length. */
export type Dictionary = Widen<typeof es>;
