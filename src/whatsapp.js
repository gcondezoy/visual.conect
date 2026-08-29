import { NEGOCIO } from './config.js'

// Construye un enlace wa.me con el mensaje ya codificado.
export function buildWhatsAppLink(mensaje, numero = NEGOCIO.whatsapp) {
  const texto = encodeURIComponent(mensaje)
  return `https://wa.me/${numero}?text=${texto}`
}

// Abre WhatsApp en una pestaña nueva con el mensaje.
export function openWhatsApp(mensaje, numero) {
  window.open(buildWhatsAppLink(mensaje, numero), '_blank', 'noopener,noreferrer')
}
