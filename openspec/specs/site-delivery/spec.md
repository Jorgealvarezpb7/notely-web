# site-delivery Specification

## Purpose

Define how the site is generated and served: a fully static build for Cloudflare Pages, with search and social metadata, structured data, icons, and cache rules.

## Requirements

### Requirement: Fully static output

The build SHALL produce a fully prerendered static site in the `build` directory that needs no server runtime.

#### Scenario: Build output
- **WHEN** `bun run build` completes
- **THEN** `build/index.html` and `build/en.html` exist and contain the complete page content

### Requirement: Unknown paths return 404

The build SHALL include a `404.html`, so Cloudflare Pages answers unknown paths with a 404 instead of the home page.

#### Scenario: Fallback page
- **WHEN** `bun run build` completes
- **THEN** `build/404.html` exists

### Requirement: Search metadata per language

Each page SHALL have a unique title of at most 60 characters and a unique description of 140 to 160 characters, both from the i18n dictionaries. Both SHALL naturally mention macOS, sticky notes, free and open source, in the language of the page.

#### Scenario: Metadata in generated HTML
- **WHEN** the generated HTML of `/` or `/en` is inspected
- **THEN** it contains one title and one meta description in the language of that page

### Requirement: Canonical and hreflang links

Each page SHALL have a canonical link to its own URL, and hreflang alternates for `es`, `en` and `x-default`.

#### Scenario: Canonical links
- **WHEN** the generated HTML is inspected
- **THEN** the canonical of `/` is `https://notely.alvarezjorge.com/` and the canonical of `/en` is `https://notely.alvarezjorge.com/en`

#### Scenario: Hreflang alternates
- **WHEN** the generated HTML of either page is inspected
- **THEN** `es` and `x-default` point to `https://notely.alvarezjorge.com/` and `en` points to `https://notely.alvarezjorge.com/en`

### Requirement: Open Graph metadata

Each page SHALL include `og:title`, `og:description`, `og:url`, `og:type` set to `website`, `og:site_name` set to `Notely`, `og:locale`, `og:locale:alternate`, `og:image`, `og:image:width`, `og:image:height` and a translated `og:image:alt`.

#### Scenario: Locale tags
- **WHEN** the generated HTML is inspected
- **THEN** `/` has `og:locale` `es_ES` with alternate `en_US`, and `/en` has `og:locale` `en_US` with alternate `es_ES`

#### Scenario: Social image per language
- **WHEN** `og:image` is read
- **THEN** `/` uses `https://notely.alvarezjorge.com/og/og-es.png`, `/en` uses `https://notely.alvarezjorge.com/og/og-en.png`, each declared as 1200x630 and present in the build

### Requirement: Twitter card

Each page SHALL include a `summary_large_image` Twitter card with title, description, image and image alt, matching the Open Graph values of that page.

#### Scenario: Twitter tags
- **WHEN** the generated HTML is inspected
- **THEN** `twitter:card` is `summary_large_image` and `twitter:title`, `twitter:description`, `twitter:image` and `twitter:image:alt` match the page

### Requirement: Reusable Seo component

The per-page metadata and structured data SHALL be rendered by one `Seo` component that receives the per-page values as props and is used from the page.

#### Scenario: Page metadata source
- **WHEN** the landing page renders
- **THEN** its title, description, canonical, hreflang, Open Graph, Twitter and JSON-LD tags come from `Seo`

### Requirement: Structured data

Each page SHALL include one `SoftwareApplication` JSON-LD block with a translated description, its page URL, `inLanguage`, `operatingSystem` `macOS 14+`, `applicationCategory` `UtilitiesApplication`, a free `offers` entry in EUR, `downloadUrl`, `license`, an absolute app icon `image`, and a `Person` author. It SHALL NOT include a screenshot field.

#### Scenario: JSON-LD in generated HTML
- **WHEN** the JSON-LD block of `/` or `/en` is parsed
- **THEN** it is valid JSON with those fields, and its language and description match the page

#### Scenario: Safe serialization
- **WHEN** the JSON-LD is rendered
- **THEN** every `<` in the serialized data is escaped, so the content cannot close the script tag

#### Scenario: Version known
- **WHEN** the build obtained a release version
- **THEN** `softwareVersion` holds that version

#### Scenario: Version unavailable
- **WHEN** the build could not obtain a release version
- **THEN** `softwareVersion` is omitted

### Requirement: Sitemap

The build SHALL include a prerendered `sitemap.xml` listing both page URLs, each with `xhtml:link` alternates for `es`, `en` and `x-default`, and a `lastmod` taken from the build date.

#### Scenario: Sitemap output
- **WHEN** `build/sitemap.xml` is parsed
- **THEN** it is valid XML with `https://notely.alvarezjorge.com/` and `https://notely.alvarezjorge.com/en`

### Requirement: Robots file

The build SHALL include a `robots.txt` that allows all crawlers and points to `https://notely.alvarezjorge.com/sitemap.xml`.

#### Scenario: Robots output
- **WHEN** `build/robots.txt` is read
- **THEN** it allows everything and names the sitemap URL

### Requirement: Site-wide head tags

Every page SHALL declare a `theme-color` matching the dark background, an `author` meta tag, and a `rel="me"` link to `https://alvarezjorge.com`.

#### Scenario: Head tags
- **WHEN** the generated HTML is inspected
- **THEN** `theme-color` is `#0b0b0c`, `author` is `Jorge Álvarez`, and the `rel="me"` link is present

### Requirement: App icons

The site SHALL use resized icons generated from the app icon: a 32px `favicon.png` and a 512px `icon-512.png`, both with rounded corners on a transparent background, and a 180px `apple-touch-icon.png` that is opaque. The header and hero SHALL load the resized `logo-80.png` and `logo-384.png`.

#### Scenario: Icon links
- **WHEN** the generated HTML is inspected
- **THEN** its icon links resolve to `/favicon.png` and `/icon-512.png`, and its apple-touch-icon link resolves to `/apple-touch-icon.png`

#### Scenario: Optimized page images
- **WHEN** the header and hero render
- **THEN** they load `/logo-80.png` and `/logo-384.png`

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
