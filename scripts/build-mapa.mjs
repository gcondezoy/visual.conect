/**
 * Genera el contorno del Perú para el componente MapaPeru.
 *
 * Toma la geometría real de Natural Earth (world-atlas, 1:50M), la recorta al
 * territorio continental, la proyecta y la escribe como un path de SVG ya
 * resuelto. Así el navegador no carga datos cartográficos: solo recibe una
 * cadena de unos pocos kB.
 *
 * Uso:  node scripts/build-mapa.mjs
 */
import { readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import * as topojson from 'topojson-client'

const require = createRequire(import.meta.url)
const RAIZ = path.resolve(import.meta.dirname, '..')

// --- Ventana de proyección --------------------------------------------------
const ANCHO = 400
const MARGEN = 6

// --- Geometría --------------------------------------------------------------
const archivo = require.resolve('world-atlas/countries-50m.json')
const topo = JSON.parse(await readFile(archivo, 'utf8'))
const paises = topojson.feature(topo, topo.objects.countries)

const peru = paises.features.find((f) => f.properties.name === 'Peru')
if (!peru) throw new Error('No se encontró Perú en el conjunto de datos')

// Un MultiPolygon incluye islas menores; nos quedamos con los anillos que
// aportan silueta y descartamos el ruido de islotes.
const anillos = (
  peru.geometry.type === 'Polygon' ? [peru.geometry.coordinates] : peru.geometry.coordinates
)
  .map((poly) => poly[0]) // anillo exterior de cada polígono
  .filter((anillo) => anillo.length > 12)

// --- Encuadre ---------------------------------------------------------------
const todos = anillos.flat()
const lons = todos.map(([lon]) => lon)
const lats = todos.map(([, lat]) => lat)
const lon0 = Math.min(...lons)
const lon1 = Math.max(...lons)
const lat0 = Math.min(...lats)
const lat1 = Math.max(...lats)

// Proyección equirectangular con corrección por latitud: a lo alto del Perú
// (0° a -18°) sin corregir, el país sale perceptiblemente estirado.
const latMedia = ((lat0 + lat1) / 2) * (Math.PI / 180)
const k = Math.cos(latMedia)

const anchoUtil = ANCHO - MARGEN * 2
const escala = anchoUtil / ((lon1 - lon0) * k)
const ALTO = Math.round((lat1 - lat0) * escala + MARGEN * 2)

const px = (lon) => MARGEN + (lon - lon0) * k * escala
const py = (lat) => MARGEN + (lat1 - lat) * escala

// --- Path -------------------------------------------------------------------
const d = anillos
  .map(
    (anillo) =>
      anillo
        .map(
          ([lon, lat], i) =>
            `${i === 0 ? 'M' : 'L'}${px(lon).toFixed(1)} ${py(lat).toFixed(1)}`,
        )
        .join('') + 'Z',
  )
  .join('')

const salida = `// Generado por scripts/build-mapa.mjs — no editar a mano.
// Contorno del Perú (Natural Earth 1:50M) ya proyectado al viewBox.

export const MAPA = {
  ancho: ${ANCHO},
  alto: ${ALTO},
  path: '${d}',
}

// Convierte lat/lon reales a coordenadas del viewBox, para ubicar las sedes
// con la misma proyección que el contorno.
export function proyectar(lat, lon) {
  const k = ${k.toFixed(10)}
  const escala = ${escala.toFixed(6)}
  return {
    x: ${MARGEN} + (lon - ${lon0}) * k * escala,
    y: ${MARGEN} + (${lat1} - lat) * escala,
  }
}
`

await writeFile(path.join(RAIZ, 'src', 'mapa-peru.js'), salida)

console.log(`  ✓ src/mapa-peru.js`)
console.log(`    anillos: ${anillos.length}   puntos: ${todos.length}`)
console.log(`    viewBox: ${ANCHO} × ${ALTO}`)
console.log(`    path:    ${(d.length / 1024).toFixed(1)} kB`)
