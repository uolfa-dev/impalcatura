/* Piccoli componenti condivisi dalle viste. */
(function (IMP) {
  'use strict';

  const U = IMP.U;

  const NOMI_STATO = {
    nuovo: 'Da imparare',
    impara: 'In apprendimento',
    cresce: 'Si sta fissando',
    solido: 'Consolidato'
  };

  const ui = {
    NOMI_STATO: NOMI_STATO,

    puntino: function (stato) {
      return '<span class="puntino s-' + stato + '" title="' + NOMI_STATO[stato] + '"></span>';
    },

    pillolaCorsia: function (corsiaId) {
      const c = IMP.mappa.corsiaById[corsiaId];
      return '<span class="pillola corsia" style="background:' + IMP.mappa.colore(corsiaId) + '">' + U.esc(c.nome) + '</span>';
    },

    linkMattone: function (m) {
      return '<a href="#/mattone/' + m.id + '">' + U.esc(m.titolo) + '</a>';
    },

    minuti: function (domande) {
      return Math.max(1, Math.round(domande * 20 / 60));
    },

    // Una notizia con i suoi agganci ai mattoni (al massimo due, i più pertinenti).
    notizia: function (v, abbinamenti, opzioni) {
      opzioni = opzioni || {};
      const contesto = v.contesto && v.contesto.length ? '<div class="contesto">' + U.esc(v.contesto.join(' › ')) + '</div>' : '';
      const fonti = (v.fonti || []).map(function (f) {
        return '<a href="' + U.esc(f.url) + '" target="_blank" rel="noopener">' + U.esc(f.nome) + ' ↗</a>';
      }).join('');
      const agganci = (abbinamenti || []).slice(0, opzioni.max || 2).map(function (a) {
        return '<div class="aggancio">' + ui.puntino(IMP.SRS.stato(a.mattone.id)) + ' Si aggancia a ' + ui.linkMattone(a.mattone) +
          ' <span class="tenue piccolo">(' + U.esc(U.periodo(a.mattone)) + ')</span><br>' + U.esc(a.perche) + '</div>';
      }).join('');
      const colore = abbinamenti && abbinamenti.length ? IMP.mappa.colore(abbinamenti[0].mattone.corsia) : 'var(--bordo)';
      return '<div class="notizia" style="border-left-color:' + colore + '">' + contesto +
        '<div class="testo" lang="en">' + U.esc(v.testo) + '</div>' +
        (fonti ? '<div class="fonti">' + fonti + '</div>' : '') + agganci + '</div>';
    },

    caricamento: function (testo) {
      return '<p class="tenue">⏳ ' + U.esc(testo || 'Caricamento…') + '</p>';
    },

    // La spina dorsale dei punti fissi, con il mattone inserito al suo posto (posizione ordinale, non in scala).
    miniLinea: function (m) {
      const punti = IMP.mappa.fissi.slice();
      if (punti.indexOf(m) < 0) punti.push(m);
      punti.sort(function (a, b) { return a.anno - b.anno; });
      const n = punti.length;
      const tacche = punti.map(function (p, i) {
        const left = 4 + i * (92 / (n - 1));
        const questo = p === m;
        const etichetta = questo ? '<b>' + U.esc(U.anno(p.anno, p.circa)) + '</b>' : U.esc(U.anno(p.anno, p.circa));
        return '<a class="tacca' + (questo ? ' questo' : '') + '" style="left:' + left + '%" href="#/mattone/' + p.id + '" title="' + U.esc(p.titolo) + '"><i' +
          (questo ? '' : ' class="s-' + IMP.SRS.stato(p.id) + '"') + '></i>' + etichetta + '</a>';
      }).join('');
      return '<div class="mini-linea" style="--colore:' + IMP.mappa.colore(m.corsia) + '"><div class="asse"></div>' + tacche + '</div>';
    }
  };

  IMP.ui = ui;
})(window.IMP);
