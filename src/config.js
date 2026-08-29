// ============================================================
//  DATOS DEL CLIENTE — Editar aquí toda la información real
// ============================================================

export const NEGOCIO = {
  nombre: 'Corporación Visual Connections',
  nombreCorto: 'Visual Connections',
  fundacion: 2021,

  // --- Contacto ---
  // WhatsApp en formato internacional SIN el signo "+" ni espacios
  // (51 = Perú). Aquí llegan las postulaciones y las consultas.
  whatsapp: '51955314800',
  whatsappVisible: '955 314 800', // cómo se muestra en pantalla
  telefono: '(01) 707-3000',
  email: 'contacto@visualconnections.pe',

  // --- Página hermana: KMT (área de ventas) ---
  // Reemplazar "#" por la URL real cuando esté lista.
  kmtUrl: '#',

  // --- Redes sociales (dejar '' oculta el icono) ---
  redes: {
    facebook: 'https://www.facebook.com/share/1KNQ6tjQLz/',
    instagram: '',
    linkedin: '',
  },

  // --- Horarios de atención ---
  horarios: [
    { dias: 'Lunes a Viernes', horas: '8:00 a.m. – 6:00 p.m.' },
    { dias: 'Sábados', horas: '9:00 a.m. – 1:00 p.m.' },
    { dias: 'Domingos', horas: 'Cerrado' },
  ],
}

// --- Sedes / sucursales ---
export const SEDES = [
  {
    id: 'lima',
    ciudad: 'Lima',
    etiqueta: 'Sede Principal',
    direccion: 'Jr. 12 de Julio Nro. 201, Urb. Mesa Redonda — SMP',
    cuadrillas: 40,
    cuadrillasTexto: '+40 cuadrillas',
    servicios: 'Averías, traslados, instalaciones y ordenamiento',
  },
  {
    id: 'trujillo',
    ciudad: 'Trujillo',
    etiqueta: 'Sucursal',
    direccion: 'Mza. C Lote. 2, Urb. Santa Otilia',
    cuadrillas: 9,
    cuadrillasTexto: '09 cuadrillas',
    servicios: 'Averías, instalaciones, ordenamiento y etiquetado',
  },
  {
    id: 'piura',
    ciudad: 'Piura',
    etiqueta: 'Sucursal',
    direccion: 'Mza. M Lote. 44, A.H. Alm. Miguel Grau (2da etapa)',
    cuadrillas: 5,
    cuadrillasTexto: '05 cuadrillas',
    servicios: 'Averías, instalaciones, ordenamiento y etiquetado',
  },
  {
    id: 'chiclayo',
    ciudad: 'Chiclayo',
    etiqueta: 'Sucursal',
    direccion: 'Otr. Prol. Bolognesi Nro. Sub Lote. A-10, Fnd. Cerropón',
    cuadrillas: 11,
    cuadrillasTexto: '11 cuadrillas',
    servicios: 'Averías, instalaciones, ordenamiento y etiquetado',
  },
]

// --- Áreas para el formulario "Trabaja con nosotros" ---
export const AREAS_POSTULACION = [
  'Técnico Principal',
  'Técnico Auxiliar',
  'Área Comercial / Ventas',
  'Administración',
  'Otro',
]
