


interface Props {
    servicio:any;
}

export const ServicioCard = ({ servicio }: Props) => {
    return(
    <div>
      {servicio.id}
    </div>
    )
}