# Proposal

## Why

Notely, a native, free and open source macOS sticky notes app, has a public v0.1.0 release but no product page. It needs a Spanish landing page at notely.alvarezjorge.com that explains the app, offers the download, and helps people past the macOS warning shown for a non-notarized app.

## What Changes

- Scaffold a SvelteKit project in this repo: Svelte 5 in runes mode only, TypeScript, Tailwind CSS, Bun, adapter-static, everything prerendered.
- Build all sections with real Spanish copy: Header, Hero, Positioning, Features, an empty Demo slot, Install with first-launch help, Open source, and Footer. This step keeps styling clean and simple; visual polish comes later.
- Organize components with atomic design: atoms (Button, Badge, Icon), molecules (FeatureCard, InstallStep, MacWindow), and one component per section.
- Read the latest release from the GitHub API at build time. Hide only the version text when the request fails. Nobody edits the version by hand.
- Provide a GitHub Actions workflow file, in `docs/notely-workflow/`, for the Notely app repo. It triggers a Cloudflare Pages redeploy on every published release. It is delivered here with setup instructions because this repo cannot write to the Notely repo.
- Add SEO metadata, `static/_headers` cache rules, responsive mobile-first layout, reduced-motion support, and a README with local commands, Cloudflare Pages settings and the redeploy flow.
- Add `dev`, `build` and `preview` recipes to the existing `justfile`, keeping `dkc`.

Out of scope: the interactive demo (only an empty `DemoSection`), final visual design, dark mode, real screenshots, and any direct change to the Notely repo.

## Capabilities

### New Capabilities

- `landing-page`: The page's sections, their order, Spanish copy, download links, first-launch help, responsiveness, and motion behavior.
- `release-info`: How the displayed release version is obtained at build time and how the page behaves when it is unavailable.
- `site-delivery`: Static prerendering, SEO metadata, icons, and cache headers for hosting on Cloudflare Pages.
- `release-redeploy`: The workflow and instructions that redeploy the site when a Notely release is published.

### Modified Capabilities

None. The project has no existing specs.

## Impact

- New SvelteKit project files at the root of this repo; `justfile` gains three recipes.
- New dependencies: SvelteKit, Svelte 5, Tailwind CSS, `@lucide/svelte`. Bun must be installed in the container during apply, and its exact version sets `BUN_VERSION`.
- External services: GitHub REST API (unauthenticated, at build time), GitHub release asset URL, Cloudflare Pages.
- Manual follow-up for the owner: create the Cloudflare deploy hook, add the `CLOUDFLARE_DEPLOY_HOOK` secret, and copy the workflow into the Notely repo.
- Assets: `AppIcon.png` from this repo root is the only logo. It has no alpha channel, so it shows as a black square on the light page until a transparent version replaces it. `notely-logo.svg` is not used.
