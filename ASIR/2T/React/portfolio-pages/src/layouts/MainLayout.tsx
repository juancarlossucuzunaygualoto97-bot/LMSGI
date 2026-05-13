import { NavBar } from '../components/NavBar'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <>
        <header>
            <NavBar />
        </header>
        <main>
            {/* El componente Outlet es un componente de React Router que se utiliza para renderizar los componentes hijos de una ruta. En este caso, el componente Outlet se utiliza para renderizar los componentes Home, Trabajos y Contacto, dependiendo de la ruta que se haya seleccionado en el NavBar. */}
            <Outlet />
        </main>
        <footer>
            Este es el pie de página de mi portfolio
        </footer>
    
    </>
  )
}
