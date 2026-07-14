# Design System

- **Source:** `npx shadcn@latest init --preset b2vQG5KBuK --template next --pointer`
- **Extraction method:** decoded the preset, scaffolded the template, read the generated `components.json`, `app/globals.css`, `app/layout.tsx`, `components/ui/button.tsx`. All values below are literal output, not approximations.

---

## 1. Preset

- **code** — `b2vQG5KBuK`
- **version** — `b`
- **style** — `luma`
- **baseColor** — `mist`
- **theme** — `blue`
- **chartColor** — `blue`
- **iconLibrary** — `lucide`
- **font (body)** — `inter`
- **fontHeading** — `outfit`
- **radius** — `small` → `0.45rem`
- **menuAccent** — `subtle`
- **menuColor** — `default`
- **permalink** — https://ui.shadcn.com/create?preset=b2vQG5KBuK
- **`--pointer`** — adds a global rule giving every enabled button a pointer cursor
- **Primitive base is Base UI, not Radix** — `components.json` records the style as `base-luma`

## 2. Color tokens

Authored in OKLCH; hex given for design tools. Pair every surface with its `-foreground`.

### Light (`:root`)

- `--background` — `oklch(1 0 0)` — `#ffffff`
- `--foreground` — `oklch(0.148 0.004 228.8)` — `#090b0c`
- `--card` — `oklch(1 0 0)` — `#ffffff`
- `--card-foreground` — `oklch(0.148 0.004 228.8)` — `#090b0c`
- `--popover` — `oklch(1 0 0)` — `#ffffff`
- `--popover-foreground` — `oklch(0.148 0.004 228.8)` — `#090b0c`
- `--primary` — `oklch(0.488 0.243 264.376)` — `#1447e6`
- `--primary-foreground` — `oklch(0.97 0.014 254.604)` — `#eff6ff`
- `--secondary` — `oklch(0.967 0.001 286.375)` — `#f4f4f5`
- `--secondary-foreground` — `oklch(0.21 0.006 285.885)` — `#18181b`
- `--muted` — `oklch(0.963 0.002 197.1)` — `#f1f3f3`
- `--muted-foreground` — `oklch(0.56 0.021 213.5)` — `#67787c`
- `--accent` — `oklch(0.963 0.002 197.1)` — `#f1f3f3`
- `--accent-foreground` — `oklch(0.218 0.008 223.9)` — `#161b1d`
- `--destructive` — `oklch(0.577 0.245 27.325)` — `#e7000b`
- `--border` — `oklch(0.925 0.005 214.3)` — `#e3e7e8`
- `--input` — `oklch(0.925 0.005 214.3)` — `#e3e7e8`
- `--ring` — `oklch(0.723 0.014 214.4)` — `#9ca8ab`

### Dark (`.dark`)

- `--background` — `oklch(0.148 0.004 228.8)` — `#090b0c`
- `--foreground` — `oklch(0.987 0.002 197.1)` — `#f9fbfb`
- `--card` — `oklch(0.218 0.008 223.9)` — `#161b1d`
- `--card-foreground` — `oklch(0.987 0.002 197.1)` — `#f9fbfb`
- `--popover` — `oklch(0.218 0.008 223.9)` — `#161b1d`
- `--popover-foreground` — `oklch(0.987 0.002 197.1)` — `#f9fbfb`
- `--primary` — `oklch(0.424 0.199 265.638)` — `#193cb8`
- `--primary-foreground` — `oklch(0.97 0.014 254.604)` — `#eff6ff`
- `--secondary` — `oklch(0.274 0.006 286.033)` — `#27272a`
- `--secondary-foreground` — `oklch(0.985 0 0)` — `#fafafa`
- `--muted` — `oklch(0.275 0.011 216.9)` — `#22292b`
- `--muted-foreground` — `oklch(0.723 0.014 214.4)` — `#9ca8ab`
- `--accent` — `oklch(0.275 0.011 216.9)` — `#22292b`
- `--accent-foreground` — `oklch(0.987 0.002 197.1)` — `#f9fbfb`
- `--destructive` — `oklch(0.704 0.191 22.216)` — `#ff6467`
- `--border` — `oklch(1 0 0 / 10%)` — white at 10%
- `--input` — `oklch(1 0 0 / 15%)` — white at 15%
- `--ring` — `oklch(0.56 0.021 213.5)` — `#67787c`
- **Note:** dark borders and inputs are translucent white, not a solid gray — keep the alpha so they read correctly over any card.

### Charts (identical in both modes)

- `--chart-1` — `oklch(0.809 0.105 251.813)` — `#8ec5ff`
- `--chart-2` — `oklch(0.623 0.214 259.815)` — `#2b7fff`
- `--chart-3` — `oklch(0.546 0.245 262.881)` — `#155dfc`
- `--chart-4` — `oklch(0.488 0.243 264.376)` — `#1447e6`
- `--chart-5` — `oklch(0.424 0.199 265.638)` — `#193cb8`
- **Note:** this is a sequential single-hue blue ramp, so it fits ordered/quantitative series. Unordered categories need a separate qualitative palette.

### Sidebar (light / dark)

- `--sidebar` — `#f9fbfb` / `#161b1d`
- `--sidebar-foreground` — `#090b0c` / `#f9fbfb`
- `--sidebar-primary` — `#155dfc` / `#2b7fff`
- `--sidebar-primary-foreground` — `#eff6ff` / `#eff6ff`
- `--sidebar-accent` — `#f1f3f3` / `#22292b`
- `--sidebar-accent-foreground` — `#161b1d` / `#f9fbfb`
- `--sidebar-border` — `#e3e7e8` / white at 10%
- `--sidebar-ring` — `#9ca8ab` / `#67787c`

## 3. Typography

- Loaded via `next/font/google` in `app/layout.tsx`.
- **Body / UI** — Inter — `--font-sans` — `font-sans` (applied to `html`)
- **Headings** — Outfit — `--font-heading` — `font-heading`
- **Mono** — Geist Mono — `--font-mono` — `font-mono`
- `--font-sans` and `--font-heading` are re-exported through `@theme inline`, so `font-heading` is a real Tailwind utility.
- Headings are **not** automatically Outfit — apply `font-heading` on heading elements yourself.

## 4. Radius

- Base — `--radius: 0.45rem` (the `small` setting).
- `rounded-sm` — `--radius * 0.6` — `0.27rem`
- `rounded-md` — `--radius * 0.8` — `0.36rem`
- `rounded-lg` — `--radius` — `0.45rem`
- `rounded-xl` — `--radius * 1.4` — `0.63rem`
- `rounded-2xl` — `--radius * 1.8` — `0.81rem`
- `rounded-3xl` — `--radius * 2.2` — `0.99rem`
- `rounded-4xl` — `--radius * 2.6` — `1.17rem`
- The scale is derived multiplicatively — change `--radius` alone and everything moves with it.
- `luma` puts `rounded-4xl` on buttons, so they read as strongly rounded even at a "small" radius.

## 5. Base layer rules

```css
@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; }
  button:not(:disabled), [role="button"]:not(:disabled) { cursor: pointer; }  /* --pointer */
  html { @apply font-sans; }
}
```

- Every element defaults to `border-border`, so a bare `border` class already picks up the token — never hardcode a border color.

## 6. Button (the `luma` reference component)

### Shared base

- `inline-flex shrink-0 items-center justify-center rounded-4xl border border-transparent bg-clip-padding text-sm font-medium transition-all outline-none select-none`
- **Focus** — `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30`
- **Press** — `active:translate-y-px` (skipped on popup triggers)
- **Disabled** — `pointer-events-none opacity-50`
- **Invalid** — `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20`
- **Icons** — auto-sized to `size-4` (`size-3` at `xs`)

### Variants

- `default` — `bg-primary text-primary-foreground`, hover → `bg-primary/80`
- `outline` — `border-border bg-background`, hover → `bg-muted`; transparent in dark
- `secondary` — `bg-secondary`, hover darkens via `color-mix(in oklch, var(--secondary), var(--foreground) 5%)`
- `ghost` — transparent, hover → `bg-muted` (`bg-muted/50` in dark)
- `destructive` — **tinted, not solid**: `bg-destructive/10 text-destructive`, hover → `/20`
- `link` — `text-primary`, underline on hover
- The tinted `destructive` is the notable departure from stock shadcn, which fills solid red.

### Sizes

- `xs` — `h-6 px-2.5 text-xs`
- `sm` — `h-8 px-3`
- `default` — `h-9 px-3`
- `lg` — `h-10 px-4`
- `icon-xs` / `icon-sm` / `icon` / `icon-lg` — `size-6` / `size-8` / `size-9` / `size-10`
- Padding tightens automatically when an icon sits on that edge (`has-data-[icon=inline-start]:pl-2.5`), keeping leading/trailing icons optically balanced.

## 7. Stack

- **Framework** — Next.js 16 (App Router, RSC) + React 19
- **Styling** — Tailwind CSS v4 (`@theme inline`, CSS-variable theming, no `tailwind.config`)
- **Primitives** — `@base-ui/react`
- **Variants** — `class-variance-authority`, `clsx`, `tailwind-merge` (via `cn()` in `@/lib/utils`)
- **Icons** — `lucide-react`
- **Dark mode** — `next-themes` + `.dark` class (`@custom-variant dark (&:is(.dark *))`)
- **Animation** — `tw-animate-css`
- **Aliases** — `@/components`, `@/components/ui`, `@/lib`, `@/hooks`

## 8. Rules of use

- **Never hardcode a color** — use the semantic token (`bg-card`, `text-muted-foreground`, `border-border`). Every token exists in both modes, so correct token usage means dark mode is free.
- **Pair surfaces with their foreground** — `bg-primary` → `text-primary-foreground`, `bg-card` → `text-card-foreground`.
- **Derive states from tokens**, not new colors — opacity (`bg-primary/80`) or `color-mix(in oklch, …)`.
- **Radius comes from the scale** — never a raw `rounded-[Npx]`.
- **Retheme by re-running `init --preset`** — it reconfigures the project and its installed components. Edit tokens, not components, when you want a different look.
