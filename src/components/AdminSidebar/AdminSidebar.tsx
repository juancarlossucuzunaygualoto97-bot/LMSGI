import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, GraduationCap, Wrench, Briefcase, BookOpen,
  Database, FileText, FileEdit, Settings, HelpCircle, Search,
  LogOut, MoreHorizontal, Plus, Mail
} from "lucide-react";

const NAV = [
  { label: "Formación", to: "/admin/formacion", icon: GraduationCap },
  { label: "Servicios", to: "/admin/servicios", icon: Wrench },
  { label: "Trabajos",  to: "/admin/trabajos",  icon: Briefcase },
  { label: "Cursos",    to: "/admin/cursos",    icon: BookOpen },
];
const DOCS = [
  { label: "Base de datos",     icon: Database  },
  { label: "Informes",          icon: FileText  },
  { label: "Asistente de Word", icon: FileEdit  },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const nav = useNavigate();

  return (
    <aside className="asb">
      {/* Logo */}
      <div className="asb__logo">
        <div className="asb__logo-icon"><LayoutDashboard size={13}/></div>
        <span className="asb__logo-text">Panel</span>
      </div>

      {/* Quick Create */}
      <button className="asb__quick" onClick={() => nav("/admin")}>
        <Plus size={13}/><span>Creación rápida</span>
        <Mail size={13} className="asb__mail"/>
      </button>

      {/* Nav principal */}
      <nav className="asb__nav">
        {NAV.map(({ label, to, icon: Icon }) => (
          <Link key={to} to={to}
            className={`asb__link ${pathname.startsWith(to) ? "asb__link--active" : ""}`}>
            <Icon size={14}/><span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Documentos */}
      <p className="asb__section-label">Documentos</p>
      <nav className="asb__nav">
        {DOCS.map(({ label, icon: Icon }) => (
          <button key={label} className="asb__link asb__link--muted">
            <Icon size={14}/><span>{label}</span>
          </button>
        ))}
        <button className="asb__link asb__link--muted">
          <MoreHorizontal size={14}/><span>Más</span>
        </button>
      </nav>

      {/* Bottom */}
      <div className="asb__bottom">
        {[
          { label: "Ajustes", icon: Settings  },
          { label: "Ayuda",   icon: HelpCircle},
          { label: "Buscar",  icon: Search    },
          { label: "Salir",   icon: LogOut    },
        ].map(({ label, icon: Icon }) => (
          <button key={label} className="asb__link asb__link--muted">
            <Icon size={14}/><span>{label}</span>
          </button>
        ))}
        <div className="asb__user">
          <div className="asb__avatar">JC</div>
          <div className="asb__user-info">
            <span>Juan Carlos</span>
            <span>juancarlossucuzunaygualoto87@gmail.com</span>
          </div>
          <MoreHorizontal size={14}/>
        </div>
      </div>
    </aside>
  );
}