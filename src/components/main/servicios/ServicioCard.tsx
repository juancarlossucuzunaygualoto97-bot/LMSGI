import type { IServicio } from "../../../model/interfaces/IServicio";

interface Props {
  servicio: IServicio;
}

export default function ServicioCard({ servicio }: Props) {
  const caracteristicas = servicio.caracteristicas
    ? servicio.caracteristicas.split(",").map((c) => c.trim())
    : [];

  return (
    <div className="project-card">
      {servicio.imagen && (
        <div className="servicio-card__img-wrap">
          <img src={servicio.imagen} alt={servicio.nombre} className="servicio-card__img" />
        </div>
      )}
      <h3 className="project-card__title">{servicio.nombre}</h3>
      <p className="project-card__desc">{servicio.descripcion}</p>

      {servicio.tipo && (
        <div style={{ marginTop: "10px", fontSize: ".9rem", opacity: ".8" }}>
          {servicio.tipo}
        </div>
      )}

      {caracteristicas.length > 0 && (
        <div className="project-card__tags">
          {caracteristicas.map((c) => (
            <span key={c} className="tag">
              {c}
            </span>
          ))}
        </div>
      )}

      <div className="project-card__footer">
        <span style={{ color: "var(--accent)", fontWeight: 600 }}>
          {servicio.precio > 0 ? `${servicio.precio} €` : "Consultar"}
        </span>
      </div>
    </div>
  );
}