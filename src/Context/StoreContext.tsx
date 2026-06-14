import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { supabase } from "../lib/supabase";

import type { ICurso } from "../model/interfaces/ICurso";
import type { IServicio } from "../model/interfaces/IServicio";
import type { ITrabajo } from "../model/interfaces/ITrabajos";
import type { IFormacion } from "../model/interfaces/IFormacion";

interface Store {
  cursos: ICurso[];
  servicios: IServicio[];
  trabajos: ITrabajo[];
  formacion: IFormacion[];
  loading: boolean;
  error: string | null;
  addCurso: (curso: Omit<ICurso, "id">) => Promise<void>;
  addServicio: (servicio: Omit<IServicio, "id">) => Promise<void>;
  addTrabajo: (trabajo: Omit<ITrabajo, "id">) => Promise<void>;
  addFormacion: (item: Omit<IFormacion, "id">) => Promise<void>;
  deleteCurso: (id: number) => Promise<void>;
  deleteServicio: (id: number) => Promise<void>;
  deleteTrabajo: (id: number) => Promise<void>;
  deleteFormacion: (id: number) => Promise<void>;
}

const StoreContext = createContext<Store>({} as Store);

function listToString(v: string | string[] | undefined | null): string {
  if (!v) return "";
  if (Array.isArray(v)) return v.join(", ");
  return v;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cursos, setCursos] = useState<ICurso[]>([]);
  const [servicios, setServicios] = useState<IServicio[]>([]);
  const [trabajos, setTrabajos] = useState<ITrabajo[]>([]);
  const [formacion, setFormacion] = useState<IFormacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarTodo();

    const channel = supabase
      ?.channel("portfolio-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "cursos" }, cargarCursos)
      .on("postgres_changes", { event: "*", schema: "public", table: "servicios" }, cargarServicios)
      .on("postgres_changes", { event: "*", schema: "public", table: "trabajos" }, cargarTrabajos)
      .on("postgres_changes", { event: "*", schema: "public", table: "formacion" }, cargarFormacion)
      .subscribe();

    return () => {
      if (channel) supabase?.removeChannel(channel);
    };
  }, []);

  async function cargarTodo() {
    setLoading(true);
    await Promise.all([cargarCursos(), cargarServicios(), cargarTrabajos(), cargarFormacion()]);
    setLoading(false);
  }

  async function cargarCursos() {
    if (!supabase) return;
    const { data, error } = await supabase.from("cursos").select("*").order("id", { ascending: false });
    if (error) { console.error("Error cargando cursos", error); setError(error.message); return; }
    setCursos(data || []);
  }

  async function cargarServicios() {
    if (!supabase) return;
    const { data, error } = await supabase.from("servicios").select("*").order("id", { ascending: false });
    if (error) { console.error("Error cargando servicios", error); setError(error.message); return; }
    setServicios(data || []);
  }

  async function cargarTrabajos() {
    if (!supabase) return;
    const { data, error } = await supabase.from("trabajos").select("*").order("id", { ascending: false });
    if (error) { console.error("Error cargando trabajos", error); setError(error.message); return; }
    setTrabajos(data || []);
  }

  async function cargarFormacion() {
    if (!supabase) return;
    const { data, error } = await supabase.from("formacion").select("*").order("id", { ascending: false });
    if (error) { console.error("Error cargando formación", error); setError(error.message); return; }
    setFormacion(data || []);
  }

  async function addCurso(curso: Omit<ICurso, "id">) {
    if (!supabase) throw new Error("Supabase no está configurado");
    const { data, error } = await supabase.from("cursos").insert({
      ...curso,
      tags: listToString(curso.tags),
      fecha: curso.fecha || new Date().toISOString(),
    }).select().single();
    if (error) throw error;
    if (data) setCursos((prev) => [data, ...prev]);
  }

  async function addServicio(servicio: Omit<IServicio, "id">) {
    if (!supabase) throw new Error("Supabase no está configurado");
    const { data, error } = await supabase.from("servicios").insert({
      ...servicio,
      caracteristicas: listToString(servicio.caracteristicas),
      fecha: servicio.fecha || new Date().toISOString(),
    }).select().single();
    if (error) throw error;
    if (data) setServicios((prev) => [data, ...prev]);
  }

  async function addTrabajo(trabajo: Omit<ITrabajo, "id">) {
    if (!supabase) throw new Error("Supabase no está configurado");
    const { data, error } = await supabase.from("trabajos").insert({
      ...trabajo,
      tags: listToString(trabajo.tags),
      fecha: trabajo.fecha || new Date().toISOString(),
    }).select().single();
    if (error) throw error;
    if (data) setTrabajos((prev) => [data, ...prev]);
  }

  async function addFormacion(item: Omit<IFormacion, "id">) {
    if (!supabase) throw new Error("Supabase no está configurado");
    const { data, error } = await supabase.from("formacion").insert({
      ...item,
      fecha: item.fecha || new Date().toISOString(),
    }).select().single();
    if (error) throw error;
    if (data) setFormacion((prev) => [data, ...prev]);
  }

  async function deleteCurso(id: number) {
    if (!supabase) return;
    const { error } = await supabase.from("cursos").delete().eq("id", id);
    if (error) { console.error("Error borrando curso", error); return; }
    setCursos((prev) => prev.filter((c) => c.id !== id));
  }

  async function deleteServicio(id: number) {
    if (!supabase) return;
    const { error } = await supabase.from("servicios").delete().eq("id", id);
    if (error) { console.error("Error borrando servicio", error); return; }
    setServicios((prev) => prev.filter((s) => s.id !== id));
  }

  async function deleteTrabajo(id: number) {
    if (!supabase) return;
    const { error } = await supabase.from("trabajos").delete().eq("id", id);
    if (error) { console.error("Error borrando trabajo", error); return; }
    setTrabajos((prev) => prev.filter((t) => t.id !== id));
  }

  async function deleteFormacion(id: number) {
    if (!supabase) return;
    const { error } = await supabase.from("formacion").delete().eq("id", id);
    if (error) { console.error("Error borrando formación", error); return; }
    setFormacion((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <StoreContext.Provider value={{
      cursos, servicios, trabajos, formacion, loading, error,
      addCurso, addServicio, addTrabajo, addFormacion,
      deleteCurso, deleteServicio, deleteTrabajo, deleteFormacion,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
