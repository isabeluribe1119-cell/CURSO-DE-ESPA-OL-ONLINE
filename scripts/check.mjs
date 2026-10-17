// Comprobaciones de calidad sobre dist/ y el repositorio.
// Falla (código 1) si encuentra enlaces internos rotos, rutas obligatorias ausentes,
// páginas sin título/descripcion/h1, contenido insuficiente o posibles secretos.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const errors = [];
const warnings = [];

if (!fs.existsSync(DIST)) {
  console.error('No existe dist/. Ejecuta primero: npm run build');
  process.exit(1);
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const info = JSON.parse(fs.readFileSync(path.join(DIST, 'build-info.json'), 'utf8'));

// 1. Rutas obligatorias
const required = [
  'index.html', '404.html', 'modulos/index.html', 'indice/index.html', 'clases/index.html', 'recursos/index.html',
  'glosario/index.html', 'bibliografia/index.html', 'preguntas-frecuentes/index.html', 'contribuir/index.html',
  'colaborar/index.html', 'contacto/index.html', 'autora/index.html', 'licencias/index.html', 'buscar/index.html',
  'sitemap.xml', 'robots.txt', 'search-index.json', 'manifest.webmanifest', 'assets/styles.css', 'assets/app.js',
  'assets/favicon.svg', 'assets/og-image.png', '.nojekyll',
];
for (const r of required) if (!fs.existsSync(path.join(DIST, r))) errors.push(`Falta la ruta obligatoria: ${r}`);

// 2. Mínimos de contenido
if (info.modulos < 17) errors.push(`Se esperaban 17 módulos y hay ${info.modulos}`);
if (info.clases < 57) errors.push(`Se esperaban al menos 57 clases modelo y hay ${info.clases}`);
if (info.recursos < 18) errors.push(`Se esperaban al menos 18 recursos y hay ${info.recursos}`);

const textOf = (html) => html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const mainText = (html) => textOf((html.match(/<main[\s\S]*<\/main>/) || [''])[0]);

// 2b. Cobertura: cada combinación de nivel y edad debe tener al menos una clase modelo
const NIVELES = ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const EDADES = ['Niños 4-6', 'Niños 7-10', 'Adolescentes', 'Adultos'];
const cubiertas = new Set();
for (const f of fs.readdirSync(path.join(ROOT, 'content/clases'))) {
  const fm = fs.readFileSync(path.join(ROOT, 'content/clases', f), 'utf8').match(/^---\n([\s\S]*?)\n---/);
  if (!fm) continue;
  const lista = (clave) => (fm[1].match(new RegExp(`^${clave}: \\[(.*)\\]`, 'm'))?.[1] || '').split(',').map((v) => v.trim());
  for (const n of lista('levels')) for (const e of lista('ages')) cubiertas.add(`${n}|${e}`);
}
for (const n of NIVELES) for (const e of EDADES) {
  if (!cubiertas.has(`${n}|${e}`)) errors.push(`Sin clase modelo para nivel ${n} y edad ${e}`);
}

// Duración de cada clase modelo (para el mínimo de contenido)
const duracionClase = {};
for (const f of fs.readdirSync(path.join(ROOT, 'content/clases'))) {
  const txt = fs.readFileSync(path.join(ROOT, 'content/clases', f), 'utf8');
  const slug = txt.match(/^slug: (.+)$/m)?.[1]?.trim();
  const dur = txt.match(/^duration: (\d+)/m)?.[1];
  if (slug && dur) duracionClase[slug] = Number(dur);
}

// 2c. Cobertura de metodologías: cada una de las del Módulo 10 debe aparecer en al menos dos clases
const METODOLOGIAS = ['Enfoque comunicativo', 'Enseñanza basada en tareas', 'TPRS', 'Aprendizaje basado en problemas', 'Práctica de recuperación', 'Repetición espaciada', 'Gamificación', 'Andamiaje', 'Enseñanza inductiva', 'Enseñanza deductiva'];
const porMetodo = Object.fromEntries(METODOLOGIAS.map((m) => [m, 0]));
for (const f of fs.readdirSync(path.join(ROOT, 'content/clases'))) {
  const fm = fs.readFileSync(path.join(ROOT, 'content/clases', f), 'utf8').match(/^methods: \[(.*)\]/m);
  if (!fm) continue;
  for (const m of fm[1].split(',').map((v) => v.trim())) if (m in porMetodo) porMetodo[m]++;
}
for (const m of METODOLOGIAS) if (porMetodo[m] < 2) errors.push(`La metodología «${m}» tiene ${porMetodo[m]} clase(s); se esperan al menos 2`);

// 3. Revisión página a página
let linkCount = 0;
for (const file of htmlFiles) {
  const rel = path.relative(DIST, file);
  const html = fs.readFileSync(file, 'utf8');
  if (!/<html lang="es"/.test(html)) errors.push(`${rel}: falta lang="es"`);
  if (!/<title>[^<]{5,}<\/title>/.test(html)) errors.push(`${rel}: título ausente o vacío`);
  if (!/<meta name="description" content="[^"]{20,}">/.test(html)) errors.push(`${rel}: meta description ausente o demasiado corta`);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errors.push(`${rel}: tiene ${h1} elementos h1 (debe tener 1)`);
  if (/<img(?![^>]*\balt=)/.test(html)) errors.push(`${rel}: imagen sin atributo alt`);

  // Contenido mínimo en lecciones, clases y recursos
  const words = mainText(html).split(' ').filter(Boolean).length;
  if (/^modulos\/[^/]+\/[^/]+\/index\.html$/.test(rel.split(path.sep).join('/')) && words < 250) errors.push(`${rel}: lección con poco contenido (${words} palabras)`);
  const claseMatch = rel.split(path.sep).join('/').match(/^clases\/([^/]+)\/index\.html$/);
  if (claseMatch) {
    // Mínimo proporcional a la duración de la clase (13 palabras por minuto).
    const minutos = duracionClase[claseMatch[1]] || 60;
    const minimo = Math.round(minutos * 13);
    if (words < minimo) errors.push(`${rel}: clase modelo con poco contenido (${words} palabras; mínimo ${minimo} para ${minutos} min)`);
  }

  // Enlaces internos
  if (rel === '404.html') continue; // usa rutas absolutas con la ruta base de producción
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|data:|#|javascript:)/.test(url)) continue;
    linkCount++;
    const [p, hash] = url.split('#');
    const target = path.resolve(path.dirname(file), p.split('?')[0]);
    let resolved = target;
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) resolved = path.join(target, 'index.html');
    if (!fs.existsSync(resolved)) {
      errors.push(`${rel}: enlace roto → ${url}`);
      continue;
    }
    if (hash && resolved.endsWith('.html')) {
      const t = fs.readFileSync(resolved, 'utf8');
      if (!t.includes(`id="${hash}"`)) errors.push(`${rel}: ancla inexistente → ${url}`);
    }
  }
  for (const m of html.matchAll(/href="#([^"]+)"/g)) {
    if (m[1] === 'contenido') continue;
    if (!html.includes(`id="${m[1]}"`)) errors.push(`${rel}: ancla interna inexistente → #${m[1]}`);
  }
}

// 4. Descargas
const recursosDir = path.join(ROOT, 'content/recursos');
for (const f of fs.readdirSync(recursosDir)) {
  if (!fs.existsSync(path.join(DIST, 'descargas', f))) errors.push(`Descarga ausente: descargas/${f}`);
}
for (const f of fs.readdirSync(path.join(DIST, 'descargas'))) {
  if (fs.statSync(path.join(DIST, 'descargas', f)).size < 400) errors.push(`Descarga casi vacía: ${f}`);
}

// 5. PayPal
const home = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const paypal = home.match(/href="(https:\/\/www\.paypal\.com\/donate[^"]*)"/);
if (!paypal) errors.push('No se encontró el enlace de donación de PayPal en la página de inicio');
else if (!/aria-label="Apoyar el proyecto con PayPal/.test(home)) errors.push('El botón de PayPal no tiene la etiqueta accesible esperada');

// 6. Posibles secretos en el repositorio (excluye node_modules, dist y .git)
const SECRET_PATTERNS = [
  [/ghp_[A-Za-z0-9]{36}/, 'token de GitHub'],
  [/github_pat_[A-Za-z0-9_]{40,}/, 'token de GitHub'],
  [/AKIA[0-9A-Z]{16}/, 'clave de AWS'],
  [/-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/, 'clave privada'],
  [/sk-[A-Za-z0-9]{32,}/, 'clave de API'],
  [/xox[baprs]-[A-Za-z0-9-]{10,}/, 'token de Slack'],
  [/(client_secret|api_key|apikey|password)\s*[:=]\s*["'][^"']{8,}["']/i, 'credencial'],
];
const repoFiles = walk(ROOT).filter((f) => !/[/\\](node_modules|dist|\.git)[/\\]/.test(f) && !/\.(png|woff2|ico)$/.test(f));
for (const f of repoFiles) {
  const c = fs.readFileSync(f, 'utf8');
  for (const [re, label] of SECRET_PATTERNS) if (re.test(c)) errors.push(`Posible ${label} en ${path.relative(ROOT, f)}`);
  if (path.basename(f).startsWith('.env')) errors.push(`Archivo de entorno en el repositorio: ${path.relative(ROOT, f)}`);
}

// 7. Sitemap
const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const urls = (sitemap.match(/<loc>/g) || []).length;
if (urls < 200) warnings.push(`El sitemap solo tiene ${urls} URL`);

console.log(`Páginas HTML: ${htmlFiles.length} · Enlaces internos comprobados: ${linkCount} · URL en sitemap: ${urls}`);
console.log(`Módulos: ${info.modulos} · Lecciones: ${info.lecciones} · Palabras en módulos: ${info.palabrasModulos} · Clases: ${info.clases} · Recursos: ${info.recursos}`);
warnings.forEach((w) => console.warn('⚠', w));
if (errors.length) {
  errors.forEach((e) => console.error('✘', e));
  console.error(`\n${errors.length} error(es).`);
  process.exit(1);
}
console.log('✔ Todas las comprobaciones han pasado.');
