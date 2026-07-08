# Handoff: /make-plan prompt

Copy and paste the following block into a new conversation with `/make-plan`:

````
/make-plan Redesign Nos Falta Uno (frontend app). Current design failed audit at 9/30 with critical gaps in honesty (#6 scored 0) and restraint (#10 scored 0).

Verdict paragraph:
> The current design failed the audit with critical gaps in honesty (#6 scored 0) and restraint (#10 scored 0), plus a pervasive pattern of label→behavior mismatches across every core flow. The primary CTA is non-functional, every core user action is a mock/fake, the inline-style architecture is 9.2:1 against classes (no design system), and the splash screen has 37 animations that violate restraint and accessibility.

Why redesign and not refine:
A REFINE would assume good bones. The bones are not good: the primary CTA is non-functional, every core user action is a mock/fake, the inline-style architecture is 9.2:1 against classes (no design system), and the splash screen has 37 animations. You cannot REFINE deception and noise.

Preserve from current design (MUST be non-empty):
- Color palette concept: Green primary (soccer, hsl(142 76% 36%)), blue secondary (hsl(217 91% 60%)), dark background (hsl(222 47% 11%)) — the sporty DNA is right
- Route structure: 16 routes covering landing, login, register, onboarding, feed, discover, create, match detail, my-matches, profile, user profile, settings, messages, chat, notifications, search, teams, team detail, venue detail
- BottomNav 4-tab system: Inicio (/feed) / Descubrir (/discover) / Crear (/create) / Perfil (/profile)
- Splash 2.5s timed dismiss with fade-out pattern
- Toast system: auto-dismiss with 4 variants (success/error/info/warning) in fixed top-right position

Discard (MUST be non-empty — name the structural patterns causing the failures):
- 728 inline styles (9.2:1 ratio against classes) — must become CSS variable tokens + component CSS modules. This caused failure on principle #10 (restraint) and #3 (aesthetic consistency).
- 37-element splash animation overload (10 infinite-looping) — must reduce to 5-8 purposeful animations. No prefers-reduced-motion. Caused failure on #5 (unobtrusive), #8 (thorough), and #9 (environment).
- Non-functional CTAs — "Unirse al Partido" (no onClick at MatchDetailsClient.tsx:331), "Crear Equipo" (alert() at teams/page.tsx:100), "Cerrar Sesión" (just links to / at profile/page.tsx:195). Caused failure on #6 (honest).
- Hardcoded red dot badges on messages and notifications icons (TopBar.tsx:131-139, 155-163) that never clear. Causes false urgency. Caused failure on #5 (unobtrusive).
- Systematic mock/fake actions across login, register, create match, delete account, create team. Users cannot distinguish mock from real. Caused failure on #6 (honest).

Top 5 moves from the audit (verbatim):
1. Honesty (#6): Replace all non-functional/mock CTAs with real handlers. Evidence: "Unirse al Partido" (MatchDetailsClient.tsx:331) has no onClick. "Crear Equipo" (teams/page.tsx:100) is alert(). "Cerrar Sesión" (profile/page.tsx:195) is just a link to /.
2. Create a real design system (#3, #10): Eliminate 728 inline styles. Create 20-30 CSS utility classes + component CSS modules. Implement consistent spacing (4px grid), type scale (12/14/16/18/24/32), and color tokens. Evidence: 9.2:1 inline:class ratio, only 8 spacing values and 6 type values.
3. Fix navigation consistency (#4, #8): Add back buttons to all non-auth pages. Make search/map/messages icons persist across relevant routes. Evidence: No back button on /search, /messages, /discover, /create, /profile, /settings, /my-matches, /teams. Search button only shows on /feed.
4. Reduce friction (#5, #9): Cut splash animations from 37→8. Remove infinite loops. Add prefers-reduced-motion. Remove or make functional the 2 persistent red dots. Evidence: 37 animated elements on splash (10 infinite), no prefers-reduced-motion, 2 badges that never clear.
5. Make MatchCard clickable (#2, #8): The entire card should navigate to match detail, not just the "Ver detalles" button. Add proper hover/active states. Evidence: MatchCard.tsx only has Link on the bottom button (line 228), rest of card is non-interactive divs.

Redesign principles in priority order:
1. Honest (#6) — Every button does what it says. No mock actions. Non-functional features are either removed or clearly labeled "Próximamente".
2. Useful (#2) — Users can find a match, see details, and join it in 3 taps. The join action works end-to-end (even if mock).
3. As little design as possible (#10) — Every element earns its place. Splash under 10 animations. No persistent badges without real data. One design system, not 16 pages of inline styles.

Deliverables for the plan:
- New information architecture (not derived from old; confirm the 16-route structure is correct or propose changes)
- New CSS design system: 20-30 utility classes, 4px spacing grid, type scale of 6-7 sizes, 15-20 color tokens
- Component refactor strategy: which components get CSS modules, which get refactored inline styles
- States checklist for every page: empty, loading, error, success, focus, disabled
- Navigation audit: every page must have a back button and consistent TopBar icons
- Honesty audit: every button/label → actual behavior mapped and fixed
- Migration path: phased approach from current inline styles to CSS module system
- Cutover criteria: when all 16 routes have consistent navigation, all CTAs are functional, and the design system covers 90%+ of styles

Anti-patterns to guard against:
- Porting old structure (728 inline styles) under new styling — must systematically refactor, not re-theme
- Keeping both designs behind a flag indefinitely
- Redesigning to follow a trend rather than the principles above
- Adding new features before the existing 16 routes are fixed
- Creating new components with inline styles
````
