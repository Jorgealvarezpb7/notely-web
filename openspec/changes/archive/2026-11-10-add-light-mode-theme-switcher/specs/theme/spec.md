# Spec Delta

## Purpose

Let visitors read the site in a light or dark theme, either following their system color preference or a choice they make, applied without a flash of the wrong theme.

## ADDED Requirements

### Requirement: Theme preference

The site SHALL support a theme preference with three values: `light`, `dark` and `system`. The default SHALL be `system`. In `system`, the theme SHALL be light when the visitor's system prefers light, and dark otherwise.

#### Scenario: First visit with light system preference
- **WHEN** a visitor with no saved preference opens the site and their system prefers light
- **THEN** the page renders in the light theme

#### Scenario: First visit with dark system preference
- **WHEN** a visitor with no saved preference opens the site and their system prefers dark
- **THEN** the page renders in the dark theme

#### Scenario: Explicit choice overrides system
- **WHEN** a visitor has chosen `dark` and their system prefers light
- **THEN** the page renders in the dark theme

### Requirement: Saved preference

The site SHALL save the visitor's theme choice in the browser and apply it on later visits, on every page and language. If browser storage is unavailable or fails, the site SHALL fall back to `system` without errors.

#### Scenario: Choice persists across visits
- **WHEN** a visitor chooses `light`, then reloads or opens the other language
- **THEN** the page renders in the light theme and the switcher shows Light as selected

#### Scenario: Storage blocked
- **WHEN** browser storage throws on read or write
- **THEN** the page renders following the system preference, the switcher still changes the theme for the current page, and no error reaches the console

#### Scenario: Invalid stored value
- **WHEN** the stored value is not `light`, `dark` or `system`
- **THEN** the site treats the preference as `system`

### Requirement: Live system following

While the preference is `system`, the site SHALL switch theme immediately when the visitor's system color preference changes, without a reload.

#### Scenario: System switches while page is open
- **WHEN** the preference is `system` and the visitor's OS changes from dark to light
- **THEN** the page switches to the light theme without reloading

#### Scenario: Explicit choice ignores system changes
- **WHEN** the preference is `dark` and the OS changes to light
- **THEN** the page stays in the dark theme

### Requirement: No flash of the wrong theme

The resolved theme SHALL be applied before the page's first paint, including on prerendered pages. Native form controls and scrollbars SHALL match the theme, and the browser `theme-color` SHALL match the theme's background.

#### Scenario: Reload with saved light theme on a dark system
- **WHEN** a visitor who chose `light` reloads the page on a dark system
- **THEN** no frame renders with the dark background before the light theme appears

#### Scenario: Theme color follows theme
- **WHEN** the theme changes, at load or through the switcher
- **THEN** the page's `theme-color` matches the active theme's background and `color-scheme` matches the active theme

### Requirement: Fallback without JavaScript

When JavaScript does not run, the page SHALL render in the dark theme, and the theme switcher SHALL NOT be shown as an interactive control that does nothing.

#### Scenario: JavaScript disabled
- **WHEN** the page loads with JavaScript disabled
- **THEN** the page renders in the dark theme and no theme switcher is visible

### Requirement: Theme switcher

The footer SHALL show a theme switcher with three options, Light, Dark and Auto, each shown as an icon (sun, moon, monitor). The control SHALL mark the option that matches the current preference, with Auto for `system`.

#### Scenario: Choosing an option
- **WHEN** a visitor activates Light
- **THEN** the page switches to the light theme, the choice is saved, and Light is marked as selected

#### Scenario: Choosing Auto
- **WHEN** a visitor activates Auto
- **THEN** the page follows the system color preference and Auto is marked as selected

### Requirement: Theme switcher accessibility

The theme switcher SHALL be a single labeled group that is reachable and operable by keyboard. Each option SHALL have an accessible name in the page's language, and assistive technology SHALL be told which option is selected.

#### Scenario: Keyboard use
- **WHEN** a keyboard user tabs to the switcher and uses the arrow keys
- **THEN** focus moves between the options, the focused option is selected, and a visible focus ring is shown

#### Scenario: Screen reader names
- **WHEN** a screen reader reads the switcher on the Spanish page
- **THEN** it announces the group label and each option's name in Spanish, and which option is selected

### Requirement: Light theme contrast

In both themes, body text, headings, links and badge text SHALL meet WCAG 2.1 AA contrast against their background: 4.5:1 for normal text, 3:1 for large text. Focus rings SHALL meet 3:1 against adjacent colors.

#### Scenario: Accent text in light theme
- **WHEN** a link is hovered or a badge is shown in the light theme
- **THEN** its text contrast against the background is at least 4.5:1

#### Scenario: Muted text in light theme
- **WHEN** body or muted text is shown on the page background or on a card surface in the light theme
- **THEN** its contrast is at least 4.5:1
