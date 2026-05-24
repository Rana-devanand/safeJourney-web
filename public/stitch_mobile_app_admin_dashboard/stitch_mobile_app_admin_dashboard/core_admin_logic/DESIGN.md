---
name: Core Admin Logic
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#005338'
  on-tertiary: '#ffffff'
  tertiary-container: '#006e4b'
  on-tertiary-container: '#67f4b7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  container-padding-desktop: 32px
  container-padding-mobile: 16px
  gutter: 24px
  sidebar-width: 280px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style
The design system focuses on high-density information management for enterprise-grade SaaS environments. The brand personality is systematic, authoritative, and invisible—prioritizing data clarity over decorative flourishes. 

The visual style follows a **Modern Corporate** approach: a refined evolution of flat design that uses purposeful elevation and a strict 4px grid. It leverages generous whitespace to reduce cognitive load during long periods of monitoring, while high-contrast typography ensures immediate legibility of critical metrics and status indicators.

## Colors
The palette is built on a "Slate" foundation to maintain a neutral, professional environment. 

- **Primary (Indigo 600):** Reserved for primary actions, active navigation states, and progress indicators.
- **Surface Strategy:** In Light Mode, containers are pure white against a Slate-50 background. In Dark Mode, surfaces use Slate-800 to create depth against a Slate-900 canvas.
- **Semantic Accents:** Success (Green-500), Warning (Amber-500), and Destructive (Rose-600) are used strictly for status reporting and critical alerts to prevent visual noise.

## Typography
The system utilizes **Inter** for all UI elements to ensure maximum readability and a neutral character. A high-contrast scale distinguishes between navigation headers and data values.

- **Data Presentation:** JetBrains Mono is introduced for specific data-heavy roles, such as ID strings, logs, and financial figures, to ensure tabular alignment and character distinction (e.g., 0 vs O).
- **Hierarchy:** `label-caps` is used for sidebar category headers and table column headers to provide a clear structural anchor.

## Layout & Spacing
This design system employs a **Fixed Sidebar / Fluid Content** grid model. The layout is structured around a 12-column grid within the main content area.

- **Sidebar:** Fixed at 280px for desktop. On mobile, it transitions to a hidden drawer.
- **Spacing Rhythm:** Based on a 4px base unit. All internal component padding (buttons, inputs) should use 8px (sm) or 12px (md) increments.
- **Card Layouts:** Use a 24px gutter between dashboard cards. On tablet, cards reflow from 3-column to 2-column, and on mobile to a single-column vertical stack.

## Elevation & Depth
Depth is communicated through **Tonal Layers** supplemented by subtle ambient shadows. 

- **Level 0 (Background):** Slate-50 (Light) or Slate-900 (Dark). No shadow.
- **Level 1 (Cards/Tables):** Surface color with a 1px border (Slate-200/Slate-800) and a "Soft Drop" shadow: `0px 1px 3px rgba(0,0,0,0.1)`.
- **Level 2 (Dropdowns/Modals):** Surface color with a high-diffusion shadow: `0px 10px 15px -3px rgba(0,0,0,0.1)`.
- **Interactive Elements:** Buttons and form inputs remain flat at rest, gaining a subtle glow/shadow only on focus or active states to indicate "pressability."

## Shapes
A "Soft" geometric approach is used to balance professional rigidity with modern accessibility.

- **Standard (4px):** Inputs, buttons, and checkboxes.
- **Large (8px):** Dashboard cards, modal containers, and alert banners.
- **Pill:** Reserved exclusively for status badges (e.g., "Active", "Pending") and search bars to differentiate them from actionable buttons.

## Components
Consistent implementation of core admin components:

- **Data Tables:** Use `body-sm` for row content and `label-caps` for headers. Row hover states should use a subtle background tint (Slate-50 in light mode).
- **Buttons:** Primary buttons use solid Indigo-600 with white text. Secondary buttons use a ghost style (transparent background, Slate-200 border).
- **Input Fields:** 1px solid borders. On focus, the border transitions to Indigo-600 with a 2px outer ring at 20% opacity.
- **Sidebar Navigation:** Active items should feature a 3px vertical "accent bar" on the left edge and use a semi-transparent Indigo-50 background tint.
- **Activity Logs:** Use a vertical timeline thread (2px width) connecting circular avatars or icons. Use `data-mono` for timestamps.
- **Charts:** Use a 4-color categorical palette (Indigo, Emerald, Amber, Slate) with 2px line widths and semi-transparent area fills.