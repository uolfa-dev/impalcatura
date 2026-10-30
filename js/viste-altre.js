/* Viste Attualità e Progressi. */
(function (IMP) {
  'use strict';

  const U = IMP.U, SRS = IMP.SRS, ui = IMP.ui, mappa = IMP.mappa;
  IMP.viste = IMP.viste || {};

  /* ---------------- ATTUALITÀ ---------------- */

  function opzioniMattoni(suggeriti) {
    const ids = suggeriti.map(function (a) { return a.mattone.id; });
    const resto = mappa.mattoni.filter(function (m) { return ids.indexOf(m.id) < 0; });
    return (ids.length ? '<optgroup label="Suggeriti">' + suggeriti.map(function (a) {
      return '<option value="' + a.mattone.id + '">' + U.esc(a.mattone.titolo) + '</option>';
    }).join('') + '</optgroup>' : '') +
      '<optgroup label="Tutti i mattoni">' + resto.map(function (m) {
        return '<option value="' + m.id + '">' + U.esc(U.anno(m.anno, m.circa) + ' · ' + m.titolo) + '</option>';
      }).join('') + '</optgroup>';
  }

  IMP.viste.attualita = function (el) {
    el.innerHTML = '<h1>Attualità</h1>' +
      '<p class="tenue">Le notizie degli ultimi giorni, da <a href="https://en.wikipedia.org/wiki/Portal:Current_events" target="_blank" rel="noopener">Wikipedia</a> (in inglese), agganciate ai mattoni che le spiegano. ' +
      'Le notizie senza aggancio restano in fondo: se ne trovi una importante, forse manca un mattone.</p>' +

      '<div class="scheda"><h2>Aggancia tu una notizia</h2>' +
      '<p class="tenue piccolo">Incolla il titolo di un articolo che hai letto, anche in italiano: ti suggerisco i mattoni a cui si aggancia. Poi scrivi con parole tue il perché: è l\'esercizio che fissa di più.</p>' +
      '<form data-form><label for="an-titolo">Titolo della notizia</label><textarea id="an-titolo" rows="2" required maxlength="300" placeholder="Es.: Dazi, l\'UE prepara la risposta agli Stati Uniti"></textarea>' +
      '<div data-suggerimenti class="piccolo tenue" style="margin-top:6px"></div>' +
      '<label for="an-mattone">Mattone</label><select id="an-mattone" required>' + opzioniMattoni([]) + '</select>' +
      '<label for="an-nota">Perché si aggancia? (con parole tue)</label><textarea id="an-nota" maxlength="1000"></textarea>' +
      '<label for="an-url">Link (facoltativo)</label><input id="an-url" type="url" placeholder="https://…">' +
      '<p><button class="btn" type="submit">Aggancia</button> <span data-esito class="piccolo"></span></p></form></div>' +

      '<div data-mie></div>' +
      '<div class="riga"><span data-stato class="tenue piccolo"></span><span class="spazio"></span><button class="btn secondario piccolo" data-aggiorna>Aggiorna le notizie</button></div>' +
      '<div data-notizie>' + ui.caricamento('Scarico le notizie da Wikipedia…') + '</div>';

    const form = el.querySelector('[data-form]');
    const titolo = el.querySelector('#an-titolo');
    const select = el.querySelector('#an-mattone');
    const sugg = el.querySelector('[data-suggerimenti]');

    function suggerisci() {
      const ab = IMP.Notizie.abbina(titolo.value, []);
      const sel = select.value;
      select.innerHTML = opzioniMattoni(ab);
      if (ab.length) {
        select.value = ab[0].mattone.id;
        sugg.innerHTML = '💡 Si aggancia a: ' + ab.slice(0, 3).map(function (a) { return '<strong>' + U.esc(a.mattone.titolo) + '</strong>'; }).join(', ') +
          '<br>' + U.esc(ab[0].perche);
      } else {
        if (sel) select.value = sel;
        sugg.textContent = titolo.value.trim() ? 'Nessun suggerimento automatico: scegli tu il mattone giusto.' : '';
      }
    }
    titolo.addEventListener('input', suggerisci);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      IMP.Notizie.aggiungiMia({
        titolo: titolo.value.trim(),
        mattone: select.value,
        nota: el.querySelector('#an-nota').value.trim(),
        url: el.querySelector('#an-url').value.trim()
      });
      form.reset();
      sugg.textContent = '';
      el.querySelector('[data-esito]').textContent = '✓ Agganciata: la trovi nella scheda del mattone.';
      disegnaMie();
    });

    function disegnaMie() {
      const mie = IMP.Notizie.mie();
      el.querySelector('[data-mie]').innerHTML = mie.length ? '<div class="scheda"><h2>Le tue notizie agganciate</h2>' + mie.slice(0, 20).map(function (n) {
        const m = mappa.byId[n.mattone];
        if (!m) return '';
        return '<div class="notizia" style="border-left-color:' + mappa.colore(m.corsia) + '"><div class="contesto">' + U.esc(U.dataLeggibile(n.data)) + '</div>' +
          '<div class="testo">' + U.esc(n.titolo) + '</div><div class="aggancio">Agganciata a ' + ui.linkMattone(m) + (n.nota ? '<br>' + U.esc(n.nota) : '') + '</div></div>';
      }).join('') + '</div>' : '';
    }
    disegnaMie();

    const contenitore = el.querySelector('[data-notizie]');
    const stato = el.querySelector('[data-stato]');

    function disegna(dati) {
      const ora = new Date(dati.ts);
      stato.textContent = 'Aggiornate alle ' + ora.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }) +
        (dati.vecchie ? ' (copia salvata: ora non riesco a collegarmi)' : '');
      let html = '';
      if (dati.itn && dati.itn.length) {
        html += '<div class="scheda"><h2>In primo piano</h2>' + dati.itn.map(function (v) {
          const ab = IMP.Notizie.abbinaVoce(v);
          return ui.notizia(v, ab) + (ab.length ? '' : '<p class="tenue piccolo" style="margin:-8px 0 0 18px">Nessun aggancio: forse manca un mattone.</p>');
        }).join('') + '</div>';
      }
      (dati.giorni || []).forEach(function (g) {
        const agganciate = [], altre = [];
        g.voci.forEach(function (v) {
          const ab = IMP.Notizie.abbinaVoce(v);
          (ab.length ? agganciate : altre).push({ v: v, ab: ab });
        });
        html += '<section class="gruppo-giorno"><h2>' + U.esc(U.dataLeggibile(g.data)) + '</h2>';
        if (agganciate.length) html += agganciate.map(function (x) { return ui.notizia(x.v, x.ab); }).join('');
        else html += '<p class="tenue">Nessuna notizia di questo giorno si aggancia ai mattoni.</p>';
        if (altre.length) {
          html += '<details><summary>' + altre.length + ' ' + U.plurale(altre.length, 'notizia', 'notizie') + ' senza aggancio</summary>' +
            altre.map(function (x) { return ui.notizia(x.v, []); }).join('') + '</details>';
        }
        html += '</section>';
      });
      contenitore.innerHTML = html || '<p class="tenue">Nessuna notizia disponibile.</p>';
    }

    function carica(forza) {
      contenitore.innerHTML = ui.caricamento('Scarico le notizie da Wikipedia…');
      IMP.Notizie.carica(forza).then(function (d) { if (contenitore.isConnected) disegna(d); }).catch(function (err) {
        if (!contenitore.isConnected) return;
        contenitore.innerHTML = '<p class="errore">Non riesco a scaricare le notizie (' + U.esc(err.message) + '). Controlla la connessione e riprova. Intanto puoi agganciare a mano le notizie che leggi.</p>';
      });
    }
    el.querySelector('[data-aggiorna]').addEventListener('click', function () { carica(true); });
    carica(false);
  };

  /* ---------------- PROGRESSI ---------------- */

  IMP.viste.progressi = function (el) {
    const s = IMP.Store.get();
    const tot = mappa.mattoni.length;
    const studiati = Object.keys(s.appresi).filter(function (id) { return mappa.byId[id]; }).length;
    const conta = { nuovo: 0, impara: 0, cresce: 0, solido: 0 };
    mappa.mattoni.forEach(function (m) { conta[SRS.stato(m.id)] += 1; });
    let risposte = 0, giuste = 0;
    for (let i = 0; i < 30; i++) {
      const g = s.giorni[U.piuGiorni(U.oggi(), -i)];
      if (g) { risposte += g.risposte; giuste += g.giuste; }
    }

    let h = '<h1>Progressi</h1><div class="statistiche">' +
      '<div class="scheda"><div class="cifra">' + studiati + '<span class="tenue" style="font-size:1rem">/' + tot + '</span></div><div class="tenue piccolo">mattoni studiati</div></div>' +
      '<div class="scheda"><div class="cifra">' + conta.solido + '</div><div class="tenue piccolo">consolidati (3+ settimane)</div></div>' +
      '<div class="scheda"><div class="cifra">' + SRS.dovute().length + '</div><div class="tenue piccolo">domande da ripassare oggi</div></div>' +
      '<div class="scheda"><div class="cifra">' + SRS.serie() + '</div><div class="tenue piccolo">giorni di fila</div></div>' +
      '<div class="scheda"><div class="cifra">' + (risposte ? Math.round(giuste / risposte * 100) + '%' : '–') + '</div><div class="tenue piccolo">risposte giuste (30 giorni)</div></div>' +
      '</div>';

    // Ultime 4 settimane
    const celle = [];
    for (let i = 27; i >= 0; i--) {
      const d = U.piuGiorni(U.oggi(), -i);
      const g = s.giorni[d];
      const n = g ? g.risposte + g.nuovi : 0;
      const liv = n === 0 ? '' : n <= 5 ? 'l1' : n <= 15 ? 'l2' : 'l3';
      celle.push('<span class="' + liv + '" title="' + U.esc(U.dataLeggibile(d)) + ': ' + n + ' attività"></span>');
    }
    h += '<div class="scheda"><h2>Le ultime quattro settimane</h2><div class="calendario">' + celle.join('') + '</div>' +
      '<p class="tenue piccolo">Ogni quadratino è un giorno. Pochi minuti ogni giorno valgono più di un\'ora una volta alla settimana.</p></div>';

    // Per area
    h += '<div class="scheda"><h2>Per area del mondo</h2>' + mappa.corsie.map(function (c) {
      const ms = mappa.mattoni.filter(function (m) { return m.corsia === c.id; });
      const k = { impara: 0, cresce: 0, solido: 0 };
      ms.forEach(function (m) { const st = SRS.stato(m.id); if (k[st] != null) k[st] += 1; });
      return '<p style="margin:12px 0 4px">' + ui.pillolaCorsia(c.id) + ' <span class="tenue piccolo">' + (k.impara + k.cresce + k.solido) + ' di ' + ms.length + '</span></p><div class="barra">' +
        ['solido', 'cresce', 'impara'].map(function (x) { return '<span class="s-' + x + '" style="width:' + (k[x] / ms.length * 100) + '%"></span>'; }).join('') + '</div>';
    }).join('') + '</div>';

    // Carico dei prossimi giorni
    const prev = SRS.previsione(7);
    h += '<div class="scheda"><h2>Prossimi ripassi</h2><p>' + prev.map(function (g) {
      return '<span class="pillola" style="margin:2px">' + U.esc(U.dataLeggibile(g.data).split(' ').slice(0, 2).join(' ')) + ': ' + g.n + '</span>';
    }).join(' ') + '</p></div>';

    // Impostazioni e dati
    h += '<div class="scheda"><h2>Impostazioni</h2>' +
      '<label for="imp-nuovi">Nuovi mattoni al giorno</label><select id="imp-nuovi" style="width:auto">' +
      [1, 2, 3, 4, 5, 7, 10].map(function (n) { return '<option' + (n === s.impostazioni.nuoviAlGiorno ? ' selected' : '') + '>' + n + '</option>'; }).join('') +
      '</select><p class="tenue piccolo">Con poca memoria conviene andare piano: 2 o 3 al giorno sono già 20 mattoni in una settimana e mezza, ripassati bene.</p>' +
      '<h3>I tuoi dati</h3><p class="tenue piccolo">I progressi sono salvati solo in questo browser. Esportali per non perderli o per spostarli su un altro dispositivo.</p>' +
      '<p class="riga"><button class="btn secondario piccolo" data-esporta>Esporta i progressi</button>' +
      '<label class="btn secondario piccolo" style="margin:0">Importa…<input type="file" accept="application/json,.json" data-importa hidden></label>' +
      '<button class="btn secondario piccolo" data-azzera style="color:var(--ko)">Azzera tutto</button></p><p data-msg class="piccolo"></p></div>';

    h += '<div class="scheda"><h2>Come funziona</h2>' +
      '<p><strong>Mattoni portanti.</strong> Pochi eventi e idee che spiegano molte altre cose. Ognuno ha una data da ricordare, un riassunto, il perché conta, un gancio per la memoria e i collegamenti con gli altri.</p>' +
      '<p><strong>Punti fissi.</strong> Sette date che dividono la storia (3200 a.C., 27 a.C., 476, 1492, 1789, 1945, 1989). Si imparano per primi: ogni mattone nuovo viene collocato rispetto a loro.</p>' +
      '<p><strong>Ripetizione spaziata.</strong> Ogni mattone ha due carte: «quando» e «perché». Dopo una risposta giusta la rivedi dopo 1, 3, 8, 20 giorni e così via; dopo un errore torna il giorno dopo. Si ripassa solo quello che sta per essere dimenticato.</p>' +
      '<p><strong>Richiamo attivo.</strong> Rispondere a una domanda fissa la memoria molto più che rileggere. Per questo il sito ti interroga invece di farti solo leggere.</p>' +
      '<p><strong>Attualità come ripasso.</strong> Quando una notizia si aggancia a un mattone, il mattone si rinforza. Le notizie che non si agganciano a nulla vengono messe da parte.</p></div>';

    el.innerHTML = h;

    const msg = el.querySelector('[data-msg]');
    el.querySelector('#imp-nuovi').addEventListener('change', function (e) {
      s.impostazioni.nuoviAlGiorno = parseInt(e.target.value, 10);
      IMP.Store.salva();
      msg.textContent = '✓ Salvato.';
    });
    el.querySelector('[data-esporta]').addEventListener('click', function () {
      const blob = new Blob([IMP.Store.esporta()], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'impalcatura-progressi-' + U.oggi() + '.json';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    });
    el.querySelector('[data-importa]').addEventListener('change', function (e) {
      const f = e.target.files[0];
      if (!f) return;
      f.text().then(function (t) {
        IMP.Store.importa(t);
        IMP.app.ridisegna();
      }).catch(function (err) {
        msg.textContent = 'Importazione non riuscita: ' + err.message;
      });
    });
    el.querySelector('[data-azzera]').addEventListener('click', function () {
      if (confirm('Vuoi davvero cancellare tutti i progressi? Non si può annullare.')) {
        IMP.Store.azzera();
        IMP.app.ridisegna();
      }
    });
  };
})(window.IMP);
