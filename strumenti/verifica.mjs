#!/usr/bin/env node
/*
 * Verifica dei dati di Impalcatura. Uso:
 *   node strumenti/verifica.mjs            controlli locali (dati, collegamenti, regole, domande)
 *   node strumenti/verifica.mjs --online   in più controlla che le voci di Wikipedia esistano
 * Esce con codice 1 se trova errori.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const radice = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errori = [];
const avvisi = [];
const errore = (m) => errori.push(m);
const avviso = (m) => avvisi.push(m);

// Carica gli script nello stesso ordine di index.html, in un contesto che simula il browser.
const memoria = {};
const ctx = {
  console,
  localStorage: {
    getItem: (k) => (k in memoria ? memoria[k] : null),
    setItem: (k, v) => { memoria[k] = String(v); }
  }
};
ctx.window = ctx;
vm.createContext(ctx);

const html = fs.readFileSync(path.join(radice, 'index.html'), 'utf8');
const script = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
const daCaricare = script.filter((s) => !/viste-|app\.js|linea\.js|ui\.js/.test(s));
for (const s of daCaricare) {
  const file = path.join(radice, s);
  if (!fs.existsSync(file)) { errore(`index.html carica un file che non esiste: ${s}`); continue; }
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: s });
}
for (const f of fs.readdirSync(path.join(radice, 'dati'))) {
  if (f.endsWith('.js') && !script.includes('dati/' + f)) errore(`dati/${f} non è caricato da index.html`);
}

const D = ctx.IMP_DATI;
const IMP = ctx.IMP;
const corsie = new Set(D.corsie.map((c) => c.id));
const tipi = new Set(Object.keys(D.tipiLink));
const byId = {};

/* ---------- Mattoni ---------- */
for (const m of D.mattoni) {
  const nome = m.id || '(senza id)';
  if (!m.id || !/^[a-z0-9-]+$/.test(m.id)) errore(`${nome}: id mancante o non valido (solo minuscole, cifre e trattini)`);
  if (byId[m.id]) errore(`${nome}: id duplicato`);
  byId[m.id] = m;
  for (const campo of ['titolo', 'corsia', 'evento', 'riassunto', 'perche']) {
    if (typeof m[campo] !== 'string' || !m[campo].trim()) errore(`${nome}: manca il campo «${campo}»`);
  }
  if (!corsie.has(m.corsia)) errore(`${nome}: corsia sconosciuta «${m.corsia}»`);
  if (![1, 2, 3].includes(m.livello)) errore(`${nome}: livello deve essere 1, 2 o 3`);
  if (!Number.isInteger(m.anno) || m.anno === 0) errore(`${nome}: anno deve essere un intero diverso da 0 (negativo = a.C.)`);
  if (m.anno > new Date().getFullYear()) errore(`${nome}: anno nel futuro`);
  if (m.inizio > m.fine) errore(`${nome}: inizio (${m.inizio}) dopo fine (${m.fine})`);
  if (m.anno < m.inizio || m.anno > m.fine) errore(`${nome}: anno (${m.anno}) fuori dal periodo ${m.inizio}–${m.fine}`);
  if (!m.gancio) avviso(`${nome}: manca il gancio per la memoria`);
  if (m.riassunto && m.riassunto.length > 700) avviso(`${nome}: riassunto lungo (${m.riassunto.length} caratteri), meglio restare sotto i 700`);
  if (!m.wiki || !m.wiki.it) errore(`${nome}: manca wiki.it (voce di Wikipedia in italiano)`);
  if (m.wiki && m.wiki.q && !/^Q\d+$/.test(m.wiki.q)) errore(`${nome}: wiki.q non è un identificativo Wikidata`);
  for (const d of m.domande || []) if (!d.d || !d.r) errore(`${nome}: domanda senza testo («d») o risposta («r»)`);
  if (m.evento && /^[A-Z]/.test(m.evento) && !/^[A-Z][a-z]+ /.test(m.evento)) avviso(`${nome}: «evento» viene inserito in «In che anno …?», controlla la maiuscola iniziale`);
}

/* ---------- Collegamenti ---------- */
const coppie = new Set();
for (const m of D.mattoni) {
  for (const l of m.link || []) {
    const t = byId[l.a];
    if (!t) { errore(`${m.id}: collegamento verso «${l.a}», che non esiste`); continue; }
    if (l.a === m.id) errore(`${m.id}: collegamento verso se stesso`);
    if (!tipi.has(l.tipo)) errore(`${m.id} → ${l.a}: tipo sconosciuto «${l.tipo}»`);
    if (!l.perche) errore(`${m.id} → ${l.a}: manca il «perche» del collegamento`);
    const k = [m.id, l.a].sort().join('|');
    if (coppie.has(k)) errore(`${m.id} ↔ ${l.a}: collegamento duplicato`);
    coppie.add(k);
    if (l.tipo !== 'confronto' && t.anno < m.anno) errore(`${m.id} (${m.anno}) → ${l.a} (${t.anno}): una causa o un'influenza non può venire dopo il suo effetto`);
  }
}
for (const m of D.mattoni) {
  const n = IMP.mappa.collegamenti(m.id).length;
  if (n === 0) avviso(`${m.id}: nessun collegamento, un mattone portante dovrebbe collegarsi ad altri`);
}

/* ---------- Percorso e punti fissi ---------- */
const visti = new Set();
for (const id of D.percorso) {
  if (!byId[id]) errore(`percorso: «${id}» non esiste`);
  if (visti.has(id)) errore(`percorso: «${id}» compare due volte`);
  visti.add(id);
}
for (const m of D.mattoni) if (!visti.has(m.id)) avviso(`percorso: «${m.id}» non è nel percorso, verrà proposto alla fine`);
const fissi = D.mattoni.filter((m) => m.fisso);
if (fissi.length < 5 || fissi.length > 9) avviso(`ci sono ${fissi.length} punti fissi: ne servono pochi (5–9)`);
D.percorso.slice(0, fissi.length).forEach((id) => {
  if (byId[id] && !byId[id].fisso) avviso(`percorso: «${id}» è tra i primi ma non è un punto fisso`);
});

/* ---------- Regole di attualità ---------- */
for (const m of D.mattoni) {
  for (const r of m.attualita || []) {
    if (!Array.isArray(r.temi) || !r.temi.length) errore(`${m.id}: regola di attualità senza «temi»`);
    if (!r.perche) errore(`${m.id}: regola di attualità senza «perche»`);
    for (const t of [...(r.temi || []), ...(r.anche || [])]) {
      if (t.startsWith('@') && !(D.gruppi && D.gruppi[t.slice(1)])) errore(`${m.id}: gruppo di parole sconosciuto «${t}»`);
      if (/\s$|^\s/.test(t)) errore(`${m.id}: la parola «${t}» ha spazi all'inizio o alla fine`);
    }
  }
}

// Casi di prova: titolo → mattoni attesi (e mattoni che NON devono comparire)
const prove = [
  ['Israeli airstrikes kill 30 people in Gaza City', ['israele-1948'], []],
  ['Russia launches a massive drone attack on Kyiv, Ukraine', ['fine-guerra-fredda'], []],
  ["Dazi, l'UE prepara la risposta agli Stati Uniti", ['crisi-1929', 'unione-europea'], []],
  ['Il centrodestra vince le elezioni regionali', ['rivoluzione-francese'], []],
  ['Il Papa incontra i giovani in piazza San Pietro', ['cristianesimo-impero'], []],
  ['Luiz Inácio Lula da Silva is re-elected President of Brazil', ['indipendenze-latinoamericane'], []],
  ['In the Serbian parliamentary election, the Student List wins a majority', ['fine-guerra-fredda'], []],
  ['Binance confirms that assets worth US$6.3 billion were stolen', ['internet'], []],
  ['Nuovo focolaio di Ebola nella Repubblica Democratica del Congo', ['peste-nera', 'decolonizzazione'], ['spartizione-africa']],
  ['M23 rebels capture a town on the border with Rwanda', ['spartizione-africa'], []],
  ['British actor Patrick Stewart dies at the age of 86', [], null],
  ['Un uomo è stato arrestato ai margini della manifestazione', [], null],
  ['Indiana Jones torna al cinema', [], null],
  ['Iran enriches uranium to 60% purity, says the IAEA', ['rivoluzione-iraniana', 'einstein'], []],
  ['India and Pakistan exchange fire along the Line of Control in Kashmir', ['partizione-india'], []],
  ['Lo sciopero generale blocca i treni', ['marx'], []],
  ["L'intelligenza artificiale e il lavoro: cosa cambia", ['internet'], []],
  ['At least one person is killed as Typhoon Champi swept near Taiwan', [], null, 'Disasters and accidents'],
  ["In golf, Japan's Yuri Yoshida wins her first LPGA Tour title", [], null, 'Sports'],
  ['Heatwave linked to climate change kills dozens in India', ['rivoluzione-industriale'], ['partizione-india'], 'Disasters and accidents'],
  ['The Ethiopian Orthodox Church reports that 60 Christians have been killed', [], ['decolonizzazione']],
  ['The IDF says it killed four Hamas and Palestinian Islamic Jihad members in Gaza', ['israele-1948'], ['islam']],
  ['Jio Platforms raises US$3.2 billion in the largest IPO on the Indian stock market', ['partizione-india'], ['crisi-1929']]
];
for (const [testo, attesi, vietati, categoria] of prove) {
  const trovati = IMP.Notizie.abbina(testo, [], categoria).map((a) => a.mattone.id);
  for (const a of attesi) if (!trovati.includes(a)) errore(`attualità: «${testo}» dovrebbe agganciarsi a ${a} (trovati: ${trovati.join(', ') || 'nessuno'})`);
  if (vietati === null && trovati.length) errore(`attualità: «${testo}» non dovrebbe agganciarsi a nulla (trovati: ${trovati.join(', ')})`);
  for (const v of vietati || []) if (trovati.includes(v)) errore(`attualità: «${testo}» non dovrebbe agganciarsi a ${v}`);
}

/* ---------- Generazione delle domande ---------- */
const tipiQuando = ['secolo', 'anno', 'primaDopo', 'ordina'];
const tipiPerche = ['perche', 'collegamento', 'domanda'];
for (const scenario of ['vuoto', 'avanzato']) {
  if (scenario === 'avanzato') D.percorso.slice(0, 20).forEach((id) => IMP.SRS.impara(id));
  for (const m of D.mattoni) {
    for (let giro = 0; giro < 6; giro++) {
      for (const [faccia, preferenze] of [['quando', tipiQuando], ['perche', tipiPerche]]) {
        for (const pref of [undefined, ...preferenze]) {
          let q;
          try {
            q = IMP.Quiz.genera(m.id, faccia, pref);
          } catch (e) {
            errore(`domande: ${m.id}/${faccia}/${pref || 'casuale'} genera un errore: ${e.message}`);
            continue;
          }
          if (!q.testo) errore(`domande: ${m.id}/${faccia}/${pref}: testo vuoto`);
          if (q.tipo === 'scelta') {
            const giuste = q.opzioni.filter((o) => o.giusta).length;
            const etichette = new Set(q.opzioni.map((o) => o.etichetta));
            if (giuste !== 1) errore(`domande: ${m.id}/${pref}: ${giuste} risposte giuste invece di 1`);
            if (etichette.size !== q.opzioni.length) errore(`domande: ${m.id}/${pref}: opzioni duplicate (${[...etichette].join(' | ')})`);
            if (q.opzioni.length < 2) errore(`domande: ${m.id}/${pref}: meno di due opzioni`);
          } else if (q.tipo === 'ordina') {
            const anni = q.ordine.map((id) => byId[id].anno);
            if (new Set(anni).size !== anni.length) errore(`domande: ${m.id}/ordina: due eventi con lo stesso anno`);
          }
        }
      }
    }
  }
}

/* ---------- Wikipedia (facoltativo) ---------- */
async function controllaWiki() {
  async function interroga(lingua, titoli, conQ) {
    const esito = {};
    for (let i = 0; i < titoli.length; i += 50) {
      const lotto = titoli.slice(i, i + 50);
      const url = `https://${lingua}.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&redirects=1` +
        (conQ ? '&prop=pageprops&ppprop=wikibase_item' : '') + '&titles=' + encodeURIComponent(lotto.join('|'));
      const r = await fetch(url, { headers: { 'User-Agent': 'impalcatura-verifica/1.0 (progetto open source)' } });
      const j = await r.json();
      const mappa = {};
      for (const n of j.query.normalized || []) mappa[n.to] = n.from;
      const rinvii = {};
      for (const rd of j.query.redirects || []) rinvii[rd.to] = rinvii[rd.to] || rd.from;
      for (const p of j.query.pages) {
        let orig = p.title;
        if (rinvii[orig]) orig = rinvii[orig];
        if (mappa[orig]) orig = mappa[orig];
        esito[orig] = { manca: !!p.missing, titolo: p.title, rinvio: !!rinvii[p.title], q: p.pageprops && p.pageprops.wikibase_item };
      }
    }
    return esito;
  }
  const it = new Set(), en = new Set();
  for (const m of D.mattoni) {
    it.add(m.wiki.it);
    (m.fonti || []).forEach((f) => it.add(f));
    if (m.wiki.en) en.add(m.wiki.en);
  }
  const rIt = await interroga('it', [...it], true);
  const rEn = await interroga('en', [...en], false);
  for (const m of D.mattoni) {
    const p = rIt[m.wiki.it];
    if (!p || p.manca) errore(`${m.id}: la voce it.wikipedia «${m.wiki.it}» non esiste`);
    else {
      if (p.rinvio) avviso(`${m.id}: «${m.wiki.it}» è un rinvio a «${p.titolo}»`);
      if (m.wiki.q && p.q && p.q !== m.wiki.q) errore(`${m.id}: wiki.q è ${m.wiki.q} ma la voce italiana corrisponde a ${p.q}`);
    }
    for (const f of m.fonti || []) {
      const pf = rIt[f];
      if (!pf || pf.manca) errore(`${m.id}: la fonte it.wikipedia «${f}» non esiste`);
      else if (pf.rinvio) avviso(`${m.id}: la fonte «${f}» è un rinvio a «${pf.titolo}»`);
    }
    if (m.wiki.en) {
      const pe = rEn[m.wiki.en];
      if (!pe || pe.manca) errore(`${m.id}: la voce en.wikipedia «${m.wiki.en}» non esiste`);
      else if (pe.rinvio) avviso(`${m.id}: «${m.wiki.en}» (en) è un rinvio a «${pe.titolo}»`);
    }
  }
}

if (process.argv.includes('--online')) {
  try {
    await controllaWiki();
  } catch (e) {
    errore('controllo di Wikipedia non riuscito: ' + e.message);
  }
}

/* ---------- Esito ---------- */
const n = D.mattoni.length;
const perCorsia = {};
for (const m of D.mattoni) perCorsia[m.corsia] = (perCorsia[m.corsia] || 0) + 1;
const nonEuropei = D.mattoni.filter((m) => !['europa', 'idee', 'mondo'].includes(m.corsia)).length;
console.log(`Mattoni: ${n} · collegamenti: ${coppie.size} · punti fissi: ${fissi.length} · regole di attualità: ${D.mattoni.reduce((s, m) => s + (m.attualita || []).length, 0)}`);
console.log('Per area: ' + Object.entries(perCorsia).map(([k, v]) => `${k} ${v}`).join(', ') + ` · fuori dall'Europa: ${nonEuropei} (${Math.round(nonEuropei / n * 100)}%)`);
for (const a of avvisi) console.log('  avviso: ' + a);
for (const e of errori) console.log('  ERRORE: ' + e);
console.log(errori.length ? `\n${errori.length} errori.` : '\nNessun errore.');
process.exit(errori.length ? 1 : 0);
