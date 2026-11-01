# Stephen Clark’s portfolio

React, TypeScript, Vite, TanStack Router, and TanStack Store. The production build renders the page to static HTML, then hydrates it in the browser. Navigation, case-study disclosures, and email links also work without JavaScript.

## Local development

Use Node.js 22.12 or later.

```sh
npm ci
npm run dev
```

Open [localhost:4173](http://127.0.0.1:4173). To preview the production build, stop the development server and run:

```sh
npm run build
npm run preview
```

## Checks

```sh
npm run check
```

Runs Oxfmt, Oxlint, TypeScript, the production build, and checks for rendered content, missing assets, broken anchors, and valid CSP hashes.

The browser suite covers hydration, accessibility, mobile navigation, disclosures, clipboard handling, redirects, 404s, reduced motion, and operation without JavaScript:

```sh
npx playwright install chromium
npm run test:e2e
```

Use `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e` to run against an installed Chrome. The suite uses port 4174.

## Netlify

Connect this repository to the existing Netlify site. `netlify.toml` sets the build command to `npm run build`, publish directory to `dist`, and Node version to 22. Leave the base directory empty and remove previous Gatsby build settings. No environment variables are needed.

For a manual deployment, build and upload `dist`. Deploy the generated `_headers` file with it: the build adds hashes for TanStack’s hydration scripts. `_redirects` preserves the previous `/aboutme`, `/projects`, `/contact`, and `/resume` URLs. Unknown paths use the static 404 page.

The canonical domain is `https://www.stephenclark.dev/`. Keep the existing Netlify domain redirect, or update `index.html`, `public/robots.txt`, and `public/sitemap.xml` if the primary domain changes.

## Editing

- `src/content.ts`: career and open-source details.
- `src/components/`: page sections and interactions.
- `src/styles.css`: layout, typography, and responsive styles.
- `index.html`: page and social metadata.
- `public/assets/stephen-clark-resume.docx`: downloadable résumé.
- `public/assets/social-card.png`: social preview image.
- `DESIGN.md`: visual conventions.

Manrope and Barlow Condensed are licensed under the SIL Open Font License; license files are included alongside the fonts. The cycling image is a retouched still from Down East Cyclists’ ride video. SC identity assets are in `public/assets/brand`.
