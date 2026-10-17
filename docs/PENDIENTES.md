# Lista de pendientes y mejoras

Estado a 17 de octubre de 2026 (versión 1.0.0).

## Pasos manuales pendientes (requieren a la titular del repositorio)

- [ ] **Activar GitHub Pages:** Settings → Pages → Source: «GitHub Actions» ([guía](PUBLICACION.md)).
- [ ] **Fusionar el trabajo en la rama por defecto** (o fijar como rama por defecto la rama que contiene el curso) para que se publique y para que funcionen los enlaces «Proponer una mejora», que apuntan a `main`.
- [ ] **Confirmar que el repositorio es público** (Settings → General → Danger Zone).
- [ ] **Verificar el enlace de PayPal** o crear un botón alojado y pegar su `hosted_button_id` en `site.config.json` ([guía](DONACIONES.md)).
- [ ] **Completar la página «Sobre la autora»** (`content/paginas/autora.md`) con la trayectoria que se quiera hacer pública.
- [ ] (Opcional) Añadir enlaces públicos de redes en `site.config.json → contact`.
- [ ] (Opcional) Activar *Private vulnerability reporting* en Settings → Code security.
- [ ] (Opcional) Si se desea el nombre `aula-abierta-ele`, renombrar el repositorio (Settings → General → Repository name); los enlaces internos son relativos y seguirán funcionando, pero habrá que actualizar `siteUrl`, `repository` y los enlaces del README, `CITATION.cff` y `.github/ISSUE_TEMPLATE`.

## Revisión académica pendiente

- [ ] Verificar los enlaces marcados con 🔎 en la bibliografía.
- [ ] Confirmar la edición de referencia de *Fluency through TPR Storytelling* y la editorial actual de la *Gramática comunicativa del español* (Matte Bon).
- [ ] Revisar periódicamente el Módulo 13 (plataformas): comisiones y requisitos cambian.
- [ ] Revisión externa por especialistas en ELE de los Módulos 2 y 3.

## Mejoras recomendadas

- [ ] Audios originales para los diálogos de las clases modelo (grabados por la autora o colaboradores, con licencia CC BY-SA).
- [ ] Versiones en PDF maquetadas de los recursos (generadas automáticamente en la construcción).
- [ ] Más clases modelo: A1 para adolescentes, preparación de DELE/SIELE, español para la salud, hablantes de herencia.
- [ ] Ilustraciones originales adicionales por módulo.
- [ ] Traducción de la interfaz y de los resúmenes al inglés y al portugués.
- [ ] Comprobación automática de enlaces externos (programada, sin bloquear la publicación).
- [ ] Pruebas automáticas de accesibilidad (axe) en la integración continua.
- [ ] Sección de «Aportaciones de la comunidad» cuando existan contribuciones aceptadas.
