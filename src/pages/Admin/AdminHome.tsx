import { useStore } from "../../Context/StoreContext";
import { BookOpen, Wrench, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";

const GRAFICO_DATA = [
  { fecha: "Apr 5",  visitas: 340 }, { fecha: "Apr 10", visitas: 420 },
  { fecha: "Apr 15", visitas: 390 }, { fecha: "Apr 20", visitas: 460 },
  { fecha: "Apr 25", visitas: 380 }, { fecha: "Apr 30", visitas: 520 },
  { fecha: "May 5",  visitas: 700 }, { fecha: "May 10", visitas: 480 },
  { fecha: "May 15", visitas: 560 }, { fecha: "May 20", visitas: 620 },
  { fecha: "May 25", visitas: 510 }, { fecha: "May 30", visitas: 680 },
  { fecha: "Jun 4",  visitas: 590 }, { fecha: "Jun 9",  visitas: 500 },
  { fecha: "Jun 14", visitas: 540 }, { fecha: "Jun 19", visitas: 480 },
  { fecha: "Jun 24", visitas: 640 }, { fecha: "Jun 30", visitas: 570 },
];

export default function AdminHome() {
  const { cursos, servicios, trabajos, formacion, loading } = useStore();

  if (loading) return <div className="apage"><p className="aempty">Conectando con Supabase...</p></div>;

  const stats = [
    { label: "Cursos",    count: cursos.length,   icon: BookOpen,      to: "/admin/cursos",    color: "#6366f1" },
    { label: "Servicios", count: servicios.length, icon: Wrench,        to: "/admin/servicios", color: "#10b981" },
    { label: "Trabajos",  count: trabajos.length,  icon: Briefcase,     to: "/admin/trabajos",  color: "#f59e0b" },
    { label: "Formación", count: formacion.length, icon: GraduationCap, to: "/admin/formacion", color: "#ec4899" },
  ];

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Panel de administración</h1>
          <p className="apage__sub">Gestiona el contenido de tu portfolio · Conectado a Supabase</p>
        </div>
      </div>

      {/* Stats cards */}
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

      {/* Gráfico */}
      <div className="ahome-chart">
        <div className="ahome-chart__header">
          <div>
            <h3 className="ahome-chart__titulo">Visitas totales</h3>
            <p className="ahome-chart__sub">Actividad de los últimos 3 meses</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={GRAFICO_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="fecha" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false}/>
            <Tooltip
              contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: "#0f172a", fontWeight: 600 }}
            />
            <Area type="monotone" dataKey="visitas" stroke="#6366f1" strokeWidth={2} fill="url(#grad)"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="ahome-hint">
        <p>Selecciona una sección del menú lateral para añadir o eliminar contenido. Los cambios se guardan automáticamente en Supabase.</p>
      </div>
    </div>
  );
}