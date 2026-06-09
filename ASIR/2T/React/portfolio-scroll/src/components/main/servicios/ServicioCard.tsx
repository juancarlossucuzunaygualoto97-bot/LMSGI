import type { IServicio } from "@/model/interfaces/IServicio";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
 //servicio: parametro de entrada del componente ServicioCard, que es un objeto con la información de un servicio concreto
 interface Props {
    servicio: IServicio;
  }
export const ServicioCard = ({ servicio }: Props) => {
  //responsabilidad: mostrar en una Card la información de un servicio concreto
  return (
    
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={servicio.imagen}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover "
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>{servicio.titulo}</CardTitle>
        <CardDescription>
          {servicio.descripcion1}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter>
    </Card>
  )
}
