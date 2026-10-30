/*
 * Invito a mettere Impalcatura nella schermata Home del telefono.
 * iPhone: Safari non permette di installare da una pagina, quindi si spiegano i passaggi.
 * Android: Chrome e i browser basati su Chrome segnalano con «beforeinstallprompt» quando il sito
 * si può installare, e allora basta un pulsante; prima di quel momento si spiega il menu del browser.
 */
(function (IMP) {
  'use strict';

  const ua = navigator.userAgent;
  const ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const android = /Android/i.test(ua);
  let richiesta = null;

  function installata() {
    return window.navigator.standalone === true ||
      (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  }

  function daMostrare() {
    const imp = IMP.Store.get().impostazioni;
    return (ios || android) && !installata() && !imp.consiglioHomeVisto && !imp.consiglioIosVisto;
  }

  function segnaVisto() {
    IMP.Store.get().impostazioni.consiglioHomeVisto = true;
    IMP.Store.salva();
  }

  function contenuto() {
    if (ios) {
      return '<h3>📱 Mettilo nella schermata Home</h3>' +
        '<p>In Safari tocca <strong>Condividi</strong> (il quadrato con la freccia in su), poi <strong>Aggiungi alla schermata Home</strong>. Impalcatura si aprirà a tutto schermo, come un\'app.</p>' +
        '<p class="tenue piccolo">È anche più sicuro per i progressi: Safari può cancellare i dati dei siti che non apri per 7 giorni, le app nella schermata Home no.</p>' +
        '<button class="btn secondario piccolo" data-azione="casa-ok">Fatto</button>';
    }
    if (richiesta) {
      return '<h3>📱 Installalo come app</h3>' +
        '<p>Con un tocco Impalcatura arriva nella schermata Home e si apre a tutto schermo: così è più facile tornarci ogni giorno.</p>' +
        '<p class="riga"><button class="btn" data-azione="casa-installa">Installa</button>' +
        '<button class="btn secondario piccolo" data-azione="casa-ok">Non ora</button></p>';
    }
    return '<h3>📱 Mettilo nella schermata Home</h3>' +
      '<p>Apri il menu del browser (in Chrome sono i <strong>tre puntini ⋮</strong> in alto a destra) e tocca <strong>Aggiungi a schermata Home</strong> o <strong>Installa app</strong>. Impalcatura si aprirà a tutto schermo, come un\'app.</p>' +
      '<button class="btn secondario piccolo" data-azione="casa-ok">Fatto</button>';
  }

  // Riempie o svuota il riquadro della pagina Oggi, senza ridisegnare la pagina (né riportarla in cima).
  function aggiorna() {
    const box = document.querySelector('[data-consiglio-home]');
    if (!box) return;
    const visibile = daMostrare();
    box.classList.toggle('scheda', visibile);
    box.innerHTML = visibile ? contenuto() : '';
    if (!visibile) return;
    const ok = box.querySelector('[data-azione="casa-ok"]');
    if (ok) ok.addEventListener('click', function () { segnaVisto(); aggiorna(); });
    const installa = box.querySelector('[data-azione="casa-installa"]');
    if (installa) {
      installa.addEventListener('click', function () {
        const r = richiesta;
        richiesta = null;
        // L'evento si può usare una volta sola: se si rinuncia, restano le istruzioni del menu.
        Promise.resolve(r.prompt()).catch(function () {});
        r.userChoice.then(function (scelta) {
          if (scelta && scelta.outcome === 'accepted') segnaVisto();
          aggiorna();
        }, aggiorna);
      });
    }
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    richiesta = e;
    // Se c'è il nostro riquadro, la barra d'installazione di Chrome sarebbe un doppione.
    if (daMostrare()) e.preventDefault();
    aggiorna();
  });

  window.addEventListener('appinstalled', function () {
    richiesta = null;
    segnaVisto();
    aggiorna();
  });

  IMP.installa = { aggiorna: aggiorna };
})(window.IMP);
