export interface IMetrica {
  id: number;
  titulo: string;
  descripcion: string;
  valor: string;
  tendencia: "up" | "down";
}

export interface IVisitante {
  fecha: string;
  semana: number;
  mes: number;
  trimestre: number;
}

export interface IProyecto {
  id: number;
  header: string;
  tipo: string;
  estado: "done" | "in-process";
  target: number;
  limit: number;
  reviewer: string;
}

export interface INavItem {
  label: string;
  icono: string;
  ruta: string;
}

export interface IDocItem {
  label: string;
  icono: string;
}