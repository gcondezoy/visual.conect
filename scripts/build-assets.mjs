/**
 * Pipeline de assets — Visual Connections
 *
 * 1. Convierte todas las fotos de sedes a WebP con formato uniforme (4:3).
 * 2. Recorta el isotipo (antena) del logo oficial y lo deja con fondo transparente.
 * 3. Genera el lockup completo en dos variantes (tema claro / tema oscuro).
 *
 * Uso:  node scripts/build-assets.mjs
 */
import sharp from 'sharp'
import { readdir, mkdir, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const RAIZ = path.resolve(import.meta.dirname, '..')
const IMG = path.join(RAIZ, 'public', 'img')
const ORIGEN_SEDES = path.join(IMG, 'sedes')
const DESTINO_SEDES = path.join(IMG, 'sedes')

// Formato uniforme para toda la galería
const FOTO = { ancho: 1000, alto: 750, calidad: 72 }

// Carpeta original -> prefijo de archivo
const GRUPOS = {
  'Sede Principal': 'lima',
  Trujillo: 'trujillo',
  Piura: 'piura',
  Chiclayo: 'chiclayo',
  'Equipo Comercial': 'comercial',
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

// ---------------------------------------------------------------- fotos ----

async function convertirFotos() {
  console.log('\n▸ FOTOS DE SEDES\n')
  const manifiesto = {}
  let totalOrigen = 0
  let totalFinal = 0

  for (const [carpeta, prefijo] of Object.entries(GRUPOS)) {
    const dir = path.join(ORIGEN_SEDES, carpeta)

    // Si la carpeta original ya fue procesada y eliminada, se reconstruye el
    // manifiesto a partir de los .webp existentes (el script es idempotente).
    if (!existsSync(dir)) {
      const yaConvertidas = (await readdir(DESTINO_SEDES))
        .filter((f) => new RegExp(`^${prefijo}-\\d+\\.webp$`).test(f))
        .sort()
      manifiesto[prefijo] = yaConvertidas.map((f) => `/img/sedes/${f}`)
      console.log(`  · ${carpeta}: ya convertida (${yaConvertidas.length} fotos)`)
      continue
    }

    const archivos = (await readdir(dir))
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()

    manifiesto[prefijo] = []

    for (const [i, archivo] of archivos.entries()) {
      const entrada = path.join(dir, archivo)
      const nombre = `${prefijo}-${String(i + 1).padStart(2, '0')}.webp`
      const salida = path.join(DESTINO_SEDES, nombre)

      const meta = await sharp(entrada).metadata()
      totalOrigen += meta.size ?? 0

      const buf = await sharp(entrada)
        .rotate() // respeta la orientación EXIF
        .resize(FOTO.ancho, FOTO.alto, {
          fit: 'cover',
          position: sharp.strategy.attention, // recorte inteligente: conserva a las personas
        })
        .webp({ quality: FOTO.calidad, effort: 6 })
        .toBuffer()

      await writeFile(salida, buf)
      totalFinal += buf.length

      manifiesto[prefijo].push(`/img/sedes/${nombre}`)
      console.log(
        `  ✓ ${nombre.padEnd(16)} ${String(meta.width).padStart(4)}×${String(meta.height).padEnd(4)} → ${FOTO.ancho}×${FOTO.alto}  ${kb(meta.size ?? 0).padStart(7)} → ${kb(buf.length).padStart(7)}`,
      )
    }
  }

  // Las carpetas originales ya no se necesitan en public/ (se servirían tal cual)
  for (const carpeta of Object.keys(GRUPOS)) {
    const dir = path.join(ORIGEN_SEDES, carpeta)
    if (existsSync(dir)) await rm(dir, { recursive: true, force: true })
  }

  if (totalOrigen > 0) {
    const ahorro = (1 - totalFinal / totalOrigen) * 100
    console.log(`\n  Total: ${kb(totalOrigen)} → ${kb(totalFinal)}  (−${ahorro.toFixed(0)} %)`)
  }
  const totalFotos = Object.values(manifiesto).reduce((n, a) => n + a.length, 0)
  console.log(`  ${totalFotos} fotos en la galería`)
  return manifiesto
}

// ----------------------------------------------------------------- logo ----

// Quita el fondo blanco conservando los bordes suavizados del original.
// alpha = cuánta "tinta" tiene el píxel;  color = se des-premultiplica el blanco.
function blancoATransparente(data, info) {
  const { width, height, channels } = info
  const out = Buffer.alloc(width * height * 4)
  for (let p = 0; p < width * height; p++) {
    const i = p * channels
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = 255 - Math.min(r, g, b)
    const o = p * 4
    if (a === 0) {
      out[o] = out[o + 1] = out[o + 2] = out[o + 3] = 0
      continue
    }
    const k = 255 / a
    out[o] = Math.max(0, Math.min(255, Math.round((r - (255 - a)) * k)))
    out[o + 1] = Math.max(0, Math.min(255, Math.round((g - (255 - a)) * k)))
    out[o + 2] = Math.max(0, Math.min(255, Math.round((b - (255 - a)) * k)))
    out[o + 3] = a
  }
  return out
}

// Invierte la luminosidad conservando el tono: el azul marino del texto pasa a
// azul muy claro sin volverse gris. Solo se aplica al logotipo, nunca al isotipo.
function aclararParaFondoOscuro(rgba, width, height, desdeX) {
  const out = Buffer.from(rgba)
  for (let y = 0; y < height; y++) {
    for (let x = desdeX; x < width; x++) {
      const o = (y * width + x) * 4
      if (out[o + 3] === 0) continue
      const r = out[o] / 255
      const g = out[o + 1] / 255
      const b = out[o + 2] / 255
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      const l = (max + min) / 2
      if (l >= 0.62) continue // ya es claro

      const nl = 1 - l * 0.72 // marino 0.23 → 0.83
      const s = max === min ? 0 : (max - min) / (nl < 0.5 ? max + min : 2 - max - min)
      let h = 0
      if (max !== min) {
        if (max === r) h = (g - b) / (max - min) + (g < b ? 6 : 0)
        else if (max === g) h = (b - r) / (max - min) + 2
        else h = (r - g) / (max - min) + 4
        h /= 6
      }
      const q = nl < 0.5 ? nl * (1 + s) : nl + s - nl * s
      const p = 2 * nl - q
      const canal = (t) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }
      out[o] = Math.round(canal(h + 1 / 3) * 255)
      out[o + 1] = Math.round(canal(h) * 255)
      out[o + 2] = Math.round(canal(h - 1 / 3) * 255)
    }
  }
  return out
}

async function construirLogo() {
  console.log('\n▸ LOGO\n')
  const origen = path.join(IMG, 'logo-visual-connections.jpg')
  const { data, info } = await sharp(origen)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height } = info
  const rgba = blancoATransparente(data, info)
  const crudo = { raw: { width, height, channels: 4 } }

  // 1. Lockup completo, tema claro
  const claro = await sharp(rgba, crudo).trim({ threshold: 1 }).webp({ quality: 92 }).toBuffer()
  await writeFile(path.join(IMG, 'logo-full.webp'), claro)
  console.log(`  ✓ logo-full.webp        lockup, tema claro      ${kb(claro.length)}`)

  // 2. Lockup completo, tema oscuro (solo se aclara el texto, x >= 210)
  const rgbaOscuro = aclararParaFondoOscuro(rgba, width, height, 210)
  const oscuro = await sharp(rgbaOscuro, crudo).trim({ threshold: 1 }).webp({ quality: 92 }).toBuffer()
  await writeFile(path.join(IMG, 'logo-full-dark.webp'), oscuro)
  console.log(`  ✓ logo-full-dark.webp   lockup, tema oscuro     ${kb(oscuro.length)}`)

  // 3. Isotipo solo (la antena) — se usa en la marca animada y el favicon.
  //    sharp aplica trim() antes que extract(), así que el recorte va en su
  //    propia pasada y el resto se encadena sobre el resultado.
  const isotipo = await sharp(rgba, crudo)
    .extract({ left: 0, top: 0, width: 208, height })
    .png()
    .toBuffer()

  const marca = await sharp(isotipo)
    .trim({ threshold: 1 })
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 95 })
    .toBuffer()
  await writeFile(path.join(IMG, 'logo-mark.webp'), marca)
  console.log(`  ✓ logo-mark.webp        isotipo (antena)        ${kb(marca.length)}`)

  // 4. Favicon
  const favicon = await sharp(isotipo)
    .trim({ threshold: 1 })
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
  await writeFile(path.join(RAIZ, 'public', 'favicon.png'), favicon)
  console.log(`  ✓ favicon.png           180×180                 ${kb(favicon.length)}`)
}

// ------------------------------------------------------------------ main ----

const manifiesto = await convertirFotos()
await construirLogo()

await mkdir(path.join(RAIZ, 'src'), { recursive: true })
await writeFile(
  path.join(RAIZ, 'src', 'galeria.js'),
  `// Generado por scripts/build-assets.mjs — no editar a mano.\n` +
    `export const GALERIA = ${JSON.stringify(manifiesto, null, 2)}\n`,
)
console.log('\n  ✓ src/galeria.js actualizado\n')
