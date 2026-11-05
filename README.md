# AX-Channels® — Website

Premium South African design studio: web design & development, mobile UX design and brand identity.

Static site, no build step.

```bash
# any static server works, e.g.
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Structure

- `index.html` — homepage (hero, trust marquee, studio manifesto, services, selected work, process, CTA)
- `about.html` — about page (story, values, how we work, milestones)
- `work.html` — work page (filterable project grid, outcomes)
- `assets/css/styles.css` — design tokens (dark · silver · white), layout, motion
- `assets/js/main.js` — header state, mobile menu, scroll-spy, reveals, accessible hero carousel, marquee controls, work filters, custom cursor
- `assets/img/` — silver-duotone brand visuals and procedural liquid-chrome textures (WebP, ≤1600px)
- `assets/raw/` — original full-resolution photography; not referenced by the site

## Visuals

Photography is converted to a silver duotone (`#0a0a0c` → `#f0f1f4`) so every image sits inside the dark palette. Each new image is used once per page:

| Asset | Where |
|---|---|
| `portrait-acrylic`, `city-aerial` | Home — studio section (framed portrait, inline headline crop) |
| `portrait-smile`, `portrait-sunlit`, `portrait-gaze` | About — hero, story, how we work |
| `portrait-glow-1`, `portrait-glow-2`, `city-aerial` | Work — hero and project grid |

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
