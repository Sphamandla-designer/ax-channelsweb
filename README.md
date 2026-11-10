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

- `index.html` — homepage (hero, what-we-design marquee, centred about over a silver channel pattern with a Google trust badge, light silver services, selected work as three stacking case cards, commitment, CTA)
- `about.html` — about page (what we do, mission & vision, what sets us apart, how we work, who we work with)
- `work.html` — work page (filterable project grid by service line). Case studies are placeholders until real projects are supplied.
- `assets/css/styles.css` — design tokens (dark only), section surfaces, layout, motion
- `assets/js/main.js` — header state, mobile menu, scroll-spy, reveals, two-line heading fitting, sticky services stage, accessible hero carousel, marquee controls, work filters, custom cursor, card spotlights, stacking work cards
- `assets/img/` — photography in its original colour and procedural liquid-chrome textures (WebP, ≤1400px, mostly under 80 KB)
- `assets/raw/` — original full-resolution photography; not referenced by the site

Work cards are placeholders (`figure.ph`) until real project mockups are supplied. The services section is a sticky scroll stage. On desktop, the image frame stays in place while the five service panels scroll past. The panel at the centre of the viewport becomes active: its image wipes in, the counter and label roll over, and its text rises into place. A progress bar and a slight parallax follow the scroll. Below 860px, each panel shows its own image, stacked.

## Section surfaces

The site is dark only, in ink, silver and white. There is no orange. Dark sections sit on steps of the ink ramp (`.surface-0` to `.surface-3`: `#0a0a0b`, `#0d0d10`, `#121215`, `#17171b`), each starting with a silver hairline. Each page has one light silver section (`.surface-light`): Services on the home page, What sets us apart on About, and What every project includes on Work. `.surface-light` flips the colour tokens inside the section, so components need no light-specific styles. The site shows no stat figures.

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
