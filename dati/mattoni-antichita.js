/* Mattoni dell'età antica (fino al 476). Formato descritto nel README. */

mattone({
  id: "rivoluzione-agricola",
  titolo: "Nasce l'agricoltura",
  corsia: "medio-oriente",
  livello: 1,
  inizio: -9500, fine: -4500,
  anno: -9500, circa: true,
  evento: "nasce l'agricoltura nella Mezzaluna fertile",
  riassunto: "Nella Mezzaluna fertile, tra gli odierni Iraq, Siria, Turchia e Israele, gli esseri umani iniziano a coltivare cereali e ad allevare animali. Smettono di spostarsi continuamente e costruiscono i primi villaggi stabili. L'agricoltura nasce poi in modo indipendente anche in Cina, in Mesoamerica, nelle Ande e in Nuova Guinea.",
  perche: "Con l'agricoltura si producono più cibo e scorte: la popolazione cresce, nascono le città, la proprietà, le gerarchie sociali, gli eserciti e, per tenere i conti, la scrittura. Quasi tutto ciò che chiamiamo civiltà parte da qui.",
  gancio: "Homo sapiens esiste da circa 300.000 anni, ma coltiva la terra solo da circa 11.500: meno del 4% della sua storia.",
  link: [
    { a: "scrittura", tipo: "causa", perche: "Le eccedenze agricole vanno contate e registrate: le prime tavolette scritte sono soprattutto conti di grano e bestiame." }
  ],
  domande: [
    { d: "Dove nasce per prima l'agricoltura?", r: "Nella Mezzaluna fertile, in Medio Oriente, intorno al 9500 a.C. Poi nasce in modo indipendente in Cina, nelle Americhe e altrove." }
  ],
  wiki: { it: "Rivoluzione neolitica", en: "Neolithic Revolution", q: "Q180548" },
  fonti: ["Mezzaluna Fertile"]
});

mattone({
  id: "scrittura",
  breve: "Scrittura",
  titolo: "Nasce la scrittura",
  corsia: "medio-oriente",
  livello: 1, fisso: true,
  inizio: -3200,
  anno: -3200, circa: true,
  evento: "nasce la scrittura in Mesopotamia",
  riassunto: "In Mesopotamia, l'odierno Iraq, i Sumeri incidono segni su tavolette d'argilla: è la scrittura cuneiforme. Quasi negli stessi anni l'Egitto sviluppa i geroglifici. Più tardi la scrittura nasce in modo indipendente in Cina (intorno al 1200 a.C.) e in Mesoamerica.",
  perche: "Per convenzione la storia comincia con la scrittura: prima c'è la preistoria. Scrivere permette di amministrare stati, fissare leggi (come il codice di Hammurabi, intorno al 1754 a.C.), conservare la memoria e trasmettere il sapere oltre la vita di chi lo possiede.",
  gancio: "L'antichità è lunghissima: Cleopatra, morta nel 30 a.C., è vissuta più vicino a noi che alla costruzione della Grande Piramide (intorno al 2560 a.C.).",
  link: [
    { a: "stampa", tipo: "influenza", perche: "La stampa è la seconda grande rivoluzione della parola scritta: la scrittura smette di essere un privilegio di pochi." }
  ],
  domande: [
    { d: "Che cosa separa la preistoria dalla storia?", r: "La nascita della scrittura, intorno al 3200 a.C. in Mesopotamia e in Egitto." }
  ],
  wiki: { it: "Storia della scrittura", en: "History of writing", q: "Q1340267" },
  fonti: ["Scrittura cuneiforme"]
});

mattone({
  id: "atene-democrazia",
  titolo: "Atene inventa la democrazia",
  corsia: "europa",
  livello: 1,
  inizio: -508, fine: -322,
  anno: -508,
  evento: "Clistene introduce la democrazia ad Atene",
  riassunto: "Con le riforme di Clistene (508 a.C.) i cittadini ateniesi decidono direttamente in assemblea leggi, guerre e magistrati, molti dei quali estratti a sorte. Nel V secolo a.C., l'età di Pericle, Atene respinge i Persiani (Maratona 490 a.C., Salamina 480 a.C.), costruisce il Partenone e diventa il centro culturale della Grecia.",
  perche: "È il primo esperimento documentato di governo del popolo, e la parola stessa è greca: demos, popolo, e kratos, potere. Era una democrazia limitata, perché donne, schiavi e stranieri ne erano esclusi. Ogni dibattito sulla democrazia, ancora oggi, si confronta con quel modello.",
  gancio: "Due esperimenti quasi gemelli: Roma caccia il suo ultimo re e diventa repubblica nel 509 a.C., Atene diventa democrazia l'anno dopo, nel 508 a.C.",
  link: [
    { a: "filosofia-greca", tipo: "influenza", perche: "Nella libera discussione della città democratica nasce la filosofia di Socrate, che proprio la democrazia condannerà a morte nel 399 a.C." }
  ],
  attualita: [
    { temi: ["democracy", "pro-democracy", "democrazia", "democratic backsliding", "referendum", "sortition", "sorteggio"], perche: "Ad Atene i cittadini votavano direttamente in assemblea e molte cariche si assegnavano per sorteggio: il referendum è un'eredità di quella democrazia diretta." }
  ],
  domande: [
    { d: "Chi era escluso dalla democrazia ateniese?", r: "Donne, schiavi e stranieri residenti (i meteci): votava solo una minoranza di cittadini maschi adulti." }
  ],
  wiki: { it: "Democrazia ateniese", en: "Athenian democracy", q: "Q223767" },
  fonti: ["Clistene"]
});

mattone({
  id: "confucio-buddha",
  titolo: "Confucio e Buddha",
  corsia: "asia",
  livello: 2,
  inizio: -560, fine: -400,
  anno: -551, chiediAnno: false,
  etichetta: "VI–V secolo a.C.",
  evento: "nasce Confucio",
  riassunto: "Tra VI e V secolo a.C., in luoghi lontanissimi e senza contatti, nascono dottrine che guidano ancora miliardi di persone. In Cina Confucio insegna il rispetto dei ruoli sociali, lo studio e il buon governo. In India Siddhartha Gautama, il Buddha, insegna come liberarsi dalla sofferenza. Negli stessi decenni in Grecia nasce la filosofia.",
  perche: "Il confucianesimo ha plasmato per due millenni lo stato e la famiglia in Cina, Corea, Giappone e Vietnam; il buddismo si è diffuso in tutta l'Asia. Il filosofo Karl Jaspers chiamò questo periodo «età assiale»: l'asse attorno a cui ruota il pensiero umano.",
  gancio: "Confucio (551–479 a.C.) muore appena dieci anni prima che nasca Socrate (469 a.C.): Oriente e Occidente iniziano a «pensare» quasi insieme.",
  link: [
    { a: "filosofia-greca", tipo: "confronto", perche: "Stesso periodo, stesse domande: come vivere bene e come governare. Ma nessun contatto tra i due mondi." }
  ],
  attualita: [
    { temi: ["Buddhis*", "buddis*", "Dalai Lama", "Tibet*"], perche: "Il buddismo nasce in India nel V secolo a.C. con Siddhartha Gautama e si diffonde in tutta l'Asia; il Dalai Lama è la guida del buddismo tibetano." }
  ],
  domande: [
    { d: "Che cos'è l'«età assiale»?", r: "Il periodo (circa VIII–III secolo a.C.) in cui nascono quasi insieme, e indipendentemente, il pensiero di Confucio in Cina, il buddismo in India e la filosofia in Grecia." }
  ],
  wiki: { it: "Periodo assiale", en: "Axial Age", q: "Q340742" },
  fonti: ["Confucio", "Gautama Buddha"]
});

mattone({
  id: "filosofia-greca",
  titolo: "Socrate, Platone, Aristotele",
  corsia: "idee",
  livello: 1,
  inizio: -469, fine: -322,
  anno: -399,
  evento: "Socrate viene condannato a morte ad Atene",
  riassunto: "Tre generazioni di maestri e allievi fondano la filosofia occidentale. Socrate interroga gli ateniesi e non scrive nulla; condannato a morte nel 399 a.C., beve la cicuta. Il suo allievo Platone fonda l'Accademia. L'allievo di Platone, Aristotele, studia logica, politica, biologia ed etica, ed è il precettore di Alessandro Magno.",
  perche: "Il modo occidentale di ragionare viene da qui: definire i concetti, argomentare, distinguere il vero dal verosimile. Per quasi duemila anni Aristotele è stato «il filosofo» per eccellenza, nel mondo islamico come in quello cristiano.",
  gancio: "Socrate, Platone e Aristotele sono una catena maestro-allievo: S, P, A, come la sigla di una società per azioni.",
  link: [
    { a: "rinascimento", tipo: "influenza", perche: "Il Rinascimento riscopre i testi greci: a Firenze Marsilio Ficino traduce tutto Platone in latino." },
    { a: "rivoluzione-scientifica", tipo: "influenza", perche: "Per secoli la fisica di Aristotele è indiscussa: la scienza moderna nasce smontandola, con Galileo e Newton." }
  ],
  domande: [
    { d: "Qual è il legame tra Socrate, Platone e Aristotele?", r: "Maestro e allievi: Platone è allievo di Socrate, Aristotele è allievo di Platone (S, P, A)." }
  ],
  wiki: { it: "Socrate", en: "Socrates", q: "Q913" },
  fonti: ["Platone", "Aristotele"]
});

mattone({
  id: "unificazione-cina",
  titolo: "La Cina si unifica",
  corsia: "asia",
  livello: 1,
  inizio: -221, fine: 220,
  anno: -221,
  evento: "il re di Qin unifica la Cina e diventa il primo imperatore",
  riassunto: "Nel 221 a.C. il re di Qin conquista gli altri regni cinesi e si proclama primo imperatore (Qin Shi Huang). Unifica scrittura, monete, pesi e misure, collega le mura difensive che diventeranno la Grande Muraglia e si fa seppellire con l'esercito di terracotta. La dinastia Han (202 a.C.–220 d.C.) consolida l'impero e apre la Via della seta.",
  perche: "Da allora l'idea di una Cina unita sotto un solo governo è il fondamento dello stato cinese: le divisioni sono viste come parentesi da chiudere. Il nome «Cina» viene probabilmente da Qin, e la maggioranza dei cinesi chiama ancora se stessa «Han».",
  gancio: "L'Impero Han e l'Impero romano sono contemporanei e grandi più o meno uguali: si conoscevano appena, attraverso i mercanti della seta.",
  link: [
    { a: "augusto", tipo: "confronto", perche: "Due imperi gemelli ai due capi dell'Eurasia, collegati solo dalla Via della seta." },
    { a: "rivoluzione-cinese", tipo: "influenza", perche: "L'ideale di una Cina unita e forte guida anche Mao e i suoi successori: per questo Pechino considera Taiwan una provincia da riunire." }
  ],
  wiki: { it: "Qin Shi Huang", en: "Qin Shi Huang", q: "Q7192" },
  fonti: ["Dinastia Han"]
});

mattone({
  id: "augusto",
  breve: "Augusto",
  titolo: "Augusto e l'Impero romano",
  corsia: "europa",
  livello: 1, fisso: true,
  inizio: -27, fine: 476,
  anno: -27,
  evento: "Ottaviano riceve il titolo di Augusto: nasce l'Impero romano",
  riassunto: "Dopo un secolo di guerre civili e l'assassinio di Giulio Cesare (44 a.C.), Ottaviano sconfigge Antonio e Cleopatra ad Azio (31 a.C.) e nel 27 a.C. riceve dal Senato il titolo di Augusto: la Repubblica diventa di fatto una monarchia. Comincia la pax romana, due secoli di relativa pace in un impero che va dalla Britannia all'Egitto, unito da strade, leggi, latino e greco.",
  perche: "Il diritto romano è alla base dei codici civili europei, compreso quello italiano; il latino è il padre delle lingue romanze; strade e città romane disegnano ancora la mappa d'Europa. Ed è in questo impero unito e pacificato che il cristianesimo può diffondersi.",
  gancio: "Gesù nasce sotto Augusto: per questo l'inizio dell'Impero coincide, più o meno, con il passaggio da a.C. a d.C. E il mese di agosto porta il suo nome.",
  link: [
    { a: "cristianesimo-impero", tipo: "causa", perche: "Strade sicure, una lingua comune e città collegate permettono al cristianesimo di diffondersi in tutto il Mediterraneo." },
    { a: "napoleone", tipo: "influenza", perche: "Napoleone imita Roma: si fa imperatore, costruisce archi di trionfo e dà all'Europa un codice ispirato al diritto romano." }
  ],
  domande: [
    { d: "Quali due cose del nostro calendario risalgono ad Augusto?", r: "Il mese di agosto, che porta il suo nome, e indirettamente il passaggio da a.C. a d.C., perché Gesù nasce durante il suo regno." }
  ],
  wiki: { it: "Augusto", en: "Augustus", q: "Q1405" },
  fonti: ["Impero romano"]
});

mattone({
  id: "cristianesimo-impero",
  titolo: "Il cristianesimo conquista l'Impero",
  corsia: "europa",
  livello: 1,
  inizio: 313, fine: 380,
  anno: 313,
  evento: "Costantino concede la libertà di culto ai cristiani con l'editto di Milano",
  riassunto: "Per tre secoli i cristiani sono una minoranza a tratti perseguitata. Nel 313 l'imperatore Costantino, con l'editto di Milano, concede la libertà di culto; nel 380, con l'editto di Tessalonica, Teodosio fa del cristianesimo la religione ufficiale dell'Impero. In meno di settant'anni i perseguitati diventano la religione di stato.",
  perche: "La Chiesa si organizza ricalcando l'amministrazione imperiale (le «diocesi» erano circoscrizioni romane). Quando l'Impero d'Occidente crolla, è lei a conservare cultura, latino e istituzioni: da qui viene il ruolo centrale della Chiesa in tutta la storia europea.",
  gancio: "313 è un numero palindromo (si legge uguale da destra a sinistra): da quell'anno i cristiani sono liberi, dal 380 sono la religione dell'Impero.",
  link: [
    { a: "carlo-magno", tipo: "influenza", perche: "L'alleanza tra il papa e i re franchi culmina nell'incoronazione di Carlo Magno, la notte di Natale dell'800." }
  ],
  attualita: [
    { temi: ["Pope", "papal", "Vatican", "Holy See", "Catholic*", "Papa", "Vaticano", "Santa Sede", "cattolic*", "conclave"], perche: "La Chiesa cattolica si è strutturata dentro l'Impero romano: dal IV secolo il cristianesimo è religione di stato e il vescovo di Roma, il papa, eredita il prestigio della capitale." }
  ],
  wiki: { it: "Editto di Milano", en: "Edict of Milan", q: "Q180764" },
  fonti: ["Editto di Tessalonica"]
});

mattone({
  id: "caduta-roma",
  breve: "Caduta di Roma",
  titolo: "Cade l'Impero romano d'Occidente",
  corsia: "europa",
  livello: 1, fisso: true,
  inizio: 476,
  anno: 476,
  evento: "cade l'Impero romano d'Occidente",
  riassunto: "Indebolito da crisi economiche, guerre civili e pressioni dei popoli germanici, l'Impero d'Occidente si sgretola per tutto il V secolo: Roma è saccheggiata dai Visigoti nel 410 e dai Vandali nel 455. Nel 476 il capo germanico Odoacre depone l'ultimo imperatore, il giovane Romolo Augustolo, e non ne nomina un altro. In Oriente l'Impero romano continua, con capitale Costantinopoli, per quasi mille anni.",
  perche: "Per convenzione segna la fine dell'età antica e l'inizio del Medioevo. L'Europa occidentale si divide in regni romano-germanici, da cui nascono i futuri popoli europei (Franchi, Goti, Longobardi), mentre la Chiesa diventa l'unica istituzione rimasta in piedi.",
  gancio: "L'ultimo imperatore si chiama Romolo Augustolo: porta i nomi del fondatore di Roma (Romolo) e del primo imperatore (Augusto). La storia di Roma finisce con i nomi con cui era cominciata.",
  link: [
    { a: "carlo-magno", tipo: "causa", perche: "Nel vuoto lasciato da Roma crescono i regni germanici; il più forte, quello dei Franchi, rifonda un impero in Occidente con Carlo Magno." },
    { a: "costantinopoli", tipo: "confronto", perche: "Le due cadute di Roma: l'Impero d'Oriente sopravvive a quello d'Occidente per altri 977 anni, fino al 1453." }
  ],
  domande: [
    { d: "Nel 476 finisce tutto l'Impero romano?", r: "No, solo quello d'Occidente. L'Impero d'Oriente (bizantino), con capitale Costantinopoli, dura fino al 1453." }
  ],
  wiki: { it: "Caduta dell'Impero romano d'Occidente", en: "Fall of the Western Roman Empire", q: "Q608613" }
});
