import { useEffect } from "react";
import servicios from "../../model/data/servicios.json";
import titulos from "../../model/data/titulos.json";
import type { IServicio } from "../../model/interfaces/IServicio";
import type { ITitulo } from "../../model/interfaces/ITitulo";
import ServiciosCard from "../../components/main/servicios/ServiciosCard";

const datos = servicios as IServicio[];

const titulo =
  (titulos as ITitulo[]).find((t) => t.seccion === "servicios") || {
    titulo: "Servicios",
    subtitulo: "",
  };

export default function Servicios() {
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

        <div className="reveal">
          <ServiciosCard servicios={datos} />
        </div>
      </div>
    </section>
  );
}