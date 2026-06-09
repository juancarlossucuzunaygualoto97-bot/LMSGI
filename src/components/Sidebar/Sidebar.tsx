import { Link, useLocation } from "react-router-dom";
import {
  BookOpen, Package, Wrench, Briefcase, Users,
  Database, FileText, FileEdit, Settings, HelpCircle,
  Search, ChevronDown, Plus, Bell, Zap
} from "lucide-react";
import data from "../../model/data/dashboard.json";

const ICON_MAP: Record<string, React.ReactNode> = {
  BookOpen:  <BookOpen  size={15} />,
  Package:   <Package   size={15} />,
  Wrench:    <Wrench    size={15} />,
  Briefcase: <Briefcase size={15} />,
  Users:     <Users     size={15} />,
  Database:  <Database  size={15} />,
  FileText:  <FileText  size={15} />,
  FileEdit:  <FileEdit  size={15} />,
};

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <Zap size={14} />
        </div>
        <span className="sidebar__logo-text">{data.empresa}</span>
        <ChevronDown size={14} className="sidebar__logo-chevron" />
      </div>

      {/* Quick Create */}
      <button className="sidebar__quick-create">
        <Plus size={14} />
        <span>Quick Create</span>
        <Bell size={13} className="sidebar__bell" />
      </button>

      {/* Nav principal */}
      <nav className="sidebar__nav">
        {data.navItems.map((item) => (
          <Link
            key={item.ruta}
            to={item.ruta}
            className={`sidebar__link ${pathname === item.ruta ? "sidebar__link--active" : ""}`}
          >
            {ICON_MAP[item.icono]}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Documents */}
      <div className="sidebar__section-label">Documents</div>
      <nav className="sidebar__nav">
        {data.docItems.map((item) => (
          <button key={item.label} className="sidebar__link sidebar__link--doc">
            {ICON_MAP[item.icono]}
            <span>{item.label}</span>
          </button>
        ))}
        <button className="sidebar__link sidebar__link--doc">
          <span className="sidebar__more">···</span>
          <span>More</span>
        </button>
      </nav>

      {/* Bottom */}
      <div className="sidebar__bottom">
        <button className="sidebar__link sidebar__link--doc">
          <Settings size={15} /><span>Settings</span>
        </button>
        <button className="sidebar__link sidebar__link--doc">
          <HelpCircle size={15} /><span>Get Help</span>
        </button>
        <button className="sidebar__link sidebar__link--doc">
          <Search size={15} /><span>Search</span>
        </button>
      </div>
    </aside>
  );
}