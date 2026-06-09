import Footer from "../components/main/Footer"
import Header from "../components/main/Header"
import Contacto from "../sections/Contacto"
import Formacion from "../sections/Formacion"
import QSomos from "../sections/QSomos1"
import Servicios from "../sections/Servicios"
import Trabajos from "../sections/Trabajos"


export const MainLayout = () => {
    return (
        <div className="min-h-screen w-full bg-slate-900 text-white">
            <Header/>
            <main>
                <QSomos/>
                <Formacion/>
                <Servicios/>
                <Trabajos/>
                <Contacto/>
                
            </main>
                <Footer/>
        </div>
    )
} 