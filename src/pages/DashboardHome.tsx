import data from "../model/data/dashboard.json";
import type { IMetrica, IVisitante, IProyecto } from "../Types/IDashboard";
import MetricasCards from "../components/charts/MetricasCard";
import GraficoVisitantes from "../components/charts/GraficosVisitante";
import TablaProyectos from "../components/ui/TablaProyectos";

const metricas = data.metricas as IMetrica[];
const visitantes = data.visitantes as IVisitante[];
const proyectos = data.proyectos as IProyecto[];

export default function DashboardHome() {
  return (
    <div className="dash-page">
      <MetricasCards metricas={metricas} />
      <GraficoVisitantes datos={visitantes} />
      <TablaProyectos proyectos={proyectos} />
    </div>
  );
}