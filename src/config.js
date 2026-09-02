// ============================================================
//  DATOS DEL CLIENTE — Editar aquí toda la información real
// ============================================================

export const NEGOCIO = {
  nombre: 'Corporación Visual Connections',
  nombreCorto: 'Visual Connections',
  // Inicio de actividades según ficha RUC (19/09/2017).
  fundacion: 2017,
  fundacionFecha: '2017-09-19',

  // --- Contacto ---
  // WhatsApp en formato internacional SIN el signo "+" ni espacios
  // (51 = Perú). Aquí llegan las postulaciones y las consultas.
  //
  // No hay teléfono fijo: el (01) 707-3000 que figuraba antes es la central
  // de WIN, no de Visual Connections. Los canales son correo y WhatsApp.
  whatsapp: '51922694968',
  whatsappVisible: '922 694 968', // cómo se muestra en pantalla
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
//
// ORDEN: de sur a norte (Lima → Trujillo → Chiclayo → Piura), que es como se
// leen los puntos del mapa de abajo hacia arriba. Este arreglo alimenta las
// pestañas de la sección Sedes y el listado de Contáctanos, así que al
// agregar o mover una sede hay que respetar el orden por latitud para que
// pestañas y mapa sigan coincidiendo.
//
// El número de cuadrillas por sede se omite a propósito: cambia cada semana.
// La cifra que se comunica es la nacional (ver CUADRILLAS_NACIONAL).
// lat/lon ubican el punto en el mapa del Perú.
export const SEDES = [
  {
    id: 'lima',
    ciudad: 'Lima',
    etiqueta: 'Sede Principal',
    direccion: 'Jr. 12 de Julio Nro. 201, Urb. Mesa Redonda — SMP',
    servicios: 'Averías, traslados, instalaciones y ordenamiento',
    lat: -12.05,
    lon: -77.05,
  },
  {
    id: 'trujillo',
    ciudad: 'Trujillo',
    etiqueta: 'Sucursal',
    direccion: 'Mza. C Lote. 2, Urb. Santa Otilia',
    servicios: 'Averías, instalaciones, ordenamiento y etiquetado',
    lat: -8.11,
    lon: -79.03,
  },
  {
    id: 'chiclayo',
    ciudad: 'Chiclayo',
    etiqueta: 'Sucursal',
    direccion: 'Otr. Prol. Bolognesi Nro. Sub Lote. A-10, Fnd. Cerropón',
    servicios: 'Averías, instalaciones, ordenamiento y etiquetado',
    lat: -6.77,
    lon: -79.84,
  },
  {
    id: 'piura',
    ciudad: 'Piura',
    etiqueta: 'Sucursal',
    direccion: 'Mza. M Lote. 44, A.H. Alm. Miguel Grau (2da etapa)',
    servicios: 'Averías, instalaciones, ordenamiento y etiquetado',
    lat: -5.19,
    lon: -80.63,
  },
]

// Cifra nacional aproximada: se actualiza semana a semana, por eso se
// comunica como promedio y no como número exacto por sede.
export const CUADRILLAS_NACIONAL = '+50'

// --- Áreas para el formulario "Trabaja con nosotros" ---
export const AREAS_POSTULACION = [
  'Técnico Principal',
  'Técnico Auxiliar',
  'Área Comercial / Ventas',
  'Administración',
  'Otro',
]

// Años cumplidos de experiencia, calculados desde el inicio de actividades.
// Así la cifra sigue siendo correcta con el paso del tiempo, en vez de
// quedar escrita a mano y envejecer.
export function aniosDeExperiencia(hoy = new Date()) {
  const inicio = new Date(NEGOCIO.fundacionFecha)
  let anios = hoy.getFullYear() - inicio.getFullYear()
  const yaCumplio =
    hoy.getMonth() > inicio.getMonth() ||
    (hoy.getMonth() === inicio.getMonth() && hoy.getDate() >= inicio.getDate())
  if (!yaCumplio) anios -= 1
  return anios
}
