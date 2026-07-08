# Verdict

## REDESIGN

**Score:** 9/30 — The current design failed the audit with critical gaps in honesty (#6 scored 0) and restraint (#10 scored 0), plus a pervasive pattern of label→behavior mismatches across every core flow.

### Why redesign and not refine
A REFINE would assume good bones. The bones are not good: the primary CTA is non-functional, every core user action is a mock/fake, the inline-style architecture is 9.2:1 against classes (no design system), and the splash screen has 37 animations that violate restraint and accessibility. You cannot REFINE deception and noise.

### Preserve from current design
- **Color palette concept:** Green primary (soccer), blue secondary (action), dark background — the sporty DNA is right
- **Route structure:** The 16-routes layout covers the right feature set for an amateur football app
- **BottomNav 4-tab system:** Inicio / Descubrir / Crear / Perfil is the correct information architecture
- **Splash code structure:** The 2.5s timed dismiss and fade-out is a good UX pattern
- **Toast system:** Auto-dismiss, 4 variants, fixed position — solid UX micro-interaction

### Discard from current design
- **All inline styles:** 728 inline styles must become CSS variables + classes. 9.2:1 ratio is unmaintainable
- **Splash animation overload:** 37 elements animating (10 infinite) → reduce to 5-8 purposeful animations
- **Hardcoded badges:** 2 persistent red dots that never clear → real notification system or remove
- **Non-functional CTAs:** Every button must have a real onClick handler, even if mock
- **Mock/fake actions:** All remaining mock flows must either work end-to-end or be clearly labeled
- **page.module.css / MapMock / ConfirmDialog:** Dead code must be removed or integrated
- **Inline styles for layout:** All layout decisions move to CSS variables + utility classes

### 5 Highest-Leverage Moves from Audit

1. **Honesty (#6): Replace all non-functional/mock CTAs with real handlers.** Evidence: "Unirse al Partido" (MatchDetailsClient.tsx:331) has no onClick. "Crear Equipo" (teams/page.tsx:100) is alert(). "Cerrar Sesión" (profile/page.tsx:195) is just a link to /.

2. **Create a real design system (#3, #10): Eliminate 728 inline styles.** Create 20-30 CSS utility classes + component CSS modules. Implement consistent spacing (4px grid), type scale (12/14/16/18/24/32), and color tokens. Evidence: 9.2:1 inline:class ratio, only 8 spacing values and 6 type values.

3. **Fix navigation consistency (#4, #8):** Add back buttons to all non-auth pages. Make search/map/messages icons persist across relevant routes. Evidence: No back button on /search, /messages, /discover, /create, /profile, /settings, /my-matches, /teams. Search button only shows on /feed.

4. **Reduce friction (#5, #9): Cut splash animations from 37→8.** Remove infinite loops. Add prefers-reduced-motion. Remove or make functional the 2 persistent red dots. Evidence: 37 animated elements on splash (10 infinite), no prefers-reduced-motion, 2 badges that never clear.

5. **Make MatchCard clickable (#2, #8):** The entire card should navigate to match detail, not just the "Ver detalles" button. Add proper hover/active states. Evidence: MatchCard.tsx only has Link on the bottom button (line 228), rest of card is non-interactive divs.
