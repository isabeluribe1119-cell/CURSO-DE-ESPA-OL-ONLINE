# Guía de publicación en GitHub Pages

El sitio se publica automáticamente con **GitHub Actions** (`.github/workflows/pages.yml`).

## Cómo funciona

1. Cada `push` o *pull request* construye el sitio y ejecuta las comprobaciones (`npm test`).
2. Cuando el `push` es a la **rama por defecto** del repositorio, el flujo además:
   - obtiene la URL de Pages con `actions/configure-pages`,
   - construye con esa URL (metadatos, *sitemap*, Open Graph),
   - sube `dist/` con `actions/upload-pages-artifact` y
   - publica con `actions/deploy-pages`.

## Activación (una sola vez, manual)

GitHub no permite activar Pages con el token automático del flujo, así que este paso lo hace la persona propietaria del repositorio:

1. En GitHub, abre el repositorio → **Settings** → **Pages**.
2. En **Build and deployment → Source**, elige **GitHub Actions**.
3. Comprueba en **Settings → General** cuál es la **rama por defecto** (*Default branch*). Si el contenido está en otra rama, fusiona el *pull request* correspondiente en la rama por defecto o cambia la rama por defecto.
4. Ve a la pestaña **Actions**, abre «Construir, comprobar y publicar» y pulsa **Run workflow** (o haz un `push` a la rama por defecto).
5. Al terminar, la URL pública aparece en el resumen del trabajo «Publicar en GitHub Pages» y en **Settings → Pages**.

URL esperada para este repositorio: `https://isabeluribe1119-cell.github.io/CURSO-DE-ESPA-OL-ONLINE/`

> Si el repositorio es privado, GitHub Pages puede requerir un plan de pago. Para un recurso educativo abierto se recomienda que el repositorio sea **público** (Settings → General → Danger Zone → Change visibility).

## Actualizar el curso

1. Edita los archivos de `content/` (directamente en GitHub o en local).
2. Si trabajas en local: `npm test`.
3. Haz *commit* y `push` (o fusiona el *pull request*) a la rama por defecto.
4. El flujo publica la nueva versión en uno o dos minutos.

## Dominio propio (opcional)

1. Settings → Pages → Custom domain.
2. Configura el DNS según la documentación de GitHub.
3. Actualiza `siteUrl` en `site.config.json` (el flujo usará la URL que devuelva Pages).

Como todos los enlaces internos son relativos, el sitio funciona igual con dominio propio o con la ruta del proyecto.

## Verificación tras publicar

- [ ] La página de inicio carga con estilos y tipografías.
- [ ] Un módulo, una lección, una clase y un recurso se abren correctamente.
- [ ] Una descarga (.md y .csv) funciona.
- [ ] El buscador devuelve resultados.
- [ ] Una dirección inexistente muestra la página 404 con estilos.
- [ ] El botón de PayPal abre PayPal.
- [ ] `https://…/sitemap.xml` y `https://…/robots.txt` existen.

Documentación oficial: [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
