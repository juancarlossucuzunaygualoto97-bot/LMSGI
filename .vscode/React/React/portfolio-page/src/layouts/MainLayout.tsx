import Header from "../components/main/Header"
// import { NavBar } from "../../components/NavBar"
import { Outlet } from "react-router-dom"
import Footer from "../components/main/Footer"

export const MainLayout = () => {
    return (
        <div className="min-h-screen w-full bg-slate-900 text-white">
             <Header/>
                {/* <NavBar/> */}
             <main> 
                <Outlet/>
             </main>
             <Footer/>
        </div>
    )
}