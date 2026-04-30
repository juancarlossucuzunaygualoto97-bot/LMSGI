import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "../layouts/MainLayout"
import { Home } from "../pages/Home"
import { Trabajos } from "../pages/Trabajos"
import { Contacto } from "../pages/Contacto"

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<MainLayout />} >
                <Route path="/" element={<Home />} />
                <Route path="/trabajos" element={<Trabajos />} />
                <Route path="/contacto" element={<Contacto />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
