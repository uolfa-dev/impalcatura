/*
 * Domande generate automaticamente dai dati dei mattoni.
 * Faccia QUANDO: secolo, anno, «cosa viene prima», «metti in ordine».
 * Faccia PERCHÉ: perché conta (autovalutazione), collegamenti, domande scritte a mano.
 */
(function (IMP) {
  'use strict';

  const U = IMP.U;
  const ANNO_CORRENTE = new Date().getFullYear();

  function M(id) { return IMP.mappa.byId[id]; }

  function scarto(a, b) {
    return Math.max(15, Math.round((ANNO_CORRENTE - Math.min(a, b)) / 20));
  }

  // Altri mattoni ben distanziati nel tempo, preferendo quelli già studiati (così si collegano tra loro).
  function altriPerConfronto(m, n) {
    const tutti = IMP.mappa.mattoni.filter(function (o) { return o.id !== m.id; });
    const studiati = tutti.filter(function (o) { return IMP.SRS.appreso(o.id); });
    const scelti = [];
    [studiati, tutti].forEach(function (pool) {
      U.mescola(pool).forEach(function (o) {
        if (scelti.length >= n || scelti.indexOf(o) >= 0) return;
        const gruppo = scelti.concat([m]);
        const ok = gruppo.every(function (g) { return Math.abs(g.anno - o.anno) >= scarto(g.anno, o.anno); });
        if (ok) scelti.push(o);
      });
    });
    return scelti;
  }

  function dataBreve(m) {
    return U.anno(m.anno, m.circa);
  }

  function spiegazioneBase(m) {
    return '<p><strong>' + U.esc(m.titolo) + '</strong> · ' + U.esc(U.periodo(m)) + '</p>' +
      (m.gancio ? '<p class="piccolo">💡 ' + U.esc(m.gancio) + '</p>' : '');
  }

  /* ---------- Generatori ---------- */

  const gen = {};

  gen.secolo = function (m) {
    const amp = m.anno < -1000 ? 1000 : 100;
    const u = U.unita(m.anno, amp);
    const max = U.unita(ANNO_CORRENTE, amp);
    const vicine = U.mescola([-1, 1, -2, 2, 3, -3]).map(function (p) { return U.unitaVicina(u, p); })
      .filter(function (v) { return v <= max; });
    const scelte = [u];
    vicine.forEach(function (v) { if (scelte.length < 4 && scelte.indexOf(v) < 0) scelte.push(v); });
    scelte.sort(function (a, b) { return a - b; });
    const nome = amp === 1000 ? 'millennio' : 'secolo';
    const trucco = amp === 1000
      ? 'Il millennio si conta aggiungendo 1 alle migliaia.'
      : 'Trucco: il secolo è il numero delle centinaia più uno (1789 → 17 + 1 = XVIII secolo), tranne per gli anni che finiscono con 00.';
    return {
      tipo: 'scelta',
      testo: 'In che ' + nome + ' ' + m.evento + '?',
      opzioni: scelte.map(function (v) { return { etichetta: U.nomeUnita(v, amp), giusta: v === u }; }),
      spiegazione: spiegazioneBase(m) + '<p class="piccolo">Il ' + U.esc(U.nomeUnita(u, amp)) + ' va ' + U.esc(U.limitiUnita(u, amp)) + '. ' + U.esc(trucco) + '</p>'
    };
  };

  gen.anno = function (m) {
    const y = m.anno;
    const passo = y >= 1800 ? [2, 25] : y >= 1400 ? [4, 45] : y >= 0 ? [12, 120] : [30, 300];
    const scelte = [y];
    let tentativi = 0;
    while (scelte.length < 4 && tentativi++ < 200) {
      const d = passo[0] + Math.floor(Math.random() * (passo[1] - passo[0] + 1));
      let v = y + (Math.random() < 0.5 ? -d : d);
      if (y > 0 && v <= 0) continue;
      if (v === 0 || v > ANNO_CORRENTE) continue;
      if (scelte.every(function (s) { return Math.abs(s - v) >= Math.max(2, passo[0]); })) scelte.push(v);
    }
    scelte.sort(function (a, b) { return a - b; });
    return {
      tipo: 'scelta',
      testo: 'In che anno ' + m.evento + '?',
      opzioni: scelte.map(function (v) { return { etichetta: U.anno(v), giusta: v === y }; }),
      spiegazione: spiegazioneBase(m)
    };
  };

  gen.primaDopo = function (m) {
    const altro = altriPerConfronto(m, 1)[0];
    if (!altro) return gen.secolo(m);
    const coppia = U.mescola([m, altro]);
    const primo = m.anno < altro.anno ? m : altro;
    const d = Math.abs(U.distanza(Math.min(m.anno, altro.anno), Math.max(m.anno, altro.anno)));
    return {
      tipo: 'scelta',
      testo: 'Che cosa viene prima?',
      opzioni: coppia.map(function (o) { return { etichetta: o.titolo, giusta: o === primo }; }),
      spiegazione: '<p>' + coppia.map(function (o) { return '<strong>' + U.esc(o.titolo) + '</strong>: ' + U.esc(dataBreve(o)); }).join('<br>') +
        '</p><p class="piccolo">Li separano circa ' + d + ' anni.</p>' + (m.gancio ? '<p class="piccolo">💡 ' + U.esc(m.gancio) + '</p>' : '')
    };
  };

  gen.ordina = function (m) {
    const altri = altriPerConfronto(m, 3);
    if (altri.length < 3) return gen.primaDopo(m);
    const elementi = U.mescola([m].concat(altri));
    const giusto = elementi.slice().sort(function (a, b) { return a.anno - b.anno; });
    return {
      tipo: 'ordina',
      testo: 'Metti in ordine cronologico, dal più antico al più recente.',
      elementi: elementi.map(function (o) { return { id: o.id, etichetta: o.titolo }; }),
      ordine: giusto.map(function (o) { return o.id; }),
      spiegazione: '<ol>' + giusto.map(function (o) {
        return '<li><strong>' + U.esc(dataBreve(o)) + '</strong> · ' + U.esc(o.titolo) + '</li>';
      }).join('') + '</ol>'
    };
  };

  gen.perche = function (m) {
    return {
      tipo: 'rivela',
      testo: 'Perché conta «' + m.titolo + '» (' + U.periodo(m) + ')?',
      aiuto: 'Prova a dirlo con parole tue, a voce o a mente, poi controlla.',
      risposta: '<p>' + U.esc(m.perche) + '</p>' + (m.gancio ? '<p class="piccolo">💡 ' + U.esc(m.gancio) + '</p>' : '')
    };
  };

  gen.collegamento = function (m) {
    const links = IMP.mappa.collegamenti(m.id).filter(function (l) { return l.tipo !== 'confronto'; });
    if (!links.length) return null;
    const l = U.uno(links);
    const giusto = M(l.altro);
    const legati = IMP.mappa.collegamenti(m.id).map(function (x) { return x.altro; });
    const pool = IMP.mappa.mattoni.filter(function (o) {
      return o.id !== m.id && o.id !== giusto.id && legati.indexOf(o.id) < 0 &&
        (l.verso === 'avanti' ? o.anno > m.anno : o.anno < m.anno);
    });
    const distrattori = U.mescola(pool).slice(0, 3);
    if (distrattori.length < 2) return null;
    let testo;
    if (l.verso === 'avanti') {
      testo = l.tipo === 'causa' ? '«' + m.titolo + '» ha contribuito a quale di questi?' : '«' + m.titolo + '» ha influenzato quale di questi?';
    } else {
      testo = l.tipo === 'causa' ? 'Quale di questi ha contribuito a «' + m.titolo + '»?' : 'Quale di questi ha influenzato «' + m.titolo + '»?';
    }
    return {
      tipo: 'scelta',
      testo: testo,
      opzioni: U.mescola([giusto].concat(distrattori)).map(function (o) {
        return { etichetta: o.titolo, giusta: o === giusto };
      }),
      spiegazione: '<p><strong>' + U.esc(l.verso === 'avanti' ? m.titolo + ' → ' + giusto.titolo : giusto.titolo + ' → ' + m.titolo) + '</strong></p><p>' + U.esc(l.perche) + '</p>'
    };
  };

  gen.domanda = function (m) {
    if (!m.domande || !m.domande.length) return null;
    const d = U.uno(m.domande);
    return {
      tipo: 'rivela',
      testo: d.d,
      aiuto: 'Prova a rispondere, poi controlla.',
      risposta: '<p>' + U.esc(d.r) + '</p>'
    };
  };

  const Quiz = {
    genera: function (id, faccia, preferenza) {
      const m = M(id);
      let q = null;
      if (preferenza && gen[preferenza]) q = gen[preferenza](m);
      if (!q && faccia === 'quando') {
        const tipo = U.pesato([['ordina', 3], ['primaDopo', 2.5], ['secolo', 2.5], ['anno', m.chiediAnno ? 2 : 0]]);
        q = gen[tipo](m);
      }
      if (!q) {
        const tipo = U.pesato([['perche', 4], ['collegamento', 3.5], ['domanda', m.domande ? 2.5 : 0]]);
        q = gen[tipo](m) || gen.perche(m);
      }
      q.id = id;
      q.faccia = faccia;
      return q;
    },

    /*
     * Disegna la domanda in «el». Quando l'utente ha risposto e va avanti, chiama fatto(voto)
     * con voto da 0 a 3 (vedi SRS.voto). Con opzioni.studio (prima lettura) non si parla di scadenze.
     */
    mostra: function (el, q, fatto, opzioni) {
      opzioni = opzioni || {};
      const m = M(q.id);
      el.innerHTML = '';
      const box = U.html('<div class="scheda"></div>');
      box.style.setProperty('--colore', IMP.mappa.colore(m.corsia));
      box.appendChild(U.html('<div class="riga"><span class="pillola">' + (q.faccia === 'quando' ? '📅 Quando' : '🔗 Perché') + '</span>' +
        '<span class="pillola corsia" style="background:' + IMP.mappa.colore(m.corsia) + '">' + U.esc(IMP.mappa.corsiaById[m.corsia].nome) + '</span></div>'));
      box.appendChild(U.html('<p class="domanda">' + U.esc(q.testo) + '</p>'));
      el.appendChild(box);

      let tasti = null;
      function staccaTasti() { if (tasti) document.removeEventListener('keydown', tasti); tasti = null; }
      function attaccaTasti(fn) { staccaTasti(); tasti = fn; document.addEventListener('keydown', tasti); }

      function bottoneAvanti(voto) {
        const b = U.html('<div class="riga" style="margin-top:14px"><a class="btn secondario piccolo" target="_blank" href="#/mattone/' + m.id + '">Apri la scheda ↗</a><span class="spazio"></span><button class="btn">Avanti →</button></div>');
        b.querySelector('button').addEventListener('click', function () { staccaTasti(); fatto(voto); });
        box.appendChild(b);
        b.querySelector('button').focus();
        attaccaTasti(function (e) { if (e.key === 'Enter' && document.activeElement.tagName !== 'BUTTON') { staccaTasti(); fatto(voto); } });
      }

      function esito(giusto, html) {
        box.appendChild(U.html('<div class="esito ' + (giusto ? 'giusto' : 'sbagliato') + '"><strong>' + (giusto ? 'Giusto! ✓' : 'Non proprio ✗') + '</strong>' + html + '</div>'));
      }

      if (q.tipo === 'scelta') {
        const lista = U.html('<div class="opzioni"></div>');
        q.opzioni.forEach(function (o, i) {
          const b = U.html('<button class="opzione"><span class="ordine-n">' + (i + 1) + '</span>' + U.esc(o.etichetta) + '</button>');
          b.addEventListener('click', function () { scegli(i); });
          lista.appendChild(b);
        });
        box.appendChild(lista);
        let risposto = false;
        const scegli = function (i) {
          if (risposto) return;
          risposto = true;
          staccaTasti();
          const bottoni = lista.querySelectorAll('button');
          bottoni.forEach(function (b, j) {
            b.disabled = true;
            if (q.opzioni[j].giusta) b.classList.add('giusta');
            else if (j === i) b.classList.add('sbagliata');
          });
          const ok = q.opzioni[i].giusta;
          esito(ok, q.spiegazione);
          bottoneAvanti(ok ? 2 : 0);
        };
        attaccaTasti(function (e) {
          const n = parseInt(e.key, 10);
          if (n >= 1 && n <= q.opzioni.length) scegli(n - 1);
        });
      } else if (q.tipo === 'ordina') {
        const scelti = [];
        const lista = U.html('<div class="opzioni"></div>');
        const comandi = U.html('<div class="riga" style="margin-top:12px"><button class="btn secondario piccolo" data-azione="reset">Ricomincia</button><span class="spazio"></span><button class="btn" data-azione="verifica" disabled>Verifica</button></div>');
        function ridisegna() {
          lista.querySelectorAll('button').forEach(function (b) {
            const pos = scelti.indexOf(b.dataset.id);
            b.classList.toggle('scelta', pos >= 0);
            b.querySelector('.ordine-n').textContent = pos >= 0 ? String(pos + 1) : '·';
          });
          comandi.querySelector('[data-azione="verifica"]').disabled = scelti.length !== q.elementi.length;
        }
        q.elementi.forEach(function (o) {
          const b = U.html('<button class="opzione" data-id="' + o.id + '"><span class="ordine-n">·</span>' + U.esc(o.etichetta) + '</button>');
          b.addEventListener('click', function () {
            const pos = scelti.indexOf(o.id);
            if (pos >= 0) scelti.splice(pos);
            else scelti.push(o.id);
            ridisegna();
          });
          lista.appendChild(b);
        });
        box.appendChild(U.html('<p class="tenue piccolo" style="margin-top:-8px">Tocca gli eventi nell\'ordine giusto: il primo che tocchi è il più antico.</p>'));
        box.appendChild(lista);
        box.appendChild(comandi);
        comandi.querySelector('[data-azione="reset"]').addEventListener('click', function () { scelti.length = 0; ridisegna(); });
        comandi.querySelector('[data-azione="verifica"]').addEventListener('click', function () {
          const ok = scelti.every(function (id, i) { return id === q.ordine[i]; });
          lista.querySelectorAll('button').forEach(function (b) {
            b.disabled = true;
            b.classList.add(scelti.indexOf(b.dataset.id) === q.ordine.indexOf(b.dataset.id) ? 'giusta' : 'sbagliata');
          });
          comandi.remove();
          esito(ok, '<p>L\'ordine giusto:</p>' + q.spiegazione);
          bottoneAvanti(ok ? 2 : 0);
        });
      } else {
        box.appendChild(U.html('<p class="tenue">' + U.esc(q.aiuto) + '</p>'));
        const mostraBtn = U.html('<button class="btn grande">Mostra la risposta</button>');
        box.appendChild(mostraBtn);
        mostraBtn.focus();
        let rivelato = false;
        const rivela = function () {
          if (rivelato) return;
          rivelato = true;
          mostraBtn.remove();
          box.appendChild(U.html('<div class="risposta-rivelata">' + q.risposta + '</div>'));
          box.appendChild(U.html('<p class="tenue piccolo" style="margin:14px 0 0">' + (opzioni.studio ? 'Com\'è andata?' : 'Com\'è andata? Sii onesto: serve a decidere quando riproportela.') + '</p>'));
          const sotto = opzioni.studio ? ['', '', '', ''] : ['domani', 'presto', 'più avanti', 'molto più avanti'];
          const voti = U.html('<div class="voti">' +
            '<button class="btn voto-0" data-v="0">Non lo sapevo<small>' + sotto[0] + '</small></button>' +
            '<button class="btn voto-1" data-v="1">A metà<small>' + sotto[1] + '</small></button>' +
            '<button class="btn voto-2" data-v="2">Lo sapevo<small>' + sotto[2] + '</small></button>' +
            '<button class="btn voto-3" data-v="3">Facile<small>' + sotto[3] + '</small></button></div>');
          voti.querySelectorAll('button').forEach(function (b) {
            b.addEventListener('click', function () { staccaTasti(); fatto(parseInt(b.dataset.v, 10)); });
          });
          box.appendChild(voti);
          box.appendChild(U.html('<p class="piccolo" style="margin-top:10px"><a target="_blank" href="#/mattone/' + m.id + '">Apri la scheda ↗</a></p>'));
          attaccaTasti(function (e) {
            const n = parseInt(e.key, 10);
            if (n >= 1 && n <= 4) { staccaTasti(); fatto(n - 1); }
          });
        };
        mostraBtn.addEventListener('click', rivela);
        attaccaTasti(function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); rivela(); } });
      }

      return staccaTasti;
    }
  };

  IMP.Quiz = Quiz;
})(window.IMP);
