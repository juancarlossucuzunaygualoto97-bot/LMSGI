import {
  createContext,
  useContext,
  useState,
  useEffect,
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

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
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

  useEffect(() => {
    const channel = supabase
      .channel("portfolio-realtime")

      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cursos" },
        async () => {
          const { data } = await supabase
            .from("cursos")
            .select("*")
            .order("id");

          if (data) setCursos(data);
        }
      )

      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "servicios" },
        async () => {
          const { data } = await supabase
            .from("servicios")
            .select("*")
            .order("id");

          if (data) setServicios(data);
        }
      )

      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "trabajos" },
        async () => {
          const { data } = await supabase
            .from("trabajos")
            .select("*")
            .order("id");

          if (data) setTrabajos(data);
        }
      )

      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "formacion" },
        async () => {
          const { data } = await supabase
            .from("formacion")
            .select("*")
            .order("id");

          if (data) setFormacion(data);
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function addCurso(c: Omit<ICurso, "id">) {
    await supabase.from("cursos").insert(c);
  }

  async function addServicio(s: Omit<IServicio, "id">) {
    await supabase.from("servicios").insert(s);
  }

  async function addTrabajo(t: Omit<ITrabajo, "id">) {
    await supabase.from("trabajos").insert(t);
  }

  async function addFormacion(f: Omit<IFormacion, "id">) {
    await supabase.from("formacion").insert(f);
  }

  async function deleteCurso(id: number) {
    await supabase.from("cursos").delete().eq("id", id);
  }

  async function deleteServicio(id: number) {
    await supabase.from("servicios").delete().eq("id", id);
  }

  async function deleteTrabajo(id: number) {
    await supabase.from("trabajos").delete().eq("id", id);
  }

  async function deleteFormacion(id: number) {
    await supabase.from("formacion").delete().eq("id", id);
  }

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