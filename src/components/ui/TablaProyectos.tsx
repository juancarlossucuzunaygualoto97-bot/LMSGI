import type { IProyecto } from "../../model/interfaces/IDashboard";

interface Props {
  proyectos: IProyecto[];
}

export default function TablaProyectos({ proyectos }: Props) {
  return (
    <div>
      {proyectos.map((p) => (
        <div key={p.id}>{p.nombre}</div>
      ))}
    </div>
  );
}