import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Metrics from './components/Metrics.jsx'
import Nosotros from './components/Nosotros.jsx'
import Socios from './components/Socios.jsx'
import Sedes from './components/Sedes.jsx'
import Servicios from './components/Servicios.jsx'
import Trabaja from './components/Trabaja.jsx'
import Contacto from './components/Contacto.jsx'
import Footer from './components/Footer.jsx'
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <Nosotros />
        <Socios />
        <Sedes />
        <Servicios />
        <Trabaja />
        <Contacto />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
