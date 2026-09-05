/**
 * Prueba de recorte del fondo de la foto del hero.
 *
 * No sirve un umbral de color: los cascos y el plano también son blancos y
 * desaparecerían con el fondo. En su lugar se rellena desde los bordes hacia
 * dentro, de modo que solo se marca el blanco CONECTADO al borde. Lo que
 * queda encerrado por píxeles oscuros —los cascos— se conserva.
 *
 * Uso:  node scripts/recortar-hero.mjs <archivo>
 */
import sharp from 'sharp'
import path from 'node:path'

const entrada = process.argv[2]
if (!entrada) throw new Error('Falta la ruta de la imagen')

// Un píxel cuenta como fondo si sus tres canales superan este valor.
// Medido sobre esta foto: el fondo va de 243 a 251 y los cascos no pasan de
// 235, así que el corte tiene que caer en medio. Cuanto más bajo, más se
// recorta —y a partir de 240 empieza a comerse los cascos—.
const UMBRAL = Number(process.argv[3]) || 240

const { data, info } = await sharp(entrada).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H } = info

const esClaro = (i) => data[i] >= UMBRAL && data[i + 1] >= UMBRAL && data[i + 2] >= UMBRAL

// --- Relleno por difusión desde el borde -----------------------------------
const fondo = new Uint8Array(W * H)
const cola = new Int32Array(W * H)
let cabeza = 0
let cruz = 0

const encolar = (x, y) => {
  const p = y * W + x
  if (fondo[p]) return
  if (!esClaro(p * 4)) return
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

// --- Alfa ------------------------------------------------------------------
const salida = Buffer.alloc(W * H * 4)
let recortados = 0
for (let p = 0; p < W * H; p++) {
  const i = p * 4
  const o = p * 4
  salida[o] = data[i]
  salida[o + 1] = data[i + 1]
  salida[o + 2] = data[i + 2]
  if (fondo[p]) {
    salida[o + 3] = 0
    recortados++
  } else {
    salida[o + 3] = 255
  }
}

const destino = path.join(path.dirname(entrada), 'hero-recorte-prueba.webp')
await sharp(salida, { raw: { width: W, height: H, channels: 4 } })
  .webp({ quality: 86, alphaQuality: 100 })
  .toFile(destino)

// Contraprueba: la misma imagen sobre un fondo oscuro, para ver si quedan
// halos blancos o si se comió parte de los cascos.
const contraste = path.join(path.dirname(entrada), 'hero-recorte-contraste.png')
await sharp({
  create: { width: W, height: H, channels: 4, background: { r: 18, g: 34, b: 52, alpha: 1 } },
})
  .composite([{ input: await sharp(salida, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer() }])
  .png()
  .toFile(contraste)

console.log(`  imagen      : ${W}×${H}`)
console.log(`  recortado   : ${((recortados / (W * H)) * 100).toFixed(1)} % de los píxeles`)
console.log(`  resultado   : ${path.basename(destino)}`)
console.log(`  contraprueba: ${path.basename(contraste)}`)
