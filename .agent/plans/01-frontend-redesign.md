# Plan: Rediseño Frontend — Nos Falta Uno

**Basado en:** Auditoría Dieter Rams (9/30 — REDESIGN)
**Scorecard:** DESIGN-IS-2026-07-07/02-scorecard.md
**Objetivo:** Transformar el frontend actual (9.2:1 inline:class ratio, 728 estilos inline, CTAs rotos) en una app con sistema de diseño propio, navegación consistente y componentes funcionales.

---

## Resumen de fases

| Fase | Título | Dependencias | Esfuerzo |
|------|--------|-------------|----------|
| 0 | Fundación: Sistema de diseño CSS | Ninguna | Medio |
| 1 | Limpieza: Dead code + CTAs rotos | Fase 0 | Bajo |
| 2 | Componentes base: Navegación + Layout | Fase 0 | Medio |
| 3 | Refactor: Páginas principales (Feed, Discover, Create) | Fase 0, 2 | Alto |
| 4 | Refactor: Perfiles + Equipos + Canchas | Fase 0, 2 | Alto |
| 5 | Refactor: Mensajes + Notificaciones + Search | Fase 0, 2 | Medio |
| 6 | Refactor: Match Detail (el más pesado) | Fase 0, 2, 3 | Alto |
| 7 | Pulido: Splash, animaciones, accesibilidad | Fase 0-6 | Medio |

---

## FASE 0 — Fundación: Sistema de diseño CSS

**Qué:** Crear los tokens, utilidades y componentes base del nuevo sistema de diseño en CSS.

### 0.1 Tokens de diseño en globals.css

Agregar a `src/app/globals.css`:

```css
:root {
  /* Existing tokens... */

  /* Spacing scale (4px grid) */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */

  /* Type scale */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 2rem;      /* 32px */

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.15);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.2);

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease;
}
```

### 0.2 Utility classes

Agregar a `globals.css` clases para:
- `.flex`, `.flex-col`, `.items-center`, `.justify-between`, `.gap-1` through `.gap-4`
- `.text-xs` through `.text-3xl` (mapped to type scale)
- `.p-1` through `.p-4` (padding)
- `.m-0`, `.mt-*`, `.mb-*`, `.ml-*`, `.mr-*`
- `.rounded-sm`, `.rounded-md`, `.rounded-lg`, `.rounded-full`
- `.font-normal`, `.font-medium`, `.font-semibold`, `.font-bold`
- `.text-muted` (color: var(--muted-foreground))
- `.text-primary`, `.text-secondary`, `.text-destructive`

### 0.3 prefers-reduced-motion

Agregar a `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 0.4 Componentes base compartidos

Migrar patrones repetidos a componentes reutilizables:

| Componente | Props | Reemplaza a |
|-----------|-------|-------------|
| `ui/Card.tsx` | `children, className, onClick?, href?` | Todas las cards inline |
| `ui/Button.tsx` | `variant, size, children, onClick, disabled, loading` | Todos los `<button>` inline |
| `ui/PageHeader.tsx` | `title, subtitle?, backTo?` | Headers de página repetidos |
| `ui/EmptyState.tsx` | `icon, title, message, action?` | 9 estados vacíos |
| `ui/StatsGrid.tsx` | `stats: {label, value}[]` | Stats en profile/user/teams |
| `ui/TabBar.tsx` | `tabs, activeTab, onChange` | Tabs en match-detail/profile/my-matches |
| `ui/ChipButton.tsx` | `label, selected, onClick` | Chips en filter-bar/onboarding/search |
| `ui/PlayerListItem.tsx` | `player, href?` | Listas de jugadores en match/team/search |
| `ui/LoadingSkeleton.tsx` | `variant, lines` | Estados de carga (nuevo) |

### 0.5 Arreglar contraste primary-on-white

Cambiar `--primary` de `hsl(142 76% 36%)` (#22c55e) a un tono más oscuro:
- `--primary: 142 70% 30%` (#1a9e4a) — ratio 3.2:1 contra blanco (AA large text)
- O mejor: no usar primary sobre white. Usar primary-foreground (#fff) sobre primary.

**Verificación:**
- [ ] `npm run build` no da errores
- [ ] Todos los componentes base se renderizan
- [ ] Las utility classes funcionan

---

## FASE 1 — Limpieza: Dead code + CTAs rotos

**Qué:** Eliminar código muerto y arreglar todos los botones que no funcionan.

### 1.1 Remover dead code
| Archivo | Acción |
|---------|--------|
| `src/components/MapMock.tsx` | Eliminar archivo |
| `src/components/ConfirmDialog.tsx` | Eliminar archivo (o migrar a `ui/ConfirmDialog.tsx` si se usa) |
| `src/app/page.module.css` | Eliminar archivo |
| `src/app/page.tsx` línea 8 | Remover `import '@/components/DynamicMap.css'` |
| `globals.css` `.btn-secondary` | Remover clase no usada |
| `globals.css` texto `text-muted-foreground` | Agregar clase `.text-muted` correcta |
| `LineupBuilder.tsx` | Remover prop `onSave` no usada |

### 1.2 Arreglar CTAs rotos

| Archivo | Línea | Arreglo |
|---------|-------|---------|
| `MatchDetailsClient.tsx:331` | "Unirse al Partido" | Agregar `onClick` con mock handler (setTimeout + toast + cambio de estado local) |
| `teams/page.tsx:100` | "Crear Equipo" | Reemplazar `alert()` con navegación a página crear equipo (o toast + redirect) |
| `settings/page.tsx:153-154` | "Eliminar Cuenta" | Reemplazar confirm+alert con ConfirmDialog + toast |
| `profile/page.tsx:195` | "Cerrar Sesión" | NO navegar a `/`, mostrar ConfirmDialog + "¿Estás seguro?" + redirect a `/` |

**Verificación:**
- [ ] `npm run dev` no tiene errores
- [ ] "Unirse al Partido" muestra toast de confirmación
- [ ] "Crear Equipo" no muestra browser alert()
- [ ] "Cerrar Sesión" muestra confirmación

---

## FASE 2 — Componentes base: Navegación + Layout

**Qué:** Refactorizar TopBar, BottomNav y sistema de layout completo.

### 2.1 Refactor TopBar

- Mover estilos inline a CSS module (`TopBar.module.css`)
- Agregar ruta `/search` a la lista de `shouldShowBack`
- Agregar back button faltantes: `/discover`, `/create`, `/profile`, `/settings`, `/my-matches`, `/teams`, `/search`, `/messages`
- Remover badges rojos hardcodeados hasta que haya data real
- Hacer que search icon y map toggle sean accesibles desde más rutas (no solo `/feed`)

### 2.2 Refactor BottomNav

- Mover estilos inline a CSS module
- Agregar lógica para que el tab activo se mantenga resaltado en detail pages

### 2.3 Sistema de layout consistente

- Mover `paddingTop: 5rem` y `paddingBottom: 6rem` a clases CSS
- Agregar clase `.page-content` con paddings variables según si hay TopBar/BottomNav

**Verificación:**
- [ ] Navegación funciona en todas las páginas
- [ ] Back button presente en todas las páginas de detalle
- [ ] Build exitoso

---

## FASE 3 — Refactor: Páginas principales

**Qué:** Refactorizar Feed, Discover, Create pages usando el nuevo sistema de diseño.

### 3.1 Feed page
- Convertir inline styles a clases CSS
- Usar `Card` component para MatchCard
- Usar `EmptyState` component
- MatchCard clickable completo (no solo botón)

### 3.2 Discover page
- Convertir inline styles a clases
- Usar `Card` + `ChipButton` + `EmptyState`

### 3.3 Create page
- Convertir inline styles a clases
- Usar `FormField` component
- Usar `ChipButton` para level selector

**Verificación:**
- [ ] Feed se ve idéntico visualmente
- [ ] Discover funciona sin cambios visuales
- [ ] Create valida y muestra errores igual que antes

---

## FASE 4 — Refactor: Perfiles + Equipos + Canchas

**Qué:** Refactorizar Profile, User profile, Teams, Team detail, Venue.

### 4.1 Profile page
- Usar `StatsGrid` para estadísticas
- Usar `TabBar` para tabs
- Usar `ReviewCard` para reseñas
- Usar `EmptyState` para equipos/amigos vacíos

### 4.2 UserProfileClient
- Usar `StatsGrid`, `ReviewCard`, `Button`

### 4.3 TeamDetailsClient
- Usar `StatsGrid`, `PlayerListItem`, `Button`

### 4.4 Venue page
- Usar `ReviewCard`, `StatsGrid`

**Verificación:**
- [ ] Todas las páginas se ven igual o mejor
- [ ] Stats funcionan con data mock

---

## FASE 5 — Refactor: Mensajes + Notificaciones + Search

**Qué:** Refactorizar páginas de comunicación.

### 5.1 Messages
- Convertir inline styles a clases
- Usar `EmptyState`, `Card`

### 5.2 Chat page
- Convertir inline styles a clases
- Hacer que botón de enviar realmente funcione (mock: agregar mensaje al DOM)

### 5.3 Notifications
- Convertir inline styles a clases
- Usar `EmptyState`

### 5.4 Search
- Convertir inline styles a clases
- Usar `ChipButton`, `PlayerListItem`

**Verificación:**
- [ ] Chat envía mensajes mock (agrega al DOM)
- [ ] Search filtra correctamente

---

## FASE 6 — Refactor: Match Detail (el más pesado)

**Qué:** Refactorizar MatchDetailsClient (362 líneas, ~70 estilos inline).

- Mover todos los estilos a `MatchDetailsClient.module.css`
- Separar tabs en componentes: `MatchInfo`, `MatchChat`, `MatchLineup`
- Usar `TabBar`, `Card`, `PlayerListItem`, `Button`, `StatsGrid`
- Arreglar "Finalizar y Calificar" para que solo aparezca si match ha pasado

**Verificación:**
- [ ] MatchDetail se ve idéntico
- [ ] Tabs funcionan
- [ ] RatePlayersModal se abre solo con join + match pasado

---

## FASE 7 — Pulido: Splash, animaciones, accesibilidad

### 7.1 Splash screen
- Reducir de 37 animaciones a 8-10
- Remover loops infinitos
- Respetar prefers-reduced-motion
- Mantener la esencia (gradientes, logo, field lines, tagline)

### 7.2 Framer Motion
- Remover `filter: blur()` de page transitions (es caro)
- Simplificar a opacity + translateY

### 7.3 Accesibilidad
- Agregar skip link (`<a href="#main-content">Saltar al contenido</a>`)
- Agregar `<footer>` con año y version

### 7.4 Empty states consistentes
- Usar `EmptyState` component en todos los lugares

**Verificación:**
- [ ] Splash se ve bien y performance mejora
- [ ] Transiciones de página son suaves
- [ ] Skip link funciona (Tab → Enter)
- [ ] prefers-reduced-motion respetado
