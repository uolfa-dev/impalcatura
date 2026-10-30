/*
 * Linea del tempo a corsie, con scala a tratti: più ci si avvicina a oggi, più spazio ha ogni anno.
 * Disegnata con elementi HTML posizionati e un livello SVG per i collegamenti.
 */
(function (IMP) {
  'use strict';

  const U = IMP.U;

  const SEGMENTI = [
    { da: -10000, a: -3500, px: 330, passo: 2000 },
    { da: -3500, a: -800, px: 480, passo: 500 },
    { da: -800, a: 500, px: 760, passo: 200 },
    { da: 500, a: 1450, px: 700, passo: 100 },
    { da: 1450, a: 1800, px: 860, passo: 50 },
    { da: 1800, a: 1900, px: 620, passo: 20 },
    { da: 1900, a: 2030, px: 1150, passo: 10 }
  ];
  const MARGINE = 30;
  const ALTEZZA_TESTA = 50;
  const ALTEZZA_RIGA = 28;
  const SPAZIO_NOME = 28;
  const COLORI_LINK = { causa: '#d0682a', influenza: '#7a52c7', confronto: '#8a8f9c' };

  let misuratore = null;
  function larghezzaTesto(t, grassetto) {
    if (!misuratore) misuratore = document.createElement('canvas').getContext('2d');
    const fam = getComputedStyle(document.body).fontFamily;
    misuratore.font = (grassetto ? '700 ' : '400 ') + '12.8px ' + fam;
    return Math.ceil(misuratore.measureText(t).width) + 8;
  }

  function creaScala(zoom) {
    let base = MARGINE;
    const segs = SEGMENTI.map(function (s) {
      const out = { da: s.da, a: s.a, x0: base, w: s.px * zoom, passo: s.passo };
      base += out.w;
      return out;
    });
    function x(anno) {
      if (anno <= segs[0].da) return segs[0].x0;
      for (const s of segs) {
        if (anno <= s.a) return s.x0 + (anno - s.da) / (s.a - s.da) * s.w;
      }
      const u = segs[segs.length - 1];
      return u.x0 + u.w;
    }
    return { x: x, segs: segs, larghezza: base + MARGINE + 160 };
  }

  function etichettaTick(y) {
    if (y === 0) return 'a.C. | d.C.';
    return y < 0 ? U.numero(y) + ' a.C.' : String(y);
  }

  const Linea = {
    /*
     * opzioni: { zoom, corsieSpente: Set, soloStudiati, selezionato, onSeleziona(id) }
     * Restituisce un oggetto con seleziona(id) e centra(id).
     */
    disegna: function (contenitore, opzioni) {
      const scala = creaScala(opzioni.zoom || 1);
      const corsie = IMP.mappa.corsie.filter(function (c) { return !opzioni.corsieSpente.has(c.id); });

      const interno = U.html('<div class="linea-interno"></div>');
      interno.style.width = scala.larghezza + 'px';

      // Ere e asse in alto, che restano visibili scorrendo in verticale
      const ere = U.html('<div class="linea-ere"></div>');
      IMP.mappa.ere.forEach(function (e) {
        const x0 = scala.x(e.da), x1 = scala.x(e.a);
        const d = U.html('<div class="era" title="' + U.esc(e.nome) + '">' + U.esc(e.nome) + '</div>');
        d.style.left = x0 + 'px';
        d.style.width = (x1 - x0) + 'px';
        ere.appendChild(d);
      });
      interno.appendChild(ere);

      const asse = U.html('<div class="linea-asse"></div>');
      scala.segs.forEach(function (s) {
        const primo = Math.ceil(s.da / s.passo) * s.passo;
        for (let y = primo; y < s.a; y += s.passo) {
          const t = U.html('<span class="tick">' + etichettaTick(y) + '</span>');
          t.style.left = scala.x(y) + 'px';
          asse.appendChild(t);
        }
      });
      interno.appendChild(asse);

      // Disposizione delle voci in righe, corsia per corsia, senza sovrapposizioni
      const posizioni = {};
      let y = ALTEZZA_TESTA;
      const righeCorsie = [];
      corsie.forEach(function (c) {
        const voci = IMP.mappa.mattoni.filter(function (m) { return m.corsia === c.id; })
          .map(function (m) {
            const x0 = scala.x(m.inizio), x1 = scala.x(m.fine), xa = scala.x(m.anno);
            const fine = Math.max(x1, xa + 10 + larghezzaTesto(m.titolo, m.fisso));
            return { m: m, x0: Math.min(x0, xa), x1: x1, xa: xa, fine: fine };
          })
          .sort(function (a, b) { return a.x0 - b.x0; });
        const righe = [];
        voci.forEach(function (v) {
          let r = righe.findIndex(function (fineRiga) { return fineRiga + 10 <= v.x0; });
          if (r < 0) { r = righe.length; righe.push(0); }
          righe[r] = v.fine;
          v.riga = r;
        });
        const altezza = SPAZIO_NOME + Math.max(1, righe.length) * ALTEZZA_RIGA + 8;
        righeCorsie.push({ c: c, voci: voci, top: y, altezza: altezza });
        y += altezza;
      });
      const altezzaTotale = y;
      interno.style.height = altezzaTotale + 'px';

      // Salti di scala e punti fissi
      scala.segs.slice(1).forEach(function (s) {
        const l = U.html('<div class="salto-scala"></div>');
        l.style.left = s.x0 + 'px';
        interno.appendChild(l);
      });
      IMP.mappa.fissi.forEach(function (f) {
        const l = U.html('<div class="fisso-linea" title="Punto fisso: ' + U.esc(f.titolo) + '"></div>');
        l.style.left = scala.x(f.anno) + 'px';
        interno.appendChild(l);
      });

      righeCorsie.forEach(function (rc) {
        const riga = U.html('<div class="corsia-riga"></div>');
        riga.style.position = 'absolute';
        riga.style.left = '0';
        riga.style.right = '0';
        riga.style.top = rc.top + 'px';
        riga.style.height = rc.altezza + 'px';
        const nome = U.html('<span class="corsia-nome">' + U.esc(rc.c.nome) + '</span>');
        nome.style.background = IMP.mappa.colore(rc.c.id);
        riga.appendChild(nome);
        interno.appendChild(riga);

        rc.voci.forEach(function (v) {
          const m = v.m;
          const st = IMP.SRS.stato(m.id);
          const top = rc.top + SPAZIO_NOME + v.riga * ALTEZZA_RIGA;
          const el = U.html('<button class="voce st-' + st + (m.fisso ? ' fisso' : '') + '" data-id="' + m.id + '" title="' + U.esc(m.titolo + ' · ' + U.periodo(m)) + '"></button>');
          el.style.left = v.x0 + 'px';
          el.style.top = top + 'px';
          el.style.width = (v.fine - v.x0) + 'px';
          if (v.x1 - v.x0 > 4) {
            const barra = U.html('<span aria-hidden="true"></span>');
            barra.style.cssText = 'position:absolute;left:0;top:9px;height:6px;border-radius:3px;opacity:.35;width:' + (v.x1 - v.x0) + 'px;background:' + IMP.mappa.colore(m.corsia);
            el.appendChild(barra);
          }
          const segno = U.html('<span class="segno" aria-hidden="true"></span>');
          segno.style.position = 'absolute';
          segno.style.left = (v.xa - v.x0 - 7) + 'px';
          if (st === 'nuovo') segno.style.borderColor = IMP.mappa.colore(m.corsia);
          el.appendChild(segno);
          const et = U.html('<span class="etichetta">' + U.esc(m.titolo) + '</span>');
          et.style.position = 'absolute';
          et.style.left = (v.xa - v.x0 + 10) + 'px';
          el.appendChild(et);
          if (opzioni.soloStudiati && st === 'nuovo') el.classList.add('attenuata');
          el.addEventListener('click', function () { seleziona(m.id, true); });
          interno.appendChild(el);
          posizioni[m.id] = { x: v.xa, y: top + 12 };
        });
      });

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'linea-svg');
      svg.setAttribute('width', scala.larghezza);
      svg.setAttribute('height', altezzaTotale);
      svg.innerHTML = '<defs>' + Object.keys(COLORI_LINK).map(function (t) {
        return '<marker id="freccia-' + t + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + COLORI_LINK[t] + '"/></marker>';
      }).join('') + '</defs><g></g>';
      interno.appendChild(svg);

      contenitore.innerHTML = '';
      contenitore.appendChild(interno);

      function disegnaLink(id) {
        const g = svg.querySelector('g');
        g.innerHTML = '';
        interno.querySelectorAll('.voce').forEach(function (el) {
          el.classList.remove('selezionata', 'collegata');
        });
        if (!id || !posizioni[id]) return;
        const sel = interno.querySelector('.voce[data-id="' + id + '"]');
        if (sel) sel.classList.add('selezionata');
        IMP.mappa.collegamenti(id).forEach(function (l) {
          const a = posizioni[l.verso === 'avanti' ? id : l.altro];
          const b = posizioni[l.verso === 'avanti' ? l.altro : id];
          if (!a || !b) return;
          const altro = interno.querySelector('.voce[data-id="' + l.altro + '"]');
          if (altro) altro.classList.add('collegata');
          const h = Math.min(140, Math.abs(b.x - a.x) / 3 + 30);
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', 'M' + a.x + ',' + a.y + ' C' + a.x + ',' + (Math.min(a.y, b.y) - h) + ' ' + b.x + ',' + (Math.min(a.y, b.y) - h) + ' ' + b.x + ',' + b.y);
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke', COLORI_LINK[l.tipo]);
          path.setAttribute('stroke-width', '2.5');
          if (l.tipo === 'confronto') path.setAttribute('stroke-dasharray', '6 5');
          else path.setAttribute('marker-end', 'url(#freccia-' + l.tipo + ')');
          g.appendChild(path);
        });
      }

      function centra(id) {
        const p = posizioni[id];
        if (!p) return;
        contenitore.scrollTo({
          left: Math.max(0, p.x - contenitore.clientWidth / 2),
          top: Math.max(0, p.y - contenitore.clientHeight / 2),
          behavior: 'smooth'
        });
      }

      function seleziona(id, daClic) {
        disegnaLink(id);
        if (opzioni.onSeleziona) opzioni.onSeleziona(id, daClic);
      }

      return {
        seleziona: seleziona,
        centra: centra,
        scorriAdAnno: function (anno) {
          contenitore.scrollLeft = Math.max(0, scala.x(anno) - 40);
        },
        annoAlCentro: function () {
          const xc = contenitore.scrollLeft + contenitore.clientWidth / 2;
          for (const s of scala.segs) {
            if (xc <= s.x0 + s.w) return Math.round(s.da + (xc - s.x0) / s.w * (s.a - s.da));
          }
          return 2000;
        },
        scorriAdAnnoCentrato: function (anno) {
          contenitore.scrollLeft = Math.max(0, scala.x(anno) - contenitore.clientWidth / 2);
        }
      };
    }
  };

  IMP.Linea = Linea;
})(window.IMP);
