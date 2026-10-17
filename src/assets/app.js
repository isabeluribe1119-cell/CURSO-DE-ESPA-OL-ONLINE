/* Aula Abierta ELE — interacciones del sitio (sin dependencias ni servidor). */
(function () {
  'use strict';
  var ROOT = document.documentElement.getAttribute('data-root') || './';
  var KEY = 'aae-progress-v1';

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value);
    } catch (e) { return null; }
  }
  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2200);
  }
  function normalize(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  // --- Menú móvil
  var toggle = $('.nav-toggle'), nav = $('#menu-principal');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus();
      }
    });
  }

  // --- Tema claro / oscuro
  var themeBtn = $('[data-theme-toggle]');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var current = document.documentElement.dataset.theme ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      store('aae-theme', next);
      toast(next === 'dark' ? 'Modo oscuro activado' : 'Modo claro activado');
    });
  }

  // --- Copiar al portapapeles
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); resolve(); } catch (e) { reject(e); }
      ta.remove();
    });
  }
  $$('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var code = btn.parentNode.querySelector('code');
      copyText(code.textContent).then(function () {
        btn.textContent = '¡Copiado!'; toast('Texto copiado al portapapeles');
        setTimeout(function () { btn.textContent = 'Copiar'; }, 1800);
      });
    });
  });
  $$('[data-copy-source]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      fetch(ROOT + btn.getAttribute('data-copy-source')).then(function (r) { return r.text(); })
        .then(copyText).then(function () { toast('Recurso copiado: pégalo en tu editor'); })
        .catch(function () { toast('No se pudo copiar. Usa el botón de descarga.'); });
    });
  });
  $$('[data-print]').forEach(function (b) { b.addEventListener('click', function () { window.print(); }); });

  // --- Cuestionarios
  $$('[data-quiz]').forEach(function (quiz) {
    var qs = $$('[data-question]', quiz);
    $('[data-quiz-check]', quiz).addEventListener('click', function () {
      var ok = 0, answered = 0;
      qs.forEach(function (q) {
        var chosen = $('input:checked', q), fb = $('.quiz__fb', q);
        $$('.quiz__opt', q).forEach(function (o) { o.classList.remove('is-correct', 'is-wrong'); });
        if (!chosen) { fb.hidden = false; fb.innerHTML = 'Elige una respuesta.'; return; }
        answered++;
        var right = chosen.hasAttribute('data-correct');
        if (right) ok++;
        chosen.closest('.quiz__opt').classList.add(right ? 'is-correct' : 'is-wrong');
        var correct = $('input[data-correct]', q);
        if (!right && correct) correct.closest('.quiz__opt').classList.add('is-correct');
        fb.hidden = false;
        fb.innerHTML = '<strong>' + (right ? '✔ Correcto.' : '✘ No exactamente.') + '</strong>' + (fb.getAttribute('data-feedback') || '');
      });
      $('.quiz__score', quiz).textContent = answered ? 'Resultado: ' + ok + ' de ' + qs.length + ' respuestas correctas.' : '';
    });
    $('[data-quiz-reset]', quiz).addEventListener('click', function () {
      $$('input', quiz).forEach(function (i) { i.checked = false; });
      $$('.quiz__opt', quiz).forEach(function (o) { o.classList.remove('is-correct', 'is-wrong'); });
      $$('.quiz__fb', quiz).forEach(function (f) { f.hidden = true; f.innerHTML = ''; });
      $('.quiz__score', quiz).textContent = '';
    });
  });

  // --- Progreso local
  function getProgress() {
    try { return JSON.parse(store(KEY) || '{}') || {}; } catch (e) { return {}; }
  }
  function setProgress(p) { store(KEY, JSON.stringify(p)); renderProgress(); }
  function renderProgress() {
    var p = getProgress();
    $$('[data-lesson-state]').forEach(function (el) {
      var done = !!p[el.getAttribute('data-lesson-state')];
      el.classList.toggle('is-done', done);
      var a = el.closest('a');
      if (a) {
        var sr = a.querySelector('.sr-state');
        if (!sr) { sr = document.createElement('span'); sr.className = 'sr-only sr-state'; a.appendChild(sr); }
        sr.textContent = done ? ' (completada)' : '';
      }
    });
    $$('[data-progress]').forEach(function (el) {
      var ids = el.getAttribute('data-progress').split('|');
      var done = ids.filter(function (id) { return p[id]; }).length;
      $('.progress__bar', el).style.width = Math.round((done / ids.length) * 100) + '%';
    });
    $$('[data-progress-label]').forEach(function (el) {
      var ids = el.getAttribute('data-progress-label').split('|');
      var done = ids.filter(function (id) { return p[id]; }).length;
      el.textContent = done ? done + ' de ' + ids.length + ' lecciones completadas (' + Math.round((done / ids.length) * 100) + ' %)' : 'Aún no has marcado lecciones como completadas.';
    });
    $$('[data-complete]').forEach(function (btn) {
      var done = !!p[btn.getAttribute('data-complete')];
      btn.setAttribute('aria-pressed', String(done));
      $('span', btn).textContent = done ? 'Lección completada · desmarcar' : 'Marcar lección como completada';
    });
  }
  $$('[data-complete]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var p = getProgress(), id = btn.getAttribute('data-complete');
      if (p[id]) delete p[id]; else p[id] = new Date().toISOString().slice(0, 10);
      setProgress(p);
      toast(p[id] ? '¡Lección completada!' : 'Marca eliminada');
    });
  });
  var reset = $('[data-reset-progress]');
  if (reset) reset.addEventListener('click', function () {
    if (window.confirm('¿Seguro que quieres borrar todo tu progreso guardado en este navegador?')) { setProgress({}); toast('Progreso borrado'); }
  });
  var exp = $('[data-export-progress]');
  if (exp) exp.addEventListener('click', function () {
    var blob = new Blob([JSON.stringify(getProgress(), null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'progreso-aula-abierta-ele.json';
    document.body.appendChild(a); a.click(); a.remove();
  });
  var imp = $('[data-import-progress]');
  if (imp) imp.addEventListener('click', function () {
    var input = document.createElement('input');
    input.type = 'file'; input.accept = 'application/json,.json';
    input.addEventListener('change', function () {
      var f = input.files[0]; if (!f) return;
      f.text().then(function (t) {
        var data = JSON.parse(t);
        if (typeof data !== 'object' || Array.isArray(data)) throw new Error();
        var p = getProgress();
        Object.keys(data).forEach(function (k) { if (typeof data[k] === 'string') p[k] = data[k]; });
        setProgress(p); toast('Progreso importado');
      }).catch(function () { toast('El archivo no es válido'); });
    });
    input.click();
  });
  renderProgress();

  // --- Filtros de catálogo
  $$('[data-filters]').forEach(function (bar) {
    var list = bar.parentNode.querySelector('[data-filter-list]');
    if (!list) return;
    var items = $$('[data-filter-item]', list);
    var empty = bar.parentNode.querySelector('[data-filter-empty]');
    var count = $('[data-filter-count]', bar);
    var selects = $$('[data-filter]', bar);
    var params = new URLSearchParams(location.search);
    selects.forEach(function (s) { var v = params.get(s.getAttribute('data-filter')); if (v) s.value = v; });
    function apply() {
      var shown = 0;
      items.forEach(function (it) {
        var ok = selects.every(function (s) {
          if (!s.value) return true;
          var vals = (it.getAttribute('data-' + s.getAttribute('data-filter')) || '').split('|');
          return vals.indexOf(s.value) !== -1 || vals.indexOf('Todos los niveles') !== -1 && s.getAttribute('data-filter') === 'levels' || vals.indexOf('Todas las edades') !== -1 && s.getAttribute('data-filter') === 'ages';
        });
        it.classList.toggle('is-hidden', !ok);
        if (ok) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
      if (count) count.textContent = shown === items.length ? 'Mostrando todos (' + shown + ')' : 'Mostrando ' + shown + ' de ' + items.length;
      var q = new URLSearchParams();
      selects.forEach(function (s) { if (s.value) q.set(s.getAttribute('data-filter'), s.value); });
      var qs = q.toString();
      history.replaceState(null, '', qs ? '?' + qs : location.pathname);
    }
    selects.forEach(function (s) { s.addEventListener('change', apply); });
    apply();
  });

  // --- Filtro de texto (glosario, bibliografía)
  var tf = $('[data-text-filter]');
  if (tf) {
    var prose = $('.prose--filterable');
    var blocks = [];
    var current = null;
    Array.prototype.slice.call(prose.children).forEach(function (el) {
      if (el.tagName === 'H2') { current = null; blocks.push({ heading2: el, nodes: [] }); return; }
      if (el.tagName === 'H3') { current = { head: el, nodes: [el] }; blocks.push(current); return; }
      if (current) current.nodes.push(el);
    });
    var entries = blocks.filter(function (b) { return b.head; });
    var tfc = $('[data-text-filter-count]');
    tf.addEventListener('input', function () {
      var q = normalize(tf.value.trim()), shown = 0;
      entries.forEach(function (b) {
        var text = normalize(b.nodes.map(function (n) { return n.textContent; }).join(' '));
        var ok = !q || text.indexOf(q) !== -1;
        b.nodes.forEach(function (n) { n.classList.toggle('is-hidden', !ok); });
        if (ok) shown++;
      });
      blocks.forEach(function (b, i) {
        if (!b.heading2) return;
        var any = false;
        for (var j = i + 1; j < blocks.length && !blocks[j].heading2; j++) if (!blocks[j].head.classList.contains('is-hidden')) any = true;
        b.heading2.classList.toggle('is-hidden', !!q && !any);
      });
      tfc.textContent = q ? shown + ' resultado' + (shown === 1 ? '' : 's') : '';
    });
  }

  // --- Buscador
  var form = $('[data-search-form]');
  if (form) {
    var input = $('#q', form), out = $('[data-search-results]'), status = $('[data-search-status]');
    var index = null;
    function escapeHtml(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function snippet(text, terms) {
      var n = normalize(text), pos = -1;
      terms.forEach(function (t) { var p = n.indexOf(t); if (p !== -1 && (pos === -1 || p < pos)) pos = p; });
      var start = Math.max(0, pos - 80), s = text.slice(start, start + 220);
      var html = escapeHtml((start ? '…' : '') + s + '…');
      terms.forEach(function (t) {
        if (t.length < 3) return;
        var re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
        // Resalta sobre el texto sin acentos manteniendo el original
        var plain = normalize(html), res = '', last = 0, m;
        while ((m = re.exec(plain))) { res += html.slice(last, m.index) + '<mark>' + html.slice(m.index, m.index + m[0].length) + '</mark>'; last = m.index + m[0].length; }
        html = res + html.slice(last);
      });
      return html;
    }
    function run(q) {
      var terms = normalize(q).split(/\s+/).filter(function (t) { return t.length > 1; });
      out.innerHTML = '';
      if (!terms.length) { status.textContent = 'Escribe al menos una palabra de dos letras.'; return; }
      var results = index.map(function (d) {
        var t = normalize(d.t), x = normalize(d.x), score = 0;
        for (var i = 0; i < terms.length; i++) {
          var inT = t.indexOf(terms[i]) !== -1, inX = x.indexOf(terms[i]) !== -1;
          if (!inT && !inX) return null;
          score += (inT ? 10 : 0) + (inX ? Math.min(5, x.split(terms[i]).length - 1) : 0);
        }
        return { d: d, score: score };
      }).filter(Boolean).sort(function (a, b) { return b.score - a.score; }).slice(0, 40);
      status.textContent = results.length ? results.length + (results.length === 40 ? '+' : '') + ' resultados para «' + q + '»' : 'No hay resultados para «' + q + '». Prueba con otra palabra o consulta el índice.';
      results.forEach(function (r) {
        var li = document.createElement('li');
        li.innerHTML = '<span class="search-results__s">' + escapeHtml(r.d.s) + '</span><a href="' + ROOT + r.d.u + '">' + escapeHtml(r.d.t) + '</a><p>' + snippet(r.d.x, terms) + '</p>';
        out.appendChild(li);
      });
    }
    function load(cb) {
      if (index) return cb();
      status.textContent = 'Cargando índice…';
      fetch(ROOT + 'search-index.json').then(function (r) { return r.json(); }).then(function (j) { index = j; cb(); })
        .catch(function () { status.textContent = 'No se pudo cargar el buscador.'; });
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = input.value.trim();
      history.replaceState(null, '', '?q=' + encodeURIComponent(q));
      load(function () { run(q); });
    });
    var initial = new URLSearchParams(location.search).get('q');
    if (initial) { input.value = initial; load(function () { run(initial); }); }
    else input.focus();
  }
})();
