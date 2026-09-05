import { Broadcast, MapPin } from '@phosphor-icons/react'
import { CUADRILLAS_NACIONAL } from '../config.js'
import './HeroFoto.css'

/**
 * OPCIÓN C del visual del hero: fotografía enmarcada.
 *
 * La imagen mide 735×412, así que da de sobra en esta columna (unos 430 px)
 * pero se vería pixelada estirada como fondo a pantalla completa. Por eso va
 * enmarcada y no de fondo.
 *
 * Dos fichas superpuestas rompen el rectángulo y aportan el dato duro que la
 * foto sola no da.
 */
export default function HeroFoto() {
  return (
    <div className="herofoto">
      <figure className="herofoto-marco">
        <img
          src="/img/hero/tecnico-torre.webp"
          width="735"
          height="412"
          alt="Técnico de Visual Connections trabajando en una antena de telecomunicaciones"
          fetchPriority="high"
        />
      </figure>

      {/* Fichas al vuelo: dan profundidad y cifran lo que la foto sugiere. */}
      <div className="herofoto-ficha herofoto-ficha--cuadrillas">
        <Broadcast weight="fill" size={18} />
        <span>
          <strong>{CUADRILLAS_NACIONAL}</strong>
          cuadrillas en campo
        </span>
      </div>

      <div className="herofoto-ficha herofoto-ficha--sedes">
        <MapPin weight="fill" size={18} />
        <span>
          <strong>4 sedes</strong>
          cobertura nacional
        </span>
      </div>
    </div>
  )
}
