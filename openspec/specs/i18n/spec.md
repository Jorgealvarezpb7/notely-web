# i18n Specification

## Purpose

Define how the site is offered in Spanish and English: the URL of each language, where the copy lives, how visitors switch language, and how the document declares its language.

## Requirements

### Requirement: Language routes

The site SHALL serve Spanish at `/` and English at `/en`, both fully prerendered. Any other value in the language position, including `es`, SHALL return a 404.

#### Scenario: Prerendered pages
- **WHEN** `bun run build` completes
- **THEN** `build/index.html` holds the Spanish page and `build/en.html` holds the English page

#### Scenario: Unsupported language
- **WHEN** a visitor requests `/es` or `/fr`
- **THEN** the response status is 404

### Requirement: No automatic language redirect

The site SHALL NOT redirect visitors based on their browser language, on the server or in client code.

#### Scenario: English browser visits the Spanish page
- **WHEN** a browser that prefers English requests `/`
- **THEN** the Spanish page is served and stays in place

### Requirement: Typed dictionaries

The copy SHALL live in typed dictionaries in `src/lib/i18n/`. `es.ts` SHALL be the source of truth, and `en.ts` SHALL be typed against its shape.

#### Scenario: Missing English key
- **WHEN** a key present in `es.ts` is missing from `en.ts`
- **THEN** type-checking fails

### Requirement: Copy comes from the dictionaries

Components SHALL read all UI copy from the dictionary of the current page, including alt texts, aria-labels, button labels and copy feedback. Brand names, each language's own name in the switcher, and terminal commands are excepted.

#### Scenario: English page
- **WHEN** the generated HTML of `/en` is inspected
- **THEN** its visible text and labels are in English, apart from those exceptions

#### Scenario: Spanish page
- **WHEN** the generated HTML of `/` is inspected
- **THEN** its visible text and labels are in Spanish, apart from those exceptions

### Requirement: Locale available to components

The locale SHALL be derived from the route param in the layout load function and exposed to components through page data. Components SHALL NOT use legacy stores to read it.

#### Scenario: Component reads the copy
- **WHEN** a component reads `i18n.t` or `i18n.locale`
- **THEN** it receives the dictionary or locale of the current page

### Requirement: Document language

The root element SHALL declare the language of each page in the prerendered HTML.

#### Scenario: Language attribute
- **WHEN** the generated HTML is inspected
- **THEN** `/` has `<html lang="es">` and `/en` has `<html lang="en">`

### Requirement: Language switcher

The header SHALL show an ES / EN switcher made of plain links, so it works without JavaScript and is prerendered. The link of the current language SHALL carry `aria-current`. Switching language SHALL be a full page load.

#### Scenario: Switcher links
- **WHEN** the generated HTML of either page is inspected
- **THEN** the ES link points to `/`, the EN link points to `/en`, and only the link of the current language has `aria-current`

#### Scenario: Current section is kept
- **WHEN** a visitor on `/#instalacion` activates the EN link with JavaScript enabled
- **THEN** the browser navigates to `/en#install`

### Requirement: Localized section anchors

Section ids SHALL be localized: `funciones` and `instalacion` on the Spanish page, `features` and `install` on the English page.

#### Scenario: Spanish anchors
- **WHEN** the generated HTML of `/` is inspected
- **THEN** the features and install sections have the ids `funciones` and `instalacion`

#### Scenario: English anchors
- **WHEN** the generated HTML of `/en` is inspected
- **THEN** the features and install sections have the ids `features` and `install`

### Requirement: Internal links respect the language

Internal links and navigation anchors SHALL stay in the language of the current page.

#### Scenario: English navigation
- **WHEN** the generated HTML of `/en` is inspected
- **THEN** the logo links to `/en` and the navigation links to `/en#features` and `/en#install`

#### Scenario: Spanish navigation
- **WHEN** the generated HTML of `/` is inspected
- **THEN** the logo links to `/` and the navigation links to `/#funciones` and `/#instalacion`
