import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Servicios", to: "/servicios" },
  { label: "Trabajos", to: "/trabajos" },
  { label: "Cursos", to: "/cursos" },
  { label: "Contacto", to: "/contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M4 24 L14 4 L24 24" stroke="url(#g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M8 17 H20" stroke="url(#g)" strokeWidth="2.5" strokeLinecap="round"/>
            <defs>
              <linearGradient id="g" x1="4" y1="4" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818cf8"/>
                <stop offset="1" stopColor="#34d399"/>
              </linearGradient>
            </defs>
          </svg>
          <span>JC</span>
        </Link>

        <ul className="nav__links">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`nav__link ${pathname === l.to ? "nav__link--active" : ""}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button className="nav__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <ul className="nav__mobile">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}