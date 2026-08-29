# 🚀 PLAN LANDING PAGE INTERACTIVA - VISUAL CONNECTIONS

## 1. CONCEPTO GENERAL

**Landing Page Premium e Interactiva** para Corporación Visual Connections  
- Single Page Application (SPA) con scroll fluido entre secciones
- Animaciones HIGH LEVEL: parallax, scroll triggers, hover effects
- Formularios capturan datos → WhatsApp directo (sin email)
- Navegación clara pero sentir de landing immersivo
- Dark theme corporativo (azul oscuro + naranja + cyan)

---

## 2. ESTRUCTURA DE NAVEGACIÓN

### Navbar Fija (Sticky)
```
┌────────────────────────────────────────────────────────┐
│ [Logo VC] │ Inicio │ Nosotros │ Servicios │            │
│           │ Trabaja con nosotros │ Contáctanos │       │
│           │                            [KMT →]         │
└────────────────────────────────────────────────────────┘
```

**Características Navbar:**
- Posición fija al scroll
- Logo clickeable = vuelve a inicio (hero)
- Enlaces smooth scroll a cada sección
- En mobile: hamburger menu (animado)
- Fondo semi-transparente con blur effect
- Indicador activo (underline o highlight)

---

## 3. SECCIONES LANDING (Scroll Fluido)

### 🎯 SECCIÓN 1: HERO (Fullscreen)
**Animaciones:**
- Background parallax al scroll
- Fade-in del contenido
- Título animado letter-by-letter (Motion.js)
- CTA con pulse animation

**Contenido:**
```
╔════════════════════════════════════════════════╗
║                  HERO SECTION                   ║
║  Altura: 100vh (fullscreen)                    ║
║                                                 ║
║  "Conectando Perú con Tecnología"              ║
║  (Animado, efecto typewriter o slide-in)       ║
║                                                 ║
║  Subtítulo: "Servicios de instalación,         ║
║  averías y mantenimiento de telecomunicaciones"║
║                                                 ║
║  [Conoce más ↓] (botón con hover glow)         ║
║                                                 ║
║  Fondo: Imagen técnicos + overlay azul oscuro  ║
║  con gradiente + parallax effect                ║
╚════════════════════════════════════════════════╝
```

---

### 👥 SECCIÓN 2: QUIÉNES SOMOS (Animated Entry)
**Animaciones:**
- Fade + slide-up al entrar en viewport
- Cards de Misión/Visión con stagger effect
- Valores en pills que aparecen con bounce
- Imagen de equipo con zoom-in lento

**Contenido:**
```
╔════════════════════════════════════════════════╗
║             QUIÉNES SOMOS                       ║
║                                                 ║
║  Creada en 2021 con la finalidad de...          ║
║  [Párrafo principal con fade-in]                ║
║                                                 ║
║  ┌──────────┐  ┌──────────┐  ┌──────────┐     ║
║  │ MISIÓN   │  │ VISIÓN   │  │ VALORES  │     ║
║  │ (Card)   │  │ (Card)   │  │ (Pills)  │     ║
║  │ Animado  │  │ Animado  │  │ Bounce   │     ║
║  └──────────┘  └──────────┘  └──────────┘     ║
║                                                 ║
║  Foto equipo técnico (fade-in)                 ║
╚════════════════════════════════════════════════╝
```

---

### 🏆 SECCIÓN 3: SOCIOS (Showcase)
**Animaciones:**
- Logos WIN/ENTEL con glow effect
- Descripción tipo con slide-in del texto
- Background color shift (subtle transition)

**Contenido:**
```
╔════════════════════════════════════════════════╗
║          NUESTROS SOCIOS PRINCIPALES            ║
║                                                 ║
║  ┌─────────────────────┐  ┌──────────────────┐ ║
║  │ WIN                 │  │ ENTEL            │ ║
║  │ Internet 100%       │  │ Conectividad     │ ║
║  │ Fibra Óptica        │  │ Móvil y Fija     │ ║
║  │ (Logo + glow)       │  │ (Logo + glow)    │ ║
║  │                     │  │                  │ ║
║  │ [Descripción slide] │  │ [Descripción]    │ ║
║  └─────────────────────┘  └──────────────────┘ ║
╚════════════════════════════════════════════════╝
```

---

### 📊 SECCIÓN 4: NÚMEROS CLAVE (Counter Animation)
**Animaciones:**
- Contadores animados (0 → número final)
- Icon scale-up + rotate
- Stagger effect entre items

**Contenido:**
```
╔════════════════════════════════════════════════╗
║            NÚMEROS QUE HABLAN                   ║
║                                                 ║
║  ┌──────────┐  ┌──────────┐  ┌──────────┐     ║
║  │   40+    │  │    4     │  │  2021    │     ║
║  │Cuadrillas│  │  Sedes   │  │Fundación │     ║
║  │ (Counter)│  │(Counter) │  │          │     ║
║  └──────────┘  └──────────┘  └──────────┘     ║
║                                                 ║
║  ┌──────────┐  ┌──────────┐                   ║
║  │   100%   │  │ Nacional │                   ║
║  │Profesio. │  │Cobertura │                   ║
║  │          │  │          │                   ║
║  └──────────┘  └──────────┘                   ║
╚════════════════════════════════════════════════╝
```

---

### 🎯 SECCIÓN 5: NUESTRAS SEDES (Interactive Tabs + Galería)
**Animaciones:**
- Tab switching con cross-fade
- Galería carrusel con smooth transitions
- Lazy loading de imágenes
- Hover zoom en thumbnails

**Contenido:**
```
╔════════════════════════════════════════════════╗
║         NUESTROS EQUIPOS POR SEDE              ║
║                                                 ║
║  [LIMA]  [TRUJILLO]  [PIURA]  [CHICLAYO]      ║
║   ▲       (tab activo)                        ║
║                                                 ║
║  LIMA - 40+ Cuadrillas Técnicas                ║
║  ┌───────────┐ ┌───────────┐ ┌───────────┐   ║
║  │ [Foto 1]  │ │ [Foto 2]  │ │ [Foto 3]  │   ║
║  │ (carrusel)│ │(lazy load)│ │           │   ║
║  └───────────┘ └───────────┘ └───────────┘   ║
║                                                 ║
║  < PREV     •••••••••     NEXT >               ║
║  (Carrusel navegable)                          ║
║                                                 ║
║  Descripción: "Contamos con 40+ cuadrillas..  ║
╚════════════════════════════════════════════════╝
```

---

### 🔧 SECCIÓN 6: SERVICIOS (Interactive Cards)
**Animaciones:**
- Cards con hover lift (shadow + transform)
- Icon rotate on hover
- Background color shift on hover
- Stagger effect al entrar

**Contenido:**
```
╔════════════════════════════════════════════════╗
║            NUESTROS SERVICIOS                  ║
║                                                 ║
║  ┌──────────────┐  ┌──────────────┐           ║
║  │   AVERÍAS    │  │  TRASLADOS   │           ║
║  │              │  │              │           ║
║  │ 🔧 Icon      │  │ 🚚 Icon      │           ║
║  │              │  │              │           ║
║  │ Diagnóstico  │  │ Cambio de... │           ║
║  │ y resolución │  │ ubicación    │           ║
║  │              │  │              │           ║
║  │[Hover lift]  │  │[Hover lift]  │           ║
║  └──────────────┘  └──────────────┘           ║
║                                                 ║
║  ┌──────────────┐  ┌──────────────┐           ║
║  │INSTALACIONES │  │ORDENAMIENTO  │           ║
║  │              │  │              │           ║
║  │ 💻 Icon      │  │ 📦 Icon      │           ║
║  │              │  │              │           ║
║  │ Nuevas       │  │ Etiquetado   │           ║
║  │ conexiones   │  │ y organismo   │           ║
║  │              │  │              │           ║
║  │[Hover lift]  │  │[Hover lift]  │           ║
║  └──────────────┘  └──────────────┘           ║
╚════════════════════════════════════════════════╝
```

---

### 💼 SECCIÓN 7: TRABAJA CON NOSOTROS (CTA Llamativa)
**Animaciones:**
- Background gradient shift
- Título con effect de glow
- Form inputs con focus animations
- Submit button con ripple effect

**Contenido:**
```
╔════════════════════════════════════════════════╗
║        TRABAJA CON NOSOTROS                    ║
║                                                 ║
║  Posición: Técnico Principal / Auxiliar        ║
║  Ubicación: Lima Metropolitana                 ║
║  Tipo: Planilla (Régimen MYPE / BBSS)         ║
║                                                 ║
║  RANGO SALARIAL: S/. 1,500 - 1,800            ║
║                                                 ║
║  Requisitos: • Experiencia en telecom          ║
║             • Disponibilidad horario rotativo  ║
║             • Actitud de servicio              ║
║                                                 ║
║  ┌─────────────────────────────────────┐      ║
║  │  FORMULARIO DE POSTULACIÓN          │      ║
║  ├─────────────────────────────────────┤      ║
║  │ [Nombre completo]                   │      ║
║  │ [Apellidos]                         │      ║
║  │ [Email]                             │      ║
║  │ [Teléfono]                          │      ║
║  │ [Ciudad/Ubicación]                  │      ║
║  │ [Área interés] ▼                    │      ║
║  │   • Técnico Principal                │      ║
║  │   • Técnico Auxiliar                 │      ║
║  │   • Otro                             │      ║
║  │ [Mensaje/Motivación]                │      ║
║  │                                     │      ║
║  │ [ENVIAR POR WHATSAPP] ← Botón CTA  │      ║
║  │ (ripple effect, glow)               │      ║
║  └─────────────────────────────────────┘      ║
║                                                 ║
║  *Datos enviados a: [número WhatsApp]         ║
╚════════════════════════════════════════════════╝
```

---

### 📞 SECCIÓN 8: CONTÁCTANOS (Multi-element)
**Animaciones:**
- Datos de contacto con typing effect
- Mapa con fade-in (si aplica)
- Formulario contacto (similar a postulación)
- Icons con hover bounce

**Contenido:**
```
╔════════════════════════════════════════════════╗
║           CONTÁCTANOS                          ║
║                                                 ║
║  ┌─ INFORMACIÓN ─┐  ┌─ UBICACIONES ─┐         ║
║  │               │  │                │         ║
║  │ 📞 Teléfono   │  │ 🏢 LIMA        │         ║
║  │ [Número]      │  │ JR. 12 DE JULIO│         ║
║  │               │  │ URB. MESA...   │         ║
║  │ 📧 Email      │  │                │         ║
║  │ contacto@...  │  │ 🏢 TRUJILLO    │         ║
║  │               │  │ MZA. C LOTE. 2 │         ║
║  │ 💬 WhatsApp   │  │                │         ║
║  │ [Número]      │  │ 🏢 PIURA       │         ║
║  │               │  │ MZA. M LOTE 44 │         ║
║  │ ⏰ Horarios   │  │                │         ║
║  │ L-V: 8-6pm    │  │ 🏢 CHICLAYO    │         ║
║  │ Sab: 9-1pm    │  │ OTR.PROL...    │         ║
║  │               │  │                │         ║
║  └───────────────┘  └────────────────┘         ║
║                                                 ║
║  MAPA INTERACTIVO (si aplica)                 ║
║  [Mapa con pins de sedes + markers]            ║
║                                                 ║
║  FORMULARIO CONTACTO (envía a WhatsApp)       ║
║  [Nombre] [Email] [Asunto] [Mensaje]          ║
║  [ENVIAR POR WHATSAPP]                        ║
╚════════════════════════════════════════════════╝
```

---

### 🔗 FOOTER (Call-to-Action KMT)
**Contenido:**
```
┌─────────────────────────────────────────────────┐
│ © 2021-2025 Corporación Visual Connections     │
│                                                 │
│ Teléfono │ Email │ WhatsApp │ Ubicaciones      │
│                                                 │
│ Redes: LinkedIn │ Facebook │ Instagram         │
│                                                 │
│ [ÁREA DE VENTAS - KMT →] ← Botón destacado    │
│ (naranja, con glow, animado)                   │
│                                                 │
│ Política de Privacidad │ Términos de Uso      │
└─────────────────────────────────────────────────┘
```

---

## 4. ANIMACIONES Y EFECTOS (HIGH LEVEL)

### Animaciones on-Scroll
- **Fade-in + Slide-up**: Texto y contenido que entra
- **Parallax**: Fondos que se mueven más lento que el scroll
- **Counter animations**: Números que cuentan (0 → final)
- **Stagger effects**: Items que aparecen en secuencia

### Hover Effects
- **Lift effect**: Cards se elevan (shadow + transform)
- **Color shifts**: Cambios de color sutiles
- **Icon rotations**: Iconos que rotan
- **Glow effects**: Halos luminosos en botones/elementos

### Animaciones de Componentes
- **Navbar**: Fade-in/out, blur background
- **Formularios**: Focus animations, input underline animations
- **Botones**: Ripple effect, pulse animation, glow
- **Carrusel**: Smooth transitions, fade between slides
- **Tabs**: Cross-fade entre contenido

### Motion.js (Ya instalado)
- Usar para animaciones complejas
- Scroll triggers integrados
- Smooth transitions entre secciones

---

## 5. FORMULARIOS → WHATSAPP

### Formulario Postulación
**Campos:**
- Nombre completo
- Apellidos
- Email
- Teléfono
- Ciudad/Ubicación
- Área de interés (dropdown)
- Mensaje/Motivación

**Acción:**
- Validar campos (client-side)
- Construir mensaje WhatsApp:
```
Nuevo postulante de Visual Connections:

Nombre: [Nombre] [Apellidos]
Email: [Email]
Teléfono: [Teléfono]
Ubicación: [Ciudad]
Área de interés: [Área]

Motivación:
[Mensaje]

---
Enviado desde: visualconnections.pe/trabaja-con-nosotros
```
- Link WhatsApp: `https://wa.me/[NÚMERO]?text=[MENSAJE_URLENCODED]`

### Formulario Contacto
**Campos:**
- Nombre
- Email
- Asunto
- Mensaje

**Acción:**
- Validar
- Construir mensaje WhatsApp similar
- Enviar a `wa.me/[NÚMERO]?text=...`

---

## 6. NAVEGACIÓN TÉCNICA

### Smooth Scroll
- Usar `scroll-behavior: smooth` en CSS
- O librería como `react-scroll` / `lucide`
- Navbar links scrollean a secciones con ID

### Single Page Architecture
- Home = "/" (render todas las secciones)
- Navbar = componente sticky global
- Footer = componente global
- Cada sección = componente con ID para scroll

### Mobile Navigation
- Hamburger menu en mobile
- Mismo smooth scroll
- Navbar collapsa en mobile

---

## 7. STACK TÉCNICO

**Frontend:**
- React 19 + Vite (actual)
- Motion.js (animaciones, ya instalado)
- CSS Modules (estructura actual)
- React Scroll (smooth scroll navigation)

**Formularios:**
- Validación: Zod o simple regex
- Envío: WhatsApp Web API (`wa.me/número?text=mensaje`)
- No necesita backend (directo a WhatsApp)

**Imágenes:**
- Lazy loading nativo (`img.loading="lazy"`)
- WebP + JPEG fallback
- Carrusel: librería ligera (swiper o custom)

---

## 8. PERFORMANCE & SEO

**Optimizaciones:**
- Lazy load imágenes
- Code splitting por sección
- Minificación automática (Vite)
- Meta tags + Open Graph
- Mobile-first responsive

**SEO:**
- Title: "Visual Connections - Servicios de Telecomunicaciones Perú"
- Description: "Partner WIN y ENTEL. Instalación, averías, traslados. ¡Trabaja con nosotros!"
- Open Graph image: Hero/Logo
- Sitemap simple (una página)

---

## 9. TIMELINE ESTIMADO

| Fase | Tareas | Tiempo |
|------|--------|--------|
| **1. Setup** | Limpiar proyecto, estructura base, Navbar/Footer | 2-3h |
| **2. Hero + Animaciones Base** | Hero fullscreen, parallax, fade-in setup | 2-3h |
| **3. Secciones (Quiénes/Socios/Números)** | Cards animadas, counters, stagger effects | 3-4h |
| **4. Galería Sedes** | Tabs interactivas, carrusel, lazy loading | 3-4h |
| **5. Servicios** | Cards con hover lift, iconos | 1.5-2h |
| **6. Formularios** | Postulación + Contacto → WhatsApp | 2-3h |
| **7. Optimización** | Imágenes, perf, responsividad | 2-3h |
| **8. Deploy** | Vercel/servidor cliente | 1h |
| | **TOTAL** | **17-23 horas** |

---

## 10. PRÓXIMOS PASOS INMEDIATOS

1. ✅ Confirmar **número WhatsApp** real (para formularios)
2. ✅ Confirmar **URL KMT** (link externo o interno)
3. ✅ Proporcionar **imágenes optimizadas** por sede
4. ✅ Confirmar **datos de contacto** (teléfono, email)
5. ⏳ **COMENZAR DESARROLLO** 🚀

---

**DOCUMENTO:** Plan Landing Interactiva - Visual Connections  
**VERSIÓN:** 2.0 (Premium Interactive)  
**ESTADO:** Listo para desarrollo
