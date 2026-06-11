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

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cursos, setCursos] = useState<ICurso[]>([]);
  const [servicios, setServicios] = useState<IServicio[]>([]);
  const [trabajos, setTrabajos] = useState<ITrabajo[]>([]);
  const [formacion, setFormacion] = useState<IFormacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarTodo();

    const channel = supabase
      .channel("portfolio-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cursos" },
        cargarCursos
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "servicios" },
        cargarServicios
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "trabajos" },
        cargarTrabajos
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "formacion" },
        cargarFormacion
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function cargarTodo() {
    setLoading(true);

    await Promise.all([
      cargarCursos(),
      cargarServicios(),
      cargarTrabajos(),
      cargarFormacion(),
    ]);

    setLoading(false);
  }

  async function cargarCursos() {
    const { data, error } = await supabase
      .from("cursos")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("No se pudieron cargar los cursos", error);
      return;
    }

    setCursos(data || []);
  }

  async function cargarServicios() {
    const { data, error } = await supabase
      .from("servicios")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("No se pudieron cargar los servicios", error);
      return;
    }

    setServicios(data || []);
  }

  async function cargarTrabajos() {
    const { data, error } = await supabase
      .from("trabajos")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("No se pudieron cargar los trabajos", error);
      return;
    }

    setTrabajos(data || []);
  }

  async function cargarFormacion() {
    const { data, error } = await supabase
      .from("formacion")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("No se pudo cargar la formación", error);
      return;
    }

    setFormacion(data || []);
  }

  async function addCurso(curso: Omit<ICurso, "id">) {
    const { data, error } = await supabase
      .from("cursos")
      .insert(curso)
      .select()
      .single();

    if (error) {
      console.error("No se pudo guardar el curso", error);
      return;
    }

    if (data) {
      setCursos((actual) => [data, ...actual]);
    }
  }

  async function addServicio(servicio: Omit<IServicio, "id">) {
    const { data, error } = await supabase
      .from("servicios")
      .insert(servicio)
      .select()
      .single();

    if (error) {
      console.error("No se pudo guardar el servicio", error);
      return;
    }

    if (data) {
      setServicios((actual) => [data, ...actual]);
    }
  }

  async function addTrabajo(trabajo: Omit<ITrabajo, "id">) {
    const { data, error } = await supabase
      .from("trabajos")
      .insert(trabajo)
      .select()
      .single();

    if (error) {
      console.error("No se pudo guardar el trabajo", error);
      return;
    }

    if (data) {
      setTrabajos((actual) => [data, ...actual]);
    }
  }

  async function addFormacion(item: Omit<IFormacion, "id">) {
    const { data, error } = await supabase
      .from("formacion")
      .insert(item)
      .select()
      .single();

    if (error) {
      console.error("No se pudo guardar la formación", error);
      return;
    }

    if (data) {
      setFormacion((actual) => [data, ...actual]);
    }
  }

  async function deleteCurso(id: number) {
    const { error } = await supabase
      .from("cursos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("No se pudo borrar el curso", error);
      return;
    }

    setCursos((actual) => actual.filter((curso) => curso.id !== id));
  }

  async function deleteServicio(id: number) {
    const { error } = await supabase
      .from("servicios")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("No se pudo borrar el servicio", error);
      return;
    }

    setServicios((actual) =>
      actual.filter((servicio) => servicio.id !== id)
    );
  }

  async function deleteTrabajo(id: number) {
    const { error } = await supabase
      .from("trabajos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("No se pudo borrar el trabajo", error);
      return;
    }

    setTrabajos((actual) =>
      actual.filter((trabajo) => trabajo.id !== id)
    );
  }

  async function deleteFormacion(id: number) {
    const { error } = await supabase
      .from("formacion")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("No se pudo borrar la formación", error);
      return;
    }

    setFormacion((actual) =>
      actual.filter((item) => item.id !== id)
    );
  }

  return (
    <StoreContext.Provider
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
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);