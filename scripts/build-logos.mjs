/**
 * Normaliza los logotipos de las operadoras para la sección de socios.
 *
 * Llegan de fuentes distintas y con problemas distintos: distinto tamaño,
 * distinto margen sobrante y, en el caso de Claro, con el damero de
 * transparencia quemado como píxeles. Este script los deja comparables:
 * recortados al contenido, con fondo transparente y en WebP.
 *
 * Uso:  node scripts/build-logos.mjs
 */
import sharp from 'sharp'
import { mkdir, readdir, rename, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const RAIZ = path.resolve(import.meta.dirname, '..')
const ORIGEN = path.join(RAIZ, 'public', 'img', 'Logos empresas')
const DESTINO = path.join(RAIZ, 'public', 'img', 'marcas')
const ARCHIVO = path.join(RAIZ, '_originales', 'marcas')

// El lado mayor de cada logo. Se muestran a unos 130 px, así que esto da
// holgura de sobra en pantallas de alta densidad.
const LADO_MAX = 420

// Archivo de origen -> nombre de salida. Se identifica por un fragmento del
// nombre porque las descargas traen sufijos largos y variables.
const MARCAS = [
  { salida: 'win', busca: 'open-graph', limpiarFondo: false },
  { salida: 'entel', busca: 'entel', limpiarFondo: false },
  { salida: 'claro', busca: 'claro', limpiarFondo: true },
  { salida: 'directv', busca: 'directv', limpiarFondo: false },
]

/**
 * Quita el fondo rellenando desde los bordes hacia dentro.
 *
 * No sirve un umbral de color: el logo de Claro lleva texto blanco dentro
 * del círculo rojo y un umbral lo borraría junto con el fondo. Al difundir
 * desde el borde solo se marca lo que está conectado a él, así que lo que
 * queda encerrado por el rojo se conserva.
 *
 * Reconoce como fondo tanto el blanco como el gris del damero: ambos son
 * claros y sin saturación.
 */
function quitarFondo(data, info) {
  const { width: W, height: H } = info
  const esFondo = (p) => {
    const i = p * 4
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]]
    const claro = r > 225 && g > 225 && b > 225
    const gris = Math.max(r, g, b) - Math.min(r, g, b) < 12
    return claro && gris
  }

  const fondo = new Uint8Array(W * H)
  const cola = new Int32Array(W * H)
  let cabeza = 0
  let cruz = 0

  const encolar = (x, y) => {
    const p = y * W + x
    if (fondo[p] || !esFondo(p)) return
    fondo[p] = 1
    cola[cruz++] = p
  }

  for (let x = 0; x < W; x++) {
    encolar(x, 0)
    encolar(x, H - 1)
  }
  for (let y = 0; y < H; y++) {
    encolar(0, y)
    encolar(W - 1, y)
  }
  while (cabeza < cruz) {
    const p = cola[cabeza++]
    const x = p % W
    const y = (p / W) | 0
    if (x > 0) encolar(x - 1, y)
    if (x < W - 1) encolar(x + 1, y)
    if (y > 0) encolar(x, y - 1)
    if (y < H - 1) encolar(x, y + 1)
  }

  const salida = Buffer.from(data)
  for (let p = 0; p < W * H; p++) if (fondo[p]) salida[p * 4 + 3] = 0
  return salida
}

// ---------------------------------------------------------------------------

await mkdir(DESTINO, { recursive: true })

if (!existsSync(ORIGEN)) {
  console.log(`  · ${path.basename(ORIGEN)}: ya archivada, nada que procesar`)
  process.exit(0)
}

const archivos = await readdir(ORIGEN)
const manifiesto = {}

for (const marca of MARCAS) {
  const archivo = archivos.find((f) => f.toLowerCase().includes(marca.busca))
  if (!archivo) {
    console.log(`  ! ${marca.salida}: no se encontró el archivo de origen`)
    continue
  }

  const entrada = path.join(ORIGEN, archivo)
  let img = sharp(entrada).ensureAlpha()

  if (marca.limpiarFondo) {
    const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
    img = sharp(quitarFondo(data, info), {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
  }

  // trim() se aplica antes que resize() en sharp, así que el recorte de los
  // márgenes transparentes va en su propia pasada.
  const recortado = await img.png().toBuffer()
  const { data: buf, info } = await sharp(recortado)
    .trim({ threshold: 1 })
    .resize(LADO_MAX, LADO_MAX, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toBuffer({ resolveWithObject: true })

  await writeFile(path.join(DESTINO, `${marca.salida}.webp`), buf)
  manifiesto[marca.salida] = { ancho: info.width, alto: info.height }

  console.log(
    `  ✓ ${marca.salida.padEnd(8)} ${String(info.width).padStart(3)}×${String(info.height).padEnd(3)}  ${(buf.length / 1024).toFixed(0)} kB` +
      (marca.limpiarFondo ? '  (fondo retirado)' : ''),
  )
}

// Los originales se apartan fuera de public/: no se publican, pero se
// conservan por si hay que regenerarlos.
await mkdir(path.dirname(ARCHIVO), { recursive: true })
if (!existsSync(ARCHIVO)) {
  await rename(ORIGEN, ARCHIVO)
  console.log(`\n  · originales archivados en _originales/marcas/`)
}

console.log(`\n  proporciones: ${Object.entries(manifiesto)
  .map(([k, v]) => `${k} ${(v.ancho / v.alto).toFixed(2)}:1`)
  .join('  ')}`)
