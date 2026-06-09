export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getTituloPorSeccion(
  titulos: { seccion: string; titulo: string; subtitulo: string; descripcion?: string }[],
  seccion: string
) {
  return titulos.find((t) => t.seccion === seccion) ?? null;
}