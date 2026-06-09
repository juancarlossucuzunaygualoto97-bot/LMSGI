import { useParams } from "react-router-dom";
import dataServicios from "../../model/data/servicios.json";
import type { IServicio } from "../../model/interfaces/IServicio";

export default function ServiciosDetalle() {
  const { id } = useParams();

  const servicio = (dataServicios as IServicio[]).find(
    (s) => s.id === Number(id)
  );

  if (!servicio) {
    return <div>Servicio no encontrado</div>;
  }

  return (
    <div>
      <h1>{servicio.titulo}</h1>

      <p><strong>Descripción:</strong> {servicio.descripcion}</p>

      {/* SOLO SI EXISTE */}
      {"categoria" in servicio && (
        <p><strong>Categoría:</strong> {(servicio as any).categoria}</p>
      )}
    </div>
  );
}