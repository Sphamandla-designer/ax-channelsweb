# AX-Channels® — Homepage

Premium South African design studio: web design & development, mobile UX design and brand identity.

Static site, no build step.

```bash
# any static server works, e.g.
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Structure

- `index.html` — homepage
- `assets/css/styles.css` — design tokens (dark · silver · white), layout, motion
- `assets/js/main.js` — header state, mobile menu, scroll-spy, reveals, accessible hero carousel, marquee controls, custom cursor
- `assets/img/` — silver-duotone brand visuals and procedural liquid-chrome textures (WebP)

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
