import { useState } from "react";
import { Trash2, Plus, List } from "lucide-react";
import { useStore } from "../../Context/StoreContext";

const EMPTY = { titulo: "", centro: "", año: "", descripcion: "" };

export default function AdminFormacion() {
  const { formacion, addFormacion, deleteFormacion, loading } = useStore();
  const [vista, setVista] = useState<"lista"|"nuevo">("lista");
  const [form, setForm]   = useState(EMPTY);
  const [ok, setOk]       = useState(false);
  const [saving, setSaving] = useState(false);

  if (loading) return <div className="apage"><p className="aempty">Cargando datos desde Supabase...</p></div>;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async () => {
    if (!form.titulo.trim()) return;
    setSaving(true);
    await addFormacion(form);
    setForm(EMPTY);
    setOk(true);
    setSaving(false);
    setTimeout(() => { setOk(false); setVista("lista"); }, 1400);
  };

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Formación</h1>
          <p className="apage__sub">{formacion.length} entradas en Supabase</p>
        </div>
        <div className="apage__btns">
          <button className={`apage__tab ${vista==="lista"?"apage__tab--on":""}`} onClick={()=>setVista("lista")}><List size={13}/> Listado</button>
          <button className={`apage__tab ${vista==="nuevo"?"apage__tab--on":""}`} onClick={()=>setVista("nuevo")}><Plus size={13}/> Nuevo</button>
        </div>
      </div>

      {vista === "lista" && (
        <div className="atable-wrap">
          {formacion.length === 0
            ? <p className="aempty">No hay formación. Pulsa "Nuevo" para añadir una.</p>
            : (
              <table className="atable">
                <thead><tr><th>Título</th><th>Centro</th><th>Año</th><th>Descripción</th><th></th></tr></thead>
                <tbody>
                  {formacion.map(f => (
                    <tr key={f.id}>
                      <td className="atable__main">{f.titulo}</td>
                      <td>{f.centro}</td>
                      <td><span className="abadge">{f.año}</span></td>
                      <td className="atable__desc">{f.descripcion}</td>
                      <td><button className="adel" onClick={() => deleteFormacion(f.id)}><Trash2 size={13}/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          }
        </div>
      )}

      {vista === "nuevo" && (
        <div className="aform-wrap">
          <div className="aform">
            <h2 className="aform__titulo">Nueva Formación</h2>
            <p className="aform__sub">Complete el formulario con la información académica.</p>
            <div className="aform__grid">
              <div className="aform__field">
                <label>Título</label>
                <input name="titulo" value={form.titulo} onChange={onChange} placeholder="Grado Superior ASIR"/>
              </div>
              <div className="aform__field">
                <label>Centro</label>
                <input name="centro" value={form.centro} onChange={onChange} placeholder="IES / Universidad"/>
              </div>
              <div className="aform__field">
                <label>Año</label>
                <input name="año" value={form.año} onChange={onChange} placeholder="2024 - Presente"/>
              </div>
              <div className="aform__field">
                <label>Descripción</label>
                <input name="descripcion" value={form.descripcion} onChange={onChange} placeholder="Descripción breve"/>
              </div>
            </div>
            {ok && <div className="aform__ok">✓ Formación guardada en Supabase correctamente</div>}
            <button className="aform__submit" onClick={onSubmit} disabled={saving}>
              {saving ? "Guardando..." : "Insertar Formación"}
            </button>
            <p className="aform__legal">By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
          </div>
        </div>
      )}
    </div>
  );
}