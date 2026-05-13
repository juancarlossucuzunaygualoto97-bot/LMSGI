
import dataServicios from "@/data/servicios.json"

const Servicios = () => {
    //codigo JS | TS
    //RETURM --> HTML + componentes de Tailwind + codigo JS | TS
    return (
        <section id="servicios" className="min-h-screen flex items-center justify-center flex-col">
            <h1 className="bg-gray-900 py-24 sm:py-22">
                Servicios
            </h1>
            <ul> 
                    {
                        dataServicios.map( (servicio) => (
                            <li 
                                key={servicio.id} 
                                className="text-red list-decimal text-left">
                                    {servicio.titulo} 
                            </li>
                        ))
                        
                        // dataServicios.map( (servicio) => {
                        //     //CODIGO JS | TS
                        //     return (
                        //         <li>{servicio.titulo} </li>
                        //     )

                        // })

                    }
            </ul>
        </section>
    )
}

export default Servicios;