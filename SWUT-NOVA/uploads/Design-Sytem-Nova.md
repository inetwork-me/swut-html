# Design System — Nova

> Design tokens extracted from the shadcn/ui preset used to scaffold this project:
> `npx shadcn@latest init --preset b3eywfFytc --base radix --template next --pointer`
>
> **Purpose:** This is the single source of truth Claude must follow when building or editing UI in this project. Every color, radius, font, shadow, and icon choice must come from the tokens below — do **not** invent new values, hardcode hex/px, or pull colors from outside this file.

---

## 1. Foundation / Setup

- **Framework:** Next.js (App Router) — `--template next`
- **Component library:** shadcn/ui (Radix UI primitives) — `--base radix`
- **Icon library:** **Lucide** (`lucide-react`) — this is the ONLY icon set. Import icons from `lucide-react`. Do not use Heroicons, Font Awesome, emoji, or inline SVGs for standard UI icons.
- **Color format:** All colors are authored in **OKLCH**. Keep OKLCH as the canonical format; never convert tokens to hex/RGB in components.
- **Theming:** Tokens are exposed as CSS variables and consumed through Tailwind utility classes (`bg-background`, `text-foreground`, `border-border`, etc.). Never use a raw color value where a token exists.
- **Modes:** Ships with both **light** and **dark** themes. Dark mode is class-based (`.dark`). Always define both when adding a new surface.

---

## 2. Typography

Use these font stacks only. Reference via Tailwind (`font-sans`, `font-serif`, `font-mono`).

- **Sans (default / UI text):**
  `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`
- **Serif:**
  `ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`
- **Mono (code / tabular):**
  `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`

**Rules**
- Body and UI copy → `font-sans` (default, no class needed).
- Code, tokens, IDs, and numeric/tabular data → `font-mono`.
- `font-serif` is available but reserve it for editorial/display use only.
- **Letter spacing:** base tracking is `0em` (normal). Do not add custom tracking unless a design explicitly calls for it.

---

## 3. Corner Radius

- **Base radius (`--radius`):** `0.625rem` (10px)

Derived scale (use these Tailwind classes, not arbitrary values):

| Token | Class | Value |
|---|---|---|
| Small | `rounded-sm` | `calc(0.625rem - 4px)` → `0.375rem` |
| Medium | `rounded-md` | `calc(0.625rem - 2px)` → `0.5rem` |
| Large (default) | `rounded-lg` | `0.625rem` |
| Extra large | `rounded-xl` | `calc(0.625rem + 4px)` → `0.875rem` |
| Pill / circle | `rounded-full` | `9999px` |

**Rules**
- Default card/button/input radius is `rounded-lg` / the component default.
- Keep radii consistent within a component group; don't mix `sm` and `xl` on sibling elements.

---

## 4. Spacing

- **Base spacing unit (`--spacing`):** `0.25rem` (4px)
- All spacing (padding, margin, gap) must be multiples of this base via Tailwind's scale (`p-2` = 0.5rem, `gap-4` = 1rem, etc.). No arbitrary pixel spacing.

---

## 5. Color Tokens

Semantic tokens. **Always reference by role** (`bg-primary`, `text-muted-foreground`) — never by raw value. Each row lists Light and Dark values (OKLCH).

### Core surfaces & text

| Token | Light | Dark |
|---|---|---|
| `background` | `oklch(1 0 0)` | `oklch(0.145 0 0)` |
| `foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `card` | `oklch(1 0 0)` | `oklch(0.205 0 0)` |
| `card-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `popover` | `oklch(1 0 0)` | `oklch(0.269 0 0)` |
| `popover-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |

### Brand / interactive

| Token | Light | Dark |
|---|---|---|
| `primary` | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` |
| `primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` |
| `secondary` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `secondary-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` |
| `accent` | `oklch(0.97 0 0)` | `oklch(0.371 0 0)` |
| `accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` |
| `muted` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` |

### Feedback

| Token | Light | Dark |
|---|---|---|
| `destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |
| `destructive-foreground` | `oklch(1 0 0)` | `oklch(0.985 0 0)` |

### Borders, inputs, focus

| Token | Light | Dark |
|---|---|---|
| `border` | `oklch(0.922 0 0)` | `oklch(0.275 0 0)` |
| `input` | `oklch(0.922 0 0)` | `oklch(0.325 0 0)` |
| `ring` (focus) | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` |

**Notes**
- The UI palette is a **neutral grayscale** (chroma 0). `primary` is near-black on light / near-white on dark — a monochrome, high-contrast brand.
- `-foreground` tokens are always the correct text/icon color on their matching surface. Pair them (e.g. `bg-primary text-primary-foreground`); never guess a contrast color.
- `destructive` is the only chromatic UI color (red) — reserve it for errors and destructive actions.
- Use `ring` for focus states only.

---

## 6. Chart / Data-Visualization Palette

A cohesive **blue ramp** (light → dark), identical in both themes. Use in order for series 1–5.

| Token | Value | Reads as |
|---|---|---|
| `chart-1` | `oklch(0.81 0.10 252)` | Light blue |
| `chart-2` | `oklch(0.62 0.19 260)` | Mid blue |
| `chart-3` | `oklch(0.55 0.22 263)` | Blue |
| `chart-4` | `oklch(0.49 0.22 264)` | Deep blue |
| `chart-5` | `oklch(0.42 0.18 266)` | Darkest blue |

**Rules**
- Assign series in numeric order (`chart-1` first). For a single series, use `chart-3`.
- This is a **sequential/monochromatic** ramp — great for ordered/quantitative data. For unrelated categorical series where hue distinction matters, it will read as "shades of the same thing"; flag that to the user rather than substituting arbitrary colors.

---

## 7. Sidebar Tokens

Dedicated tokens for sidebar/nav chrome — keep it visually distinct from the main `background`.

| Token | Light | Dark |
|---|---|---|
| `sidebar` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` |
| `sidebar-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `sidebar-primary` | `oklch(0.205 0 0)` | `oklch(0.488 0.243 264.376)` |
| `sidebar-primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.985 0 0)` |
| `sidebar-accent` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `sidebar-accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` |
| `sidebar-border` | `oklch(0.922 0 0)` | `oklch(0.275 0 0)` |
| `sidebar-ring` | `oklch(0.439 0 0)` | `oklch(0.708 0 0)` |

**Note:** In dark mode `sidebar-primary` becomes a saturated blue (`oklch(0.488 0.243 264.376)`) — the active-nav accent. Use `sidebar-*` tokens inside the sidebar; do not reuse the core tokens there.

---

## 8. Shadows / Elevation

Shadows are generated from a single set of primitives, then scaled into an elevation ramp.

**Primitives**
- `shadow-color`: `oklch(0 0 0)` (black)
- `shadow-opacity`: `0.1`
- `shadow-blur`: `3px`
- `shadow-spread`: `0px`
- `shadow-offset-x`: `0`
- `shadow-offset-y`: `1px`

**Derived scale** (use these Tailwind classes):

| Class | Value |
|---|---|
| `shadow-2xs` | `0 1px 3px 0px hsl(0 0% 0% / 0.05)` |
| `shadow-xs` | `0 1px 3px 0px hsl(0 0% 0% / 0.05)` |
| `shadow-sm` | `0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)` |
| `shadow` | `0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)` |
| `shadow-md` | `0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)` |
| `shadow-lg` | `0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)` |
| `shadow-xl` | `0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)` |
| `shadow-2xl` | `0 1px 3px 0px hsl(0 0% 0% / 0.25)` |

**Rules**
- Elevation is **soft and subtle** (low opacity, tight blur). Do not use heavy/dramatic shadows.
- Map by hierarchy: cards → `shadow-sm`, dropdowns/popovers → `shadow-md`, modals/dialogs → `shadow-lg`/`shadow-xl`.
- Prefer border + subtle shadow over strong shadow for separation.

---

## 9. Rules for Claude (apply on every UI task)

- **Tokens only.** Use semantic Tailwind token classes (`bg-*`, `text-*`, `border-*`, `ring-*`, `shadow-*`, `rounded-*`). Never hardcode a hex, rgb, or px value that a token already covers.
- **Pair surfaces with their foreground.** e.g. `bg-card text-card-foreground`, `bg-primary text-primary-foreground`. Never eyeball a text color.
- **Both modes.** Anything new must look correct in light *and* dark. Verify contrast in both.
- **Lucide for all icons**, imported from `lucide-react`, sized to the text (`size-4` / `size-5`) and colored via `currentColor` (inherit `text-*`).
- **Radius / spacing / shadow** come from the scales above — no arbitrary values.
- **Neutral brand + blue data.** The interface is monochrome; blue appears only in charts and the active sidebar item. Don't introduce new accent hues without asking.
- **When a design need isn't covered by a token, ask** rather than inventing a value.
