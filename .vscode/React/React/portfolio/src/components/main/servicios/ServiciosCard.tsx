
import type { IServicio } from "@/model/interfaces/IServicio";
import { ServicioCard } from "./ServicioCard";


// define las propiedades de entrada del componente ServiciosCard
interface Props {
    servicios: IServicio[];
}

export const ServiciosCard = ({servicios}: Props) => {

    return (
        <div className="grid">
         {
            servicios.map( (servicio)=> (
                <ServicioCard
                    key={servicio.id}
                    servicio={servicio}
                />
            ))
         }
         </div>
    )

}