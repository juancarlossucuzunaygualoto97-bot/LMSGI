import { ServicioCard } from "../components/main/servicios/ServicioCard";
import data from "../data/servicios.json"; // supón que tienes tu lista

export default function Servicios() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Nuestros Servicios</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <ServicioCard key={item.id} servicio={item} />
        ))}
      </div>
    </div>
  );
}
