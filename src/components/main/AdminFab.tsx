import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function AdminFab({ to }: { to: string }) {
  return (
    <Link to={to} className="admin-fab" title="Añadir nuevo">
      <Plus size={20} />
    </Link>
  );
}