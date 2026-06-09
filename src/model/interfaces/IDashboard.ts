export interface IMetrica {
  id: number;
  titulo: string;
  descripcion: string;
  valor: string;
  tendencia: string;
  icono: string;
}

export interface IVisitante {
  fecha: string;
  trimestre?: number;
  mes?: number;
  semana?: number;
}

export interface IProyecto {
  id: number;
  nombre: string;
  header: string;
  tipo: string;
  estado: string;
  target: number;
  limit: number;
  reviewer: string;
}