import { Outlet } from "react-router-dom";
import Header from "../components/main/Header";
import Footer from "../components/main/Footer";

export default function MainLayout() {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}