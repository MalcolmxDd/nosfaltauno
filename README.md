# ⚽ Nos Falta Uno

<div align="center">

![Logo](https://img.shields.io/badge/Nos%20Falta%20Uno-Football%20App-22c55e?style=for-the-badge&logo=soccer&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-7.4-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)

**La red social para encontrar y organizar partidos de fútbol de barrio**

[Características](#-características) • [Tecnologías](#-tecnologías) • [Instalación](#-instalación) • [Uso](#-uso) • [Estructura](#-estructura-del-proyecto)

</div>

---

## 📱 Sobre el Proyecto

**Nos Falta Uno** es una aplicación móvil y web diseñada para conectar jugadores de fútbol y facilitar la organización de partidos de barrio (pichangas). La app funciona como una red social donde los usuarios pueden:

- 🔍 **Descubrir partidos** cerca de su ubicación
- ➕ **Crear partidos** y buscar jugadores
- 👥 **Conectar con otros jugadores** y formar equipos
- 💬 **Chatear** con otros miembros de la comunidad
- 🗺️ **Ver partidos en mapa** interactivo
- ⭐ **Calificar y reseñar** a otros jugadores

### 🎯 Visión

Crear la plataforma líder en Latinoamérica para la organización de partidos de fútbol amateur, facilitando la conexión entre jugadores y promoviendo el deporte de barrio.

---

## ✨ Características

### 🔐 Autenticación
- ✅ Login y registro con email
- ✅ Login social (Google, Facebook, Apple) - *Listo para integración*
- ✅ Onboarding personalizado para nuevos usuarios
- ✅ Recuperación de contraseña

### 🏆 Partidos
- ✅ Feed de partidos con filtros avanzados
- ✅ Vista de mapa interactiva
- ✅ Crear partidos con detalles completos
- ✅ Detalles de partido con chat integrado
- ✅ Sistema de confirmación de jugadores
- ✅ Búsqueda de partidos por ubicación, nivel, fecha

### 👤 Perfiles
- ✅ Perfil de usuario completo
- ✅ Estadísticas de partidos jugados
- ✅ Sistema de badges y logros
- ✅ Reseñas y calificaciones
- ✅ Historial de partidos

### 💬 Mensajería
- ✅ Chat en tiempo real (mock)
- ✅ Lista de conversaciones
- ✅ Notificaciones de mensajes

### 👥 Equipos
- ✅ Crear y gestionar equipos
- ✅ Ver miembros del equipo
- ✅ Historial de partidos del equipo

### 🎨 UX/UI
- ✅ Diseño moderno y profesional
- ✅ Modo oscuro por defecto
- ✅ Animaciones suaves
- ✅ Responsive design
- ✅ Splash screen animado
- ✅ Sistema de toasts/notificaciones
- ✅ Estados de carga
- ✅ Manejo de errores con Error Boundaries

---

## 🛠️ Tecnologías

### Frontend
- **[Next.js 16.0.3](https://nextjs.org/)** - Framework React con App Router
- **[React 19.2](https://react.dev/)** - Biblioteca UI
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilos (CSS variables)
- **[Framer Motion](https://www.framer.com/motion/)** - Animaciones
- **[Lucide React](https://lucide.dev/)** - Iconos

### Móvil
- **[Capacitor 7.4](https://capacitorjs.com/)** - Framework para apps nativas
- **Android** - Soporte completo
- Plugins:
  - Geolocalización
  - Notificaciones push
  - Notificaciones locales
  - Splash screen
  - Status bar

### Mapas
- **[Leaflet](https://leafletjs.com/)** - Mapas interactivos
- **[React Leaflet](https://react-leaflet.js.org/)** - Componentes React para Leaflet

---

## 📋 Requisitos Previos

- **Node.js** 18+ y npm/yarn/pnpm
- **Android Studio** (para desarrollo Android)
- **Java JDK** 17+ (para Android)
- **Git**

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/nosfaltauno.git
cd nosfaltauno
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Agregar variables de entorno cuando se implemente el backend
# NEXT_PUBLIC_API_URL=http://localhost:3001
# NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu-google-client-id
# NEXT_PUBLIC_FACEBOOK_APP_ID=tu-facebook-app-id
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

---

## 📱 Generar APK para Android

### 1. Build de Next.js

```bash
npm run build
```

### 2. Sincronizar con Capacitor

```bash
npm run cap:sync
# o
npx cap sync
```

### 3. Generar APK

**Opción A: Desde la línea de comandos**

```bash
cd android
.\gradlew.bat assembleDebug  # Windows
# o
./gradlew assembleDebug      # Mac/Linux
```

**Opción B: Desde Android Studio**

```bash
npx cap open android
```

Luego en Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**

### 4. Ubicación de la APK

La APK se generará en:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🎮 Uso

### Desarrollo Web

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

### Desarrollo Móvil

```bash
# Sincronizar cambios con Android
npm run cap:sync

# Abrir Android Studio
npm run cap:open:android

# Ejecutar en dispositivo conectado
npm run cap:run:android
```

---

## 📁 Estructura del Proyecto

```
nosfaltauno/
├── android/                 # Proyecto Android nativo
│   └── app/
│       └── build/
│           └── outputs/
│               └── apk/     # APK generada aquí
├── public/                  # Archivos estáticos
│   └── manifest.json        # PWA manifest
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── feed/           # Feed de partidos
│   │   ├── create/         # Crear partido
│   │   ├── discover/       # Descubrir partidos (swipe)
│   │   ├── login/          # Login
│   │   ├── register/       # Registro
│   │   ├── profile/        # Perfil de usuario
│   │   ├── match/[id]/     # Detalle de partido
│   │   ├── user/[id]/      # Perfil de otro usuario
│   │   ├── teams/          # Equipos
│   │   ├── messages/       # Mensajería
│   │   ├── settings/       # Configuración
│   │   └── ...
│   ├── components/          # Componentes React
│   │   ├── TopBar.tsx      # Barra superior
│   │   ├── BottomNav.tsx   # Navegación inferior
│   │   ├── MatchCard.tsx   # Tarjeta de partido
│   │   ├── Logo.tsx        # Logo de la app
│   │   ├── SplashScreen.tsx
│   │   └── ...
│   ├── contexts/           # React Contexts
│   │   └── ToastContext.tsx
│   ├── data/               # Datos mock
│   │   └── mocks.ts
│   └── ...
├── capacitor.config.ts      # Configuración de Capacitor
├── next.config.ts           # Configuración de Next.js
├── package.json
└── README.md
```

---

## 🎨 Características de Diseño

- **Modo Oscuro**: Diseño optimizado para modo oscuro
- **Mobile-First**: Diseño responsive desde móvil
- **Gradientes Modernos**: Uso de gradientes para elementos clave
- **Animaciones Suaves**: Transiciones y animaciones fluidas
- **Iconografía Consistente**: Uso de Lucide React en toda la app
- **Tipografía**: Sistema de tipografía escalable

---

## 🔄 Estado del Proyecto

### ✅ Completado

- [x] Estructura base de Next.js
- [x] Sistema de autenticación (mock)
- [x] Feed de partidos con filtros
- [x] Vista de mapa interactiva
- [x] Crear partidos
- [x] Perfiles de usuario
- [x] Sistema de equipos
- [x] Mensajería (UI)
- [x] Notificaciones (UI)
- [x] Onboarding
- [x] Sistema de toasts
- [x] Error boundaries
- [x] Estados de carga
- [x] Integración con Capacitor
- [x] Generación de APK

### 🚧 En Desarrollo

- [ ] Backend API
- [ ] Autenticación real
- [ ] Integración OAuth (Google, Facebook, Apple)
- [ ] Chat en tiempo real (WebSockets)
- [ ] Notificaciones push
- [ ] Geolocalización real
- [ ] Sistema de pagos
- [ ] Subida de imágenes

### 📝 Pendiente

- [ ] Tests unitarios
- [ ] Tests E2E
- [ ] Documentación de API
- [ ] CI/CD
- [ ] App Store (iOS)
- [ ] Play Store (Android)

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más información.

---

## 👥 Autores

- **PabloMalcolm** - *Desarrollo inicial* - [@MalcolmxDd](https://github.com/MalcolmxDd)

---

## 🙏 Agradecimientos

- Comunidad de Next.js
- Equipo de Capacitor
- Todos los contribuidores de las librerías open source utilizadas

---

## 📞 Contacto

- **Email**: pablo.malcolm.x@gmail.com
- **GitHub**: [@MalcolmxDd](https://github.com/MalcolmxDd)


---

<div align="center">

**Hecho con ⚽ y ❤️ para la comunidad futbolera**

⭐ Si te gusta el proyecto, dale una estrella en GitHub

</div>
