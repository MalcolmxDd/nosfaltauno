# Evidence Report

Consolidated from 5 subagents.

## Structural Evidence
- **109** source-level interactive elements
- **Max nesting depth:** 13 (RootLayout → FeedContent → FilterBar)
- **13 repeated patterns** (Ver detalles, tabs, chip buttons, stats grids, etc.)
- **Dead code:** ConfirmDialog.tsx (unused), MapMock.tsx (unused), page.module.css (unused)
- **Unused imports:** 3 (React in ErrorBoundary, useState in LineupBuilder, DynamicMap.css in page.tsx)
- **Unused CSS:** `.btn-secondary` in globals.css; `text-muted-foreground` used but not defined
- **Inline : class ratio: 9.2 : 1** (728 inline styles vs 79 className usages)

## Visual Evidence (Inferred)
- **Spacing scale:** Only 8 distinct values: 0, 8, 16, 24, 32, 48, 60, 120 (mostly from dead CSS)
- **Type scale:** Only 6 values: 14px, 16px, 18px, 32px, 40px
- **32 distinct colors** referenced
- **Contrast:** primary (#22c55e) on white (#ffffff) FAILS at **2.28:1**
- **States:** Empty ✅ / Loading ✅ / Error ✅ / Success ✅ / Focus ✅ (login/register only) / Disabled ✅ (sporadic)

## Copy & Honesty Evidence
- **Multiples label→behavior mismatches:**
  - "Crear Equipo" → shows browser `alert()` (teams/page.tsx:100)
  - "Unirse al Partido" → no onClick handler (MatchDetailsClient.tsx:331)
  - "Cerrar Sesión" → navigates to / (profile/page.tsx:195)
  - "Eliminar Cuenta" → mock confirm + alert (settings/page.tsx:153-154)
  - "Publicar Partido" → mock timeout (create/page.tsx:93-100)
  - "Ingresar" / "Crear Cuenta" → mock timeouts
  - Swipe right (Heart icon) → navigates to match detail instead of recording interest
- **Inflations:** "comunidad de fútbol más grande" (register/page.tsx:97), "el mejor complejo" (venue mock data)
- **Non-functional CTA:** "Unirse al Partido" button with no behavior

## Weight & Friction Evidence
- **Initial JS:** ~195KB min+gzip (estimated)
- **External requests:** Up to 30+ on feed with map view (Leaflet tiles + images)
- **Idle animation count:** 37 CSS-animated elements on splash (10 infinite-loop)
- **Persistent badges:** 2 red dots (messages + notifications) always shown on every page
- **prefers-reduced-motion:** MISSING
- **Dark mode:** DARK ONLY (no light theme)

## Accessibility Evidence
- **Contrast PASS:** foreground on background (17.09:1), muted-foreground on background (6.97:1)
- **Contrast FAIL:** primary on white (2.28:1)
- **Keyboard reachability:** 100% of primary actions use native `<button>` or `<a>` elements ✅
- **ARIA landmarks:** 20 total (1 `<nav>`, multiple `<header>` + `<main>`)
- **Skip link:** MISSING
- **Image alt text:** 19/19 images have non-empty alt text ✅
- **No `<footer>` elements** anywhere in the app
