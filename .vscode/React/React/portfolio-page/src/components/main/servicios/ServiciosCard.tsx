import { ServicioCard } from "@/components/main/servicios/ServicioCard"
import type { IServicio } from "@/model/interfaces/IServicio";

//define las propiedades de entrada del componente ServiciosCard
interface Props {
  servicios: IServicio[];
}

export const ServiciosCard = ({servicios}: Props) => {
  //responsalidad: mostrar en una listado de Cards la información de los servicios que se le pasan por props
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {
        servicios.map( (servicio) => (
            <ServicioCard 
                key={servicio.id} 
                //parametro de entrada del componente ServicioCard, que es un objeto con la información de un servicio concreto
                servicio={servicio} 
            />

        ))
      }
    </div>
    
  )
}