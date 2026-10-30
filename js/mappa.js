/* Costruisce la «mappa»: indici, collegamenti in entrambe le direzioni, punti fissi, contemporaneità. */
(function (IMP) {
  'use strict';

  const U = IMP.U;
  const D = window.IMP_DATI;

  const byId = {};
  D.mattoni.forEach(function (m) {
    if (m.fine == null) m.fine = m.inizio != null ? m.inizio : m.anno;
    if (m.inizio == null) m.inizio = m.anno;
    if (m.chiediAnno == null) m.chiediAnno = !m.circa;
    byId[m.id] = m;
  });

  const mattoni = D.mattoni.slice().sort(function (a, b) { return a.anno - b.anno; });

  const corsiaById = {};
  D.corsie.forEach(function (c) { corsiaById[c.id] = c; });

  // Collegamenti: ogni link è scritto una volta, qui lo rendiamo visibile da entrambe le parti.
  const uscenti = {}, entranti = {};
  mattoni.forEach(function (m) { uscenti[m.id] = []; entranti[m.id] = []; });
  mattoni.forEach(function (m) {
    (m.link || []).forEach(function (l) {
      if (!byId[l.a]) { console.warn('Collegamento verso un mattone che non esiste:', m.id, '->', l.a); return; }
      uscenti[m.id].push({ altro: l.a, tipo: l.tipo, verso: 'avanti', perche: l.perche });
      entranti[l.a].push({ altro: m.id, tipo: l.tipo, verso: 'indietro', perche: l.perche });
    });
  });

  const fissi = mattoni.filter(function (m) { return m.fisso; });

  const percorso = (D.percorso || []).filter(function (id) { return byId[id]; });
  mattoni.forEach(function (m) { if (percorso.indexOf(m.id) < 0) percorso.push(m.id); });

  const mappa = {
    mattoni: mattoni,
    byId: byId,
    corsie: D.corsie,
    corsiaById: corsiaById,
    ere: D.ere,
    tipiLink: D.tipiLink,
    fissi: fissi,
    percorso: percorso,

    colore: function (corsia) { return 'var(--c-' + corsia + ')'; },

    collegamenti: function (id) {
      return uscenti[id].concat(entranti[id]);
    },

    collegati: function (id, tipo, verso) {
      return mappa.collegamenti(id).filter(function (l) {
        return (!tipo || l.tipo === tipo) && (!verso || l.verso === verso);
      });
    },

    // Altri mattoni dello stesso periodo, in altre aree del mondo: sono ganci forti per la memoria.
    contemporanei: function (id, max) {
      const m = byId[id];
      const tol = Math.max(5, Math.round((new Date().getFullYear() - m.inizio) / 40));
      return mattoni
        .filter(function (o) {
          return o.id !== id && o.corsia !== m.corsia && o.inizio <= m.fine + tol && o.fine >= m.inizio - tol;
        })
        .sort(function (a, b) { return Math.abs(a.anno - m.anno) - Math.abs(b.anno - m.anno); })
        .slice(0, max || 4);
    },

    // Il punto fisso precedente e quello successivo: servono a collocare un mattone nel tempo.
    vicini: function (id) {
      const m = byId[id];
      let prima = null, dopo = null;
      fissi.forEach(function (f) {
        if (f.id === id) return;
        if (f.anno <= m.anno) prima = f;
        else if (!dopo) dopo = f;
      });
      return { prima: prima, dopo: dopo };
    },

    frasePosizione: function (id) {
      const m = byId[id];
      const v = mappa.vicini(id);
      // Con date approssimative una cifra precisa («3173 anni») sarebbe falsa precisione.
      function arrotonda(d, circa) {
        if (!circa) return d;
        return d >= 1000 ? Math.round(d / 100) * 100 : d >= 100 ? Math.round(d / 10) * 10 : d;
      }
      const parti = [];
      let approssimato = !!m.circa;
      if (v.prima) {
        const c = m.circa || v.prima.circa;
        approssimato = approssimato || c;
        const d = arrotonda(U.distanza(v.prima.anno, m.anno), c);
        parti.push(d === 0 ? 'nello stesso anno di «' + v.prima.titolo + '»' : d + ' ' + U.plurale(d, 'anno', 'anni') + ' dopo «' + v.prima.titolo + '» (' + U.anno(v.prima.anno, v.prima.circa) + ')');
      }
      if (v.dopo) {
        const c = m.circa || v.dopo.circa;
        approssimato = approssimato || c;
        const d = arrotonda(U.distanza(m.anno, v.dopo.anno), c);
        parti.push(d + ' ' + U.plurale(d, 'anno', 'anni') + ' prima di «' + v.dopo.titolo + '» (' + U.anno(v.dopo.anno, v.dopo.circa) + ')');
      }
      if (!parti.length) return '';
      const frase = parti.join(' e ') + '.';
      return approssimato ? 'Circa ' + frase : frase.charAt(0).toUpperCase() + frase.slice(1);
    },

    // Riga sotto la data grande: il periodo (se diverso dalla data) e l'epoca.
    sottotitolo: function (m) {
      const p = U.periodo(m);
      const era = mappa.era(m.anno).nome;
      return p === U.anno(m.anno, m.circa) ? era : p + ' · ' + era;
    },

    era: function (anno) {
      return D.ere.find(function (e) { return anno >= e.da && anno < e.a; }) || D.ere[D.ere.length - 1];
    },

    wikiUrl: function (titolo, lingua) {
      return 'https://' + (lingua || 'it') + '.wikipedia.org/wiki/' + encodeURIComponent(titolo.replace(/ /g, '_'));
    },

    gruppo: function (nome) {
      return (D.gruppi && D.gruppi[nome]) || [];
    }
  };

  IMP.mappa = mappa;
})(window.IMP);
