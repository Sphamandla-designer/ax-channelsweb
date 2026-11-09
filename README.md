# AX-Channels® — Website

South African digital design studio. Digital Experiences. Thoughtfully Designed.

Services: website design & development, UI/UX & product design, SaaS & enterprise dashboard systems, mobile application design, branding & graphic design. Nationwide and remote.

Static site, no build step.

```bash
# any static server works, e.g.
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Structure

- `index.html` — homepage (hero, what-we-design marquee, 01 about with Google trust badge and outcome cards, 02 services, 03 selected work as three stacking case cards, 04 animated approach flow, 05 commitment, 06 CTA)
- `about.html` — about page (what we do, mission & vision, what sets us apart, how we work, who we work with)
- `work.html` — work page (filterable project grid by service line). Case studies are placeholders until real projects are supplied.
- `assets/css/styles.css` — design tokens (dark only), section surfaces, layout, motion
- `assets/js/main.js` — header state, mobile menu, scroll-spy, reveals, two-line heading fitting, sticky services stage, accessible hero carousel, marquee controls, work filters, custom cursor, card spotlights, stacking work cards, scroll-lit approach flow
- `assets/img/` — photography in its original colour and procedural liquid-chrome textures (WebP, ≤1400px, mostly under 80 KB)
- `assets/raw/` — original full-resolution photography; not referenced by the site

Work cards are placeholders (`figure.ph`) until real project mockups are supplied. The services section is a sticky scroll stage. On desktop, the image frame stays in place while the five service panels scroll past. The panel at the centre of the viewport becomes active: its image wipes in, the counter and label roll over, and its text rises into place. A progress bar and a slight parallax follow the scroll. Below 860px, each panel shows its own image, stacked.

## Section surfaces

The site is dark only. Each homepage section sits on its own step of the ink ramp (`.surface-0` to `.surface-3`: `#0a0a0b`, `#0d0d10`, `#121215`, `#17171b`), starts with an accent hairline and carries a numbered eyebrow (`.sec-no`). The accent `#f5a623` is the only colour beyond ink, silver and white, and it marks state and progress: section numbers, meters, the approach rail, active steps.

The `standalone-preview/` single-file builds inline the CSS, JS and images. Rebuild them after changes.

## Headings

Display titles are always exactly two lines. Write each line as `<span class="ln">…</span>` and add `data-fit` to the heading. The lines never wrap, and `main.js` scales the heading down only when a line would be wider than its column.

## Visuals

Photography keeps the colour it was supplied in. Images that were supplied in black and white (`city-aerial`, `portrait-sunlit`, `portrait-gaze`) stay that way. No CSS filter desaturates images. Photos are exported from `assets/raw/` at 1400px or less, WebP quality 74. The home studio image also has an 800px version served through `srcset`.

| Asset | Where |
|---|---|
| `portrait-acrylic` | Home — about band, with the Google trust badge |
| `portrait-smile`, `portrait-sunlit`, `city-aerial` | About — the people, the craft, where we are |
| `portrait-glow-2`, `portrait-glow-1`, `portrait-gaze` | Work — featured case, Lumen Skin, Thandi & Co. |

The home "Selected work" cards use CSS-built concept mockups (browser, phones, dashboard) until real project mockups are supplied.

## Design system (summary)

| Token | Value |
|---|---|
| Background | `#0a0a0b` / `#101012` / `#18181b` |
| Foreground | `#f5f5f7` |
| Silver | `#c7c9ce` · `#9a9da4` · `#6b6e75` |
| Display font | Archivo (wdth 125, wght 800–900), uppercase |
| Body font | Inter 400–600, 16px base, 1.5 line-height |
| Spacing | 8 · 16 · 24 · 40 · 64 · 96 · 144 |

Motion respects `prefers-reduced-motion` (reveals render in final state, carousel and marquee stop).
