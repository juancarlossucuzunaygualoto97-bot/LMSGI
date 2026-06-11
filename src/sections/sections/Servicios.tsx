import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { supabase } from "../../lib/supabase";
import titulos from "../../model/data/titulos.json";

import type { ITitulo } from "../../model/interfaces/ITitulo";

import ServiciosModal from "../../components/ServiciosModal";
import AdminFab from "../../components/main/AdminFab";

interface IServicio {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  precio: number;
  icono: string;
  imagen: string;
  caracteristicas: string;
}

const titulo = (titulos as ITitulo[]).find(
  (t) => t.seccion === "servicios"
)!;

export default function Servicios() {
  const [servicios, setServicios] = useState<IServicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    cargarServicios();

    const channel = supabase
      .channel("servicios-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "servicios",
        },
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
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
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

        {loading && (
          <p className="section__sub">Cargando servicios...</p>
        )}

        {!loading && servicios.length === 0 && (
          <p className="section__sub">
            Todavía no hay servicios publicados.
          </p>
        )}

        {!loading && servicios.length > 0 && (
          <div className="projects reveal">
            {servicios.map((servicio) => (
              <div className="project-card" key={servicio.id}>
                {servicio.imagen && (
                  <div className="servicio-card__img-wrap">
                    <img
                      src={servicio.imagen}
                      alt={servicio.nombre}
                      className="servicio-card__img"
                    />
                  </div>
                )}

                <h3 className="project-card__title">
                  {servicio.nombre}
                </h3>

                <p className="project-card__desc">
                  {servicio.descripcion}
                </p>

                {servicio.tipo && (
                  <div
                    style={{
                      marginTop: "10px",
                      fontSize: ".9rem",
                      opacity: ".8",
                    }}
                  >
                    {servicio.tipo}
                  </div>
                )}

                {servicio.caracteristicas && (
                  <div className="project-card__tags">
                    {servicio.caracteristicas
                      .split(",")
                      .map((caracteristica) => (
                        <span
                          key={caracteristica}
                          className="tag"
                        >
                          {caracteristica.trim()}
                        </span>
                      ))}
                  </div>
                )}

                <div className="project-card__footer">
                  <span
                    style={{
                      color: "var(--accent)",
                      fontWeight: 600,
                    }}
                  >
                    {servicio.precio > 0
                      ? `${servicio.precio} €`
                      : "Consultar"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        className="admin-fab"
        onClick={() => setShowModal(true)}
        aria-label="Añadir servicio"
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