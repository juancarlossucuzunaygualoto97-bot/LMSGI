import { useStore } from "../../Context/StoreContext";
import { BookOpen, Wrench, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminHome() {
  const { cursos, servicios, trabajos, formacion, loading } = useStore();

  if (loading) return <div className="apage"><p className="aempty">Conectando con Supabase...</p></div>;

  const stats = [
    { label: "Cursos",    count: cursos.length,    icon: BookOpen,      to: "/admin/cursos",    color: "#6366f1" },
    { label: "Servicios", count: servicios.length,  icon: Wrench,        to: "/admin/servicios", color: "#10b981" },
    { label: "Trabajos",  count: trabajos.length,   icon: Briefcase,     to: "/admin/trabajos",  color: "#f59e0b" },
    { label: "Formación", count: formacion.length,  icon: GraduationCap, to: "/admin/formacion", color: "#ec4899" },
  ];

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Panel de administración</h1>
          <p className="apage__sub">Gestiona el contenido de tu portfolio · Conectado a Supabase</p>
        </div>
      </div>

      <div className="ahome-grid">
        {stats.map(({ label, count, icon: Icon, to, color }) => (
          <Link key={label} to={to} className="ahome-card">
            <div className="ahome-card__icon" style={{ background: `${color}18`, color }}>
              <Icon size={20}/>
            </div>
            <div>
              <p className="ahome-card__label">{label}</p>
              <p className="ahome-card__count">{count}</p>
            </div>
            <ArrowRight size={16} className="ahome-card__arrow"/>
          </Link>
        ))}
      </div>

      <div className="ahome-hint">
        <p>Selecciona una sección del menú lateral para añadir o eliminar contenido. Los cambios se guardan automáticamente en Supabase.</p>
      </div>
    </div>
  );
}