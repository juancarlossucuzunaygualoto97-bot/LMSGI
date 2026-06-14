import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import titulos from "../model/data/titulos.json";

import type { ITitulo } from "../model/interfaces/ITitulo";
import type { ICurso } from "../model/interfaces/ICurso";

import AdminFab from "../components/main/AdminFab";

const titulo = (titulos as ITitulo[]).find(
  (t) => t.seccion === "cursos"
)!;

export default function Cursos() {
  const [cursos, setCursos] = useState<ICurso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarCursos();

    if (!supabase) return;
    const channel = supabase
      .channel("cursos-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "cursos",
        },
        () => cargarCursos()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function cargarCursos() {
    if (!supabase) { setLoading(false); return; }
    const { data } = await supabase
      .from("cursos")
      .select("*")
      .order("id", { ascending: false });

    if (data) setCursos(data);
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
  }, [cursos]);

  return (
    <section className="section" style={{ paddingTop: "120px" }}>
      <div className="container">
        <h2 className="section__title reveal">{titulo.titulo}</h2>

        <p className="section__sub reveal">{titulo.subtitulo}</p>

        {loading && (
          <p className="section__sub">Cargando cursos...</p>
        )}

        {!loading && cursos.length === 0 && (
          <p className="section__sub">
            Todavía no hay cursos publicados.
          </p>
        )}

        {!loading && cursos.length > 0 && (
          <div className="projects reveal">
            {cursos.map((curso) => (
              <div className="project-card" key={curso.id}>
                {curso.imagen && (
                  <div className="servicio-card__img-wrap">
                    <img
                      src={curso.imagen}
                      alt={curso.titulo}
                      className="servicio-card__img"
                    />
                  </div>
                )}

                <h3 className="project-card__title">
                  {curso.titulo}
                </h3>

                <p className="project-card__desc">
                  {curso.descripcion}
                </p>

                <div
                  style={{
                    marginTop: "10px",
                    fontSize: ".9rem",
                    opacity: ".8",
                  }}
                >
                  {curso.academia}
                </div>

                <div className="project-card__tags">
                  {curso.categoria && (
                    <span className="tag">
                      {curso.categoria}
                    </span>
                  )}
                </div>

                <div className="project-card__footer">
                  <span
                    style={{
                      color: "var(--accent)",
                      fontWeight: 600,
                    }}
                  >
                    {curso.precio > 0
                      ? `${curso.precio} €`
                      : "Gratis"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AdminFab to="/admin/cursos" />
    </section>
  );
}