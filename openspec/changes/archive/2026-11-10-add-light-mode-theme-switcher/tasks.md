# Tasks

## 1. Theme tokens

- [x] 1.1 In `src/app.css`, make the existing token block apply to `:root, :root[data-theme="dark"]` with `color-scheme: dark`. Add a `:root[data-theme="light"]` block with the light palette from design.md (Decision 2) and `color-scheme: light`. Verify: with no attribute and with `data-theme="dark"` the page looks unchanged, and with `data-theme="light"` it renders light.
- [x] 1.2 Add the `--accent-text` token to both sets: `#01b36c` for dark, `#007040` for light. Map it as `--color-accent-text` in `@theme inline`. Add `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));`. Verify: `bun run check` passes and the `text-accent-text` utility appears in the built CSS.
- [x] 1.3 Replace `text-accent`, `hover:text-accent`, `group-hover:text-accent` and `focus-visible:outline-accent` with the `accent-text` variants in `Badge`, `FeatureCard`, `HeaderSection`, `FooterSection`, `LanguageSwitcher`, `Button` and the menu button. Keep `bg-accent`. Verify: `grep -rnE "(text|outline)-accent\b" src` returns no matches.
- [x] 1.4 Check contrast with a throwaway script in the scratchpad, not in the repo. It computes WCAG ratios for heading, body, body-on-surface and accent-text against `--bg`, `--surface` and `--surface-raised` in both themes, and for on-accent against accent. Verify: every text pair is at least 4.5:1 and the focus ring is at least 3:1. If a pair fails, adjust the light value and update the table in design.md.

## 2. No-flash bootstrap

- [x] 2.1 In `src/app.html`, add the inline script and a static `<meta name="theme-color" content="#0b0b0c">` before `%sveltekit.head%`, as in design.md (Decision 3). Wrap storage access in try/catch, and treat invalid values as `system`. Remove the `theme-color` meta from `src/routes/+layout.svelte`. Verify: the built `build/index.html` contains exactly one `theme-color` meta and the script appears before the stylesheet links.
- [x] 2.2 Add `html:not([data-theme]) [data-theme-switcher] { display: none; }` to `app.css`. Verify: with JavaScript disabled in the browser the page is dark and no switcher is shown.

## 3. Theme state

- [x] 3.1 Create `src/lib/theme.svelte.ts` with the `Preference` type, a `STORAGE_KEY` matching the inline script, `THEME_COLORS` (with a comment pointing to `app.css` and `app.html`), the `preference` rune state, `setPreference()` and `initTheme()`. Storage writes are wrapped in try/catch. The `matchMedia` `change` listener applies the theme only while the preference is `system`. Verify: `bun run check` passes.
- [x] 3.2 Call `initTheme()` once from `onMount` in `src/routes/+layout.svelte`. Verify: `bun run build` prerenders without touching `window` or `localStorage`. In the browser, with Auto selected, toggling the OS or devtools color-scheme emulation switches the page live. With Dark selected it does not.

## 4. Theme switcher

- [x] 4.1 Add `sun`, `moon` and `monitor` from `@lucide/svelte` to `Icon.svelte`. Verify: `bun run check` passes.
- [x] 4.2 Add `footer.themeLabel`, `themeLight`, `themeDark` and `themeSystem` to `src/lib/i18n/es.ts` ("Tema", "Claro", "Oscuro", "Automático") and `en.ts` ("Theme", "Light", "Dark", "Auto"). Verify: `bun run check` passes, since the types catch a missing key.
- [x] 4.3 Create `src/lib/components/molecules/ThemeSwitcher.svelte`, following design.md (Decision 5): a `radiogroup` of three `radio` buttons with `aria-checked`, roving tabindex, Arrow/Home/End keys, i18n labels, the `data-theme-switcher` attribute, and styles from tokens only. Verify in the browser:
  - Tab reaches one option.
  - The arrow keys move focus and change the theme.
  - The focus ring is visible.
  - The accessibility tree shows the group name and the checked option, in both languages.
- [x] 4.4 Place the switcher at the end of the right-hand group in `FooterSection.svelte`, and leave `HeaderSection.svelte` without it. Verify:
  - The header looks as it did before this change at 640px and 1024px.
  - At 360px the footer wraps without overlap and the switcher can be reached.

## 5. Integration checks

- [x] 5.1 Check persistence and edge cases in the browser:
  - Choose Light, reload, then open `/en`: still light, and Light is selected.
  - Set `localStorage['notely-theme'] = 'bogus'`: the page behaves as Auto.
  - Block site data: the page follows the system and the console has no errors.
  - Reload a saved Light theme on a dark system: the page shows no dark frame.
- [x] 5.2 Run `bun run check` and `bun run build`, and both must pass. Lint is not run: the repo has no linter, and adding one is out of scope.
- [x] 5.3 Take screenshots of every main section in light and dark: header, hero (with the window frame), positioning, features, demo, install, open source, footer. Take them at desktop (1280px) and phone (390px) widths,. Save them under the scratchpad and show them to the user. Verify: the light theme reads as the same product, the window frame is visible on light, and the glows are not muddy.
- [x] 5.4 Leave the changes uncommitted. Verify: `git status` shows the changes as unstaged or untracked, and `git log` is unchanged.

## Workflow follow-up

- Archive the change after review, with `/opsx:archive`, which applies the spec deltas to `landing-page`, `site-delivery` and the new `theme` spec.
