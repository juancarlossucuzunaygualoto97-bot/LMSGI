import { useState } from "react";
import { useStore } from "../Context/StoreContext";

interface Props {
  onClose: () => void;
}

export default function ServiciosModal({ onClose }: Props) {
  const { addServicio } = useStore();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    tipo: "",
    precio: 0,
    icono: "",
    imagen: "",
    caracteristicas: "",
  });

  async function guardar() {
    await addServicio({
      nombre: form.nombre,
      descripcion: form.descripcion,
      tipo: form.tipo,
      precio: Number(form.precio),
      icono: form.icono,
      imagen: form.imagen,
      caracteristicas: form.caracteristicas
        .split(",")
        .map((c) => c.trim()),
    });

    onClose();
  }

  return (
    <div className="modal-bg">
      <div className="modal-card">
        <h2>Nuevo Servicio</h2>

        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) =>
            setForm({ ...form, nombre: e.target.value })
          }
        />

        <input
          placeholder="Tipo"
          value={form.tipo}
          onChange={(e) =>
            setForm({ ...form, tipo: e.target.value })
          }
        />

        <input
          placeholder="Imagen URL"
          value={form.imagen}
          onChange={(e) =>
            setForm({ ...form, imagen: e.target.value })
          }
        />

        <input
          placeholder="Icono"
          value={form.icono}
          onChange={(e) =>
            setForm({ ...form, icono: e.target.value })
          }
        />

        <input
          placeholder="Precio"
          type="number"
          value={form.precio}
          onChange={(e) =>
            setForm({ ...form, precio: Number(e.target.value) })
          }
        />

        <input
          placeholder="Características separadas por comas"
          value={form.caracteristicas}
          onChange={(e) =>
            setForm({
              ...form,
              caracteristicas: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Descripción"
          value={form.descripcion}
          onChange={(e) =>
            setForm({ ...form, descripcion: e.target.value })
          }
        />

        <div className="modal-actions">
          <button onClick={guardar}>
            Guardar
          </button>

          <button onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}