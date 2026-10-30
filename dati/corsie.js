/*
 * Dati di base: corsie (aree del mondo), ere e tipi di collegamento.
 * Va caricato prima dei file dei mattoni, perché definisce la funzione mattone().
 *
 * Gli anni sono numeri: negativi = avanti Cristo (-508 = 508 a.C.).
 */
window.IMP_DATI = {
  corsie: [
    { id: 'europa', nome: 'Europa' },
    { id: 'medio-oriente', nome: 'Medio Oriente e Nord Africa' },
    { id: 'africa', nome: 'Africa subsahariana' },
    { id: 'asia', nome: 'Asia' },
    { id: 'americhe', nome: 'Americhe' },
    { id: 'mondo', nome: 'Mondo' },
    { id: 'idee', nome: 'Idee, arte e scienza' }
  ],

  // Periodizzazione scolastica italiana: è una convenzione europea, in Cina o in India le epoche si dividono diversamente.
  ere: [
    { nome: 'Preistoria', da: -10500, a: -3200 },
    { nome: 'Età antica', da: -3200, a: 476 },
    { nome: 'Medioevo', da: 476, a: 1492 },
    { nome: 'Età moderna', da: 1492, a: 1789 },
    { nome: 'Età contemporanea', da: 1789, a: 2030 }
  ],

  // Un collegamento si scrive una volta sola, sul mattone di partenza; la pagina dell'altro mattone mostra la frase inversa.
  tipiLink: {
    causa: { avanti: 'Ha portato a', indietro: 'Nasce anche da' },
    influenza: { avanti: 'Ha influenzato', indietro: 'Influenzato da' },
    confronto: { avanti: 'Da confrontare con', indietro: 'Da confrontare con' }
  },

  mattoni: [],
  percorso: [],

  // Gruppi di parole riusabili nelle regole di attualità: si citano con "@nome".
  gruppi: {
    paesiAfricani: [
      "Congo*", "Kinshasa", "Sudan*", "sudanes*", "Darfur", "Khartoum", "Somalia*", "somal*", "Nigeria*", "nigerian*",
      "Cameroon*", "Camerun", "Chad", "Ciad", "Rwanda*", "Ruanda", "Burundi", "Uganda*", "Kenya*", "Tanzania*",
      "Mozambi*", "Angola*", "Namibia*", "Zimbabwe*", "Zambia*", "Eritrea*",
      "Libya*", "Libia", "libic*", "Western Sahara", "Sahara occidentale", "Mali", "Malian", "Niger", "Nigerien",
      "Burkina Faso", "Sahel", "Senegal*", "Ghana*", "Ivory Coast", "Costa d'Avorio", "Sierra Leone",
      "Guinea*", "Togo", "Benin", "Gabon*", "Madagascar", "Malawi", "South Africa*", "Sudafrica", "sudafrican*",
      "Djibouti", "Gibuti", "Central African Republic", "Repubblica Centrafricana", "M23", "al-Shabaab", "Boko Haram"
    ]
  }
};

function mattone(m) {
  window.IMP_DATI.mattoni.push(m);
}
