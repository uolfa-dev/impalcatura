/*
 * Attualità: scarica le notizie da Wikipedia (Current events e In the news, in inglese)
 * e le aggancia ai mattoni con le regole «attualita» scritte in ogni mattone.
 * Le API di Wikipedia accettano richieste dal browser (CORS), quindi non serve alcun server.
 */
(function (IMP) {
  'use strict';

  const U = IMP.U;
  const API = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&formatversion=2&origin=*&prop=text&disableeditsection=1&disablelimitreport=1&page=';
  const PAGINA_EVENTI = 'Portal:Current_events';
  const PAGINA_ITN = 'Template:In_the_news';
  const DURATA_CACHE = 3 * 60 * 60 * 1000;
  const CONFINE_PRIMA = '(?<![\\p{L}\\p{N}])';
  const CONFINE_DOPO = '(?![\\p{L}\\p{N}])';

  /* ---------- Regole di abbinamento ---------- */

  let regole = null;
  let perTitoloEn = null;

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function espandi(temi) {
    const out = [];
    temi.forEach(function (t) {
      if (t.charAt(0) === '@') out.push.apply(out, IMP.mappa.gruppo(t.slice(1)));
      else out.push(t);
    });
    return out;
  }

  // Le parole con maiuscole si cercano rispettando le maiuscole (così «UN» non trova l'articolo «un»);
  // quelle tutte minuscole ignorano le maiuscole. L'asterisco finale vale «qualsiasi desinenza».
  function compila(temi) {
    const sens = [], insens = [];
    espandi(temi).forEach(function (t) {
      const pezzo = escapeRe(t).replace(/\\\*/g, '[\\p{L}\\p{N}]*');
      (t === t.toLowerCase() ? insens : sens).push(pezzo);
    });
    return {
      sens: sens.length ? new RegExp(CONFINE_PRIMA + '(?:' + sens.join('|') + ')' + CONFINE_DOPO, 'gu') : null,
      insens: insens.length ? new RegExp(CONFINE_PRIMA + '(?:' + insens.join('|') + ')' + CONFINE_DOPO, 'giu') : null
    };
  }

  function trovati(re, testo) {
    const set = new Set();
    [re.sens, re.insens].forEach(function (r) {
      if (!r) return;
      (testo.match(r) || []).forEach(function (x) { set.add(x.toLowerCase()); });
    });
    return set;
  }

  function preparaRegole() {
    if (regole) return;
    regole = [];
    perTitoloEn = {};
    IMP.mappa.mattoni.forEach(function (m) {
      if (m.wiki && m.wiki.en) perTitoloEn[m.wiki.en] = m;
      (m.attualita || []).forEach(function (r) {
        regole.push({ mattone: m, perche: r.perche, paese: !!r.paese, re: compila(r.temi), anche: r.anche ? compila(r.anche) : null });
      });
    });
  }

  /* ---------- Lettura dell'HTML di Wikipedia ---------- */

  function titoloDaHref(href) {
    try {
      return decodeURIComponent(href.replace(/^\/wiki\//, '')).split('#')[0].replace(/_/g, ' ');
    } catch (e) {
      return '';
    }
  }

  function pulisci(s) {
    return s.replace(/\s+/g, ' ').replace(/\s+([.,;:])/g, '$1').trim();
  }

  function visita(ul, contesto, categoria, voci) {
    Array.from(ul.children).forEach(function (li) {
      if (li.tagName !== 'LI') return;
      const sottoliste = Array.from(li.children).filter(function (c) { return c.tagName === 'UL'; });
      const proprio = li.cloneNode(true);
      proprio.querySelectorAll('ul').forEach(function (u) { u.remove(); });
      const fonti = Array.from(proprio.querySelectorAll('a.external')).map(function (a) {
        return { nome: a.textContent.replace(/[()]/g, '').trim(), url: a.getAttribute('href') };
      }).filter(function (f) { return /^https?:\/\//.test(f.url); });
      proprio.querySelectorAll('a.external').forEach(function (a) { a.remove(); });
      const link = Array.from(proprio.querySelectorAll('a[href^="/wiki/"]')).map(function (a) {
        return titoloDaHref(a.getAttribute('href'));
      }).filter(Boolean);
      const testo = pulisci(proprio.textContent);

      if (sottoliste.length) {
        if (fonti.length && testo) voci.push({ testo: testo, contesto: contesto.slice(), categoria: categoria, fonti: fonti, link: link });
        sottoliste.forEach(function (u) { visita(u, contesto.concat([testo]), categoria, voci); });
      } else if (testo) {
        voci.push({ testo: testo, contesto: contesto.slice(), categoria: categoria, fonti: fonti, link: link });
      }
    });
  }

  function analizzaEventi(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const giorni = [];
    doc.querySelectorAll('.current-events-main').forEach(function (box) {
      const bday = box.querySelector('.bday');
      const data = bday ? bday.textContent.trim() : '';
      const contenuto = box.querySelector('.current-events-content');
      if (!data || !contenuto) return;
      const voci = [];
      let categoria = '';
      Array.from(contenuto.children).forEach(function (el) {
        if (el.tagName === 'P') categoria = pulisci(el.textContent);
        else if (el.tagName === 'UL') visita(el, [], categoria, voci);
      });
      giorni.push({ data: data, voci: voci });
    });
    giorni.sort(function (a, b) { return a.data < b.data ? 1 : -1; });
    return giorni;
  }

  function analizzaITN(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const ul = doc.querySelector('ul');
    if (!ul) return [];
    return Array.from(ul.children).filter(function (li) { return li.tagName === 'LI'; }).map(function (li) {
      li.querySelectorAll('i').forEach(function (i) { if (/pictured/i.test(i.textContent)) i.remove(); });
      const link = Array.from(li.querySelectorAll('a[href^="/wiki/"]')).map(function (a) { return titoloDaHref(a.getAttribute('href')); });
      const principale = li.querySelector('b a[href^="/wiki/"]');
      const fonti = principale ? [{ nome: 'Wikipedia', url: 'https://en.wikipedia.org' + principale.getAttribute('href') }] : [];
      return { testo: pulisci(li.textContent), contesto: [], categoria: 'In primo piano', fonti: fonti, link: link };
    });
  }

  async function scarica(pagina) {
    const r = await fetch(API + encodeURIComponent(pagina));
    if (!r.ok) throw new Error('Wikipedia ha risposto con errore ' + r.status);
    const j = await r.json();
    if (j.error) throw new Error(j.error.info || 'errore di Wikipedia');
    return j.parse.text;
  }

  /* ---------- API pubblica ---------- */

  const Notizie = {
    carica: async function (forza) {
      const cache = IMP.Store.leggiNotizie();
      if (!forza && cache && Date.now() - cache.ts < DURATA_CACHE) return cache;
      const esiti = await Promise.allSettled([scarica(PAGINA_EVENTI), scarica(PAGINA_ITN)]);
      const ev = esiti[0], itn = esiti[1];
      if (ev.status !== 'fulfilled' && itn.status !== 'fulfilled') {
        if (cache) return Object.assign({}, cache, { vecchie: true });
        throw ev.reason;
      }
      const dati = {
        ts: Date.now(),
        giorni: ev.status === 'fulfilled' ? analizzaEventi(ev.value) : (cache ? cache.giorni : []),
        itn: itn.status === 'fulfilled' ? analizzaITN(itn.value) : (cache ? cache.itn : [])
      };
      IMP.Store.scriviNotizie(dati);
      return dati;
    },

    // Restituisce i mattoni a cui si aggancia un testo, dal più pertinente.
    // Le regole «paese» non valgono per incidenti, catastrofi e sport: un tifone a Taiwan non c'entra con Mao.
    abbina: function (testo, link, categoria) {
      preparaRegole();
      const t = testo + ' \n ' + (link || []).join(' \n ');
      const soloTemi = categoria && /disaster|accident|sport/i.test(categoria);
      const per = {};
      regole.forEach(function (r) {
        if (r.paese && soloTemi) return;
        const f = trovati(r.re, t);
        if (!f.size) return;
        if (r.anche && !trovati(r.anche, t).size) return;
        const prec = per[r.mattone.id];
        if (!prec || f.size > prec.punti) per[r.mattone.id] = { mattone: r.mattone, perche: r.perche, punti: f.size, parole: Array.from(f) };
      });
      (link || []).forEach(function (l) {
        const m = perTitoloEn[l];
        if (m) per[m.id] = { mattone: m, perche: 'La notizia parla direttamente di questo mattone.', punti: 9, parole: [l] };
      });
      return Object.keys(per).map(function (k) { return per[k]; }).sort(function (a, b) { return b.punti - a.punti; });
    },

    abbinaVoce: function (v) {
      return Notizie.abbina(v.contesto.concat([v.testo]).join(' \n '), v.link, v.categoria);
    },

    // La notizia del giorno: preferisce i mattoni che stai già imparando, così l'attualità diventa un ripasso gratuito.
    delGiorno: function (dati) {
      const candidati = [];
      const recenti = (dati.itn || []).map(function (v) { return { voce: v, peso: 3 }; })
        .concat(((dati.giorni || [])[0] || { voci: [] }).voci.map(function (v) { return { voce: v, peso: 2 }; }))
        .concat(((dati.giorni || [])[1] || { voci: [] }).voci.map(function (v) { return { voce: v, peso: 1 }; }));
      recenti.forEach(function (c) {
        const ab = Notizie.abbinaVoce(c.voce);
        if (!ab.length) return;
        const noto = IMP.SRS.stato(ab[0].mattone.id) !== 'nuovo';
        candidati.push({ voce: c.voce, abbinamenti: ab, punteggio: c.peso + ab[0].punti + (noto ? 4 : 0) });
      });
      candidati.sort(function (a, b) { return b.punteggio - a.punteggio; });
      return candidati[0] || null;
    },

    mie: function (idMattone) {
      const tutte = IMP.Store.get().mieNotizie || [];
      return idMattone ? tutte.filter(function (n) { return n.mattone === idMattone; }) : tutte;
    },

    aggiungiMia: function (n) {
      const s = IMP.Store.get();
      s.mieNotizie = s.mieNotizie || [];
      s.mieNotizie.unshift({
        id: Date.now().toString(36),
        data: U.oggi(),
        titolo: n.titolo,
        url: n.url || '',
        mattone: n.mattone,
        nota: n.nota || ''
      });
      IMP.Store.salva();
    },

    rimuoviMia: function (id) {
      const s = IMP.Store.get();
      s.mieNotizie = (s.mieNotizie || []).filter(function (n) { return n.id !== id; });
      IMP.Store.salva();
    }
  };

  IMP.Notizie = Notizie;
})(window.IMP);
