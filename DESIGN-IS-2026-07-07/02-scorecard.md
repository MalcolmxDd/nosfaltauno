# Scorecard — Dieter Rams' Ten Principles

## 1. Good design is innovative — Score: 1/3
**Evidence:** The app copies Tinder (swipe), Instagram (feed cards), and standard sports apps directly. The static export + Capacitor approach is technically sound but not user-visible innovation.
**Justification:** No new patterns introduced; every major interaction is a direct imitation of existing products. Score 1 because there's minor variation (combining swipe + sports, local-first mock architecture).

## 2. Good design makes a product useful — Score: 1/3
**Evidence:** Feed + filters work. Match detail shows all info. But the primary CTA ("Unirse al Partido") has no onClick handler. Multiple actions are mock/fake. User cannot complete the primary task end-to-end.
**Justification:** The navigation path exists but the final action is non-functional. Adjacent surface (mock actions, non-functional buttons) adds steps that lead nowhere. Scores 1 because the bones exist but the primary task cannot be completed.

## 3. Good design is aesthetic — Score: 1/3
**Evidence:** 9.2:1 inline style to class ratio. No consistent design system — every page uses ad-hoc inline styles. Dark mode is cohesive but the implementation is fragmented. The color palette (green/blue/purple) is appropriate for sports but poorly applied.
**Justification:** 3+ major inconsistencies (different card styles across pages, inconsistent button treatments, no shared typography system). Each page looks hand-crafted independently. Score 1.

## 4. Good design makes a product understandable — Score: 1/3
**Evidence:** Most controls have clear labels in Spanish. But "pie hábil" (onboarding), "radio de búsqueda" (settings) are jargon. "Unirse al Partido" button does nothing — user confusion. BottomNav labels are clear.
**Justification:** 2-3 controls are unclear AND the primary CTA misleads the user. Score 1.

## 5. Good design is unobtrusive — Score: 1/3
**Evidence:** 37 animated elements on splash (10 infinite-looping), 2 persistent red dots that never clear, TopBar has 4+ icons on every screen. The splash screen is visually overwhelming.
**Justification:** Chrome competes with content. Splash screen is decorative overload. Persistent badges create false urgency. Score 1.

## 6. Good design is honest — Score: 0/3
**Evidence:** Systematic label→behavior mismatches across the entire app. "Crear Equipo" = alert(). "Unirse al Partido" = nothing. "Cerrar Sesión" = / redirect. "Eliminar Cuenta" = mock. "Ingresar" = setTimeout. This is not a single oversight but a pervasive pattern.
**Justification:** Multiple deceptive flows where button labels claim one thing and the app does nothing (or something else). This is a load-bearing principle (#6) scoring 0.

## 7. Good design is long-lasting — Score: 2/3
**Evidence:** Dark mode is timeless. No skeuomorphism. No trendy gradients or shadows. The green/blue palette references soccer/sports appropriately. The inline-style architecture won't age well technically, but the visual direction is durable.
**Justification:** 1 dated marker: the heavy reliance on inline styles makes maintenance unsustainable, but the visual language itself stays current. Score 2.

## 8. Good design is thorough down to the last detail — Score: 1/3
**Evidence:** States present for basics (empty, loading, error) but primary-on-white contrast FAILS at 2.28:1. No skip link. No prefers-reduced-motion. Focus states only on login/register. No loading skeletons. No footer. Empty states are inconsistent.
**Justification:** 3+ states missing or roughly implemented. Accessibility oversights (contrast, skip link, motion). Score 1.

## 9. Good design is environmentally friendly — Score: 1/3
**Evidence:** ~195KB initial JS (between 100-500KB). But 37 idle animations (many infinite), no prefers-reduced-motion, dark mode only (user cannot choose light), 2 persistent badges that never resolve.
**Justification:** Bundle is acceptable but motion and energy waste is significant. Dark mode only excludes user preference. Score 1.

## 10. Good design is as little design as possible — Score: 0/3
**Evidence:** 37 splash animations, 2 persistent badges, 13 repeated patterns, 728 inline styles (9.2:1 ratio), 2 dead components, 1 dead CSS file. The app has significant decorative and duplicated elements that don't serve the primary task.
**Justification:** The page is dominated by decoration (splash animations) and duplicated affordances (multiple filter implementations, repeated patterns). Removing any of these would not break the primary task. Score 0.

---

## Total Score: 9/30

### Classification:
- **< 20:** Yes (9/30)
- **Any load-bearing principle at 0:** Yes (#6 Honest = 0)
- **Verdict:** REDESIGN
