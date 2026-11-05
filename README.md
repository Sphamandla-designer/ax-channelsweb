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

- `index.html` — homepage (hero, what-we-design marquee, about, five services, selected work, five-step approach, commitment, CTA)
- `about.html` — about page (what we do, mission & vision, what sets us apart, how we work, who we work with)
- `work.html` — work page (filterable project grid by service line). Case studies are placeholders until real projects are supplied.
- `assets/css/styles.css` — design tokens for the dark and light themes, layout, motion
- `assets/js/main.js` — theme switcher, header state, mobile menu, scroll-spy, reveals, two-line heading fitting, sticky services stage, accessible hero carousel, marquee controls, work filters, custom cursor
- `assets/img/` — silver-duotone brand visuals, colour service photography and procedural liquid-chrome textures (WebP, ≤1600px), used in dark mode
- `assets/img/light/` — high-key light variants of every image above, used in light mode
- `assets/raw/` — original full-resolution photography; not referenced by the site

Work cards are placeholders (`figure.ph`) until real project mockups are supplied. The services section is a sticky scroll stage. On desktop, the image frame stays in place while the five service panels scroll past. The panel at the centre of the viewport becomes active: its image wipes in, the counter and label roll over, and its text rises into place. A progress bar and a slight parallax follow the scroll. Below 860px, each panel shows its own image, stacked.

## Themes

The site ships in two themes: dark (the default) and light. The sun/moon button in the header switches between them. The choice is saved in `localStorage` (`ax-theme`) and applied by a small inline script in each page's `<head>` before the first paint, so the page doesn't flash the wrong theme.

- Colours are tokens on `:root`; `:root[data-theme="light"]` overrides them (`--ink*` = surfaces, `--white` = foreground, `--silver*` = secondary text, `--ink-rgb` / `--fg-rgb` for translucent overlays).
- Every `<img>` pointing at `assets/img/*.webp` swaps to `assets/img/light/*.webp` in light mode (handled in `main.js`). The CTA background uses the `--cta-image` token.
- In browsers that support View Transitions, switching reveals the new theme in a circle that grows from the button; other browsers get a colour cross-fade.

Light variants: toned images map their luminance onto the light ramp `#303238 → #fcfcfd`, and colour images (`service-*`, `pill-*`) are brightened with their colours kept. Each image gets its own `1 - (1 - t)^k` curve, where `k` is chosen so the average brightness lands at about 72%. Regenerate the variants whenever you add or replace an image.

The `standalone-preview/` single-file builds predate the theme switcher and need rebuilding to include it.

## Headings

Display titles are always exactly two lines. Write each line as `<span class="ln">…</span>` and add `data-fit` to the heading. The lines never wrap, and `main.js` scales the heading down only when a line would be wider than its column.

## Visuals

Photography is converted to a silver duotone (`#0a0a0c` → `#f0f1f4`) so every image sits inside the dark palette. Each new image is used once per page:

| Asset | Where |
|---|---|
| `portrait-acrylic` | Home — studio band ("senior hands only") |
| `portrait-smile`, `portrait-sunlit`, `city-aerial` | About — the people, the craft, where we are |
| `portrait-glow-2`, `portrait-glow-1`, `portrait-gaze` | Work — featured case, Lumen Skin, Thandi & Co. |

Every photo uses one treatment, `.band`: the same wide proportions as the service views (16:8.2 on desktop, 4:3 on phones), grayscale with a brightness lift on hover, an index badge and a caption strip that states what the image is evidence of.

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
