/* Mattoni dell'Ottocento (1789–1914). */

mattone({
  id: "napoleone",
  titolo: "Napoleone",
  corsia: "europa",
  livello: 1,
  inizio: 1799, fine: 1815,
  anno: 1804,
  evento: "Napoleone si incorona imperatore e promulga il Codice civile",
  riassunto: "Generale vittorioso della Rivoluzione, Napoleone Bonaparte prende il potere nel 1799 e nel 1804 si incorona imperatore. Conquista mezza Europa, Italia compresa, abolendo i privilegi feudali e imponendo leggi uniformi. La campagna di Russia (1812) lo rovina; sconfitto definitivamente a Waterloo (1815), muore in esilio a Sant'Elena.",
  perche: "Il suo Codice civile (1804), con l'uguaglianza davanti alla legge e la proprietà privata, è il modello del diritto civile di mezza Europa e dell'America Latina, Italia compresa. Le sue conquiste diffondono le idee rivoluzionarie e risvegliano i nazionalismi, anche contro di lui. Dopo la sua caduta il Congresso di Vienna (1815) ridisegna l'Europa.",
  gancio: "Napoleone nasce in Corsica nel 1769, appena un anno dopo che Genova l'aveva ceduta alla Francia: per un soffio non è nato italiano.",
  link: [
    { a: "indipendenze-latinoamericane", tipo: "causa", perche: "Nel 1808 Napoleone invade la Spagna e depone il re: le colonie americane, rimaste senza sovrano, iniziano a governarsi da sole." },
    { a: "unita-italia", tipo: "influenza", perche: "Napoleone crea un Regno d'Italia (1805) e porta codici moderni e idee di nazione: il Risorgimento parte anche da lì." }
  ],
  domande: [
    { d: "Qual è l'eredità di Napoleone che usiamo ancora oggi?", r: "Il Codice civile del 1804, modello del diritto civile di gran parte dell'Europa (Italia compresa) e dell'America Latina." }
  ],
  wiki: { it: "Napoleone Bonaparte", en: "Napoleon", q: "Q517" },
  fonti: ["Codice napoleonico"]
});

mattone({
  id: "indipendenze-latinoamericane",
  titolo: "Le indipendenze dell'America Latina",
  corsia: "americhe",
  livello: 1,
  inizio: 1810, fine: 1825,
  anno: 1810,
  evento: "iniziano le rivolte per l'indipendenza dell'America spagnola",
  riassunto: "Approfittando della crisi della Spagna occupata da Napoleone, dal 1810 le élite creole dell'America spagnola si ribellano. Simón Bolívar libera il nord del Sud America, José de San Martín il sud; il Messico diventa indipendente nel 1821 e il Brasile si separa dal Portogallo nel 1822. Entro il 1825 quasi tutto il continente è indipendente.",
  perche: "Nascono gli stati dell'America Latina, con i confini delle vecchie divisioni coloniali. Il sogno di Bolívar di una grande unione fallisce: un continente che parla quasi la stessa lingua si divide in molti paesi, spesso instabili e dominati da élite e caudillos.",
  gancio: "Messico, Argentina, Cile e Colombia fanno tutti risalire la loro indipendenza a rivolte scoppiate nello stesso anno: il 1810.",
  attualita: [
    { paese: true, temi: ["mexic*", "messic*", "venezuel*", "colombia*", "argentin*", "Peru", "Peruvian", "Perù", "peruvian*", "bolivia*", "Chile", "Chilean", "Cile", "cilen*", "ecuador*", "paraguay*", "uruguay*", "Brazil*", "brasil*", "Latin America*", "America Latina", "Lula", "Milei", "Maduro"], perche: "Gli stati dell'America Latina nascono tra il 1810 e il 1825 dalle guerre d'indipendenza contro Spagna e Portogallo: il sogno di Bolívar di un'unica grande nazione fallì e il continente si divise in tanti paesi." }
  ],
  wiki: { it: "Guerre d'indipendenza ispanoamericane", en: "Spanish American wars of independence", q: "Q1123201" },
  fonti: ["Simón Bolívar"]
});

mattone({
  id: "guerre-oppio",
  titolo: "Le guerre dell'oppio",
  corsia: "asia",
  livello: 1,
  inizio: 1839, fine: 1860,
  anno: 1842,
  evento: "con il trattato di Nanchino la Cina cede Hong Kong alla Gran Bretagna",
  riassunto: "La Gran Bretagna compra tè cinese e, per pareggiare i conti, vende in Cina oppio coltivato in India. Quando l'imperatore ne vieta il commercio, Londra gli fa guerra (1839–1842) e vince con le sue navi moderne. Il trattato di Nanchino (1842) apre i porti cinesi e cede Hong Kong; una seconda guerra (1856–1860) si chiude con il saccheggio del Palazzo d'Estate a Pechino.",
  perche: "Comincia quello che i cinesi chiamano il «secolo dell'umiliazione» (1839–1949): la più antica civiltà del mondo, sconfitta e divisa dalle potenze straniere. Il Partito comunista cinese costruisce ancora oggi la sua legittimità sull'averlo chiuso.",
  gancio: "Hong Kong: ceduta alla Gran Bretagna nel 1842, restituita alla Cina nel 1997, dopo 155 anni.",
  link: [
    { a: "rivoluzione-cinese", tipo: "causa", perche: "Il secolo dell'umiliazione, iniziato con l'oppio, si chiude per i cinesi solo nel 1949, quando Mao proclama che «la Cina si è alzata in piedi»." },
    { a: "meiji", tipo: "influenza", perche: "Vedendo la Cina umiliata, il Giappone decide di modernizzarsi in fretta per non fare la stessa fine." }
  ],
  attualita: [
    { paese: true, temi: ["Hong Kong", "Macau", "Macao", "opium", "oppio", "century of humiliation", "secolo dell'umiliazione"], perche: "Hong Kong fu ceduta alla Gran Bretagna nel 1842, dopo la prima guerra dell'oppio, e restituita alla Cina nel 1997; Macao, portoghese, nel 1999." }
  ],
  wiki: { it: "Guerre dell'oppio", en: "Opium Wars", q: "Q220984" }
});

mattone({
  id: "marx",
  titolo: "Marx e il Manifesto comunista",
  corsia: "idee",
  livello: 1,
  inizio: 1848, fine: 1883,
  anno: 1848,
  evento: "Marx ed Engels pubblicano il Manifesto del Partito comunista",
  riassunto: "Nel 1848, mentre in tutta Europa scoppiano rivoluzioni, Karl Marx e Friedrich Engels pubblicano il Manifesto del Partito comunista: «Proletari di tutti i paesi, unitevi!». Nel Capitale (1867) Marx analizza il capitalismo industriale: per lui la storia è una lotta tra classi, e gli operai sfruttati finiranno per rovesciare i padroni e abolire la proprietà privata dei mezzi di produzione.",
  perche: "Pochi pensatori hanno cambiato tanto la politica reale: dalle sue idee nascono i partiti socialisti e comunisti, le rivoluzioni russa e cinese e mezzo secolo di Guerra fredda. Anche chi lo rifiuta usa i suoi concetti: classe, capitalismo, sfruttamento.",
  gancio: "In italiano «fare un quarantotto» vuol dire mettere tutto sottosopra: è il ricordo delle rivoluzioni del 1848, l'anno del Manifesto.",
  link: [
    { a: "rivoluzione-russa", tipo: "influenza", perche: "Lenin e i bolscevichi prendono il potere in nome del marxismo: è il primo stato comunista della storia." },
    { a: "rivoluzione-cinese", tipo: "influenza", perche: "Mao adatta il marxismo a un paese di contadini: la rivoluzione la fanno le campagne, non gli operai delle fabbriche." }
  ],
  attualita: [
    { temi: ["communis*", "comunism*", "comunist*", "Marxis*", "marxis*"], perche: "Il comunismo nasce dalle idee di Marx ed Engels (Manifesto del 1848): alcuni paesi, come Cina, Vietnam, Cuba e Corea del Nord, sono ancora governati da partiti comunisti." },
    { temi: ["general strike", "sciopero", "scioperi", "trade union*", "labor union*", "labour union*", "sindacat*"], perche: "Sindacati e scioperi nascono con la classe operaia della rivoluzione industriale; Marx voleva trasformare quelle lotte in una rivoluzione." }
  ],
  domande: [
    { d: "Che cosa vuol dire «fare un quarantotto», e da dove viene?", r: "Mettere tutto sottosopra: ricorda le rivoluzioni che scoppiarono in tutta Europa nel 1848, l'anno del Manifesto di Marx ed Engels." }
  ],
  wiki: { it: "Manifesto del Partito Comunista", en: "The Communist Manifesto", q: "Q40591" },
  fonti: ["Karl Marx", "Moti del 1848"]
});

mattone({
  id: "darwin",
  titolo: "Darwin e l'evoluzione",
  corsia: "idee",
  livello: 1,
  inizio: 1859,
  anno: 1859,
  evento: "Darwin pubblica L'origine delle specie",
  riassunto: "Durante il viaggio intorno al mondo sul Beagle (1831–1836) Charles Darwin osserva fossili e animali, come i fringuelli delle Galápagos, e si convince che le specie cambiano nel tempo. Nel 1859 pubblica L'origine delle specie: gli individui più adatti all'ambiente sopravvivono e si riproducono di più, e così, in tempi lunghissimi, le specie si trasformano. Alfred Russel Wallace arriva alla stessa idea in modo indipendente.",
  perche: "L'evoluzione per selezione naturale è il fondamento di tutta la biologia, dalla medicina alla genetica. Toglie all'essere umano il suo posto speciale nella creazione: siamo parenti delle scimmie antropomorfe e, più alla lontana, di ogni essere vivente.",
  gancio: "Charles Darwin e Abraham Lincoln nascono lo stesso giorno: il 12 febbraio 1809.",
  link: [
    { a: "marx", tipo: "confronto", perche: "Marx ammirava Darwin e gli mandò una copia del Capitale: entrambi vedono la storia, naturale o umana, come trasformazione attraverso la lotta." }
  ],
  attualita: [
    { temi: ["antibiotic resistance", "antimicrobial resistance", "resistenza agli antibiotici", "antibiotico-resisten*", "superbug*", "new species", "nuova specie", "nuove specie", "extinction*", "estinzion*", "biodiversity", "biodiversità", "evolutionary", "dinosaur*"], perche: "La selezione naturale (Darwin, 1859) spiega l'evoluzione delle specie, ma anche perché i batteri diventano resistenti agli antibiotici e i virus cambiano." }
  ],
  domande: [
    { d: "Che cos'è la selezione naturale, in una frase?", r: "Gli individui più adatti al loro ambiente sopravvivono e si riproducono di più; così, generazione dopo generazione, le specie cambiano." }
  ],
  wiki: { it: "L'origine delle specie", en: "On the Origin of Species", q: "Q20124" },
  fonti: ["Charles Darwin"]
});

mattone({
  id: "unita-italia",
  titolo: "L'Unità d'Italia",
  corsia: "europa",
  livello: 1,
  inizio: 1859, fine: 1870,
  anno: 1861,
  evento: "nasce il Regno d'Italia",
  riassunto: "Per secoli l'Italia è divisa in stati diversi, molti sotto influenza straniera. Il Regno di Sardegna, guidato dal primo ministro Cavour, si allea con la Francia e sconfigge l'Austria (1859); nel 1860 Garibaldi con i Mille conquista il Regno delle Due Sicilie. Il 17 marzo 1861 nasce il Regno d'Italia, con re Vittorio Emanuele II. Venezia si aggiunge nel 1866, Roma nel 1870.",
  perche: "Nasce lo stato in cui viviamo, con confini quasi definitivi: Trento e Trieste arriveranno dopo la Prima guerra mondiale. L'unificazione è opera di una minoranza: «fatta l'Italia, bisogna fare gli italiani», come si attribuisce a Massimo d'Azeglio. Il divario tra Nord e Sud diventa subito il grande problema nazionale.",
  gancio: "Il 1861 è un anno globale: nasce l'Italia, negli Stati Uniti inizia la guerra di secessione e in Russia lo zar abolisce la servitù della gleba.",
  link: [
    { a: "prima-guerra-mondiale", tipo: "influenza", perche: "L'Italia entra in guerra nel 1915 anche per completare l'Unità con Trento e Trieste, ancora austriache." }
  ],
  attualita: [
    { paese: true, temi: ["Mezzogiorno", "questione meridionale", "Southern Italy", "Sud Italia", "Meridione", "autonomia differenziata"], perche: "Il divario tra Nord e Sud c'era già al momento dell'Unità (1861) e da allora è il grande problema irrisolto del paese: la «questione meridionale»." }
  ],
  domande: [
    { d: "In che ordine entrano nell'Italia unita Venezia, Roma, Trento e Trieste?", r: "Venezia nel 1866, Roma nel 1870, Trento e Trieste dopo la Prima guerra mondiale (1918)." }
  ],
  wiki: { it: "Proclamazione del Regno d'Italia", en: "Proclamation of the Kingdom of Italy", q: "Q3922436" },
  fonti: ["Risorgimento"]
});

mattone({
  id: "meiji",
  titolo: "Il Giappone si modernizza (Meiji)",
  corsia: "asia",
  livello: 2,
  inizio: 1868, fine: 1912,
  anno: 1868,
  evento: "inizia in Giappone il rinnovamento Meiji",
  riassunto: "Nel 1853 le navi da guerra americane del commodoro Perry costringono il Giappone, chiuso al mondo da oltre due secoli, ad aprirsi al commercio. Per non fare la fine della Cina, nel 1868 un gruppo di riformatori abbatte il potere degli shogun e restituisce il governo all'imperatore Meiji. In una generazione il Giappone importa dall'Occidente industria, ferrovie, esercito, scuola e costituzione.",
  perche: "È il primo paese non occidentale a industrializzarsi. Nel 1905 sconfigge la Russia: per la prima volta in età moderna una potenza asiatica batte una europea. Diventa a sua volta un impero coloniale (Taiwan, Corea, poi Manciuria) e la sua espansione lo porterà alla Seconda guerra mondiale.",
  gancio: "1868, sette anni dopo l'Unità d'Italia: due paesi «nuovi» che corrono per raggiungere Gran Bretagna e Francia.",
  link: [
    { a: "seconda-guerra-mondiale", tipo: "causa", perche: "L'espansionismo dell'Impero giapponese porta all'invasione della Cina (1937) e all'attacco a Pearl Harbor (1941)." }
  ],
  attualita: [
    { paese: true, temi: ["Japan", "Japanese", "Giappone", "giappones*", "Tokyo", "Tokio"], perche: "Il Giappone moderno nasce con il rinnovamento Meiji (1868): in una generazione passa da paese feudale e chiuso a potenza industriale." }
  ],
  wiki: { it: "Rinnovamento Meiji", en: "Meiji Restoration", q: "Q8707" }
});

mattone({
  id: "spartizione-africa",
  titolo: "La spartizione dell'Africa",
  corsia: "africa",
  livello: 1,
  inizio: 1881, fine: 1914,
  anno: 1884,
  evento: "si apre la Conferenza di Berlino sulla spartizione dell'Africa",
  riassunto: "Nel 1870 gli europei controllano circa il 10% dell'Africa, quasi tutto sulle coste; nel 1914 circa il 90%. La Conferenza di Berlino (1884–1885) fissa le regole della corsa: Francia e Gran Bretagna prendono le parti più grandi, Belgio, Germania, Portogallo, Spagna e Italia il resto. Restano indipendenti solo la Liberia e l'Etiopia, che sconfigge l'Italia ad Adua (1896).",
  perche: "Molti confini africani vengono tracciati a tavolino in Europa, dividendo popoli e unendo nemici. Il colonialismo sfrutta risorse e lavoro (nel Congo del re belga Leopoldo II muoiono milioni di persone) e lascia stati fragili, con economie costruite per esportare materie prime.",
  gancio: "Alla Conferenza di Berlino, che decide le sorti dell'Africa, non partecipa nessun africano.",
  link: [
    { a: "decolonizzazione", tipo: "causa", perche: "Gli stati africani indipendenti ereditano i confini tracciati dai colonizzatori." },
    { a: "prima-guerra-mondiale", tipo: "influenza", perche: "La gara per le colonie aumenta le tensioni tra le potenze europee che si scontreranno nel 1914." }
  ],
  attualita: [
    { paese: true, temi: ["@paesiAfricani", "Ethiopia*", "Etiopia", "etiop*"], anche: ["border*", "confin*", "separatis*", "secession*", "ethnic", "etnic*", "rebel*", "ribell*", "militia*", "milizi*", "civil war", "guerra civile", "jihadis*", "insurgen*"], perche: "Molti confini africani furono tracciati dalle potenze europee tra il 1884 e il 1914 senza tener conto di popoli, lingue e regni: diversi conflitti di oggi nascono anche da lì." }
  ],
  domande: [
    { d: "Quali paesi africani restano indipendenti alla vigilia della Prima guerra mondiale?", r: "Solo la Liberia e l'Etiopia, che nel 1896 aveva sconfitto l'Italia ad Adua." }
  ],
  wiki: { it: "Spartizione dell'Africa", en: "Scramble for Africa", q: "Q179848" },
  fonti: ["Conferenza di Berlino (1884)"]
});
