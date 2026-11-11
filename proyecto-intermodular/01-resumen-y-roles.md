# 1. Resumen del proyecto y reparto de roles

## 1.1 Datos del proyecto

| Campo | Valor |
|-------|-------|
| Título | Plataforma de monitorización de servicios para pequeños negocios |
| Empresa | Vértice Pyme, dedicada a la digitalización de pequeños negocios |
| Autores | Juan Carlos Sucuzhañay y Luis Miguel [PENDIENTE: apellidos] |
| Ciclo | 2.º de Administración de Sistemas Informáticos en Red (ASIR) |
| Entorno | VPS de capa gratuita [PENDIENTE: proveedor, sistema operativo y recursos] |
| Coste | Cero: solo software libre y servicios con capa gratuita |

## 1.2 Contexto

Vértice Pyme digitaliza pequeños negocios: les publica la web y los
servicios asociados. Estos clientes no tienen personal técnico, de modo que
una caída de la web o un certificado caducado suele descubrirla antes un
cliente del negocio que el propio negocio. La empresa necesita enterarse de
las incidencias en el momento en que ocurren y poder demostrar al cliente
la disponibilidad que le ha dado.

## 1.3 Objetivo

Desplegar en un VPS una plataforma de monitorización que supervise de forma
continua los servicios que Vértice Pyme mantiene para sus clientes y avise
a los técnicos cuando alguno falle.

Objetivos específicos:

1. Comprobar periódicamente la disponibilidad de cada servicio supervisado
   y registrar su tiempo de respuesta.
2. Vigilar el estado del propio servidor: CPU, memoria, disco y servicios
   en ejecución.
3. Avisar de la caducidad de los certificados TLS con antelación.
4. Enviar una alerta a los técnicos cuando se detecte una incidencia y otra
   cuando se resuelva.
5. Ofrecer un panel de consulta accesible por HTTPS y protegido con
   autenticación.
6. Dejar el servidor bastionado: acceso SSH solo con clave, cortafuegos con
   los puertos imprescindibles y actualizaciones de seguridad automáticas.
7. Documentar la implantación de forma que pueda repetirse desde cero y
   verificarla con un plan de pruebas.

## 1.4 Alcance

Incluido:

- Preparación y bastionado del VPS.
- Instalación y configuración de la plataforma de monitorización y de su
  sistema de alertas.
- Publicación del panel por HTTPS.
- Copia de seguridad de la configuración y de los datos de la propia
  plataforma, con prueba de restauración.
- Plan de pruebas, auditoría de fallos y revisión de seguridad.

Excluido:

- El desarrollo o la modificación de los servicios supervisados. La
  plataforma los observa desde fuera y no cambia nada en ellos.
- Cualquier servicio de pago.

Los servicios concretos que se supervisan están por confirmar
[PENDIENTE: lista de servicios a monitorizar].

## 1.5 Reparto de roles

El trabajo se divide en dos áreas con una frontera clara, de forma que cada
autor es responsable de principio a fin de su parte y revisor de la del
otro.

| Área | Juan Carlos Sucuzhañay | Luis Miguel [PENDIENTE: apellidos] |
|------|------------------------|------------------------------------|
| Rol | Responsable de infraestructura y seguridad | Responsable de monitorización y alertas |
| Sistema base | Alta del VPS, sistema operativo, usuarios y SSH | Revisión |
| Red y seguridad | Cortafuegos, protección frente a fuerza bruta, actualizaciones automáticas | Revisión |
| Publicación | Proxy inverso y certificados TLS | Revisión |
| Monitorización | Revisión | Despliegue de la plataforma, definición de comprobaciones y paneles |
| Alertas | Revisión | Canal de notificaciones y reglas de aviso |
| Copias de seguridad | Automatización de la copia y prueba de restauración | Definición de qué datos se copian |
| Plan de pruebas | Pruebas de sistema, red y seguridad | Pruebas de monitorización y alertas |
| Auditoría | Revisión de seguridad | Registro de fallos detectados y soluciones |
| Memoria | Secciones 2 y 4 (parte de infraestructura) y 6 | Secciones 3, 4 (parte de monitorización) y 5 |

Tareas comunes: diseño de la arquitectura, conclusiones, bibliografía y
defensa del proyecto. Cada cambio en la configuración lo aplica su
responsable y lo comprueba el otro autor antes de darlo por bueno.

## 1.6 Datos pendientes para continuar

La sección 2 (arquitectura) depende de estas respuestas:

1. Apellidos de Luis Miguel.
2. Proveedor del VPS gratuito y sus recursos (CPU, RAM, disco y
   arquitectura x86 o ARM), o si aún no lo habéis elegido.
3. Sistema operativo del VPS (¿Debian 13?) y si se usará Docker.
4. Servicios que se van a monitorizar: ¿la web de este repositorio
   publicada en Vercel, otras webs, el propio VPS, algún equipo más?
5. Dominio: ¿tenéis uno, o usamos un subdominio gratuito para el panel?
6. Canal de alertas preferido: correo, Telegram, Discord u otro.
