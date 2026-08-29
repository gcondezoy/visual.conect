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
npm run assets   # regenera imágenes y logos (ver más abajo)
```

## Dónde editar los datos del cliente

| Qué | Archivo |
| --- | --- |
| **WhatsApp**, teléfono, email, **URL de KMT**, redes, horarios | `src/config.js` (`NEGOCIO`) |
| Sedes y direcciones | `src/config.js` (`SEDES`) |
| Áreas del formulario de postulación | `src/config.js` (`AREAS_POSTULACION`) |
| Textos: descripción, misión, visión, valores | `src/data.js` |
| Servicios, socios, métricas, propuesta laboral | `src/data.js` |
| Iconos disponibles para `data.js` | `src/iconos.js` |
| Fotos de la galería (generado) | `src/galeria.js` |

## Pendientes antes de publicar

- [ ] **Número de WhatsApp real** — `src/config.js` → `NEGOCIO.whatsapp`
      (formato internacional sin `+`, ej. `51987654321`)
- [ ] **URL de KMT** (página hermana de ventas) — `src/config.js` → `NEGOCIO.kmtUrl`
- [ ] Teléfono y email reales — `src/config.js`
- [ ] Redes sociales (si aplican) — `src/config.js` → `NEGOCIO.redes`

## Imágenes y logos

Todo el material gráfico se genera con un solo comando:

```bash
npm run assets
```

`scripts/build-assets.mjs` hace tres cosas:

1. **Fotos de sedes** → convierte cada foto a **WebP 1000×750** (recorte
   inteligente que conserva a las personas) y escribe `src/galeria.js`.
   Las 39 fotos originales pesaban 4 MB; quedan en 1,8 MB.
2. **Logo** → toma `public/img/logo-visual-connections.jpg` (el original del
   cliente), le quita el fondo blanco y genera tres piezas:
   - `logo-full.webp` — lockup para tema claro
   - `logo-full-dark.webp` — lockup con el texto aclarado, para tema oscuro
   - `logo-mark.webp` — solo el isotipo (la antena)
3. **Favicon** a partir del isotipo.

### Para agregar o cambiar fotos

1. Crea la carpeta de la sede dentro de `public/img/sedes/` con el nombre que
   espera el script (`Sede Principal`, `Trujillo`, `Piura`, `Chiclayo`,
   `Equipo Comercial`) y coloca ahí las fotos en cualquier formato.
2. Ejecuta `npm run assets`. El script convierte, renombra, actualiza
   `src/galeria.js` y elimina la carpeta original.

El mosaico muestra **5 fotos por sede** (una grande y cuatro pequeñas, que
llenan la rejilla sin huecos); el resto se ve en el visor a pantalla completa,
detrás del contador `+N`.

## Estructura

- **Hero** — presentación + isotipo con ondas + CTAs
- **Metrics** — contadores animados (cuadrillas, sedes, año)
- **Nosotros** — quiénes somos, misión, visión, valores
- **Socios** — WIN y ENTEL
- **Sedes** — tabs por ciudad + galería con visor (Lima, Trujillo, Piura,
  Chiclayo y el equipo comercial)
- **Servicios** — averías, traslados, instalaciones, ordenamiento
- **Trabaja con nosotros** — propuesta laboral + formulario → WhatsApp
- **Contáctanos** — datos, horarios, sedes + formulario → WhatsApp
- **Footer** — banner destacado a **KMT** (página hermana) + navegación

## Decisiones de diseño

- **Doble tema.** Oscuro por defecto (la identidad de la marca) y claro
  opcional. El interruptor vive en la barra; mientras nadie elija, se sigue la
  preferencia del sistema en vivo. `index.html` resuelve el tema antes de
  pintar para que no haya destello al cargar.
- **Paleta derivada del logo**: azul marino, naranja del emisor (`--accent`) y
  cyan de señal (`--cyan`). En tema claro el naranja de los textos se oscurece
  (`--accent-text`) para mantener el contraste AA.
- **Ondas permanentes.** `LogoMark` superpone arcos animados justo encima de
  las ondas que el propio logo ya trae: se encienden en secuencia hacia afuera,
  como una señal saliendo del emisor.
- **Fibra óptica de fondo.** `FiberOptic` dibuja hebras con pulsos de luz en un
  canvas fijo; el scroll los acelera y empuja. Lee `scrollY` dentro del
  `requestAnimationFrame`, así que no añade listeners ni provoca reflows.
- **Doble bisel.** Las tarjetas usan una carcasa exterior y un núcleo interior
  con radios concéntricos (`.bezel > .core`), para que se lean como piezas
  físicas y no como cajas planas.
- Tipografías: Bricolage Grotesque (titulares), Instrument Sans (cuerpo),
  JetBrains Mono (cifras).
- Todas las animaciones respetan `prefers-reduced-motion`.
- Los formularios no usan backend: construyen un mensaje y abren `wa.me`.

### Sobre el peso del bundle

Los iconos se declaran uno a uno en `src/iconos.js`. Resolverlos dinámicamente
contra el paquete completo (`import * as Icons`) obliga a empaquetar los miles
de iconos de Phosphor: el bundle pasaba de 452 kB a 5,4 MB. **Al añadir un
icono nuevo en `data.js`, hay que registrarlo también en `src/iconos.js`.**
