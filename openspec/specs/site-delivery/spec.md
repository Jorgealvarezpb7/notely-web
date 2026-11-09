# site-delivery Specification

## Purpose

Define how the site is generated and served: a fully static build for Cloudflare Pages, with search and social metadata, icons, and cache rules.

## Requirements

### Requirement: Fully static output

The build SHALL produce a fully prerendered static site in the `build` directory that needs no server runtime.

#### Scenario: Build output
- **WHEN** `bun run build` completes
- **THEN** `build/index.html` exists and contains the complete page content

### Requirement: Search and social metadata

The page SHALL include a title, a description, Open Graph and Twitter tags, and a canonical link to `https://notely.alvarezjorge.com`.

#### Scenario: Metadata in generated HTML
- **WHEN** `build/index.html` is inspected
- **THEN** it contains the title, description, `og:` tags, `twitter:` tags and the canonical link

#### Scenario: Social image is absolute
- **WHEN** the `og:image` and `twitter:image` values are read
- **THEN** each is an absolute `https://notely.alvarezjorge.com` URL pointing to a file in the build

### Requirement: App icons

The favicon SHALL be the app icon with rounded corners on a transparent background. The apple-touch-icon SHALL be the opaque `AppIcon.png`.

#### Scenario: Icon links
- **WHEN** `build/index.html` is inspected
- **THEN** its icon link resolves to `/favicon.png` and its apple-touch-icon link resolves to `/AppIcon.png`

### Requirement: Immutable asset caching

Responses for `/_app/immutable/*` SHALL carry exactly one `Cache-Control` value, long-lived and immutable.

#### Scenario: Immutable asset headers
- **WHEN** Cloudflare Pages serves a file under `/_app/immutable/`
- **THEN** the response has `Cache-Control: public, max-age=31536000, immutable` and no value merged from another rule

### Requirement: Short HTML caching

HTML responses SHALL use a short cache lifetime that requires revalidation, so a new deployment reaches visitors quickly.

#### Scenario: HTML headers
- **WHEN** Cloudflare Pages serves the page HTML
- **THEN** the response has a `Cache-Control` value with a lifetime of 5 minutes or less
