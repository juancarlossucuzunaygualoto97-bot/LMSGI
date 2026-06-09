import { useState } from "react";
import { Trash2, Plus, List } from "lucide-react";
import { useStore } from "../../Context/StoreContext";

const EMPTY = { titulo: "", academia: "", categoria: "", precio: "" };

export default function AdminCursos() {
  const { cursos, addCurso, deleteCurso, loading } = useStore();
  const [vista, setVista] = useState<"lista"|"nuevo">("lista");
  const [form, setForm]   = useState(EMPTY);
  const [ok, setOk]       = useState(false);
  const [saving, setSaving] = useState(false);

  if (loading) return <div className="apage"><p className="aempty">Cargando datos desde Supabase...</p></div>;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async () => {
    if (!form.titulo.trim() || !form.academia.trim()) return;
    setSaving(true);
    await addCurso({ titulo: form.titulo, academia: form.academia, categoria: form.categoria, precio: Number(form.precio) });
    setForm(EMPTY);
    setOk(true);
    setSaving(false);
    setTimeout(() => { setOk(false); setVista("lista"); }, 1400);
  };

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Cursos</h1>
          <p className="apage__sub">{cursos.length} cursos en Supabase</p>
        </div>
        <div className="apage__btns">
          <button className={`apage__tab ${vista==="lista"?"apage__tab--on":""}`} onClick={()=>setVista("lista")}>
            <List size={13}/> Listado
          </button>
          <button className={`apage__tab ${vista==="nuevo"?"apage__tab--on":""}`} onClick={()=>setVista("nuevo")}>
            <Plus size={13}/> Nuevo
          </button>
        </div>
      </div>

      {vista === "lista" && (
        <div className="atable-wrap">
          {cursos.length === 0
            ? <p className="aempty">No hay cursos. Pulsa "Nuevo" para añadir uno.</p>
            : (
              <table className="atable">
                <thead>
                  <tr><th>Título</th><th>Academia</th><th>Categoría</th><th>Precio</th><th></th></tr>
                </thead>
                <tbody>
                  {cursos.map(c => (
                    <tr key={c.id}>
                      <td className="atable__main">{c.titulo}</td>
                      <td>{c.academia}</td>
                      <td><span className="abadge">{c.categoria}</span></td>
                      <td>{c.precio} €</td>
                      <td>
                        <button className="adel" onClick={() => deleteCurso(c.id)}>
                          <Trash2 size={13}/>
                        </button>
                      </td>
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
            <h2 className="aform__titulo">Insertar Nuevo Curso</h2>
            <p className="aform__sub">Inserta un nuevo curso en tu portafolio personal.</p>
            <div className="aform__grid">
              <div className="aform__field">
                <label>Título</label>
                <input name="titulo" value={form.titulo} onChange={onChange} placeholder="Título del curso"/>
              </div>
              <div className="aform__field">
                <label>Academia</label>
                <input name="academia" value={form.academia} onChange={onChange} placeholder="Academia del curso"/>
              </div>
              <div className="aform__field">
                <label>Categoría</label>
                <input name="categoria" value={form.categoria} onChange={onChange} placeholder="Categoría del curso"/>
              </div>
              <div className="aform__field">
                <label>Precio</label>
                <input name="precio" type="number" value={form.precio} onChange={onChange} placeholder="Precio del curso"/>
              </div>
            </div>
            {ok && <div className="aform__ok">✓ Curso guardado en Supabase correctamente</div>}
            <button className="aform__submit" onClick={onSubmit} disabled={saving}>
              {saving ? "Guardando..." : "Insertar Curso"}
            </button>
            <p className="aform__legal">By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
          </div>
        </div>
      )}
    </div>
  );
}