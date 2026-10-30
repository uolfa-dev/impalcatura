# Impalcatura

**La mappa della cultura generale, mattone dopo mattone.**

👉 **Apri il sito: <https://uolfa-dev.github.io/impalcatura/>**
Funziona su qualsiasi telefono e si può mettere nella schermata Home come un'app:
- **iPhone:** aprilo in Safari, tocca *Condividi* e poi *Aggiungi alla schermata Home*;
- **Android:** aprilo con Chrome e tocca *Installa* nella pagina *Oggi*, oppure usa il menu ⋮ → *Aggiungi a schermata Home*.

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
- **Attualità.** Il sito mostra le notizie degli ultimi giorni da Wikipedia, cioè le pagine [Current events](https://en.wikipedia.org/wiki/Portal:Current_events) e *In the news*, e le aggancia al mattone che le spiega: una notizia su Gaza al 1948, una sui dazi alla crisi del 1929, una su destra e sinistra al 1789.
  - Le notizie sono **tradotte automaticamente in italiano** con un traduttore open source (vedi [Notizie in italiano](#notizie-in-italiano)). Sotto ogni notizia c'è l'originale inglese, a portata di tocco.
  - Le notizie che non si agganciano restano in fondo, chiuse.
  - Puoi anche incollare il titolo di un articolo italiano: il sito ti suggerisce il mattone e ti chiede di scrivere con parole tue perché si aggancia.

I progressi restano **solo nel tuo browser** (localStorage). Dalla pagina *Progressi* puoi esportarli e importarli.

## Usarlo

Non serve installare nulla.

- **Sul tuo computer:** apri `index.html` con un doppio clic. Per le notizie serve la connessione; aperto così, il sito le legge in inglese direttamente da Wikipedia.
- **Online, gratis, con GitHub Pages:** questo repository è già pubblicato su <https://uolfa-dev.github.io/impalcatura/>. Ogni modifica caricata sul ramo `main` va online in circa un minuto. Per pubblicare una tua copia:
  1. Fai un fork del repository, oppure pubblica la cartella in un tuo repository.
  2. Apri *Settings → Pages → Deploy from a branch*, scegli il ramo `main` e la cartella `/ (root)`.
  3. Dopo un minuto il sito è su `https://<utente>.github.io/<repository>/`, anche dal telefono.
  4. In `index.html` sostituisci il vecchio indirizzo nei tag `og:url` e `og:image`: servono all'anteprima del link su WhatsApp e simili, che vuole indirizzi completi.
  5. Per le notizie in italiano apri *Actions*, attiva i workflow e avvia a mano *Notizie in italiano* la prima volta.
- **Sull'iPhone:** apri il sito in Safari, tocca *Condividi* e poi *Aggiungi alla schermata Home*. Impalcatura si apre a tutto schermo come un'app. È anche più sicuro per i progressi: Safari può cancellare i dati dei siti che non apri per 7 giorni, le app nella schermata Home no.
- **Su Android:** apri il sito con Chrome (o con un altro browser basato su Chrome, come Samsung Internet). Quando Chrome lo permette, la pagina *Oggi* mostra il pulsante *Installa*: un tocco e Impalcatura arriva nella schermata Home. Chrome lo propone dopo almeno un tocco e mezzo minuto sulla pagina. Prima di allora, o con altri browser, la pagina spiega come fare dal menu.

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
js/notizie.js              notizie (tradotte o da Wikipedia) e regole di aggancio
js/linea.js                linea del tempo
js/installa.js             invito a mettere il sito nella schermata Home (iPhone e Android)
js/ui.js, js/viste-*.js    le pagine del sito
js/app.js                  router (indirizzi con #)
notizie.json               notizie tradotte, aggiornate ogni 3 ore dal robot (non modificarlo a mano)
strumenti/verifica.mjs     controlli sui dati
strumenti/notizie.py       scarica e traduce le notizie (lo usa il robot)
.github/workflows/         controlli automatici e traduzione delle notizie
```

È JavaScript semplice, senza dipendenze né passaggi di compilazione: chi sa scrivere un file di testo può contribuire.

## Notizie in italiano

Ogni 3 ore il workflow [Notizie in italiano](.github/workflows/notizie.yml) esegue [strumenti/notizie.py](strumenti/notizie.py) su GitHub:

1. scarica da Wikipedia le pagine *Current events* e *In the news*;
2. le scompone in singole notizie con le stesse regole del sito (`js/notizie.js`);
3. traduce in italiano solo i testi nuovi con [OPUS-MT](https://huggingface.co/Helsinki-NLP/opus-mt-tc-big-en-it), un modello open source dell'Università di Helsinki che gira sui computer di GitHub, senza servizi esterni;
4. salva tutto in `notizie.json`, con il testo inglese accanto a quello italiano: gli agganci ai mattoni si cercano sull'originale, che è più preciso.

Il sito legge `notizie.json`. Se il file manca o ha più di 12 ore, per esempio perché il workflow si è fermato, il sito legge le notizie in inglese direttamente da Wikipedia, come faceva all'inizio.

La traduzione automatica è buona ma non perfetta: nomi di aziende e termini tecnici a volte vengono resi alla lettera. Per questo l'originale resta sempre a un tocco di distanza.

Il robot salva `notizie.json` ogni 3 ore sul ramo `main`. Se lavori sul codice, prima di caricare le tue modifiche aggiorna la tua copia con `git pull --rebase`. Ogni salvataggio è una modifica vera del repository, quindi GitHub non sospende la programmazione per inattività, come fa dopo 60 giorni senza modifiche.

Per provarlo sul tuo computer servono Python 3.12 e le dipendenze:

```
pip install torch --index-url https://download.pytorch.org/whl/cpu
pip install -r strumenti/requisiti-notizie.txt
python strumenti/notizie.py                      # scarica, traduce e scrive notizie.json
python strumenti/notizie.py --senza-traduzione   # solo scarico e scomposizione, molto più veloce
```

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

La stessa verifica (senza `--online`) è anche un controllo automatico di GitHub Actions ([.github/workflows/verifica.yml](.github/workflows/verifica.yml)), che parte a ogni modifica e a ogni pull request. Si spegne e si riaccende da *Actions → Verifica dei dati*.

## Licenze

- Codice: [MIT](LICENSE).
- Contenuti (testi dei mattoni in `dati/`): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.it), la stessa licenza di Wikipedia.
- Le notizie vengono da Wikipedia (CC BY-SA 4.0) e sono tradotte con il modello [OPUS-MT opus-mt-tc-big-en-it](https://huggingface.co/Helsinki-NLP/opus-mt-tc-big-en-it) di Jörg Tiedemann e del gruppo Language Technology dell'Università di Helsinki ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.it)). Le traduzioni restano sotto CC BY-SA 4.0, come gli originali. Ogni notizia porta il collegamento alle fonti.
