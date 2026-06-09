import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";

export default function DashboardLayout() {
  return (
    <div className="adm-layout">
      <AdminSidebar />
      <main className="adm-main">
        <Outlet />
      </main>
    </div>
  );
}