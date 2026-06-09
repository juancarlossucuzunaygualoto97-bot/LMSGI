import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import type { IProyecto } from "../../types/IDashboard";

interface Props {
  proyectos: IProyecto[];
}

const TABS = ["Outline", "Past Performance", "Key Personnel", "Focus Documents"];
const TAB_BADGES: Record<string, number> = { "Past Performance": 3, "Key Personnel": 2 };

export default function TablaProyectos({ proyectos }: Props) {
  const [tabActiva, setTabActiva] = useState("Outline");
  const [seleccionados, setSeleccionados] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="tabla-card">
      {/* Tabs */}
      <div className="tabla-tabs">
        <div className="tabla-tabs__left">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTabActiva(t)}
              className={`tabla-tab ${tabActiva === t ? "tabla-tab--active" : ""}`}
            >
              {t}
              {TAB_BADGES[t] && (
                <span className="tabla-tab__badge">{TAB_BADGES[t]}</span>
              )}
            </button>
          ))}
        </div>
        <div className="tabla-tabs__right">
          <button className="tabla-btn-secondary">
            <ChevronDown size={13} /> Columns
          </button>
          <button className="tabla-btn-primary">
            <Plus size={13} /> Add Section
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="tabla-wrap">
        <table className="tabla">
          <thead>
            <tr>
              <th className="tabla__th tabla__th--check"></th>
              <th className="tabla__th tabla__th--check"></th>
              <th className="tabla__th">Header</th>
              <th className="tabla__th">Section Type</th>
              <th className="tabla__th">Status</th>
              <th className="tabla__th tabla__th--num">Target</th>
              <th className="tabla__th tabla__th--num">Limit</th>
              <th className="tabla__th">Reviewer</th>
              <th className="tabla__th"></th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((p) => (
              <tr
                key={p.id}
                className={`tabla__row ${seleccionados.includes(p.id) ? "tabla__row--selected" : ""}`}
              >
                <td className="tabla__td tabla__td--drag">⋮⋮</td>
                <td className="tabla__td tabla__td--check">
                  <input
                    type="checkbox"
                    checked={seleccionados.includes(p.id)}
                    onChange={() => toggleSelect(p.id)}
                    className="tabla__checkbox"
                  />
                </td>
                <td className="tabla__td tabla__td--header">{p.header}</td>
                <td className="tabla__td">
                  <span className="tabla__tipo">{p.tipo}</span>
                </td>
                <td className="tabla__td">
                  <span className={`tabla__badge tabla__badge--${p.estado}`}>
                    <span className="tabla__badge-dot" />
                    {p.estado === "done" ? "Done" : "In Process"}
                  </span>
                </td>
                <td className="tabla__td tabla__td--num">{p.target}</td>
                <td className="tabla__td tabla__td--num">{p.limit}</td>
                <td className="tabla__td">
                  {p.reviewer === "Assign reviewer"
                    ? <button className="tabla__assign">Assign reviewer <ChevronDown size={11} /></button>
                    : <span className="tabla__reviewer">{p.reviewer}</span>
                  }
                </td>
                <td className="tabla__td tabla__td--menu">⋯</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}