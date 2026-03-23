# Theme Audit: Diagram Workspace UI/UX Review

**Date:** 2026-03-23 | **Branch:** develop

## Overview

Reviewed 4 themes (Default, Glassmorphism, Blueprint, Neon) × 2 modes (light/dark) = 8 variants. Audited CSS variables, diagram variables, grid backgrounds, UI components, and hardcoded colors.

## Issues Found

### P1 — Hardcoded Colors Breaking Theme Consistency

| File                 | Line  | Hardcoded                     | Should Be                                                             |
| -------------------- | ----- | ----------------------------- | --------------------------------------------------------------------- |
| Editor.svelte        | 51    | `bg-slate-900 text-white`     | `bg-destructive/10 text-foreground`                                   |
| Editor.svelte        | 57    | `text-white/60`               | `text-muted-foreground`                                               |
| History.svelte       | 178   | `text-blue-500`               | `text-primary`                                                        |
| History.svelte       | 182   | `text-primary-foreground/30`  | `text-muted-foreground` (wrong semantic — uses foreground on card bg) |
| History.svelte       | 188   | `text-primary-foreground/50`  | `text-muted-foreground`                                               |
| +error.svelte        | 18    | `text-blue-500`               | `text-primary`                                                        |
| Actions.svelte       | 139   | `text-gray-500`               | `text-muted-foreground`                                               |
| +layout.svelte       | 56    | `bg-gray-600`                 | `bg-background/80`                                                    |
| +layout.svelte       | 57    | `text-indigo-100`             | `text-foreground`                                                     |
| +layout.svelte       | 66-68 | `#f3f3f3`, `#6365f1`          | theme vars                                                            |
| Navbar.svelte        | 72    | `hover:text-[#261A56]`        | `hover:text-foreground`                                               |
| button.svelte        | 16    | `from-[#0052CC] to-[#007BFF]` | OK — accent variant is brand-specific                                 |
| DesktopEditor.svelte | 236   | `#eef1f5` / `#0f1f3a`         | These are Monaco-specific, tolerable                                  |

### P2 — Missing Light Variant layoutConfig

Default theme light mode and Glassmorphism light mode lack `layoutConfig` (packet, radar, xyChart). Only dark variants have it. This means dark mode renders xyChart/packet/radar with correct themed colors, but light mode falls back to Mermaid defaults (potentially mismatched).

### P3 — Inconsistent Grid Background Dot Density

| Theme           | Grid Size                     | Dot Size            |
| --------------- | ----------------------------- | ------------------- |
| Default light   | 24px                          | 1px                 |
| Default dark    | 24px                          | 1px (+ radial glow) |
| Blueprint dark  | 20px                          | 0.5px               |
| Blueprint light | 20px                          | 0.5px               |
| Neon dark       | 24px                          | 0.5px               |
| Neon light      | 24px                          | 0.5px               |
| Glassmorphism   | uses default dark/light grids | —                   |

Blueprint uses 20px grid vs 24px for others. This is intentional design differentiation. Glassmorphism has no custom grid, uses the generic dark/light grids — acceptable since glass aesthetic doesn't need a specialized grid.

### P4 — Loading Overlay Not Themed

`+layout.svelte` loading overlay uses hardcoded `bg-gray-600`, `text-indigo-100`, and hardcoded spinner colors. Should use theme variables.

## Fixes Applied

1. **Editor.svelte error bar** — replaced hardcoded `bg-slate-900 text-white` with `bg-destructive/10 text-foreground`
2. **Editor.svelte AI help text** — replaced `text-white/60` with `text-muted-foreground`
3. **History.svelte** — fixed link color `text-blue-500` → `text-primary`, timestamp `text-primary-foreground/30` → `text-muted-foreground`, relative time `text-primary-foreground/50` → `text-muted-foreground`
4. **+error.svelte** — replaced `text-blue-500` with `text-primary`
5. **Actions.svelte** — replaced `text-gray-500` with `text-muted-foreground`
6. **+layout.svelte** — themed loading overlay: `bg-gray-600` → `bg-background/80 backdrop-blur-sm`, `text-indigo-100` → `text-foreground`, spinner `#f3f3f3`/`#6365f1` → `var(--border)`/`var(--primary)`, removed deprecated `-webkit-` keyframes
7. **Navbar.svelte** — fixed hardcoded dismiss hover `hover:text-[#261A56]` → `hover:text-foreground`
8. **Default theme light layoutConfig** — added packet/radar/xyChart config
9. **Glassmorphism light layoutConfig** — added packet/radar/xyChart config
10. **Tabs.svelte** — replaced hardcoded `bg-slate-300` separator with `bg-border`

## Not Changed (By Design)

- Button `accent` variant gradient — brand-specific, intentionally constant
- Blueprint 20px grid — intentional design differentiation
- DesktopEditor Monaco gutter colors — Monaco-specific, paired light/dark
- Glassmorphism no custom grid — glass aesthetic uses default grids
