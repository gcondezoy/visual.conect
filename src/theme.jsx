import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

const CLAVE = 'vc-tema'

function leerGuardado() {
  try {
    const v = localStorage.getItem(CLAVE)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null // modo privado o almacenamiento bloqueado
  }
}

// El tema inicial ya lo resolvió el script inline de index.html (evita el
// parpadeo al cargar). Aquí solo se lee lo que quedó puesto en <html>.
function temaInicial() {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(temaInicial)

  // Solo refleja el estado en el DOM. No escribe en localStorage: guardar aquí
  // marcaría una preferencia que nadie eligió y dejaría de seguirse la del
  // sistema para siempre.
  useEffect(() => {
    document.documentElement.dataset.theme = tema
  }, [tema])

  // Mientras no haya una elección explícita, seguimos al sistema en vivo.
  useEffect(() => {
    if (leerGuardado()) return

    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const alCambiar = (e) => setTema(e.matches ? 'light' : 'dark')
    mq.addEventListener('change', alCambiar)
    return () => mq.removeEventListener('change', alCambiar)
  }, [])

  // La elección manual sí se recuerda.
  const alternar = useCallback(() => {
    setTema((actual) => {
      const siguiente = actual === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(CLAVE, siguiente)
      } catch {
        // Sin almacenamiento el tema igual cambia; solo no se recuerda.
      }
      return siguiente
    })
  }, [])

  return <ThemeContext.Provider value={{ tema, alternar }}>{children}</ThemeContext.Provider>
}

export function useTema() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTema debe usarse dentro de <ThemeProvider>')
  return ctx
}
