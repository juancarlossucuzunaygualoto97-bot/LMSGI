import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { supabase } from "../lib/supabase";

export interface ICurso     { id: number; titulo: string; academia: string; categoria: string; precio: number; }
export interface IServicio  { id: number; nombre: string; descripcion: string; tipo: string; precio: number; icono: string; caracteristicas: string; }
export interface ITrabajo   { id: number; titulo: string; descripcion: string; tags: string; link: string; estado: string; }
export interface IFormacion { id: number; titulo: string; centro: string; año: string; descripcion: string; }

interface Store {
  cursos: ICurso[]; servicios: IServicio[]; trabajos: ITrabajo[]; formacion: IFormacion[];
  loading: boolean;
  addCurso(c: Omit<ICurso,"id">): Promise<void>;
  addServicio(s: Omit<IServicio,"id">): Promise<void>;
  addTrabajo(t: Omit<ITrabajo,"id">): Promise<void>;
  addFormacion(f: Omit<IFormacion,"id">): Promise<void>;
  deleteCurso(id: number): Promise<void>;
  deleteServicio(id: number): Promise<void>;
  deleteTrabajo(id: number): Promise<void>;
  deleteFormacion(id: number): Promise<void>;
}

const Ctx = createContext<Store>({} as Store);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cursos,    setCursos]    = useState<ICurso[]>([]);
  const [servicios, setServicios] = useState<IServicio[]>([]);
  const [trabajos,  setTrabajos]  = useState<ITrabajo[]>([]);
  const [formacion, setFormacion] = useState<IFormacion[]>([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    async function cargarTodo() {
      setLoading(true);
      const [c, s, t, f] = await Promise.all([
        supabase.from("cursos").select("*").order("id"),
        supabase.from("servicios").select("*").order("id"),
        supabase.from("trabajos").select("*").order("id"),
        supabase.from("formacion").select("*").order("id"),
      ]);
      if (c.data) setCursos(c.data);
      if (s.data) setServicios(s.data);
      if (t.data) setTrabajos(t.data);
      if (f.data) setFormacion(f.data);
      setLoading(false);
    }
    cargarTodo();
  }, []);

  useEffect(() => {
    const ch = supabase.channel("realtime-all")
      .on("postgres_changes", { event: "*", schema: "public", table: "cursos" },
        () => supabase.from("cursos").select("*").order("id").then(r => r.data && setCursos(r.data)))
      .on("postgres_changes", { event: "*", schema: "public", table: "servicios" },
        () => supabase.from("servicios").select("*").order("id").then(r => r.data && setServicios(r.data)))
      .on("postgres_changes", { event: "*", schema: "public", table: "trabajos" },
        () => supabase.from("trabajos").select("*").order("id").then(r => r.data && setTrabajos(r.data)))
      .on("postgres_changes", { event: "*", schema: "public", table: "formacion" },
        () => supabase.from("formacion").select("*").order("id").then(r => r.data && setFormacion(r.data)))
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  async function addCurso(c: Omit<ICurso,"id">) {
    const { data } = await supabase.from("cursos").insert(c).select().single();
    if (data) setCursos(p => [...p, data]);
  }
  async function addServicio(s: Omit<IServicio,"id">) {
    const { data } = await supabase.from("servicios").insert(s).select().single();
    if (data) setServicios(p => [...p, data]);
  }
  async function addTrabajo(t: Omit<ITrabajo,"id">) {
    const { data } = await supabase.from("trabajos").insert(t).select().single();
    if (data) setTrabajos(p => [...p, data]);
  }
  async function addFormacion(f: Omit<IFormacion,"id">) {
    const { data } = await supabase.from("formacion").insert(f).select().single();
    if (data) setFormacion(p => [...p, data]);
  }

  async function deleteCurso(id: number) {
    await supabase.from("cursos").delete().eq("id", id);
    setCursos(p => p.filter(x => x.id !== id));
  }
  async function deleteServicio(id: number) {
    await supabase.from("servicios").delete().eq("id", id);
    setServicios(p => p.filter(x => x.id !== id));
  }
  async function deleteTrabajo(id: number) {
    await supabase.from("trabajos").delete().eq("id", id);
    setTrabajos(p => p.filter(x => x.id !== id));
  }
  async function deleteFormacion(id: number) {
    await supabase.from("formacion").delete().eq("id", id);
    setFormacion(p => p.filter(x => x.id !== id));
  }

  return (
    <Ctx.Provider value={{
      cursos, servicios, trabajos, formacion, loading,
      addCurso, addServicio, addTrabajo, addFormacion,
      deleteCurso, deleteServicio, deleteTrabajo, deleteFormacion,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useStore = () => useContext(Ctx);