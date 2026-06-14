import { useState } from "react";
import { Trash2, Plus, List } from "lucide-react";
import { useStore } from "../../Context/StoreContext";

const EMPTY = { titulo: "", descripcion: "", imagen: "", tags: "", link: "", estado: "Completado" };

export default function AdminTrabajos() {
  const { trabajos, addTrabajo, deleteTrabajo, loading } = useStore();
  const [vista, setVista] = useState<"lista"|"nuevo">("lista");
  const [form, setForm]   = useState(EMPTY);
  const [ok, setOk]       = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [saving, setSaving] = useState(false);

  if (loading) return <div className="apage"><p className="aempty">Cargando datos desde Supabase...</p></div>;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async () => {
    if (!form.titulo.trim()) return;
    try {
      setSaving(true);
      setErrMsg("");
      await addTrabajo({
        titulo: form.titulo,
        descripcion: form.descripcion,
        tags: form.tags,
        link: form.link,
        estado: form.estado,
      });
      setForm(EMPTY);
      setOk(true);
      setTimeout(() => { setOk(false); setVista("lista"); }, 1400);
    } catch (err: any) {
      setErrMsg(err?.message || "Error al guardar trabajo");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Trabajos</h1>
          <p className="apage__sub">{trabajos.length} trabajos en Supabase</p>
        </div>
        <div className="apage__btns">
          <button className={`apage__tab ${vista==="lista"?"apage__tab--on":""}`} onClick={()=>setVista("lista")}><List size={13}/> Listado</button>
          <button className={`apage__tab ${vista==="nuevo"?"apage__tab--on":""}`} onClick={()=>setVista("nuevo")}><Plus size={13}/> Nuevo</button>
        </div>
      </div>

      {vista === "lista" && (
        <div className="atable-wrap">
          {trabajos.length === 0
            ? <p className="aempty">No hay trabajos. Pulsa "Nuevo" para añadir uno.</p>
            : (
              <table className="atable">
                <thead><tr><th>Título</th><th>Tags</th><th>Estado</th><th>Link</th><th></th></tr></thead>
                <tbody>
                  {trabajos.map(t => (
                    <tr key={t.id}>
                      <td className="atable__main">{t.titulo}</td>
                      <td><span className="abadge">{t.tags}</span></td>
                      <td><span className={`astatus astatus--${t.estado === "Completado" ? "done" : "process"}`}>● {t.estado}</span></td>
                      <td><a href={t.link} className="alink" target="_blank" rel="noreferrer">{t.link || "—"}</a></td>
                      <td><button className="adel" onClick={() => deleteTrabajo(t.id)}><Trash2 size={13}/></button></td>
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
            <h2 className="aform__titulo">Nuevo Trabajo</h2>
            <p className="aform__sub">Complete el formulario con la información del proyecto.</p>
            <div className="aform__grid">
              <div className="aform__field">
                <label>Título</label>
                <input name="titulo" value={form.titulo} onChange={onChange} placeholder="Nombre del proyecto"/>
              </div>
              <div className="aform__field">
                <label>Descripción</label>
                <input name="descripcion" value={form.descripcion} onChange={onChange} placeholder="Descripción del proyecto"/>
              </div>
              <div className="aform__field">
                <label>Imagen URL</label>
                <input name="imagen" value={form.imagen} onChange={onChange} placeholder="https://..."/>
              </div>
              <div className="aform__field">
                <label>Tags (separados por coma)</label>
                <input name="tags" value={form.tags} onChange={onChange} placeholder="React, TypeScript, CSS"/>
              </div>
              <div className="aform__field">
                <label>Link</label>
                <input name="link" value={form.link} onChange={onChange} placeholder="https://..."/>
              </div>
              <div className="aform__field">
                <label>Estado</label>
                <select name="estado" value={form.estado} onChange={onChange} className="aform__select">
                  <option value="Completado">Completado</option>
                  <option value="En desarrollo">En desarrollo</option>
                </select>
              </div>
            </div>
            {errMsg && <div className="aform__err">✗ {errMsg}</div>}
            {ok && <div className="aform__ok">✓ Trabajo guardado correctamente</div>}
            <button className="aform__submit" onClick={onSubmit} disabled={saving}>
              {saving ? "Guardando..." : "Insertar Trabajo"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}