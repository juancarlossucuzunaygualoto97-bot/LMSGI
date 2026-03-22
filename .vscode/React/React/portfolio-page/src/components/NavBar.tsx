import { Link } from "react-router-dom"

export const NavBar = () => {
    return (
        <nav>
            <Link to="/"> Home </Link>
            <Link to="/trabajos"> Trabajos </Link>
            <Link to="/contacto"> Contacto</Link>
            
        </nav>
    )
}