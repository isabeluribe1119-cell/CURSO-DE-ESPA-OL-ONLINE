// Genera las imágenes PNG del sitio (favicon, iconos e imagen Open Graph) a partir de SVG/HTML.
// Uso opcional: requiere Playwright con Chromium (npx playwright install chromium).
//   node scripts/generate-images.mjs
// Las imágenes resultantes se guardan en src/assets y se versionan en el repositorio.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src/assets');
let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright no está instalado. Ejecuta: npm i -D playwright && npx playwright install chromium');
  process.exit(1);
}

const favicon = fs.readFileSync(path.join(OUT, 'favicon.svg'), 'utf8');
// Las fuentes se incrustan como data URL porque la página se carga con setContent (sin acceso a file://).
const font = (f) => 'data:font/woff2;base64,' + fs.readFileSync(path.join(ROOT, 'node_modules', f)).toString('base64');

const og = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Fraunces;src:url(${font('@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2')});font-weight:300 900}
@font-face{font-family:Atkinson;src:url(${font('@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-400-normal.woff2')})}
@font-face{font-family:Atkinson;src:url(${font('@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-700-normal.woff2')});font-weight:700}
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{background:radial-gradient(900px 500px at 90% 0%,#fbe6b5,transparent 60%),radial-gradient(800px 500px at 0% 100%,#f8d9cc,transparent 60%),#fff8ef;font-family:Atkinson,sans-serif;color:#2b2321;display:flex;align-items:center;padding:0 80px;box-sizing:border-box}
.logo{width:120px;height:120px;margin-bottom:28px}
h1{font-family:Fraunces,serif;font-size:92px;line-height:1;margin:0;font-weight:700;letter-spacing:-1px}
h1 em{font-style:normal;color:#b4472f}
.sub{font-family:Fraunces,serif;font-size:44px;color:#5c514b;margin:14px 0 28px}
.tag{font-size:28px;max-width:780px;line-height:1.35}
.by{margin-top:30px;font-size:24px;font-weight:700;color:#1f6f6a;letter-spacing:.04em;text-transform:uppercase}
.bubble{position:absolute;right:70px;top:60px;background:#b4472f;color:#fff8ef;font-family:Fraunces,serif;font-weight:700;font-size:48px;padding:22px 34px;border-radius:28px}
.bubble2{position:absolute;right:200px;bottom:70px;background:#1f6f6a;color:#fff;font-family:Fraunces,serif;font-weight:700;font-size:38px;padding:18px 28px;border-radius:24px}
.n{position:absolute;right:95px;top:215px;width:110px;height:140px;background:#f2b134;border-radius:16px;transform:rotate(8deg);font-family:Fraunces,serif;font-size:96px;font-weight:700;display:flex;align-items:center;justify-content:center}
</style></head><body><div><div class="logo">${favicon}</div>
<h1>Aula Abierta <em>ELE</em></h1><p class="sub">Recursos para enseñar español online</p>
<p class="tag">Curso gratuito y abierto para tutores: metodología, gramática, planificación, materiales, evaluación y desarrollo profesional.</p>
<p class="by">Isabel Uribe · Spanish for your life</p></div>
<div class="bubble">¡Hola!</div><div class="bubble2">¿Qué tal?</div><div class="n">ñ</div></body></html>`;

const icon = (size, pad = 0) => `<!doctype html><html><head><style>html,body{margin:0;width:${size}px;height:${size}px;background:${pad ? '#fff8ef' : 'transparent'};display:flex;align-items:center;justify-content:center}svg{width:${size - pad * 2}px;height:${size - pad * 2}px}</style></head><body>${favicon}</body></html>`;

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const shots = [
  { file: 'og-image.png', html: og, w: 1200, h: 630 },
  { file: 'favicon-32.png', html: icon(32), w: 32, h: 32, transparent: true },
  { file: 'apple-touch-icon.png', html: icon(180, 14), w: 180, h: 180 },
  { file: 'icon-512.png', html: icon(512, 40), w: 512, h: 512 },
];
for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h } });
  await page.setContent(s.html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(OUT, s.file), omitBackground: !!s.transparent });
  await page.close();
  console.log('✔', s.file);
}
await browser.close();
