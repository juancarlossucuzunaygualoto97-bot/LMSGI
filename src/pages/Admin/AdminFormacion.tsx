import { useState } from "react";
import { Trash2, Plus, List } from "lucide-react";
import { useStore } from "../../Context/StoreContext";

const EMPTY = {
  titulo: "",
  centro: "",
  año: "",
  descripcion: "",
};

export default function AdminFormacion() {
  const { formacion, addFormacion, deleteFormacion, loading } = useStore();

  const [vista, setVista] = useState<"lista" | "nuevo">("lista");
  const [form, setForm] = useState(EMPTY);
  const [ok, setOk] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [saving, setSaving] = useState(false);

  if (loading)
    return (
      <div className="apage">
        <p className="aempty">Cargando datos...</p>
      </div>
    );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    if (!form.titulo.trim()) return;

    try {
      setSaving(true);
      setErrMsg("");

      await addFormacion(form);

      setForm(EMPTY);
      setOk(true);

      setTimeout(() => {
        setOk(false);
        setVista("lista");
      }, 1400);

    } catch (err: any) {
      setErrMsg(err?.message || "Error al guardar formación");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Formación</h1>
          <p className="apage__sub">{formacion.length} entradas</p>
        </div>

        <div className="apage__btns">
          <button onClick={() => setVista("lista")} className={`apage__tab ${vista==="lista"?"apage__tab--on":""}`}>
            <List size={13}/> Lista
          </button>

          <button onClick={() => setVista("nuevo")} className={`apage__tab ${vista==="nuevo"?"apage__tab--on":""}`}>
            <Plus size={13}/> Nuevo
          </button>
        </div>
      </div>

      {vista === "lista" && (
        <div className="atable-wrap">
          {formacion.map((f) => (
            <div key={f.id} className="atable-row">
              <div>{f.titulo}</div>
              <div>{f.centro}</div>
              <div>{f.año}</div>
              <div>
                <button onClick={() => deleteFormacion(f.id)}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {vista === "nuevo" && (
        <div className="aform">
          <input name="titulo" value={form.titulo} onChange={onChange} placeholder="Título" />
          <input name="centro" value={form.centro} onChange={onChange} placeholder="Centro" />
          <input name="año" value={form.año} onChange={onChange} placeholder="Año" />
          <input name="descripcion" value={form.descripcion} onChange={onChange} placeholder="Descripción" />
          {errMsg && <div className="aform__err">✗ {errMsg}</div>}

          {ok && <p>Guardado ✔</p>}

          <button onClick={onSubmit} disabled={saving}>
            {saving ? "Guardando..." : "Crear"}
          </button>
        </div>
      )}
    </div>
  );
}