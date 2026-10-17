# Guía de instalación y desarrollo local

## Requisitos

- [Node.js](https://nodejs.org/) 20 o superior (recomendado: 22, ver `.nvmrc`).
- npm (incluido con Node.js).
- Git.

## Instalación

```bash
git clone https://github.com/isabeluribe1119-cell/CURSO-DE-ESPA-OL-ONLINE.git
cd CURSO-DE-ESPA-OL-ONLINE
npm ci
```

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run build` | Genera el sitio en `dist/` a partir de `content/` y `src/` |
| `npm run check` | Comprueba `dist/`: enlaces internos y anclas, rutas obligatorias, títulos y descripciones, un solo `h1`, contenido mínimo, descargas, enlace de PayPal y posibles secretos en el repositorio |
| `npm test` | `build` + `check` (lo mismo que ejecuta la integración continua) |
| `npm run dev` | Construye y sirve el sitio en http://localhost:4321 |
| `npm run preview` | Sirve `dist/` sin reconstruir |
| `node scripts/generate-images.mjs` | (Opcional) Regenera `og-image.png` y los iconos PNG; requiere Playwright |

> La página 404 usa rutas absolutas con la ruta base de producción. Para probarla en local con estilos, construye con `SITE_URL=http://localhost:4321 npm run build`.

## Arquitectura

```
.
├── content/            Contenido en Markdown (lo que editan los tutores)
│   ├── modulos/        17 módulos; cada «## Título» se convierte en una lección
│   ├── clases/         Clases modelo
│   ├── recursos/       Recursos descargables (.md y .csv)
│   └── paginas/        Páginas generales
├── src/assets/         CSS, JavaScript, favicon e imágenes
├── scripts/
│   ├── build.mjs       Generador estático (Markdown → HTML)
│   ├── icons.mjs       Iconos SVG originales
│   ├── check.mjs       Comprobaciones de calidad
│   ├── serve.mjs       Servidor local mínimo
│   └── generate-images.mjs
├── site.config.json    Título, URL, PayPal, enlaces de contacto
├── docs/               Documentación del proyecto
└── .github/            Flujo de publicación y plantillas
```

### Decisiones técnicas

- **Generador propio y mínimo** (una dependencia: `marked`) en lugar de un *framework*: menos mantenimiento, construcción en segundos, fácil de entender para quien contribuye.
- **Enlaces relativos**: todas las rutas internas se convierten en relativas, de modo que el sitio funciona bajo cualquier ruta base de GitHub Pages (por ejemplo, `/CURSO-DE-ESPA-OL-ONLINE/`) y también si el repositorio cambia de nombre o se usa un dominio propio.
- **Sin backend**: búsqueda con un índice JSON generado en la construcción; progreso en `localStorage`; filtros en JavaScript sin dependencias.
- **Tipografías autoalojadas** (Atkinson Hyperlegible, diseñada para la legibilidad, y Fraunces): sin peticiones a servicios externos.
- **Accesibilidad**: HTML semántico, enlace para saltar al contenido, foco visible, contraste AA, navegación por teclado, modo oscuro, respeto de `prefers-reduced-motion`.

## Configuración (`site.config.json`)

| Campo | Uso |
|---|---|
| `siteUrl` | URL pública por defecto (el flujo de GitHub Actions la sustituye por la real mediante `SITE_URL`) |
| `repository`, `branch` | Enlaces «Proponer una mejora» al pie de cada página (en GitHub Actions, `branch` se sustituye por la rama por defecto real) |
| `paypal` | Configuración del botón de donación (ver [DONACIONES.md](DONACIONES.md)) |
| `contact` | Enlaces públicos opcionales (Instagram, YouTube, LinkedIn, web); vacíos = ocultos |
| `lastReview` | Fecha de la última revisión del contenido que aparece en el pie |

## Añadir contenido

- **Lección nueva:** añade una sección `## Título` en el archivo del módulo.
- **Clase modelo:** crea `content/clases/NN-slug.md` copiando el *frontmatter* de otra clase.
- **Recurso:** crea `content/recursos/slug.md` (y, si quieres, `slug.csv` declarado en `extra: [slug.csv]`).
- **Página:** crea `content/paginas/slug.md` y enlázala desde el pie (en `scripts/build.mjs`) si es necesario.

Ejecuta `npm test` antes de publicar.
