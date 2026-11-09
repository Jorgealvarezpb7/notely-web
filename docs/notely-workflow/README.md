# Redeploy the website on every Notely release

`redeploy-website.yml` belongs in the Notely app repo. When a release is published there, it asks Cloudflare Pages to rebuild the website, and the rebuild picks up the new version from the GitHub API.

## Prerequisite

Cloudflare only offers deploy hooks on Pages projects connected to a Git repository. Push this landing page repo to GitHub and connect it to a Cloudflare Pages project first, using the settings in the root `README.md`.

## 1. Create the deploy hook in Cloudflare

1. Open the Cloudflare dashboard and go to **Workers & Pages**.
2. Select the Notely website project.
3. Open **Settings** and find the **Builds** section. It may be labeled **Builds & deployments**.
4. Under **Deploy hooks**, select **Add deploy hook**.
5. Name it `notely-release` and choose the production branch, `main`.
6. Save it and copy the generated URL.

Treat this URL as a secret. Anyone who has it can trigger builds of your site.

## 2. Add the secret on GitHub

1. Open `https://github.com/Jorgealvarezpb7/Notely/settings/secrets/actions`.
2. Select **New repository secret**.
3. Set **Name** to `CLOUDFLARE_DEPLOY_HOOK`.
4. Paste the deploy hook URL into **Secret**.
5. Select **Add secret**.

## 3. Copy the workflow into the Notely repo

Run these from your Notely checkout, replacing the path to this repo:

```sh
mkdir -p .github/workflows
cp /path/to/notely-landing/docs/notely-workflow/redeploy-website.yml .github/workflows/
git add .github/workflows/redeploy-website.yml
git commit -m "Redeploy website on release"
git push
```

## 4. Check it works

1. Publish the next Notely release.
2. In the Notely repo's **Actions** tab, confirm that **Redeploy website** succeeded.
3. In Cloudflare, confirm that a new deployment started.
4. Once it finishes, confirm the site shows the new version.

If the job fails with `CLOUDFLARE_DEPLOY_HOOK is missing`, repeat step 2.

## Release creation limit

The workflow runs for releases created by hand on GitHub or with `gh` using your own credentials. If you later publish releases from a GitHub Actions job using the default `GITHUB_TOKEN`, GitHub will not start this workflow. That job would need a personal access token to create the release.
