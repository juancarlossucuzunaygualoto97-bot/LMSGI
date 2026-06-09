import { useEffect } from "react";
import trabajos from "../model/data/trabajos.json";
import titulos from "../model/data/titulos.json";
import type { ITrabajo } from "../model/interfaces/ITrabajos";
import type { ITitulo } from "../model/interfaces/ITitulo";

const datos = trabajos as ITrabajo[];
const titulo = (titulos as ITitulo[]).find(
  (t) => t.seccion === "trabajos"
)!;

export default function Trabajos() {
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
  }, []);

  return (
    <section className="section" style={{ paddingTop: "120px" }}>
      <div className="container">
        <h2 className="section__title reveal">{titulo.titulo}</h2>
        <p className="section__sub reveal">{titulo.subtitulo}</p>

        <div className="projects reveal">
          {datos.map((p) => (
            <div className="project-card" key={p.id}>
              {/* Imagen */}
              <div className="servicio-card__img-wrap">
                <img
                  src={p.imagen}
                  alt={p.titulo}
                  className="servicio-card__img"
                />
              </div>

              {/* Título + Fecha */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <h3 className="project-card__title">{p.titulo}</h3>

                {p.fecha && (
                  <span
                    className="tag"
                    style={{ fontSize: ".7rem", whiteSpace: "nowrap" }}
                  >
                    {p.fecha}
                  </span>
                )}
              </div>

              {/* Descripción */}
              <p className="project-card__desc">{p.descripcion}</p>

              {/* Tecnologías */}
              <div className="project-card__tags">
                {p.tags?.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div
                className="project-card__footer"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "auto",
                }}
              >
                <span
                  style={{
                    fontSize: ".78rem",
                    color:
                      p.estado === "Completado"
                        ? "#22c55e"
                        : "#f59e0b",
                  }}
                >
                  ● {p.estado}
                </span>

                {p.link === "#" ? (
                  <span
                    style={{
                      fontSize: ".78rem",
                      color: "var(--muted)",
                    }}
                  >
                    Sin demo pública
                  </span>
                ) : p.link?.includes("peregrin.local") ? (
                  <span
                    style={{
                      fontSize: ".78rem",
                      color: "#f59e0b",
                    }}
                    title="Solo disponible en red local"
                  >
                    📡 Red local
                  </span>
                ) : (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__link"
                  >
                    Ver proyecto →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}