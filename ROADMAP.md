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
| 5 | 2026-07-08 | opencode | Premium polish final: ForgotPassword, MyMatches, Search, ChatClient, Settings | **ForgotPassword:** Nueva pagina con glassmorphism card, glows, validacion, estado success mock. **MyMatches:** CSS module premium - cards con glow hover, barra progreso dinamica, badges. **Search:** CSS module premium - input con icono, filtros, cards con glow. **ChatClient:** CSS module completo - burbujas con gradiente, input pill, back button. **Settings:** Titulo gradiente, cards con glow hover. Build: 0 errores, 40 rutas. | - | ROADMAP movido a raiz |
| 6 | 2026-07-08 | opencode | BottomNav redesign + Feed/Discover swap + Profile banner fix | **BottomNav:** Inicio | Descubrir | + (FAB central) | Equipos | Mis Partidos. Perfil en TopBar. **Feed:** solo joined. **Discover:** todos. **Profile banner:** overflow fix. **Favicon+Logo:** escudo neon NF1+10. **Landing+Splash:** particulas, anillos dobles, shimmer CTAs, grid. | - | - |
| 7 | 2026-07-08 | opencode | Auth redesign: Login/Register/ForgotPassword premium | **Login/Register/ForgotPassword:** orbes animados, 4 particulas flotando, grid overlay, card spring entry, inputs con 4px ring + glow, labels uppercase bold, shimmer infinito, spinner submit, shakeIn errors, staggered reveal. **ForgotPassword:** agregado a isAuthPage (sin TopBar/BottomNav). | - | - |
| 8 | 2026-07-08 | opencode | Premium Design System completo (29 CSS modules) | **globals.css:** nuevo sistema de tokens premium — paleta oscura (#07111D, #101827, #121C2E, #16233A), radios (btn 18px, card 22px, input 16px, sheet 32px), sombras suaves (10px/40px blur), tipografia hero/title/subtitle/heading/body/caption, spacing scale 4-64px, backward compat total. **29 CSS modules** actualizados con radios premium, sombras soft, bordes sutiles, padding generoso, gradientes premium. | StatCards: radio muy grande (22px) + gradient text ocultaba valores en Profile/UserProfile/MatchDetail/StatsGrid | Fix: --radius-input (16px), color solido, numeros 1.75rem |

---

## 7. TEMA ACTUAL / PROXIMO PASO

**Ultima sesion:** Sesion #8 - Premium Design System aplicado a toda la app. Nuevos tokens en globals.css + 29 CSS modules migrados. Fix de stat cards (radio excesivo + texto invisible por gradient).
**Proximo paso:** Backend - decidir stack, disenar schema DB, implementar API + auth real.
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

## 9. MONETIZACIÓN (ideas para futuro)

> Estrategia freemium + marketplace. No implementar hasta tener base de usuarios activa.

### Suscripción Premium (jugadores)

| Plan | Precio (CLP/mes) | Beneficios |
|------|------------------|------------|
| Gratis | $0 | Funcionalidades básicas |
| Premium | $2.990 - $4.990 | Partidos ilimitados, destacarse, estadísticas avanzadas, badge premium, sin ads, soporte prioritario |

**Proyección:** 2.000 usuarios activos → 5% premium = 100 × $4.000 = $400K/mes.  
20.000 usuarios → 1.000 premium = $4M/mes.

### Comisión por reservas de canchas ⭐⭐⭐⭐⭐

Mayor oportunidad de ingresos. Flujo:

```
Crear partido → Reservar cancha → Pagar desde la app
```

- Cancha cobra $40.000 → comisión 10% = $4.000
- 30 reservas/día → $120K diarios ≈ $3,6M/mes
- No se le cobra al usuario, solo a la cancha

### Publicidad local segmentada ⭐⭐⭐⭐⭐

Audiencia hipersegmentada → valor premium para anunciantes:
- Tiendas deportivas, kinesiólogos, traumatólogos, nutricionistas, suplementos, barberías, restaurantes, gimnasios

### Equipos Premium

Mini CRM para equipos:
- Estadísticas, calendario, asistencia, lista de jugadores, votaciones, gastos/caja común, camisetas, historial

### Torneos

Para organizadores:
- Fixture automático, tabla de posiciones, goleadores, MVP, exportar resultados
- Muchos hoy lo hacen en Excel

### Marketplace deportivo

Comisión por ventas:
- Nike, Adidas, Puma, balones, canilleras, zapatos, camisetas
- Personalización, impresión, copas, medallas

### Suscripción para canchas

Pago por destacar:
- Mejores fotos, reservas online, estadísticas, calendario, reseñas

### IA Premium

Planes con features de IA:
- Armar equipos equilibrados, recomendar jugadores, predecir asistencia, generar fixture, detectar posiciones faltantes, resumir partido

### Cobro por organizar partidos

Comisión por jugador al pagar cuota:
- Cancha $45.000 → 11 jugadores pagan $4.090 c/u
- App cobra $100-$300 por jugador

### Seguros deportivos

Integración con aseguradoras → comisión por venta de seguro por partido

### Perfil verificado

Jugador/organizador/cancha verificado por pago pequeño

### Estadísticas tipo EA Sports Premium

Métrica avanzada: partidos, goles, asistencias, % asistencia, MVP, calificación media, mapa de calor, posición favorita

### Patrocinios

Marcas patrocinan: Jugador de la semana, Partido de la semana, Cancha destacada, Equipo destacado

### ❌ Lo que NO hacer

- Cobrar por registrarse, unirse a partido, mandar mensajes o funciones básicas → mata el crecimiento

### Modelo recomendado

| Fuente | Prioridad | Escalabilidad |
|--------|-----------|---------------|
| Reservas de canchas (comisión) | ⭐⭐⭐⭐⭐ | Muy alta |
| Suscripción Premium jugadores | ⭐⭐⭐⭐ | Alta |
| Equipos Premium | ⭐⭐⭐⭐ | Alta |
| Publicidad local segmentada | ⭐⭐⭐⭐ | Muy alta |
| Marketplace deportivo | ⭐⭐⭐ | Alta |
| Organización de torneos | ⭐⭐⭐ | Media |
| IA Premium | ⭐⭐⭐ | Alta |

### Nota sobre canchas como tercer actor

Agregar un **módulo para canchas** (hoy el roadmap está centrado en jugadores y equipos) abre:
- Panel para administradores
- Gestión de horarios
- Reservas y confirmaciones
- Cobros online
- Estadísticas de ocupación
- Promociones y descuentos
- Visibilidad destacada

Esto transforma la app de red social a ecosistema donde jugadores, equipos, organizadores y canchas interactúan.

---

## DOCUMENTOS RELACIONADOS

- `ANALISIS_FUNCIONALIDADES_FALTANTES.md` — Análisis detallado de funcionalidades faltantes (previo a este roadmap)
- `.agent/workflows/build-apk.md` — Workflow para generar APK Android
- `.agent/sessions/` — Logs detallados por sesión (si se requiere más detalle que en la tabla)
