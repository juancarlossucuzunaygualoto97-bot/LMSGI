import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import titulos from "../model/data/titulos.json";
import type { ITitulo } from "../model/interfaces/ITitulo";
import AdminFab from "../components/main/AdminFab";

const titulo = (titulos as ITitulo[]).find((t) => t.seccion === "trabajos")!;

function tagsToList(tags: unknown): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  if (typeof tags !== "string") return [];
  const t = tags.trim();
  if (t.startsWith("[") && t.endsWith("]")) {
    try { return JSON.parse(t); } catch {}
  }
  return t.split(",").map(s => s.trim()).filter(Boolean);
}

export default function Trabajos() {
  const [trabajos, setTrabajos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;
    supabase.from("trabajos").select("*").order("id").then(({ data }) => {
      if (data) setTrabajos(data);
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
  }, [trabajos]);

  return (
    <section className="section" style={{ paddingTop: "120px" }}>
      <div className="container">
        <h2 className="section__title reveal">{titulo.titulo}</h2>
        <p className="section__sub reveal">{titulo.subtitulo}</p>

        {loading && <p className="section__sub">Cargando proyectos...</p>}

        {!loading && trabajos.length === 0 && (
          <p className="section__sub">
            No hay proyectos todavía. Añade uno desde el <a href="/admin/trabajos" style={{ color: "var(--accent)" }}>panel admin</a>.
          </p>
        )}

        {!loading && trabajos.length > 0 && (
          <div className="projects reveal">
            {trabajos.map((p: any) => (
              <div className="project-card" key={p.id}>
                {p.imagen && (
                  <div className="servicio-card__img-wrap">
                    <img src={p.imagen} alt={p.titulo} className="servicio-card__img" />
                  </div>
                )}

                <h3 className="project-card__title">{p.titulo}</h3>
                <p className="project-card__desc">{p.descripcion}</p>

                <div className="project-card__tags">
                  {tagsToList(p.tags).map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>

                <div className="project-card__footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: ".78rem", color: p.estado === "Completado" ? "#22c55e" : "#f59e0b" }}>
                    ● {p.estado}
                  </span>
                  {p.link && p.link !== "#"
                    ? p.link.includes("peregrin.local")
                      ? <span style={{ fontSize: ".78rem", color: "#f59e0b" }} title="Solo disponible en red local">📡 Red local</span>
                      : <a href={p.link} className="project-card__link" target="_blank" rel="noreferrer">Ver proyecto →</a>
                    : <span style={{ fontSize: ".78rem", color: "var(--muted)" }}>Sin demo pública</span>
                  }
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AdminFab to="/admin/trabajos" />
    </section>
  );
}