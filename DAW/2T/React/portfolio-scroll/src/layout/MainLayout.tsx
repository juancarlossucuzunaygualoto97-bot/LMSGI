
// este componente crea el front-end de la aplicación

import Header from "../components/main/Header"
import Formaciones from "../sections/Formcaciones"
import QSomos from "../sections/QSomos"
import Servicios from "../sections/Servicios"
import Trabajos from "../sections/Trabajos"

// la parte publica de la aplicación 
function MainLayout() {

    return (
        <div className="min-h-screen w-full bg-gray-900 text-white">
            <Header />
            <main>
                <QSomos />
                <Trabajos />
                <Formaciones />
                <Servicios />
            </main>
        </div>  
        
    )
}

export default MainLayout