# Spec Delta

## ADDED Requirements

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

## MODIFIED Requirements

### Requirement: Footer

The footer SHALL show "Hecho por Jorge Álvarez" / "Made by Jorge Álvarez" linking to `https://alvarezjorge.com`, a GitHub link, a "Licencia MIT" / "MIT License" link to `https://github.com/Jorgealvarezpb7/Notely/blob/main/LICENSE`, the current year, and the theme switcher.

#### Scenario: Footer rendered
- **WHEN** the page loads
- **THEN** the footer shows all three links, the year and the theme switcher

#### Scenario: Footer on a phone
- **WHEN** the page is viewed at 360px wide
- **THEN** the footer items wrap without overlapping and the theme switcher stays reachable

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

## REMOVED Requirements

### Requirement: Dark theme only

**Reason**: Visitors can now use a light theme, which follows their system preference by default or comes from an explicit choice.

**Migration**: Replaced by "Light and dark themes" in this spec and by the new `theme` capability. Visitors who want the old look can choose Dark in the theme switcher.
