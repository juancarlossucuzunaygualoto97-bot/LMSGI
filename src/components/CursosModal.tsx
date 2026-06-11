import { useState } from "react";
import { useStore } from "../Context/StoreContext";

interface Props {
  onClose: () => void;
}

export default function CursosModal({ onClose }: Props) {
  const { addCurso } = useStore();

  const [form, setForm] = useState({
    titulo: "",
    academia: "",
    categoria: "",
    precio: 0,
    imagen: "",
    descripcion: "",
    fecha: "",
    tags: "",
  });

  async function guardar() {
    await addCurso({
      titulo: form.titulo,
      academia: form.academia,
      categoria: form.categoria,
      precio: Number(form.precio),
      imagen: form.imagen,
      descripcion: form.descripcion,
      fecha: form.fecha,
      tags: form.tags.split(",").map((x) => x.trim()),
    });

    onClose();
  }

  return (
    <div className="modal-bg">
      <div className="modal-card">
        <h2>Nuevo Curso</h2>

        <input
          placeholder="Título"
          value={form.titulo}
          onChange={(e) =>
            setForm({ ...form, titulo: e.target.value })
          }
        />

        <input
          placeholder="Academia"
          value={form.academia}
          onChange={(e) =>
            setForm({ ...form, academia: e.target.value })
          }
        />

        <input
          placeholder="Categoría"
          value={form.categoria}
          onChange={(e) =>
            setForm({ ...form, categoria: e.target.value })
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
          placeholder="Precio"
          type="number"
          value={form.precio}
          onChange={(e) =>
            setForm({ ...form, precio: Number(e.target.value) })
          }
        />

        <input
          placeholder="Fecha"
          value={form.fecha}
          onChange={(e) =>
            setForm({ ...form, fecha: e.target.value })
          }
        />

        <input
          placeholder="Tags separados por comas"
          value={form.tags}
          onChange={(e) =>
            setForm({ ...form, tags: e.target.value })
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