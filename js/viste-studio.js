/* Viste di studio: Oggi, Ripasso, Impara. */
(function (IMP) {
  'use strict';

  const U = IMP.U, SRS = IMP.SRS, ui = IMP.ui, mappa = IMP.mappa;
  const MAX_SESSIONE = 25;
  IMP.viste = IMP.viste || {};

  function saluto() {
    const h = new Date().getHours();
    return h < 13 ? 'Buongiorno' : h < 18 ? 'Buon pomeriggio' : 'Buonasera';
  }

  function prossimoRipasso() {
    const p = SRS.previsione(60).find(function (g) { return g.n > 0; });
    return p ? 'Prossimo ripasso: ' + U.dataLeggibile(p.data) + ' (' + p.n + ' ' + U.plurale(p.n, 'domanda', 'domande') + ').' : '';
  }

  /* ---------------- OGGI ---------------- */

  IMP.viste.oggi = function (el) {
    const s = IMP.Store.get();
    const dovute = SRS.dovute();
    const rimasti = SRS.nuoviOggiRimasti();
    const prossimi = SRS.prossimiNuovi(rimasti);
    const studiati = Object.keys(s.appresi).filter(function (id) { return mappa.byId[id]; }).length;
    const tot = mappa.mattoni.length;
    const conta = { nuovo: 0, impara: 0, cresce: 0, solido: 0 };
    mappa.mattoni.forEach(function (m) { conta[SRS.stato(m.id)] += 1; });
    const serie = SRS.serie();

    let html = '<h1 class="saluto">' + saluto() + '</h1><p class="tenue">' + U.esc(U.dataLeggibile(U.oggi())) + '</p>';

    // Su iPhone e iPad, finché il sito si apre da Safari, spiega come metterlo nella schermata Home.
    const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const standalone = window.navigator.standalone === true || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
    if (ios && !standalone && !s.impostazioni.consiglioIosVisto) {
      html += '<div class="scheda" data-consiglio-ios><h3>📱 Mettilo nella schermata Home</h3>' +
        '<p>In Safari tocca <strong>Condividi</strong> (il quadrato con la freccia in su), poi <strong>Aggiungi alla schermata Home</strong>. Impalcatura si aprirà a tutto schermo, come un\'app.</p>' +
        '<p class="tenue piccolo">È anche più sicuro per i progressi: Safari può cancellare i dati dei siti che non apri per 7 giorni, le app nella schermata Home no.</p>' +
        '<button class="btn secondario piccolo" data-azione="ios-ok">Fatto</button></div>';
    }

    if (studiati === 0) {
      html += '<div class="scheda"><h2>Benvenuto in Impalcatura</h2>' +
        '<p>Qui la cultura generale si costruisce come un edificio: prima pochi <strong>mattoni portanti</strong>, poi tutto il resto ci si appoggia sopra. Il metodo è pensato apposta per chi pensa di avere poca memoria:</p>' +
        '<ol><li><strong>Impari pochi mattoni al giorno</strong> (3, se non cambi le impostazioni), partendo da 7 punti fissi che dividono la storia.</li>' +
        '<li><strong>Ripassi 5–10 minuti al giorno.</strong> Il sito ti richiede ogni mattone poco prima che tu lo dimentichi: è la <em>ripetizione spaziata</em>. Ogni risposta giusta allunga l\'intervallo, ogni errore lo accorcia.</li>' +
        '<li><strong>Agganci l\'attualità:</strong> ogni notizia importante viene collegata al mattone che la spiega. Così le notizie diventano un ripasso gratuito.</li></ol>' +
        '<p>Non serve una buona memoria: serve tornare qui un po\' ogni giorno. I tuoi progressi restano in questo browser.</p>' +
        '<p><a class="btn grande" href="#/impara">Inizia: impara i primi mattoni →</a></p></div>';
    }

    html += '<div class="griglia">';

    // Ripasso
    if (dovute.length) {
      html += '<div class="scheda"><h3>🔁 Ripasso</h3><div class="cifra">' + dovute.length + '</div>' +
        '<p class="tenue">' + U.plurale(dovute.length, 'domanda', 'domande') + ' da ripassare, circa ' + ui.minuti(Math.min(dovute.length, MAX_SESSIONE)) + ' minuti.</p>' +
        '<a class="btn" href="#/ripasso">Inizia il ripasso</a></div>';
    } else if (studiati > 0) {
      html += '<div class="scheda"><h3>🔁 Ripasso</h3><p><strong>Niente da ripassare adesso ✓</strong></p><p class="tenue piccolo">' + U.esc(prossimoRipasso()) + '</p></div>';
    }

    // Nuovi mattoni
    if (studiati > 0 || dovute.length) {
      html += '<div class="scheda"><h3>🧱 Nuovi mattoni</h3>';
      if (prossimi.length) {
        html += '<p class="tenue">Da imparare oggi:</p><ul class="lista-nuovi">' + prossimi.map(function (id) {
          const m = mappa.byId[id];
          return '<li>' + U.esc(m.titolo) + ' <span class="tenue piccolo">(' + U.esc(U.periodo(m)) + ')</span></li>';
        }).join('') + '</ul><a class="btn" href="#/impara">Impara ' + (prossimi.length === 1 ? 'il mattone' : 'i ' + prossimi.length + ' mattoni') + '</a>';
      } else if (studiati >= tot) {
        html += '<p>Hai studiato tutti i ' + tot + ' mattoni. 🎉 Ora conta il ripasso: è lì che diventano solidi.</p>';
      } else {
        const oggiNuovi = (s.giorni[U.oggi()] || { nuovi: 0 }).nuovi;
        html += '<p>Per oggi basta così: hai già imparato ' + oggiNuovi + ' ' + U.plurale(oggiNuovi, 'mattone nuovo', 'mattoni nuovi') + '. Fermarsi aiuta la memoria; domani ne arrivano altri.</p>' +
          '<p class="piccolo"><a href="#/impara/extra">Voglio impararne un altro comunque</a></p>';
      }
      html += '</div>';
    }

    // Attualità
    html += '<div class="scheda" id="oggi-notizia"><h3>📰 Dall\'attualità</h3>' + ui.caricamento('Cerco la notizia del giorno su Wikipedia…') + '</div>';

    // Spina dorsale
    html += '<div class="scheda"><h3>🦴 La spina dorsale</h3><p class="tenue piccolo">Sette punti fissi a cui agganciare tutto il resto. Quando li sai a memoria, ogni evento nuovo ha già un posto.</p><div class="spina">' +
      mappa.fissi.map(function (f) {
        return '<a href="#/mattone/' + f.id + '" title="' + U.esc(f.titolo) + '"><span class="nodo s-' + SRS.stato(f.id) + '"></span><b>' + U.esc(U.anno(f.anno, f.circa)) + '</b>' + U.esc(f.breve || f.titolo) + '</a>';
      }).join('') + '</div></div>';

    // Progressi
    html += '<div class="scheda"><h3>📈 La tua mappa</h3><p><strong>' + studiati + '</strong> mattoni studiati su ' + tot + ', <strong>' + conta.solido + '</strong> consolidati.' +
      (serie > 1 ? ' Studi da <strong>' + serie + ' giorni</strong> di fila.' : '') + '</p>' +
      '<div class="barra" title="Consolidati, in crescita, in apprendimento, da imparare">' +
      ['solido', 'cresce', 'impara'].map(function (k) {
        return '<span class="s-' + k + '" style="width:' + (conta[k] / tot * 100) + '%"></span>';
      }).join('') + '</div><p class="piccolo" style="margin-top:10px"><a href="#/linea">Guarda la linea del tempo →</a></p></div>';

    html += '</div>';
    el.innerHTML = html;

    const consiglio = el.querySelector('[data-azione="ios-ok"]');
    if (consiglio) {
      consiglio.addEventListener('click', function () {
        s.impostazioni.consiglioIosVisto = true;
        IMP.Store.salva();
        el.querySelector('[data-consiglio-ios]').remove();
      });
    }

    const box = el.querySelector('#oggi-notizia');
    IMP.Notizie.carica().then(function (dati) {
      if (!box.isConnected) return;
      const scelta = IMP.Notizie.delGiorno(dati);
      if (!scelta) {
        box.innerHTML = '<h3>📰 Dall\'attualità</h3><p class="tenue">Oggi nessuna notizia si aggancia ai mattoni. <a href="#/attualita">Guarda tutte le notizie</a>.</p>';
        return;
      }
      box.innerHTML = '<h3>📰 Dall\'attualità</h3>' + ui.notizia(scelta.voce, scelta.abbinamenti, { max: 1 }) +
        '<p class="piccolo"><a href="#/attualita">Tutte le notizie agganciate →</a></p>';
    }).catch(function () {
      if (!box.isConnected) return;
      box.innerHTML = '<h3>📰 Dall\'attualità</h3><p class="tenue">Non riesco a scaricare le notizie: forse sei offline. Puoi comunque <a href="#/attualita">agganciare tu una notizia</a>.</p>';
    });
  };

  /* ---------------- RIPASSO ---------------- */

  function senzaVicini(coda) {
    // Evita che le due facce dello stesso mattone arrivino una dopo l'altra.
    for (let i = 1; i < coda.length; i++) {
      if (coda[i].id === coda[i - 1].id) {
        const j = coda.findIndex(function (x, k) { return k > i && x.id !== coda[i].id; });
        if (j > 0) { const t = coda[i]; coda[i] = coda[j]; coda[j] = t; }
      }
    }
    return coda;
  }

  IMP.viste.ripasso = function (el) {
    const tutte = SRS.dovute();
    if (!tutte.length) {
      el.innerHTML = '<div class="sessione"><div class="scheda centro"><h2>Niente da ripassare adesso ✓</h2><p class="tenue">' + U.esc(prossimoRipasso()) + '</p>' +
        '<p><a class="btn" href="#/oggi">Torna a oggi</a></p></div></div>';
      return;
    }
    const coda = senzaVicini(U.mescola(tutte.slice(0, MAX_SESSIONE)));
    const totali = coda.length;
    let i = 0, fatte = 0, giuste = 0, stacca = null;

    el.innerHTML = '<div class="sessione"><div class="avanzamento"><span class="conteggio"></span><div class="barra"><span></span></div><a href="#/oggi" class="piccolo">Basta per oggi</a></div><div class="area"></div></div>';
    const area = el.querySelector('.area');

    function prossima() {
      if (i >= coda.length) return fine();
      const voce = coda[i];
      el.querySelector('.conteggio').textContent = Math.min(fatte + 1, totali) + ' / ' + totali;
      el.querySelector('.avanzamento .barra span').style.width = (fatte / totali * 100) + '%';
      const q = IMP.Quiz.genera(voce.id, voce.faccia);
      stacca = IMP.Quiz.mostra(area, q, function (voto) {
        if (!voce.ripetuta) {
          SRS.voto(voce.id, voce.faccia, voto);
          fatte += 1;
          if (voto >= 2) giuste += 1;
          // Un errore si riprova poco dopo, nella stessa sessione: rivedere subito aiuta a fissare.
          if (voto === 0) coda.splice(Math.min(i + 4, coda.length), 0, { id: voce.id, faccia: voce.faccia, ripetuta: true });
        }
        i += 1;
        window.scrollTo(0, 0);
        prossima();
      });
      if (voce.ripetuta) area.querySelector('.riga').insertAdjacentHTML('beforeend', '<span class="pillola">Ci riproviamo</span>');
    }

    function fine() {
      const restano = SRS.dovute().length;
      el.querySelector('.avanzamento .barra span').style.width = '100%';
      const rimasti = SRS.nuoviOggiRimasti();
      area.innerHTML = '<div class="scheda centro"><h2>Ripasso finito! 🎉</h2>' +
        '<p><strong>' + giuste + '</strong> risposte giuste su ' + fatte + '.</p>' +
        '<p class="tenue">' + (giuste === fatte ? 'Perfetto: questi mattoni torneranno tra qualche giorno.' : 'Gli errori non sono un problema: quei mattoni torneranno presto, finché non si fissano.') + '</p>' +
        '<p class="riga" style="justify-content:center">' +
        (restano ? '<a class="btn" href="#/ripasso">Continua: ne restano ' + restano + '</a>' : '') +
        (rimasti && SRS.prossimiNuovi(1).length ? '<a class="btn' + (restano ? ' secondario' : '') + '" href="#/impara">Impara nuovi mattoni</a>' : '') +
        '<a class="btn secondario" href="#/oggi">Torna a oggi</a></p></div>';
    }

    prossima();
    return function () { if (stacca) stacca(); };
  };

  /* ---------------- IMPARA ---------------- */

  function schedaStudio(m, indice, totale) {
    const giaNoti = mappa.collegamenti(m.id).filter(function (l) { return SRS.appreso(l.altro); });
    const contemporanei = mappa.contemporanei(m.id, 3);
    let h = '<div class="scheda studio intestazione-mattone" style="--colore:' + mappa.colore(m.corsia) + '">' +
      '<div class="riga">' + ui.pillolaCorsia(m.corsia) + (m.fisso ? '<span class="pillola">⭐ Punto fisso</span>' : '') +
      (totale > 1 ? '<span class="spazio"></span><span class="tenue piccolo">Mattone ' + (indice + 1) + ' di ' + totale + '</span>' : '') + '</div>' +
      '<h1>' + U.esc(m.titolo) + '</h1><div class="data-grande">' + U.esc(U.anno(m.anno, m.circa)) + '</div>' +
      '<div class="periodo">' + U.esc(mappa.sottotitolo(m)) + '</div>';
    const pos = mappa.frasePosizione(m.id);
    if (pos) h += '<p class="posizione">📍 ' + U.esc(pos) + '</p>';
    h += ui.miniLinea(m);
    h += '<h3>In breve</h3><p>' + U.esc(m.riassunto) + '</p>' +
      '<h3>Perché conta</h3><p>' + U.esc(m.perche) + '</p>' +
      (m.gancio ? '<p class="gancio">' + U.esc(m.gancio) + '</p>' : '');
    if (giaNoti.length) {
      h += '<h3>Si collega a ciò che sai già</h3><ul class="collegamenti">' + giaNoti.map(function (l) {
        const o = mappa.byId[l.altro];
        return '<li><span class="tipo-link">' + U.esc(mappa.tipiLink[l.tipo][l.verso]) + '</span>' + U.esc(o.titolo) + ' <span class="tenue piccolo">(' + U.esc(U.periodo(o)) + ')</span><br><span class="piccolo">' + U.esc(l.perche) + '</span></li>';
      }).join('') + '</ul>';
    }
    if (contemporanei.length) {
      h += '<h3>Intanto, altrove nel mondo</h3><ul class="collegamenti">' + contemporanei.map(function (o) {
        return '<li>' + ui.pillolaCorsia(o.corsia) + ' ' + U.esc(o.titolo) + ' <span class="tenue piccolo">(' + U.esc(U.periodo(o)) + ')</span></li>';
      }).join('') + '</ul>';
    }
    h += '<p style="margin-top:20px"><button class="btn grande" data-azione="prova">Ho letto: mettimi alla prova →</button></p></div>';
    return h;
  }

  IMP.viste.impara = function (el, params) {
    let ids;
    if (params.id && mappa.byId[params.id]) ids = [params.id];
    else ids = SRS.prossimiNuovi(params.extra ? 1 : SRS.nuoviOggiRimasti());

    if (!ids.length) {
      const finiti = !SRS.prossimiNuovi(1).length;
      el.innerHTML = '<div class="sessione"><div class="scheda centro"><h2>' + (finiti ? 'Hai studiato tutti i mattoni 🎉' : 'Per oggi hai già imparato abbastanza') + '</h2>' +
        '<p class="tenue">' + (finiti ? 'Ora conta il ripasso.' : 'Fermarsi aiuta la memoria: domani ne arrivano altri.') + '</p>' +
        '<p class="riga" style="justify-content:center">' + (finiti ? '' : '<a class="btn secondario" href="#/impara/extra">Impara un altro mattone comunque</a>') + '<a class="btn" href="#/oggi">Torna a oggi</a></p></div></div>';
      return;
    }

    let i = 0, stacca = null;
    el.innerHTML = '<div class="sessione"></div>';
    const area = el.querySelector('.sessione');

    function studio() {
      const m = mappa.byId[ids[i]];
      area.innerHTML = schedaStudio(m, i, ids.length);
      window.scrollTo(0, 0);
      area.querySelector('[data-azione="prova"]').addEventListener('click', function () {
        SRS.impara(m.id);
        verifica(m, 0);
      });
    }

    // Due domande subito dopo la lettura: richiamare a memoria è ciò che fissa davvero.
    function verifica(m, n) {
      if (n >= 2) return avanti();
      const faccia = n === 0 ? 'quando' : 'perche';
      const preferenza = n === 0 ? (Object.keys(IMP.Store.get().appresi).length > 2 ? 'primaDopo' : 'secolo') : 'perche';
      const q = IMP.Quiz.genera(m.id, faccia, preferenza);
      area.innerHTML = '<div class="avanzamento"><span>Verifica ' + (n + 1) + ' di 2 · ' + U.esc(m.titolo) + '</span></div><div class="area"></div>';
      stacca = IMP.Quiz.mostra(area.querySelector('.area'), q, function () { verifica(m, n + 1); }, { studio: true });
    }

    function avanti() {
      i += 1;
      if (i < ids.length) return studio();
      const rimasti = SRS.nuoviOggiRimasti();
      area.innerHTML = '<div class="scheda centro"><h2>Mattoni posati 🧱</h2>' +
        '<p>Hai imparato: ' + ids.map(function (id) { return ui.linkMattone(mappa.byId[id]); }).join(', ') + '.</p>' +
        '<p class="tenue">Domani te li richiedo, poi sempre più di rado. Se torni ogni giorno, tra qualche settimana saranno tuoi.</p>' +
        '<p class="riga" style="justify-content:center">' + (rimasti && SRS.prossimiNuovi(1).length ? '<a class="btn secondario" href="#/impara">Continua con i prossimi</a>' : '') +
        '<a class="btn secondario" href="#/linea">Vedili sulla linea del tempo</a><a class="btn" href="#/oggi">Torna a oggi</a></p></div>';
    }

    studio();
    return function () { if (stacca) stacca(); };
  };
})(window.IMP);
