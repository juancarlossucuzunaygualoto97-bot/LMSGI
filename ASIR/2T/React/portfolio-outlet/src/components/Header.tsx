import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-blue-500 font-bold" : "text-gray-700";

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-slate-950/80 backdrop-blur z-50">
      <nav className="max-w-5xl mx-auto flex gap-6 p-4">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/about" className={linkClass}>About</NavLink>
        <NavLink to="/skills" className={linkClass}>Skills</NavLink>
        <NavLink to="/projects" className={linkClass}>Projects</NavLink>
        <NavLink to="/contact" className={linkClass}>Contact</NavLink>
      </nav>
    </header>
  );
}
