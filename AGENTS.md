# Portfolio website: agent instructions

## Project intent

This is Iris Yu’s portfolio website. Keep the work local-first: make and review visual changes in the local preview before doing deployment or production-related work. Do not introduce Cloudflare, Sites, a database, authentication, or a backend.

The current pages are:

- `/` — landing page based on Figma frame `26:989`.
- `/onedeck/` — OneDeck case study based on Figma frame `16:257`.

The Figma file is `https://www.figma.com/design/Y2Vz6HHcoLkzihntdPZIpt/Portfolio`.

## Stack and local workflow

- React 19 + TypeScript.
- Vinext (Next-compatible app router) running on Vite.
- CSS in `app/globals.css`; Tailwind is available through the starter but the portfolio styling is primarily authored CSS.
- Static export configuration is in `next.config.ts`.
- Package manager: pnpm.

For local review, use `pnpm dev` and open `http://localhost:3000/`. The source preview should stay the primary review surface. The production/static build is `pnpm run build`; it runs `scripts/build.mjs`, which prerenders the routes, verifies key content/assets, and copies the OneDeck output into `dist/client/onedeck/index.html` for static hosting.

Do not commit `node_modules`, `dist`, `.next`, `.vinext`, `.wrangler`, `.openai`, `.pnpm-store`, or `reference.png`. The existing `.gitignore` covers these.

## Where to edit

- `app/page.tsx`: landing page content and project grid.
- `app/onedeck/page.tsx`: OneDeck case study content.
- `app/layout.tsx`: shared font, metadata, favicon, and root document wrapper.
- `app/globals.css`: all layout, responsive styles, hover states, and page transitions.
- `public/`: local image assets used by the site.
- `public/merlin-favicon.png`: Merlin favicon. Keep the favicon square and recognizable at small sizes.
- `scripts/build.mjs`: static build and route verification. Keep the `/onedeck/` copy step unless the hosting strategy changes intentionally.

## Interaction and visual behavior

The landing page has a project grid. OneDeck is a normal link at `/onedeck/`, presented in the first grid slot. FLUX and SHINGRIX (“1 in 3”) are image cards with placeholder case-study labels. Keep unfinished project copy visibly marked as placeholder text rather than inventing details.

Navigation links for About, Resume, and Contact are intentionally disabled placeholders until real destinations/content are supplied.

The site uses the View Transitions API in `app/globals.css`:

- Landing → case study: the incoming case study slides upward from the bottom.
- Case study → landing: the landing page is revealed with a top-to-bottom wipe.
- Preserve `prefers-reduced-motion` behavior when changing these animations.

The case study includes the same header as the landing page and a `← All work` link above its content.

## Asset rules

Use the existing local assets in `public/` when they represent the Figma content. Do not replace them with placeholders or remote expiring URLs. Relevant assets include `onedeck-background.png`, `onedeck-dashboard.png`, `project-2.png`, `project-5.jpeg`, and `merlin-favicon.png`.

When adding an image, give it useful alt text unless it is purely decorative; use `aria-hidden="true"` for decorative layers. Keep image dimensions/aspect ratios explicit so the landing grid and case-study hero remain stable while loading.

## GitHub Pages

The repository is `https://github.com/iriscreates/portfolio-website` on branch `main`. `.github/workflows/pages.yml` installs dependencies, runs `pnpm build`, uploads `dist/client`, and deploys it with GitHub Pages. The custom domain configured in GitHub Pages is `irisyu.design`.

Do not change the publishing workflow or domain setup during a visual design pass. If a later agent is explicitly asked to deploy, push the reviewed changes to `main` and inspect the GitHub Actions run. DNS is managed outside this repository; the apex domain needs GitHub Pages A/ALIAS/ANAME records at the domain provider.

## Change discipline

Preserve the current visual direction: clean white space, restrained typography, lavender problem/design-goal accents, and editorial portfolio pacing. Avoid adding speculative pages, forms, authentication, or interactions. After edits, verify both `/` and `/onedeck/` locally, including desktop and narrow/mobile widths, and confirm that links and the two page transitions still work.
