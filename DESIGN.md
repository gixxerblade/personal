# Portfolio design

The site presents Stephen Clark’s engineering work, background, and contact information for prospective employers and collaborators.

## Visual system

`src/styles.css` owns the design tokens and responsive styles. Components use semantic classes; career copy lives in `src/content.ts`.

| Role            | Token            | Value     |
| --------------- | ---------------- | --------- |
| Page            | `--paper`        | `#f7f7f8` |
| Text            | `--ink`          | `#0a0a0b` |
| Supporting text | `--muted`        | `#5c5d62` |
| Dividers        | `--line`         | `#d4d4d7` |
| Accent          | `--accent`       | `#ed4c27` |
| Button fill     | `--action`       | `#d83d1b` |
| Button hover    | `--accent-hover` | `#ce3817` |
| Image backing   | `--dark`         | `#101719` |

Barlow Condensed 800 is the display face, Manrope is the body face, and DM Mono is used for short labels. Fonts are hosted locally with their licenses. White button text uses a darker orange than the decorative accent to preserve contrast.

## Layout

Use large headings, generous spacing, and thin dividers. Professional work starts with the product and Stephen’s role, with technical details in native disclosures. The cycling project uses a full-width photograph. Keep the page free of decorative cards and charts.

Content is capped at 1280px. Hero and career columns stack below 640px. Navigation remains available without JavaScript; the menu and copy-email button are enhanced after hydration. Preserve visible focus, reduced-motion support, usable scrollbars, and the space reserved for clipboard feedback.

## Content and assets

Describe personal contributions separately from each product’s broader capabilities. Use past tense for WakeCap, where Stephen was Lead Engineer for Capture from January 2024 through October 2026. Keep private implementation details and customer data out of public copy.

The supplied SC identity files remain in `public/assets/brand/`. `cycling.webp` is a retouched still from the Down East Cyclists ride video, with a darker left side for text readability. Use it as a project illustration.

## Verification

Check desktop, tablet, and 320px mobile layouts after changes. Verify navigation, disclosures, contact actions, keyboard focus, and the no-JavaScript page. Confirm that headings fit without horizontal scrolling.
