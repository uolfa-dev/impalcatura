#!/usr/bin/env python3
"""
Notizie in italiano per Impalcatura.

Scarica le notizie degli ultimi giorni da Wikipedia in inglese (Portal:Current events e
Template:In the news), le scompone con le stesse regole del sito (js/notizie.js) e le traduce
in italiano con un modello di traduzione open source: OPUS-MT dell'Università di Helsinki.
Scrive notizie.json nella radice del sito; il browser lo legge al posto di Wikipedia.

Le traduzioni già fatte si riprendono dal notizie.json precedente: ogni volta si traducono
solo i testi nuovi. Il testo inglese resta nel file, perché gli agganci ai mattoni si cercano
sull'originale.

Uso:
    python strumenti/notizie.py                      # scarica, traduce e scrive notizie.json
    python strumenti/notizie.py --senza-traduzione   # solo scarico e scomposizione, per le prove
"""

import argparse
import copy
import datetime as dt
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

from bs4 import BeautifulSoup, Tag

RADICE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API = ("https://en.wikipedia.org/w/api.php?action=parse&format=json&formatversion=2"
       "&prop=text&disableeditsection=1&disablelimitreport=1&page=")
PAGINA_EVENTI = "Portal:Current_events"
PAGINA_ITN = "Template:In_the_news"
MODELLO = "Helsinki-NLP/opus-mt-tc-big-en-it"
REVISIONE = "592d2cfb0797867f1dd223e49141de051faa65c7"
LOTTO = 8
REPO = os.environ.get("GITHUB_REPOSITORY", "uolfa-dev/impalcatura")
# Wikimedia chiede a chi usa le sue API di farsi riconoscere e di indicare un contatto.
USER_AGENT = f"Impalcatura/1.0 (https://github.com/{REPO}; traduzione delle notizie per un sito open source)"


def log(messaggio):
    print(messaggio, flush=True)


def scarica(pagina):
    url = API + urllib.parse.quote(pagina)
    richiesta = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    for tentativo in range(4):
        try:
            with urllib.request.urlopen(richiesta, timeout=60) as risposta:
                dati = json.load(risposta)
            if "error" in dati:
                raise RuntimeError(dati["error"].get("info", "errore di Wikipedia"))
            return dati["parse"]["text"]
        except Exception as errore:  # rete instabile: si riprova con calma
            if tentativo == 3:
                raise
            log(f"  {pagina}: {errore}; riprovo")
            time.sleep(10 * (tentativo + 1))


# ---------- Scomposizione: deve dare lo stesso risultato di js/notizie.js ----------

def pulisci(testo):
    testo = re.sub(r"\s+", " ", testo)
    testo = re.sub(r"\s+([.,;:])", r"\1", testo)
    return testo.strip()


def titolo_da_href(href):
    try:
        titolo = urllib.parse.unquote(href[len("/wiki/"):], errors="strict")
    except UnicodeDecodeError:
        return ""
    return titolo.split("#")[0].replace("_", " ")


def figli(tag, nome=None):
    return [c for c in tag.children if isinstance(c, Tag) and (nome is None or c.name == nome)]


def link_wiki(nodo):
    return [titolo_da_href(a["href"]) for a in nodo.find_all("a", href=True) if a["href"].startswith("/wiki/")]


def senza_codice(nodo):
    for elemento in nodo.find_all(["style", "script"]):
        elemento.decompose()
    return nodo


def visita(ul, contesto, categoria, voci):
    for li in figli(ul, "li"):
        sottoliste = figli(li, "ul")
        proprio = senza_codice(copy.copy(li))
        for u in proprio.find_all("ul"):
            u.decompose()
        esterni = proprio.select("a.external")
        fonti = [{"nome": re.sub(r"[()]", "", a.get_text()).strip(), "url": a.get("href", "")} for a in esterni]
        fonti = [f for f in fonti if re.match(r"https?://", f["url"])]
        for a in esterni:
            a.decompose()
        link = [t for t in link_wiki(proprio) if t]
        testo = pulisci(proprio.get_text())
        voce = {"testo": testo, "contesto": list(contesto), "categoria": categoria, "fonti": fonti, "link": link}
        if sottoliste:
            if fonti and testo:
                voci.append(voce)
            for u in sottoliste:
                visita(u, contesto + [testo], categoria, voci)
        elif testo:
            voci.append(voce)


def analizza_eventi(html):
    doc = BeautifulSoup(html, "html5lib")
    giorni = []
    for box in doc.select(".current-events-main"):
        bday = box.select_one(".bday")
        data = bday.get_text().strip() if bday else ""
        contenuto = box.select_one(".current-events-content")
        if not data or not contenuto:
            continue
        voci = []
        categoria = ""
        for elemento in figli(contenuto):
            if elemento.name == "p":
                categoria = pulisci(senza_codice(elemento).get_text())
            elif elemento.name == "ul":
                visita(elemento, [], categoria, voci)
        giorni.append({"data": data, "voci": voci})
    giorni.sort(key=lambda g: g["data"], reverse=True)
    return giorni


def analizza_itn(html):
    doc = BeautifulSoup(html, "html5lib")
    ul = doc.find("ul")
    if ul is None:
        return []
    voci = []
    for li in figli(ul, "li"):
        senza_codice(li)
        for corsivo in li.find_all("i"):
            if re.search("pictured", corsivo.get_text(), re.IGNORECASE):
                corsivo.decompose()
        link = link_wiki(li)
        principale = next((a for a in li.find_all("a", href=True)
                           if a["href"].startswith("/wiki/") and a.find_parent("b") is not None), None)
        fonti = [{"nome": "Wikipedia", "url": "https://en.wikipedia.org" + principale["href"]}] if principale else []
        voci.append({"testo": pulisci(li.get_text()), "contesto": [], "categoria": "In primo piano",
                     "fonti": fonti, "link": link})
    return voci


# ---------- Traduzione ----------

def traduzioni_precedenti(percorso):
    """Coppie inglese -> italiano già presenti nel notizie.json precedente."""
    try:
        with open(percorso, encoding="utf-8") as f:
            vecchio = json.load(f)
    except (OSError, ValueError):
        return {}
    coppie = {}
    voci = list(vecchio.get("itn", [])) + [v for g in vecchio.get("giorni", []) for v in g.get("voci", [])]
    for v in voci:
        if v.get("testo") and v.get("testo_it"):
            coppie[v["testo"]] = v["testo_it"]
        if len(v.get("contesto_it", [])) == len(v.get("contesto", [])):
            coppie.update(zip(v.get("contesto", []), v.get("contesto_it", [])))
    return coppie


def plausibile(originale, tradotto):
    # Una traduzione vuota o lunghissima di solito è il modello che si inceppa e ripete.
    return bool(tradotto) and len(tradotto) <= 3 * len(originale) + 20


def traduci(testi):
    if not testi:
        return {}
    import torch
    from transformers import MarianMTModel, MarianTokenizer

    torch.set_num_threads(max(1, os.cpu_count() or 1))
    inizio = time.time()
    tokenizzatore = MarianTokenizer.from_pretrained(MODELLO, revision=REVISIONE)
    modello = MarianMTModel.from_pretrained(MODELLO, revision=REVISIONE)
    modello.eval()
    log(f"  modello caricato in {time.time() - inizio:.0f} s")

    risultati = {}
    ordinati = sorted(testi, key=len)  # testi di lunghezza simile nello stesso lotto: meno spreco
    for i in range(0, len(ordinati), LOTTO):
        lotto = ordinati[i:i + LOTTO]
        codificati = tokenizzatore(lotto, return_tensors="pt", padding=True, truncation=True, max_length=512)
        with torch.inference_mode():
            uscite = modello.generate(**codificati, num_beams=4, max_new_tokens=512)
        for originale, uscita in zip(lotto, uscite):
            tradotto = tokenizzatore.decode(uscita, skip_special_tokens=True).strip()
            if plausibile(originale, tradotto):
                risultati[originale] = tradotto
            else:
                log(f"  traduzione scartata: {originale[:80]!r}")
        log(f"  tradotti {min(i + LOTTO, len(ordinati))}/{len(ordinati)} ({time.time() - inizio:.0f} s)")
    return risultati


# ---------- Programma principale ----------

def main():
    parser = argparse.ArgumentParser(description="Scarica le notizie da Wikipedia e le traduce in italiano.")
    parser.add_argument("--uscita", default=os.path.join(RADICE, "notizie.json"), help="file da scrivere")
    parser.add_argument("--senza-traduzione", action="store_true", help="solo scarico e scomposizione")
    parser.add_argument("--salva-html", metavar="CARTELLA", help="salva anche l'HTML scaricato (per le prove)")
    args = parser.parse_args()

    log("Scarico le notizie da Wikipedia...")
    html_eventi = scarica(PAGINA_EVENTI)
    html_itn = scarica(PAGINA_ITN)
    if args.salva_html:
        os.makedirs(args.salva_html, exist_ok=True)
        for nome, html in (("eventi.html", html_eventi), ("itn.html", html_itn)):
            with open(os.path.join(args.salva_html, nome), "w", encoding="utf-8") as f:
                f.write(html)

    giorni = analizza_eventi(html_eventi)
    itn = analizza_itn(html_itn)
    voci = itn + [v for g in giorni for v in g["voci"]]
    log(f"  {len(itn)} notizie in primo piano, {len(voci) - len(itn)} in {len(giorni)} giorni")
    if not giorni or len(voci) < 10:
        sys.exit("Troppe poche notizie: forse Wikipedia ha cambiato la struttura delle pagine.")

    coppie = traduzioni_precedenti(args.uscita)
    completa = True
    if not args.senza_traduzione:
        testi = sorted({t for v in voci for t in [v["testo"], *v["contesto"]] if t})
        nuovi = [t for t in testi if t not in coppie]
        log(f"Traduco {len(nuovi)} testi nuovi ({len(testi) - len(nuovi)} già tradotti)...")
        try:
            coppie.update(traduci(nuovi))
        except Exception as errore:
            # Meglio notizie fresche in parte in inglese che notizie vecchie: il sito mostra l'originale.
            log(f"ATTENZIONE: traduzione non riuscita ({errore}); restano in inglese i testi nuovi.")
            completa = False

    for v in voci:
        if v["testo"] in coppie:
            v["testo_it"] = coppie[v["testo"]]
        contesto_it = [coppie.get(c) for c in v["contesto"]]
        if v["contesto"] and all(contesto_it):
            v["contesto_it"] = contesto_it
    tradotte = sum(1 for v in voci if "testo_it" in v)

    dati = {
        "versione": 1,
        "generato": dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "fonte": "https://en.wikipedia.org/wiki/Portal:Current_events",
        "traduzione": None if args.senza_traduzione else {
            "modello": MODELLO,
            "revisione": REVISIONE,
            "completa": completa and tradotte == len(voci),
        },
        "itn": itn,
        "giorni": giorni,
    }
    with open(args.uscita, "w", encoding="utf-8", newline="\n") as f:
        json.dump(dati, f, ensure_ascii=False, indent=1)
        f.write("\n")
    log(f"Scritto {args.uscita}: {len(voci)} notizie, {tradotte} in italiano.")


if __name__ == "__main__":
    main()
