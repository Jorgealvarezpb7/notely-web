# Proposal

## Why

The Notely site renders only in a dark theme, even for visitors whose system prefers light mode. Visitors should be able to read the site in light mode, either by following their system or by choosing a theme themselves. The color tokens in `src/app.css` were set up for this, so a light theme does not need changes to how components use color.

## What Changes

- Add a light color palette next to the existing dark one. Both are defined as CSS variables in `src/app.css`, selected by a `data-theme` attribute on `<html>`. The light palette keeps the product's look: same accent, retuned surfaces, glows and shadows. It is not an inversion.
- Add a theme preference with three values: `light`, `dark` and `system` (shown as "Auto"). The default is `system`. The preference is stored in `localStorage`, and every storage access is guarded so it cannot throw.
- In Auto mode, the theme follows `prefers-color-scheme` and updates live when the system setting changes.
- Prevent a flash of the wrong theme. A small inline script in `src/app.html` sets `data-theme`, `color-scheme` and `<meta name="theme-color">` before first paint. The site stays fully prerendered.
- Add a three-option theme switcher (sun / moon / monitor) to the footer, next to the GitHub and license links and the year. It is keyboard accessible, with translated labels and the active option marked. The header is unchanged, because a theme is set once and the header has no room to spare.
- Add a darker accent-text token for text and focus rings in light mode, so they meet WCAG AA. Fills such as the primary button keep `#01B36C`.
- Primary buttons (the download buttons) use white text on `#01B36C` in both themes, as the spec already requires. The site rendered dark text until now.
- **BREAKING (spec)**: remove the "Dark theme only" requirement. Visitors with a light system preference will see the light theme by default.
- `theme-color` is no longer a single fixed `#0b0b0c`. It now follows the active theme.
- The hero screenshot (`static/screenshots/hero.png`, not added yet) stays a single image. It stays inside the existing window frame, and the frame's shadow becomes theme-aware so the screenshot still sits well on a light page.

## Capabilities

### New Capabilities
- `theme`: choosing, saving and applying the light or dark theme. This covers the stored preference, following the system, applying the theme without a flash, and the theme switcher control.

### Modified Capabilities
- `landing-page`:
  - "Dark theme only" is removed and replaced by a light and dark theme requirement.
  - "Accent color" allows a darker shade of the accent for text in light mode, and the primary button scenario states white text in both themes.
  - "Footer" adds the theme switcher.
- `site-delivery`: "Site-wide head tags" makes `theme-color` follow the active theme instead of always being `#0b0b0c`.

## Impact

- **Code:**
  - `src/app.css`: light and dark token sets, the `dark` custom variant, and new tokens.
  - `src/app.html`: inline no-flash script and `theme-color` meta.
  - `src/routes/+layout.svelte`: remove the fixed `theme-color` meta.
  - New `src/lib/theme.svelte.ts` and `src/lib/components/molecules/ThemeSwitcher.svelte`.
  - `FooterSection.svelte`: place the switcher. `Icon.svelte`: add the sun, moon and monitor icons.
  - `src/lib/i18n/en.ts` and `src/lib/i18n/es.ts`: new strings.
  - Components that use `text-accent` or `outline-accent` move to the accent-text token.
- **Dependencies:** none new. The icons come from `@lucide/svelte`, which is already installed.
- **Delivery:** the site stays fully static and prerendered. There is no CSP in `static/_headers`, so the inline script is allowed. Adding a CSP later would need a hash for this script.
- **Out of scope:**
  - Light versions of app screenshots.
  - Theme-specific OG images or app icons.
  - Adding a linter.
