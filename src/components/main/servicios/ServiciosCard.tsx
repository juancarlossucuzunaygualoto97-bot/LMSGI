import type { IServicio } from "../../../model/interfaces/IServicio";
import ServicioCard from "./ServicioCard";

interface Props {
  servicios: IServicio[];
}

export default function ServiciosCard({ servicios }: Props) {
  return (
    <div className="projects">
      {servicios.map((s) => (
        <ServicioCard key={s.id} servicio={s} />
      ))}
    </div>
  );
}