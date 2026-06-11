import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import titulos from "../model/data/titulos.json";
import type { ITitulo } from "../model/interfaces/ITitulo";

interface ITrabajo {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  tags: string;
  link: string;
  estado: string;
}

const hero = (titulos as ITitulo[]).find((t) => t.seccion === "hero")!;

export default function Home() {
  const [trabajos, setTrabajos] = useState<ITrabajo[]>([]);

  useEffect(() => {
    supabase.from("trabajos").select("*").order("id").then(({ data }) => {
      if (data) setTrabajos(data);
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

  const proyectos = trabajos.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__grid" />
        </div>
        <div className="hero__content">
          <div className="hero__avatar-wrap">
            <div className="hero__avatar">JC</div>
            <div className="hero__avatar-ring" />
          </div>
          <div className="hero__badge">🎓 Estudiante ASIR · 1er Año</div>
          <h1 className="hero__name">
            Juan <span className="hero__name--accent">Carlos</span>
          </h1>
          <p className="hero__sub">{hero.subtitulo}</p>
          <p className="hero__bio">{hero.descripcion}</p>
          <div className="hero__ctas">
            <a href="/trabajos" className="btn btn--primary">Ver Proyectos</a>
            <a href="/contacto" className="btn btn--ghost">Contacto</a>
          </div>
        </div>
        <div className="hero__scroll-hint"><span /></div>
      </section>

      {/* PROYECTOS PREVIEW */}
      <section className="section">
        <div className="container">
          <h2 className="section__title reveal">Proyectos Destacados</h2>
          <p className="section__sub reveal">Un vistazo a lo que he hecho</p>

          {proyectos.length === 0 ? (
            <p className="section__sub">Cargando proyectos...</p>
          ) : (
            <div className="projects reveal">
              {proyectos.map((p) => (
                <div className="project-card" key={p.id}>
                  {p.imagen && (
                    <div className="servicio-card__img-wrap">
                      <img src={p.imagen} alt={p.titulo} className="servicio-card__img" />
                    </div>
                  )}

                  <h3 className="project-card__title">{p.titulo}</h3>
                  <p className="project-card__desc">{p.descripcion}</p>

                  <div className="project-card__tags">
                    {p.tags.split(",").map((t) => (
                      <span key={t} className="tag">{t.trim()}</span>
                    ))}
                  </div>

                  <div className="project-card__footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: ".78rem", color: p.estado === "Completado" ? "#22c55e" : "#f59e0b" }}>
                      ● {p.estado}
                    </span>
                    {p.link && p.link !== "#" && p.link !== "/" && !p.link.includes("peregrin.local") && (
                      <a href={p.link} className="project-card__link">Ver proyecto →</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}