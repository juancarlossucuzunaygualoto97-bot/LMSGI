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

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [field]: e.target.value });

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

        <input placeholder="Título"          value={form.titulo}    onChange={set("titulo")}    />
        <input placeholder="Academia"        value={form.academia}  onChange={set("academia")}  />
        <input placeholder="Categoría"       value={form.categoria} onChange={set("categoria")} />
        <input placeholder="Imagen URL"      value={form.imagen}    onChange={set("imagen")}    />
        <input placeholder="Precio" type="number" value={form.precio} onChange={set("precio")}  />
        <input placeholder="Fecha"           value={form.fecha}     onChange={set("fecha")}     />
        <input placeholder="Tags separados por comas" value={form.tags} onChange={set("tags")} />

        <textarea
          placeholder="Descripción"
          value={form.descripcion}
          onChange={set("descripcion")}
        />

        <div className="modal-actions">
          <button onClick={guardar}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}