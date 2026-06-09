interface Props {
  titulo: string;
  subtitulo?: string;
}

export default function SectionTitle({ titulo, subtitulo }: Props) {
  return (
    <div>
      <h2 className="section__title">{titulo}</h2>
      {subtitulo && <p className="section__sub">{subtitulo}</p>}
    </div>
  );
}