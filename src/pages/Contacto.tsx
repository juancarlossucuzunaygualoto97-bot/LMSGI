import { useEffect, useState } from "react";
import titulos from "../model/data/titulos.json";
import type { ITitulo } from "../model/interfaces/ITitulo";

const titulo = (titulos as ITitulo[]).find((t) => t.seccion === "contacto")!;

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
    setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
  };

  return (
    <section className="section contact-page" style={{ paddingTop: "120px" }}>
      <div className="container">

        {/* Cabecera */}
        <div className="contact-page__head reveal">
          <span className="contact-page__badge">✉️ Disponible para colaborar</span>
          <h2 className="section__title">{titulo.titulo}</h2>
          <p className="section__sub">{titulo.subtitulo}</p>
        </div>

        <div className="contact reveal">

          {/* INFO */}
          <div className="contact__info">
            <h3>¡Hablemos!</h3>
            <p>
              Estoy abierto a oportunidades de prácticas, proyectos colaborativos
              y cualquier propuesta relacionada con el sector IT. No dudes en escribirme.
            </p>

            {/* Cards de contacto */}
            <div className="contact-cards">
              <a href="mailto:juancarlossucuzunaygualoto87@gmail.com" className="contact-card">
                <div className="contact-card__icon">✉️</div>
                <div>
                  <span className="contact-card__label">Email</span>
                  <span className="contact-card__value">juancarlossucuzunaygualoto87@gmail.com</span>
                </div>
              </a>

              <a href="https://github.com/juancarlossucuzunaygualoto97-bot" target="_blank" rel="noreferrer" className="contact-card">
                <div className="contact-card__icon">🐙</div>
                <div>
                  <span className="contact-card__label">GitHub</span>
                  <span className="contact-card__value">juancarlossucuzunaygualoto97-bot</span>
                </div>
              </a>

              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="contact-card">
                <div className="contact-card__icon">💼</div>
                <div>
                  <span className="contact-card__label">LinkedIn</span>
                  <span className="contact-card__value">Conectar en LinkedIn</span>
                </div>
              </a>

              <div className="contact-card contact-card--location">
                <div className="contact-card__icon">📍</div>
                <div>
                  <span className="contact-card__label">Ubicación</span>
                  <span className="contact-card__value">España · Disponible en remoto</span>
                </div>
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="contact__availability">
              <span className="contact__dot" />
              Disponible para prácticas y proyectos
            </div>
          </div>

          {/* FORMULARIO */}
          <form className="contact__form contact__form--enhanced" onSubmit={onSubmit}>
            <div className="contact__form-row">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text" name="nombre" value={form.nombre}
                  onChange={onChange} placeholder="Tu nombre completo" required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email" name="email" value={form.email}
                  onChange={onChange} placeholder="tu@email.com" required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Asunto</label>
              <input
                type="text" name="asunto" value={form.asunto}
                onChange={onChange} placeholder="¿De qué quieres hablar?" required
              />
            </div>

            <div className="form-group">
              <label>Mensaje</label>
              <textarea
                name="mensaje" value={form.mensaje} rows={5}
                onChange={onChange} placeholder="Cuéntame tu propuesta o pregunta..." required
              />
            </div>

            {enviado && (
              <div className="contact__success">
                ✓ Mensaje enviado correctamente. ¡Te responderé pronto!
              </div>
            )}

            <button type="submit" className="btn btn--primary btn--full">
              Enviar mensaje →
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}