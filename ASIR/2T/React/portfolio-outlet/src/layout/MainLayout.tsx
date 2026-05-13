import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white">

      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
