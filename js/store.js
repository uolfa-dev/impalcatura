/* Salvataggio dei progressi nel browser (localStorage). Nessun dato lascia il computer. */
(function (IMP) {
  'use strict';

  const CHIAVE = 'impalcatura.v1';
  // v2: con le notizie tradotte. La copia v1, solo in inglese, viene cancellata alla prima lettura.
  const CHIAVE_NOTIZIE = 'impalcatura.notizie.v2';
  const CHIAVE_NOTIZIE_VECCHIA = 'impalcatura.notizie.v1';

  function vuoto() {
    return {
      versione: 1,
      carte: {},          // "idMattone:faccia" -> stato della ripetizione spaziata
      appresi: {},        // idMattone -> data in cui è stato studiato la prima volta
      giorni: {},         // "AAAA-MM-GG" -> { nuovi, risposte, giuste }
      impostazioni: { nuoviAlGiorno: 3 },
      mieNotizie: []      // notizie agganciate a mano: { id, data, titolo, url, mattone, nota }
    };
  }

  let stato = null;

  const Store = {
    carica: function () {
      try {
        const raw = localStorage.getItem(CHIAVE);
        stato = raw ? Object.assign(vuoto(), JSON.parse(raw)) : vuoto();
        stato.impostazioni = Object.assign(vuoto().impostazioni, stato.impostazioni || {});
      } catch (e) {
        console.warn('Impossibile leggere i progressi, riparto da zero.', e);
        stato = vuoto();
      }
      return stato;
    },
    get: function () { return stato || Store.carica(); },
    salva: function () {
      try {
        localStorage.setItem(CHIAVE, JSON.stringify(stato));
      } catch (e) {
        console.warn('Impossibile salvare i progressi.', e);
      }
    },
    giorno: function (data) {
      const s = Store.get();
      if (!s.giorni[data]) s.giorni[data] = { nuovi: 0, risposte: 0, giuste: 0 };
      return s.giorni[data];
    },
    esporta: function () {
      return JSON.stringify(Store.get(), null, 2);
    },
    importa: function (testo) {
      const dati = JSON.parse(testo);
      if (!dati || typeof dati !== 'object' || !dati.carte) throw new Error('Il file non sembra un salvataggio di Impalcatura.');
      stato = Object.assign(vuoto(), dati);
      Store.salva();
    },
    azzera: function () {
      stato = vuoto();
      Store.salva();
    },

    // Cache delle notizie, separata dai progressi
    leggiNotizie: function () {
      try { localStorage.removeItem(CHIAVE_NOTIZIE_VECCHIA); } catch (e) { /* niente da pulire */ }
      try { return JSON.parse(localStorage.getItem(CHIAVE_NOTIZIE) || 'null'); } catch (e) { return null; }
    },
    scriviNotizie: function (dati) {
      try { localStorage.setItem(CHIAVE_NOTIZIE, JSON.stringify(dati)); } catch (e) { /* cache piena: pazienza */ }
    }
  };

  IMP.Store = Store;
})(window.IMP);
