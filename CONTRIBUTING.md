# Cómo contribuir a Aula Abierta ELE

¡Gracias por querer mejorar este proyecto! Aula Abierta ELE es un curso abierto para tutores de español online y crece con la comunidad. **No necesitas saber programar** para contribuir con contenidos.

## Formas de contribuir

| Quiero… | Cómo |
|---|---|
| Señalar un error | Abre un *issue* con la plantilla **Reporte de error** |
| Proponer contenido | Abre un *issue* con la plantilla **Propuesta de contenido** |
| Corregir un texto directamente | Pulsa «Proponer una mejora a esta página en GitHub» al pie de cada página del sitio, edita y crea un *pull request* |
| Mejorar el código, el diseño o la accesibilidad | Sigue la guía técnica de este documento |

## Criterios para los contenidos

1. **Originalidad y licencias.** Solo contenido original, de dominio público o con licencia compatible con CC BY-SA 4.0. No copies libros, cursos comerciales, materiales de otros docentes ni imágenes sin licencia.
2. **Rigor.** Cita fuentes verificables. Distingue entre evidencia de investigación, propuestas metodológicas y experiencia práctica. No inventes autores, citas, DOI, cifras ni enlaces; si no puedes verificar algo, márcalo como «pendiente de revisión».
3. **Calidad lingüística.** Ortografía, tildes, signos de apertura, coherencia de variedad.
4. **Calidad pedagógica.** Objetivos claros, instrucciones, respuestas esperadas y criterios de evaluación.
5. **Perspectiva panhispánica.** Sin jerarquías entre variedades ni estereotipos.
6. **Honestidad.** Sin promesas de resultados garantizados ni publicidad encubierta. No se anuncian alianzas, avales ni testimonios que no existan.
7. **Privacidad.** Ningún dato personal de estudiantes.
8. **Revisión humana.** Si usas IA, revisa todo y responsabilízate del resultado.

## Estructura del contenido

```
content/
├── modulos/   NN-slug.md — un archivo por módulo; cada «## Título» es una lección
├── clases/    NN-slug.md — una clase modelo por archivo
├── recursos/  slug.md (+ slug.csv opcional) — recursos descargables
└── paginas/   slug.md — páginas generales (glosario, bibliografía, FAQ…)
```

Cada archivo empieza con un bloque de metadatos (*frontmatter*). Ejemplo de un módulo:

```yaml
---
number: 3
slug: gramaticas-integradas
title: Integración de la gramática tradicional, cognitiva y comunicativa
summary: Resumen de una o dos frases.
icon: layers
hours: 10
levels: [A1, A2, B1]
ages: [Adultos]
methods: [Enfoque comunicativo]
areas: [Gramática]
related: [guia-integrar-gramaticas]
objectives:
  - Primer objetivo.
  - Segundo objetivo.
---
```

### Sintaxis especial disponible en el Markdown

- **Recuadros:** una cita que empieza por `> [!TIPO] Título opcional`. Tipos: `NOTA`, `CONSEJO`, `ATENCION`, `EVIDENCIA` (investigación consolidada), `DEBATE` (hipótesis discutidas), `EJEMPLO`, `ACTIVIDAD`, `COLOMBIA`, `VERIFICAR` (información que puede cambiar).
- **Cuestionarios interactivos:** un bloque de código con el lenguaje `quiz`:

  ````
  ```quiz
  ? Pregunta
  - Opción incorrecta
  + Opción correcta
  > Retroalimentación que se muestra al comprobar
  ```
  ````

- **Bloques copiables:** bloques de código con `prompt` o `plantilla` como lenguaje muestran una etiqueta y un botón «Copiar».
- **Identificador propio de una lección o sección:** `## Título {#identificador}`.
- **Enlaces internos:** usa rutas que empiezan por `/` (por ejemplo, `/modulos/04-planificacion/`); el generador las convierte en relativas.

## Guía técnica

Requisitos: Node.js 20 o superior (recomendado 22) y npm.

```bash
npm ci            # instala las dependencias
npm run dev       # construye y abre una vista previa en http://localhost:4321
npm test          # construye y ejecuta las comprobaciones (enlaces, contenido, secretos)
```

Más detalles en [docs/DESARROLLO.md](docs/DESARROLLO.md).

### Antes de enviar un *pull request*

- [ ] `npm test` termina sin errores.
- [ ] Has revisado el resultado en la vista previa (también en móvil).
- [ ] El texto del *pull request* explica qué cambia y por qué.

## Licencias de las contribuciones

Al contribuir, aceptas que tus aportaciones de contenido se publiquen bajo **CC BY-SA 4.0** y las de código bajo **MIT**, y declaras que tienes derecho a hacerlo.

## Código de conducta

Esta comunidad se rige por el [Código de conducta](CODE_OF_CONDUCT.md).
