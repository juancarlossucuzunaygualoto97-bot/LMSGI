import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import titulos from "../model/data/titulos.json";
import type { ITitulo } from "../model/interfaces/ITitulo";
import AdminFab from "../components/main/AdminFab";

interface ICurso {
  id: number;
  titulo: string;
  academia: string;
  categoria: string;
  precio: number;
  imagen: string;
}

const titulo = (titulos as ITitulo[]).find((t) => t.seccion === "cursos")!;

export default function Cursos() {
  const [cursos, setCursos] = useState<ICurso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("cursos").select("*").order("id").then(({ data }) => {
      if (data) setCursos(data);
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
  }, [cursos]);

  return (
    <section className="section" style={{ paddingTop: "120px" }}>
      <div className="container">
        <h2 className="section__title reveal">{titulo.titulo}</h2>
        <p className="section__sub reveal">{titulo.subtitulo}</p>

        {loading && <p className="section__sub">Cargando cursos...</p>}

        {!loading && cursos.length === 0 && (
          <p className="section__sub">
            No hay cursos todavía. Añade uno desde el <a href="/admin/cursos" style={{ color: "var(--accent)" }}>panel admin</a>.
          </p>
        )}

        {!loading && cursos.length > 0 && (
          <div className="projects reveal">
            {cursos.map((c) => (
              <div className="project-card" key={c.id}>
                {c.imagen && (
                  <div className="servicio-card__img-wrap">
                    <img src={c.imagen} alt={c.titulo} className="servicio-card__img" />
                  </div>
                )}

                <h3 className="project-card__title">{c.titulo}</h3>
                <p className="project-card__desc">{c.academia}</p>

                <div className="project-card__tags">
                  {c.categoria && <span className="tag">{c.categoria}</span>}
                </div>

                {c.precio > 0 && (
                  <div className="project-card__footer">
                    <span style={{ fontSize: ".85rem", color: "var(--accent)", fontWeight: 600 }}>
                      {c.precio} €
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <AdminFab to="/admin/cursos" />
    </section>
  );
}