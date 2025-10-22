# GitHub Actions Workflows

This directory contains the CI/CD workflows for the umi-plugin-repomix project.

## Workflows

### 1. CI (`ci.yml`)

Runs on every push and pull request to validate the build:

- **Triggers**: Push to main/master, Pull requests
- **Node versions**: 18.x, 20.x
- **Steps**:
  - Install dependencies
  - Build the project
  - Verify build output
  - Check package size

### 2. NPM Publish (`npm-publish.yml`)

Automatically publishes the package to NPM when a new release is created:

- **Triggers**: 
  - Release published (automatic)
  - Manual workflow dispatch (with optional tag parameter)
- **Node version**: 20.x
- **Steps**:
  - Install dependencies
  - Build the project
  - Verify build output
  - Publish to NPM with provenance
  - Create publish summary

## Setup

### NPM Token Configuration

To enable NPM publishing, you need to configure the `NPM_TOKEN` secret:

1. **Generate an NPM token**:
   - Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Click "Generate New Token"
   - Select "Automation" type (recommended for CI/CD)
   - Copy the token

2. **Add the token to GitHub**:
   - Go to your repository settings
   - Navigate to "Secrets and variables" → "Actions"
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste your NPM token
   - Click "Add secret"

### Publishing a New Version

1. **Update version in package.json**:
   ```bash
   npm version patch  # or minor, or major
   ```

2. **Create a GitHub release**:
   - Go to your repository on GitHub
   - Click "Releases" → "Create a new release"
   - Create a new tag (e.g., `v1.0.1`)
   - Add release notes
   - Click "Publish release"

3. **Automatic publishing**:
   - The workflow will automatically trigger
   - Build and publish to NPM
   - Check the Actions tab for progress

### Manual Publishing

You can also manually trigger the publish workflow:

1. Go to "Actions" tab
2. Select "Publish to NPM" workflow
3. Click "Run workflow"
4. Optionally specify a tag
5. Click "Run workflow"

## Provenance

The NPM publish workflow includes provenance statements, which provides:

- Build transparency
- Verification of package authenticity
- Supply chain security

This requires the `id-token: write` permission, which is already configured in the workflow.
