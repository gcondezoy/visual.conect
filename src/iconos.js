/**
 * Mapa explícito de iconos.
 *
 * Las secciones eligen su icono por nombre desde data.js. Resolver ese nombre
 * contra el paquete entero (`import * as Icons`) obliga a empaquetar los miles
 * de iconos de Phosphor: son varios MB de JavaScript. Declarándolos aquí uno a
 * uno, el bundle solo carga los que realmente se usan.
 *
 * Al añadir un icono nuevo en data.js, hay que registrarlo también aquí.
 */
import {
  CheckCircle,
  Handshake,
  Heart,
  ListChecks,
  Medal,
  PlugsConnected,
  Scales,
  ShieldCheck,
  Truck,
  UsersThree,
  Wrench,
} from '@phosphor-icons/react'

export const ICONOS = {
  // Valores corporativos
  UsersThree,
  Medal,
  Handshake,
  Scales,
  Heart,
  ShieldCheck,
  // Servicios
  Wrench,
  Truck,
  PlugsConnected,
  ListChecks,
  // Reserva
  CheckCircle,
}

export function icono(nombre, respaldo = 'CheckCircle') {
  return ICONOS[nombre] ?? ICONOS[respaldo]
}
