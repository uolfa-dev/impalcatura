/* Viste della mappa: Linea del tempo, elenco dei Mattoni, scheda del singolo Mattone. */
(function (IMP) {
  'use strict';

  const U = IMP.U, SRS = IMP.SRS, ui = IMP.ui, mappa = IMP.mappa;
  IMP.viste = IMP.viste || {};

  // Preferenze della linea del tempo, conservate finché la pagina resta aperta.
  const pref = { zoom: 1, corsieSpente: new Set(), soloStudiati: false, anno: null };

  /* ---------------- LINEA DEL TEMPO ---------------- */

  IMP.viste.linea = function (el, params) {
    document.getElementById('app').classList.add('largo');
    el.innerHTML = '<h1>Linea del tempo</h1>' +
      '<p class="tenue">Ogni corsia è un\'area del mondo. Tocca un mattone per vedere i suoi collegamenti. Le linee tratteggiate blu sono i 7 punti fissi; quelle punteggiate segnano dove cambia la scala: più ci si avvicina a oggi, più spazio ha ogni anno.</p>' +
      '<div class="linea-comandi">' +
      '<button class="btn secondario piccolo" data-zoom="-1" aria-label="Riduci">−</button>' +
      '<button class="btn secondario piccolo" data-zoom="1" aria-label="Ingrandisci">+</button>' +
      '<select class="piccolo" data-vai style="width:auto" aria-label="Vai a un\'epoca"><option value="">Vai a…</option>' +
      mappa.ere.map(function (e) { return '<option value="' + e.da + '">' + U.esc(e.nome) + '</option>'; }).join('') + '</select>' +
      '<input type="search" placeholder="Cerca un mattone…" data-cerca style="max-width:220px" list="elenco-titoli">' +
      '<datalist id="elenco-titoli">' + mappa.mattoni.map(function (m) { return '<option value="' + U.esc(m.titolo) + '">'; }).join('') + '</datalist>' +
      '<label class="piccolo" style="display:inline-flex;gap:6px;align-items:center;margin:0;font-weight:400"><input type="checkbox" data-studiati' + (pref.soloStudiati ? ' checked' : '') + '> evidenzia solo quelli studiati</label>' +
      '</div>' +
      '<div class="linea-comandi corsie-filtro">' + mappa.corsie.map(function (c) {
        return '<button class="corsia-toggle' + (pref.corsieSpente.has(c.id) ? ' spenta' : '') + '" data-corsia="' + c.id + '" style="background:' + mappa.colore(c.id) + '">' + U.esc(c.nome) + '</button>';
      }).join('') + '</div>' +
      '<div class="linea-scroll"></div>' +
      '<div class="legenda"><span><span class="puntino s-nuovo"></span> da imparare</span><span><span class="puntino s-impara"></span> in apprendimento</span>' +
      '<span><span class="puntino s-cresce"></span> si sta fissando</span><span><span class="puntino s-solido"></span> consolidato</span>' +
      '<span><i class="l-causa"></i> ha portato a</span><span><i class="l-influenza"></i> ha influenzato</span><span><i class="l-confronto"></i> da confrontare</span></div>' +
      '<div class="linea-pannello"></div>';

    const scroll = el.querySelector('.linea-scroll');
    const pannello = el.querySelector('.linea-pannello');
    let linea = null;
    let selezionato = params.id && mappa.byId[params.id] ? params.id : null;

    function mostraPannello(id) {
      if (!id) { pannello.innerHTML = ''; return; }
      const m = mappa.byId[id];
      const st = SRS.stato(id);
      const links = mappa.collegamenti(id);
      pannello.innerHTML = '<div class="scheda intestazione-mattone" style="--colore:' + mappa.colore(m.corsia) + '">' +
        '<div class="riga">' + ui.pillolaCorsia(m.corsia) + '<span class="pillola">' + ui.puntino(st) + ' ' + ui.NOMI_STATO[st] + '</span></div>' +
        '<h2 style="margin:.4em 0 .1em">' + U.esc(m.titolo) + '</h2><p class="periodo" style="margin-top:0">' + U.esc(U.periodo(m)) + '</p>' +
        '<p>' + U.esc(m.riassunto) + '</p>' +
        (links.length ? '<ul class="collegamenti">' + links.map(function (l) {
          const o = mappa.byId[l.altro];
          return '<li><span class="tipo-link">' + U.esc(mappa.tipiLink[l.tipo][l.verso]) + '</span><a href="#/linea/' + o.id + '" data-sel="' + o.id + '">' + U.esc(o.titolo) + '</a> <span class="tenue piccolo">(' + U.esc(U.periodo(o)) + ')</span></li>';
        }).join('') + '</ul>' : '') +
        '<p class="riga" style="margin-top:12px"><a class="btn" href="#/mattone/' + m.id + '">Apri la scheda</a>' +
        (st === 'nuovo' ? '<a class="btn secondario" href="#/impara/' + m.id + '">Imparalo ora</a>' : '') + '</p></div>';
      pannello.querySelectorAll('[data-sel]').forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          selezionato = a.dataset.sel;
          history.replaceState(null, '', '#/linea/' + selezionato);
          linea.seleziona(selezionato);
          linea.centra(selezionato);
        });
      });
    }

    function disegna(mantieniAnno) {
      const anno = mantieniAnno && linea ? linea.annoAlCentro() : null;
      linea = IMP.Linea.disegna(scroll, {
        zoom: pref.zoom,
        corsieSpente: pref.corsieSpente,
        soloStudiati: pref.soloStudiati,
        onSeleziona: function (id, daClic) {
          selezionato = id;
          if (daClic) history.replaceState(null, '', '#/linea/' + id);
          mostraPannello(id);
        }
      });
      if (anno != null) linea.scorriAdAnnoCentrato(anno);
      if (selezionato) linea.seleziona(selezionato);
    }

    disegna(false);
    if (selezionato) {
      linea.centra(selezionato);
    } else if (pref.anno != null) {
      linea.scorriAdAnnoCentrato(pref.anno);
    } else {
      linea.scorriAdAnno(-3300);
    }

    el.querySelectorAll('[data-zoom]').forEach(function (b) {
      b.addEventListener('click', function () {
        const d = parseInt(b.dataset.zoom, 10);
        pref.zoom = Math.min(3, Math.max(0.4, +(pref.zoom * (d > 0 ? 1.4 : 1 / 1.4)).toFixed(2)));
        disegna(true);
      });
    });
    el.querySelector('[data-vai]').addEventListener('change', function (e) {
      if (e.target.value !== '') linea.scorriAdAnno(parseInt(e.target.value, 10));
      e.target.value = '';
    });
    el.querySelector('[data-cerca]').addEventListener('change', function (e) {
      const q = e.target.value.trim().toLowerCase();
      if (!q) return;
      const m = mappa.mattoni.find(function (x) { return x.titolo.toLowerCase() === q; }) ||
        mappa.mattoni.find(function (x) { return x.titolo.toLowerCase().indexOf(q) >= 0; });
      if (!m) return;
      if (pref.corsieSpente.has(m.corsia)) { pref.corsieSpente.delete(m.corsia); IMP.app.ridisegna(); return; }
      linea.seleziona(m.id, true);
      linea.centra(m.id);
      e.target.value = '';
    });
    el.querySelector('[data-studiati]').addEventListener('change', function (e) {
      pref.soloStudiati = e.target.checked;
      disegna(true);
    });
    el.querySelectorAll('[data-corsia]').forEach(function (b) {
      b.addEventListener('click', function () {
        const id = b.dataset.corsia;
        if (pref.corsieSpente.has(id)) pref.corsieSpente.delete(id);
        else if (pref.corsieSpente.size < mappa.corsie.length - 1) pref.corsieSpente.add(id);
        b.classList.toggle('spenta', pref.corsieSpente.has(id));
        disegna(true);
      });
    });

    return function () {
      if (linea) pref.anno = linea.annoAlCentro();
      document.getElementById('app').classList.remove('largo');
    };
  };

  /* ---------------- ELENCO DEI MATTONI ---------------- */

  IMP.viste.mattoni = function (el) {
    el.innerHTML = '<h1>Mattoni</h1><p class="tenue">Tutti i ' + mappa.mattoni.length + ' mattoni, in ordine di tempo. Il pallino indica quanto li conosci.</p>' +
      '<div class="filtri"><input type="search" placeholder="Cerca…" data-cerca aria-label="Cerca un mattone">' +
      '<select data-corsia style="width:auto" aria-label="Filtra per area"><option value="">Tutte le aree</option>' +
      mappa.corsie.map(function (c) { return '<option value="' + c.id + '">' + U.esc(c.nome) + '</option>'; }).join('') + '</select>' +
      '<select data-stato style="width:auto" aria-label="Filtra per stato"><option value="">Qualsiasi stato</option>' +
      Object.keys(ui.NOMI_STATO).map(function (k) { return '<option value="' + k + '">' + ui.NOMI_STATO[k] + '</option>'; }).join('') + '</select></div>' +
      '<div data-elenco></div>';

    const elenco = el.querySelector('[data-elenco]');
    function aggiorna() {
      const q = el.querySelector('[data-cerca]').value.trim().toLowerCase();
      const corsia = el.querySelector('[data-corsia]').value;
      const stato = el.querySelector('[data-stato]').value;
      let html = '';
      mappa.ere.forEach(function (era) {
        const voci = mappa.mattoni.filter(function (m) {
          return mappa.era(m.anno) === era &&
            (!corsia || m.corsia === corsia) &&
            (!stato || SRS.stato(m.id) === stato) &&
            (!q || (m.titolo + ' ' + m.riassunto).toLowerCase().indexOf(q) >= 0);
        });
        if (!voci.length) return;
        html += '<h2 class="epoca-titolo">' + U.esc(era.nome) + '</h2><ul class="elenco-mattoni">' + voci.map(function (m) {
          return '<li><a href="#/mattone/' + m.id + '">' + ui.puntino(SRS.stato(m.id)) +
            '<span class="anno-el">' + U.esc(U.anno(m.anno, m.circa)) + '</span>' +
            '<span class="titolo-el">' + U.esc(m.titolo) + (m.fisso ? ' ⭐' : '') + '</span>' + ui.pillolaCorsia(m.corsia) + '</a></li>';
        }).join('') + '</ul>';
      });
      elenco.innerHTML = html || '<p class="tenue">Nessun mattone corrisponde alla ricerca.</p>';
    }
    el.querySelectorAll('[data-cerca],[data-corsia],[data-stato]').forEach(function (i) { i.addEventListener('input', aggiorna); });
    aggiorna();
  };

  /* ---------------- SCHEDA DEL MATTONE ---------------- */

  IMP.viste.mattone = function (el, params) {
    const m = mappa.byId[params.id];
    if (!m) {
      el.innerHTML = '<h1>Mattone non trovato</h1><p><a href="#/mattoni">Torna all\'elenco</a></p>';
      return;
    }
    const st = SRS.stato(m.id);
    const tipi = mappa.tipiLink;
    const links = mappa.collegamenti(m.id);
    const contemporanei = mappa.contemporanei(m.id, 5);
    const pos = mappa.frasePosizione(m.id);
    const carte = SRS.FACCE.map(function (f) { return SRS.carta(m.id, f); }).filter(Boolean);
    const prossimo = carte.length ? carte.map(function (c) { return c.scad; }).sort()[0] : null;

    let h = '<p class="piccolo"><a href="#/mattoni">← Tutti i mattoni</a></p>' +
      '<div class="scheda intestazione-mattone" style="--colore:' + mappa.colore(m.corsia) + '">' +
      '<div class="riga">' + ui.pillolaCorsia(m.corsia) + (m.fisso ? '<span class="pillola">⭐ Punto fisso</span>' : '') +
      '<span class="pillola">Livello ' + m.livello + '</span><span class="spazio"></span><span class="piccolo">' + ui.puntino(st) + ' ' + ui.NOMI_STATO[st] + '</span></div>' +
      '<h1>' + U.esc(m.titolo) + '</h1><div class="data-grande">' + U.esc(U.anno(m.anno, m.circa)) + '</div>' +
      '<div class="periodo">' + U.esc(mappa.sottotitolo(m)) + '</div>' +
      (pos ? '<p class="posizione">📍 ' + U.esc(pos) + '</p>' : '') + ui.miniLinea(m) +
      '<p class="riga" style="margin-top:14px">' +
      (st === 'nuovo' ? '<a class="btn" href="#/impara/' + m.id + '">Imparalo ora</a>' : '<span class="tenue piccolo">Prossimo ripasso: ' + U.esc(U.dataLeggibile(prossimo)) + '</span>') +
      '<a class="btn secondario" href="#/linea/' + m.id + '">Sulla linea del tempo</a></p></div>';

    h += '<div class="scheda"><h2>In breve</h2><p>' + U.esc(m.riassunto) + '</p><h2>Perché conta</h2><p>' + U.esc(m.perche) + '</p>' +
      (m.gancio ? '<p class="gancio">' + U.esc(m.gancio) + '</p>' : '') + '</div>';

    if (links.length) {
      h += '<div class="scheda"><h2>Collegamenti</h2><ul class="collegamenti">' + links.map(function (l) {
        const o = mappa.byId[l.altro];
        return '<li><span class="tipo-link">' + U.esc(tipi[l.tipo][l.verso]) + '</span>' + ui.puntino(SRS.stato(o.id)) + ' ' + ui.linkMattone(o) +
          ' <span class="tenue piccolo">(' + U.esc(U.periodo(o)) + ')</span><br><span class="piccolo">' + U.esc(l.perche) + '</span></li>';
      }).join('') + '</ul></div>';
    }

    if (contemporanei.length) {
      h += '<div class="scheda"><h2>Intanto, altrove nel mondo</h2><p class="tenue piccolo">Eventi dello stesso periodo in altre aree: sono ganci forti per la memoria.</p><ul class="collegamenti">' +
        contemporanei.map(function (o) {
          return '<li>' + ui.pillolaCorsia(o.corsia) + ' ' + ui.linkMattone(o) + ' <span class="tenue piccolo">(' + U.esc(U.periodo(o)) + ')</span></li>';
        }).join('') + '</ul></div>';
    }

    if (m.domande && m.domande.length) {
      h += '<div class="scheda"><h2>Mettiti alla prova</h2>' + m.domande.map(function (d) {
        return '<details><summary>' + U.esc(d.d) + '</summary><p>' + U.esc(d.r) + '</p></details>';
      }).join('') + '</div>';
    }

    h += '<div class="scheda" id="mattone-notizie"><h2>Dall\'attualità</h2>' + ui.caricamento('Cerco notizie recenti agganciate a questo mattone…') + '</div>';

    h += '<div class="scheda"><h2>Aggancia una notizia</h2><p class="tenue piccolo">Hai letto qualcosa che si collega a questo mattone? Scrivi il titolo e, con parole tue, perché si aggancia: spiegare il collegamento è uno dei modi migliori per ricordare.</p>' +
      '<form data-form-notizia><label for="mn-titolo">Titolo della notizia</label><input id="mn-titolo" type="text" required maxlength="300">' +
      '<label for="mn-url">Link (facoltativo)</label><input id="mn-url" type="url" placeholder="https://…">' +
      '<label for="mn-nota">Perché si aggancia a «' + U.esc(m.titolo) + '»?</label><textarea id="mn-nota" maxlength="1000"></textarea>' +
      '<p><button class="btn" type="submit">Aggancia</button></p></form></div>';

    const fonti = [m.wiki.it].concat(m.fonti || []);
    h += '<div class="scheda"><h2>Per approfondire</h2><ul>' + fonti.map(function (t) {
      return '<li><a href="' + U.esc(mappa.wikiUrl(t, 'it')) + '" target="_blank" rel="noopener">Wikipedia: ' + U.esc(t) + ' ↗</a></li>';
    }).join('') + (m.wiki.en ? '<li><a href="' + U.esc(mappa.wikiUrl(m.wiki.en, 'en')) + '" target="_blank" rel="noopener">Wikipedia (inglese): ' + U.esc(m.wiki.en) + ' ↗</a></li>' : '') +
      (m.wiki.q ? '<li><a href="https://www.wikidata.org/wiki/' + U.esc(m.wiki.q) + '" target="_blank" rel="noopener">Wikidata ' + U.esc(m.wiki.q) + ' ↗</a></li>' : '') +
      '</ul><p class="tenue piccolo">I testi di questo mattone sono una sintesi scritta per Impalcatura: se trovi un errore, segnalalo.</p></div>';

    el.innerHTML = h;

    el.querySelector('[data-form-notizia]').addEventListener('submit', function (e) {
      e.preventDefault();
      IMP.Notizie.aggiungiMia({
        titolo: el.querySelector('#mn-titolo').value.trim(),
        url: el.querySelector('#mn-url').value.trim(),
        nota: el.querySelector('#mn-nota').value.trim(),
        mattone: m.id
      });
      IMP.app.ridisegna();
    });

    const box = el.querySelector('#mattone-notizie');
    function disegnaNotizie(dati) {
      const mie = IMP.Notizie.mie(m.id);
      const trovate = [];
      if (dati) {
        (dati.itn || []).concat.apply(dati.itn || [], (dati.giorni || []).map(function (g) { return g.voci; })).forEach(function (v) {
          const ab = IMP.Notizie.abbinaVoce(v);
          const mio = ab.find(function (a) { return a.mattone.id === m.id; });
          if (mio) trovate.push({ voce: v, ab: [mio] });
        });
      }
      let html = '<h2>Dall\'attualità</h2>';
      if (mie.length) {
        html += '<h3>Le tue notizie</h3>' + mie.map(function (n) {
          return '<div class="notizia" style="border-left-color:' + mappa.colore(m.corsia) + '"><div class="contesto">' + U.esc(U.dataLeggibile(n.data)) + '</div><div class="testo">' +
            (n.url && /^https?:\/\//.test(n.url) ? '<a href="' + U.esc(n.url) + '" target="_blank" rel="noopener">' + U.esc(n.titolo) + ' ↗</a>' : U.esc(n.titolo)) + '</div>' +
            (n.nota ? '<div class="aggancio">' + U.esc(n.nota) + '</div>' : '') +
            '<p class="piccolo"><a href="#" data-rimuovi="' + U.esc(n.id) + '">Rimuovi</a></p></div>';
        }).join('');
      }
      if (trovate.length) {
        html += '<h3>Dalle notizie di questi giorni</h3>' + trovate.slice(0, 6).map(function (t) { return ui.notizia(t.voce, t.ab); }).join('');
      } else if (dati) {
        html += '<p class="tenue">Nelle notizie degli ultimi giorni non c\'è nulla che si agganci a questo mattone.</p>';
      }
      box.innerHTML = html;
      box.querySelectorAll('[data-rimuovi]').forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          IMP.Notizie.rimuoviMia(a.dataset.rimuovi);
          IMP.app.ridisegna();
        });
      });
    }
    IMP.Notizie.carica().then(function (d) { if (box.isConnected) disegnaNotizie(d); })
      .catch(function () { if (box.isConnected) { disegnaNotizie(null); box.insertAdjacentHTML('beforeend', '<p class="tenue piccolo">Notizie non disponibili: forse sei offline.</p>'); } });
  };
})(window.IMP);
