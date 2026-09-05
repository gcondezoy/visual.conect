// ============================================================
//  CONTENIDO DE LA LANDING — textos, servicios, valores, etc.
// ============================================================

import { aniosDeExperiencia } from './config.js'

export const EMPRESA_DESCRIPCION =
  'Con experiencia desde 2017 en el rubro, cubrimos las necesidades del mercado en cuanto a experiencia, puntualidad, calidad y garantía respecto a trabajos de instalación y mantenimiento y/o averías de clientes hogar y empresas que requieran los servicios de internet, cable y telefonía a nivel nacional.'

export const MISION =
  'La satisfacción de nuestros clientes de recibir un servicio de calidad, así como un trato cordial por parte de nuestros colaboradores. Toda asignación deberá ser atendida siempre con los más altos estándares y cumpliendo con los parámetros que nuestros socios establezcan.'

export const VISION =
  'Tenemos como meta consolidarnos como una empresa líder en el rubro de las telecomunicaciones, con constante renovación y capacitación. Nuestros colaboradores harán que Corporación Visual Connections sea una marca reconocida a nivel nacional e internacional.'

export const VALORES = [
  { nombre: 'Trabajo en equipo', icono: 'UsersThree' },
  { nombre: 'Profesionalismo', icono: 'Medal' },
  { nombre: 'Compromiso', icono: 'Handshake' },
  { nombre: 'Ética', icono: 'Scales' },
  { nombre: 'Respeto', icono: 'Heart' },
  { nombre: 'Confiabilidad', icono: 'ShieldCheck' },
]

// --- Socios estratégicos ---
//
// `escala` corrige el peso óptico de cada logotipo. Encajados en una misma
// caja, los muy alargados (DIRECTV, 5,3:1) se ven enormes y los compactos
// (Claro, cuadrado) diminutos, aunque midan lo mismo. El ajuste es a ojo,
// como en cualquier muro de marcas.
export const SOCIOS = [
  {
    nombre: 'WIN',
    logotipo: 'win',
    logo: '/img/marcas/win.webp',
    escala: 0.74,
    tagline: 'Internet 100% Fibra Óptica',
    descripcion:
      'Empresa líder a nivel nacional en brindar el servicio de internet por fibra óptica. Corporación Visual Connections forma parte del staff de partners que realizan las tareas de instalación y visitas técnicas a los clientes finales.',
    color: '#FF6B00',
  },
  {
    nombre: 'ENTEL',
    logotipo: 'entel',
    logo: '/img/marcas/entel.webp',
    escala: 0.95,
    tagline: 'Conectividad Móvil y Fija',
    descripcion:
      'Empresa de servicios de conectividad móvil y fija: internet por fibra óptica, internet inalámbrico, líneas móviles y equipos telefónicos. Somos parte del staff que realiza las tareas de venta de servicios de fibra óptica.',
    color: '#0099DD',
  },
]

// --- Operadoras con las que ya se ha trabajado ---
// Respaldan la trayectoria: son trabajos anteriores, no alianzas vigentes.
export const OPERADORAS_PREVIAS = [
  { nombre: 'Claro', logotipo: 'claro', logo: '/img/marcas/claro.webp', escala: 1.12, color: '#DA291C' },
  // DIRECTV va en versales; el resto de marcas usa minúsculas.
  { nombre: 'DIRECTV', logotipo: 'DIRECTV', logo: '/img/marcas/directv.webp', escala: 0.85, color: '#00A0DF' },
]

// Las cuatro marcas en una sola lista, al mismo nivel visual. `vigente`
// distingue la alianza actual del trabajo ya realizado, sin relegar a nadie
// a un renglón secundario.
export const MARCAS = [
  ...SOCIOS.map((s) => ({ ...s, vigente: true })),
  ...OPERADORAS_PREVIAS.map((o) => ({ ...o, vigente: false })),
]

// --- Servicios principales ---
export const SERVICIOS = [
  {
    id: 'averias',
    titulo: 'Averías',
    icono: 'Wrench',
    descripcion:
      'Diagnóstico y resolución rápida de fallas en el servicio de internet, cable y telefonía, con estándares de calidad y tiempos de respuesta óptimos.',
  },
  {
    id: 'traslados',
    titulo: 'Traslados',
    icono: 'Truck',
    descripcion:
      'Gestión de mudanzas y cambio de ubicación del servicio del cliente, garantizando continuidad y una reinstalación impecable.',
  },
  {
    id: 'instalaciones',
    titulo: 'Instalaciones',
    icono: 'PlugsConnected',
    descripcion:
      'Nuevas conexiones a fibra óptica para hogares y empresas, ejecutadas por cuadrillas certificadas bajo los parámetros de nuestros socios.',
  },
  {
    id: 'ordenamiento',
    titulo: 'Ordenamiento y Etiquetado',
    icono: 'ListChecks',
    descripcion:
      'Organización, ordenamiento y etiquetado de infraestructura de red para asegurar trazabilidad, orden y un mantenimiento eficiente.',
  },
]

// --- Métricas / números clave ---
export const METRICAS = [
  // Promedio nacional: la cifra exacta cambia cada semana.
  { valor: 50, sufijo: '+', etiqueta: 'Cuadrillas a nivel nacional' },
  { valor: 4, sufijo: '', etiqueta: 'Sedes a nivel nacional' },
  // Se cuentan los años en vez de mostrar el año suelto: "2017" junto a una
  // etiqueta no termina de leerse como una frase.
  { valor: aniosDeExperiencia(), sufijo: '+', etiqueta: 'Años de experiencia' },
  { valor: 100, sufijo: '%', etiqueta: 'Compromiso y calidad' },
]

// --- Propuesta laboral (sección Trabaja con nosotros) ---
export const PROPUESTA_LABORAL = {
  cargos: 'Técnico Principal / Técnico Auxiliar',
  ubicacion: 'Lima Metropolitana',
  contrato: 'Planilla — Régimen MYPE (BBSS 50%)',
  jornada:
    'Disponibilidad para trabajar feriados y domingos, con descansos rotativos (se alternan domingos).',
  // La remuneración se conversa en la entrevista, no se publica en la web.
  beneficios: [
    'Ingreso a planilla desde el primer día',
    'Capacitación y certificación con WIN y ENTEL',
    'Equipo, uniforme y herramientas a cargo de la empresa',
    'Línea de crecimiento a Técnico Principal',
  ],
  requisitos: [
    'Experiencia en telecomunicaciones (deseable)',
    'Disponibilidad de horario rotativo',
    'Licencia de conducir (según el cargo)',
    'Actitud de servicio y trabajo en equipo',
  ],
}
