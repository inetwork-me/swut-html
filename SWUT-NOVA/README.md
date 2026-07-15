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

## Images to add

The original photos live in the design tool as an embedded image sidecar that
exceeds the design API's 256 KiB per-file transfer cap, so they could not be
pulled over automatically. Until real photos are dropped in, the hero shows a
dark panel and the product/service cards show neutral placeholders — nothing is
broken.

Drop images into `uploads/` for these slots and they'll be wired in:

| Where | Slot id | Subject |
|---|---|---|
| Hero background | *(direct `<img>`)* | `eduard-galitsky-pdcR2kN-NDI-unsplash.jpg` |
| Product 01 | `prod-idea` | IDEA StatiCa |
| Product 02 | `prod-zwcad` | ZWCAD |
| Product 03 | `prod-midas` | Midas |
| Product 04 | `prod-planswift` | PlanSwift |
| Service | `svc-maint` | Software Maintenance |
| Service | `svc-train` | Training |
| Service | `svc-finance` | Finance |
| Service | `svc-support` | Technical Support |
| Service | `svc-demo` | Trial Demo |
