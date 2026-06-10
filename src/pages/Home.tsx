import { useEffect } from "react";
import titulos from "../model/data/titulos.json";
import trabajos from "../model/data/trabajos.json";
import type { ITitulo } from "../model/interfaces/ITitulo";
import type { ITrabajo } from "../model/interfaces/ITrabajos";

const hero = (titulos as ITitulo[]).find((t) => t.seccion === "hero")!;
const proyectos = (trabajos as ITrabajo[]).slice(0, 3);

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
          <div className="hero__badge"> Estudiante 1 ASIR · 1er Año</div>
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
          <div className="projects reveal">
            {proyectos.map((p) => (
              <div className="project-card" key={p.id}>
                <div className="project-card__icon">
  {"icono" in p ? (p as any).icono : "📁"}
</div>
                <h3 className="project-card__title">{p.titulo}</h3>
                <p className="project-card__desc">{p.descripcion}</p>
                <div className="project-card__tags">
                  {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
