# Impalcatura

**La mappa della cultura generale, mattone dopo mattone.**

Impalcatura è un sito open source, senza scopo di lucro, per chi vuole costruirsi una cultura generale solida e restare collegato all'attualità, anche con poca memoria.
Lo scopo non è accumulare nozioni ma avere pochi **mattoni portanti** a cui agganciare tutto il resto.

## Come funziona

- **52 mattoni** di storia, idee e scienza. Ognuno ha:
  - una data da ricordare;
  - un riassunto e il perché conta;
  - un *gancio* per la memoria;
  - i collegamenti con gli altri mattoni.
- **7 punti fissi**, la «spina dorsale» del tempo, si imparano per primi. Ogni mattone nuovo viene collocato rispetto a loro («502 anni prima della caduta di Roma»):
  - 3200 a.C.: la scrittura;
  - 27 a.C.: Augusto;
  - 476: la caduta di Roma;
  - 1492: Colombo;
  - 1789: la Rivoluzione francese;
  - 1945: la fine della guerra e l'ONU;
  - 1989: il muro di Berlino.
- **Ripetizione spaziata.** Ogni mattone ha due carte, *quando* e *perché*:
  - dopo una risposta giusta la rivedi dopo 1, 3, 8, 20 giorni e così via;
  - dopo un errore la rivedi il giorno dopo, e anche nella stessa sessione.

  Si impara poco per volta: 3 mattoni nuovi al giorno, ma il numero si può cambiare.
- **Domande generate dai dati.** Sono di sei tipi:
  - in che secolo;
  - in che anno;
  - che cosa viene prima;
  - metti in ordine;
  - perché conta;
  - a che cosa ha portato.
- **Linea del tempo a corsie** (Europa, Medio Oriente, Africa, Asia, Americhe, Mondo, Idee). La scala è a tratti, così gli ultimi secoli non diventano una riga. Toccando un mattone si vedono le frecce dei collegamenti.
- **Attualità.** Il sito legge le notizie degli ultimi giorni da Wikipedia, cioè le pagine [Current events](https://en.wikipedia.org/wiki/Portal:Current_events) e *In the news*, in inglese, e le aggancia al mattone che le spiega: una notizia su Gaza al 1948, una sui dazi alla crisi del 1929, una su destra e sinistra al 1789.
  - Le notizie che non si agganciano restano in fondo, chiuse.
  - Puoi anche incollare il titolo di un articolo italiano: il sito ti suggerisce il mattone e ti chiede di scrivere con parole tue perché si aggancia.

I progressi restano **solo nel tuo browser** (localStorage). Dalla pagina *Progressi* puoi esportarli e importarli.

## Usarlo

Non serve installare nulla.

- **Sul tuo computer:** apri `index.html` con un doppio clic. Per le notizie serve la connessione.
- **Online, gratis, con GitHub Pages:**
  1. Pubblica questa cartella in un repository GitHub.
  2. Apri *Settings → Pages → Deploy from a branch*, scegli il ramo `main` e la cartella `/ (root)`.
  3. Dopo un minuto il sito è su `https://<utente>.github.io/<repository>/`, anche dal telefono.

I progressi sono legati al browser e all'indirizzo: quelli fatti aprendo il file non si ritrovano sul sito pubblicato, e viceversa. Per spostarli usa *Esporta* e *Importa*.

## Struttura

```
index.html                 pagina unica
css/style.css              stile (chiaro e scuro, adatto al telefono)
dati/corsie.js             corsie, ere, tipi di collegamento, gruppi di parole
dati/mattoni-*.js          i mattoni, un file per epoca
dati/percorso.js           ordine in cui si imparano
js/util.js                 date storiche (niente anno zero), secoli, numeri romani
js/store.js                salvataggio nel browser
js/mappa.js                indici, collegamenti nei due sensi, punti fissi, contemporaneità
js/srs.js                  ripetizione spaziata
js/quiz.js                 generazione e presentazione delle domande
js/notizie.js              notizie da Wikipedia e regole di aggancio
js/linea.js                linea del tempo
js/ui.js, js/viste-*.js    le pagine del sito
js/app.js                  router (indirizzi con #)
strumenti/verifica.mjs     controlli sui dati
```

È JavaScript semplice, senza dipendenze né passaggi di compilazione: chi sa scrivere un file di testo può contribuire.

## Aggiungere o correggere un mattone

Ogni mattone è un oggetto in uno dei file `dati/mattoni-*.js`:

```js
mattone({
  id: "rivoluzione-francese",        // minuscole e trattini, unico
  titolo: "La Rivoluzione francese",
  corsia: "europa",                  // europa, medio-oriente, africa, asia, americhe, mondo, idee
  livello: 1,                        // 1 = fondamentale, 2 = importante
  fisso: true,                       // solo per i pochi punti fissi
  inizio: 1789, fine: 1799,          // periodo sulla linea del tempo (negativo = a.C.)
  anno: 1789,                        // la data da ricordare
  evento: "i parigini assaltano la Bastiglia: inizia la Rivoluzione francese",
                                     // completa «In che anno …?» e «In che secolo …?»
  riassunto: "…", perche: "…", gancio: "…",
  link: [
    { a: "napoleone", tipo: "causa", perche: "…" }   // causa, influenza o confronto
  ],
  attualita: [
    { temi: ["far-right", "centrodestra"], perche: "…" },
    { paese: true, temi: ["France", "Francia"], perche: "…" }
  ],
  domande: [{ d: "domanda", r: "risposta" }],
  wiki: { it: "Rivoluzione francese", en: "French Revolution", q: "Q6534" },
  fonti: ["Presa della Bastiglia"]   // altre voci di it.wikipedia
});
```

Campi facoltativi:
- `circa: true` per le date approssimative;
- `chiediAnno: false` se l'anno esatto non vale la pena di impararlo;
- `etichetta` per scrivere il periodo a mano («XV–XVI secolo»);
- `breve` per il nome corto dei punti fissi.

Regole:

- **Mattoni portanti, non curiosità.** Un mattone deve spiegare o collegare altre cose. Se non riesci a scrivergli almeno un collegamento, probabilmente non è portante.
- **Un collegamento si scrive una volta sola**, sul mattone che viene prima: la pagina dell'altro mostra la frase inversa («Nasce anche da»). Una causa o un'influenza non può venire dopo il suo effetto, e la verifica lo controlla.
- **Le regole di attualità** cercano parole intere, in inglese (per le notizie di Wikipedia) e in italiano (per i titoli incollati):
  - le parole con maiuscole rispettano le maiuscole, così «UN» non trova l'articolo «un»;
  - le parole tutte minuscole le ignorano;
  - `*` finale vale «qualsiasi desinenza»;
  - `@paesiAfricani` richiama un gruppo di parole definito in `dati/corsie.js`;
  - `anche` aggiunge parole che devono comparire insieme alle prime;
  - `paese: true` segna le regole basate su un paese, che non si applicano a incidenti, catastrofi e sport.
- **Fonti verificabili e tono neutrale.** Le sintesi sono originali, non copiate. Per i temi controversi si descrivono i fatti e le posizioni, come nella regola del punto di vista neutrale di Wikipedia.

Prima di proporre una modifica, esegui la verifica (serve [Node.js](https://nodejs.org) 18 o più recente):

```
node strumenti/verifica.mjs            # dati, collegamenti, regole, domande
node strumenti/verifica.mjs --online   # in più controlla le voci di Wikipedia e gli ID Wikidata
```

## Licenze

- Codice: [MIT](LICENSE).
- Contenuti (testi dei mattoni in `dati/`): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.it), la stessa licenza di Wikipedia.
- Le notizie restano di Wikipedia e delle fonti originali: il sito le mostra con il collegamento, non le copia.
