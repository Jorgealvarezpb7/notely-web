# release-info Specification

## Purpose

Define how the page gets the latest Notely release data at build time, without manual edits, and how it behaves when that data is unavailable.

## Requirements

### Requirement: Release data obtained at build time

The build SHALL request `https://api.github.com/repos/Jorgealvarezpb7/Notely/releases/latest` and SHALL read `tag_name` and `published_at` from the response.

#### Scenario: Successful response
- **WHEN** the API returns 200 with a `tag_name` and `published_at` during the build
- **THEN** the page data holds both values and the rendered page shows `tag_name` as the version

### Requirement: No client-side release request

Visitors' browsers SHALL NOT call the GitHub API when loading the page, provided the build received an HTTP response from it, whatever its status.

#### Scenario: Page hydration
- **WHEN** the build received a response and a visitor loads the deployed page
- **THEN** no request to `api.github.com` is made

### Requirement: Published date not displayed

`published_at` SHALL be available in the page data and SHALL NOT be displayed.

#### Scenario: Page rendered with release data
- **WHEN** the build obtained `published_at`
- **THEN** the release date does not appear in the visible page

### Requirement: Build survives API failure

A failed, rate-limited or malformed API response SHALL NOT fail the build.

#### Scenario: Rate limited
- **WHEN** the API returns 403 or 429 during the build
- **THEN** the build completes successfully and logs a clear warning

#### Scenario: Network failure
- **WHEN** the request throws or times out during the build
- **THEN** the build completes successfully and logs a clear warning

#### Scenario: Malformed response
- **WHEN** the API returns 200 without a usable `tag_name`
- **THEN** the build completes successfully and treats the version as unavailable

### Requirement: Only the version hides on failure

When the version is unavailable, the page SHALL omit only the version and its separator from the requirements line.

#### Scenario: Version unavailable
- **WHEN** the build could not obtain a version
- **THEN** the line reads "macOS 14 o superior · Apple Silicon e Intel" on the Spanish page and "macOS 14 or later · Apple silicon and Intel" on the English page, and every download button remains present

### Requirement: No hand-edited version

The displayed version SHALL NOT be hardcoded in the page's source.

#### Scenario: New release after rebuild
- **WHEN** a newer release is published and the site is rebuilt
- **THEN** the page shows the new `tag_name` with no source change
