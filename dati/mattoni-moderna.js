/* Mattoni dell'età moderna (1492–1789). */

mattone({
  id: "rinascimento",
  titolo: "Il Rinascimento",
  corsia: "idee",
  livello: 1,
  inizio: 1400, fine: 1550,
  anno: 1504, chiediAnno: false,
  etichetta: "XV–XVI secolo",
  evento: "Michelangelo completa il David a Firenze",
  riassunto: "Tra Quattrocento e Cinquecento, partendo da Firenze, artisti e intellettuali riscoprono l'antichità greco-romana e mettono l'essere umano al centro. Brunelleschi studia la prospettiva e costruisce la cupola del Duomo; Leonardo, Michelangelo e Raffaello portano l'arte a un livello mai visto. Il movimento si diffonde in tutta Europa, anche grazie alla stampa.",
  perche: "Nasce l'idea moderna dell'individuo creativo, dell'artista come genio e della conoscenza basata sull'osservazione: sono le premesse della rivoluzione scientifica. Per secoli l'Italia del Rinascimento è il modello culturale dell'Europa.",
  gancio: "Intorno al 1500, a Firenze, Leonardo e Michelangelo lavorano negli stessi anni: nel 1504 il David viene collocato in piazza della Signoria, mentre Leonardo dipinge la Gioconda.",
  link: [
    { a: "rivoluzione-scientifica", tipo: "influenza", perche: "Osservare la natura invece di fidarsi solo dei libri antichi: Leonardo anticipa l'atteggiamento di Galileo." }
  ],
  domande: [
    { d: "Da quale città parte il Rinascimento, e che cosa «rinasce»?", r: "Da Firenze, nel Quattrocento: rinasce l'interesse per l'arte e la cultura dell'antichità greco-romana, con l'essere umano al centro." }
  ],
  wiki: { it: "Rinascimento", en: "Renaissance", q: "Q4692" }
});

mattone({
  id: "colombo-1492",
  breve: "Colombo",
  titolo: "Colombo arriva nelle Americhe",
  corsia: "americhe",
  livello: 1, fisso: true,
  inizio: 1492,
  anno: 1492,
  evento: "Cristoforo Colombo sbarca nelle Americhe",
  riassunto: "Il 12 ottobre 1492 il genovese Cristoforo Colombo, al servizio dei re di Spagna, sbarca alle Bahamas convinto di essere arrivato in Asia. In pochi decenni gli spagnoli conquistano gli imperi azteco (1521) e inca (1532–1533) e il Portogallo si prende il Brasile. Le malattie portate dagli europei, come il vaiolo, uccidono gran parte delle popolazioni indigene.",
  perche: "Per convenzione inizia l'età moderna. Due mondi rimasti separati per millenni si collegano: patate, mais e pomodori arrivano in Europa, cavalli e grano in America (lo «scambio colombiano»). L'Europa diventa il centro di un sistema mondiale e con le colonie nasce la tratta atlantica degli schiavi.",
  gancio: "1492, un anno pieno: la Spagna conquista Granada, ultimo regno musulmano della penisola, espelle gli ebrei e finanzia Colombo; a Firenze muore Lorenzo il Magnifico.",
  link: [
    { a: "tratta-atlantica", tipo: "causa", perche: "Le piantagioni del Nuovo Mondo richiedono manodopera: dal Cinquecento milioni di africani vengono deportati nelle Americhe." },
    { a: "indipendenze-latinoamericane", tipo: "causa", perche: "Gli imperi coloniali spagnolo e portoghese nati dopo il 1492 durano tre secoli, fino alle indipendenze dell'Ottocento." }
  ],
  attualita: [
    { temi: ["indigen*", "Native American*", "nativi americani", "Columbus Day", "Indigenous Peoples' Day"], perche: "Dal 1492 la conquista europea e le malattie del Vecchio Mondo fanno crollare le popolazioni indigene delle Americhe, in alcune regioni anche del 90%: le loro rivendicazioni di oggi partono da lì." }
  ],
  wiki: { it: "Primo viaggio di Cristoforo Colombo", en: "Voyages of Christopher Columbus", q: "Q3771259" },
  fonti: ["Cristoforo Colombo"]
});

mattone({
  id: "riforma-protestante",
  titolo: "La Riforma protestante",
  corsia: "europa",
  livello: 1,
  inizio: 1517, fine: 1648,
  anno: 1517,
  evento: "Lutero diffonde le sue 95 tesi contro la vendita delle indulgenze",
  riassunto: "Nel 1517 il monaco tedesco Martin Lutero contesta la vendita delle indulgenze con 95 tesi. Sostiene che ci si salva per fede e non per opere, e che ogni cristiano può leggere da sé la Bibbia, che traduce in tedesco. La Chiesa lo scomunica, ma molti principi tedeschi lo proteggono: l'Europa si divide tra cattolici e protestanti (luterani, calvinisti, anglicani).",
  perche: "Finisce l'unità religiosa dell'Europa occidentale. Seguono oltre un secolo di guerre di religione, fino alla pace di Vestfalia (1648), e la Controriforma cattolica con il Concilio di Trento. La lettura personale della Bibbia spinge l'alfabetizzazione nei paesi protestanti.",
  gancio: "1517: appena 25 anni dopo Colombo. Senza la stampa, le tesi di Lutero non avrebbero fatto il giro della Germania in poche settimane.",
  link: [
    { a: "indipendenza-usa", tipo: "influenza", perche: "Molti dei primi coloni inglesi in America sono protestanti in cerca di libertà religiosa, come i Padri pellegrini del Mayflower (1620)." }
  ],
  attualita: [
    { temi: ["Protestant*", "protestant*", "Lutheran*", "luteran*", "evangelic*", "Anglican*", "anglican*", "Church of England", "Pentecostal*", "pentecostal*"], perche: "Protestanti, luterani, anglicani ed evangelici nascono tutti dalla Riforma iniziata da Lutero nel 1517; gli evangelici sono oggi una forza politica importante negli Stati Uniti e in America Latina." }
  ],
  domande: [
    { d: "Contro che cosa protesta Lutero nel 1517?", r: "Contro la vendita delle indulgenze, cioè la remissione dei peccati in cambio di denaro. Per lui ci si salva solo per fede." }
  ],
  wiki: { it: "Riforma protestante", en: "Reformation", q: "Q12562" },
  fonti: ["95 tesi di Lutero"]
});

mattone({
  id: "rivoluzione-scientifica",
  titolo: "La rivoluzione scientifica",
  corsia: "idee",
  livello: 1,
  inizio: 1543, fine: 1687,
  anno: 1687,
  evento: "Newton pubblica i Principia, con le leggi del moto e la gravitazione universale",
  riassunto: "Nel 1543 Copernico propone che la Terra giri intorno al Sole. Galileo punta il cannocchiale verso il cielo (1609–1610) e fonda il metodo sperimentale, ma nel 1633 la Chiesa lo costringe ad abiurare. Nel 1687 Newton, con i Principia, spiega con le stesse leggi la caduta di una mela e il moto dei pianeti.",
  perche: "Nasce la scienza moderna: si osserva, si misura, si fanno esperimenti e si descrive la natura con la matematica, invece di affidarsi all'autorità degli antichi. Ogni tecnologia di oggi discende da questo metodo.",
  gancio: "Galileo muore nel 1642, lo stesso anno in cui nasce Newton: il testimone passa dall'Italia all'Inghilterra.",
  link: [
    { a: "illuminismo", tipo: "influenza", perche: "Se la ragione spiega i pianeti, può spiegare anche la società: gli illuministi applicano lo spirito scientifico alla politica, alla religione e all'economia." },
    { a: "rivoluzione-industriale", tipo: "influenza", perche: "Scienza e tecnica si alimentano a vicenda: la macchina a vapore nasce in un ambiente di sperimentatori e di misure precise." },
    { a: "einstein", tipo: "confronto", perche: "Dopo oltre due secoli Einstein supera Newton: la relatività corregge la sua gravitazione, che resta valida nella vita di tutti i giorni." }
  ],
  domande: [
    { d: "Che cosa unifica Newton nei Principia?", r: "La fisica della Terra e quella del cielo: la stessa gravitazione fa cadere una mela e tiene la Luna in orbita." }
  ],
  wiki: { it: "Rivoluzione scientifica", en: "Scientific Revolution", q: "Q214078" },
  fonti: ["Galileo Galilei", "Philosophiae Naturalis Principia Mathematica"]
});

mattone({
  id: "tratta-atlantica",
  titolo: "La tratta atlantica degli schiavi",
  corsia: "africa",
  livello: 1,
  inizio: 1500, fine: 1867,
  anno: 1750, circa: true,
  etichetta: "XVI–XIX secolo (picco nel Settecento)",
  evento: "la tratta atlantica degli schiavi raggiunge il suo picco",
  riassunto: "Dal Cinquecento all'Ottocento oltre 12 milioni di africani vengono imbarcati verso le Americhe; quasi 2 milioni muoiono durante la traversata. Lavorano come schiavi nelle piantagioni di zucchero, tabacco e cotone del Brasile, dei Caraibi e degli Stati Uniti. Il commercio è «triangolare»: merci europee in Africa, schiavi in America, prodotti coloniali in Europa.",
  perche: "È all'origine della popolazione afrodiscendente delle Americhe, del razzismo moderno inventato per giustificarla e di una parte della ricchezza europea. L'abolizione arriva tardi: Regno Unito 1833, Stati Uniti 1865, Brasile 1888.",
  gancio: "Il Brasile, che ricevette quasi la metà degli africani deportati, fu l'ultimo paese delle Americhe ad abolire la schiavitù, nel 1888.",
  link: [
    { a: "spartizione-africa", tipo: "confronto", perche: "Prima gli europei portano via gli africani, poi, alla fine dell'Ottocento, si prendono l'Africa stessa." }
  ],
  attualita: [
    { temi: ["slavery", "schiavitù", "slave trade", "tratta degli schiavi", "reparations", "riparazioni", "racism", "racist", "racial", "razzismo", "razzist*", "razzial*", "Black Lives Matter", "Juneteenth", "segregation", "segregazione"], perche: "La tratta atlantica deportò oltre 12 milioni di africani nelle Americhe: razzismo, disuguaglianze e richieste di riparazioni di oggi hanno radici in quella storia." }
  ],
  domande: [
    { d: "Che cos'era il «commercio triangolare»?", r: "Le navi portavano merci europee in Africa, schiavi africani nelle Americhe e prodotti delle piantagioni (zucchero, tabacco, cotone) in Europa." }
  ],
  wiki: { it: "Tratta atlantica degli schiavi africani", en: "Atlantic slave trade", q: "Q10701282" }
});

mattone({
  id: "illuminismo",
  titolo: "L'Illuminismo",
  corsia: "idee",
  livello: 1,
  inizio: 1700, fine: 1789,
  anno: 1751,
  evento: "esce il primo volume dell'Encyclopédie di Diderot e d'Alembert",
  riassunto: "Nel Settecento filosofi come Montesquieu, Voltaire, Rousseau e Kant, sulla scia di Locke, vogliono «illuminare» con la ragione ogni campo: religione, politica, economia, giustizia. L'Encyclopédie (dal 1751) raccoglie il sapere del tempo in 28 volumi. In Italia Cesare Beccaria scrive contro tortura e pena di morte (Dei delitti e delle pene, 1764).",
  perche: "Diritti naturali, separazione dei poteri, tolleranza religiosa, libertà di espressione: sono le idee su cui si fondano le rivoluzioni americana e francese e le costituzioni democratiche di oggi, compresa quella italiana.",
  gancio: "Kant (1784) riassume l'Illuminismo in un motto latino: «Sapere aude!», abbi il coraggio di servirti della tua intelligenza.",
  link: [
    { a: "indipendenza-usa", tipo: "influenza", perche: "La Dichiarazione d'indipendenza (1776) parla di diritti inalienabili alla vita, alla libertà e alla ricerca della felicità: sono idee di Locke." },
    { a: "rivoluzione-francese", tipo: "influenza", perche: "La Dichiarazione dei diritti dell'uomo e del cittadino (1789) traduce in legge le idee dei filosofi illuministi." }
  ],
  attualita: [
    { temi: ["freedom of speech", "free speech", "freedom of the press", "press freedom", "libertà di stampa", "libertà di espressione", "libertà di parola", "separation of powers", "separazione dei poteri", "rule of law", "stato di diritto", "judicial independence", "censorship", "censura"], perche: "Libertà di espressione, separazione dei poteri e stato di diritto sono idee dell'Illuminismo: Montesquieu le teorizza nello Spirito delle leggi (1748), Voltaire le difende contro la censura." },
    { temi: ["death penalty", "capital punishment", "death sentence*", "executed", "execution*", "pena di morte", "condanna a morte", "condannato a morte", "condannata a morte", "giustiziat*", "torture", "tortura"], perche: "Contro tortura e pena di morte scrisse l'illuminista milanese Cesare Beccaria (Dei delitti e delle pene, 1764); il Granducato di Toscana fu il primo stato al mondo ad abolirla, nel 1786." }
  ],
  domande: [
    { d: "Quale stato abolisce per primo la pena di morte, e grazie a quale libro?", r: "Il Granducato di Toscana, nel 1786, anche sotto l'influenza di Dei delitti e delle pene di Cesare Beccaria (1764)." }
  ],
  wiki: { it: "Illuminismo", en: "Age of Enlightenment", q: "Q12539" },
  fonti: ["Encyclopédie", "Cesare Beccaria"]
});

mattone({
  id: "rivoluzione-industriale",
  titolo: "La rivoluzione industriale",
  corsia: "europa",
  livello: 1,
  inizio: 1760, fine: 1840,
  anno: 1769,
  evento: "James Watt brevetta la sua macchina a vapore migliorata",
  riassunto: "Nell'Inghilterra del Settecento, ricca di carbone, capitali e commerci, il lavoro passa dalle mani alle macchine. Le filande tessili e la macchina a vapore di James Watt (1769) danno vita alle fabbriche; nell'Ottocento arrivano ferrovie e navi a vapore. Masse di contadini si trasferiscono in città industriali sovraffollate.",
  perche: "È il cambiamento più profondo dalla nascita dell'agricoltura: per la prima volta la produzione cresce più in fretta della popolazione e il reddito medio comincia a salire senza fermarsi. Nascono la classe operaia, i sindacati, il socialismo e anche l'inquinamento da combustibili fossili.",
  gancio: "1769 è un anno gemello: Watt brevetta la sua macchina a vapore e in Corsica nasce Napoleone. Una rivoluzione tecnica e una politica, nate insieme.",
  link: [
    { a: "marx", tipo: "causa", perche: "Marx studia le fabbriche inglesi e la condizione degli operai per scrivere la sua critica del capitalismo." },
    { a: "spartizione-africa", tipo: "causa", perche: "Le industrie europee cercano materie prime e mercati: è una delle spinte alla conquista coloniale dell'Africa." }
  ],
  attualita: [
    { temi: ["climate change", "climate crisis", "global warming", "cambiamento climatico", "cambiamenti climatici", "crisi climatica", "riscaldamento globale", "greenhouse gas*", "gas serra", "carbon dioxide", "CO2", "CO₂", "emission*", "fossil fuel*", "combustibili fossili", "coal", "carbone", "COP*", "Paris Agreement", "Accordo di Parigi", "heatwave*", "heat wave*", "ondata di calore", "ondate di calore"], perche: "Il riscaldamento globale è iniziato con il carbone della rivoluzione industriale: da allora la CO₂ nell'atmosfera è aumentata di circa il 50%." }
  ],
  wiki: { it: "Rivoluzione industriale", en: "Industrial Revolution", q: "Q2269" },
  fonti: ["James Watt"]
});

mattone({
  id: "indipendenza-usa",
  titolo: "L'indipendenza degli Stati Uniti",
  corsia: "americhe",
  livello: 1,
  inizio: 1775, fine: 1787,
  anno: 1776,
  evento: "le tredici colonie americane dichiarano l'indipendenza dalla Gran Bretagna",
  riassunto: "Le tredici colonie britanniche del Nord America si ribellano alle tasse decise da Londra: «nessuna tassazione senza rappresentanza». Il 4 luglio 1776 dichiarano l'indipendenza e, con l'aiuto della Francia, vincono la guerra (1783). Nel 1787 scrivono la Costituzione: una repubblica federale con i poteri divisi tra presidente, Congresso e Corte suprema.",
  perche: "È la prima grande repubblica moderna fondata sulle idee illuministe, e la sua Costituzione è la più antica costituzione scritta ancora in vigore. Ispira la Rivoluzione francese e le indipendenze dell'America Latina. Ma esclude gli schiavi: la contraddizione esploderà nella guerra civile (1861–1865).",
  gancio: "Tredici colonie, e tredici anni tra l'indipendenza americana (1776) e la Rivoluzione francese (1789). La Francia si indebita per aiutare gli americani, e quel debito contribuisce alla sua rivoluzione.",
  link: [
    { a: "rivoluzione-francese", tipo: "causa", perche: "Il debito accumulato dalla Francia per sostenere gli americani e l'esempio di un popolo che si dà le proprie leggi preparano il 1789." },
    { a: "indipendenze-latinoamericane", tipo: "influenza", perche: "L'esempio delle colonie inglesi mostra agli ispanoamericani che l'indipendenza dall'Europa è possibile." }
  ],
  attualita: [
    { temi: ["Supreme Court of the United States", "U.S. Supreme Court", "US Supreme Court", "Corte Suprema degli Stati Uniti", "Corte suprema americana", "United States Congress", "U.S. Congress", "US Congress", "Congresso americano", "Congresso degli Stati Uniti", "United States Senate", "U.S. Senate", "US Senate", "Senato americano", "United States House of Representatives", "U.S. House", "Electoral College", "impeachment", "U.S. Constitution", "Constitution of the United States", "Costituzione americana", "First Amendment", "Second Amendment", "White House", "Casa Bianca", "President of the United States"], perche: "Presidente, Congresso, Corte suprema e i loro poteri reciproci vengono dalla Costituzione americana del 1787, scritta dopo l'indipendenza: è la più antica costituzione scritta ancora in vigore." }
  ],
  wiki: { it: "Dichiarazione d'indipendenza degli Stati Uniti d'America", en: "United States Declaration of Independence", q: "Q127912" },
  fonti: ["Costituzione degli Stati Uniti d'America", "Rivoluzione americana"]
});

mattone({
  id: "rivoluzione-francese",
  breve: "Rivoluzione francese",
  titolo: "La Rivoluzione francese",
  corsia: "europa",
  livello: 1, fisso: true,
  inizio: 1789, fine: 1799,
  anno: 1789,
  evento: "i parigini assaltano la Bastiglia: inizia la Rivoluzione francese",
  riassunto: "Con lo stato in bancarotta, il re Luigi XVI convoca gli Stati generali. Il 14 luglio 1789 i parigini assaltano la Bastiglia; l'Assemblea abolisce i privilegi feudali e proclama i diritti dell'uomo e del cittadino. Nel 1792 nasce la Repubblica, nel 1793 il re viene ghigliottinato e segue il Terrore di Robespierre. Nel 1799 il generale Napoleone Bonaparte prende il potere.",
  perche: "Per convenzione inizia l'età contemporanea. Muore l'idea che il potere venga da Dio e dalla nascita: la sovranità appartiene alla nazione e i cittadini sono uguali davanti alla legge. Nascono il linguaggio politico moderno, la nazione, i diritti e perfino la divisione tra destra e sinistra.",
  gancio: "Libertà, uguaglianza, fraternità. Per il centenario della Rivoluzione, nel 1889, Parigi costruisce la Torre Eiffel.",
  link: [
    { a: "napoleone", tipo: "causa", perche: "Dieci anni di rivoluzione e di guerre portano al potere un generale vittorioso." }
  ],
  attualita: [
    { temi: ["far-right", "far-left", "left-wing", "right-wing", "centre-left", "center-left", "centre-right", "center-right", "estrema destra", "estrema sinistra", "centrodestra", "centrosinistra", "centro-destra", "centro-sinistra"], perche: "Destra e sinistra in politica nascono nel 1789: nell'Assemblea nazionale francese i sostenitori del re sedevano a destra del presidente, i rivoluzionari a sinistra." },
    { paese: true, temi: ["France", "French", "Francia", "francese", "francesi", "Macron", "Élysée", "Eliseo"], perche: "La Francia di oggi è una repubblica laica che si richiama ai principi del 1789: libertà, uguaglianza, fraternità. L'attuale Quinta Repubblica nasce nel 1958." }
  ],
  domande: [
    { d: "Da dove vengono le parole «destra» e «sinistra» in politica?", r: "Dall'Assemblea nazionale francese del 1789: i sostenitori del re sedevano a destra del presidente, i rivoluzionari a sinistra." }
  ],
  wiki: { it: "Rivoluzione francese", en: "French Revolution", q: "Q6534" },
  fonti: ["Presa della Bastiglia"]
});
