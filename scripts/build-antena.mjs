/**
 * Vectoriza el isotipo (la antena parabólica) para mostrarlo en grande.
 *
 * El único original disponible es un raster de 512 px con compresión JPEG:
 * a tamaño de sección se ve blando. Tampoco hay un logo mayor en el material
 * del cliente (la presentación lo trae aún más pequeño). Así que se calca:
 *
 *   1. Se amplía el isotipo y se clasifica cada píxel por color en las cinco
 *      piezas del logo: arco rojo, plato, borde del plato, bocina y ondas.
 *   2. Cada pieza se calca por separado con potrace (curvas de Bézier).
 *   3. Cada pieza se rellena con un degradado medido sobre el propio original,
 *      no con colores elegidos a ojo.
 *
 * El resultado es un SVG nítido a cualquier tamaño y fiel al logo.
 *
 * Uso:  node scripts/build-antena.mjs
 */
import sharp from 'sharp'
import potrace from 'potrace'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const RAIZ = path.resolve(import.meta.dirname, '..')
const ORIGEN = path.join(RAIZ, 'public', 'img', 'logo-mark.webp')
const DESTINO = path.join(RAIZ, 'public', 'img', 'antena-vc.svg')

// Lado de trabajo. Cuanto más grande, más suaves salen las curvas del calco.
const S = 2048

// ------------------------------------------------------------ Clasificación

/**
 * Devuelve la pieza del logo a la que pertenece un píxel y cuánta tinta
 * tiene, o null si es papel.
 *
 * Los bordes del logo están suavizados: un píxel del borde es una mezcla del
 * color de la pieza con el blanco del fondo. Por eso los márgenes de color
 * se miden en proporción a la tinta y no en valores absolutos; si no, los
 * tramos finos del arco (que son casi todo borde) se perdían.
 */
function clasificar(r, g, b, x, y) {
  const tinta = 255 - Math.min(r, g, b)
  if (tinta < 24) return null

  const rojo = r - b > 0.3 * tinta && r - g > 0.12 * tinta
  // El borde del plato es un azul marino casi negro, con muy poca diferencia
  // entre el azul y el rojo: el margen tiene que ser bajo para no perderlo.
  const azul = b - r > 0.13 * tinta && b >= g

  if (rojo) {
    // La bocina vive en el centro del plato; todo lo demás rojo es el arco.
    const enBocina = x > 0.37 * S && x < 0.69 * S && y > 0.28 * S && y < 0.67 * S
    return { pieza: enBocina ? 'bocina' : 'arco', tinta }
  }

  if (azul) {
    // Las ondas son las únicas piezas azules de la esquina superior derecha.
    if (x > 0.58 * S && y < 0.4 * S) return { pieza: 'ondas', tinta }
    return { pieza: 'plato', tinta }
  }

  return null
}

// --------------------------------------------------- Componentes conexas

/**
 * Etiqueta las islas de un mapa binario (conectividad 8). Se usa para
 * separar el borde del plato del cuerpo: los dos son azules, pero entre
 * ellos hay una línea blanca en el logo.
 */
function componentes(mascara) {
  const etiquetas = new Int32Array(S * S)
  const pila = new Int32Array(S * S)
  const areas = [0]
  let actual = 0

  for (let p = 0; p < S * S; p++) {
    if (!mascara[p] || etiquetas[p]) continue
    actual++
    let area = 0
    let tope = 0
    pila[tope++] = p
    etiquetas[p] = actual
    while (tope) {
      const q = pila[--tope]
      area++
      const qx = q % S
      const qy = (q - qx) / S
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = qx + dx
          const ny = qy + dy
          if (nx < 0 || ny < 0 || nx >= S || ny >= S) continue
          const n = ny * S + nx
          if (mascara[n] && !etiquetas[n]) {
            etiquetas[n] = actual
            pila[tope++] = n
          }
        }
      }
    }
    areas.push(area)
  }
  return { etiquetas, areas }
}

// ------------------------------------------------------------- Calco

/**
 * Calca una pieza. Recibe la tinta de cada píxel (0 a 255) y corta en la
 * mitad del suavizado del borde: ahí es donde estaba el borde real antes de
 * que la compresión lo difuminara.
 */
async function calcar(tinta, corte, suavizado = 3) {
  const gris = new Uint8Array(S * S)
  for (let p = 0; p < S * S; p++) gris[p] = 255 - tinta[p]

  // Un desenfoque leve borra el serrucho de la compresión JPEG antes de
  // umbralizar; potrace termina de suavizar al convertir en curvas.
  const png = await sharp(Buffer.from(gris), { raw: { width: S, height: S, channels: 1 } })
    .blur(suavizado)
    .threshold(255 - corte)
    .png()
    .toBuffer()

  return new Promise((ok, mal) => {
    const trazo = new potrace.Potrace({
      turdSize: 600, // descarta motas sueltas del JPEG
      optTolerance: 0.5,
      alphaMax: 1.1,
      threshold: 128,
      blackOnWhite: true,
    })
    trazo.loadImage(png, (err) => {
      if (err) return mal(err)
      const tag = trazo.getPathTag()
      ok(/d="([^"]+)"/.exec(tag)?.[1] ?? '')
    })
  })
}

// ---------------------------------------------------------- Degradados

/**
 * Mide el color real de la pieza a lo largo de una dirección y devuelve un
 * degradado de tres paradas. Así el relleno sigue al original: el arco va
 * del naranja al rojo oscuro y el plato del azul marino al celeste.
 */
function medirDegradado(rgb, mascara, [dx, dy]) {
  const largo = Math.hypot(dx, dy)
  const ux = dx / largo
  const uy = dy / largo

  let min = Infinity
  let max = -Infinity
  for (let p = 0; p < S * S; p++) {
    if (!mascara[p]) continue
    const t = (p % S) * ux + Math.floor(p / S) * uy
    if (t < min) min = t
    if (t > max) max = t
  }

  // Tres franjas: principio, medio y final de la pieza.
  const limites = [
    [0, 0.14],
    [0.43, 0.57],
    [0.86, 1],
  ]
  const franjas = limites.map(() => [0, 0, 0, 0])

  for (let p = 0; p < S * S; p++) {
    if (!mascara[p]) continue
    const t = ((p % S) * ux + Math.floor(p / S) * uy - min) / (max - min)
    limites.forEach(([a, b], i) => {
      if (t >= a && t <= b) {
        franjas[i][0] += rgb[p * 3]
        franjas[i][1] += rgb[p * 3 + 1]
        franjas[i][2] += rgb[p * 3 + 2]
        franjas[i][3]++
      }
    })
  }

  const hex = ([r, g, b, n]) =>
    '#' + [r, g, b].map((c) => Math.round(c / Math.max(n, 1)).toString(16).padStart(2, '0')).join('')

  // Extremos del degradado sobre el eje, pasando por el centro del lienzo.
  const cx = S / 2
  const cy = S / 2
  const centro = cx * ux + cy * uy
  const a = { x: cx + (min - centro) * ux, y: cy + (min - centro) * uy }
  const b = { x: cx + (max - centro) * ux, y: cy + (max - centro) * uy }

  return { stops: franjas.map(hex), a, b }
}

function colorMedio(rgb, mascara) {
  let r = 0
  let g = 0
  let b = 0
  let n = 0
  for (let p = 0; p < S * S; p++) {
    if (!mascara[p]) continue
    r += rgb[p * 3]
    g += rgb[p * 3 + 1]
    b += rgb[p * 3 + 2]
    n++
  }
  return '#' + [r, g, b].map((c) => Math.round(c / n).toString(16).padStart(2, '0')).join('')
}

// ---------------------------------------------------------------- Main

async function main() {
  const { data: rgb } = await sharp(ORIGEN)
    .flatten({ background: '#ffffff' })
    .resize(S, S, { kernel: 'lanczos3' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  // Tinta por pieza (0 a 255). Es la base del calco y, filtrada al núcleo,
  // de la medición de color.
  const piezas = {
    arco: new Uint8Array(S * S),
    bocina: new Uint8Array(S * S),
    plato: new Uint8Array(S * S),
    ondas: new Uint8Array(S * S),
  }

  for (let p = 0; p < S * S; p++) {
    const x = p % S
    const y = (p - x) / S
    const c = clasificar(rgb[p * 3], rgb[p * 3 + 1], rgb[p * 3 + 2], x, y)
    if (c) piezas[c.pieza][p] = c.tinta
  }

  // El cuerpo del plato (con el pie) es la isla que contiene la base de la
  // antena; el resto del azul es el borde. Las islas se buscan sobre la
  // tinta fuerte, donde la línea blanca que los separa sigue abierta.
  const fuerte = piezas.plato.map((t) => (t > 190 ? 1 : 0))
  const { etiquetas } = componentes(fuerte)
  const base = etiquetas[Math.round(0.92 * S) * S + Math.round(0.4 * S)]
  const cuerpo = new Uint8Array(S * S)
  const borde = new Uint8Array(S * S)
  for (let p = 0; p < S * S; p++) {
    if (!piezas.plato[p]) continue
    // Los píxeles de borde suave no tienen isla propia: van con la isla
    // fuerte más cercana en su fila (a izquierda o derecha).
    let e = etiquetas[p]
    if (!e) {
      const x = p % S
      for (let d = 1; d < 12 && !e; d++) {
        if (x - d >= 0 && etiquetas[p - d]) e = etiquetas[p - d]
        else if (x + d < S && etiquetas[p + d]) e = etiquetas[p + d]
      }
    }
    if (!e) continue
    if (e === base) cuerpo[p] = piezas.plato[p]
    else borde[p] = piezas.plato[p]
  }

  // Núcleo de cada pieza: solo los píxeles con tinta plena. Medir el color
  // sobre el borde suavizado lo aclararía, porque el borde es media mezcla
  // con el blanco del fondo.
  const nucleo = (tinta, min) => tinta.map((t) => (t > min ? 1 : 0))

  // Dirección de cada degradado, medida a ojo sobre el logo: por dónde va
  // cambiando el color de cada pieza. `corte` es la mitad de la tinta que
  // tiene la pieza en su núcleo.
  const capas = [
    { id: 'arco', tinta: piezas.arco, corte: 70, min: 150, dir: [0.25, 1] },
    // El plato y su borde traen más ruido de compresión: se suavizan más.
    { id: 'cuerpo', tinta: cuerpo, corte: 90, min: 170, dir: [0.3, 1], suavizado: 5 },
    { id: 'borde', tinta: borde, corte: 95, min: 180, plano: true, suavizado: 4.5 },
    { id: 'bocina', tinta: piezas.bocina, corte: 80, min: 160, dir: [-0.7, 1] },
    { id: 'ondas', tinta: piezas.ondas, corte: 65, min: 140, dir: [1, 1] },
  ]

  const defs = []
  const paths = []

  for (const c of capas) {
    const d = await calcar(c.tinta, c.corte, c.suavizado)
    const mascara = nucleo(c.tinta, c.min)
    if (!d) {
      console.warn(`  (sin trazo para ${c.id})`)
      continue
    }

    let fill
    if (c.plano) {
      fill = colorMedio(rgb, mascara)
    } else {
      const g = medirDegradado(rgb, mascara, c.dir)
      defs.push(
        `<linearGradient id="vc-${c.id}" gradientUnits="userSpaceOnUse" x1="${g.a.x.toFixed(0)}" y1="${g.a.y.toFixed(0)}" x2="${g.b.x.toFixed(0)}" y2="${g.b.y.toFixed(0)}">` +
          g.stops.map((s, i) => `<stop offset="${i / 2}" stop-color="${s}"/>`).join('') +
          `</linearGradient>`,
      )
      fill = `url(#vc-${c.id})`
    }

    paths.push(`<path data-pieza="${c.id}" fill="${fill}" fill-rule="evenodd" d="${d}"/>`)
    console.log(`  ${c.id} calcado`)
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" role="img" aria-label="Antena de Corporación Visual Connections">` +
    `<defs>${defs.join('')}</defs>${paths.join('')}</svg>\n`

  await writeFile(DESTINO, svg, 'utf8')
  console.log(`Listo: ${path.relative(RAIZ, DESTINO)} (${(svg.length / 1024).toFixed(1)} KB)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
