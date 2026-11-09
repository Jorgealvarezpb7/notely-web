# Tasks

## 1. Tooling and scaffold

- [x] 1.1 Install Bun in the container, verify with `bun --version`, and record the exact version for `BUN_VERSION`
- [x] 1.2 Create `package.json`, `vite.config.ts` (adapter-static to `build`, runes enforced outside `node_modules`), `tsconfig.json`, `.gitignore`, `src/app.html` with `lang="es"`, and `src/app.d.ts`; verify `bun install` succeeds and writes `bun.lock`
- [x] 1.3 Add `src/routes/+layout.ts` with `export const prerender = true` and a minimal page; verify `bun run build` writes `build/index.html`
- [x] 1.4 Add `dev`, `build` and `preview` recipes to `justfile` keeping `dkc` unchanged; verify the file still lists `dkc` and each recipe's underlying `bun run` command works, and report that `just` itself is not installed if that remains true
- [x] 1.5 Copy `AppIcon.png` to `static/AppIcon.png` and verify it is byte-identical by hash

## 2. Foundation and atoms

- [x] 2.1 Add `src/app.css` with Tailwind, `@theme` tint tokens, `color-scheme: light`, reduced-motion-gated smooth scrolling, and `scroll-padding-top`; verify the built CSS contains the tint values and the `prefers-reduced-motion` rule
- [x] 2.2 Add `src/lib/site.ts` with the download, repo, new-issue, releases and license URLs; verify by `bun run check`
- [x] 2.3 Add atoms `Button`, `Badge`, and `Icon` (per-icon `@lucide/svelte` imports plus inline GitHub SVG); verify by `bun run check`
- [x] 2.4 Add molecules `FeatureCard` (optional `href`), `InstallStep`, and `MacWindow` with CSS traffic-light dots; verify by `bun run check`

## 3. Release data and hero image

- [x] 3.1 Implement `src/routes/+page.ts` per design and verify a build with network shows `v0.1.0` in `build/index.html`, with the response inlined under `data-sveltekit-fetched`
- [x] 3.2 Verify the failure path by building with the API URL temporarily forced to fail: build exits 0, a warning is logged, the requirements line has no version, and the temporary change is reverted
- [x] 3.3 Add the `__HAS_HERO_SCREENSHOT__` define and verify a build without `static/screenshots/hero.png` passes prerender and has no reference to `hero.png` in `build/index.html`
- [x] 3.4 Verify a build with a temporary `static/screenshots/hero.png` emits the `<img>`, then remove the temporary file

## 4. Sections

- [x] 4.1 Build `HeaderSection` and `HeroSection` per the `landing-page` spec; verify in `build/index.html` that the nav anchors, badge, tagline, button and requirements line are present
- [x] 4.2 Build `PositioningSection` and `FeaturesSection` with six blocks, describing Markdown only as basic formatting; verify six feature headings in the built HTML and no claim of full Markdown support
- [x] 4.3 Add empty `DemoSection` after Features; verify it adds no visible markup to the built HTML
- [x] 4.4 Build `InstallSection` with `id="instalacion"`, three steps, the help block with two macOS columns, and the copyable `xattr` command with a guarded clipboard call; verify the exact command and both sets of instructions appear in the built HTML
- [x] 4.5 Build `OpenSourceSection` and `FooterSection` including the "Licencia MIT" link; verify all link targets in the built HTML
- [x] 4.6 Compose all sections in `src/routes/+page.svelte` in spec order and verify order in the built HTML

## 5. Delivery and documentation

- [x] 5.1 Add SEO tags, canonical, favicon and apple-touch-icon in the layout; verify each tag is in `build/index.html` and social images are absolute URLs
- [x] 5.2 Add `static/_headers` per design and verify it is copied to `build/_headers` with `! Cache-Control` on the immutable rule
- [x] 5.3 Add `docs/notely-workflow/redeploy-website.yml`; verify it parses as YAML, and run its shell step locally with an empty secret to confirm it exits non-zero with the `CLOUDFLARE_DEPLOY_HOOK` message
- [x] 5.4 Add `docs/notely-workflow/README.md` with step-by-step deploy hook, GitHub secret and copy instructions, listing the Git-connected Pages project as a prerequisite and noting the `GITHUB_TOKEN` trigger limit; verify all three procedures are present
- [x] 5.5 Write `README.md` in English with local commands, Cloudflare Pages settings (`bun install && bun run build`, output `build`, `BUN_VERSION` from 1.1), and the version update flow; verify the documented commands match `package.json`

## 6. Integration checks

- [x] 6.1 Run `bun run check` and `bun run build` from a clean state (no `node_modules`, `.svelte-kit`, `build`) and verify both exit 0
- [x] 6.2 Search `src/` for `export let`, `$:`, `on:click`, `<slot`, and `svelte/store` and verify there are no matches
- [x] 6.3 Search Svelte component copy for leftover English and verify no hardcoded version exists in `src/`
- [x] 6.4 Serve the build and check at 360px and desktop widths for no horizontal overflow, a working sticky header and copy control, and no `api.github.com` request; if no browser is available, report these checks as not run
- [x] 6.5 Report the Bun version and list what remains a placeholder, including the hero screenshot and any uncertain copy

## Workflow follow-up

- Owner: push this repo, connect it to Cloudflare Pages, create the deploy hook, add the secret, and copy the workflow into the Notely repo.
- Archive the change after review.
