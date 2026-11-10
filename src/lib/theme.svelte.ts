export const PREFERENCES = ['light', 'dark', 'system'] as const;
export type Preference = (typeof PREFERENCES)[number];
type Theme = Exclude<Preference, 'system'>;

/** Same key as the inline script in src/app.html. */
const STORAGE_KEY = 'notely-theme';

/** --bg of each theme in src/app.css, used for <meta name="theme-color">. Also in src/app.html. */
const THEME_COLORS: Record<Theme, string> = { light: '#ffffff', dark: '#0b0b0c' };

const LIGHT_QUERY = '(prefers-color-scheme: light)';

// Null until initTheme() runs in the browser, so prerendered HTML marks no option.
let current = $state<Preference | null>(null);

function readStored(): Preference {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'light' || stored === 'dark') return stored;
	} catch {
		// Storage blocked: follow the system.
	}
	return 'system';
}

function resolve(preference: Preference): Theme {
	if (preference !== 'system') return preference;
	return matchMedia(LIGHT_QUERY).matches ? 'light' : 'dark';
}

/** Same DOM writes as the inline script in src/app.html. */
function applyTheme(theme: Theme) {
	const root = document.documentElement;
	root.dataset.theme = theme;
	root.style.colorScheme = theme;
	document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}

/** Current theme preference. Read it from a component, e.g. `theme.preference`. */
export const theme = {
	get preference(): Preference | null {
		return current;
	}
};

/** Saves the choice and applies it. The theme changes even when storage is blocked. */
export function setPreference(preference: Preference) {
	current = preference;
	try {
		if (preference === 'system') localStorage.removeItem(STORAGE_KEY);
		else localStorage.setItem(STORAGE_KEY, preference);
	} catch {
		// Storage blocked: the choice lasts until the page is left.
	}
	applyTheme(resolve(preference));
}

/**
 * Reads the preference the inline script already applied and follows system
 * changes while it is `system`. Call once, in the browser. Returns a cleanup.
 */
export function initTheme(): () => void {
	current = readStored();
	const media = matchMedia(LIGHT_QUERY);
	const onChange = () => {
		if (current === 'system') applyTheme(resolve('system'));
	};
	media.addEventListener('change', onChange);
	return () => media.removeEventListener('change', onChange);
}
