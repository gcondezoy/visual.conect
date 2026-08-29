// ============================================================
//  CONTENIDO DE LA LANDING — textos, servicios, valores, etc.
// ============================================================

export const EMPRESA_DESCRIPCION =
  'Creada en 2021 con la finalidad de cubrir las necesidades del mercado en cuanto a experiencia, puntualidad, calidad y garantía respecto a trabajos de instalación y mantenimiento y/o averías de clientes hogar y empresas que requieran los servicios de internet, cable y telefonía a nivel nacional.'

export const MISION =
  'La satisfacción de nuestros clientes de recibir un servicio de calidad, así como un trato cordial por parte de nuestros colaboradores. Toda asignación deberá ser atendida siempre con los más altos estándares y cumpliendo con los parámetros que nuestros socios establezcan.'

export const VISION =
  'Tenemos como meta consolidarnos como una empresa líder en el rubro de las telecomunicaciones, con constante renovación y capacitación. Nuestros colaboradores harán que Corporación Visual Connections sea una marca reconocida a nivel nacional e internacional.'

export const VALORES = [
  { nombre: 'Trabajo en equipo', icono: 'UsersThree' },
  { nombre: 'Profesionalismo', icono: 'Medal' },
  { nombre: 'Compromiso', icono: 'HandshakeIcon' },
  { nombre: 'Ética', icono: 'Scales' },
  { nombre: 'Respeto', icono: 'Heart' },
  { nombre: 'Confiabilidad', icono: 'ShieldCheck' },
]

// --- Socios estratégicos ---
export const SOCIOS = [
  {
    nombre: 'WIN',
    tagline: 'Internet 100% Fibra Óptica',
    descripcion:
      'Empresa líder a nivel nacional en brindar el servicio de internet por fibra óptica. Corporación Visual Connections forma parte del staff de partners que realizan las tareas de instalación y visitas técnicas a los clientes finales.',
    color: '#FF6B00',
  },
  {
    nombre: 'ENTEL',
    tagline: 'Conectividad Móvil y Fija',
    descripcion:
      'Empresa de servicios de conectividad móvil y fija: internet por fibra óptica, internet inalámbrico, líneas móviles y equipos telefónicos. Somos parte del staff que realiza las tareas de venta de servicios de fibra óptica.',
    color: '#0099DD',
  },
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
  { valor: 65, sufijo: '+', etiqueta: 'Cuadrillas técnicas' },
  { valor: 4, sufijo: '', etiqueta: 'Sedes a nivel nacional' },
  { valor: 2021, sufijo: '', etiqueta: 'Año de fundación', plano: true },
  { valor: 100, sufijo: '%', etiqueta: 'Compromiso y calidad' },
]

// --- Propuesta laboral (sección Trabaja con nosotros) ---
export const PROPUESTA_LABORAL = {
  cargos: 'Técnico Principal / Técnico Auxiliar',
  ubicacion: 'Lima Metropolitana',
  contrato: 'Planilla — Régimen MYPE (BBSS 50%)',
  jornada:
    'Disponibilidad para trabajar feriados y domingos, con descansos rotativos (se alternan domingos).',
  salarios: [
    { cargo: 'Técnico Principal con licencia', monto: 'S/ 1,800' },
    { cargo: 'Técnico Principal sin licencia', monto: 'S/ 1,700' },
    { cargo: 'Aux. de Técnico con licencia', monto: 'S/ 1,600' },
    { cargo: 'Aux. de Técnico sin licencia', monto: 'S/ 1,500' },
  ],
  requisitos: [
    'Experiencia en telecomunicaciones (deseable)',
    'Disponibilidad de horario rotativo',
    'Licencia de conducir (según el cargo)',
    'Actitud de servicio y trabajo en equipo',
  ],
}
