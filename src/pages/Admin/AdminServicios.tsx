import { useState } from "react";
import { Trash2, Plus, List } from "lucide-react";
import { useStore } from "../../Context/StoreContext";

const EMPTY = { nombre: "", descripcion: "", tipo: "", precio: "", icono: "", caracteristicas: "" };

export default function AdminServicios() {
  const { servicios, addServicio, deleteServicio, loading } = useStore();
  const [vista, setVista] = useState<"lista"|"nuevo">("lista");
  const [form, setForm]   = useState(EMPTY);
  const [ok, setOk]       = useState(false);
  const [saving, setSaving] = useState(false);

  if (loading) return <div className="apage"><p className="aempty">Cargando datos desde Supabase...</p></div>;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async () => {
    if (!form.nombre.trim()) return;
    setSaving(true);
    await addServicio({ nombre: form.nombre, descripcion: form.descripcion, tipo: form.tipo, precio: Number(form.precio), icono: form.icono, caracteristicas: form.caracteristicas });
    setForm(EMPTY);
    setOk(true);
    setSaving(false);
    setTimeout(() => { setOk(false); setVista("lista"); }, 1400);
  };

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Servicios</h1>
          <p className="apage__sub">{servicios.length} servicios en Supabase</p>
        </div>
        <div className="apage__btns">
          <button className={`apage__tab ${vista==="lista"?"apage__tab--on":""}`} onClick={()=>setVista("lista")}><List size={13}/> Listado</button>
          <button className={`apage__tab ${vista==="nuevo"?"apage__tab--on":""}`} onClick={()=>setVista("nuevo")}><Plus size={13}/> Nuevo</button>
        </div>
      </div>

      {vista === "lista" && (
        <div className="atable-wrap">
          {servicios.length === 0
            ? <p className="aempty">No hay servicios. Pulsa "Nuevo" para añadir uno.</p>
            : (
              <table className="atable">
                <thead><tr><th>Nombre</th><th>Tipo</th><th>Precio</th><th>Icono</th><th></th></tr></thead>
                <tbody>
                  {servicios.map(s => (
                    <tr key={s.id}>
                      <td className="atable__main">{s.nombre}</td>
                      <td><span className="abadge">{s.tipo}</span></td>
                      <td>{s.precio} €</td>
                      <td>{s.icono}</td>
                      <td><button className="adel" onClick={() => deleteServicio(s.id)}><Trash2 size={13}/></button></td>
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
            <h2 className="aform__titulo">Insertar Nuevo Servicio</h2>
            <p className="aform__sub">Complete el formulario con la información del servicio.</p>
            <div className="aform__grid">
              <div className="aform__field">
                <label>Nombre</label>
                <input name="nombre" value={form.nombre} onChange={onChange} placeholder="Nombre del servicio"/>
              </div>
              <div className="aform__field">
                <label>Descripción</label>
                <input name="descripcion" value={form.descripcion} onChange={onChange} placeholder="Descripción"/>
              </div>
              <div className="aform__field">
                <label>Tipo</label>
                <input name="tipo" value={form.tipo} onChange={onChange} placeholder="Tipo de servicio"/>
              </div>
              <div className="aform__field">
                <label>Precio</label>
                <input name="precio" type="number" value={form.precio} onChange={onChange} placeholder="Precio"/>
              </div>
              <div className="aform__field">
                <label>Icono</label>
                <input name="icono" value={form.icono} onChange={onChange} placeholder="Nombre del icono"/>
              </div>
              <div className="aform__field aform__field--full">
                <label>Características (separadas por coma)</label>
                <input name="caracteristicas" value={form.caracteristicas} onChange={onChange} placeholder="caracto1, caracto2, caracto3"/>
              </div>
            </div>
            {ok && <div className="aform__ok">✓ Servicio guardado en Supabase correctamente</div>}
            <button className="aform__submit" onClick={onSubmit} disabled={saving}>
              {saving ? "Guardando..." : "Insertar Servicio"}
            </button>
            <p className="aform__legal">By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
          </div>
        </div>
      )}
    </div>
  );
}