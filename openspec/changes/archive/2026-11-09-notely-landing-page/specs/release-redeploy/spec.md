## Purpose

Keep the version shown on the site current with no manual edits, by redeploying the Cloudflare Pages site whenever a Notely release is published.

## ADDED Requirements

### Requirement: Redeploy on published release

The project SHALL provide a GitHub Actions workflow in `docs/notely-workflow/`, meant for the Notely app repo, that runs when a release is published and POSTs to the deploy hook URL held in the `CLOUDFLARE_DEPLOY_HOOK` repo secret.

#### Scenario: Release published
- **WHEN** a release is published in the Notely repo with the workflow installed and the secret set
- **THEN** the workflow POSTs to the deploy hook and Cloudflare Pages starts a new build

### Requirement: Missing secret fails clearly

The workflow SHALL fail with an explicit message when `CLOUDFLARE_DEPLOY_HOOK` is empty or not set.

#### Scenario: Secret not configured
- **WHEN** the workflow runs without the secret
- **THEN** the job fails and its log states that `CLOUDFLARE_DEPLOY_HOOK` is missing, with no request sent

### Requirement: Deploy hook failure is visible

The workflow SHALL fail when the deploy hook request does not succeed.

#### Scenario: Hook rejected
- **WHEN** the deploy hook responds with an error status
- **THEN** the job fails

### Requirement: Deploy hook stays secret

The workflow SHALL NOT print the deploy hook URL.

#### Scenario: Workflow logs
- **WHEN** the workflow runs, whether or not it succeeds
- **THEN** the logs do not show the URL

### Requirement: Setup instructions

The project SHALL document step by step how to create the deploy hook in Cloudflare, add the secret on GitHub, and copy the workflow file into the Notely repo.

#### Scenario: Owner follows the instructions
- **WHEN** the owner reads the instructions in `docs/notely-workflow/`
- **THEN** they can complete all three steps with no other source

### Requirement: Flow documented in README

`README.md` SHALL describe the automatic version update flow from published release to refreshed site.

#### Scenario: README read
- **WHEN** a reader opens `README.md`
- **THEN** it explains that a published release triggers the workflow, the deploy hook, the rebuild, and the version refresh
