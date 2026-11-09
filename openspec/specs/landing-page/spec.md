# landing-page Specification

## Purpose

Define what the Notely landing page shows, in what order, and in which language, so visitors understand the app, download it, and get past the first-launch warning on macOS.

## Requirements

### Requirement: Section order

The page SHALL render its sections in this order: Header, Hero, Positioning, Features, Demo, Install, Open source, Footer.

#### Scenario: Visitor scrolls the page
- **WHEN** a visitor loads the page and scrolls from top to bottom
- **THEN** the sections appear in the specified order

### Requirement: Spanish copy

All visible UI copy SHALL be in Spanish, and the document language SHALL be declared as Spanish.

#### Scenario: Page language
- **WHEN** the generated HTML is inspected
- **THEN** the root element declares `lang="es"` and no visible section text is in English, apart from product names and terminal commands

### Requirement: Download links

Every download button SHALL link to `https://github.com/Jorgealvarezpb7/Notely/releases/latest/download/Notely.dmg`.

#### Scenario: Download buttons
- **WHEN** any "Descargar" or "Descargar para macOS" button is activated
- **THEN** the browser requests the latest-release `Notely.dmg` URL

### Requirement: Sticky header

The header SHALL stay visible while scrolling and SHALL show the app icon, the name "Notely", links to Funciones, Instalación and GitHub, and a small "Descargar" button.

#### Scenario: Header navigation
- **WHEN** a visitor activates "Funciones" or "Instalación"
- **THEN** the page moves to the matching section

#### Scenario: GitHub link
- **WHEN** a visitor activates "GitHub"
- **THEN** the browser opens `https://github.com/Jorgealvarezpb7/Notely`

#### Scenario: Narrow viewport
- **WHEN** the viewport is narrower than 640px
- **THEN** the navigation links move behind a hamburger menu and the "Descargar" button stays visible outside it

#### Scenario: Header on scroll
- **WHEN** a visitor scrolls past the hero
- **THEN** the header remains visible at the top of the viewport

### Requirement: Hero content

The hero SHALL show an "En desarrollo" badge, a large app icon, a one-line tagline stating sticky notes for macOS that are native, open source and free, a short intro, and a "Descargar para macOS" button.

#### Scenario: Hero rendered
- **WHEN** the page loads
- **THEN** the badge, icon, tagline, intro and download button are all visible in the hero

### Requirement: Requirements line

Below the main download button the hero SHALL show the release version, followed by "macOS 14 o superior · Apple Silicon e Intel".

#### Scenario: Version known
- **WHEN** the build obtained tag `v0.1.0`
- **THEN** the line reads "v0.1.0 · macOS 14 o superior · Apple Silicon e Intel"

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

The install section SHALL have the id `instalacion` and SHALL show three numbered steps, each with an icon: download, drag to Aplicaciones, open. Arrows SHALL show the flow between steps.

#### Scenario: Install steps rendered
- **WHEN** a visitor reaches `#instalacion`
- **THEN** the three steps appear numbered, with icons, in that order

#### Scenario: Wide viewport
- **WHEN** the viewport is at least 1024px wide
- **THEN** the steps sit in one row with arrows pointing right between them

#### Scenario: Narrow viewport
- **WHEN** the viewport is narrower than 1024px
- **THEN** the steps stack with arrows pointing down between them

### Requirement: First-launch help

The install section SHALL show a collapsible block titled "¿macOS no te deja abrirla?", closed by default, with a chevron that shows its state. Expanded, it SHALL explain, in a reassuring and honest tone, that the app is free and open source but not notarized by Apple, so macOS warns on first launch.

#### Scenario: Help block closed
- **WHEN** a visitor reaches the install section
- **THEN** the title and chevron are visible and the help content is hidden

#### Scenario: Help block toggled
- **WHEN** a visitor activates the title
- **THEN** the help content expands, and activating it again retracts it

### Requirement: First-launch instructions by macOS version

The help block SHALL give separate instructions for macOS 14 and for macOS 15 or later, using tabs or two columns.

#### Scenario: macOS 14 instructions
- **WHEN** a visitor reads the macOS 14 instructions
- **THEN** they say to Control-click (right-click) the app, choose Abrir, then Abrir again

#### Scenario: macOS 15 or later instructions
- **WHEN** a visitor reads the macOS 15 or later instructions
- **THEN** they say to try opening the app once, then go to Ajustes del Sistema, Privacidad y seguridad, and "Abrir igualmente"

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
- **THEN** the browser opens the repository, its new-issue page, and its releases page respectively

### Requirement: Footer

The footer SHALL show "Hecho por Jorge Álvarez" linking to `https://alvarezjorge.com`, a GitHub link, a "Licencia MIT" link to `https://github.com/Jorgealvarezpb7/Notely/blob/main/LICENSE`, and the current year.

#### Scenario: Footer rendered
- **WHEN** the page loads
- **THEN** the footer shows all three links and the year

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

### Requirement: Dark theme only

The page SHALL render in a dark theme regardless of the visitor's system color preference. Theme colors SHALL be defined as tokens so a light theme can be added without changing components.

#### Scenario: System light mode
- **WHEN** the visitor's system prefers light mode
- **THEN** the page still renders its dark theme

### Requirement: Accent color

The page SHALL use #01B36C as its only accent, limited to primary buttons, links on hover, focus rings and small highlights.

#### Scenario: Accent usage
- **WHEN** the page is viewed
- **THEN** green appears only in those elements, and features, install steps and open source cards have no colored backgrounds

#### Scenario: Primary button style
- **WHEN** a primary button is rendered
- **THEN** it is a green pill with white text
