# Política de seguridad

Aula Abierta ELE es un sitio web **estático**: no tiene servidor propio, bases de datos, cuentas de usuario ni formularios que recojan datos. El progreso del curso se guarda únicamente en el navegador de cada persona. Aun así, nos tomamos en serio cualquier problema de seguridad.

## Qué reportar

- Enlaces que redirijan a sitios maliciosos o de suplantación (por ejemplo, un enlace de donación alterado).
- Código JavaScript que pueda ejecutar contenido no previsto (XSS) en el sitio publicado.
- Credenciales, tokens o datos personales publicados por error en el repositorio o en su historial.
- Problemas en el flujo de publicación (GitHub Actions) que permitan modificar el sitio sin autorización.

## Cómo reportar

1. **No abras un *issue* público** con los detalles de la vulnerabilidad.
2. Utiliza la función **«Report a vulnerability»** de la pestaña *Security* del repositorio en GitHub (aviso privado de seguridad), si está disponible.
3. Si no lo está, abre un *issue* titulado «Seguridad: solicitud de contacto privado», sin detalles técnicos, y te propondremos un canal privado.

Intentaremos responder en un plazo razonable y te mantendremos informado de la corrección.

## Buenas prácticas del proyecto

- No se almacenan secretos ni claves en el repositorio; `npm run check` busca patrones de credenciales en cada construcción.
- El enlace de donación apunta exclusivamente a `www.paypal.com` y se configura en `site.config.json`.
- Las dependencias se fijan a versiones concretas (`package-lock.json`).
- El sitio no carga scripts de terceros.
