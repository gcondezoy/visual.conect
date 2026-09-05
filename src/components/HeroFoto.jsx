import { Broadcast, MapPin } from '@phosphor-icons/react'
import { CUADRILLAS_NACIONAL } from '../config.js'
import './HeroFoto.css'

/**
 * Visual del hero: el equipo técnico, recortado sobre el fondo de la página.
 *
 * La foto venía con fondo blanco de estudio. Se recortó rellenando desde los
 * bordes hacia dentro —no por umbral de color, que habría borrado también los
 * cascos y el plano, que son blancos— y ahora las figuras se apoyan
 * directamente sobre la página, sin marco.
 */
export default function HeroFoto() {
  return (
    <div className="herofoto">
      <img
        className="herofoto-img"
        src="/img/hero/equipo-tecnico.webp"
        width="897"
        height="657"
        alt="Tres técnicos de Visual Connections revisando un plano de red de fibra óptica"
        fetchPriority="high"
      />

      {/* Fichas al vuelo: cifran lo que la foto sugiere. */}
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
