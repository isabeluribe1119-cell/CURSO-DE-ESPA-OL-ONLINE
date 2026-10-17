// Generador estático de Aula Abierta ELE.
// Lee el contenido en Markdown de /content y produce un sitio HTML en /dist
// con enlaces relativos, de modo que funciona en GitHub Pages bajo cualquier ruta base.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';
import { icon, ICONS } from './icons.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'content');
const DIST = path.join(ROOT, 'dist');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
const SITE_URL = (process.env.SITE_URL || config.siteUrl).replace(/\/+$/, '');
const BASE_PATH = new URL(SITE_URL + '/').pathname; // p. ej. /CURSO-DE-ESPA-OL-ONLINE/
const BUILD_DATE = new Date().toISOString().slice(0, 10);
// En GitHub Actions se usa la rama por defecto real del repositorio para los enlaces de edición.
const EDIT_BRANCH = process.env.EDIT_BRANCH || config.branch;

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------
const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function slugify(s) {
  return String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70)
    .replace(/-+$/g, '');
}

const stripHtml = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

const words = (html) => stripHtml(html).split(' ').filter(Boolean).length;
const readingMinutes = (html) => Math.max(1, Math.round(words(html) / 200));

// Frontmatter en un subconjunto sencillo de YAML:
//   clave: valor | clave: [a, b] | clave: seguido de líneas "  - elemento"
function parseFrontmatter(raw, file) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  let listKey = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      data[listKey].push(unquote(item[1]));
      continue;
    }
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) throw new Error(`Frontmatter no válido en ${file}: "${line}"`);
    const [, key, value] = kv;
    if (value === '') {
      data[key] = [];
      listKey = key;
    } else if (/^\[.*\]$/.test(value)) {
      data[key] = value.slice(1, -1).split(',').map((v) => unquote(v.trim())).filter(Boolean);
      listKey = null;
    } else {
      data[key] = /^-?\d+(\.\d+)?$/.test(value) ? Number(value) : unquote(value);
      listKey = null;
    }
  }
  return { data, body: raw.slice(m[0].length) };
}
const unquote = (v) => v.replace(/^["'](.*)["']$/, '$1');

function readDir(dir, ext = '.md') {
  const full = path.join(CONTENT, dir);
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(ext) && !f.startsWith('_'))
    .sort()
    .map((f) => {
      const raw = fs.readFileSync(path.join(full, f), 'utf8');
      const { data, body } = parseFrontmatter(raw, f);
      return { file: f, source: `content/${dir}/${f}`, raw, data, body };
    });
}

// ---------------------------------------------------------------------------
// Markdown
// ---------------------------------------------------------------------------
const CALLOUTS = {
  NOTA: { label: 'Nota', icon: 'info' },
  CONSEJO: { label: 'Consejo práctico', icon: 'spark' },
  ATENCION: { label: 'Atención', icon: 'alert' },
  EVIDENCIA: { label: 'Lo que dice la investigación', icon: 'flask' },
  DEBATE: { label: 'Hipótesis en debate', icon: 'scale' },
  EJEMPLO: { label: 'Ejemplo aplicado', icon: 'chat' },
  ACTIVIDAD: { label: 'Actividad', icon: 'pencil' },
  COLOMBIA: { label: 'Desde Colombia', icon: 'globe' },
  VERIFICAR: { label: 'Información que puede cambiar', icon: 'clock' },
};

function renderQuiz(text, ctx) {
  // Formato:  ? Pregunta / - opción / + opción correcta / > retroalimentación
  const questions = [];
  let q = null;
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith('?')) questions.push((q = { text: t.slice(1).trim(), options: [], feedback: '' }));
    else if (q && (t.startsWith('-') || t.startsWith('+')))
      q.options.push({ text: t.slice(1).trim(), correct: t.startsWith('+') });
    else if (q && t.startsWith('>')) q.feedback += (q.feedback ? ' ' : '') + t.slice(1).trim();
  }
  ctx.quizCount = (ctx.quizCount || 0) + 1;
  const id = `quiz-${ctx.quizCount}`;
  const inline = (s) => ctx.marked.parseInline(s);
  return `<section class="quiz" aria-labelledby="${id}-t" data-quiz>
<p class="quiz__title" id="${id}-t">${icon('check')} <strong>Comprueba lo aprendido</strong></p>
${questions
  .map(
    (qq, i) => `<fieldset class="quiz__q" data-question>
<legend><span class="quiz__n">${i + 1}.</span> ${inline(qq.text)}</legend>
${qq.options
  .map(
    (o, j) => `<label class="quiz__opt"><input type="radio" name="${id}-q${i}" value="${j}"${o.correct ? ' data-correct' : ''}> <span>${inline(o.text)}</span></label>`,
  )
  .join('\n')}
<p class="quiz__fb" role="status" aria-live="polite" hidden data-feedback="${esc(qq.feedback ? ctx.marked.parseInline(qq.feedback) : '')}"></p>
</fieldset>`,
  )
  .join('\n')}
<div class="quiz__actions"><button type="button" class="btn btn--primary" data-quiz-check>Comprobar respuestas</button> <button type="button" class="btn btn--ghost" data-quiz-reset>Reiniciar</button></div>
<p class="quiz__score" role="status" aria-live="polite"></p>
</section>`;
}

function createMarked(ctx) {
  const marked = new Marked({ gfm: true });
  ctx.marked = marked;
  marked.use({
    renderer: {
      heading({ tokens, depth, text }) {
        const html = this.parser.parseInline(tokens);
        const custom = text.match(/\s*\{#([\w-]+)\}\s*$/);
        const clean = custom ? html.replace(/\s*\{#[\w-]+\}\s*$/, '') : html;
        let id = custom ? custom[1] : slugify(stripHtml(clean)) || 'seccion';
        ctx.ids = ctx.ids || new Set();
        let n = 2;
        const baseId = id;
        while (ctx.ids.has(id)) id = `${baseId}-${n++}`;
        ctx.ids.add(id);
        if (depth === 2) (ctx.toc = ctx.toc || []).push({ id, text: stripHtml(clean) });
        return `<h${depth} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a>${clean}</h${depth}>\n`;
      },
      code({ text, lang }) {
        if (lang === 'quiz') return renderQuiz(text, ctx);
        const label = lang === 'prompt' ? 'Prompt' : lang === 'plantilla' ? 'Plantilla' : '';
        return `<div class="codeblock${label ? ' codeblock--' + lang : ''}">${label ? `<span class="codeblock__label">${label}</span>` : ''}<button type="button" class="codeblock__copy" data-copy>Copiar</button><pre tabindex="0"><code>${esc(text)}</code></pre></div>\n`;
      },
      blockquote({ tokens }) {
        const body = this.parser.parse(tokens);
        const m = body.match(/^<p>\[!([A-Z]+)\][ \t]*([^\n<]*)\n?/);
        if (m && CALLOUTS[m[1]]) {
          const c = CALLOUTS[m[1]];
          const title = m[2].trim() || c.label;
          let rest = body.slice(m[0].length);
          rest = rest.startsWith('</p>') ? rest.slice(4) : '<p>' + rest;
          return `<div class="callout callout--${m[1].toLowerCase()}" role="note"><p class="callout__title">${icon(c.icon)} <strong>${title}</strong></p>${rest}</div>\n`;
        }
        return `<blockquote>${body}</blockquote>\n`;
      },
      table(token) {
        ctx.tableCount = (ctx.tableCount || 0) + 1;
        const label = `Tabla ${ctx.tableCount} (desplazable)`;
        if (token.header.every((c) => !c.text.trim())) {
          // Tablas «ficha» sin encabezados: se renderizan sin thead.
          const rows = token.rows
            .map((r) => '<tr>' + r.map((c, i) => (i === 0 ? `<th scope="row">${this.parser.parseInline(c.tokens)}</th>` : `<td>${this.parser.parseInline(c.tokens)}</td>`)).join('') + '</tr>')
            .join('\n');
          return `<div class="table-wrap" tabindex="0" role="region" aria-label="${label}"><table class="table--facts"><tbody>${rows}</tbody></table></div>\n`;
        }
        const header = token.header.map((c) => `<th scope="col"${c.align ? ` style="text-align:${c.align}"` : ''}>${this.parser.parseInline(c.tokens)}</th>`).join('');
        const rows = token.rows
          .map((r) => '<tr>' + r.map((c) => `<td${c.align ? ` style="text-align:${c.align}"` : ''}>${this.parser.parseInline(c.tokens)}</td>`).join('') + '</tr>')
          .join('\n');
        return `<div class="table-wrap" tabindex="0" role="region" aria-label="${label}"><table><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
      },
      listitem(item) {
        if (!item.task) return false;
        const body = this.parser
          .parse(item.tokens, !!item.loose)
          .replace(/<input[^>]*type="checkbox"[^>]*>\s*/, '')
          .replace(/^<p>([\s\S]*)<\/p>\s*$/, '$1');
        return `<li class="task"><label><input type="checkbox"${item.checked ? ' checked' : ''}> <span>${body}</span></label></li>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href) && !href.startsWith(SITE_URL);
        return `<a href="${esc(href)}"${title ? ` title="${esc(title)}"` : ''}${external ? ' rel="noopener" target="_blank"' : ''}>${text}${external ? '<span class="sr-only"> (se abre en una pestaña nueva)</span>' : ''}</a>`;
      },
    },
  });
  return marked;
}

function md(markdown, ctx = {}) {
  const marked = createMarked(ctx);
  return marked.parse(markdown);
}

// ---------------------------------------------------------------------------
// Carga de contenido
// ---------------------------------------------------------------------------
const modules = readDir('modulos').map((f) => {
  const d = f.data;
  const slug = `${String(d.number).padStart(2, '0')}-${d.slug}`;
  const parts = f.body.split(/^## /m);
  const intro = parts.shift();
  const lessons = parts.map((p, i) => {
    const nl = p.indexOf('\n');
    let title = p.slice(0, nl).trim();
    const custom = title.match(/\s*\{#([\w-]+)\}\s*$/);
    const lslug = custom ? custom[1] : slugify(title);
    title = title.replace(/\s*\{#[\w-]+\}\s*$/, '');
    // Dentro de una lección, ### pasa a ser h2, #### h3, etc.
    const body = p.slice(nl + 1).replace(/^(#{3,6}) /gm, (_, h) => h.slice(1) + ' ');
    return { index: i + 1, title, slug: lslug, body };
  });
  return { ...d, slug, source: f.source, intro, lessons, route: `modulos/${slug}/` };
});
for (const m of modules) {
  for (const l of m.lessons) {
    l.route = `${m.route}${l.slug}/`;
    l.id = `${m.slug}/${l.slug}`;
    const ctx = {};
    l.html = md(l.body, ctx);
    l.toc = ctx.toc || [];
    // Cada lección se diseña como una sesión de 60 minutos (lectura guiada + práctica).
    l.minutes = 60;
  }
  m.introHtml = md(m.intro, {});
  m.minutes = m.lessons.reduce((a, l) => a + l.minutes, 0);
}

const clases = readDir('clases').map((f) => {
  const ctx = {};
  const html = md(f.body, ctx);
  return { ...f.data, source: f.source, html, toc: ctx.toc || [], route: `clases/${f.data.slug}/`, minutesRead: readingMinutes(html) };
});

const recursos = readDir('recursos').map((f) => {
  const ctx = {};
  // El título «# …» del archivo descargable ya aparece como h1 de la página.
  const html = md(f.body.replace(/^\s*# .*\n/, ''), ctx);
  const downloads = [{ file: f.file, label: 'Markdown (.md)', path: `descargas/${f.file}` }];
  for (const extra of f.data.extra || []) {
    const ext = path.extname(extra).slice(1).toUpperCase();
    downloads.unshift({ file: extra, label: `${ext === 'CSV' ? 'Hoja de cálculo' : ext} (.${ext.toLowerCase()})`, path: `descargas/${extra}` });
  }
  return { ...f.data, source: f.source, file: f.file, html, toc: ctx.toc || [], downloads, route: `recursos/${f.data.slug}/` };
});

const paginas = Object.fromEntries(
  readDir('paginas').map((f) => {
    const ctx = {};
    return [f.data.slug, { ...f.data, source: f.source, html: md(f.body, ctx), toc: ctx.toc || [] }];
  }),
);

// ---------------------------------------------------------------------------
// Plantilla
// ---------------------------------------------------------------------------
const paypalUrl = (() => {
  const p = config.paypal || {};
  if (p.hostedButtonId) return `https://www.paypal.com/donate/?hosted_button_id=${encodeURIComponent(p.hostedButtonId)}`;
  if (p.businessEmail) {
    const q = new URLSearchParams({ business: p.businessEmail, item_name: p.itemName || config.title, currency_code: p.currency || 'USD' });
    return `https://www.paypal.com/donate?${q.toString()}`;
  }
  return '';
})();

const NAV = [
  { route: 'modulos/', label: 'Módulos' },
  { route: 'clases/', label: 'Clases modelo' },
  { route: 'recursos/', label: 'Recursos' },
  { route: 'glosario/', label: 'Glosario' },
  { route: 'colaborar/', label: 'Colaborar' },
];

function donateBlock(variant = 'card') {
  if (!paypalUrl) return '';
  return `<section class="donate donate--${variant}" aria-labelledby="donate-${variant}">
  <div class="donate__icon" aria-hidden="true">${icon('heart')}</div>
  <div class="donate__text">
    <h2 id="donate-${variant}">¿Te está ayudando este recurso?</h2>
    <p>Aula Abierta ELE es un proyecto educativo abierto. Si deseas contribuir a su mantenimiento, actualización y creación de nuevos materiales, puedes realizar una donación voluntaria. <strong>El acceso al curso seguirá siendo gratuito.</strong></p>
    ${variant === 'card' ? '<p>Tu apoyo ayuda a dedicar tiempo a desarrollar recursos útiles para la comunidad de tutores de español.</p>' : ''}
    <p class="donate__actions"><a class="btn btn--paypal" href="${esc(paypalUrl)}" rel="noopener" target="_blank" aria-label="Apoyar el proyecto con PayPal (se abre PayPal en una pestaña nueva)">${icon('heart')} Apoyar el proyecto con PayPal</a> <a class="donate__more" href="/colaborar/#donaciones">Cómo se usan las donaciones</a></p>
    <p class="donate__small">Las donaciones son voluntarias, no dan acceso a contenidos adicionales y no constituyen la compra de ningún certificado.</p>
  </div>
</section>`;
}

function layout({ route, title, description, body, bodyClass = '', breadcrumbs = [], isHome = false, is404 = false, type = 'website', jsonld = null }) {
  const depth = route ? route.split('/').filter(Boolean).length : 0;
  const prefix = is404 ? BASE_PATH : depth ? '../'.repeat(depth) : './';
  const fullTitle = isHome ? `${config.title} — ${config.tagline}` : `${title} · ${config.title}`;
  const canonical = `${SITE_URL}/${route}`;
  const desc = description || config.description;
  const crumbs = breadcrumbs.length
    ? `<nav class="breadcrumbs" aria-label="Ruta de navegación"><ol><li><a href="/">Inicio</a></li>${breadcrumbs
        .map((b, i) => (i === breadcrumbs.length - 1 ? `<li aria-current="page">${esc(b.label)}</li>` : `<li><a href="/${b.route}">${esc(b.label)}</a></li>`))
        .join('')}</ol></nav>`
    : '';
  const ld = jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : '';
  const contactLinks = ['instagram', 'youtube', 'linkedin', 'website']
    .filter((k) => config.contact[k])
    .map((k) => `<li><a href="${esc(config.contact[k])}" rel="noopener me" target="_blank">${{ instagram: 'Instagram', youtube: 'YouTube', linkedin: 'LinkedIn', website: 'Sitio web' }[k]}</a></li>`)
    .join('');

  const html = `<!doctype html>
<html lang="${config.lang}" data-root="${prefix}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="author" content="${esc(config.author)}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#c8553d">
${is404 ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${esc(config.title)}">
<meta property="og:locale" content="es_ES">
<meta property="og:title" content="${esc(isHome ? fullTitle : title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE_URL}/assets/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Aula Abierta ELE: recursos para enseñar español online">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="preload" href="/assets/fonts/atkinson-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/styles.css">
<script>try{var t=localStorage.getItem('aae-theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}</script>
${ld}
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#contenido">Saltar al contenido</a>
<header class="site-header">
  <div class="container site-header__inner">
    <a class="brand" href="/" aria-label="${esc(config.title)}, ir al inicio">
      <span class="brand__mark" aria-hidden="true">${logoMark()}</span>
      <span class="brand__text"><span class="brand__name">Aula Abierta <em>ELE</em></span><span class="brand__tag">por ${esc(config.author)} · ${esc(config.brand)}</span></span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu-principal">${icon('menu')}<span>Menú</span></button>
    <nav class="site-nav" id="menu-principal" aria-label="Principal">
      <ul>
        ${NAV.map((n) => `<li><a href="/${n.route}"${route.startsWith(n.route) ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('\n        ')}
      </ul>
      <form class="search-form" role="search" action="/buscar/" method="get">
        <label class="sr-only" for="q-header">Buscar en el curso</label>
        <input id="q-header" name="q" type="search" placeholder="Buscar…" autocomplete="off">
        <button type="submit" class="search-form__btn" aria-label="Buscar">${icon('search')}</button>
      </form>
      <button class="theme-toggle" type="button" data-theme-toggle aria-label="Cambiar entre modo claro y oscuro">${icon('moon')}</button>
    </nav>
  </div>
</header>
<main id="contenido" tabindex="-1">
${crumbs ? `<div class="container">${crumbs}</div>` : ''}
${body}
</main>
<footer class="site-footer">
  <div class="container">
    ${isHome || route === 'colaborar/' ? '' : donateBlock('footer')}
    <div class="site-footer__grid">
      <div>
        <p class="site-footer__brand">Aula Abierta <em>ELE</em></p>
        <p>Un proyecto educativo abierto creado por <a href="/autora/">${esc(config.author)}</a> · <span class="brand-sfyl">${esc(config.brand)}</span>.</p>
        <p class="small">Completar el curso no constituye una titulación oficial ni una acreditación profesional.</p>
      </div>
      <nav aria-label="Curso">
        <p class="site-footer__h">Curso</p>
        <ul>
          <li><a href="/indice/">Índice y progreso</a></li>
          <li><a href="/modulos/">Módulos</a></li>
          <li><a href="/clases/">Clases modelo</a></li>
          <li><a href="/recursos/">Biblioteca de recursos</a></li>
          <li><a href="/glosario/">Glosario ELE</a></li>
          <li><a href="/bibliografia/">Bibliografía y fuentes</a></li>
        </ul>
      </nav>
      <nav aria-label="Proyecto">
        <p class="site-footer__h">Proyecto</p>
        <ul>
          <li><a href="/autora/">Sobre la autora</a></li>
          <li><a href="/preguntas-frecuentes/">Preguntas frecuentes</a></li>
          <li><a href="/contribuir/">Cómo contribuir</a></li>
          <li><a href="/colaborar/">Colaborar y donar</a></li>
          <li><a href="/contacto/">Contacto</a></li>
          <li><a href="/licencias/">Licencias y citación</a></li>
          ${contactLinks}
        </ul>
      </nav>
    </div>
    <p class="site-footer__legal small">Código bajo licencia MIT · Contenidos educativos bajo <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.es" rel="license noopener" target="_blank">CC BY-SA 4.0<span class="sr-only"> (se abre en una pestaña nueva)</span></a> · <a href="${esc(config.repository)}" rel="noopener" target="_blank">Código fuente en GitHub<span class="sr-only"> (se abre en una pestaña nueva)</span></a> · Última revisión del contenido: ${config.lastReview}</p>
  </div>
</footer>
<script src="/assets/app.js" defer></script>
</body>
</html>
`;
  // Convierte las rutas absolutas internas en relativas (o con la ruta base en la 404).
  return html.replace(/(href|src|action)="\/(?!\/)/g, `$1="${prefix}`);
}

function logoMark() {
  return `<svg viewBox="0 0 40 40" width="40" height="40" focusable="false"><rect x="2" y="2" width="36" height="36" rx="11" fill="var(--c-primary)"/><path d="M11 13.5h12.5a4 4 0 0 1 4 4v4.5a4 4 0 0 1-4 4H18l-5 4v-4h-2a4 4 0 0 1-4-4v-4.5a4 4 0 0 1 4-4Z" fill="#fff8ef"/><circle cx="14.5" cy="19.8" r="1.5" fill="var(--c-primary)"/><circle cx="19" cy="19.8" r="1.5" fill="var(--c-primary)"/><circle cx="23.5" cy="19.8" r="1.5" fill="var(--c-primary)"/><path d="M28 9.5l1.2 2.6 2.8.3-2.1 1.9.6 2.8-2.5-1.4-2.5 1.4.6-2.8-2.1-1.9 2.8-.3Z" fill="var(--c-accent)"/></svg>`;
}

const pages = []; // { route, html, title, description, text, section, tags }
function addPage(p) {
  pages.push(p);
}

const editLink = (source) =>
  `<p class="edit-link small">${icon('pencil')} <a href="${config.repository}/edit/${EDIT_BRANCH}/${source}" rel="noopener" target="_blank">Proponer una mejora a esta página en GitHub<span class="sr-only"> (se abre en una pestaña nueva)</span></a></p>`;

const tagList = (items = [], cls = '') => items.map((t) => `<span class="tag ${cls}">${esc(t)}</span>`).join(' ');

function tocBlock(toc, label = 'En esta página') {
  if (!toc || toc.length < 2) return '';
  return `<nav class="toc" aria-label="${label}"><p class="toc__title">${label}</p><ol>${toc.map((t) => `<li><a href="#${t.id}">${esc(t.text)}</a></li>`).join('')}</ol></nav>`;
}

// ---------------------------------------------------------------------------
// Páginas
// ---------------------------------------------------------------------------
const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0);
const allLessonIds = modules.flatMap((m) => m.lessons.map((l) => l.id));

function moduleCard(m, headingLevel = 3) {
  return `<article class="card module-card" data-filter-item data-levels="${esc((m.levels || []).join('|'))}" data-ages="${esc((m.ages || []).join('|'))}" data-methods="${esc((m.methods || []).join('|'))}" data-areas="${esc((m.areas || []).join('|'))}">
  <div class="module-card__top"><span class="module-card__icon" aria-hidden="true">${icon(m.icon || 'book')}</span><span class="module-card__num">Módulo ${m.number}</span></div>
  <h${headingLevel} class="module-card__title"><a href="/${m.route}">${esc(m.title)}</a></h${headingLevel}>
  <p>${esc(m.summary)}</p>
  <p class="module-card__meta">${m.lessons.length} lecciones de 60 min · ≈ ${m.lessons.length} h de estudio</p>
  <div class="progress" data-progress="${esc(m.lessons.map((l) => l.id).join('|'))}" aria-hidden="true"><span class="progress__bar"></span></div>
  <p class="progress__label small" data-progress-label="${esc(m.lessons.map((l) => l.id).join('|'))}"></p>
</article>`;
}

function filterBar(groups, targetLabel) {
  return `<div class="filters" data-filters role="group" aria-label="Filtrar ${targetLabel}">
${groups
  .map(
    (g) => `<div class="filters__group"><label for="f-${g.key}">${g.label}</label><select id="f-${g.key}" data-filter="${g.key}"><option value="">Todos</option>${g.options.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join('')}</select></div>`,
  )
  .join('\n')}
<p class="filters__count" role="status" aria-live="polite" data-filter-count></p>
</div>`;
}
const uniq = (arr) => [...new Set(arr.flat().filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
const LEVEL_ORDER = ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Todos los niveles'];
const byLevel = (arr) => uniq(arr).sort((a, b) => LEVEL_ORDER.indexOf(a) - LEVEL_ORDER.indexOf(b));

// --- Inicio
const modRoute = (n) => (modules.find((m) => m.number === n) || { route: 'modulos/' }).route;
{
  const featured = [3, 1, 4, 5].map((n) => modules.find((m) => m.number === n)).filter(Boolean);
  const paths = [
    { icon: 'compass', title: 'Empiezo desde cero', text: 'Fundamentos, planificación y tu primera clase de prueba.', links: [[modRoute(1), 'Módulo 1'], [modRoute(4), 'Módulo 4'], ['clases/clase-prueba-adulto-principiante/', 'Clase de prueba']] },
    { icon: 'laptop', title: 'Ya enseño en plataformas', text: 'Mejora tus clases, tu evaluación y tu perfil profesional.', links: [[modRoute(11), 'Evaluación'], [modRoute(13), 'Plataformas'], [modRoute(14), 'Marca personal']] },
    { icon: 'kids', title: 'Enseño a niños', text: 'Desarrollo infantil, juego con propósito y comunicación con familias.', links: [[modRoute(5), 'Módulo 5'], ['clases/clase-prueba-nino-no-lector/', 'Clase infantil'], ['recursos/lista-clases-infantiles/', 'Lista de comprobación']] },
    { icon: 'layers', title: 'Quiero enseñar mejor la gramática', text: 'Integra las perspectivas tradicional, cognitiva y comunicativa.', links: [[modRoute(3), 'Módulo 3'], ['recursos/guia-integrar-gramaticas/', 'Guía'], ['clases/ser-y-estar/', 'Clase modelo']] },
  ];
  const body = `
<section class="hero">
  <div class="container hero__inner">
    <div class="hero__text">
      <p class="eyebrow">Curso abierto y gratuito · ${esc(config.brand)}</p>
      <h1>Aula Abierta <em>ELE</em><span class="hero__sub">${esc(config.tagline)}</span></h1>
      <p class="lead">${esc(config.subtitle)}</p>
      <div class="hero__cta">
        <a class="btn btn--primary btn--lg" href="/${modRoute(1)}">Empezar el curso ${icon('arrow')}</a>
        <a class="btn btn--ghost btn--lg" href="/indice/">Ver el índice</a>
      </div>
      <ul class="hero__facts" aria-label="El curso en cifras">
        <li><strong>${modules.length}</strong> módulos</li>
        <li><strong>${totalLessons}</strong> lecciones</li>
        <li><strong>${clases.length}</strong> clases modelo</li>
        <li><strong>${recursos.length}</strong> recursos descargables</li>
      </ul>
    </div>
    <div class="hero__art" aria-hidden="true">${heroArt()}</div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <h2 class="section__title">Un proyecto educativo abierto</h2>
    <p class="lead-sm">Un proyecto educativo abierto que reúne conocimientos, estrategias, materiales y herramientas prácticas para ayudar a tutores de español online a mejorar sus clases, fortalecer su metodología y desarrollar una práctica docente sostenible. El acceso al contenido es gratuito y la comunidad puede contribuir a mejorar los recursos mediante colaboraciones, sugerencias y donaciones voluntarias.</p>
    <ul class="pillars">
      <li>${icon('flask')}<div><strong>Rigor sin jerga innecesaria</strong><span>Distinguimos la evidencia consolidada de las hipótesis en debate y de la experiencia práctica.</span></div></li>
      <li>${icon('layers')}<div><strong>Gramática integrada</strong><span>Forma, significado y uso trabajados juntos en secuencias completas.</span></div></li>
      <li>${icon('download')}<div><strong>Listo para usar</strong><span>Plantillas, rúbricas, hojas de cálculo y clases modelo que puedes adaptar.</span></div></li>
      <li>${icon('people')}<div><strong>Hecho en comunidad</strong><span>Código y contenidos abiertos: cualquier tutor puede proponer mejoras.</span></div></li>
    </ul>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    <h2 class="section__title">¿Por dónde empiezo?</h2>
    <div class="grid grid--4">
      ${paths
        .map(
          (p) => `<article class="card path-card"><span class="path-card__icon" aria-hidden="true">${icon(p.icon)}</span><h3>${p.title}</h3><p>${p.text}</p><ul class="path-card__links">${p.links.map(([r, l]) => `<li><a href="/${r}">${l}</a></li>`).join('')}</ul></article>`,
        )
        .join('\n')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section__head"><h2 class="section__title">Módulos destacados</h2><a class="link-more" href="/modulos/">Ver los ${modules.length} módulos ${icon('arrow')}</a></div>
    <div class="grid grid--2">${featured.map((m) => moduleCard(m)).join('\n')}</div>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    <div class="section__head"><h2 class="section__title">Clases modelo listas para adaptar</h2><a class="link-more" href="/clases/">Ver todas ${icon('arrow')}</a></div>
    <div class="grid grid--3">${clases.slice(0, 6).map((c) => claseCard(c)).join('\n')}</div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    ${donateBlock('card')}
    <p class="disclaimer">${icon('info')} Completar el curso no constituye una titulación oficial ni una acreditación profesional. Es una formación abierta para tu desarrollo docente.</p>
  </div>
</section>`;
  addPage({
    route: '',
    isHome: true,
    title: config.title,
    description: config.description,
    body,
    section: 'Inicio',
    text: config.description,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: `${config.title} — ${config.tagline}`,
      description: config.description,
      inLanguage: 'es',
      isAccessibleForFree: true,
      url: SITE_URL + '/',
      creator: { '@type': 'Person', name: config.author },
      provider: { '@type': 'Person', name: config.author },
      license: 'https://creativecommons.org/licenses/by-sa/4.0/',
      hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: `PT${Math.round(modules.reduce((a, m) => a + (m.hours || 0), 0))}H` },
    },
  });
}

function claseCard(c, headingLevel = 3) {
  return `<article class="card clase-card" data-filter-item data-levels="${esc((c.levels || []).join('|'))}" data-ages="${esc((c.ages || []).join('|'))}" data-methods="${esc((c.methods || []).join('|'))}">
  <p class="clase-card__num">Clase modelo ${c.number}</p>
  <h${headingLevel}><a href="/${c.route}">${esc(c.title)}</a></h${headingLevel}>
  <p>${esc(c.summary)}</p>
  <p class="clase-card__meta">${tagList(c.levels, 'tag--level')} ${tagList(c.ages, 'tag--age')} <span class="tag tag--time">${icon('clock')} ${esc(c.duration)}</span></p>
</article>`;
}

function heroArt() {
  return `<svg viewBox="0 0 480 400" width="480" height="400" focusable="false" role="img">
  <defs><linearGradient id="hg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="var(--c-accent-soft)"/><stop offset="1" stop-color="var(--c-primary-soft)"/></linearGradient></defs>
  <circle cx="250" cy="200" r="170" fill="url(#hg)"/>
  <rect x="110" y="120" width="250" height="170" rx="18" fill="var(--c-surface)" stroke="var(--c-ink)" stroke-width="4"/>
  <rect x="128" y="138" width="214" height="120" rx="10" fill="var(--c-secondary-soft)"/>
  <circle cx="195" cy="190" r="26" fill="var(--c-primary)"/><path d="M160 258c4-28 20-40 35-40s31 12 35 40" fill="var(--c-primary)"/>
  <rect x="245" y="160" width="80" height="12" rx="6" fill="var(--c-secondary)"/><rect x="245" y="182" width="60" height="12" rx="6" fill="var(--c-secondary)" opacity=".6"/><rect x="245" y="204" width="70" height="12" rx="6" fill="var(--c-secondary)" opacity=".35"/>
  <path d="M90 290h290l-20 22H110Z" fill="var(--c-ink)"/>
  <g transform="translate(330 60)"><path d="M0 18a18 18 0 0 1 18-18h86a18 18 0 0 1 18 18v34a18 18 0 0 1-18 18H40l-22 18V70A18 18 0 0 1 0 52Z" fill="var(--c-primary)"/><text x="61" y="44" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="24" font-weight="700" fill="#fff8ef">¡Hola!</text></g>
  <g transform="translate(40 70)"><path d="M0 16A16 16 0 0 1 16 0h78a16 16 0 0 1 16 16v30a16 16 0 0 1-16 16H30l-16 16V62A16 16 0 0 1 0 46Z" fill="var(--c-secondary)"/><text x="55" y="38" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="20" font-weight="700" fill="#fff">¿Qué tal?</text></g>
  <g transform="translate(380 250)"><rect width="70" height="86" rx="8" fill="var(--c-accent)" transform="rotate(8)"/><rect x="10" y="14" width="44" height="6" rx="3" fill="var(--c-ink)" opacity=".5" transform="rotate(8)"/><rect x="10" y="28" width="34" height="6" rx="3" fill="var(--c-ink)" opacity=".35" transform="rotate(8)"/><text x="30" y="70" font-family="Fraunces, Georgia, serif" font-size="26" font-weight="700" fill="var(--c-ink)" transform="rotate(8)">ñ</text></g>
  <g fill="var(--c-accent)"><path d="M70 230l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1Z"/><circle cx="430" cy="160" r="7"/><circle cx="60" cy="320" r="5" fill="var(--c-primary)"/></g>
</svg>`;
}

// --- Catálogo de módulos
{
  const body = `<div class="container">
  <header class="page-head"><p class="eyebrow">Catálogo</p><h1>Módulos del curso</h1>
  <p class="lead">${modules.length} módulos y ${totalLessons} lecciones. Puedes seguirlos en orden o empezar por lo que necesites hoy. Tu progreso se guarda solo en este navegador.</p></header>
  ${filterBar(
    [
      { key: 'levels', label: 'Nivel del estudiante', options: byLevel(modules.map((m) => m.levels || [])) },
      { key: 'ages', label: 'Edad', options: uniq(modules.map((m) => m.ages || [])) },
      { key: 'methods', label: 'Metodología', options: uniq(modules.map((m) => m.methods || [])) },
      { key: 'areas', label: 'Área', options: uniq(modules.map((m) => m.areas || [])) },
    ],
    'módulos',
  )}
  <div class="grid grid--3" data-filter-list>${modules.map((m) => moduleCard(m, 2)).join('\n')}</div>
  <p class="empty-state" data-filter-empty hidden>No hay módulos con esa combinación de filtros. Prueba a quitar alguno.</p>
</div>`;
  addPage({ route: 'modulos/', title: 'Módulos del curso', description: `Catálogo de los ${modules.length} módulos de Aula Abierta ELE para tutores de español online.`, body, breadcrumbs: [{ label: 'Módulos' }], section: 'Catálogo', text: modules.map((m) => m.title).join('. ') });
}

// --- Módulo y lecciones
modules.forEach((m, mi) => {
  const lessonList = `<ol class="lesson-list">${m.lessons
    .map(
      (l) => `<li><a href="/${l.route}"><span class="lesson-list__n">${m.number}.${l.index}</span><span class="lesson-list__t">${esc(l.title)}</span><span class="lesson-list__m">${l.minutes} min</span><span class="lesson-list__state" data-lesson-state="${esc(l.id)}" aria-hidden="true"></span></a></li>`,
    )
    .join('')}</ol>`;
  const prevM = modules[mi - 1];
  const nextM = modules[mi + 1];
  const body = `<div class="container">
  <header class="page-head module-head">
    <span class="module-head__icon" aria-hidden="true">${icon(m.icon || 'book')}</span>
    <div><p class="eyebrow">Módulo ${m.number} de ${modules.length}</p><h1>${esc(m.title)}</h1><p class="lead">${esc(m.summary)}</p>
    <p class="meta-row">${tagList(m.levels, 'tag--level')} ${tagList(m.ages, 'tag--age')} <span class="tag tag--time">${icon('clock')} ≈ ${m.lessons.length} h (${m.lessons.length} lecciones de 60 min)</span></p></div>
  </header>
  <div class="module-layout">
    <div class="prose">
      <section class="objectives" aria-labelledby="obj"><h2 id="obj">${icon('target')} Objetivos de aprendizaje</h2><p>Al terminar este módulo podrás:</p><ul>${(m.objectives || []).map((o) => `<li>${esc(o)}</li>`).join('')}</ul></section>
      ${m.introHtml}
      <h2 id="lecciones">Lecciones</h2>
      ${lessonList}
      <p><a class="btn btn--primary" href="/${m.lessons[0].route}">Empezar por la lección ${m.number}.1 ${icon('arrow')}</a></p>
      ${editLink(m.source)}
    </div>
    <aside class="module-aside">
      <div class="card"><p class="aside__title">Tu progreso</p><div class="progress progress--lg" data-progress="${esc(m.lessons.map((l) => l.id).join('|'))}" aria-hidden="true"><span class="progress__bar"></span></div><p class="small" data-progress-label="${esc(m.lessons.map((l) => l.id).join('|'))}"></p></div>
      ${m.related ? `<div class="card"><p class="aside__title">Recursos relacionados</p><ul>${m.related
        .map((r) => {
          const res = recursos.find((x) => x.slug === r) || clases.find((x) => x.slug === r);
          return res ? `<li><a href="/${res.route}">${esc(res.title)}</a></li>` : '';
        })
        .join('')}</ul></div>` : ''}
    </aside>
  </div>
  <nav class="pager" aria-label="Módulos">
    ${prevM ? `<a class="pager__prev" href="/${prevM.route}"><span>← Módulo anterior</span>${esc(prevM.title)}</a>` : '<span></span>'}
    ${nextM ? `<a class="pager__next" href="/${nextM.route}"><span>Módulo siguiente →</span>${esc(nextM.title)}</a>` : ''}
  </nav>
</div>`;
  addPage({
    route: m.route,
    title: `Módulo ${m.number}. ${m.title}`,
    description: m.summary,
    body,
    breadcrumbs: [{ route: 'modulos/', label: 'Módulos' }, { label: `Módulo ${m.number}` }],
    section: `Módulo ${m.number}`,
    text: stripHtml(m.introHtml) + ' ' + (m.objectives || []).join(' '),
    tags: [...(m.levels || []), ...(m.ages || [])],
  });

  m.lessons.forEach((l, li) => {
    const prev = m.lessons[li - 1] || (prevM && { ...prevM.lessons.at(-1), mod: prevM });
    const next = m.lessons[li + 1] || (nextM && { ...nextM.lessons[0], mod: nextM });
    const sidebar = `<nav class="lesson-nav" aria-label="Lecciones del módulo ${m.number}"><p class="lesson-nav__title"><a href="/${m.route}">Módulo ${m.number}. ${esc(m.short || m.title)}</a></p><ol>${m.lessons
      .map((x) => `<li><a href="/${x.route}"${x === l ? ' aria-current="page"' : ''}><span data-lesson-state="${esc(x.id)}" aria-hidden="true"></span>${m.number}.${x.index} ${esc(x.title)}</a></li>`)
      .join('')}</ol></nav>`;
    const body = `<div class="container lesson-layout">
  <aside class="lesson-aside">${sidebar}</aside>
  <article class="lesson" aria-labelledby="titulo">
    <header class="page-head page-head--lesson"><p class="eyebrow">Módulo ${m.number} · Lección ${l.index} de ${m.lessons.length}</p><h1 id="titulo">${esc(l.title)}</h1><p class="meta-row"><span class="tag tag--time">${icon('clock')} ${l.minutes} min de duración</span></p></header>
    ${tocBlock(l.toc)}
    <div class="prose">${l.html}</div>
    <div class="complete-box"><button type="button" class="btn btn--complete" data-complete="${esc(l.id)}" aria-pressed="false">${icon('check')} <span>Marcar lección como completada</span></button><p class="small">Tu progreso se guarda solo en este navegador. No necesitas cuenta.</p></div>
    ${editLink(m.source)}
    <nav class="pager" aria-label="Lecciones">
      ${prev ? `<a class="pager__prev" href="/${prev.route}"><span>← Anterior</span>${esc(prev.title)}</a>` : '<span></span>'}
      ${next ? `<a class="pager__next" href="/${next.route}"><span>Siguiente →</span>${esc(next.title)}</a>` : `<a class="pager__next" href="/indice/"><span>Fin del curso →</span>Ver índice y progreso</a>`}
    </nav>
  </article>
</div>`;
    addPage({
      route: l.route,
      title: `${l.title} · Módulo ${m.number}`,
      description: `${m.title} · Lección ${m.number}.${l.index}: ${l.title}.`,
      body,
      bodyClass: 'is-lesson',
      breadcrumbs: [{ route: 'modulos/', label: 'Módulos' }, { route: m.route, label: `Módulo ${m.number}` }, { label: `Lección ${l.index}` }],
      section: `Módulo ${m.number} · Lección`,
      text: stripHtml(l.html),
      title_plain: l.title,
      type: 'article',
    });
  });
});

// --- Índice
{
  const body = `<div class="container narrow">
  <header class="page-head"><p class="eyebrow">Índice del curso</p><h1>Índice y progreso</h1>
  <p class="lead">Todas las lecciones del curso. Las marcas de progreso se guardan localmente en tu navegador.</p>
  <div class="card progress-summary"><div class="progress progress--lg" data-progress="${esc(allLessonIds.join('|'))}" aria-hidden="true"><span class="progress__bar"></span></div><p data-progress-label="${esc(allLessonIds.join('|'))}"></p>
  <p class="small"><button type="button" class="btn btn--ghost btn--sm" data-export-progress>Exportar progreso</button> <button type="button" class="btn btn--ghost btn--sm" data-import-progress>Importar progreso</button> <button type="button" class="btn btn--ghost btn--sm" data-reset-progress>Borrar mi progreso</button></p></div></header>
  ${modules
    .map(
      (m) => `<section class="index-module" aria-labelledby="idx-${m.number}"><h2 id="idx-${m.number}"><a href="/${m.route}">Módulo ${m.number}. ${esc(m.title)}</a></h2><ol class="lesson-list lesson-list--compact">${m.lessons
        .map((l) => `<li><a href="/${l.route}"><span class="lesson-list__n">${m.number}.${l.index}</span><span class="lesson-list__t">${esc(l.title)}</span><span class="lesson-list__m">${l.minutes} min</span><span class="lesson-list__state" data-lesson-state="${esc(l.id)}" aria-hidden="true"></span></a></li>`)
        .join('')}</ol></section>`,
    )
    .join('\n')}
  <section class="index-module"><h2>Complementos</h2><ul><li><a href="/clases/">${clases.length} clases modelo</a></li><li><a href="/recursos/">${recursos.length} recursos descargables</a></li><li><a href="/glosario/">Glosario de términos de ELE</a></li><li><a href="/bibliografia/">Bibliografía y fuentes</a></li></ul></section>
</div>`;
  addPage({ route: 'indice/', title: 'Índice y progreso', description: 'Índice completo de módulos y lecciones de Aula Abierta ELE, con seguimiento local del progreso.', body, breadcrumbs: [{ label: 'Índice' }], section: 'Índice', text: 'índice progreso lecciones' });
}

// --- Clases modelo
{
  const body = `<div class="container">
  <header class="page-head"><p class="eyebrow">Biblioteca de clases</p><h1>Clases modelo</h1>
  <p class="lead">${clases.length} clases completas con objetivos, materiales, guion para el tutor, respuestas esperadas, evaluación y adaptaciones. Úsalas como punto de partida y ajústalas a tu estudiante.</p></header>
  ${filterBar(
    [
      { key: 'levels', label: 'Nivel', options: byLevel(clases.map((c) => c.levels || [])) },
      { key: 'ages', label: 'Edad', options: uniq(clases.map((c) => c.ages || [])) },
      { key: 'methods', label: 'Metodología', options: uniq(clases.map((c) => c.methods || [])) },
    ],
    'clases',
  )}
  <div class="grid grid--3" data-filter-list>${clases.map((c) => claseCard(c, 2)).join('\n')}</div>
  <p class="empty-state" data-filter-empty hidden>No hay clases con esa combinación de filtros.</p>
</div>`;
  addPage({ route: 'clases/', title: 'Clases modelo', description: `${clases.length} clases modelo completas para tutores de español online, de Pre-A1 a C2, para niños, adolescentes y adultos.`, body, breadcrumbs: [{ label: 'Clases modelo' }], section: 'Clases modelo', text: clases.map((c) => c.title).join('. ') });
}
clases.forEach((c, i) => {
  const prev = clases[i - 1];
  const next = clases[i + 1];
  const body = `<div class="container narrow">
  <article aria-labelledby="titulo">
  <header class="page-head"><p class="eyebrow">Clase modelo ${c.number}</p><h1 id="titulo">${esc(c.title)}</h1><p class="lead">${esc(c.summary)}</p>
  <dl class="facts">
    <div><dt>Nivel</dt><dd>${esc((c.levels || []).join(', '))}</dd></div>
    <div><dt>Estudiante</dt><dd>${esc((c.ages || []).join(', '))}</dd></div>
    <div><dt>Duración</dt><dd>${esc(c.duration)}</dd></div>
    <div><dt>Enfoque</dt><dd>${esc((c.methods || []).join(', '))}</dd></div>
  </dl>
  <p class="no-print"><button type="button" class="btn btn--ghost btn--sm" data-print>${icon('print')} Imprimir o guardar como PDF</button></p></header>
  ${tocBlock(c.toc)}
  <div class="prose">${c.html}</div>
  ${editLink(c.source)}
  <nav class="pager" aria-label="Clases modelo">
    ${prev ? `<a class="pager__prev" href="/${prev.route}"><span>← Anterior</span>${esc(prev.title)}</a>` : '<span></span>'}
    ${next ? `<a class="pager__next" href="/${next.route}"><span>Siguiente →</span>${esc(next.title)}</a>` : ''}
  </nav>
  </article>
</div>`;
  addPage({ route: c.route, title: `Clase modelo: ${c.title}`, description: c.summary, body, breadcrumbs: [{ route: 'clases/', label: 'Clases modelo' }, { label: `Clase ${c.number}` }], section: 'Clase modelo', text: stripHtml(c.html), type: 'article' });
});

// --- Recursos
{
  const types = uniq(recursos.map((r) => [r.type]));
  const body = `<div class="container">
  <header class="page-head"><p class="eyebrow">Biblioteca descargable</p><h1>Recursos para tutores</h1>
  <p class="lead">${recursos.length} materiales listos para descargar, copiar, imprimir y adaptar. Formatos abiertos (Markdown y CSV) que puedes abrir con cualquier editor de texto, Google Docs, LibreOffice o Excel.</p></header>
  ${filterBar(
    [
      { key: 'types', label: 'Tipo de recurso', options: types },
      { key: 'ages', label: 'Edad', options: uniq(recursos.map((r) => r.ages || [])) },
      { key: 'areas', label: 'Área', options: uniq(recursos.map((r) => r.areas || [])) },
    ],
    'recursos',
  )}
  <div class="grid grid--3" data-filter-list>
  ${recursos
    .map(
      (r) => `<article class="card resource-card" data-filter-item data-types="${esc(r.type)}" data-ages="${esc((r.ages || []).join('|'))}" data-areas="${esc((r.areas || []).join('|'))}">
    <p class="resource-card__type">${icon(r.icon || 'file')} ${esc(r.type)}</p>
    <h2 class="resource-card__title"><a href="/${r.route}">${esc(r.title)}</a></h2>
    <p>${esc(r.summary)}</p>
    <p class="resource-card__dl">${r.downloads.map((d) => `<a class="btn btn--sm btn--ghost" href="/${d.path}" download>${icon('download')} ${d.label}<span class="sr-only">: ${esc(r.title)}</span></a>`).join(' ')}</p>
  </article>`,
    )
    .join('\n')}
  </div>
  <p class="empty-state" data-filter-empty hidden>No hay recursos con esa combinación de filtros.</p>
  <aside class="callout callout--nota"><p class="callout__title">${icon('info')} <strong>Licencia de los recursos</strong></p><p>Todos los recursos se publican bajo <a href="/licencias/">CC BY-SA 4.0</a>: puedes usarlos, adaptarlos y compartirlos, incluso en tus clases de pago, citando la fuente y compartiendo las adaptaciones con la misma licencia.</p></aside>
</div>`;
  addPage({ route: 'recursos/', title: 'Biblioteca de recursos descargables', description: 'Plantillas, rúbricas, fichas, listas de comprobación y hojas de cálculo gratuitas para tutores de español online.', body, breadcrumbs: [{ label: 'Recursos' }], section: 'Recursos', text: recursos.map((r) => r.title + ' ' + r.summary).join('. ') });
}
recursos.forEach((r) => {
  const body = `<div class="container narrow">
  <article aria-labelledby="titulo">
  <header class="page-head"><p class="eyebrow">${icon(r.icon || 'file')} ${esc(r.type)}</p><h1 id="titulo">${esc(r.title)}</h1><p class="lead">${esc(r.summary)}</p>
  <div class="download-bar no-print">${r.downloads.map((d) => `<a class="btn btn--primary btn--sm" href="/${d.path}" download>${icon('download')} Descargar ${d.label}</a>`).join(' ')} <button type="button" class="btn btn--ghost btn--sm" data-copy-source="${r.downloads.at(-1).path}">${icon('copy')} Copiar texto</button> <button type="button" class="btn btn--ghost btn--sm" data-print>${icon('print')} Imprimir</button></div>
  ${r.module ? `<p class="small">Relacionado con: ${(Array.isArray(r.module) ? r.module : [r.module]).map((n) => { const mm = modules.find((x) => x.number === Number(n)); return mm ? `<a href="/${mm.route}">Módulo ${mm.number}. ${esc(mm.title)}</a>` : ''; }).join(' · ')}</p>` : ''}
  </header>
  <div class="prose resource-body">${r.html}</div>
  <p class="small">Licencia: CC BY-SA 4.0 · Cita sugerida: Uribe, I. (2026). <em>${esc(r.title)}</em>. Aula Abierta ELE.</p>
  ${editLink(r.source)}
  </article>
</div>`;
  addPage({ route: r.route, title: r.title, description: r.summary, body, breadcrumbs: [{ route: 'recursos/', label: 'Recursos' }, { label: r.title }], section: 'Recurso', text: stripHtml(r.html) });
});

// --- Páginas generales (autora, glosario, bibliografía, FAQ, etc.)
for (const [slug, p] of Object.entries(paginas)) {
  const extra = slug === 'colaborar' ? donateBlock('card') : '';
  const filterable = p.filterable
    ? `<div class="filters filters--text"><label for="text-filter">${esc(p.filterable)}</label><input id="text-filter" type="search" data-text-filter placeholder="Escribe para filtrar…" autocomplete="off"><p class="filters__count" role="status" aria-live="polite" data-text-filter-count></p></div>`
    : '';
  const body = `<div class="container narrow">
  <header class="page-head"><p class="eyebrow">${esc(p.eyebrow || config.title)}</p><h1>${esc(p.title)}</h1>${p.lead ? `<p class="lead">${esc(p.lead)}</p>` : ''}</header>
  ${extra}
  ${filterable}
  ${p.toc_off ? '' : tocBlock(p.toc)}
  <div class="prose${p.filterable ? ' prose--filterable' : ''}">${p.html}</div>
  ${editLink(p.source)}
</div>`;
  addPage({ route: `${slug}/`, title: p.title, description: p.description, body, breadcrumbs: [{ label: p.title }], section: p.title, text: stripHtml(p.html) });
}

// --- Buscador
addPage({
  route: 'buscar/',
  title: 'Buscar en el curso',
  description: 'Busca lecciones, clases modelo, recursos y términos del glosario de Aula Abierta ELE.',
  breadcrumbs: [{ label: 'Buscar' }],
  noindex: true,
  body: `<div class="container narrow">
  <header class="page-head"><h1>Buscar en el curso</h1></header>
  <form class="search-page" role="search" data-search-form>
    <label for="q">¿Qué estás buscando?</label>
    <div class="search-page__row"><input id="q" name="q" type="search" autocomplete="off" placeholder="Por ejemplo: subjuntivo, clase de prueba, rúbrica, niños…"><button class="btn btn--primary" type="submit">Buscar</button></div>
  </form>
  <p role="status" aria-live="polite" class="search-status" data-search-status></p>
  <ol class="search-results" data-search-results></ol>
  <noscript><p>El buscador necesita JavaScript. También puedes consultar el <a href="/indice/">índice completo</a>.</p></noscript>
</div>`,
});

// --- 404
addPage({
  route: '404.html',
  is404: true,
  title: 'Página no encontrada',
  description: 'La página que buscas no existe o ha cambiado de dirección.',
  body: `<div class="container narrow center">
  <header class="page-head"><p class="eyebrow">Error 404</p><h1>¡Uy! Esta página no existe</h1><p class="lead">Puede que la dirección haya cambiado o que haya un error en el enlace. Como diríamos en clase: ¡los errores son parte del aprendizaje!</p></header>
  <p><a class="btn btn--primary" href="/">Volver al inicio</a> <a class="btn btn--ghost" href="/indice/">Ver el índice</a> <a class="btn btn--ghost" href="/buscar/">Buscar</a></p>
</div>`,
});

// ---------------------------------------------------------------------------
// Escritura
// ---------------------------------------------------------------------------
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

for (const p of pages) {
  const out = p.route.endsWith('.html') ? path.join(DIST, p.route) : path.join(DIST, p.route, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, layout(p));
}

// Recursos estáticos
const copyDir = (from, to) => {
  fs.mkdirSync(to, { recursive: true });
  for (const f of fs.readdirSync(from, { withFileTypes: true })) {
    if (f.isDirectory()) copyDir(path.join(from, f.name), path.join(to, f.name));
    else fs.copyFileSync(path.join(from, f.name), path.join(to, f.name));
  }
};
copyDir(path.join(ROOT, 'src/assets'), path.join(DIST, 'assets'));
const fontsDir = path.join(DIST, 'assets/fonts');
fs.mkdirSync(fontsDir, { recursive: true });
const fonts = {
  'fraunces.woff2': '@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2',
  'fraunces-ext.woff2': '@fontsource-variable/fraunces/files/fraunces-latin-ext-wght-normal.woff2',
  'atkinson-400.woff2': '@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-400-normal.woff2',
  'atkinson-400i.woff2': '@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-400-italic.woff2',
  'atkinson-700.woff2': '@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-700-normal.woff2',
  'atkinson-ext-400.woff2': '@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-ext-400-normal.woff2',
  'atkinson-ext-700.woff2': '@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-ext-700-normal.woff2',
};
for (const [name, src] of Object.entries(fonts)) fs.copyFileSync(path.join(ROOT, 'node_modules', src), path.join(fontsDir, name));
// Las tipografías se distribuyen con su licencia (SIL Open Font License 1.1).
fs.copyFileSync(path.join(ROOT, 'node_modules/@fontsource/atkinson-hyperlegible/LICENSE'), path.join(fontsDir, 'LICENSE-atkinson-hyperlegible.txt'));
fs.copyFileSync(path.join(ROOT, 'node_modules/@fontsource-variable/fraunces/LICENSE'), path.join(fontsDir, 'LICENSE-fraunces.txt'));

// Descargas: se publican los ficheros fuente tal cual
const dl = path.join(DIST, 'descargas');
fs.mkdirSync(dl, { recursive: true });
for (const r of recursos) {
  // En los archivos descargados, los enlaces internos pasan a ser absolutos.
  const raw = fs.readFileSync(path.join(CONTENT, 'recursos', r.file), 'utf8').replace(/^---[\s\S]*?---\r?\n/, '');
  fs.writeFileSync(path.join(dl, r.file), raw.replace(/\]\(\/(?!\/)/g, `](${SITE_URL}/`));
  for (const extra of r.extra || []) fs.copyFileSync(path.join(CONTENT, 'recursos', extra), path.join(dl, extra));
}

// Índice de búsqueda
const glossaryEntries = (() => {
  const g = paginas.glosario;
  if (!g) return [];
  return [...g.html.matchAll(/<h3 id="([^"]+)">.*?<\/a>(.*?)<\/h3>\s*([\s\S]*?)(?=<h[23] |$)/g)].map((m) => ({
    t: stripHtml(m[2]),
    u: `glosario/#${m[1]}`,
    s: 'Glosario',
    x: stripHtml(m[3]).slice(0, 400),
  }));
})();
const searchIndex = [
  ...pages
    .filter((p) => !p.is404 && !p.noindex && p.route)
    .map((p) => ({ t: p.title_plain || p.title, u: p.route, s: p.section || '', x: (p.text || '').slice(0, 6000) })),
  ...glossaryEntries,
];
fs.writeFileSync(path.join(DIST, 'search-index.json'), JSON.stringify(searchIndex));

// SEO
const indexable = pages.filter((p) => !p.is404 && !p.noindex);
fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable
    .map((p) => `  <url><loc>${SITE_URL}/${p.route}</loc><lastmod>${BUILD_DATE}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
);
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.writeFileSync(
  path.join(DIST, 'manifest.webmanifest'),
  JSON.stringify({ name: `${config.title} — ${config.tagline}`, short_name: config.title, lang: 'es', start_url: './', display: 'standalone', background_color: '#fff8ef', theme_color: '#c8553d', icons: [{ src: 'assets/icon-512.png', sizes: '512x512', type: 'image/png' }, { src: 'assets/favicon.svg', sizes: 'any', type: 'image/svg+xml' }] }, null, 2),
);
fs.writeFileSync(path.join(DIST, '.nojekyll'), '');

// Informe
const stats = {
  paginas: pages.length,
  modulos: modules.length,
  lecciones: totalLessons,
  palabrasModulos: modules.reduce((a, m) => a + m.lessons.reduce((b, l) => b + words(l.html), 0), 0),
  clases: clases.length,
  recursos: recursos.length,
};
fs.writeFileSync(path.join(DIST, 'build-info.json'), JSON.stringify({ ...stats, date: BUILD_DATE, siteUrl: SITE_URL, icons: Object.keys(ICONS).length }, null, 2));
console.log('Aula Abierta ELE generada en dist/', stats);
