import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";
import type { IVisitante } from "../model/interfaces/IDashboard";

interface Props {
  datos: IVisitante[];
}

type Rango = "trimestre" | "mes" | "semana";

export default function GraficoVisitantes({ datos }: Props) {
  const [rango, setRango] = useState<Rango>("trimestre");

  return (
    <div className="grafico-card">
      <div className="grafico-card__header">
        <div>
          <h3 className="grafico-card__titulo">Total Visitors</h3>
          <p className="grafico-card__sub">Total for the last 3 months</p>
        </div>

        <div className="grafico-card__tabs">
          {(["trimestre", "mes", "semana"] as Rango[]).map((r) => (
            <button
              key={r}
              onClick={() => setRango(r)}
              className={`grafico-tab ${rango === r ? "grafico-tab--active" : ""}`}
            >
              {r === "trimestre"
                ? "Last 3 months"
                : r === "mes"
                ? "Last 30 days"
                : "Last 7 days"}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={datos} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="fecha" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />

          <Tooltip
            contentStyle={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: 8,
              fontSize: 12
            }}
          />

          <Area
            type="monotone"
            dataKey={rango}
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#grad1)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}