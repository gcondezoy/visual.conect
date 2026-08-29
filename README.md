# Visual Connections — Landing Page

Landing corporativa interactiva para **Corporación Visual Connections**
(telecomunicaciones, partner autorizado de WIN y ENTEL, Perú).
React + Vite, animaciones con [motion](https://motion.dev), formularios que
envían directo a WhatsApp.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de producción en dist/
npm run lint     # oxlint
```

## Dónde editar los datos del cliente

| Qué | Archivo |
| --- | --- |
| **WhatsApp**, teléfono, email, **URL de KMT**, redes, horarios | `src/config.js` (`NEGOCIO`) |
| Sedes y direcciones | `src/config.js` (`SEDES`) |
| Áreas del formulario de postulación | `src/config.js` (`AREAS_POSTULACION`) |
| Textos: descripción, misión, visión, valores | `src/data.js` |
| Servicios, socios, métricas, propuesta laboral | `src/data.js` |

## Pendientes antes de publicar (placeholders)

- [ ] **Número de WhatsApp real** — `src/config.js` → `NEGOCIO.whatsapp`
      (formato internacional sin `+`, ej. `51987654321`)
- [ ] **URL de KMT** (página hermana de ventas) — `src/config.js` → `NEGOCIO.kmtUrl`
- [ ] Teléfono y email reales — `src/config.js`
- [ ] Redes sociales (si aplican) — `src/config.js` → `NEGOCIO.redes`
- [ ] **Fotos de equipos por sede** — ver abajo

## Cómo agregar las fotos de las sedes

Para no cargar la página con decenas de imágenes, la galería usa **tabs por
ciudad** con *lazy loading*. Mientras no haya fotos, se muestran placeholders
elegantes.

1. Optimiza las fotos (máx. **800px** de ancho, **~150 KB** c/u, formato `.jpg`/`.webp`).
2. Colócalas en `public/img/sedes/` con el patrón `<sede>-1.jpg`, `<sede>-2.jpg`…
   (ej. `lima-1.jpg`, `trujillo-1.jpg`).
3. En `src/components/Sedes.jsx`, edita el objeto `GALERIAS` y llena el array
   `fotos` de cada sede con las rutas, por ejemplo:

   ```js
   lima: { fotos: ['/img/sedes/lima-1.jpg', '/img/sedes/lima-2.jpg'], placeholders: 3 },
   ```

## Estructura

- **Hero** — presentación + antena animada + CTAs
- **Metrics** — contadores animados (cuadrillas, sedes, año)
- **Nosotros** — quiénes somos, misión, visión, valores
- **Socios** — WIN y ENTEL
- **Sedes** — tabs por ciudad + galería (Lima, Trujillo, Piura, Chiclayo)
- **Servicios** — averías, traslados, instalaciones, ordenamiento
- **Trabaja con nosotros** — propuesta laboral + formulario → WhatsApp
- **Contáctanos** — datos, horarios, sedes + formulario → WhatsApp
- **Footer** — banner destacado a **KMT** (página hermana) + navegación

## Decisiones de diseño

- Tema oscuro dark-tech. Paleta derivada del logo: azul marino + naranja
  (`--accent`) + cyan de señal (`--cyan`).
- Tipografías: Bricolage Grotesque (titulares), Instrument Sans (cuerpo),
  JetBrains Mono (cifras).
- Todas las animaciones respetan `prefers-reduced-motion`.
- Los formularios no usan backend: construyen un mensaje y abren `wa.me`.
