# Design

## Context

- **Colors are already tokens.** `src/app.css` defines all colors as CSS variables on `:root`, together with `color-scheme: dark`. Tailwind maps them through `@theme inline` (`bg-bg`, `text-heading`, `border-line`, …). Components contain no raw colors and no `dark:` variants. There are only two leaks:
  - `color-scheme: dark` is fixed on `:root`.
  - `<meta name="theme-color" content="#0b0b0c">` is hardcoded in `src/routes/+layout.svelte`.
- **The site is fully prerendered** with `adapter-static`. There is no SSR at request time, so the server can never know the visitor's preference. The theme must be resolved on the client before first paint.
- **The accent fails contrast on light.** `#01B36C` is about 2.7:1 on white, below AA. It is used as text in these places:
  - `hover:text-accent`: `HeaderSection`, `FooterSection`, `LanguageSwitcher`
  - `group-hover:text-accent`: `FeatureCard`
  - `text-accent` on `text-xs`: `Badge`
  - `outline-accent`: 4 focus rings
- **The header** holds the logo, 3 links, `LanguageSwitcher` (`hidden sm:block`) and the Download button, with no room to spare at 640px. The footer is one wrapping row: author link on the left, GitHub, License and the year on the right.
- **No CSP** is set in `static/_headers`, so an inline script runs.

## Goals / Non-Goals

**Goals:**
- One source of truth for each theme's colors, in `app.css`.
- Theme resolved and applied before first paint, on every prerendered page.
- One shared theme state, outside any component.

**Non-Goals:**
- Syncing the theme across open tabs through the `storage` event.
- Smooth color transitions when switching theme.
- Theme-specific raster assets: screenshots, logos, OG images.

## Decisions

### 1. Tokens selected by `data-theme` on `<html>`, dark as the fallback

```
:root, :root[data-theme="dark"]  { dark tokens;  color-scheme: dark  }
:root[data-theme="light"]        { light tokens; color-scheme: light }
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

- The attribute always holds the **resolved** theme (`light` or `dark`), never `system`. CSS never needs a media query, and an explicit choice always beats the system.
- With no attribute (JavaScript off), the page is dark, as it is today.
- The `dark` variant is defined for future one-off overrides. Components keep using tokens.
- *Alternative:* `@media (prefers-color-scheme)` for the defaults plus an attribute for overrides. This was rejected because it duplicates every token block and makes the cascade order fragile.

### 2. Light palette

The light palette uses Apple system neutrals, so it matches the macOS app. These are starting values, and contrast is verified as part of the tasks.

| Token | Dark (unchanged) | Light |
|---|---|---|
| `--bg` | `#0b0b0c` | `#ffffff` |
| `--surface` | `#1c1c1e` | `#f5f5f7` |
| `--surface-raised` | `#2c2c2e` | `#e8e8ed` |
| `--heading` | `#ffffff` | `#1d1d1f` |
| `--body` | `#8e8e93` | `#6e6e73` (5.1:1 on white, 4.6:1 on `#f5f5f7`) |
| `--body-on-surface` | `#aeaeb2` | `#515154` |
| `--line` / `--line-strong` | white / 0.1, 0.25 | `rgb(0 0 0 / 0.1)`, `rgb(0 0 0 / 0.2)` |
| `--accent` / `--accent-hover` | `#01b36c` / `#1fc982` | `#01b36c` / `#00a362` |
| `--on-accent` | `#ffffff` | `#ffffff` (owner decision; about 2.7:1 on accent, below AA, see Risks) |
| **`--accent-text`** (new) | `#01b36c` | `#007040` (about 6.2:1 on white, 5.0:1 on `#e8e8ed`) |
| `--glow-primary` / `--glow-secondary` | 0.24 / 0.10 alpha | 0.5 / 0.22 alpha (stronger than dark: a tint on white reads fainter than a glow on black) |
| `--window-shadow` | heavy, 0.85 | `0 30px 80px -20px rgb(0 0 0 / 0.25)` plus the border |
| `--app-icon-shadow` | 0.55 | about 0.2 |
| `--app-icon-fill`, traffic lights | unchanged | unchanged |

- **New `--accent-text` token:** a new `text-accent-text` and `outline-accent-text` utility replaces `text-accent` and `outline-accent` wherever the accent is used as text or a focus ring. `bg-accent` stays as it is.
- *Alternative:* darken `--accent` itself in light mode. This was rejected because it would change the primary button, and the brand green must stay `#01B36C`.

### 3. Inline no-flash script in `src/app.html`

- **Placement:** a small, plain-JavaScript `<script>` placed before `%sveltekit.head%`, so it runs before any stylesheet or paint. A static `<meta name="theme-color" content="#0b0b0c">` sits next to it as the prerendered value.
- **What it does:**
  1. Read `localStorage['notely-theme']` inside try/catch. Anything other than `light`, `dark` or `system` counts as `system`.
  2. Resolve the theme with `matchMedia('(prefers-color-scheme: dark)')`.
  3. Set `document.documentElement.dataset.theme`, `style.colorScheme` and the meta `content`.
- **The meta is moved** out of `+layout.svelte` into `app.html`, so there is a single tag for the script to update.
- **Color duplication:** the background hex values must be written in the script, because CSS has not loaded at that point. A `THEME_COLORS` constant in the theme module mirrors them, with a comment in each place that points to `app.css`.
- *Alternative:* a Svelte `onMount`. This was rejected because it runs after hydration, which causes a visible flash.

### 4. Shared theme state in `src/lib/theme.svelte.ts`

- **What the module holds:**
  - `preference` as rune `$state`: `'light' | 'dark' | 'system'`.
  - `setPreference(p)`: writes storage inside try/catch, then applies the theme.
  - `initTheme()`: reads the preference that the script already resolved, and adds one `matchMedia` `change` listener. The listener applies the theme only while the preference is `system`.
- **Where it starts:** `initTheme()` is called once from `+layout.svelte` in `onMount`, so it never runs during prerendering.
- **Hydration:** before mount, the prerendered HTML has no selected option. After mount, the state matches the DOM, so there is no hydration mismatch.
- **Applying the theme** uses the same three DOM writes as the inline script. The switcher reads the shared module state.

### 5. `ThemeSwitcher.svelte` (molecule)

- **Roles:** a `role="radiogroup"` with an `aria-label` from i18n. Three `<button role="radio" aria-checked>` options use the lucide `sun`, `moon` and `monitor` icons through `Icon.svelte`, and each option gets an i18n `aria-label`.
- **Keyboard:** roving `tabindex`. Arrow keys move focus and select, following the WAI-ARIA radio-group pattern, and Home/End are supported.
- **Visual language:** a pill like `Badge` and the secondary `Button`.
  - The track is `rounded-full border border-line`, and each option is about 28px with a 16px icon.
  - The selected option uses `bg-surface-raised text-heading`, other options use `text-body hover:text-heading`, and focus uses `outline-accent-text`.
- **Hiding without JavaScript:** the switcher carries `data-theme-switcher`. A CSS rule `html:not([data-theme]) [data-theme-switcher] { display: none }` hides it when the script never ran.
- **i18n strings:** new `footer.themeLabel`, `footer.themeLight`, `footer.themeDark` and `footer.themeSystem`. Spanish: "Tema", "Claro", "Oscuro", "Automático". English: "Theme", "Light", "Dark", "Auto". `Dictionary` is typed from `es.ts`, so a missing key fails `svelte-check`.

### 6. Footer placement

- The switcher sits at the end of the footer's right-hand group, after GitHub, License and the year. The group already wraps, so the footer needs no mobile-specific layout.
- There is a single instance, but the state stays in the shared module so a future second placement needs no rework.
- *Alternative:* the header, next to `LanguageSwitcher` and in the mobile menu. This was rejected after review: it crowded the header, and a theme is set once rather than used on every visit.
- *Alternative:* a single cycling icon in the header. This was rejected because cycling hides the other options.

### 7. Screenshot frame

`MacWindow` already has `border-line` and `shadow-window`, which is a token. The light `--window-shadow` plus the existing border gives the hero screenshot (when it exists) and the placeholder a frame on a light page. `MacWindow` needs no new markup.

## Risks / Trade-offs

- **Background hex is duplicated** in the inline script, `theme.svelte.ts` and `app.css`. → Comments in all three places point to each other. There are only two values.
- **A future CSP would block the inline script.** → Note in the proposal: add a `sha256-` hash for it when a CSP is introduced.
- **`#007040` is a deeper green than the brand accent.** → Only text and focus rings use it, and buttons and highlights keep `#01B36C`. This is accepted in the spec as a darker shade of the same green.
- **The switcher is less discoverable in the footer.** → Accepted: Auto is the default, so most visitors never need it.
- **The dark hero screenshot (once added) on a light page** is a deliberate contrast. → The frame border and shadow separate it. Light screenshots are out of scope.
- **White text on `#01B36C` primary buttons is about 2.7:1**, below WCAG AA (4.5:1, or 3:1 for large text), and lower on the dark-theme hover color. → Owner decision to keep white button text. The fix, if needed later, is a darker button fill such as `#007040` (about 6.2:1 with white).
- **A brief flash in browsers with storage disabled:** none. The script falls back to `system` synchronously.


## Migration Plan

This change is visual only and has no data or deploy steps. It ships with the normal static build. Rollback means reverting the commit. Saved preferences would then be ignored, which is harmless.
