# Spec Delta

## MODIFIED Requirements

### Requirement: Site-wide head tags

Every page SHALL declare a `theme-color` matching the background of the active theme, an `author` meta tag, and a `rel="me"` link to `https://alvarezjorge.com`.

#### Scenario: Head tags
- **WHEN** the generated HTML is inspected
- **THEN** a `theme-color` meta is present with `#0b0b0c` as its prerendered value, `author` is `Jorge Álvarez`, and the `rel="me"` link is present

#### Scenario: Theme color at runtime
- **WHEN** the page runs in the light theme
- **THEN** `theme-color` equals the light theme background
