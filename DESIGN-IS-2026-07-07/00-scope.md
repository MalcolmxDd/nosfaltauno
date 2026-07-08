# Design-is Audit — Scope Lock

**Date:** 2026-07-07
**Product:** Nos Falta Uno — Red social para fútbol amateur
**Audit type:** REDESIGN (full app, 16 routes)

## What is being audited

Complete Next.js 16 static-export app at `C:\Users\pablo\proyectoszerouno\nosfaltauno`:

### Routes (16)
| Route | Page |
|-------|------|
| `/` | Landing + Splash |
| `/login` | Login |
| `/register` | Register |
| `/onboarding` | Onboarding (3 pasos) |
| `/feed` | Feed de partidos (lista + mapa) |
| `/discover` | Swipe Tinder-style |
| `/create` | Crear partido |
| `/match/[id]` | Detalle de partido (Info/Chat/Lineup) |
| `/my-matches` | Mis partidos (próximos + historial) |
| `/profile` | Perfil propio |
| `/user/[id]` | Perfil de otro usuario |
| `/settings` | Configuración |
| `/messages` | Lista de mensajes |
| `/messages/[id]` | Chat individual |
| `/notifications` | Notificaciones |
| `/search` | Búsqueda |
| `/teams` | Lista de equipos |
| `/teams/[id]` | Detalle de equipo |
| `/venue/[id]` | Detalle de cancha |

### Components (20)
BottomNav, TopBar, MatchCard, FilterBar, DynamicMap, LineupBuilder, RatePlayersModal, ClientLayout, TopBarWrapper, MatchDetailsClient, UserProfileClient, TeamDetailsClient, Logo, LoadingSpinner, ConfirmDialog, SocialButton, SplashScreen, MapMock (dead code), ToastContext, ErrorBoundary

## Primary user
Jugadores de fútbol amateur (18–40 años) que buscan partidos en su ciudad/pueblo. Usuarios de smartphone, familiarizados con apps de citas y redes sociales.

## Primary task
Encontrar y unirse a partidos de fútbol amateur cerca de su ubicación en el menor número de pasos posible.

## Constraints
- **Stack:** Next.js 16, React 19, TypeScript 5, CSS Variables + CSS Modules
- **No Tailwind** — only CSS variables from globals.css and CSS modules
- **No backend** — 100% mock data (src/data/mocks.ts)
- **Static export** — `output: 'export'`, no server components, no API routes
- **Mobile-first** — container max-width 600px
- **Dark mode only** — no light theme
- **Colors:** Green (primary/soccer), Blue (secondary/action), Purple (accent/premium)
- **Framer Motion** for page transitions (template.tsx)

## Design references
- Modern, striking, interactive sports apps
- Tinder (swipe mechanic), Instagram (feed/social), OneFootball (sports data)

## Known issues pre-audit
1. Navigation: TopBar icons disappear on non-feed pages
2. Missing back buttons on search, messages list, and several pages
3. "Unirse al Partido" button has no onClick handler
4. "Finalizar y Calificar" appears always, even before match happens
5. Discover swipe has no animation, no tracking of seen matches
6. MatchCard not fully clickable (only "Ver detalles" button)
7. Map view functional but not obvious (hidden behind icon in TopBar)
8. No loading/error/empty states for most pages
9. All data is static mock — no API layer
10. No auth context — current user is hardcoded as MOCK_USERS[0]

## Out of scope
- Backend architecture decisions
- Database schema design
- Authentication logic (AWS Cognito, Auth0, etc.)
- Real-time WebSocket implementation
- Push notifications
- Geolocation (Capacitor plugin)
- Payment/wallet integration
- PWA/service worker
- i18n
- Testing
- CI/CD
