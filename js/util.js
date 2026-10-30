/* Funzioni di utilità condivise. Tutto il codice vive nell'oggetto globale IMP. */
window.IMP = window.IMP || {};

(function (IMP) {
  'use strict';

  const U = {};

  U.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  // Crea un elemento a partire da HTML (già sanificato da chi chiama).
  U.html = function (str) {
    const t = document.createElement('template');
    t.innerHTML = str.trim();
    return t.content.firstElementChild;
  };

  /* Date di calendario, sempre in ora locale, come stringhe AAAA-MM-GG */
  U.dataStr = function (d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };
  U.oggi = function () { return U.dataStr(new Date()); };
  U.piuGiorni = function (s, n) {
    const p = s.split('-').map(Number);
    return U.dataStr(new Date(p[0], p[1] - 1, p[2] + n));
  };
  U.giorniTra = function (a, b) {
    const pa = a.split('-').map(Number), pb = b.split('-').map(Number);
    return Math.round((Date.UTC(pb[0], pb[1] - 1, pb[2]) - Date.UTC(pa[0], pa[1] - 1, pa[2])) / 86400000);
  };
  U.dataLeggibile = function (s) {
    const p = s.split('-').map(Number);
    return new Date(p[0], p[1] - 1, p[2]).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  /* Anni storici: numeri negativi = avanti Cristo */
  U.numero = function (n) {
    return Math.abs(n) >= 10000 ? Math.abs(n).toLocaleString('it-IT') : String(Math.abs(n));
  };
  U.anno = function (y, circa) {
    const pre = circa ? 'c. ' : '';
    if (y < 0) return pre + U.numero(y) + ' a.C.';
    if (y < 1000) return pre + y + ' d.C.';
    return pre + y;
  };
  U.periodo = function (m) {
    if (m.etichetta) return m.etichetta;
    if (m.fine == null || m.fine === m.inizio) return U.anno(m.anno, m.circa);
    if (m.inizio < 0 && m.fine < 0) return U.numero(m.inizio) + '–' + U.numero(m.fine) + ' a.C.';
    if (m.inizio < 0) return U.anno(m.inizio) + ' – ' + U.anno(m.fine);
    return m.inizio + '–' + m.fine;
  };

  // Anni trascorsi tra due date storiche: tra 1 a.C. e 1 d.C. passa un anno solo (l'anno zero non esiste).
  U.distanza = function (a, b) {
    let d = b - a;
    if (a < 0 && b > 0) d -= 1;
    if (b < 0 && a > 0) d += 1;
    return d;
  };

  U.romano = function (n) {
    const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const sim = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let out = '';
    for (let i = 0; i < val.length; i++) {
      while (n >= val[i]) { out += sim[i]; n -= val[i]; }
    }
    return out;
  };

  // Secolo o millennio come intero con segno (negativo = a.C.).
  U.unita = function (y, ampiezza) {
    return y > 0 ? Math.ceil(y / ampiezza) : -Math.ceil(-y / ampiezza);
  };
  U.nomeUnita = function (u, ampiezza) {
    const nome = ampiezza === 1000 ? 'millennio' : 'secolo';
    return U.romano(Math.abs(u)) + ' ' + nome + (u < 0 ? ' a.C.' : '');
  };
  U.unitaVicina = function (u, passo) {
    let v = u + passo;
    if (u > 0 && v <= 0) v -= 1;
    if (u < 0 && v >= 0) v += 1;
    return v;
  };
  // «dal 1701 al 1800», «dal 600 al 501 a.C.»
  U.limitiUnita = function (u, ampiezza) {
    if (u > 0) return 'dal ' + ((u - 1) * ampiezza + 1) + ' al ' + (u * ampiezza);
    const k = -u;
    return 'dal ' + U.numero(k * ampiezza) + ' al ' + U.numero((k - 1) * ampiezza + 1) + ' a.C.';
  };

  /* Casualità */
  U.mescola = function (arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };
  U.uno = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };
  U.pesato = function (coppie) {
    const tot = coppie.reduce(function (s, c) { return s + c[1]; }, 0);
    let r = Math.random() * tot;
    for (const c of coppie) {
      r -= c[1];
      if (r <= 0) return c[0];
    }
    return coppie[coppie.length - 1][0];
  };

  U.plurale = function (n, uno, molti) { return n === 1 ? uno : molti; };

  IMP.U = U;
})(window.IMP);
