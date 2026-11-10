# landing-page Specification

## Purpose

Define what the Notely landing page shows, in what order, and in which language, so visitors understand the app, download it, and get past the first-launch warning on macOS.

## Requirements

### Requirement: Section order

The page SHALL render its sections in this order: Header, Hero, Positioning, Features, Demo, Install, Open source, Footer.

#### Scenario: Visitor scrolls the page
- **WHEN** a visitor loads the page and scrolls from top to bottom
- **THEN** the sections appear in the specified order

### Requirement: Page language

The page SHALL be available in Spanish and English, with all visible copy in the language of the page, as defined by the `i18n` capability. Quoted labels below give the Spanish text and, where it matters, the English text.

#### Scenario: One language per page
- **WHEN** the generated HTML of a page is inspected
- **THEN** no visible section text is in the other language, apart from product names and terminal commands

### Requirement: Download links

Every download button SHALL link to `https://github.com/Jorgealvarezpb7/Notely/releases/latest/download/Notely.dmg`.

#### Scenario: Download buttons
- **WHEN** any "Descargar", "Descargar para macOS", "Download" or "Download for Mac" button is activated
- **THEN** the browser requests the latest-release `Notely.dmg` URL

### Requirement: Sticky header

The header SHALL stay visible while scrolling and SHALL show the app icon, the name "Notely", links to the features and install sections and to GitHub, a language switcher, and a small download button.

#### Scenario: Header navigation
- **WHEN** a visitor activates the features or install link
- **THEN** the page moves to the matching section

#### Scenario: GitHub link
- **WHEN** a visitor activates "GitHub"
- **THEN** the browser opens `https://github.com/Jorgealvarezpb7/Notely` in a new tab

#### Scenario: Narrow viewport
- **WHEN** the viewport is narrower than 640px
- **THEN** the navigation links and the language switcher move behind a hamburger menu and the download button stays visible outside it

#### Scenario: Header on scroll
- **WHEN** a visitor scrolls past the hero
- **THEN** the header remains visible at the top of the viewport

### Requirement: Hero content

The hero SHALL show an "En desarrollo" / "In development" badge, a large app icon, a one-line tagline stating sticky notes for macOS that are native, open source and free, a short intro, and a "Descargar para macOS" / "Download for Mac" button.

#### Scenario: Hero rendered
- **WHEN** the page loads
- **THEN** the badge, icon, tagline, intro and download button are all visible in the hero

### Requirement: Requirements line

Below the main download button the hero SHALL show the release version, followed by "macOS 14 o superior · Apple Silicon e Intel" on the Spanish page and "macOS 14 or later · Apple silicon and Intel" on the English page.

#### Scenario: Version known on the Spanish page
- **WHEN** the build obtained tag `v0.1.0` and the Spanish page loads
- **THEN** the line reads "v0.1.0 · macOS 14 o superior · Apple Silicon e Intel"

#### Scenario: Version known on the English page
- **WHEN** the build obtained tag `v0.1.0` and the English page loads
- **THEN** the line reads "v0.1.0 · macOS 14 or later · Apple silicon and Intel"

### Requirement: Hero screenshot frame

The hero SHALL show a large screenshot inside a CSS-built macOS window frame with traffic-light dots. The image SHALL come from `/screenshots/hero.png` when that file exists at build time.

#### Scenario: Screenshot exists
- **WHEN** `static/screenshots/hero.png` exists at build time
- **THEN** the window frame shows that image with descriptive alt text

#### Scenario: Screenshot missing
- **WHEN** `static/screenshots/hero.png` does not exist at build time
- **THEN** the build succeeds, the frame shows a styled placeholder, and the HTML has no reference to the missing file

### Requirement: Positioning statement

The positioning section SHALL contain one short paragraph stating that Notely is for quick floating notes that stay on the desktop, and that it is not a full notes app.

#### Scenario: Positioning rendered
- **WHEN** the page loads
- **THEN** the section conveys both the quick-floating-notes purpose and that Notely is not a full notes app

### Requirement: Feature blocks

The features section SHALL show exactly six blocks, each with an icon, a heading and one or two sentences: floating notes that remember size and position, per-note colors, checklists, Markdown descriptions, links with preview cards, and GitHub issue sync with the token stored in the Keychain.

#### Scenario: Features rendered
- **WHEN** the page loads
- **THEN** six feature blocks are shown, one for each listed feature

#### Scenario: Markdown claim stays accurate
- **WHEN** the Markdown block is read
- **THEN** it describes basic formatting (headings, lists, checklists, code) and does not promise full Markdown support

### Requirement: Empty demo slot

The page SHALL include a demo slot after the features section that produces no visible output until it has content.

#### Scenario: No demo content
- **WHEN** the page loads and the demo has no content
- **THEN** no demo heading, frame or empty space is visible between Features and Install

### Requirement: Install steps

The install section SHALL have the id `instalacion` on the Spanish page and `install` on the English page, and SHALL show three numbered steps, each with an icon: download, drag to the Applications folder, open. Arrows SHALL show the flow between steps.

#### Scenario: Install steps rendered
- **WHEN** a visitor reaches the install section
- **THEN** the three steps appear numbered, with icons, in that order

#### Scenario: Wide viewport
- **WHEN** the viewport is at least 1024px wide
- **THEN** the steps sit in one row with arrows pointing right between them

#### Scenario: Narrow viewport
- **WHEN** the viewport is narrower than 1024px
- **THEN** the steps stack with arrows pointing down between them

### Requirement: First-launch help

The install section SHALL show a collapsible block titled "¿macOS no te deja abrirla?" / "Is macOS blocking Notely?", closed by default, with a chevron that shows its state. Expanded, it SHALL explain, in a reassuring and honest tone, that the app is free and open source but not notarized by Apple, so macOS warns on first launch.

#### Scenario: Help block closed
- **WHEN** a visitor reaches the install section
- **THEN** the title and chevron are visible and the help content is hidden

#### Scenario: Help block toggled
- **WHEN** a visitor activates the title
- **THEN** the help content expands, and activating it again retracts it

### Requirement: First-launch instructions by macOS version

The help block SHALL give separate instructions for macOS 14 and for macOS 15 or later, using tabs or two columns.

#### Scenario: macOS 14 instructions in Spanish
- **WHEN** a visitor reads the macOS 14 instructions on the Spanish page
- **THEN** they say to Control-click (right-click) the app, choose Abrir, then Abrir again

#### Scenario: macOS 15 or later instructions in Spanish
- **WHEN** a visitor reads the macOS 15 or later instructions on the Spanish page
- **THEN** they say to try opening the app once, then go to Ajustes del Sistema, Privacidad y seguridad, and "Abrir igualmente"

#### Scenario: macOS 14 instructions in English
- **WHEN** a visitor reads the macOS 14 instructions on the English page
- **THEN** they use the macOS labels "Control-click → Open", then say to click Open again

#### Scenario: macOS 15 or later instructions in English
- **WHEN** a visitor reads the macOS 15 or later instructions on the English page
- **THEN** they say to try opening the app once, then use the macOS labels "System Settings → Privacy & Security → Open Anyway"

### Requirement: Quarantine fallback command

The help block SHALL offer advanced users a copyable code block with `xattr -dr com.apple.quarantine /Applications/Notely.app` and a one-line explanation of what it does.

#### Scenario: Copy command
- **WHEN** a visitor activates the copy control on a browser with clipboard access
- **THEN** the exact command is placed on the clipboard and the control confirms the copy

#### Scenario: Clipboard unavailable
- **WHEN** clipboard access fails
- **THEN** the page does not raise an error and the command remains visible and selectable

### Requirement: Open source links

The open source section SHALL show a short text and cards linking to the GitHub repository, to reporting an issue, and to the releases/changelog.

#### Scenario: Open source cards
- **WHEN** a visitor activates each card
- **THEN** the browser opens the repository, its new-issue page, and its releases page respectively, each in a new tab

### Requirement: Footer

The footer SHALL show "Hecho por Jorge Álvarez" / "Made by Jorge Álvarez" linking to `https://alvarezjorge.com`, a GitHub link, a "Licencia MIT" / "MIT License" link to `https://github.com/Jorgealvarezpb7/Notely/blob/main/LICENSE`, the current year, and the theme switcher.

#### Scenario: Footer rendered
- **WHEN** the page loads
- **THEN** the footer shows all three links, the year and the theme switcher

#### Scenario: Footer on a phone
- **WHEN** the page is viewed at 360px wide
- **THEN** the footer items wrap without overlapping and the theme switcher stays reachable

### Requirement: Heading structure

Each page SHALL have exactly one `h1`, in the hero. Each section SHALL have an `h2`, with `h3` for the items inside it and no skipped levels. The positioning section's `h2` SHALL be visually hidden.

#### Scenario: Heading order
- **WHEN** the generated HTML of a page is inspected
- **THEN** it has one `h1` and no heading level is skipped

### Requirement: Image attributes

Images SHALL have explicit `width` and `height`. Meaningful images SHALL have translated alt text, and decorative images SHALL have an empty `alt`. Images below the fold SHALL use `loading="lazy"`, and the hero icon SHALL NOT.

#### Scenario: Header logo
- **WHEN** the header renders
- **THEN** its logo has `alt=""` because the name "Notely" sits beside it

#### Scenario: Hero icon
- **WHEN** the hero renders
- **THEN** the icon has translated alt text, explicit dimensions and no `loading="lazy"`

#### Scenario: Hero screenshot
- **WHEN** `static/screenshots/hero.png` exists at build time
- **THEN** the image has explicit dimensions and `loading="lazy"`

### Requirement: External links

Links that leave the site SHALL open in a new tab with `rel="noopener"`. Download links SHALL stay in the same tab.

#### Scenario: External link
- **WHEN** the generated HTML of a page is inspected
- **THEN** every external link except the downloads has `target="_blank"` and `rel="noopener"`

#### Scenario: Download link
- **WHEN** the generated HTML of a page is inspected
- **THEN** the download links have no `target="_blank"`

### Requirement: Responsive layout

The page SHALL be usable from phone widths upward, and the page body SHALL NOT scroll horizontally.

#### Scenario: Phone viewport
- **WHEN** the page is viewed at 360px wide
- **THEN** all sections stack readably, and all navigation and download controls can be reached

### Requirement: Reduced motion

The page SHALL suppress non-essential animation and smooth scrolling when the visitor prefers reduced motion.

#### Scenario: Reduced motion preferred
- **WHEN** the visitor's system sets `prefers-reduced-motion: reduce`
- **THEN** anchor navigation jumps without smooth scrolling and no decorative animation runs

### Requirement: Light and dark themes

The page SHALL render in a light or a dark theme as decided by the `theme` capability. Theme colors SHALL be defined as tokens with one set per theme, and components SHALL use only those tokens, with no hardcoded colors. The light theme SHALL keep the same layout, accent, icons and imagery as the dark theme.

#### Scenario: Same page in both themes
- **WHEN** the page is viewed in the light theme and then in the dark theme
- **THEN** both show the same sections, content and layout, and only token colors, glows and shadows differ

#### Scenario: Hero screenshot on a light page
- **WHEN** the hero screenshot is shown in the light theme
- **THEN** it stays the same image inside the window frame, and the frame keeps a visible border and shadow that separate it from the light background

#### Scenario: App icon in both themes
- **WHEN** the header or hero app icon renders in either theme
- **THEN** it keeps its dark squircle body

### Requirement: Accent color

The page SHALL use #01B36C as its only accent, limited to primary buttons, links on hover, focus rings and small highlights. Where the accent is used as text or as a focus ring in the light theme, the page SHALL use a darker shade of the same green so it meets the contrast rules of the `theme` capability.

#### Scenario: Accent usage
- **WHEN** the page is viewed
- **THEN** green appears only in those elements, and features, install steps and open source cards have no colored backgrounds

#### Scenario: Primary button style
- **WHEN** a primary button is rendered in either theme
- **THEN** it is a #01B36C pill with white text

#### Scenario: Accent text in light theme
- **WHEN** a link is hovered or a badge is shown in the light theme
- **THEN** its text uses the darker green, not #01B36C
