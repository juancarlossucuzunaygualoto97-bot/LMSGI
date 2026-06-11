import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
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

  addCurso(c: Omit<ICurso, "id">): Promise<void>;
  addServicio(s: Omit<IServicio, "id">): Promise<void>;
  addTrabajo(t: Omit<ITrabajo, "id">): Promise<void>;
  addFormacion(f: Omit<IFormacion, "id">): Promise<void>;

  deleteCurso(id: number): Promise<void>;
  deleteServicio(id: number): Promise<void>;
  deleteTrabajo(id: number): Promise<void>;
  deleteFormacion(id: number): Promise<void>;
}

const Ctx = createContext<Store>({} as Store);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cursos, setCursos] = useState<ICurso[]>([]);
  const [servicios, setServicios] = useState<IServicio[]>([]);
  const [trabajos, setTrabajos] = useState<ITrabajo[]>([]);
  const [formacion, setFormacion] = useState<IFormacion[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD ================= */
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const { data: cursos } = await supabase.from("cursos").select("*");
      const { data: servicios } = await supabase.from("servicios").select("*");
      const { data: trabajos } = await supabase.from("trabajos").select("*");
      const { data: formacion } = await supabase.from("formacion").select("*");

      setCursos(cursos || []);
      setServicios(servicios || []);
      setTrabajos(trabajos || []);
      setFormacion(formacion || []);

      setLoading(false);
    };

    load();
  }, []);

  /* ================= REALTIME ================= */
  useEffect(() => {
    const channel = supabase
      .channel("realtime-all")
      .on("postgres_changes", { event: "*", schema: "public", table: "cursos" }, () =>
        supabase.from("cursos").select("*").then(({ data }) => data && setCursos(data))
      )
      .on("postgres_changes", { event: "*", schema: "public", table: "servicios" }, () =>
        supabase.from("servicios").select("*").then(({ data }) => data && setServicios(data))
      )
      .on("postgres_changes", { event: "*", schema: "public", table: "trabajos" }, () =>
        supabase.from("trabajos").select("*").then(({ data }) => data && setTrabajos(data))
      )
      .on("postgres_changes", { event: "*", schema: "public", table: "formacion" }, () =>
        supabase.from("formacion").select("*").then(({ data }) => data && setFormacion(data))
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /* ================= ADD ================= */
  const addCurso = async (c: Omit<ICurso, "id">) => {
    const { data } = await supabase.from("cursos").insert(c).select().single();
    if (data) setCursos((p) => [...p, data]);
  };

  const addServicio = async (s: Omit<IServicio, "id">) => {
    const { data } = await supabase.from("servicios").insert(s).select().single();
    if (data) setServicios((p) => [...p, data]);
  };

  const addTrabajo = async (t: Omit<ITrabajo, "id">) => {
    const { data } = await supabase.from("trabajos").insert(t).select().single();
    if (data) setTrabajos((p) => [...p, data]);
  };

  const addFormacion = async (f: Omit<IFormacion, "id">) => {
    const { data } = await supabase.from("formacion").insert(f).select().single();
    if (data) setFormacion((p) => [...p, data]);
  };

  /* ================= DELETE ================= */
  const deleteCurso = async (id: number) => {
    await supabase.from("cursos").delete().eq("id", id);
    setCursos((p) => p.filter((x) => x.id !== id));
  };

  const deleteServicio = async (id: number) => {
    await supabase.from("servicios").delete().eq("id", id);
    setServicios((p) => p.filter((x) => x.id !== id));
  };

  const deleteTrabajo = async (id: number) => {
    await supabase.from("trabajos").delete().eq("id", id);
    setTrabajos((p) => p.filter((x) => x.id !== id));
  };

  const deleteFormacion = async (id: number) => {
    await supabase.from("formacion").delete().eq("id", id);
    setFormacion((p) => p.filter((x) => x.id !== id));
  };

  return (
    <Ctx.Provider
      value={{
        cursos,
        servicios,
        trabajos,
        formacion,
        loading,
        addCurso,
        addServicio,
        addTrabajo,
        addFormacion,
        deleteCurso,
        deleteServicio,
        deleteTrabajo,
        deleteFormacion,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useStore = () => useContext(Ctx);