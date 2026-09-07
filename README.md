# Iris Yu portfolio

Responsive portfolio built with React, TypeScript, Vinext, Vite, and CSS. Both pages are exported as static HTML for GitHub Pages; no server or database is needed.

## Local development
Use Node 22.13+ and pnpm 11.
- Install: `pnpm install`
- Preview: `pnpm dev`
- Static build: `pnpm build`

The build output to publish is **dist/client**, including its hidden `.nojekyll` file. Do not publish dist/server. The custom domain is configured in public/CNAME as irisyu.design. Domain DNS and GitHub repository settings have not been changed.

## Pages
- / — landing page, based on Figma frame 26:989
- /onedeck/ — case study, based on Figma frame 16:257

About, Resume, and Contact remain visibly unavailable until their content or destinations are supplied. Two project cards and footer copy are explicitly marked as placeholders. Figma artwork is stored locally in public.

The build script uses the Vite and Vinext prerender APIs to avoid a forced-process-exit crash in the Vinext CLI on Windows, and verifies rendered page content.

No site has been deployed. An unused private Sites registration was created before the switch to GitHub Pages; it remains unpublished.
