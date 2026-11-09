# Design

## Context

This repo has no application code yet: only `justfile` (a `dkc` recipe), `AppIcon.png` and OpenSpec files. It has no commits and no remote. `bun` and `just` are not installed in the container; `node` and `npm` are. The Notely source is read from GitHub `main`, because `../notely` is not mounted here. Motivation is in `proposal.md`; required behavior is in `specs/`.

Verified facts that shape copy: release `v0.1.0` is public, macOS 14 is the minimum, the license is MIT, and the Markdown renderer handles only headings, lists, task lists, fenced code, paragraphs and inline styles.

## Goals / Non-Goals

**Goals:**
- Static site that builds with or without network access to GitHub, and with or without screenshots.
- Runes-only Svelte, enforced by the compiler rather than by convention.
- Structure that lets the later visual polish and demo steps change little outside styling and `DemoSection`.

**Non-Goals:**
- Final visual design, image optimization of `AppIcon.png`, analytics, tests beyond build and type checks.
- Committing, pushing, creating the Cloudflare project, or configuring the deploy hook. These stay with the owner.

## Decisions

**Project at the repo root, written by hand.** `sv create` expects an empty directory and this one already has files. Packages: `@sveltejs/kit`, `svelte`, `vite`, `@sveltejs/vite-plugin-svelte`, `@sveltejs/adapter-static`, `tailwindcss`, `@tailwindcss/vite`, `typescript`, `svelte-check`, `@lucide/svelte`. Add a `.gitignore` for `node_modules`, `.svelte-kit`, `build`. The original `AppIcon.png` stays at the root and is copied to `static/`.

**SvelteKit 3 conventions.** SvelteKit 3 rejects `svelte.config.js`, so its options go to the `sveltekit()` plugin in `vite.config.ts`. `tsconfig.json` extends `$app/tsconfig`, and imports use `#lib/*` (a `package.json` subpath import) because `$lib` was removed. TypeScript stays on `^6` for `svelte-check`. Vite runs on Node during the build and SvelteKit 3 needs Node 22.17 or later, so the README also sets `NODE_VERSION` on Cloudflare.

**Runes enforced in `vite.config.ts`.** Use `dynamicCompileOptions` to set `runes: true` for every file outside `node_modules`, so legacy syntax is a compile error in project code while third-party components keep their own mode. A global `compilerOptions.runes` was rejected because it also forces dependencies.

**Release data in `+page.ts` through SvelteKit's `fetch`.** During prerender SvelteKit inlines the response in the HTML and replays it at hydration, so browsers do not call GitHub. The whole `load` body is guarded by `try/catch` with an 8-second timeout and an explicit `User-Agent`. It checks `response.ok` and the type of `tag_name`, returns `{ release: { version: string | null, publishedAt: string | null } }`, and calls `console.warn` on any failure. A `+page.server.ts` would inline less data, but the requirement places this in `+page.ts`.

**Hero screenshot detected at build time with a Vite `define`.** `vite.config.ts` computes `__HAS_HERO_SCREENSHOT__` from `existsSync('static/screenshots/hero.png')`, typed in `src/app.d.ts`. The `<img>` is only emitted when true, so no missing path reaches the prerender crawler or production. Rejected: `<img onerror>`, which leaves a 404 in the HTML and may fail prerender crawling. Adding the file during `dev` requires a restart.

**Components stay within the requested atomic set.** Atoms: `Button` (renders `<a>` when given `href`), `Badge`, `Icon`. Molecules: `FeatureCard` (optional `href`, reused for the open source cards), `InstallStep`, `MacWindow`. Sections live in `src/lib/components/sections/`. The copy control is local `$state` inside `InstallSection`, because it has one use. URLs live once in `src/lib/site.ts`; copy stays in the section that shows it.

**`Icon` maps a typed `name` to per-icon imports** from `@lucide/svelte/icons/*`, keeping unused icons out of the bundle. `github` is an inline SVG in the same atom, since Lucide no longer ships brand icons.

**First-launch help uses two columns, not tabs.** Columns stack on phones, need no JavaScript, and keep both versions visible, so a visitor who doesn't know their macOS version sees both.

**`DemoSection` renders nothing.** It holds only a comment naming its purpose and is mounted after `FeaturesSection`, so filling it later touches one file.

**Tailwind v4 through `@tailwindcss/vite`** with tints as `@theme` tokens (`--color-note-yellow`, etc.). Yellow is used as a surface with near-black text and never as text on white, because it fails contrast there. Light mode: `color-scheme: light` and no dark variants.

**Motion is opt-in.** `scroll-behavior: smooth` lives inside `@media (prefers-reduced-motion: no-preference)`. `scroll-padding-top` keeps anchors clear of the sticky header.

**SEO in `+layout.svelte` through `<svelte:head>`.** `og:image` and `twitter:image` use the absolute `/AppIcon.png` URL with `twitter:card` set to `summary`, because the only image available is square.

**`_headers` uses `/*` for the short rule and `! Cache-Control` on the immutable rule,** since Cloudflare Pages merges values from all matching rules.

```
/*
  Cache-Control: public, max-age=0, must-revalidate

/_app/immutable/*
  ! Cache-Control
  Cache-Control: public, max-age=31536000, immutable
```

**Redeploy workflow has no third-party actions.** One job with `permissions: {}`. The secret is passed through `env`, an empty value prints `::error::` naming `CLOUDFLARE_DEPLOY_HOOK` and exits 1, and `curl --fail-with-body --silent --show-error -X POST` makes error statuses fail without echoing the URL. File: `docs/notely-workflow/redeploy-website.yml`, with instructions in `docs/notely-workflow/README.md`.

## Risks / Trade-offs

- [GitHub rate-limits unauthenticated calls from Cloudflare's shared build IPs] → The build passes, logs a warning, and hides only the version. It recovers on the next build.
- [The inlined API response adds several KB of JSON to the HTML] → Accepted for a small single page.
- [A build whose request threw has nothing to replay, so a browser may call GitHub at hydration] → Rare and harmless. The same failure handling applies.
- [`AppIcon.png` is opaque and 718 KB] → Accepted by the owner for now; replace in the polish step.
- [Deploy hooks exist only on Git-connected Pages projects, and this repo has no remote yet] → The setup instructions list pushing and connecting the repo as a prerequisite.
- [`_headers` behavior can only be observed on Cloudflare] → Apply checks the file reaches `build/`; the owner confirms headers after the first deploy.
- [Releases created by Actions with the default `GITHUB_TOKEN` don't trigger other workflows] → Documented in the setup instructions. Notely has no workflows today.

## Migration Plan

New site, nothing to migrate. Deploy by connecting the repo to Cloudflare Pages with the README settings. Roll back with Cloudflare's deployment history.
