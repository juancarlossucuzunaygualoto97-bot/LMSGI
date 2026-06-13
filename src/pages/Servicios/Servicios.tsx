import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { supabase } from "../../lib/supabase";
import titulos from "../../model/data/titulos.json";
import type { IServicio } from "../../model/interfaces/IServicio";
import type { ITitulo } from "../../model/interfaces/ITitulo";
import ServiciosCard from "../../components/main/servicios/ServiciosCard";
import ServiciosModal from "../../components/ServiciosModal";
import AdminFab from "../../components/main/AdminFab";

const titulo =
  (titulos as ITitulo[]).find((t) => t.seccion === "servicios") || {
    titulo: "Servicios",
    subtitulo: "",
  };

export default function Servicios() {
  const [servicios, setServicios] = useState<IServicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    cargarServicios();

    const channel = supabase
      .channel("servicios-page")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "servicios" },
        () => cargarServicios()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function cargarServicios() {
    const { data } = await supabase
      .from("servicios")
      .select("*")
      .order("id", { ascending: false });

    if (data) setServicios(data);
    setLoading(false);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible")
        ),
      { threshold: 0.15 }
    );

    document
      .querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [servicios]);

  return (
    <section className="section" style={{ paddingTop: "120px" }}>
      <div className="container">
        <h2 className="section__title reveal">{titulo.titulo}</h2>
        <p className="section__sub reveal">{titulo.subtitulo}</p>

        {loading && <p className="section__sub">Cargando servicios...</p>}

        {!loading && servicios.length === 0 && (
          <p className="section__sub">
            Todavía no hay servicios publicados.
          </p>
        )}

        {!loading && servicios.length > 0 && (
          <div className="reveal">
            <ServiciosCard servicios={servicios} />
          </div>
        )}
      </div>

      <button
        className="admin-fab"
        onClick={() => setShowModal(true)}
      >
        <Plus size={24} />
      </button>

      {showModal && (
        <ServiciosModal onClose={() => setShowModal(false)} />
      )}

      <AdminFab to="/admin/servicios" />
    </section>
  );
}