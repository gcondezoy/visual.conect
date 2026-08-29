import { useEffect, useRef, useState } from 'react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { buildWhatsAppLink } from '../whatsapp.js'
import './FloatingWhatsApp.css'

/**
 * Botón flotante de WhatsApp.
 *
 * Se esconde cuando ya hay un botón de WhatsApp en pantalla (los formularios
 * de postulación y contacto): en móvil el flotante caía justo encima del
 * botón de enviar, y ofrecer dos veces la misma acción confunde.
 */
export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)
  const centinela = useRef(null)
  const ctaAlaVista = useRef(false)

  // Aparece pasado el hero. Se lee el scroll dentro del rAF del centinela para
  // no encadenar un listener más.
  useEffect(() => {
    const el = centinela.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      setVisible(!e.isIntersecting && !ctaAlaVista.current)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Vigila los CTA de WhatsApp del documento: mientras alguno esté visible,
  // el flotante se retira.
  useEffect(() => {
    const ctas = document.querySelectorAll('.btn-whatsapp')
    if (!ctas.length) return

    const visibles = new Set()
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) visibles.add(e.target)
          else visibles.delete(e.target)
        }
        ctaAlaVista.current = visibles.size > 0
        if (ctaAlaVista.current) setVisible(false)
        else if (window.scrollY > 600) setVisible(true)
      },
      { rootMargin: '-8% 0px -8% 0px' },
    )
    ctas.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div ref={centinela} className="fab-wa-centinela" aria-hidden="true" />
      <a
        href={buildWhatsAppLink('¡Hola Visual Connections! Quiero más información.')}
        className={`fab-wa ${visible ? 'is-visible' : ''}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Escríbenos por WhatsApp"
        tabIndex={visible ? 0 : -1}
      >
        <WhatsappLogo weight="fill" size={28} />
        <span className="fab-wa__pulse" aria-hidden="true" />
      </a>
    </>
  )
}
