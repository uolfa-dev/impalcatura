/* Mattoni del primo Novecento (1900–1939). */

mattone({
  id: "einstein",
  titolo: "Einstein e la relatività",
  corsia: "idee",
  livello: 1,
  inizio: 1905, fine: 1915,
  anno: 1905,
  evento: "Einstein pubblica la teoria della relatività ristretta",
  riassunto: "Nel 1905, impiegato all'ufficio brevetti di Berna, Albert Einstein pubblica quattro articoli che rivoluzionano la fisica, tra cui la relatività ristretta: spazio e tempo non sono assoluti, e massa ed energia sono equivalenti (E = mc²). Nel 1915 la relatività generale descrive la gravità come curvatura dello spazio-tempo. Negli stessi anni nasce la meccanica quantistica (Planck, 1900).",
  perche: "Con la fisica quantistica, la relatività è la base della fisica moderna: senza di lei non capiremmo l'energia nucleare, il GPS (che corregge ogni giorno gli effetti relativistici) o la cosmologia del Big Bang. Einstein diventa il simbolo stesso del genio scientifico.",
  gancio: "Il 1905 è l'«anno mirabile» di Einstein: ha 26 anni e non lavora in un'università, ma in un ufficio brevetti.",
  link: [
    { a: "guerra-fredda", tipo: "influenza", perche: "E = mc² apre la strada alla bomba atomica: la paura delle armi nucleari domina la Guerra fredda." }
  ],
  attualita: [
    { temi: ["nuclear", "nucleare", "nucleari", "atomic", "atomica", "atomiche", "uranium", "uranio", "enrichment", "arricchimento", "Hiroshima", "Nagasaki", "IAEA", "AIEA"], perche: "Bombe e centrali nucleari nascono dalla fisica del primo Novecento: E = mc² (Einstein, 1905) dice quanta energia si nasconde nella materia. La prima bomba atomica usata in guerra cade su Hiroshima il 6 agosto 1945." },
    { temi: ["black hole*", "buco nero", "buchi neri", "gravitational wave*", "onde gravitazionali", "GPS", "spacetime", "spazio-tempo"], perche: "Buchi neri, onde gravitazionali e la precisione del GPS sono conseguenze della relatività di Einstein (1905 e 1915)." }
  ],
  domande: [
    { d: "Che cosa dice, a parole, E = mc²?", r: "Che massa ed energia sono la stessa cosa: anche una piccola quantità di materia contiene un'enorme quantità di energia (c², la velocità della luce al quadrato, è un numero gigantesco)." }
  ],
  wiki: { it: "Relatività ristretta", en: "Special relativity", q: "Q11455" },
  fonti: ["Albert Einstein"]
});

mattone({
  id: "prima-guerra-mondiale",
  titolo: "La Prima guerra mondiale",
  corsia: "europa",
  livello: 1,
  inizio: 1914, fine: 1918,
  anno: 1914,
  evento: "inizia la Prima guerra mondiale",
  riassunto: "Il 28 giugno 1914 a Sarajevo un nazionalista serbo-bosniaco uccide l'erede al trono d'Austria-Ungheria. Il gioco delle alleanze trascina in guerra le grandi potenze: Germania e Austria-Ungheria, con l'Impero ottomano, contro Francia, Gran Bretagna e Russia, a cui si uniscono l'Italia (1915) e gli Stati Uniti (1917). Quattro anni di trincee, gas e mitragliatrici uccidono circa 10 milioni di soldati.",
  perche: "Crollano quattro imperi: tedesco, austro-ungarico, russo e ottomano. Dalle loro rovine nascono la Russia sovietica, nuovi stati in Europa orientale e un nuovo Medio Oriente; il rancore dei vinti e la crisi del dopoguerra aprono la strada al fascismo, al nazismo e a una seconda guerra mondiale.",
  gancio: "Per l'Italia la guerra finisce il 4 novembre 1918 (Vittorio Veneto), per tutti gli altri l'11 novembre, all'undicesima ora dell'undicesimo giorno dell'undicesimo mese.",
  link: [
    { a: "rivoluzione-russa", tipo: "causa", perche: "La guerra dissangua la Russia: fame e sconfitte fanno cadere lo zar nel 1917." },
    { a: "crollo-ottomano", tipo: "causa", perche: "L'Impero ottomano entra in guerra accanto alla Germania e ne esce smembrato." },
    { a: "fascismo", tipo: "causa", perche: "Reduci delusi, crisi economica e paura della rivoluzione: nel dopoguerra italiano nasce il fascismo." }
  ],
  attualita: [
    { temi: ["World War I", "First World War", "Prima guerra mondiale", "Grande Guerra", "Armistice Day", "Remembrance Day", "Sarajevo"], perche: "La Prima guerra mondiale (1914–1918) è la catastrofe da cui nasce il Novecento: senza di lei non si capiscono né la Russia sovietica, né il fascismo, né il Medio Oriente di oggi." }
  ],
  domande: [
    { d: "Quali quattro imperi crollano con la Prima guerra mondiale?", r: "L'Impero tedesco, quello austro-ungarico, quello russo e quello ottomano." }
  ],
  wiki: { it: "Prima guerra mondiale", en: "World War I", q: "Q361" }
});

mattone({
  id: "crollo-ottomano",
  titolo: "La spartizione dell'Impero ottomano",
  corsia: "medio-oriente",
  livello: 1,
  inizio: 1916, fine: 1923,
  anno: 1916,
  evento: "Francia e Gran Bretagna si accordano in segreto per spartirsi il Medio Oriente (accordo Sykes-Picot)",
  riassunto: "L'Impero ottomano entra nella Prima guerra mondiale accanto alla Germania e la perde. Già nel 1916 Francia e Gran Bretagna si accordano in segreto (accordo Sykes-Picot) per dividersi le sue province arabe; nel 1917 Londra promette un «focolare nazionale ebraico» in Palestina (dichiarazione Balfour). Dopo la guerra nascono i mandati francesi (Siria, Libano) e britannici (Iraq, Palestina, Transgiordania), mentre in Anatolia Atatürk fonda la Repubblica di Turchia (1923).",
  perche: "I confini di Siria, Iraq, Libano, Giordania, Israele e Palestina nascono qui, decisi in buona parte da potenze europee. Gli arabi, a cui era stata promessa l'indipendenza, si sentono traditi e i curdi restano senza uno stato. Molti conflitti del Medio Oriente di oggi partono da questa spartizione.",
  gancio: "Il trattato di Sèvres (1920) prevedeva uno stato curdo; tre anni dopo il trattato di Losanna (1923) lo cancellò.",
  link: [
    { a: "israele-1948", tipo: "causa", perche: "Con la dichiarazione Balfour (1917) e il mandato britannico sulla Palestina comincia il percorso che porta alla nascita di Israele." }
  ],
  attualita: [
    { paese: true, temi: ["Syria*", "Siria", "sirian*", "Damascus", "Damasco", "Iraq*", "irachen*", "Baghdad", "Lebanon", "Lebanese", "Libano", "libanes*", "Beirut", "Kurd*", "curdo", "curda", "curdi", "curde", "Jordanian", "Giordania", "giordan*", "Sykes*", "Ottoman", "ottoman*"], perche: "Siria, Iraq, Libano e Giordania nascono dalla spartizione dell'Impero ottomano dopo la Prima guerra mondiale: i confini li decisero soprattutto Francia e Gran Bretagna (Sykes-Picot, 1916). I curdi rimasero senza uno stato." },
    { paese: true, temi: ["Turkey", "Turkish", "Türkiye", "Turchia", "turco", "turca", "turchi", "turche", "Erdoğan", "Erdogan", "Ankara"], perche: "La Turchia moderna nasce nel 1923 dalle rovine dell'Impero ottomano: Atatürk ne fa una repubblica laica e nazionale, un modello che il paese discute ancora oggi." }
  ],
  domande: [
    { d: "Che cosa decide l'accordo Sykes-Picot del 1916?", r: "Che Francia e Gran Bretagna si divideranno le province arabe dell'Impero ottomano: da lì nascono i confini di Siria, Libano, Iraq e Giordania." }
  ],
  wiki: { it: "Spartizione dell'Impero ottomano", en: "Partition of the Ottoman Empire", q: "Q1145246" },
  fonti: ["Accordo Sykes-Picot", "Impero ottomano"]
});

mattone({
  id: "rivoluzione-russa",
  titolo: "La Rivoluzione russa",
  corsia: "europa",
  livello: 1,
  inizio: 1917, fine: 1922,
  anno: 1917,
  evento: "i bolscevichi di Lenin prendono il potere in Russia",
  riassunto: "Stremata dalla guerra, nel febbraio 1917 la Russia rovescia lo zar Nicola II. In ottobre i bolscevichi di Lenin prendono il potere con un colpo di mano e, dopo una sanguinosa guerra civile, fondano nel 1922 l'Unione Sovietica (URSS), il primo stato comunista. Con Stalin diventa una dittatura totalitaria che industrializza il paese a tappe forzate, con milioni di morti nei gulag e nelle carestie.",
  perche: "Per settant'anni il comunismo sovietico è l'alternativa al capitalismo e alle democrazie liberali, e divide il mondo nella Guerra fredda. Ispira partiti comunisti ovunque, Italia compresa, e rivoluzioni come quella cinese.",
  gancio: "La «Rivoluzione d'ottobre» si festeggiava a novembre: la Russia usava ancora il vecchio calendario giuliano, 13 giorni indietro rispetto al nostro.",
  link: [
    { a: "guerra-fredda", tipo: "causa", perche: "Lo scontro tra l'URSS comunista e gli Stati Uniti capitalisti domina il mondo dopo il 1945." },
    { a: "fascismo", tipo: "influenza", perche: "La paura di una rivoluzione «come in Russia», durante gli scioperi del biennio rosso (1919–1920), spinge industriali e ceti medi italiani verso il fascismo." }
  ],
  wiki: { it: "Rivoluzione russa", en: "Russian Revolution", q: "Q8729" }
});

mattone({
  id: "fascismo",
  titolo: "Fascismo e nazismo",
  corsia: "europa",
  livello: 1,
  inizio: 1922, fine: 1945,
  anno: 1922,
  evento: "Mussolini va al potere dopo la Marcia su Roma",
  riassunto: "Nell'Italia del dopoguerra, tra crisi economica, scioperi e paura del comunismo, Benito Mussolini guida squadre armate contro socialisti e sindacati. Dopo la Marcia su Roma (ottobre 1922) il re gli affida il governo e nel 1925 Mussolini instaura la dittatura. Il nazismo di Hitler, al potere in Germania dal 1933, si ispira al fascismo e lo radicalizza con il razzismo biologico.",
  perche: "Il fascismo inventa il totalitarismo di destra: partito unico, culto del capo, propaganda di massa, violenza contro gli oppositori. Nel 1938 l'Italia vara le leggi razziali e l'alleanza con Hitler la porta nella Seconda guerra mondiale. La Costituzione italiana nasce proprio come risposta al fascismo.",
  gancio: "Mussolini governa per circa vent'anni, dal 1922 al 1943: per questo quel periodo si chiama «Ventennio».",
  link: [
    { a: "seconda-guerra-mondiale", tipo: "causa", perche: "Le dittature fascista e nazista, nazionaliste e aggressive, scatenano la Seconda guerra mondiale." },
    { a: "repubblica-italiana", tipo: "causa", perche: "Dalla caduta del fascismo e dalla Resistenza nascono la Repubblica e una Costituzione antifascista." }
  ],
  attualita: [
    { temi: ["fascis*", "Mussolini", "neo-fascis*", "neofascis*", "Nazi*", "nazis*", "neo-Nazi*", "neonazis*", "Hitler"], perche: "Il fascismo nasce in Italia con Mussolini (1922) e il nazismo tedesco ne riprende il modello nel 1933: da allora «fascista» indica i regimi autoritari, nazionalisti e violenti." }
  ],
  domande: [
    { d: "Che cos'è il «Ventennio»?", r: "Il periodo della dittatura fascista in Italia, dalla Marcia su Roma (1922) alla caduta di Mussolini (1943)." }
  ],
  wiki: { it: "Fascismo", en: "Fascism", q: "Q6223" },
  fonti: ["Marcia su Roma", "Nazionalsocialismo"]
});

mattone({
  id: "crisi-1929",
  titolo: "La crisi del 1929",
  corsia: "mondo",
  livello: 1,
  inizio: 1929, fine: 1939,
  anno: 1929,
  evento: "crolla la Borsa di Wall Street e inizia la Grande depressione",
  riassunto: "Nell'ottobre 1929 crolla la Borsa di New York. Banche fallite, crediti ritirati e consumi in caduta portano la crisi in tutto il mondo: negli Stati Uniti un lavoratore su quattro resta disoccupato. I paesi si chiudono con dazi altissimi, come quelli della legge americana Smoot-Hawley (1930), e il commercio mondiale crolla. Il presidente Roosevelt risponde con il New Deal, un vasto programma di intervento pubblico.",
  perche: "La disoccupazione di massa favorisce gli estremismi: in Germania porta al potere Hitler (1933). Dalla crisi nascono la politica economica moderna, con stati e banche centrali che intervengono contro le recessioni (Keynes), e la lezione che il protezionismo può trasformare una crisi in una catastrofe.",
  gancio: "Il crollo comincia il «giovedì nero», 24 ottobre 1929, e precipita il «martedì nero», 29 ottobre.",
  link: [
    { a: "seconda-guerra-mondiale", tipo: "causa", perche: "La crisi porta Hitler al potere e spinge Germania, Italia e Giappone a cercare risorse e mercati con le armi." }
  ],
  attualita: [
    { temi: ["tariff*", "dazi", "dazio", "protectionis*", "protezionis*", "trade war", "guerra commerciale", "guerra dei dazi"], perche: "Nel 1930 gli Stati Uniti alzarono i dazi (legge Smoot-Hawley), gli altri paesi risposero e il commercio mondiale crollò: è l'esempio classico di come una guerra commerciale possa aggravare una crisi." },
    { temi: ["recession*", "recessione", "stock market crash", "market crash", "crollo della Borsa", "crollo delle Borse", "financial crisis", "crisi finanziaria", "Great Depression", "Grande depressione", "central bank*", "banca centrale", "banche centrali", "Federal Reserve", "European Central Bank", "BCE", "ECB", "interest rate*", "tassi di interesse", "inflation", "inflazione"], perche: "Dalla crisi del 1929 nasce la politica economica moderna: governi e banche centrali intervengono per evitare che un crollo finanziario diventi una depressione." }
  ],
  wiki: { it: "Grande depressione", en: "Great Depression", q: "Q8698" }
});
