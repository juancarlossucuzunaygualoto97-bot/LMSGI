import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";

import type { IVisitante } from "../../model/interfaces/IDashboard";

interface Props {
  datos: IVisitante[];
}

type Rango = "trimestre" | "mes" | "semana";

export default function GraficoVisitantes({ datos }: Props) {
  const [rango, setRango] = useState<Rango>("trimestre");

  return (
    <div className="grafico-card">
      <div className="grafico-card__header">
        <h3>Total Visitors</h3>

        <div>
          {(["trimestre", "mes", "semana"] as Rango[]).map((r) => (
            <button key={r} onClick={() => setRango(r)}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={datos}>
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <CartesianGrid />
          <Area type="monotone" dataKey={rango} stroke="#6366f1" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}