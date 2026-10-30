/* Router: associa l'indirizzo dopo il # a una vista. Va caricato per ultimo. */
(function (IMP) {
  'use strict';

  const ROTTE = [
    { re: /^#\/oggi$/, vista: 'oggi', menu: 'oggi', titolo: 'Oggi' },
    { re: /^#\/ripasso$/, vista: 'ripasso', menu: 'oggi', titolo: 'Ripasso' },
    { re: /^#\/impara$/, vista: 'impara', menu: 'oggi', titolo: 'Impara' },
    { re: /^#\/impara\/extra$/, vista: 'impara', menu: 'oggi', titolo: 'Impara', p: function () { return { extra: true }; } },
    { re: /^#\/impara\/([\w-]+)$/, vista: 'impara', menu: 'oggi', titolo: 'Impara', p: function (m) { return { id: m[1] }; } },
    { re: /^#\/linea$/, vista: 'linea', menu: 'linea', titolo: 'Linea del tempo' },
    { re: /^#\/linea\/([\w-]+)$/, vista: 'linea', menu: 'linea', titolo: 'Linea del tempo', p: function (m) { return { id: m[1] }; } },
    { re: /^#\/mattoni$/, vista: 'mattoni', menu: 'mattoni', titolo: 'Mattoni' },
    { re: /^#\/mattone\/([\w-]+)$/, vista: 'mattone', menu: 'mattoni', titolo: 'Mattone', p: function (m) { return { id: m[1] }; } },
    { re: /^#\/attualita$/, vista: 'attualita', menu: 'attualita', titolo: 'Attualità' },
    { re: /^#\/progressi$/, vista: 'progressi', menu: 'progressi', titolo: 'Progressi' }
  ];

  let pulizia = null;

  function render() {
    const hash = location.hash || '#/oggi';
    let rotta = null, params = {};
    for (const r of ROTTE) {
      const m = hash.match(r.re);
      if (m) { rotta = r; params = r.p ? r.p(m) : {}; break; }
    }
    if (!rotta) { location.replace('#/oggi'); return; }

    if (pulizia) {
      try { pulizia(); } catch (e) { console.warn(e); }
      pulizia = null;
    }
    const el = document.getElementById('app');
    el.classList.remove('largo');
    document.querySelectorAll('.menu a').forEach(function (a) {
      a.classList.toggle('attivo', a.dataset.rotta === rotta.menu);
    });
    const m = params.id && IMP.mappa.byId[params.id];
    document.title = (m ? m.titolo : rotta.titolo) + ' · Impalcatura';
    window.scrollTo(0, 0);
    try {
      pulizia = IMP.viste[rotta.vista](el, params) || null;
    } catch (e) {
      console.error(e);
      el.innerHTML = '<p class="errore">Qualcosa è andato storto: ' + IMP.U.esc(e.message) + '</p>';
    }
  }

  window.addEventListener('hashchange', render);

  // Un link alla pagina in cui sei già (per esempio «Continua» a fine ripasso) ridisegna la vista.
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href^="#/"]');
    if (a && !a.target && a.getAttribute('href') === (location.hash || '#/oggi')) {
      e.preventDefault();
      render();
    }
  });

  IMP.app = { ridisegna: render };
  IMP.Store.carica();
  render();
})(window.IMP);
