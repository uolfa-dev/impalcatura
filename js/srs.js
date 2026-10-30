/*
 * Ripetizione spaziata.
 * Ogni mattone ha due «carte»: QUANDO (collocarlo nel tempo) e PERCHÉ (capire perché conta e cosa collega).
 * Una risposta giusta allunga l'intervallo prima del prossimo ripasso (1, 3, 8, 20 giorni...);
 * una sbagliata lo riporta a domani. Così si ripassa solo quello che sta per essere dimenticato.
 */
(function (IMP) {
  'use strict';

  const U = IMP.U;
  const FACCE = ['quando', 'perche'];
  const INTERVALLO_MAX = 365;

  function chiave(id, faccia) { return id + ':' + faccia; }

  const SRS = {
    FACCE: FACCE,
    chiave: chiave,

    carta: function (id, faccia) {
      return IMP.Store.get().carte[chiave(id, faccia)] || null;
    },

    appreso: function (id) {
      return !!IMP.Store.get().appresi[id];
    },

    // Prima volta che si studia un mattone: le sue carte entrano nel ripasso da domani.
    impara: function (id) {
      const s = IMP.Store.get();
      if (s.appresi[id]) return;
      const oggi = U.oggi();
      s.appresi[id] = oggi;
      FACCE.forEach(function (f) {
        s.carte[chiave(id, f)] = { scad: U.piuGiorni(oggi, 1), int: 0, fac: 2.5, rip: 0, err: 0, ult: oggi };
      });
      IMP.Store.giorno(oggi).nuovi += 1;
      IMP.Store.salva();
    },

    /*
     * Voto da 0 a 3: 0 = non lo sapevo, 1 = a fatica, 2 = lo sapevo, 3 = facilissimo.
     * Restituisce il nuovo intervallo in giorni.
     */
    voto: function (id, faccia, v) {
      const s = IMP.Store.get();
      const oggi = U.oggi();
      const k = chiave(id, faccia);
      const c = s.carte[k] || { scad: oggi, int: 0, fac: 2.5, rip: 0, err: 0, ult: oggi };

      if (v === 0) {
        c.rip = 0;
        c.err += 1;
        c.fac = Math.max(1.3, c.fac - 0.2);
        c.int = 1;
      } else if (v === 1) {
        c.fac = Math.max(1.3, c.fac - 0.15);
        c.int = c.rip === 0 ? 1 : Math.max(c.int + 1, Math.round(c.int * 1.2));
        c.rip += 1;
      } else if (v === 2) {
        c.int = c.rip === 0 ? 1 : c.rip === 1 ? 3 : Math.round(c.int * c.fac);
        c.rip += 1;
      } else {
        c.fac += 0.15;
        c.int = c.rip === 0 ? 3 : c.rip === 1 ? 6 : Math.round(c.int * c.fac * 1.3);
        c.rip += 1;
      }
      // Un po' di variazione casuale, così i ripassi non si ammucchiano tutti nello stesso giorno.
      if (c.int > 4) c.int = Math.round(c.int * (0.92 + Math.random() * 0.16));
      c.int = Math.min(INTERVALLO_MAX, Math.max(1, c.int));
      c.scad = U.piuGiorni(oggi, c.int);
      c.ult = oggi;
      s.carte[k] = c;

      const g = IMP.Store.giorno(oggi);
      g.risposte += 1;
      if (v >= 2) g.giuste += 1;
      IMP.Store.salva();
      return c.int;
    },

    // Carte da ripassare entro la data indicata, le più in ritardo per prime.
    dovute: function (data) {
      const carte = IMP.Store.get().carte;
      data = data || U.oggi();
      return Object.keys(carte)
        .filter(function (k) { return carte[k].scad <= data && IMP.mappa.byId[k.split(':')[0]]; })
        .sort(function (a, b) { return carte[a].scad < carte[b].scad ? -1 : carte[a].scad > carte[b].scad ? 1 : 0; })
        .map(function (k) {
          const p = k.split(':');
          return { id: p[0], faccia: p[1] };
        });
    },

    // nuovo, impara (meno di una settimana), cresce (1-3 settimane), solido (oltre 3 settimane)
    stato: function (id) {
      const a = SRS.carta(id, 'quando'), b = SRS.carta(id, 'perche');
      if (!a && !b) return 'nuovo';
      const int = Math.min(a ? a.int : 0, b ? b.int : 0);
      if (int >= 21) return 'solido';
      if (int >= 7) return 'cresce';
      return 'impara';
    },

    nuoviOggiRimasti: function () {
      const s = IMP.Store.get();
      const fatti = (s.giorni[U.oggi()] || { nuovi: 0 }).nuovi;
      return Math.max(0, s.impostazioni.nuoviAlGiorno - fatti);
    },

    // I prossimi mattoni da imparare, secondo il percorso.
    prossimiNuovi: function (n) {
      return IMP.mappa.percorso.filter(function (id) { return !SRS.appreso(id); }).slice(0, n);
    },

    // Giorni consecutivi di studio, contando oggi oppure fino a ieri se oggi non si è ancora studiato.
    serie: function () {
      const giorni = IMP.Store.get().giorni;
      let d = U.oggi();
      if (!(giorni[d] && (giorni[d].risposte || giorni[d].nuovi))) d = U.piuGiorni(d, -1);
      let n = 0;
      while (giorni[d] && (giorni[d].risposte || giorni[d].nuovi)) {
        n += 1;
        d = U.piuGiorni(d, -1);
      }
      return n;
    },

    // Ripassi previsti nei prossimi giorni (per mostrare il carico futuro).
    previsione: function (giorni) {
      const carte = IMP.Store.get().carte;
      const oggi = U.oggi();
      const out = [];
      for (let i = 1; i <= giorni; i++) {
        const d = U.piuGiorni(oggi, i);
        out.push({ data: d, n: Object.keys(carte).filter(function (k) { return carte[k].scad === d; }).length });
      }
      return out;
    }
  };

  IMP.SRS = SRS;
})(window.IMP);
