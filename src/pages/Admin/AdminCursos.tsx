import { useState } from "react";
import { Trash2, Plus, List } from "lucide-react";
import { useStore } from "../../Context/StoreContext";

const EMPTY = {
  titulo: "",
  academia: "",
  categoria: "",
  precio: 0,
  imagen: "",
};

export default function AdminCursos() {
  const { cursos, addCurso, deleteCurso, loading } = useStore();

  const [vista, setVista] = useState<"lista" | "nuevo">("lista");
  const [form, setForm] = useState(EMPTY);
  const [ok, setOk] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [saving, setSaving] = useState(false);

  if (loading)
    return (
      <div className="apage">
        <p className="aempty">Cargando datos desde Supabase...</p>
      </div>
    );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    if (!form.titulo.trim() || !form.academia.trim()) return;

    try {
      setSaving(true);
      setErrMsg("");

      await addCurso({
        titulo: form.titulo,
        academia: form.academia,
        categoria: form.categoria,
        precio: form.precio ? Number(form.precio) : 0,
      });

      setForm(EMPTY);
      setOk(true);

      setTimeout(() => {
        setOk(false);
        setVista("lista");
      }, 1400);

    } catch (err: any) {
      setErrMsg(err?.message || "Error al guardar curso");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Cursos</h1>
          <p className="apage__sub">{cursos.length} cursos en Supabase</p>
        </div>

        <div className="apage__btns">
          <button
            className={`apage__tab ${vista === "lista" ? "apage__tab--on" : ""}`}
            onClick={() => setVista("lista")}
          >
            <List size={13} /> Listado
          </button>

          <button
            className={`apage__tab ${vista === "nuevo" ? "apage__tab--on" : ""}`}
            onClick={() => setVista("nuevo")}
          >
            <Plus size={13} /> Nuevo
          </button>
        </div>
      </div>

      {vista === "lista" && (
        <div className="atable-wrap">
          {cursos.length === 0 ? (
            <p className="aempty">No hay cursos aún</p>
          ) : (
            <table className="atable">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Academia</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {cursos.map((c) => (
                  <tr key={c.id}>
                    <td>{c.titulo}</td>
                    <td>{c.academia}</td>
                    <td><span className="abadge">{c.categoria}</span></td>
                    <td>{c.precio} €</td>
                    <td>
                      <button className="adel" onClick={() => deleteCurso(c.id)}>
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {vista === "nuevo" && (
        <div className="aform-wrap">
          <div className="aform">
            <h2 className="aform__titulo">Nuevo Curso</h2>

            <div className="aform__grid">
              <input name="titulo" placeholder="Título" value={form.titulo} onChange={onChange} />
              <input name="academia" placeholder="Academia" value={form.academia} onChange={onChange} />
              <input name="categoria" placeholder="Categoría" value={form.categoria} onChange={onChange} />
              <input name="precio" type="number" placeholder="Precio" value={form.precio} onChange={onChange} />
              <input name="imagen" placeholder="Imagen URL" value={form.imagen} onChange={onChange} />
            </div>

            {errMsg && <div className="aform__err">✗ {errMsg}</div>}

            {ok && <div className="aform__ok">✓ Guardado</div>}

            <button onClick={onSubmit} disabled={saving} className="aform__submit">
              {saving ? "Guardando..." : "Crear curso"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}