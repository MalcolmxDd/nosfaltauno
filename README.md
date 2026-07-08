# ⚽ Nos Falta Uno

<div align="center">

![Logo](https://img.shields.io/badge/Nos%20Falta%20Uno-Football%20App-00e676?style=for-the-badge&logo=soccer&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-7.4-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)

**La red social para encontrar y organizar pichangas de fútbol de barrio**

</div>

---

## 📱 Sobre el Proyecto

**Nos Falta Uno** (NF1) es una aplicación móvil/web diseñada para conectar jugadores de fútbol amateur en Latinoamérica. Escudo oscuro con acentos neón verde y naranja, estilo equipo profesional.

### 🎯 Visión
Plataforma líder para organización de fútbol amateur, conectando jugadores y promoviendo el deporte de barrio.

---

## ✨ Características

### 🔐 Autenticación
- Login/registro con email (UI mock lista para backend)
- Login social Google/Facebook/Apple
- Onboarding personalizado (posición, nivel, horarios, zonas)

### 🏆 Partidos
- Feed con filtros por nivel/precio/fecha
- Vista mapa interactivo (Leaflet)
- Crear partidos con **persistencia en localStorage**
- Detalle con info, chat y alineación táctica
- Descubrimiento estilo Tinder (swipe)
- Búsqueda global

### 👤 Perfiles
- Perfil propio con banner de cancha, stats premium, logros, reseñas
- Perfil de otros usuarios con seguir/mensaje
- Edición de perfil con avatar, posición, pierna hábil, zonas

### 💬 Mensajería
- Lista de conversaciones con indicador online
- Chat en burbujas (mock, listo para WebSockets)

### 👥 Equipos
- Crear equipos con nombre, nivel, días de juego, cupo
- Detalle con miembros y partidos recientes

### 🏟️ Canchas (Venue)
- Página de detalle con hero image, amenities, rating, reseñas, mapa

### 🎨 Diseño
- **100% CSS Modules** — cero Tailwind, cero inline styles en producción
- Modo oscuro, glassmorphism, gradientes premium
- Logo escudo NF1 con balón, estrella, laureles, neón
- Splash screen animado con bounce
- MatchCard estilo trading card con imagen de campo
- BottomNav con dot indicator, TopBar con blur

### 💾 Datos
- Mock data en `src/data/mocks.ts`
- Persistencia local en `src/data/store.ts` (localStorage)
- Sin backend — todo corre 100% cliente

---

## 🛠️ Tecnologías

### Frontend
| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 16.0.3 | Framework, App Router, static export |
| React | 19.2 | UI |
| TypeScript | 5.x | Tipado |
| CSS Modules | — | Todos los estilos |
| Framer Motion | — | Animaciones |
| Lucide React | — | Iconografía |
| Leaflet / React Leaflet | — | Mapas |

### Móvil (Capacitor)
- **Capacitor 7.4** para Android
- Plugins: geolocalización, notificaciones, splash screen, status bar

---

## 📋 Requisitos

- Node.js 18+
- Android Studio (para build APK)

---

## 🚀 Instalación

```bash
git clone https://github.com/tu-usuario/nosfaltauno.git
cd nosfaltauno
npm install
```

### Desarrollo

```bash
npm run dev          # http://localhost:3000
npm run build        # Static export
npx next build       # Build production
```

### Android APK

```bash
npm run build && npx cap sync
cd android && .\gradlew.bat assembleDebug
```

---

## 📁 Estructura

```
src/
├── app/                    # Next.js App Router (13 páginas)
│   ├── create/             # Crear partido (form premium)
│   ├── discover/           # Tinder-style swipe
│   ├── feed/               # Feed con filtros + mapa
│   ├── login/              # Login (CSS module)
│   ├── register/           # Registro
│   ├── profile/            # Perfil con cover banner
│   │   └── edit/           # Editar perfil
│   ├── teams/              # Equipos + detalle
│   │   └── create/         # Crear equipo
│   ├── match/[id]/         # Detalle partido (info + chat + alineación)
│   ├── user/[id]/          # Perfil otro usuario
│   ├── venue/[id]/         # Detalle cancha
│   ├── messages/           # Lista chats
│   ├── notifications/      # Notificaciones
│   ├── settings/           # Configuración
│   ├── search/             # Búsqueda
│   ├── onboarding/         # Onboarding 3 pasos
│   ├── my-matches/         # Mis partidos
│   └── page.tsx            # Landing page
├── components/             # Componentes compartidos
│   ├── Logo.tsx            # Escudo NF1 (SVG)
│   ├── MatchCard.tsx       # Trading card
│   ├── TopBar.tsx          # Barra superior
│   ├── BottomNav.tsx       # Navegación inferior
│   ├── MatchInfo.tsx       # Info partido
│   ├── MatchChat.tsx       # Chat burbujas
│   ├── LineupBuilder.tsx   # Campo táctico
│   ├── UserProfileClient   # Perfil público
│   └── ui/                 # StatsGrid, TabBar, ChipButton, etc.
├── data/
│   ├── mocks.ts            # Datos mock estáticos
│   └── store.ts            # Capa localStorage (getAllMatches, saveUserMatch)
├── contexts/
│   └── ToastContext.tsx     # Sistema de toasts
└── app/
    └── globals.css          # Design tokens + utility classes
```

---

## 🗺️ Mapa de Rutas

| Ruta | Página | Diseño |
|---|---|---|
| `/` | Landing + Splash | Premium con glows |
| `/feed` | Feed de partidos | Cards + filtros + mapa |
| `/discover` | Swipe Tinder | Premium con progreso |
| `/create` | Crear partido | Form con íconos + preview imagen |
| `/match/[id]` | Detalle partido | Info + chat + alineación |
| `/profile` | Mi perfil | Cover banner + stats |
| `/profile/edit` | Editar perfil | Form premium |
| `/user/[id]` | Perfil público | Cover banner |
| `/teams` | Equipos | Cards con borde gradiente |
| `/teams/create` | Crear equipo | Form premium |
| `/teams/[id]` | Detalle equipo | Stats + miembros |
| `/venue/[id]` | Cancha | Hero + amenities |
| `/messages` | Chats | Lista premium |
| `/notifications` | Notificaciones | Cards con ícono por tipo |
| `/settings` | Configuración | Toggles, slider, privacidad |
| `/onboarding` | Onboarding 3 pasos | Steps premium |
| `/search` | Búsqueda | Chip filters |
| `/my-matches` | Mis partidos | Tabs próximo/historial |
| `/login` | Login | Form premium |
| `/register` | Registro | Form premium |

---

## 🔄 Estado del Proyecto

### ✅ Frontend Completo
- [x] 18 rutas con diseño premium (CSS Modules)
- [x] Logo escudo NF1 con SVG
- [x] Persistencia localStorage (creación de partidos funcional)
- [x] MatchCard, Teams, Profile, Discover premium
- [x] Forms con inputs con íconos + validación
- [x] Onboarding 3 pasos
- [x] Chat, alineación táctica, notificaciones
- [x] Autenticación mock (Login/Register)
- [x] Static export (Next.js output: export)
- [x] Integración Capacitor Android

### 🚧 Próximos Pasos
- [ ] Backend API real
- [ ] Autenticación real + OAuth
- [ ] Subida de imágenes (Capacitor Camera + Cloudinary/S3)
- [ ] Chat en tiempo real (WebSockets)
- [ ] Notificaciones push
- [ ] Geolocalización real
- [ ] Drag & drop alineación
- [ ] Tests unitarios y E2E

---

## 🎨 Diseño System

```
Colores:
  Primary:   hsl(142 76% 36%)  — Verde neón
  Secondary: hsl(217 91% 60%)  — Azul
  Accent:    hsl(262 83% 58%)  — Púrpura
  Gold:      hsl(42 100% 55%)  — Dorado
  Background:hsl(222 47% 11%)  — Azul profundo
  
Tipografía: Inter (system-ui)
Radio: 0.75rem
Grid: 4px
```

---

## 📄 Licencia

MIT — Hecho con ⚽ y ❤️ para la comunidad futbolera
