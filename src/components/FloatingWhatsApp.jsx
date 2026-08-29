import { useEffect, useState } from 'react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { buildWhatsAppLink } from '../whatsapp.js'
import './FloatingWhatsApp.css'

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={buildWhatsAppLink('¡Hola Visual Connections! Quiero más información.')}
      className={`fab-wa ${visible ? 'is-visible' : ''}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsappLogo weight="fill" size={28} />
      <span className="fab-wa__pulse" aria-hidden="true" />
    </a>
  )
}
