"""Construit les images et les données de l'Atlas visuel de géométrie de Lie pour ProofLab.

Usage : python -I atlas_build.py <atlas.pdf> <dossier public/atlas-lie> <fichier .ts de sortie>

Le PDF est ouvert en lecture seule. Pour chaque planche (pages 4 à 93) :
  - rendu zoom 2 en WebP (qualité 80) et vignette de 480 px (qualité 72) ;
  - extraction des textes par position et style : partie, titre, question, « Lire le dessin »,
    « D'où vient la formule ? », « À vérifier » (question, réponse et boîte de la réponse),
    référence au cours.
Les liens (URI) du PDF ne sont ni lus ni recopiés. Les formules dessinées restent dans
l'image : elles ne sont pas retranscrites.
"""
import io
import json
import re
import sys
from pathlib import Path

import fitz
from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")
PDF, PUBLIC, OUT = sys.argv[1], Path(sys.argv[2]), Path(sys.argv[3])

TEAL, INK, GREY = 0x087F84, 0x182A3F, 0x526579
ROMANS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII"]


def spans(page):
    out = []
    for b in page.get_text("dict")["blocks"]:
        if b.get("type") != 0:
            continue
        for line in b["lines"]:
            for s in line["spans"]:
                if s["text"].strip():
                    out.append(
                        dict(text=s["text"], size=s["size"], bold=bool(s["flags"] & 16), color=s["color"], bbox=s["bbox"], font=s["font"])
                    )
    return out


def join(items):
    items = sorted(items, key=lambda s: (round(s["bbox"][1], 0), s["bbox"][0]))
    text = " ".join(s["text"].strip() for s in items)
    text = re.sub(r"\s+", " ", text).strip()
    # Apostrophes typographiques et espaces fines conservées ; espace avant ponctuation double normalisée.
    return text


def parse_parts(doc):
    parts = []
    for pno in (1, 2):  # pages 2 et 3 : sommaire
        lines = [l.strip() for l in doc[pno].get_text().splitlines() if l.strip()]
        for i, l in enumerate(lines):
            if l in ROMANS and i + 2 < len(lines):
                m = re.match(r"Chapitres? (\d+)(?: à (\d+))?\s+·\s+Planches (\d+)–(\d+)", lines[i + 2])
                if m:
                    c1, c2, p1, p2 = m.groups()
                    parts.append(
                        dict(
                            roman=l,
                            title=lines[i + 1],
                            group="tronc" if ROMANS.index(l) < 8 else "avance",
                            chapters=[int(c1), int(c2 or c1)],
                            plates=[int(p1), int(p2)],
                        )
                    )
    return parts


def parse_plate(page, pno):
    S = spans(page)
    W, H = page.rect.width, page.rect.height
    warn = []
    part_span = next((s for s in S if s["bbox"][1] < 50 and s["bbox"][0] < 300 and s["bold"]), None)
    plate_span = next((s for s in S if re.match(r"PLANCHE \d+ / 90", s["text"].strip())), None)
    if not plate_span or not part_span:
        raise SystemExit(f"PDF {pno} : en-tête introuvable")
    n = int(re.search(r"PLANCHE (\d+)", plate_span["text"]).group(1))
    roman, _, part_title = [x.strip() for x in part_span["text"].partition("/")]
    title = join([s for s in S if s["size"] > 20 and s["bbox"][1] < 100])
    question = join([s for s in S if s["color"] == GREY and "Serif" in s["font"] and 98 < s["bbox"][1] < 150])
    lecture = join(
        [s for s in S if s["bbox"][0] >= 610 and 175 < s["bbox"][1] < 400 and s["color"] == INK and not s["bold"]]
    )
    origine = join([s for s in S if s["bbox"][0] < 540 and 460 < s["bbox"][1] < 558 and s["color"] == INK and not s["bold"]])
    vq = [s for s in S if s["bbox"][0] >= 545 and 460 < s["bbox"][1] < 558 and s["color"] == INK and not s["bold"]]
    va = [s for s in S if s["bbox"][0] >= 545 and 460 < s["bbox"][1] < 558 and s["bold"] and s["color"] == TEAL]
    cours_span = next((s for s in S if s["text"].strip().startswith("Cours")), None)
    cours = None
    if cours_span:
        m = re.match(r"Cours · chapitres? (\d+)(?: à (\d+))? · p\. (\d+)(?: à (\d+))?", cours_span["text"].strip())
        if m:
            c1, c2, p1, p2 = m.groups()
            cours = dict(chapters=[int(c1), int(c2 or c1)], pages=[int(p1), int(p2 or p1)])
    if cours is None:
        warn.append("référence au cours illisible")
    box = None
    if va:
        x0 = min(s["bbox"][0] for s in va) - 3
        y0 = min(s["bbox"][1] for s in va) - 2.5
        x1 = W - 34
        y1 = max(s["bbox"][3] for s in va) + 3
        box = [round(x0 / W, 4), round(y0 / H, 4), round(x1 / W, 4), round(y1 / H, 4)]
    for name, val in [("titre", title), ("question", question), ("lecture", lecture), ("origine", origine), ("vérification", join(vq)), ("réponse", join(va))]:
        if not val:
            warn.append(f"{name} vide")
    plate = dict(
        n=n,
        pdfPage=pno,
        part=roman,
        partTitle=part_title,
        title=title,
        question=question,
        lecture=lecture,
        origine=origine,
        verifier=dict(question=join(vq), reponse=join(va), box=box),
        cours=cours,
    )
    return plate, warn


def render(page, n):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    full = PUBLIC / f"planche-{n:02d}.webp"
    img.save(full, "WEBP", quality=80, method=6)
    mini = img.resize((480, round(480 * pix.height / pix.width)), Image.LANCZOS)
    mini.save(PUBLIC / "mini" / f"planche-{n:02d}.webp", "WEBP", quality=72, method=6)
    return full.stat().st_size


def main():
    doc = fitz.open(PDF)
    (PUBLIC / "mini").mkdir(parents=True, exist_ok=True)
    parts = parse_parts(doc)
    assert len(parts) == 17, f"{len(parts)} parties lues"
    plates, total = [], 0
    for pno in range(4, doc.page_count + 1):
        page = doc[pno - 1]
        if "PLANCHE" not in page.get_text():
            continue
        plate, warn = parse_plate(page, pno)
        if warn:
            print(f"Planche {plate['n']:02d} (PDF {pno}) : {', '.join(warn)}")
        plates.append(plate)
        total += render(page, plate["n"])
    nums = [p["n"] for p in plates]
    assert nums == list(range(1, 91)), nums
    data = dict(
        source=dict(title="Atlas visuel — Géométrie de Lie", author="Projet MATHS", pdfPages=doc.page_count, plates=len(plates)),
        parts=parts,
        plates=plates,
    )
    body = json.dumps(data, ensure_ascii=False, indent=1)
    OUT.write_text(
        "/**\n * Données de l'Atlas visuel de géométrie de Lie (90 planches), générées depuis le PDF par\n"
        " * scripts/atlas/atlas_build.py. Textes cités tels quels ; formules dans les images.\n"
        " * Ne pas modifier à la main : relancer le script.\n */\n"
        "import type { AtlasData } from './types';\n\n"
        f"export const ATLAS_DATA: AtlasData = {body};\n",
        encoding="utf-8",
    )
    print(f"{len(plates)} planches, {len(parts)} parties, images pleines : {total / 1e6:.1f} Mo")


main()
