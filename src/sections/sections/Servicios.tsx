import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import titulos from "../../model/data/titulos.json";
import type { ITitulo } from "../../model/interfaces/ITitulo";

interface IServicio {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  precio: number;
  icono: string;
  caracteristicas: string;
}

const titulo = (titulos as ITitulo[]).find((t) => t.seccion === "servicios")!;

export default function Servicios() {
  const [servicios, setServicios] = useState<IServicio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("servicios").select("*").order("id").then(({ data }) => {
      if (data) setServicios(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [servicios]);

  return (
    <section className="section" style={{ paddingTop: "120px" }}>
      <div className="container">
        <h2 className="section__title reveal">{titulo.titulo}</h2>
        <p className="section__sub reveal">{titulo.subtitulo}</p>

        {loading && <p className="section__sub">Cargando servicios...</p>}

        {!loading && servicios.length === 0 && (
          <p className="section__sub">No hay servicios todavía. Añade uno desde el <a href="/admin/servicios" style={{color:"var(--accent)"}}>panel admin</a>.</p>
        )}

        {!loading && servicios.length > 0 && (
          <div className="projects reveal">
            {servicios.map((s) => (
              <div className="project-card" key={s.id}>
                <div className="project-card__icon">{s.icono || "🔧"}</div>
                <h3 className="project-card__title">{s.nombre}</h3>
                <p className="project-card__desc">{s.descripcion}</p>
                {s.caracteristicas && (
                  <div className="project-card__tags">
                    {s.caracteristicas.split(",").map((c) => (
                      <span key={c} className="tag">{c.trim()}</span>
                    ))}
                  </div>
                )}
                {s.precio > 0 && (
                  <div className="project-card__footer">
                    <span style={{ fontSize: ".85rem", color: "var(--accent)", fontWeight: 600 }}>
                      {s.precio} €
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}