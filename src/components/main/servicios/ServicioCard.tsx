import type { IServicio } from "../../../model/interfaces/IServicio";

interface Props {
  servicio: IServicio;
}

export default function ServicioCard({ servicio }: Props) {
  return (
    <div className="project-card service-card">
      <img
        src={servicio.imagen}
        alt={servicio.titulo}
        className="service-card__image"
      />

      <h3 className="project-card__title">
        {servicio.titulo}
      </h3>

      <p className="project-card__desc">
        {servicio.descripcion}
      </p>
    </div>
  );
}