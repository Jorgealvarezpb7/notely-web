# Notely landing page

Product page for [Notely](https://github.com/Jorgealvarezpb7/Notely), a native macOS sticky notes app. Served at <https://notely.alvarezjorge.com>.

Built with SvelteKit (Svelte 5 runes only), TypeScript, Tailwind CSS and Bun. The site is fully prerendered with `adapter-static`.

## Local commands

```sh
bun install    # install dependencies
just dev       # start the dev server
just build     # build the static site into build/
just preview   # serve the production build
bun run check  # type-check
```

The `just` recipes wrap `bun run dev`, `bun run build` and `bun run preview`.

## Cloudflare Pages settings

| Setting | Value |
| --- | --- |
| Build command | `bun install && bun run build` |
| Build output directory | `build` |
| Environment variable | `BUN_VERSION=1.4.4` |
| Environment variable | `NODE_VERSION=24.19.0` |

`NODE_VERSION` is set because Vite runs on Node during the build, and SvelteKit 3 requires Node 22.17 or later.

## Automatic version updates

Nobody edits the version by hand:

- Download buttons always use `releases/latest/download/Notely.dmg`, so they serve the newest release without a rebuild.
- The displayed version comes from the GitHub API at build time, in `src/routes/+page.ts`.

To keep that version current, each new release rebuilds the site:

1. A release is published in the Notely repo.
2. A GitHub Actions workflow in that repo POSTs to a Cloudflare Pages deploy hook.
3. Cloudflare rebuilds this site.
4. The build reads the latest release from the GitHub API and shows its version.

The workflow file and setup steps are in [`docs/notely-workflow/`](docs/notely-workflow/README.md).

If the GitHub API request fails or is rate-limited during a build, the build still succeeds. It logs a `[release]` warning and the page hides only the version until the next build.

## Hero screenshot

Add `static/screenshots/hero.png` and rebuild. Until the file exists, the hero shows a styled placeholder. Restart `just dev` after adding it.
