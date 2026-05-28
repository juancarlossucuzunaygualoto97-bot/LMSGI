import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "../layouts/MainLayout"
import { Contacto } from "../pages/Contacto"
import { Trabajos } from "../pages/Trabajos"
import { Home } from "../pages/Home"
import Formacion from "../sections/Formacion"
import Servicios from "@/sections/Servicios"
import QSomos from "@/sections/QSomos"
import { ServicioDetalle } from "@/pages/Servicios/ServiciosDetalle"

export const AppRouter = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />} >
                    <Route path="/" element={<Home/>}/>
                    <Route path="/qsomos" element={<QSomos/>}/>
                    <Route path="/formacion" element={<Formacion/>}/>
                    <Route path="/servicios" element={<Servicios/>}/>
                    <Route path="/servicios/:id" element={<ServicioDetalle/>}/>
                    <Route path="/trabajos" element={<Trabajos/>}/>
                    <Route path="/contacto" element={<Contacto/>}/>
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}