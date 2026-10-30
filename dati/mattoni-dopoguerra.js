/* Mattoni della guerra e del dopoguerra (1939–1949). */

mattone({
  id: "seconda-guerra-mondiale",
  titolo: "La Seconda guerra mondiale",
  corsia: "mondo",
  livello: 1,
  inizio: 1939, fine: 1945,
  anno: 1939,
  evento: "la Germania invade la Polonia: inizia la Seconda guerra mondiale",
  riassunto: "Il 1° settembre 1939 la Germania di Hitler invade la Polonia; Francia e Gran Bretagna le dichiarano guerra. L'Asse (Germania, Italia, Giappone) conquista gran parte dell'Europa e dell'Asia orientale, finché l'invasione dell'URSS (1941) e l'entrata in guerra degli Stati Uniti dopo Pearl Harbor (1941) cambiano le sorti. La guerra finisce in Europa l'8 maggio 1945 e in Asia dopo le bombe atomiche su Hiroshima e Nagasaki (agosto 1945).",
  perche: "È la guerra più distruttiva della storia: tra 70 e 85 milioni di morti, in maggioranza civili. Nella Shoah i nazisti sterminano sei milioni di ebrei. Dalla guerra nascono il mondo diviso tra Stati Uniti e URSS, l'ONU, la decolonizzazione e, in Europa, il progetto di un'unione per non combattersi mai più.",
  gancio: "In Italia la guerra ha una data in più: il 25 aprile 1945, festa della Liberazione dal nazifascismo.",
  link: [
    { a: "onu-1945", tipo: "causa", perche: "Per evitare una terza guerra mondiale i vincitori creano le Nazioni Unite." },
    { a: "israele-1948", tipo: "causa", perche: "Dopo la Shoah cresce il sostegno internazionale a uno stato ebraico: nel 1947 l'ONU vota la spartizione della Palestina." },
    { a: "guerra-fredda", tipo: "causa", perche: "I due grandi vincitori, Stati Uniti e URSS, diventano rivali e si dividono l'Europa." },
    { a: "unione-europea", tipo: "causa", perche: "«Mai più guerra tra noi»: l'integrazione europea nasce per legare indissolubilmente Francia e Germania." },
    { a: "decolonizzazione", tipo: "causa", perche: "Le potenze coloniali escono dalla guerra indebolite, e i popoli colonizzati che hanno combattuto per loro chiedono la libertà." }
  ],
  attualita: [
    { temi: ["Holocaust", "Olocausto", "Shoah", "antisemitism", "antisemitic", "antisemit*", "Auschwitz"], perche: "Nella Shoah i nazisti sterminarono sei milioni di ebrei: il 27 gennaio, giorno della liberazione di Auschwitz (1945), è il Giorno della Memoria." }
  ],
  domande: [
    { d: "Quali paesi formano l'Asse nella Seconda guerra mondiale?", r: "Germania, Italia e Giappone." }
  ],
  wiki: { it: "Seconda guerra mondiale", en: "World War II", q: "Q362" },
  fonti: ["Olocausto"]
});

mattone({
  id: "onu-1945",
  breve: "Fine della guerra",
  titolo: "Nasce l'ONU: il nuovo ordine mondiale",
  corsia: "mondo",
  livello: 1, fisso: true,
  inizio: 1945, fine: 1948,
  anno: 1945,
  evento: "nasce l'ONU, alla fine della Seconda guerra mondiale",
  riassunto: "Ancora prima della fine della guerra i vincitori progettano un nuovo ordine: a Bretton Woods (1944) nascono il Fondo monetario internazionale e la Banca mondiale; nel giugno 1945 a San Francisco 50 paesi firmano la Carta delle Nazioni Unite. A Norimberga (1945–1946) i capi nazisti sono processati per crimini contro l'umanità; nel 1948 l'ONU approva la Dichiarazione universale dei diritti umani.",
  perche: "Il mondo di oggi è costruito su queste istituzioni. I cinque vincitori (Stati Uniti, URSS, oggi Russia, Regno Unito, Francia e Cina) siedono nel Consiglio di sicurezza con diritto di veto. I diritti umani e la giustizia penale internazionale nascono come risposta agli orrori della guerra.",
  gancio: "Il 1945 è lo spartiacque del Novecento: fine della guerra, bomba atomica, ONU. Tutto ciò che viene dopo si chiama «dopoguerra».",
  link: [
    { a: "decolonizzazione", tipo: "influenza", perche: "La Carta dell'ONU proclama l'autodeterminazione dei popoli: un argomento potente per chi chiede l'indipendenza." }
  ],
  attualita: [
    { temi: ["United Nations", "UN", "Security Council", "Consiglio di sicurezza", "Nazioni Unite", "ONU", "General Assembly", "Assemblea generale", "UNICEF", "UNHCR", "UNRWA", "peacekeep*", "caschi blu", "veto"], perche: "L'ONU nasce nel 1945 dai vincitori della Seconda guerra mondiale: per questo Stati Uniti, Russia, Cina, Regno Unito e Francia hanno il diritto di veto nel Consiglio di sicurezza." },
    { temi: ["war crime*", "crimini di guerra", "crimine di guerra", "crimes against humanity", "crimini contro l'umanità", "genocide", "genocidio", "International Criminal Court", "Corte penale internazionale", "ICC", "International Court of Justice", "Corte internazionale di giustizia", "ICJ", "Geneva Convention*", "Convenzioni di Ginevra", "human rights", "diritti umani"], perche: "I processi di Norimberga (1945–1946), la Convenzione sul genocidio e la Dichiarazione universale dei diritti umani (entrambe del 1948) sono le basi dei tribunali e dei diritti internazionali di oggi." },
    { temi: ["International Monetary Fund", "IMF", "FMI", "Fondo monetario", "World Bank", "Banca mondiale"], perche: "Fondo monetario internazionale e Banca mondiale nascono a Bretton Woods nel 1944, per ricostruire l'economia mondiale dopo la guerra." }
  ],
  domande: [
    { d: "Quali paesi hanno il diritto di veto nel Consiglio di sicurezza dell'ONU, e perché proprio loro?", r: "Stati Uniti, Russia (al posto dell'URSS), Cina, Regno Unito e Francia: sono le potenze vincitrici della Seconda guerra mondiale." }
  ],
  wiki: { it: "Organizzazione delle Nazioni Unite", en: "United Nations", q: "Q1065" },
  fonti: ["Processo di Norimberga", "Dichiarazione universale dei diritti umani"]
});

mattone({
  id: "repubblica-italiana",
  titolo: "Nasce la Repubblica italiana",
  corsia: "europa",
  livello: 1,
  inizio: 1946, fine: 1948,
  anno: 1946,
  evento: "gli italiani scelgono la Repubblica con un referendum",
  riassunto: "Il 2 giugno 1946, dopo la caduta del fascismo e la guerra, gli italiani e, per la prima volta in un voto nazionale, le italiane scelgono con un referendum la Repubblica invece della monarchia (54% contro 46%). Lo stesso giorno eleggono l'Assemblea costituente, che scrive la Costituzione, in vigore dal 1° gennaio 1948.",
  perche: "La Costituzione fissa le regole della vita politica di oggi: repubblica parlamentare, diritti fondamentali, ripudio della guerra (articolo 11), divieto di ricostituire il partito fascista. Ogni dibattito su riforme, premierato o autonomie parte da questo testo.",
  gancio: "Il 2 giugno è la Festa della Repubblica. Il paese era diviso: il Nord votò in maggioranza per la Repubblica, il Sud per la monarchia.",
  attualita: [
    { paese: true, temi: ["Italy", "Italian government", "Italian Prime Minister", "Prime Minister of Italy", "President of Italy", "Italian Parliament", "Meloni", "Mattarella", "Quirinale", "Palazzo Chigi", "Costituzione", "costituzional*", "premierato", "Parlamento italiano", "Presidente della Repubblica"], perche: "Le regole della politica italiana vengono dalla Costituzione del 1948, scritta dopo che il referendum del 2 giugno 1946 scelse la Repubblica." }
  ],
  domande: [
    { d: "Che cosa succede il 2 giugno 1946?", r: "Con un referendum, il primo voto nazionale aperto anche alle donne, gli italiani scelgono la Repubblica e eleggono l'Assemblea che scriverà la Costituzione." }
  ],
  wiki: { it: "Referendum istituzionale in Italia del 1946", en: "1946 Italian institutional referendum", q: "Q140562515" },
  fonti: ["Costituzione della Repubblica Italiana"]
});

mattone({
  id: "partizione-india",
  titolo: "Indipendenza e spartizione dell'India",
  corsia: "asia",
  livello: 1,
  inizio: 1947,
  anno: 1947,
  evento: "l'India britannica diventa indipendente, divisa in India e Pakistan",
  riassunto: "Dopo decenni di lotta non violenta guidata da Gandhi, il 15 agosto 1947 l'India britannica diventa indipendente, ma divisa in due stati: l'India, a maggioranza indù, e il Pakistan, a maggioranza musulmana, con una parte orientale che nel 1971 diventerà il Bangladesh. La spartizione provoca uno dei più grandi esodi della storia: oltre 10 milioni di profughi e centinaia di migliaia di morti, forse più di un milione.",
  perche: "L'India diventa la democrazia più popolosa del mondo. India e Pakistan, entrambi dotati di armi nucleari, si contendono ancora il Kashmir e si sono combattuti in più guerre. È anche il segnale che gli imperi coloniali europei stanno finendo.",
  gancio: "Gandhi, che aveva guidato l'indipendenza senza violenza, viene ucciso da un estremista indù pochi mesi dopo, il 30 gennaio 1948.",
  link: [
    { a: "decolonizzazione", tipo: "influenza", perche: "Se il «gioiello della corona» britannica è libero, nessuna colonia può essere tenuta per sempre." }
  ],
  attualita: [
    { paese: true, temi: ["India", "Indian", "indiano", "indiani", "indiane", "Pakistan*", "pakistan*", "Kashmir*", "Bangladesh*", "Modi", "New Delhi", "Nuova Delhi", "Islamabad"], perche: "India e Pakistan nascono nel 1947 dalla spartizione dell'India britannica: da allora si contendono il Kashmir e hanno combattuto diverse guerre. Il Bangladesh era il Pakistan orientale fino al 1971." }
  ],
  wiki: { it: "Partizione dell'India", en: "Partition of India", q: "Q129053" }
});

mattone({
  id: "israele-1948",
  titolo: "Nasce Israele",
  corsia: "medio-oriente",
  livello: 1,
  inizio: 1948, fine: 1949,
  anno: 1948,
  evento: "nasce lo stato di Israele",
  riassunto: "Nel 1947 l'ONU propone di dividere la Palestina, sotto mandato britannico, in uno stato ebraico e uno arabo. Il 14 maggio 1948 Israele proclama l'indipendenza e i paesi arabi vicini lo attaccano. Israele vince e allarga il suo territorio; circa 700.000 palestinesi fuggono o vengono espulsi: per loro è la Nakba, la «catastrofe». Lo stato arabo previsto non nasce.",
  perche: "Il conflitto israelo-palestinese di oggi parte da qui. Nella guerra del 1967 Israele occupa Cisgiordania, Gerusalemme est e Gaza: i territori su cui si discute ancora uno stato palestinese. La questione dei profughi palestinesi e dei loro discendenti è tuttora aperta.",
  gancio: "Lo stesso evento ha due anniversari: il 14 maggio Israele festeggia l'indipendenza, il 15 maggio i palestinesi ricordano la Nakba.",
  attualita: [
    { paese: true, temi: ["Israel*", "israelian*", "Gaza", "palestin*", "West Bank", "Cisgiordania", "Hamas", "IDF", "Netanyahu", "two-state", "due stati", "Jerusalem", "Gerusalemme"], perche: "Il conflitto israelo-palestinese nasce nel 1948, con la fondazione di Israele e la fuga o l'espulsione di circa 700.000 palestinesi; nel 1967 Israele occupa Cisgiordania, Gerusalemme est e Gaza." }
  ],
  domande: [
    { d: "Che cos'è la Nakba?", r: "La «catastrofe»: la fuga o l'espulsione di circa 700.000 palestinesi durante la guerra che segue la nascita di Israele nel 1948." }
  ],
  wiki: { it: "Guerra arabo-israeliana del 1948", en: "1948 Arab–Israeli War", q: "Q49092" },
  fonti: ["Esodo palestinese del 1948"]
});

mattone({
  id: "rivoluzione-cinese",
  titolo: "Mao e la Cina comunista",
  corsia: "asia",
  livello: 1,
  inizio: 1949, fine: 1976,
  anno: 1949,
  evento: "Mao proclama la Repubblica popolare cinese",
  riassunto: "Dopo una lunga guerra civile, interrotta dall'invasione giapponese, i comunisti di Mao Zedong sconfiggono i nazionalisti di Chiang Kai-shek, che si rifugiano a Taiwan. Il 1° ottobre 1949 Mao proclama a Pechino la Repubblica popolare cinese. Le sue campagne, come il Grande balzo in avanti (1958–1962) e la Rivoluzione culturale (1966–1976), causano decine di milioni di morti; dopo la sua morte, dal 1978, Deng Xiaoping apre il paese al mercato.",
  perche: "La Cina di oggi è questa repubblica, governata dallo stesso partito dal 1949. Le riforme di Deng ne hanno fatto la seconda economia del mondo. E la questione di Taiwan, dove sopravvive la Repubblica di Cina dei nazionalisti, è uno dei punti più pericolosi del pianeta.",
  gancio: "1949, l'anno in cui il mondo si divide: nasce la NATO, l'URSS prova la sua prima bomba atomica, la Germania si spacca in due e Mao conquista la Cina.",
  attualita: [
    { paese: true, temi: ["China", "Chinese", "Cina", "cines*", "Beijing", "Pechino", "Xi Jinping", "Communist Party of China", "Chinese Communist Party", "Partito comunista cinese", "Xinjiang", "Uyghur*", "uigur*"], perche: "La Cina di oggi è la Repubblica popolare fondata da Mao nel 1949 e governata da allora dal Partito comunista; con le riforme di Deng Xiaoping (dal 1978) è diventata la seconda economia del mondo." },
    { paese: true, temi: ["Taiwan*", "taiwanes*", "Taipei"], perche: "Nel 1949 i nazionalisti sconfitti da Mao si rifugiarono a Taiwan: Pechino considera l'isola una provincia da riunificare, se necessario anche con la forza." }
  ],
  domande: [
    { d: "Perché Taiwan e la Cina popolare sono separate?", r: "Perché nel 1949 i nazionalisti sconfitti da Mao si rifugiarono a Taiwan, dove continua la Repubblica di Cina; Pechino la considera una sua provincia." }
  ],
  wiki: { it: "Guerra civile cinese", en: "Chinese Civil War", q: "Q179975" },
  fonti: ["Mao Zedong", "Cina"]
});
