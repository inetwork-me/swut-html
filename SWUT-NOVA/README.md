# SWUT-NOVA

The **Nova** SWUT home page — imported from the Claude Design project
`SWUT Home` and built on the Nova design system (see
[`uploads/Design-Sytem-Nova.md`](uploads/Design-Sytem-Nova.md)).

`index.html` is a Design Component (`.dc`) page. It is self-bootstrapping:
`support.js` loads React/ReactDOM from a CDN, and Tailwind + Lucide are pulled
from CDNs in the page `<head>`. Open `index.html` in any browser with an
internet connection — no build step required.

## Structure

| File | Purpose |
|---|---|
| `index.html` | The home page (DC template + logic). |
| `support.js` | DC runtime — boots React and mounts the page. |
| `image-slot.js` | `<image-slot>` web component used for the product/service/tech images. |
| `tech-a.svg` / `tech-b.svg` | Fallback art for the two "Our Technology" inline pills. |
| `service-placeholder.svg` | Neutral placeholder for empty image slots. |
| `CLAUDE.md` | Project rules (square corners; tag headlines are the only pills). |
| `uploads/Design-Sytem-Nova.md` | The full Nova design-system token reference. |

## Images

The hero and the product/service cards use plain `<img>` tags pointing at
web-optimized JPEGs in `uploads/` (each ≤ ~390 KB, ~1.6 MB total). The two
"Our Technology" inline pills keep their labelled SVG art (`tech-a.svg` /
`tech-b.svg`) — a pill that small can't show a photo legibly.

| File | Used by |
|---|---|
| `uploads/hero.jpg` | Hero background |
| `uploads/prod-idea.jpg` | Product 01 — IDEA StatiCa |
| `uploads/prod-zwcad.jpg` | Product 02 — ZWCAD |
| `uploads/prod-midas.jpg` | Product 03 — Midas |
| `uploads/prod-planswift.jpg` | Product 04 — PlanSwift |
| `uploads/svc-maint.jpg` | Service — Software Maintenance |
| `uploads/svc-train.jpg` | Service — Training |
| `uploads/svc-finance.jpg` | Service — Finance |
| `uploads/svc-support.jpg` | Service — Technical Support |
| `uploads/svc-demo.jpg` | Service — Trial Demo |

To swap any image, drop a replacement at the same path (or change the `img`
field in the `products` / `services` arrays near the bottom of `index.html`).
