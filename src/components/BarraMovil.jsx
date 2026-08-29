import { useEffect, useRef, useState } from 'react'
import { Briefcase, WhatsappLogo } from '@phosphor-icons/react'
import { buildWhatsAppLink } from '../whatsapp.js'
import './BarraMovil.css'

/**
 * Barra de acciones fija al pie, solo en móvil.
 *
 * En el celular las dos acciones que importan —postular y escribir— quedaban
 * a varias pantallas de distancia según dónde estuviera la persona leyendo.
 * Esta barra las deja siempre a un toque.
 *
 * Se esconde sola dentro de las secciones de formulario: ahí los botones de
 * verdad ya están en pantalla y taparlos con una barra sería redundante.
 */
export default function BarraMovil() {
  const [visible, setVisible] = useState(false)
  const centinela = useRef(null)
  const enFormulario = useRef(false)

  // Aparece una vez pasado el hero.
  useEffect(() => {
    const el = centinela.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      setVisible(!e.isIntersecting && !enFormulario.current)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Se retira mientras se está dentro de "Trabaja" o "Contáctanos".
  useEffect(() => {
    const secciones = ['trabaja', 'contacto']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!secciones.length) return

    const dentro = new Set()
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) dentro.add(e.target)
          else dentro.delete(e.target)
        }
        enFormulario.current = dentro.size > 0
        if (enFormulario.current) setVisible(false)
        else if (window.scrollY > 700) setVisible(true)
      },
      { rootMargin: '-25% 0px -25% 0px' },
    )
    secciones.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div ref={centinela} className="barra-movil-centinela" aria-hidden="true" />

      <div className={`barra-movil ${visible ? 'is-visible' : ''}`} inert={!visible || undefined}>
        <a href="#trabaja" className="barra-movil-btn barra-movil-btn--principal">
          <Briefcase weight="fill" size={17} />
          Postular
        </a>
        <a
          href={buildWhatsAppLink('¡Hola Visual Connections! Quiero más información.')}
          className="barra-movil-btn barra-movil-btn--wa"
          target="_blank"
          rel="noreferrer"
        >
          <WhatsappLogo weight="fill" size={17} />
          Escríbenos
        </a>
      </div>
    </>
  )
}
