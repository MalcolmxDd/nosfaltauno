# Nos Falta Uno — Roadmap & Context

> Fuente de verdad única para mantener contexto entre sesiones de agentes.
> Cada agente DEBE leer este archivo al iniciar y actualizarlo al finalizar.

---

## 1. PROYECTO

**Idea:** Red social para encontrar/organizar pichangas (fútbol amateur). Un jugador siempre falta — "nos falta uno" — y la app conecta partidos que necesitan jugadores con jugadores que necesitan partido.

**Stack:**
| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router) + React 19 |
| Lenguaje | TypeScript 5 |
| Estilos | CSS variables + CSS modules |
| Animaciones | Framer Motion |
| Iconos | Lucide React |
| Mapas | Leaflet + React Leaflet |
| Mobile | Capacitor 7 (Android) |
| Build | Static export (`output: 'export'`) |

**Scripts:**
- `npm run dev` — dev server
- `npm run build` — static export a `/out/`
- `npm run cap:sync` — build + sync con Android
- `npm run lint` — ESLint

---

## 2. CONVENCIONES

- **No Tailwind** — usar CSS variables de `globals.css` y CSS modules (`.module.css`)
- **Sin `next/image`** — usar `<img>` directo (static export)
- **Sin comentarios en código** (salvo `// eslint-disable-next-line` cuando sea necesario)
- **Mock data** en `src/data/mocks.ts` — todo es frontend-only, sin backend
- **Rutas** en `src/app/` con App Router
- **Componentes** en `src/components/`, archivo único por componente
- **Contextos** en `src/contexts/`
- **No hay API routes** — `src/app/api/` no existe
- **Mantener compatibilidad con static export** — nada de `headers()`, `cookies()`, server actions

---

## 3. ARQUITECTURA ACTUAL

```
src/
├── app/               # 16 rutas (feed, discover, create, login, register,
│                      #   onboarding, profile, settings, search, my-matches,
│                      #   notifications, messages, messages/[id], teams,
│                      #   teams/[id], match/[id], user/[id], venue/[id])
├── components/        # 20 componentes + 9 UI base (Card, Button, PageHeader,
│                      #   EmptyState, StatsGrid, TabBar, ChipButton,
│                      #   PlayerListItem, LoadingSkeleton) + TopBar/BottomNav
│                      #   CSS modules + refactored MatchCard = ~90% inline
│                      #   styles eliminados
├── contexts/          # ToastContext (sistema de toasts)
└── data/              # mocks.ts (5 usuarios, 2 equipos, 4 partidos activos,
                       #   2 partidos pasados, 3 reseñas)
```

**Estado global:** ToastContext. Sin auth context, sin Zustand/Redux. Todos los componentes UI base tienen "use client" o son server-safe.

**Auth:** Mock. Login/register son timeouts que redirigen. No hay sesión, JWT, ni persistencia.

---

## 4. INVENTARIO DE FUNCIONALIDADES

### 🔵 COMPLETO (anda en producción mock)

| Funcionalidad | Archivos clave | Notas |
|--------------|----------------|-------|
| Landing + Splash animado | `page.tsx`, `SplashScreen.tsx` | Animación 2.5s con partículas |
| Login/Register (UI) | `login/page.tsx`, `register/page.tsx` | Formularios con validación, botones sociales |
| Onboarding (3 pasos) | `onboarding/page.tsx` | Posición, nivel, frecuencia, zonas |
| Feed de partidos | `feed/page.tsx` | Cards + filtros (nivel, precio, fecha) |
| Mapa Leaflet | `DynamicMap.tsx` | OpenStreetMap + markers por partido |
| Discover (swipe) | `discover/page.tsx` | Tinder-style, like redirige a detalle |
| Crear partido | `create/page.tsx` | Validación completa (fecha futura, min 4 max 22) |
| Perfil propio | `profile/page.tsx` | Stats, badges, tabs, reseñas |
| Perfil de otro usuario | `user/[id]/page.tsx` | Follow button, stats, reseñas |
| Detalle de partido | `match/[id]/page.tsx` | 3 tabs: Info, Chat (mock), Lineup |
| Formación (lineup) | `LineupBuilder.tsx` | Visual 5 vs 5 (sin drag-and-drop) |
| Detalle de cancha | `venue/[id]/page.tsx` | Hero image, amenities, reseñas |
| Equipos (lista + detalle) | `teams/page.tsx`, `teams/[id]/page.tsx` | Join/leave toggle |
| Calificar jugadores | `RatePlayersModal.tsx` | MVP + skill/fair play (1-5 estrellas) |
| Barra de filtros | `FilterBar.tsx` | Nivel, precio, fecha combinables |
| Settings | `settings/page.tsx` | Toggles, slider radio, privacidad |
| Search | `search/page.tsx` | Búsqueda texto en matches/players/teams |
| Mis partidos | `my-matches/page.tsx` | Próximos + historial |
| Mensajes (UI) | `messages/page.tsx`, `messages/[id]/page.tsx` | Lista + chat individual (mock) |
| Notificaciones (UI) | `notifications/page.tsx` | Lista estática (3 items hardcodeados) |
| Navegación | `BottomNav.tsx`, `TopBar.tsx` | 4 tabs + top bar con acciones |
| Sistema de toasts | `ToastContext.tsx` | success/error/info/warning con auto-dismiss |
| Error boundary | `ErrorBoundary.tsx` | Con retry + volver al inicio |
| Confirm dialog | `ConfirmDialog.tsx` | Variante danger/warning/info |
| Loading spinner | `LoadingSpinner.tsx` | Full-screen opcional |
| Build APK | `.agent/workflows/build-apk.md` | Workflow documentado |
| Transiciones página | `template.tsx` | Framer Motion entre rutas |

### 🟡 PARCIAL / MOCK (anda la UI pero no la lógica real)

| Funcionalidad | Problema | Archivo |
|--------------|----------|---------|
| Chat | Mensajes hardcodeados, input no envía nada | `messages/[id]/page.tsx`, `MatchDetailsClient.tsx` |
| Notificaciones | 3 items estáticos, badge siempre en 1 | `notifications/page.tsx`, `TopBar.tsx` |
| Seguir usuario | Solo cambia estado local, no persiste | `UserProfileClient.tsx` |
| Calificaciones | Modal funciona pero no guarda en ningún lado | `RatePlayersModal.tsx` |
| Crear equipo | Botón muestra toast (mock), no navega a formulario ni persiste | `teams/page.tsx` |
| Unirse a equipo | Botón "Unirse al Equipo" existe en detalle pero no persiste | `TeamDetailsClient.tsx` |

### 🟠 UX / NAVEGACIÓN (no existe o está incompleto, no depende de backend)

| Funcionalidad | Problema | Impacto |
|--------------|----------|---------|
| Tab de Equipos en BottomNav | No hay forma de descubrir equipos desde la navegación principal. Solo se llega por search o perfil. | El 80% de usuarios nunca va a encontrar la sección equipos |
| Feed de jugadores | No hay un "Descubrir jugadores" — ni siquiera una lista. El swipe de Discover solo muestra partidos. | No se puede encontrar gente nueva para invitar |
| Feed de equipos | No hay lista de equipos por zona/nivel. Teams page solo muestra 2 equipos hardcodeados. | El usuario no puede buscar equipo para unirse |
| Crear equipo (flujo completo) | No existe formulario de creación. El botón es mock. | El feature de equipos está incompleto |
| Editar perfil | No hay página de editar perfil (ni siquiera mock). | El usuario no puede cambiar nombre, foto, bio, preferencias |
| Perfil ajeno como destino muerto | Al llegar a un perfil de otro usuario, no hay sugerencias ("gente similar", "jugadores en tu zona", "compañeros frecuentes"). | No hay descubrimiento social |
| Iniciar conversación desde search | Search muestra usuarios pero no tiene botón "Mensaje" directo. Hay que abrir el perfil y luego click "Mensaje". | Fricción innecesaria |
| Confirmación al salir de equipo | No hay confirm dialog antes de abandonar un equipo. | Riesgo de abandono accidental |
| Distinción dueño/miembro equipo | No hay badge o indicación de quién creó el equipo vs miembros. | El dueño no tiene controles especiales visibles |
| Historial de partidos del equipo | TeamDetailsClient muestra partidos recientes pero no hay estadísticas (win/loss). | Sin contexto de rendimiento |
| Onboarding post-registro | Después de registrarse, el onboarding pide posición/nivel pero no guía a crear/uniase a un equipo. | El usuario no tiene un "siguiente paso" claro |
| Límite de miembros en equipo | No hay validación de cupo máximo al unirse. | Escalabilidad |
| Página "Mis Equipos" | No existe. El perfil propio no lista los equipos del usuario. | El usuario no sabe a qué equipos pertenece |

### 🟡 PARCIAL / MOCK (anda la UI pero no la lógica real)

_Además de los ya listados arriba:_

| Funcionalidad | Problema | Archivo |
|--------------|----------|---------|
| Forgot password | UI funcional, envía mock sin backend real | `forgot-password/page.tsx` |

### 🔴 FALTANTE (no existe)

| Funcionalidad | Prioridad | Dependencias |
|--------------|-----------|--------------|
| Autenticación real (sesión, JWT, persistencia) | 🔴 Crítica | Backend |
| API backend (endpoints REST/GraphQL) | 🔴 Crítica | — |
| Base de datos (persistencia real) | 🔴 Crítica | Backend |
| Estado global (auth context, datos compartidos) | 🔴 Crítica | — |
| Editar perfil (nombre, foto, bio) | 🟡 Alta | Auth + backend |
| Subir imágenes (avatar, portada cancha) | 🟡 Alta | Backend + storage |
| Editar/cancelar partido | 🟡 Alta | Backend |
| Geolocalización real | 🟡 Alta | Backend + Capacitor plugin |
| Notificaciones push | 🟡 Alta | Backend + Capacitor |
| Chat en tiempo real (WebSocket) | 🟡 Alta | Backend + WebSocket |
| Recordatorios de partido | 🟡 Alta | Backend + notificaciones |
| Check-in con geolocalización | 🟡 Alta | Backend |
| Invitar jugadores | 🟡 Alta | Backend |
| Equipos: crear, roles, estadísticas | 🟡 Media | Backend |
| Términos y privacidad (páginas) | 🟡 Media | Contenido |
| Sistema de reportes | 🟢 Baja | Backend + moderación |
| Pagos / wallet | 🟢 Baja | Stripe/PayPal + backend |
| Gamificación (logros dinámicos) | 🟢 Baja | Backend |
| Leaderboards | 🟢 Baja | Backend |
| Feed social (actividad, likes, stories) | 🟢 Baja | Backend |
| i18n (inglés, portugués) | 🟢 Baja | next-intl o similar |
| PWA (service worker, offline) | 🟢 Baja | next-pwa o similar |
| Testing (unit, integration, E2E) | 🟢 Baja | Jest + Playwright |
| CI/CD | 🟢 Baja | GitHub Actions |
| A11y completo | 🟢 Baja | — |

---

## 5. ROADMAP POR FASES

### FASE 0 — Fundación técnica (ahora)
- [x] Análisis completo del código
- [x] Crear sistema de roadmap y contexto (`ROADMAP.md`, sesiones)
- [ ] Decidir stack de backend (Supabase / Firebase / backend custom)
- [ ] Diseñar schema de base de datos
- [ ] Definir API endpoints

### FASE 1 — Backend + Auth
- [ ] Implementar backend (API + DB)
- [ ] Sistema de autenticación real (login, register, sesión)
- [ ] AuthContext + rutas protegidas
- [ ] Pasar mock data a llamadas API reales

### FASE 2 — Datos reales
- [ ] CRUD de partidos (crear, editar, cancelar)
- [ ] CRUD de equipos (crear, invitar, roles)
- [ ] CRUD de perfiles (editar, subir foto)
- [ ] Geolocalización real con Capacitor

### FASE 3 — Tiempo real
- [ ] Chat con WebSockets
- [ ] Notificaciones push
- [ ] Sistema de notificaciones en la app

### FASE 4 — Social + Engagement
- [ ] Gamificación (logros, badges dinámicos)
- [ ] Seguir/dejar de seguir (con feed)
- [ ] Sistema de invitaciones
- [ ] Reportes y moderación

### FASE 5 — Calidad + Release
- [ ] Testing
- [ ] CI/CD
- [ ] PWA completo
- [ ] Optimización de performance
- [ ] i18n

---

## 6. REGISTRO DE SESIONES

Cada vez que un agente trabaja, DEBE agregar una entrada aquí.

| # | Fecha | Agente | Objetivo | Logros | Pendiente | Decisiones |
|---|-------|--------|----------|--------|-----------|------------|
| 1 | 2026-07-07 | — | Análisis inicial + creación de roadmap | Creado ROADMAP.md con inventario completo, fases, contexto | Falta decidir backend stack | — |
| 2 | 2026-07-07 | design-is + explore | Auditoría de diseño Dieter Rams + mapeo de flujos | Audit completo 9/30 (REDESIGN). Mapeados todos los bugs de navegación, CTAs no funcionales, 728 estilos inline, 37 animaciones splash. Identificadas 5 movidas principales. | Ejecutar make-plan del rediseño frontend | Estrategia: frontend completo primero, backend después. Diseño moderno/deportivo. Audit completo de 16 rutas. |
| 3 | 2026-07-07 | Agente manual | Rediseño frontend (detalle en plan) | Ver plan 01-frontend-redesign.md | — | — |
| 4 | 2026-07-08 | opencode | FASE A+B+C: Fix broken + CSS modules + Design polish | **A:** /teams/create, /profile/edit creados. Settings link arreglado. My-matches router.push. Notifications Lucide icons. Button CSS (secondary, sm, lg). **B:** Settings, StatsGrid, TabBar, ChipButton, PlayerListItem, EmptyState, PageHeader CSS modules. Profile actions global class. **C:** Landing CSS module. Splash bounce+skip btn. TopBar badge fijo+hovers. BottomNav +Teams tab. Discover+Create+ErrorBoundary CSS modules. Card/MatchCard hover states. | FilterBar inline styles, Toast CSS injection | Frontend completo antes de backend |
| 5 | 2026-07-08 | opencode | Premium polish final: ForgotPassword, MyMatches, Search, ChatClient, Settings | **ForgotPassword:** Nueva pagina con glassmorphism card, glows, validacion, estado success mock.\n**MyMatches:** CSS module premium - cards con glow hover, barra progreso dinamica, badges.\n**Search:** CSS module premium - input con icono, filtros, cards con glow.\n**ChatClient:** CSS module completo - burbujas con gradiente, input pill, back button.\n**Settings:** Titulo gradiente, cards con glow hover.\n**Build:** 0 errores, 40 rutas generadas. | - | ROADMAP debe estar en .agent/ROADMAP.md |

---

## 7. TEMA ACTUAL / PROXIMO PASO

**Ultima sesion:** Sesion #5 - Premium polish final. ForgotPassword creada, MyMatches/Search/ChatClient migrados a CSS modules premium. Settings pulido. Build limpio 40/40 rutas.
**Proximo paso:** Backend - decidir stack, disenar schema DB, implementar API + auth real. O seguir puliendo frontend: FilterBar inline styles, Toast CSS injection, animaciones Framer Motion.
**Bloqueantes:** Ninguno.

---## 8. PLAN DE REDISEÑO FRONTEND (8 fases)

Documento completo en `.agent/plans/01-frontend-redesign.md`

| Fase | Descripción | Estado |
|------|-------------|--------|
| 0 | Sistema de diseño CSS (tokens, utilities, componentes base) | ✅ Completo |
| 1 | Limpieza: dead code + CTAs rotos | ✅ Completo |
| 2 | Refactor navegación (TopBar, BottomNav, layout) | ✅ Completo |
| 3 | Refactor páginas principales (Feed, Discover, Create) | ✅ Completo |
| 4 | Refactor perfiles + equipos + canchas | ✅ Completo |
| 5 | Refactor mensajes + notificaciones + search | ✅ Completo |
| 6 | Refactor Match Detail (el más pesado) | ✅ Completo |
| 7 | Pulido: splash, animaciones, accesibilidad | ✅ Completo |

---

## DOCUMENTOS RELACIONADOS

- `ANALISIS_FUNCIONALIDADES_FALTANTES.md` — Análisis detallado de funcionalidades faltantes (previo a este roadmap)
- `.agent/workflows/build-apk.md` — Workflow para generar APK Android
- `.agent/sessions/` — Logs detallados por sesión (si se requiere más detalle que en la tabla)
