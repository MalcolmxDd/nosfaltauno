# NF1 Design System — "Cancha Nocturna"

> La cancha de barrio de noche, con la luz del estadio encendida.
> Calor naranja sobre negro profundo. Textura análoga. Tipografía dramática.

---

## 1. FILOSOFÍA

No es "dark mode con neón". Es **la cancha de noche**: la luz del foco que ilumina el campo, las sombras largas, el brillo de las camisetas, la rusticidad del cemento. Digital pero con alma análoga.

### Principios

1. **Un héroe por pantalla** — un elemento que brille, el resto flat. No todo gloweando.
2. **Negro con textura** — no azul oscuro plastificado. Noise overlay en todo.
3. **Naranja = energía** — el acento principal es la luz del estadio. Verde solo para success.
4. **Tipografía como protagonista** — headers gigantes, números tabulares, contrastes brutales.
5. **Asimetría intencional** — no todo es card-abajo-card. Elements overlap, bleed, break.
6. **Sombras duras** — físicas, no etéreas. Un objeto tiene peso.
7. **Motion con personalidad** — spring physics, no fade genérico. Todo entra con scale.

---

## 2. PAleta

### Colores base

```css
/* Fondo */
--bg-base: #0A0A0F;          /* casi negro, leve tinte azul */
--bg-elevated: #14141F;       /* un nivel arriba */
--bg-card: #1A1A28;           /* cards normales */
--bg-card-warm: #1F1A14;      /* cards destacados (calor) */

/* Acento principal — LUZ DEL ESTADIO */
--accent: #FF6B1A;            /* naranja ámbar */
--accent-hover: #FF8C42;
--accent-dim: rgba(255, 107, 26, 0.15);
--accent-glow: 0 0 30px rgba(255, 107, 26, 0.25);

/* Acento secundario */
--gold: #FFD700;              /* trofeos, logros */
--magenta: #FF2E97;           /* un solo uso puntual */

/* Estados */
--success: #00D97A;           /* solo success positivo */
--error: #FF3B3B;
--warning: #FFB020;

/* Texto */
--text-primary: #FFFFFF;
--text-secondary: #8B8B9A;
--text-tertiary: #5A5A6B;

/* Bordes */
--border-subtle: rgba(255, 255, 255, 0.05);
--border-card: rgba(255, 255, 255, 0.08);
--border-accent: rgba(255, 107, 26, 0.2);
```

### Gradientes clave

```css
/* Luz del estadio — background ambient */
--grad-stadium: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 107, 26, 0.06) 0%, transparent 70%);

/* Card destacada */
--grad-card-warm: linear-gradient(135deg, #1A1A28 0%, #1F1A14 100%);

/* CTA principal */
--grad-cta: linear-gradient(135deg, #FF6B1A 0%, #FF8C42 100%);

/* Texto oro (stats premium) */
--grad-gold: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
```

### NO usar

- Verde neón como decoración (solo success)
- Azul como acento (es fondo, no protagonista)
- Glassmorphism en todo (solo donde aporta profundidad)
- `backdrop-filter: blur()` en cards normales — pesado y genérico

---

## 3. TIPOGRAFÍA

### Fuentes

```css
/* Display — headers gigantes, números, splash */
--font-display: 'Satoshi', 'Clash Display', 'Inter', sans-serif;

/* Body — texto corrido */
--font-body: 'Inter', -apple-system, sans-serif;

/* Mono — stats, números tabulares */
--font-mono: 'Space Grotesk', 'JetBrains Mono', monospace;
```

### Escala

```css
--text-hero: 3.5rem;     /* 56px — splash, hero sections */
--text-display: 2.5rem;  /* 40px — números grandes, stats */
--text-title: 1.75rem;  /* 28px — headers de página */
--text-heading: 1.25rem; /* 20px — subheaders */
--text-body: 1rem;       /* 16px — texto base */
--text-caption: 0.75rem; /* 12px — uppercase, tracking wide */
--text-micro: 0.625rem; /* 10px — badges, labels */
```

### Uso

| Elemento | Fuente | Peso | Tamaño | Extra |
|----------|--------|------|--------|-------|
| Splash title | Satoshi | 900 | hero | letter-spacing: -0.03em |
| Stats número | Satoshi | 700 | display | font-variant-numeric: tabular-nums |
| Page header | Satoshi | 700 | title | letter-spacing: -0.02em |
| Card title | Satoshi | 600 | heading | |
| Body text | Inter | 400 | body | line-height: 1.5 |
| Label/badge | Inter | 600 | caption | text-transform: uppercase, letter-spacing: 0.08em |
| Micro label | Inter | 600 | micro | text-transform: uppercase, letter-spacing: 0.1em |

### Cómo cargar las fuentes

Usar Fontsource (self-hosted, mejor performance que Google Fonts):

```bash
npm install @fontsource/satoshi @fontsource/inter @fontsource/space-grotesk
```

O si Satoshi no está en Fontsource, usar:
- **Satoshi** → `@fontsource-variable/satoshi` o cargar desde Fontshare CDN
- **Clash Display** → Fontshare CDN como fallback
- **Space Grotesk** → `@fontsource/space-grotesk`

---

## 4. TEXTURAS

### Noise overlay (sutil, análogo)

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

### Luz del estadio (background ambient)

```css
body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60vh;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 107, 26, 0.05) 0%, transparent 70%);
}
```

---

## 5. SOMBRAS

```css
/* Dura — sensación de peso físico */
--shadow-hard: 0 10px 0 rgba(0, 0, 0, 0.4);          /* sin blur */

/* Soft standard */
--shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.3);

/* Elevada — modals, sheets */
--shadow-elevated: 0 20px 60px rgba(0, 0, 0, 0.5);

/* Glow del acento — solo en CTA y elementos hero */
--shadow-accent-glow: 0 0 30px rgba(255, 107, 26, 0.25);

/* Inset — profundidad hacia adentro */
--shadow-inset: inset 0 1px 0 rgba(255, 255, 255, 0.05);
```

---

## 6. RADIOS

```css
--radius-sm: 8px;
--radius-md: 14px;
--radius-lg: 20px;
--radius-xl: 28px;
--radius-btn: 16px;
--radius-card: 20px;
--radius-pill: 9999px;
--radius-sheet: 28px;
```

---

## 7. SPACING

Mantener escala actual (4px base):
`4, 8, 12, 16, 20, 24, 32, 40, 48, 64`

---

## 8. MOTION

### Entradas

```css
/* Spring entrada — no fade genérico */
--spring-enter: cubic-bezier(0.34, 1.56, 0.64, 1);  /* overshoot */

@keyframes enter {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

/* Stagger — elementos entran en cascada */
--stagger-1: 0s;
--stagger-2: 0.05s;
--stagger-3: 0.1s;
--stagger-4: 0.15s;
```

### Interacciones

```css
/* Tap */
:active { transform: scale(0.97); }

/* Hover card */
:hover { transform: translateY(-2px); }

/* CTA pulsing glow */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 26, 0.2); }
  50%      { box-shadow: 0 0 40px rgba(255, 107, 26, 0.35); }
}
animation: pulse-glow 2.5s ease-in-out infinite;
```

### Framer Motion

```tsx
// Entrada estándar de página
const enterVariants = {
  initial: { opacity: 0, scale: 0.97, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 24 } },
  exit: { opacity: 0, scale: 0.97, y: -12, transition: { duration: 0.15 } }
};

// Stagger children
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.05 } }
};

// Card swipe 3D
const swipeVariants = {
  animate: { x: 0, rotate: 0 },
  exit: { x: 300, rotate: 20, transition: { duration: 0.3 } }
};
```

---

## 9. LAYOUTS

### Bento grid (Feed)

```
┌────────────────────┐
│   FEATURED CARD    │  ← más grande, banda naranja
│   (partido top)     │
├────────┬───────────┤
│ Card 2 │  Card 3   │  ← normales
├────────┴───────────┤
│     Card 4         │
└────────────────────┘
```

### Match detail (hero overlap)

```
┌────────────────────┐
│                    │
│   HERO FOTO CANCHA  │  ← imagen completa
│                    │
│ ┌──────────────────┐
│ │ INFO OVERLAPEADA │  ← card que sube sobre la foto
│ │ fecha, nivel     │
│ └──────────────────┘
│   Chat / Lineup     │
└────────────────────┘
```

### Profile (asimétrico)

```
┌────────────────────┐
│  ▓▓ BANNER ▓▓     │  ← banner con curva
│     [avatar]       │  ← avatar overlapeado
│  Nombre            │
│  ┌────┐ ┌────┐    │  ← stats 2x2 desigual
│  │ 42 │ │ 3.8│    │
│  └────┘ └────┘    │
└────────────────────┘
```

---

## 10. COMPONENTES BASE

### Botón primario (CTA)

```css
.btn-primary {
  background: var(--grad-cta);
  color: #fff;
  border-radius: var(--radius-btn);
  font-family: var(--font-display);
  font-weight: 700;
  height: 56px;
  font-size: 1rem;
  box-shadow: var(--shadow-accent-glow);
  animation: pulse-glow 2.5s ease-in-out infinite;
}
```

### Card estándar

```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-soft), var(--shadow-inset);
  transition: transform 0.2s var(--spring-enter), box-shadow 0.2s ease;
}
```

### Card destacada (warm)

```css
.card-warm {
  background: var(--grad-card-warm);
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-accent-glow);
}
```

### Badge

```css
.badge {
  font-family: var(--font-body);
  font-size: var(--text-micro);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  background: var(--accent-dim);
  color: var(--accent);
}
```

### Stats

```css
.stat-number {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--text-primary);
}

.stat-label {
  font-family: var(--font-body);
  font-size: var(--text-caption);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
}
```

---

## 11. ICONOGRAFÍA

Mantener **Lucide React** pero:
- Acento en naranja (#FF6B1A) cuando es interactivo
- 20px en bottom nav, 22px en top bar
- Stroke 2 (default) — no más fino
- Estados activos: icono naranja + dot indicator

---

## 12. ICONOGRAFÍA NO TOCAR

- Logo SVG del escudo NF1 — mantener
- Animación splash — mantener pero ajustar paleta
- Estructura de rutas — mantener
- Mock data — mantener
- Persistencia localStorage — mantener

---

## 13. FUENTES — CÓMO CARGAR

### Opción A: Fontsource (recomendado, self-hosted)

```bash
npm install @fontsource-variable/inter @fontsource/space-grotesk
# Satoshi desde Fontshare:
```

En layout.tsx:
```tsx
import '@fontsource-variable/inter';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
```

### Satoshi (no está en Fontsource)

Usar Fontshare API:
```css
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,900,500,400&display=swap');
```

O descargar los archivos y ponerlos en `public/fonts/`.

---

## 14. CHECKLIST DE APLICACIÓN

### globals.css
- [ ] Reemplazar paleta completa
- [ ] Agregar noise overlay + stadium gradient
- [ ] Nuevas fuentes
- [ ] Nuevos shadows (duros + glow)
- [ ] Nuevos radii
- [ ] Nuevas animaciones (spring enter, pulse glow)

### Componentes base
- [ ] BottomNav — naranja activo, dot indicator, FAB
- [ ] TopBar — border accent, iconos naranja
- [ ] Button — CTA gradiente naranja, pulse glow
- [ ] Card — warm variant, hover lift
- [ ] MatchCard — bento, 3D tilt hint
- [ ] StatsGrid — números display, tabular
- [ ] ChipButton — accent naranja
- [ ] TabBar — accent naranja

### Pantallas principales
- [ ] Landing — hero naranja, noise, tipografía dramática
- [ ] Splash — paleta nueva, mantener animación
- [ ] Feed — bento grid, featured card warm
- [ ] Discover — 3D tilt, naranja accents
- [ ] Match Detail — hero foto overlap, info card
- [ ] Login/Register — mantener orbes pero paleta nueva

### Pantallas secundarias
- [ ] Profile — banner asimétrico, stats display
- [ ] Teams — cards warm, badges
- [ ] Settings — toggles naranja
- [ ] Messages — burbujas naranja
- [ ] Notifications — iconos naranja
- [ ] Search — input con accent
- [ ] Create — form con accent naranja
- [ ] Onboarding — pasos con paleta nueva
