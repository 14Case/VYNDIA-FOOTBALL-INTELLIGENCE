---
name: Synthetic Pitch Terminal
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00a572'
  on-tertiary-container: '#00311f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  mono-metric-lg:
    fontFamily: JetBrains Mono
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 32px
  mono-metric-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 20px
  mono-metric-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
  telemetry-micro:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 12px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.75rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.375rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 1.75rem
---

## Brand & Style

This design system drives a professional-grade predictive football analytics interface. It synthesizes tactical sports science with the unrelenting density, speed, and precision of tier-one financial workstations. The aesthetic rejects gamified betting visuals in favor of disciplined computational rigor: quantitative analysts, sporting directors, and data-driven tacticians operate in an environment where telemetry, real-time edge calculations, and predictive confidence intervals require immediate parsing.

The visual direction merges **Technical Density** with **Subtle Glassmorphism and Controlled Luminosity**. Deep nocturnal grounds anchor high-contrast tabular readouts, micro-sparklines, and probability vectors. Surface boundaries are delineated via calibrated low-contrast structural strokes and soft luminescent highlights rather than heavy physical elevation. Interfaces feel atmospheric yet surgical—engineered for multi-monitor setups, continuous monitoring, and high-frequency analytical workflows.

## Colors

The palette establishes strict functional separation between structural backdrops, AI telemetry, and statistical state indicators:

- **Deep Ground & Container Surfaces:** Base environments utilize `#090D16` for canvas deep-well ground and `#0D1322` for base frame structures. Nested workspace modules, data decks, and analytical panels utilize slate cards (`#121A2D` default, `#162035` hover/active). Borders use calibrated structural strokes (`#1E2D4A` resting, `#2A3C60` focused/interactive).
- **Core Engine Accents:** `#3B82F6` (Electric Hyper Blue) and `#60A5FA` anchor predictive models, active system filters, and system-wide focus states. `#8B5CF6` (Quantum Violet) and `#A78BFA` denote algorithmic confidence indices, machine learning output layers, and simulation matrices.
- **Quantitative Signals & Deltas:**
  - Positive Delta / High Win Probability / Model Certainty: Fluorescent Emerald (`#10B981` solid, `#34D399` high-luminosity text).
  - Parity / Caution / Neutral Projection: Amber Gold (`#F59E0B`).
  - Negative Delta / Deficit / Critical Invalidation: Crimson Rose (`#EF4444` solid, `#F87171` high-luminosity text).
- **Typography & Structural Contrast:** Dominant structural headings, vital match figures, and live readouts render in crisp cold white (`#F8FAFC`). Primary narrative data and tabular secondary fields use cool slate (`#CBD5E1` and `#94A3B8`). Passive metadata, axes, and column guides use muted telemetry slate (`#64748B`).

## Typography

The typographical hierarchy is divided strictly into two execution engines:

1. **Analytical UI & Structural Hierarchy (Plus Jakarta Sans):** Drives clear context across headers, section guides, system navigation, and analytical summaries. Tight letter-spacing (`-0.015em` on headlines) maintains compact density without sacrificing legibility.
2. **Tabular Computational Engine (JetBrains Mono):** Mandated for all probability splits, xG values, timestamps, model confidence tiers, and coordinate matrices. Tabular numeric figures (`tnum`) ensure absolute vertical alignment across multi-row data tables, live odds delta columns, and split probability cards.

All text smaller than 12px is restricted to monospace data tags, timestamps, model hashes, and compliance notices.

## Layout & Spacing

The terminal is structured on a high-density, multi-pane fluid workspace optimized for ultra-widescreen, desktop, and tablet command setups:

- **Grid Architecture:** Desktop views operate on a 12-column dynamic grid pinned by a fixed 64px or 240px collapsable operations sidebar. Standard gutters sit at `0.75rem` (12px), prioritizing information density and minimal mouse travel. Outer margin defaults to `1rem` (16px).
- **Rhythm & Compaction:** Spacing tokens intentionally contract standard web spacing by ~40%. Padding inside analytical cards, tabular matrix cells, and telemetry rows follows strict steps: `space-xs` (4px) for inline pill separation, `space-sm` (6px) for tight internal control pads, and `space-md` (12px) for card body padding.
- **Responsive Adaptations:**
  - *Large Desktops (>1440px):* Full 3-pane analytical workflow (Navigation, Core Live Grid, Deep Predictive Inspector).
  - *Desktop/Laptop (1024px - 1439px):* Collapses inspector pane into an overlay slide-out; main pitch telemetry and tables occupy full width.
  - *Mobile/Field Devices (<1023px):* Single-column vertical reflow; secondary matrix metrics collapse behind sticky horizontal sub-tabs.

## Elevation & Depth

This design system avoids heavy drop shadows, relying on structural tonal layering, selective glassmorphism, and colored edge radiance:

- **Tier 0 (Root Level):** `#090D16` matte canvas.
- **Tier 1 (Surface Panels):** `#0D1322` with a 1px solid stroke (`#1E2D4A`).
- **Tier 2 (Interactive Modules & Metric Cards):** `#121A2D` background, backdrop filter blur of `8px`, finished with a 1px inner structural border (`#1E2D4A`). On hover or selection, the border shifts to `#2A3C60` paired with an inner box glow of `inset 0 0 12px rgba(59, 130, 246, 0.08)`.
- **Tier 3 (Floating HUDs, Popovers & Context Panels):** `#162035` with `backdrop-filter: blur(16px)`, border: `1px solid #2A3C60`, and an ambient directional shadow: `0 8px 32px -4px rgba(0, 0, 0, 0.6)`.
- **Quantum Elevation (Telemetry Highlights):** Components surfaced by predictive models receive a subtle top-edge gradient highlight: `linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.4), transparent)`.

## Shapes

The geometric architecture uses tight, precise radii reflecting industrial computing hardware. 

- Base inputs, buttons, chips, and data row containers adopt a disciplined `0.25rem` (4px) corner radius.
- Cards, modal containers, and tactical pitch viewports scale to `0.5rem` (8px).
- Status indicators, engine pulse nodes, and probability bar tracks utilize fully pill-shaped radii for rapid visual parsing without competing with rectangular grid cells.

## Components

### Buttons & Interactive Triggers
- **Primary Execution (Action):** Background `#3B82F6`, text `#F8FAFC`, font weight 600. Active states emit a subtle outer radiance (`0 0 14px rgba(59, 130, 246, 0.4)`).
- **Secondary Command:** Background `rgba(30, 45, 74, 0.5)`, border `1px solid #1E2D4A`, text `#CBD5E1`. Hover: `#162035`, border `#2A3C60`.
- **Destructive/Critical:** Background `rgba(239, 68, 68, 0.1)`, border `1px solid #EF4444`, text `#F87171`.

### Engine Status Chips & Telemetry Dots
- Compact heights (20px to 24px) utilizing JetBrains Mono.
- Enclosed with a 1px solid stroke matching state color.
- Pulsating telemetry indicator: 6px circular dot with a CSS ripple animation (`scale(1.8)`, `opacity: 0`) denoting live model feeds.
  - *CONFIRMED:* Solid `#10B981` outline, text `#34D399`, background `rgba(16, 185, 129, 0.08)`.
  - *ESTIMATED:* Dashed `1px` `#F59E0B` outline, text `#F59E0B`, background `rgba(245, 158, 11, 0.08)`.
  - *UNAVAILABLE:* Solid `#64748B` muted outline, text `#64748B`, background `rgba(100, 116, 139, 0.06)`.

### 1X2 Head-to-Head Probability Distribution Bars
- Segmented 3-way continuous bar (Home / Draw / Away).
- Home: Electric Blue gradient (`#3B82F6` to `#60A5FA`).
- Draw: Amber Gold (`#F59E0B`).
- Away: Crimson Rose gradient (`#EF4444` to `#F87171`).
- Height: 6px bar with floating tabular labels above displaying discrete percentages (e.g., `48.2% // 24.1% // 27.7%`) formatted in JetBrains Mono.

### Metric Cards & Micro-Sparklines
- Dark navy slate container (`#121A2D`) with frosted glass header (`#0D1322` at 60% opacity with 4px backdrop blur).
- Top corner displays metric title in `label-mono`, followed by primary readout in `mono-metric-lg`.
- Bottom rail embeds integrated micro-sparklines (SVG stroke `1.5px`, fill linear gradient with 10% opacity down to 0%).
- Integrated positive/negative delta badge right-aligned (`+0.42 xG` in `#34D399`).

### Persistent Navigation Sidebar
- Slimline width, dark matte ground (`#090D16`), border-right `1px solid #1E2D4A`.
- Houses dynamic quick search (command palette shortcut `CMD+K`), league matrix selector, engine model version pill (e.g., `v4.2-NEURAL`), and ping latency telemetry indicator.

### Input Fields
- Terminal-styled compact heights (32px).
- Background `#0D1322`, border `1px solid #1E2D4A`, font `JetBrains Mono` 12px, text `#F8FAFC`.
- Focus ring: `1px solid #3B82F6`, `box-shadow: 0 0 0 1px #3B82F6`.

### Compliance & Model Integrity Footer
- Persistent high-visibility legal watermark in monospace: `"DEMO DATA // PROBABILISTIC MODEL - NOT BETTING ADVICE"`.
- Styled in `telemetry-micro`, text color `#64748B`, tracking `0.08em`, uppercase.