declare global {
	/** True when static/screenshots/hero.png exists at build time. */
	const __HAS_HERO_SCREENSHOT__: boolean;

	namespace App {}
}

export {};
