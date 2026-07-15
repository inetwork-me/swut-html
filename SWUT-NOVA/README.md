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
| `CLAUDE.md` | Project rules (square corners; tag headlines are the only pills). |
| `uploads/Design-Sytem-Nova.md` | The full Nova design-system token reference. |

## Images

Every image is a plain `<img>` tag pointing at a web-optimized JPEG in
`uploads/` (~1.7 MB total; hero ≤ ~390 KB, cards ~110–190 KB, the two tech
pills ~20–30 KB).

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
| `uploads/tech-1.jpg` / `uploads/tech-2.jpg` | The two "Our Technology" inline pills |

To swap any image, drop a replacement at the same path (or change the `img`
field in the `products` / `services` arrays near the bottom of `index.html`).
