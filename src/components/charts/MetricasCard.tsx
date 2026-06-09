import type { IMetrica } from "../../model/interfaces/IDashboard";

interface Props {
  metricas: IMetrica[];
}

export default function MetricasCards({ metricas }: Props) {
  return (
    <div className="metrics">
      {metricas.map((m, i) => (
        <div key={i} className="metric-card">
          <div>{m.icono}</div>
          <h3>{m.titulo}</h3>
          <p>{m.valor}</p>
        </div>
      ))}
    </div>
  );
}