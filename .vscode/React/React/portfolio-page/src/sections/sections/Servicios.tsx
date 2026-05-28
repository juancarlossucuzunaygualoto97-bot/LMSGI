
import { ServiciosCard } from "@/components/main/servicios/ServiciosCard";
import dataservicios from "@/model/data/servicios.json";

const Servicios = () => {
    return (
        <section id="Servicios" className="min-h-screen flex items-center justify-center">
            <h1 className="bg-gray-900 py-24 sm-22">
                Servicios Ofrecidos       
            
            <ServiciosCard servicios={dataservicios}/>
            </h1>
        </section>
    )

}

export default Servicios 