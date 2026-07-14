\# Swut Solutions: Verity Design System Architecture



This specification outlines the structural, typographic, color, and component tokens for the \*\*Verity Design System Framework\*\*, adapted expressly for \*\*Swut Solutions\*\* (Egypt's premier coordinator for structural engineering, digital quantity estimating, and model-based BIM license delivery). 



Unlike classical editorial formats, the Verity archetype balances an ultra-dense, hyper-disciplined tech-minimalist layout with micro-geometric boxes, precise hairline rule layers, tight tracking parameters, flat print-inspired surfaces, and sharp structural framing.



\---



\## 1. Core Color \& Surface Tokens



The system rejects traditional soft gray gradients and fuzzy blurs in favor of deep, high-contrast digital environments and sharp, line-bounded surface boxes.



| Token Name | Hex Code | System Application | Tailwind Utility equivalent |

| :--- | :--- | :--- | :--- |

| \*\*Canvas Canvas\*\* | `#090A0C` | Absolute background baseline for viewports | `bg-\[#090A0C]` |

| \*\*Surface Primary\*\* | `#0F1115` | Default fill background for standard micro-cards | `bg-\[#0F1115]` |

| \*\*Surface Secondary\*\* | `#111317` | Secondary dark background accents for button tracks | `bg-\[#111317]` |

| \*\*Hairline Outline\*\* | `#1F2937` | Microscopic border separators for cards and grids | `border-\[#1F2937]` |

| \*\*Active Accent Blue\*\* | `#3B82F6` | Primary conversion links, glow states, and chat focus | `text-\[#3B82F6]` / `bg-\[#3B82F6]` |

| \*\*Active Glow Blue\*\* | `#1D4ED8` | Underlying ambient linear gradient shadows | `from-\[#1D4ED8]` |

| \*\*Signal Emerald\*\* | `#34D399` | Live validator success markers and online indicators | `text-emerald-400` |

| \*\*Text Foreground\*\* | `#F3F4F6` | Primary legible high-contrast reader font layer | `text-\[#F3F4F6]` |

| \*\*Text Muted\*\* | `#9CA3AF` | Secondary explanatory descriptions and labels | `text-zinc-400` |



\---



\## 2. Corner Radius \& Spatial Hierarchy



Verity operates on a strict geometric scale. Component containers use structured corners rather than loose, organic pill tracking, optimizing content space across standard 15-inch viewports.



\### Card Wrappers (`rounded-xl` / 12px)

Used for all major application panels, layout cards, and product license boxes. This radius remains perfectly flat along screen boundaries to preserve an industrial grid style.



\### Secondary UI Elements (`rounded-lg` / 8px)

Applied to interactive form layout blocks, internal code frames, action tabs, navigation pathways, and inner badge components.



\### Badges \& Status Pills (`rounded-full` / 9999px)

Strictly reserved for floating version identifiers, system tracking labels, and indicator capsule tags.



\---



\## 3. Typographic Scaling \& Tracking



Typography uses a clean, high-performance sans-serif matrix. It completely rejects typewriter or raw monospace options for regular reading prose, maintaining high readability at tight dimensions.



\### Section Titles \& Hero Layouts

\* \*\*Scale\*\*: `text-4xl` to `text-6xl` (36px–60px)

\* \*\*Tracking\*\*: `tracking-tight` or `tracking-tighter` (-0.025em to -0.05em)

\* \*\*Leading\*\*: `leading-\[1.05]`

\* \*\*Weight\*\*: Bold or Extra Bold (`font-bold` / `font-extrabold`)

\* \*\*Application\*\*: Big structural engineering taglines.



\### Subheadlines \& Core Copy

\* \*\*Scale\*\*: `text-sm` to `text-base` (14px–16px)

\* \*\*Tracking\*\*: Normal tracking parameter configuration

\* \*\*Leading\*\*: `leading-relaxed` (1.625)

\* \*\*Weight\*\*: Regular (`font-normal`)

\* \*\*Application\*\*: Condensed project briefs and platform details.



\### System Labels \& Micro Eyebrows

\* \*\*Scale\*\*: `text-\[10px]` to `text-\[11px]`

\* \*\*Tracking\*\*: `tracking-\[0.25em]`

\* \*\*Leading\*\*: `leading-none`

\* \*\*Weight\*\*: Bold (`font-bold`)

\* \*\*Case\*\*: Forced Uppercase (`uppercase`)

\* \*\*Application\*\*: Small index markers and context headers.



\---



\## 4. Spacing, Layout Grids, \& Layout Rules



To ensure an accurate layout across standard desktop displays (1920x1080 resolution), components must follow strict vertical and horizontal sizing constraints.



\### The Viewport Stacking Constraint

The maximum height for interactive visualization boxes must be capped at exactly \*\*150px\*\*. Complete structural card heights are locked to \*\*340px\*\* for services and \*\*320px\*\* for software products, preventing screen-overflow on laptop viewports.



\### Tech-Grid Pattern Backdrop

All main viewport canvases are layered behind a microscopic linear wireframe matrix. This grid configuration uses a repeating vector layout:

\* `linear-gradient(to right, #1F2937 1px, transparent 1px)`

\* `linear-gradient(to bottom, #1F2937 1px, transparent 1px)`

\* \*\*Size Constraints\*\*: `bg-\[size:24px\_24px]` tracking at an operational capacity opacity layer of 15% to 20%.



\---



\## 5. Micro-Component \& Interactive Canvas Blueprints



The visual canvas containers across Swut's core layers rely on clear UI patterns to demonstrate complex engineering systems.



\### A. The BIM Workflow Timeline Module

\* \*\*Container Background\*\*: Deep base fill (`bg-\[#090A0C] border border-\[#1F2937] p-3`)

\* \*\*Visual Structure\*\*: Vertical stack displaying three sequential execution states:

&#x20;   1.  \*State 1 (Success)\*: White structural code element with a green validation indicator icon. Text: `IFC / RVT Model Verified`.

&#x20;   2.  \*State 2 (Active)\*: High-contrast blue block with a glowing spinner animation. Text: `Auto-checking structural constraints...`.

&#x20;   3.  \*State 3 (Pending)\*: Muted gray baseline block with an empty indicator marker. Text: `Generate Compliance Report`.



\### B. The Licensing Node Cloud Workspace

\* \*\*Container Background\*\*: Centered network matrix workspace with absolute background lines.

\* \*\*Visual Structure\*\*: An array of rounded software brand plates drifting organically via custom dual-axis float configurations:

&#x20;   \* Badges use clean borders, subtle shadows, and uniform font layout styles (`px-2 py-1 bg-zinc-900 border border-zinc-700 text-white rounded text-\[10px] font-mono`).



\### C. The Two-Way Live Engineer Chat Module

\* \*\*Container Background\*\*: Compact operational support window environment (`h-\[150px]`).

\* \*\*Visual Structure\*\*: A live response loop with asymmetric alignments:

&#x20;   \* \*Support Bubble (Left)\*: Clean incoming capsule (`bg-\[#1F2937] border border-zinc-800 text-zinc-300 rounded-lg text-\[10px] p-2 self-start`) showing a pulsing emerald online status indicator marker. Text: `"Verify model compliance for Egypt Eurocode terms."`.

&#x20;   \* \*Customer Confirmation (Right)\*: Outgoing high-contrast blue self-capsule (`bg-\[#3B82F6] text-white font-medium rounded-lg text-\[10px] p-2 self-end shadow-sm`). Text: `"Audit Approved. 0 collisions detected across layer arrays."`.



\---



\## 6. Official Data Integration Mapping



The following tables define the actual Swut Solutions datasets mapped into the Verity Design System layout.



\### Core Software Product Licenses Matrix (Sticky Stacking Layout)

All product cards share the exact same top sticky constraint (`sticky top-\[100px]`) and overlapping z-index layers to completely cover previous cards on scroll.



| Product Title | Category Label | Feature Summary | Key Performance Metrics | Product Image URL Reference |

| :--- | :--- | :--- | :--- | :--- |

| \*\*IDEA StatiCa\*\* | `FEA MATRIX` | Component-based finite element structural joint modeling keys explicitly built for challenging multi-geometry verification loops. | `SOLVER\_SPEED // 3D MATRIX FEA` <br> `ACCURACY\_INDEX // 100% AUDITED` | `https://assets-us-01.kc-usercontent.com/1ca05609-4ad1-009e-bc40-2e1230b16a75/4db7291f-9734-4736-85f3-a244351afa55/IDEA\_StatiCa.jpg` |

| \*\*PlanSwift\*\* | `QUANTITY TAKEOFF` | Industry-standard digital quantity takeoff and construction estimating tools for instant structural material calculations. | `TAKEOFF\_SPEED // 10x FASTER` <br> `ESTIMATE\_ACCURACY // 99.8% QTO` | `https://www.planswift.com/wp-content/uploads/2015/05/general-contractor-estimating-software.jpg` |

| \*\*MIDAS Suite\*\* | `CIVIL \& GEN` | High-performance multi-discipline design software suite for buildings (Gen), bridges (Civil), and geotech (GTS NX). | `DISCIPLINE\_CAP // MULTI-ENGINE` <br> `ACTIVE\_NODES // 20,000+ DEPLOYED` | `https://www.midasuser.com/assets/home/case/img\_application\_1.png` |

| \*\*ZWCAD System\*\* | `DWG NATIVE` | Ultra-fast native DWG engine crafted for high-performance drafted detailing work and workflow automation. | `COMPAT\_CORE // 100% DWG STANDARD` <br> `PROVISION\_KEY // HARDWARE / CLOUD` | `https://statics.zwsoft.com/upload/en/20250826/52a6b782b7c5af5f2e33a6836f9bc5bf.jpg` |



\### Operations Suite Services Matrix (3-Column Dense Matrix)



| Service Title | Index Token | Core Business Description | Associated Visual Canvas Pattern |

| :--- | :--- | :--- | :--- |

| \*\*Software Maintenance\*\* | `01 / SERVICE` | Regular updates, license renewals, and version upgrades to guarantee continuous productivity for engineering offices. | BIM Workflow Execution Timeline Array |

| \*\*Technical Support\*\* | `02 / SERVICE` | Fast issue resolution, live presentation assistance, and direct engineering help to prevent project bottlenecks. | Two-Way Live Engineer Chat Module Workspace |

| \*\*Tailored Training\*\* | `03 / SERVICE` | Customized programs and advanced courses designed to maximize team capabilities and unlock the full value of software tools. | Radial Loading Progress Engine Component |

| \*\*Flexible Finance\*\* | `04 / SERVICE` | Budget-conscious, tailored payment paths and financing structures scaled for structural engineering teams of any magnitude. | Flowchart Connection Vector Node Workspace |

| \*\*Risk-Free Trial\*\* | `05 / SERVICE` | Comprehensive, zero-commitment evaluation licenses with full operational feature access to facilitate technical evaluation. | Glowing License Activation Module Framework |



\### System Performance Validation Metrics (Footer Strip Grid)
\[ SIGNAL LEVEL INDEX:  | | █ | ]  (Absolute Top-Right Placement per Cell Block)





\* \*\*Metric Node 1\*\*: `3x` (Orange-Red Accent) — `AVERAGE FIRST-YEAR ROI`

\* \*\*Metric Node 2\*\*: `100+` (Orange-Red Accent) — `HOURS SAVED PER MONTH`

\* \*\*Metric Node 3\*\*: `60%` (Orange-Red Accent) — `LESS MANUAL WORK ACROSS TEAMS`

\* \*\*Metric Node 4\*\*: `98%` (Orange-Red Accent) — `CLIENT RETENTION RATE`



\---



\## 7. Global Typography Wordmark Finish



The absolute final block of the architecture acts as a screen-filling brand identity token. It drops conversational text entirely, ending the experience with an industrial layout signature.



\* \*\*Element\*\*: Heavy, solid display font tracking at base-level constraints.

\* \*\*Scale Parameters\*\*: Width-relative styling: `text-\[22vw]`

\* \*\*Styling Rules\*\*: `font-black font-sans text-white uppercase tracking-tighter text-center leading-none opacity-\[0.03]`

\* \*\*String Value\*\*: `SWUT`

