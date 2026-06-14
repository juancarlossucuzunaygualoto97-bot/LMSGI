import { useState } from "react";
import { Trash2, Plus, List } from "lucide-react";
import { useStore } from "../../Context/StoreContext";

const EMPTY = {
  nombre: "",
  descripcion: "",
  tipo: "",
  precio: 0,
  icono: "",
  imagen: "",
  caracteristicas: ""
};

export default function AdminServicios() {
  const { servicios, addServicio, deleteServicio, loading } = useStore();

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

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    if (!form.nombre.trim()) return;

    try {
      setSaving(true);
      setErrMsg("");

      await addServicio({
        nombre: form.nombre,
        descripcion: form.descripcion,
        tipo: form.tipo,
        precio: form.precio ? Number(form.precio) : 0,
        icono: form.icono,
        imagen: form.imagen,
        caracteristicas: form.caracteristicas,
      });

      setForm(EMPTY);
      setOk(true);

      setTimeout(() => {
        setOk(false);
        setVista("lista");
      }, 1400);

    } catch (err: any) {
      setErrMsg(err?.message || "Error al guardar el servicio");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Servicios</h1>
          <p className="apage__sub">
            {servicios.length} servicios en Supabase
          </p>
        </div>

        <div className="apage__btns">
          <button
            className={`apage__tab ${
              vista === "lista" ? "apage__tab--on" : ""
            }`}
            onClick={() => setVista("lista")}
          >
            <List size={13} /> Listado
          </button>

          <button
            className={`apage__tab ${
              vista === "nuevo" ? "apage__tab--on" : ""
            }`}
            onClick={() => setVista("nuevo")}
          >
            <Plus size={13} /> Nuevo
          </button>
        </div>
      </div>

      {vista === "lista" && (
        <div className="atable-wrap">
          {servicios.length === 0 ? (
            <p className="aempty">No hay servicios. Pulsa "Nuevo" para añadir uno.</p>
          ) : (
            <table className="atable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Precio</th>
                  <th>Icono</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {servicios.map((s) => (
                  <tr key={s.id}>
                    <td className="atable__main">{s.nombre}</td>
                    <td>
                      <span className="abadge">{s.tipo}</span>
                    </td>
                    <td>{s.precio} €</td>
                    <td>{s.icono}</td>
                    <td>
                      <button
                        className="adel"
                        onClick={() => deleteServicio(s.id)}
                      >
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
            <h2 className="aform__titulo">Insertar Nuevo Servicio</h2>

            <div className="aform__grid">
              <div className="aform__field">
                <label>Nombre</label>
                <input name="nombre" value={form.nombre} onChange={onChange} />
              </div>

              <div className="aform__field">
                <label>Descripción</label>
                <input name="descripcion" value={form.descripcion} onChange={onChange} />
              </div>

              <div className="aform__field">
                <label>Tipo</label>
                <input name="tipo" value={form.tipo} onChange={onChange} />
              </div>

              <div className="aform__field">
                <label>Precio</label>
                <input name="precio" type="number" value={form.precio} onChange={onChange} />
              </div>

              <div className="aform__field">
                <label>Icono</label>
                <input name="icono" value={form.icono} onChange={onChange} />
              </div>

              <div className="aform__field">
                <label>Imagen URL</label>
                <input name="imagen" value={form.imagen} onChange={onChange} />
              </div>

              <div className="aform__field aform__field--full">
                <label>Características (separadas por coma)</label>
                <input name="caracteristicas" value={form.caracteristicas} onChange={onChange} />
              </div>
            </div>

            {errMsg && (
              <div className="aform__err">✗ {errMsg}</div>
            )}

            {ok && (
              <div className="aform__ok">✓ Servicio guardado correctamente</div>
            )}

            <button className="aform__submit" onClick={onSubmit} disabled={saving}>
              {saving ? "Guardando..." : "Insertar Servicio"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}