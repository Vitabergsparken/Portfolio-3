# Leo Stider — UX Portfolio (HTML/React prototype)

A single-page portfolio whose landing **navigation is a draggable 3D cube**. Built as
an in-browser React + Babel prototype on top of the **Portfolio Design System**.

> This is a working prototype, not a production build — React and Babel are loaded
> from a CDN and JSX is transpiled in the browser. See "Productionizing" below if you
> want to migrate it into a real toolchain.

## Run it locally

The `.jsx` files are loaded with `<script type="text/babel" src="...">`, which Babel
fetches over HTTP — so **you must serve the folder, not open `index.html` from disk**
(`file://` blocks the fetch).

```bash
# from the project root, any static server works:
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

(VS Code "Live Server", `npx serve`, etc. all work too.) An internet connection is
required the first time, to pull React/Babel from unpkg.

## Architecture

Entry point is `index.html`. It loads, in order:
1. `ds/colors_and_type.css` + `ds/portfolio.css` — the design system
2. `styles.css` — this prototype's styles (all built on DS `var(--*)` tokens)
3. React 18.3.1 + Babel standalone (CDN, pinned)
4. The app scripts as Babel modules: `tweaks-panel.jsx`, `cube.jsx`, `nav.jsx`,
   `pages.jsx`, `app.jsx`

### Files

| File | What it is |
|---|---|
| `index.html` | Entry. Script/style load order matters (see above). |
| `app.jsx` | `App` root — hash routing, footer, Tweaks panel, mounts to `#root`. |
| `cube.jsx` | The 3D cube — the home-page menu. Drag to rotate, release to glide. |
| `nav.jsx` | `TopNav` — collapsible menu bar; the "Simplify" button toggles the links. |
| `pages.jsx` | Page bodies: `Landing`, `About`, `CaseStudy`, `WorkIndex`, `Resume` + `CASES` data. |
| `styles.css` | All component styles for the prototype. |
| `tweaks-panel.jsx` | Reusable in-page "Tweaks" panel + form controls. |
| `ds/` | The Portfolio Design System — tokens, fonts, components. |
| `assets/` | Images (e.g. `portrait.png`). |

### How the scripts share scope

Each `<script type="text/babel">` is transpiled separately but runs in **global
scope**, so top-level `function` declarations (e.g. `Cube`, `TopNav`) are visible
to later scripts. A few modules also export to `window` explicitly
(`window.TopNav = TopNav`, `Object.assign(window, { Landing, About, ... })`).
**Load order therefore matters** — a script can only use globals defined by a script
above it in `index.html`.

If you add a shared `styles` object in a Babel file, give it a unique name
(`cubeStyles`, not `styles`) — globals with the same name collide across files.

### Routing

Hash-based, handled in `app.jsx`: `#about`, `#work`, `#case/inamo`, `#resume`,
empty hash = home. The top menu is closed on home (the cube is the menu) and opens
automatically on inner pages.

### The cube (`cube.jsx`)

- Six faces, all rendered by one shared `CubeFace` component.
- `FACE_VARIANT` maps each face id → a variant key; `FACE_BG` maps a variant key →
  its background color. **Change a face's color in `FACE_BG`/`FACE_VARIANT`**, not by
  inline-styling a face (all six faces share the component, so an inline edit hits
  every face and overrides the variant colors).
- On release the cube keeps its drag velocity and decelerates with friction
  (`momentum` prop) — it intentionally does **not** snap a face square to the viewer.
- `idleSpin` auto-rotates until first interaction.

## Design system

The visual language is defined in `ds/` (Portfolio Design System): ink `#07070D`,
lime accent `#D1FE1B`, paper `#F1F0FF`, lavender `#E3E0FF`; **Outfit** for all type;
sharp corners, hairline rules, generous whitespace, lime used sparingly. Use the
`var(--*)` tokens in `ds/colors_and_type.css` — don't hard-code colors or type.

## Productionizing (optional)

To move off the in-browser Babel setup: scaffold a Vite + React app, convert each
`.jsx` here into an ES-module component (replace the global-scope/`window` exports
with real `import`/`export`), keep `ds/` + `styles.css` as-is (or convert tokens to
CSS modules / Tailwind theme), and copy `assets/`. The component logic transfers
unchanged — only the module wiring differs.

## Open tasks

### résumé PDF — fit to one A4 page
`resume-print.html` prints with margins set to **None** and looks correct, but the
content is slightly too long and spills onto a second page. To fix: reduce vertical
spacing in the `@media print` block in `resume-print.html` without making the
screen version look cramped. Approach: reduce `padding` on `.resume` from `16mm` to
~`12mm` top/bottom, and reduce `margin-bottom` on `.resume__entry` and `margin-top`
on `h2` — but check the printed preview after each tweak rather than guessing.
