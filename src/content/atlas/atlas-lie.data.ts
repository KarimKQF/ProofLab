/**
 * Données de l'Atlas visuel de géométrie de Lie (90 planches), générées depuis le PDF par
 * scripts/atlas/atlas_build.py. Textes cités tels quels ; formules dans les images.
 * Ne pas modifier à la main : relancer le script.
 */
import type { AtlasData } from './types';

export const ATLAS_DATA: AtlasData = {
 "source": {
  "title": "Atlas visuel — Géométrie de Lie",
  "author": "Projet MATHS",
  "pdfPages": 93,
  "plates": 90
 },
 "parts": [
  {
   "roman": "I",
   "title": "Variétés différentielles",
   "group": "tronc",
   "chapters": [
    1,
    19
   ],
   "plates": [
    1,
    23
   ]
  },
  {
   "roman": "II",
   "title": "Actions de groupes",
   "group": "tronc",
   "chapters": [
    20,
    23
   ],
   "plates": [
    24,
    27
   ]
  },
  {
   "roman": "III",
   "title": "Groupes et algèbres de Lie",
   "group": "tronc",
   "chapters": [
    24,
    38
   ],
   "plates": [
    28,
    42
   ]
  },
  {
   "roman": "IV",
   "title": "Symétries des EDO",
   "group": "tronc",
   "chapters": [
    39,
    42
   ],
   "plates": [
    43,
    47
   ]
  },
  {
   "roman": "V",
   "title": "Symétries des EDP",
   "group": "tronc",
   "chapters": [
    43,
    49
   ],
   "plates": [
    48,
    55
   ]
  },
  {
   "roman": "VI",
   "title": "Variations et Noether",
   "group": "tronc",
   "chapters": [
    50,
    54
   ],
   "plates": [
    56,
    61
   ]
  },
  {
   "roman": "VII",
   "title": "Géométrie symplectique",
   "group": "tronc",
   "chapters": [
    55,
    59
   ],
   "plates": [
    62,
    66
   ]
  },
  {
   "roman": "VIII",
   "title": "Apprentissage scientifique",
   "group": "tronc",
   "chapters": [
    60,
    65
   ],
   "plates": [
    67,
    72
   ]
  },
  {
   "roman": "IX",
   "title": "Cohomologie de de Rham",
   "group": "avance",
   "chapters": [
    66,
    66
   ],
   "plates": [
    73,
    74
   ]
  },
  {
   "roman": "X",
   "title": "Théorie de Hodge",
   "group": "avance",
   "chapters": [
    67,
    68
   ],
   "plates": [
    75,
    76
   ]
  },
  {
   "roman": "XI",
   "title": "Fibrés et connexions",
   "group": "avance",
   "chapters": [
    69,
    70
   ],
   "plates": [
    77,
    79
   ]
  },
  {
   "roman": "XII",
   "title": "Classes caractéristiques",
   "group": "avance",
   "chapters": [
    71,
    71
   ],
   "plates": [
    80,
    81
   ]
  },
  {
   "roman": "XIII",
   "title": "Représentations compactes",
   "group": "avance",
   "chapters": [
    72,
    72
   ],
   "plates": [
    82,
    83
   ]
  },
  {
   "roman": "XIV",
   "title": "Racines et poids",
   "group": "avance",
   "chapters": [
    73,
    73
   ],
   "plates": [
    84,
    84
   ]
  },
  {
   "roman": "XV",
   "title": "Réduction symplectique",
   "group": "avance",
   "chapters": [
    74,
    75
   ],
   "plates": [
    85,
    86
   ]
  },
  {
   "roman": "XVI",
   "title": "Systèmes intégrables",
   "group": "avance",
   "chapters": [
    76,
    77
   ],
   "plates": [
    87,
    89
   ]
  },
  {
   "roman": "XVII",
   "title": "Vers l’analyse et le calcul",
   "group": "avance",
   "chapters": [
    78,
    78
   ],
   "plates": [
    90,
    90
   ]
  }
 ],
 "plates": [
  {
   "n": 1,
   "pdfPage": 4,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Le tore, une variété non linéaire",
   "question": "Comment un espace peut-il avoir des coordonnées planes et des boucles qui ne se referment pas dans un rectangle ordinaire ?",
   "lecture": "Recoller les bords orange entre eux et les bords verts entre eux, en suivant les flèches. La tache violette représente un voisinage où deux coordonnées suffisent. Les deux directions périodiques sont indépendantes.",
   "origine": "Le paramétrage par deux angles est localement une carte inverse. Un angle parcouru sur un tour complet revient au même point. Le dessin en 3D montre la topologie du tore, avec la métrique du plongement choisi.",
   "verifier": {
    "question": "Combien de paramètres libres faut-il pour indiquer un point dans la tache violette ?",
    "reponse": "Deux.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     1,
     1
    ],
    "pages": [
     2,
     4
    ]
   }
  },
  {
   "n": 2,
   "pdfPage": 5,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Cartes et atlas",
   "question": "Comment donner des coordonnées à la sphère lorsqu’une carte laisse un point de côté ?",
   "lecture": "À gauche, chaque cercle décalé code le même cercle privé d’un point. À droite, suis le rayon issu du pôle nord jusqu’au plan équatorial. La coupe montre une seule direction du plan image.",
   "origine": "La droite N + s(p−N) atteint z = 0 lorsque s = 1/(1−z). Une seconde carte part du sud. Sur le domaine commun, une transition comme φ_S ∘ φ_N⁻¹ convertit les coordonnées du même point.",
   "verifier": {
    "question": "Pourquoi faut-il exclure N de la projection ?",
    "reponse": "Le rayon N → N ne définit aucune direction.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8281
    ]
   },
   "cours": {
    "chapters": [
     2,
     2
    ],
    "pages": [
     5,
     8
    ]
   }
  },
  {
   "n": 3,
   "pdfPage": 6,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Application lisse et différentielle",
   "question": "Que devient une petite vitesse lorsque le dessin est déformé par une application ?",
   "lecture": "Le quadrillage gris se déforme sous F. Le segment vert de départ devient la petite courbe verte à droite. La flèche orange est sa vitesse initiale. Les deux tracés se séparent à mesure qu’on s’éloigne de p.",
   "origine": "Dans des cartes, on dérive ψ ∘ F ∘ φ⁻¹ avec la jacobienne. La règle de chaîne assure que le vecteur géométrique transporté est indépendant des cartes. Pour la hauteur sur la sphère, dh_p(v) est simplement la composante verticale de v.",
   "verifier": {
    "question": "Si la courbe image est horizontale à l’instant initial, que mesure dh_p(v) ?",
    "reponse": "Zéro.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     3,
     3
    ],
    "pages": [
     9,
     11
    ]
   }
  },
  {
   "n": 4,
   "pdfPage": 7,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Vecteurs et espaces tangents",
   "question": "Dans quelle direction peux-tu partir au premier instant tout en restant sur la sphère ?",
   "lecture": "La courbe verte passe par p. La flèche verte est sa vitesse au passage. Le rayon orange est normal aux vitesses tangentes. Les flèches verte et violette engendrent le plan tangent, représenté à travers p.",
   "origine": "⟂ Dériver γ(t)·γ(t) = 1 donne p·γ′(0) = 0. Réciproquement, si v p, la courbe (p + tv)/‖p + tv‖ a pour vitesse initiale v. Le vecteur agit sur une fonction par v(f) = (f ∘ γ)′(0), ce qui donne la règle de Leibniz.",
   "verifier": {
    "question": "Combien de directions indépendantes as-tu sur le cercle et sur la sphère ?",
    "reponse": "Une sur S¹ et deux sur S².",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     4,
     4
    ],
    "pages": [
     12,
     17
    ]
   }
  },
  {
   "n": 5,
   "pdfPage": 8,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Fibré tangent et changement de base",
   "question": "Où ranger toutes les vitesses possibles avec leur point d’attache ?",
   "lecture": "Le cylindre représente ici l’ensemble des couples (θ,a) du cercle : a est le coefficient du vecteur v = a∂θ. Une droite verticale rassemble toutes les vitesses d’un même point. La section bleue a = 0 représente les vitesses nulles.",
   "origine": "Dans une autre carte, le coefficient tangent se transforme par la différentielle du changement de coordonnées. Sur S¹, l’orientation donne une base tangente globale, d’où le produit. Le fibré cotangent rassemble de la même façon les formes linéaires sur chaque fibre tangente.",
   "verifier": {
    "question": "Que donne la projection π de deux hauteurs différentes sur la même fibre ?",
    "reponse": "Le même point du cercle.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     4,
     4
    ],
    "pages": [
     12,
     17
    ]
   }
  },
  {
   "n": 6,
   "pdfPage": 9,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Covecteur, différentielle et gradient",
   "question": "Comment le même relief donne-t-il deux flèches de montée différentes ?",
   "lecture": "Les lignes vertes sont les niveaux de f = x + y. Leur franchissement mesure df(v) = vₓ + vᵧ. L’ellipse violette indique le coût des directions. La flèche orange donne la direction qui monte le plus par unité de longueur pour cette métrique.",
   "origine": "Le covecteur df est le même des deux côtés. Pour g = diag(4,1), son gradient est (1/4,1), contre (1,1) à gauche. Pour ramener un covecteur par F, on envoie d’abord le vecteur par dF, puis on évalue α.",
   "verifier": {
    "question": "Quel est le noyau de df dans ce dessin ?",
    "reponse": "Les vitesses vérifiant vₓ + vᵧ = 0, parallèles aux niveaux.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8482
    ]
   },
   "cours": {
    "chapters": [
     5,
     5
    ],
    "pages": [
     18,
     21
    ]
   }
  },
  {
   "n": 7,
   "pdfPage": 10,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Champs, courbes intégrales et flots",
   "question": "Comment des flèches locales produisent-elles un mouvement de tout l’espace ?",
   "lecture": "Chaque flèche verte donne une vitesse au point où elle est fixée. La trajectoire suit ces directions au fur et à mesure. L’arc orange garde son rayon. À droite, les trajectoires du champ −grad V traversent les niveaux du potentiel vers le centre.",
   "origine": "Pour le champ X(x,y)=(−y,x), la solution est une rotation. Pour X = −grad V, dV/dt = −‖grad V‖². La propriété de composition du flot vient de l’unicité des solutions d’une EDO autonome, aux temps où le flot est défini.",
   "verifier": {
    "question": "Dans quel panneau le potentiel V diminue-t-il le long des trajectoires ?",
    "reponse": "Dans le panneau de droite.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     6,
     6
    ],
    "pages": [
     22,
     24
    ]
   }
  },
  {
   "n": 8,
   "pdfPage": 11,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Crochet de Lie et dérivée de Lie",
   "question": "Pourquoi avancer, monter, reculer et redescendre peut-il laisser un déplacement net ?",
   "lecture": "À gauche, la montée a lieu en x+t, où le champ Y est plus fort. La descente a lieu en x. La différence violette est le défaut du commutateur. À droite, on ramène la flèche Y après le flot de X dans l’espace tangent initial.",
   "origine": "Les deux pas horizontaux s’annulent. Les pas verticaux valent t(x+t) et −tx, donc la différence vaut t². Pour la dérivée de Lie, la comparaison des flèches ramenées donne d/dt|₀ (Φᵡ_t)*Y = [X,Y].",
   "verifier": {
    "question": "Pourquoi le défaut est-il proportionnel à t² ?",
    "reponse": "Un facteur t vient du pas vertical, l’autre du changement de x.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8482
    ]
   },
   "cours": {
    "chapters": [
     7,
     7
    ],
    "pages": [
     25,
     27
    ]
   }
  },
  {
   "n": 9,
   "pdfPage": 12,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Immersion, plongement et submersion",
   "question": "Le rang de la différentielle dit-il si une courbe se recoupe ?",
   "lecture": "À gauche, la courbe en huit a une vitesse non nulle même quand deux branches se croisent. Le cercle du milieu a la topologie héritée du plan. À droite, des fibres verticales entières sont projetées sur l’axe.",
   "origine": "Une immersion a une différentielle injective. Un plongement ajoute une identification topologique avec son image. Une submersion a une différentielle surjective. Le théorème du rang constant donne la forme affichée après choix de cartes.",
   "verifier": {
    "question": "Le huit issu d’un cercle est-il un plongement ?",
    "reponse": "Non. Le croisement a deux antécédents.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8281
    ]
   },
   "cours": {
    "chapters": [
     8,
     8
    ],
    "pages": [
     28,
     31
    ]
   }
  },
  {
   "n": 10,
   "pdfPage": 13,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Fonction inverse, implicite et niveau régulier",
   "question": "Quand une équation F = c découpe-t-elle une vraie courbe ?",
   "lecture": "Sur l’arc vert, une direction orange change la valeur de F et une direction tangente la garde au premier ordre. Dans la carte à droite, la valeur F−c est une coordonnée verticale et le niveau est la ligne du milieu.",
   "origine": "La fonction inverse transforme une jacobienne carrée inversible en coordonnées locales. L’implicite l’applique à un bloc de variables : on résout ces variables en fonction des autres. Un niveau régulier de r équations indépendantes dans ℝᵐ a dimension m−r.",
   "verifier": {
    "question": "Pour F(x,y)=x²+y², pourquoi le niveau c>0 est-il régulier ?",
    "reponse": "Le gradient (2x,2y) ne s’y annule jamais.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     8,
     8
    ],
    "pages": [
     28,
     31
    ]
   }
  },
  {
   "n": 11,
   "pdfPage": 14,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Tenseurs et contraction",
   "question": "Que stocke un tableau de composantes tensoriel ?",
   "lecture": "Dans la grille, dx lit la composante horizontale de v et dy la verticale de w. Le produit donne un tenseur covariant à deux entrées. À droite, les cases de même indice supérieur et inférieur sont sommées.",
   "origine": "Un tenseur est multilinéaire. Un tenseur de type (r,s) reçoit r covecteurs et s vecteurs. Ses composantes changent avec les bases et la valeur du calcul reste la même. Un champ tensoriel choisit un tenseur lisse dans chaque fibre.",
   "verifier": {
    "question": "Quel nombre obtient-on pour (dx ⊗ dy)(eₓ,eᵧ) ?",
    "reponse": "1.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8281
    ]
   },
   "cours": {
    "chapters": [
     9,
     9
    ],
    "pages": [
     32,
     33
    ]
   }
  },
  {
   "n": 12,
   "pdfPage": 15,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Distributions et théorème de Frobenius",
   "question": "Des plans prescrits en chaque point peuvent-ils toujours être les tangentes de surfaces ?",
   "lecture": "À gauche, les plans horizontaux sont tangents aux feuilles z = c. À droite, les quatre mouvements respectent dz = x dy. La boucle se ferme en projection (x,y) et se termine plus haut en z, selon la flèche violette.",
   "origine": "Dans le rectangle projeté, le déplacement vertical vaut ∮x dy, soit l’aire orientée du rectangle. Le crochet donne la même direction. Frobenius identifie l’intégrabilité locale d’une distribution lisse de rang constant à sa fermeture par crochet.",
   "verifier": {
    "question": "Quel mouvement est inaccessible comme direction instantanée dans D ?",
    "reponse": "La direction verticale pure ∂z.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     10,
     10
    ],
    "pages": [
     34,
     36
    ]
   }
  },
  {
   "n": 13,
   "pdfPage": 16,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Formes différentielles, produit extérieur et pull-back",
   "question": "Pourquoi l’aire élémentaire en coordonnées polaires porte-t-elle un facteur r ?",
   "lecture": "Les deux flèches ordonnées forment un parallélogramme. Leur échange inverse le signe. À droite, la cellule est comprise entre deux rayons et deux arcs. À distance r du centre, une variation d’angle dθ donne une longueur r dθ.",
   "origine": "Le pull-back évalue la forme sur les images des vecteurs par dF. Pour F(r,θ)=(r cosθ,r sinθ), la jacobienne a déterminant r. La dérivée extérieure mesure une circulation infinitésimale : d(x dy)=dx∧dy, comme ∮x dy autour d’un rectangle.",
   "verifier": {
    "question": "Que donne une 2-forme sur deux vecteurs colinéaires ?",
    "reponse": "Zéro par alternance.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     11,
     11
    ],
    "pages": [
     37,
     39
    ]
   }
  },
  {
   "n": 14,
   "pdfPage": 17,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Orientation, bord et forme volume",
   "question": "Comment choisir le sens positif d’un contour à partir de l’intérieur ?",
   "lecture": "Pour le disque, mets d’abord la normale sortante orange, puis la tangente violette. La paire doit avoir l’orientation positive du plan : le bord est parcouru dans le sens antihoraire. Sur le ruban, une orientation locale se renverse après un tour.",
   "origine": "Une variété à bord se lit localement dans un demi-espace près de son bord. L’orientation choisit les bases positives de façon continue. Une métrique y associe une forme volume. Sur la sphère unité, l’élément d’aire vaut sin θ dθ dφ et son intégrale vaut 4π.",
   "verifier": {
    "question": "En inversant l’orientation du disque, que devient celle de son bord ?",
    "reponse": "Elle s’inverse aussi.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     12,
     12
    ],
    "pages": [
     40,
     43
    ]
   }
  },
  {
   "n": 15,
   "pdfPage": 18,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Partition de l’unité et intégration locale",
   "question": "Comment additionner des intégrales de cartes sans compter deux fois leur recouvrement ?",
   "lecture": "Les deux poids glissent d’une carte à l’autre dans la zone grisée. Leur somme reste égale à la ligne violette. Chaque contribution s’éteint avant de sortir du domaine où sa carte peut être utilisée.",
   "origine": "Pour une partition subordonnée au recouvrement, les poids sont lisses, non négatifs, à supports dans les ouverts, et la famille est localement finie. On intègre χᵢω dans une carte orientée. Le changement de variables réconcilie les descriptions sur les recouvrements.",
   "verifier": {
    "question": "Si χ₁ vaut 0,3 dans le recouvrement de deux cartes, combien vaut χ₂ ?",
    "reponse": "0,7.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     12,
     12
    ],
    "pages": [
     40,
     43
    ]
   }
  },
  {
   "n": 16,
   "pdfPage": 19,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Théorème de Stokes",
   "question": "Pourquoi le calcul de toutes les petites circulations se ramène-t-il au contour ?",
   "lecture": "Suis les contours des deux cellules dans le sens positif. L’arête commune est lue une fois vers le haut et une fois vers le bas. Leurs contributions s’annulent, en laissant les flèches vertes extérieures.",
   "origine": "Le dessin est le mécanisme local de la preuve. Sur une variété orientée, les cartes et une partition de l’unité ramènent au calcul local. Sur le disque, ω = ½(x dy−y dx) donne dω = dx∧dy et ∮ω = π. Green et le théorème du flux sont des lectures de Stokes.",
   "verifier": {
    "question": "Sur une variété compacte orientée sans bord, que vaut l’intégrale d’une forme exacte de degré maximal ?",
    "reponse": "Zéro.",
    "box": [
     0.658,
     0.8469,
     0.9596,
     0.8711
    ]
   },
   "cours": {
    "chapters": [
     13,
     13
    ],
    "pages": [
     44,
     46
    ]
   }
  },
  {
   "n": 17,
   "pdfPage": 20,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Métrique et distance riemanniennes",
   "question": "Comment mesurer une vitesse sur une variété, puis la longueur d’un chemin ?",
   "lecture": "À gauche, les courbes représentent les vitesses de norme 1 pour deux produits scalaires. À droite, le trajet admissible sur S¹ suit l’arc vert. La corde orange est la distance euclidienne du dessin ambiant.",
   "origine": "La métrique est un produit scalaire lisse sur les espaces tangents. Sur un cercle de rayon R, g = R²dθ². Sur la sphère unité en colatitude θ, g = dθ² + sin²θ dφ² : un même pas de longitude raccourcit près d’un pôle.",
   "verifier": {
    "question": "Sur le cercle unité, quelle distance intrinsèque sépare deux antipodes ?",
    "reponse": "π.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     14,
     14
    ],
    "pages": [
     47,
     49
    ]
   }
  },
  {
   "n": 18,
   "pdfPage": 21,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Connexion, transport parallèle et géodésique",
   "question": "Comment comparer des flèches ancrées à des endroits différents d’une surface ?",
   "lecture": "À gauche, les flèches orange sont transportées le long de l’équateur. Elles peuvent tourner dans ℝ³ tout en restant parallèles au sens de la connexion. À droite, le trajet vert suit un grand cercle. L’orange suit un parallèle de latitude.",
   "origine": "Pour la métrique induite sur S², la dérivée covariante projette la dérivée ambiante sur le plan tangent. Sur un grand cercle à vitesse constante, l’accélération est purement normale. La connexion de Levi-Civita est compatible avec la métrique et sans torsion.",
   "verifier": {
    "question": "Quel vecteur le transport parallèle d’une géodésique transporte-t-il naturellement ?",
    "reponse": "Sa propre vitesse.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     15,
     15
    ],
    "pages": [
     50,
     53
    ]
   }
  },
  {
   "n": 19,
   "pdfPage": 22,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Courbure et holonomie",
   "question": "Peux-tu revenir au même point avec une flèche tournée, sans avoir tourné la flèche localement ?",
   "lecture": "Pars du pôle N, descends jusqu’à A, suis l’équateur jusqu’à B, puis remonte. Les trois côtés sont des géodésiques. Au retour, les deux flèches se comparent dans le même plan tangent en N et font un angle droit.",
   "origine": "Avec N=e₃, A=e₁ et B=e₂, la vitesse initiale e₁ devient −e₃ au point A. Elle reste −e₃ le long de l’équateur et arrive égale à e₂ en N. Sur la sphère unité, l’aire du triangle vaut π/2, égale à l’angle d’holonomie en valeur absolue.",
   "verifier": {
    "question": "Pourquoi peut-on comparer directement les deux flèches à droite ?",
    "reponse": "Elles sont toutes deux ancrées en N.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     16,
     16
    ],
    "pages": [
     54,
     56
    ]
   }
  },
  {
   "n": 20,
   "pdfPage": 23,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Courbure sectionnelle, Ricci et scalaire",
   "question": "Comment deux géodésiques voisines s’écartent-elles selon la courbure du plan ?",
   "lecture": "Les courbes suivent la séparation infinitésimale de deux géodésiques partant du même point avec un faible écart d’angle. Elle croît comme sin(s), s ou sinh(s) dans les trois modèles de courbure constante.",
   "origine": "La courbure sectionnelle K est attachée à un plan tangent. Ric(v,v), pour v unitaire, somme les courbures des plans contenant v et un vecteur d’une base orthonormée de v⊥. La courbure scalaire est la trace de Ric. Gauss-Bonnet relie l’intégrale de K à la topologie d’une surface fermée.",
   "verifier": {
    "question": "Dans quelle géométrie le petit écart grandit-il le plus vite ici ?",
    "reponse": "Celle de courbure négative.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     16,
     16
    ],
    "pages": [
     54,
     56
    ]
   }
  },
  {
   "n": 21,
   "pdfPage": 24,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Sous-variétés, contraintes et multiplicateurs",
   "question": "Comment transformer un champ ambiant en une vitesse qui respecte la contrainte ?",
   "lecture": "Le segment pointillé représente la composante normale retirée à V. La flèche verte reste tangente. À droite, le cône n’a pas de plan tangent unique à son sommet. Sur le cylindre ou la sphère, le niveau régulier donne un plan tangent bien défini.",
   "origine": "Une vitesse admissible appartient à ker dF_p. À un extremum contraint, df_p annule ce noyau. Pour une contrainte scalaire régulière, les covecteurs qui l’annulent sont les multiples de dF_p. Cette lecture donne la condition de Lagrange.",
   "verifier": {
    "question": "Si V est radial sur la sphère, quelle est sa projection tangente ?",
    "reponse": "Le vecteur nul.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     17,
     17
    ],
    "pages": [
     57,
     59
    ]
   }
  },
  {
   "n": 22,
   "pdfPage": 25,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Espaces projectifs, Stiefel et Grassmanniennes",
   "question": "Quelles informations oublies-tu lorsque tu passes du repère à son sous-espace ?",
   "lecture": "À gauche, deux unitaires opposés codent la même droite. Au centre, un point de Stiefel est un k-uplet ordonné de colonnes orthonormées. À droite, les repères orange et vert représentent le même sous-espace de la grassmannienne.",
   "origine": "Dans St(k,n), la matrice Q vérifie QᵀQ=Iₖ. Q et QU, pour U ∈ O(k), engendrent le même espace. Le cas k=n donne O(n). La condition det Q=1 sélectionne les bases orientées de SO(n).",
   "verifier": {
    "question": "Pour k=1, que perd-on en passant de St(1,n) à Gr(1,n) ?",
    "reponse": "Le signe du vecteur unitaire.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     18,
     18
    ],
    "pages": [
     60,
     62
    ]
   }
  },
  {
   "n": 23,
   "pdfPage": 26,
   "part": "I",
   "partTitle": "Variétés différentielles",
   "title": "Carte des objets géométriques",
   "question": "Quand utiliser une carte, une flèche, une forme ou une connexion ?",
   "lecture": "Pars de la variété. Choisis un point, puis une direction. Un covecteur mesure cette direction. Vers le bas, les directions deviennent un champ et des trajectoires, tandis que les covecteurs alternés donnent des formes à intégrer.",
   "origine": "Une carte fournit des coordonnées. Une métrique mesure les longueurs et permet de convertir un covecteur en gradient. Une connexion précise la comparaison de vecteurs le long d’un trajet. Chacun de ces choix correspond à une question différente dans les chapitres 1 à 18.",
   "verifier": {
    "question": "Quelle structure faut-il pour définir le gradient à partir de df ?",
    "reponse": "Une métrique riemannienne.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     19,
     19
    ],
    "pages": [
     63,
     66
    ]
   }
  },
  {
   "n": 24,
   "pdfPage": 27,
   "part": "II",
   "partTitle": "Actions de groupes",
   "title": "Actions de groupes",
   "question": "Que signifie appliquer la même règle de transformation à chaque point d’un espace ?",
   "lecture": "À gauche, la forme est transformée par h, puis par g. Les marques permettent de suivre son orientation. À droite, le même niveau quadratique est décrit dans deux repères orthonormés. Les coefficients deviennent QᵀAQ dans le repère de colonnes Q.",
   "origine": "Une action à gauche associe à g une transformation de X et respecte la composition. Une action à droite vérifie (x·g)·h=x·(gh). La conjugaison g·A=gAg⁻¹ est une action gauche. Le changement QᵀAQ s’obtient par l’action à droite correspondante.",
   "verifier": {
    "question": "Si tu appliques h puis g dans une action gauche, quel produit agit sur x ?",
    "reponse": "gh.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     20,
     20
    ],
    "pages": [
     68,
     70
    ]
   }
  },
  {
   "n": 25,
   "pdfPage": 28,
   "part": "II",
   "partTitle": "Actions de groupes",
   "title": "Orbites, stabilisateurs et types d’actions",
   "question": "Quels points peut-on atteindre et quelles transformations laissent un point fixe ?",
   "lecture": "À gauche, en n’autorisant que les rotations autour de z, les orbites ordinaires sont des parallèles et chaque pôle forme une orbite réduite à un point. À droite, pour l’action de SO(3), les rotations autour de l’axe du pôle forment son stabilisateur.",
   "origine": "Transitive signifie une seule orbite. Libre signifie que tous les stabilisateurs sont triviaux. Fidèle signifie qu’aucun élément autre que l’identité ne fixe tout l’espace. La propreté contrôle la convergence des transformations quand les points de départ et d’arrivée convergent.",
   "verifier": {
    "question": "L’action de SO(2) autour de z sur la sphère entière est-elle libre ?",
    "reponse": "Non. Chaque pôle est fixé par tout SO(2).",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     21,
     21
    ],
    "pages": [
     71,
     73
    ]
   }
  },
  {
   "n": 26,
   "pdfPage": 29,
   "part": "II",
   "partTitle": "Actions de groupes",
   "title": "Espaces homogènes et quotient",
   "question": "Pourquoi la sphère peut-elle être obtenue en oubliant une partie d’une rotation ?",
   "lecture": "Fais tourner les deux premières flèches d’un repère autour de sa troisième. La pointe de cette troisième flèche reste au même point sur la sphère. Chaque famille de repères ainsi obtenue devient un seul point dans le quotient.",
   "origine": "Si Re₃=Se₃, alors R⁻¹S fixe e₃ et appartient au stabilisateur H. La fibre est donc R H. Pour un sous-groupe fermé H, G/H reçoit sa structure lisse naturelle. Un espace homogène se lit de la même façon depuis chaque point, via l’action transitive.",
   "verifier": {
    "question": "Combien de degrés de liberté restent-ils ici après avoir oublié le roulis ?",
    "reponse": "3−1=2.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     22,
     22
    ],
    "pages": [
     74,
     76
    ]
   }
  },
  {
   "n": 27,
   "pdfPage": 30,
   "part": "II",
   "partTitle": "Actions de groupes",
   "title": "Invariance et équivariance",
   "question": "Quand on tourne l’entrée, la sortie doit-elle rester identique ou tourner avec elle ?",
   "lecture": "Dans le premier panneau, les deux vecteurs ont le même rayon. La mesure de longueur reste identique. Dans le second, la règle illustrée est F(x)=0,59x. La petite flèche orange se déduit de la petite verte par la même rotation que leurs entrées.",
   "origine": "Une application équivariante entrelace les actions de départ et d’arrivée. Une quantité invariante est un cas où l’action sur la sortie est triviale. Pour une équation, la transformation peut envoyer une solution vers une autre dans la famille. Une solution particulière est invariante si son graphe est fixé.",
   "verifier": {
    "question": "Pour un vecteur vitesse prédit dans le plan, quelle propriété est adaptée à un changement de rotation ?",
    "reponse": "L’équivariance vectorielle.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     23,
     23
    ],
    "pages": [
     77,
     78
    ]
   }
  },
  {
   "n": 28,
   "pdfPage": 31,
   "part": "III",
   "partTitle": "Groupes et algèbres de Lie",
   "title": "Groupes de Lie",
   "question": "Qu’ajoute la possibilité de dériver aux opérations d’un groupe ?",
   "lecture": "À gauche, les points isolés forment un groupe de dimension zéro. Au milieu, le cercle possède des voisinages paramétrés par un angle. À droite, la composition additionne les angles de façon lisse, y compris lorsqu’on change de carte.",
   "origine": "Un groupe topologique demande la continuité du produit et de l’inversion. Un groupe de Lie possède en plus une structure de variété lisse compatible. GL(n,ℝ) est un ouvert dans l’espace des matrices. Les groupes de matrices orthogonales ont des contraintes et une dimension plus faible.",
   "verifier": {
    "question": "Un groupe fini discret peut-il être un groupe de Lie ?",
    "reponse": "Oui, de dimension zéro.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8281
    ]
   },
   "cours": {
    "chapters": [
     24,
     24
    ],
    "pages": [
     80,
     81
    ]
   }
  },
  {
   "n": 29,
   "pdfPage": 32,
   "part": "III",
   "partTitle": "Groupes et algèbres de Lie",
   "title": "Groupes matriciels et contraintes tangentes",
   "question": "Que reste-t-il de la contrainte quand une matrice quitte l’identité au premier ordre ?",
   "lecture": "À gauche, deux repères restent orthonormés. Au centre, le carré devient un parallélogramme de même aire. À droite, le cercle illustre la norme préservée pour U(1), le cas d’une seule coordonnée complexe.",
   "origine": "Écrire Q(t)=I+tX+o(t) et dériver Q(t)ᵀQ(t). Pour SL(n), la dérivée du déterminant en I vaut la trace. Pour U(n), on remplace la transposée par l’adjoint complexe. Pour SU(n), l’algèbre vérifie les deux contraintes antihermitienne et de trace nulle.",
   "verifier": {
    "question": "Quel est le coefficient diagonal d’une matrice antisymétrique réelle ?",
    "reponse": "Zéro.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     25,
     25
    ],
    "pages": [
     82,
     83
    ]
   }
  },
  {
   "n": 30,
   "pdfPage": 33,
   "part": "III",
   "partTitle": "Groupes et algèbres de Lie",
   "title": "Algèbre de Lie et sous-groupes",
   "question": "Qu’est-ce qu’une direction infinitésimale du groupe peut engendrer à l’échelle globale ?",
   "lecture": "À gauche, la tangente à l’identité donne les vitesses initiales. À droite, on suit un sous-groupe à un paramètre dans le carré périodique. La droite de pente irrationnelle sort par un bord et revient par son opposé.",
   "origine": "La translation à gauche prolonge une vitesse à l’identité en champ invariant. Le crochet de ces champs définit le crochet sur ᵒ , vérifiant notamment Jacobi. Une sous-algèbre s’intègre en un sous-groupe connexe immergé. L’exemple de pente √2 est dense dans le tore et son image est non fermée.",
   "verifier": {
    "question": "Le sous-groupe de pente irrationnelle occupe-t-il toutes les directions du plan tangent du tore ?",
    "reponse": "Non. Sa sous-algèbre est de dimension 1.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     26,
     26
    ],
    "pages": [
     84,
     86
    ]
   }
  },
  {
   "n": 31,
   "pdfPage": 34,
   "part": "III",
   "partTitle": "Groupes et algèbres de Lie",
   "title": "Champs invariants à gauche et à droite",
   "question": "Que devient une translation infinitésimale si on la compose avant ou après une rotation ?",
   "lecture": "Le repère bleu est déjà tourné de 90 degrés. X est la vitesse de translation suivant l’axe horizontal à l’identité de SE(2). Dans g exp(tX), la translation est lue dans le repère tourné, donc elle monte. Dans exp(tX)g, elle se lit dans le repère fixe, donc elle va à droite.",
   "origine": "Dériver les deux produits à t=0 transporte le même vecteur X depuis l’identité vers T_gG. L’invariance à gauche indique que toutes les flèches sont obtenues par les translations L_g. À droite, on utilise R_g et l’ordre des facteurs change.",
   "verifier": {
    "question": "Ces deux champs coïncident-ils sur un groupe abélien ?",
    "reponse": "Oui, les multiplications à gauche et à droite y sont identiques.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     27,
     27
    ],
    "pages": [
     87,
     88
    ]
   }
  },
  {
   "n": 32,
   "pdfPage": 35,
   "part": "III",
   "partTitle": "Groupes et algèbres de Lie",
   "title": "Sous-groupes à un paramètre",
   "question": "Comment répéter le même mouvement à vitesse constante dans un groupe ?",
   "lecture": "La droite des temps est envoyée sur une trajectoire du groupe. Le segment orange est le mouvement de durée t composé après celui de durée s. Sur le cercle, plusieurs temps distincts peuvent donner le même point.",
   "origine": "En dérivant g_{s+t}=g_sg_t par rapport à t en zéro, on trouve la courbe intégrale du champ invariant associé à X=g′₀. L’unicité du flot explique que X détermine toute la courbe. Pour un groupe matriciel, on résout g′_s=g_sX avec g₀=I.",
   "verifier": {
    "question": "Pour une rotation de vitesse angulaire 1, quels temps reviennent à l’identité ?",
    "reponse": "Les multiples entiers de 2π.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     28,
     28
    ],
    "pages": [
     89,
     90
    ]
   }
  },
  {
   "n": 33,
   "pdfPage": 36,
   "part": "III",
   "partTitle": "Groupes et algèbres de Lie",
   "title": "Application exponentielle",
   "question": "Comment passer d’une vitesse initiale à la transformation obtenue après une durée donnée ?",
   "lecture": "La flèche orange encode le générateur. L’arc vert donne le mouvement continu produit par ce générateur. Sur le cercle, exponentier une vitesse angulaire revient à parcourir un angle. À droite, les deux boîtes indiquent les espaces de départ et d’arrivée.",
   "origine": "La courbe t↦exp(tX) a pour dérivée X en zéro. Cela donne une différentielle identité et un inverse local par le théorème de la fonction inverse. Pour des matrices qui commutent, exp(X+Y)=exp(X)exp(Y). La planche BCH décrit la correction lorsque l’ordre compte.",
   "verifier": {
    "question": "L’exponentielle de SO(2) est-elle globalement injective ?",
    "reponse": "Non. Les angles séparés par 2π ont la même image.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     29,
     29
    ],
    "pages": [
     91,
     92
    ]
   }
  },
  {
   "n": 34,
   "pdfPage": 37,
   "part": "III",
   "partTitle": "Groupes et algèbres de Lie",
   "title": "SO(2) et son algèbre",
   "question": "Pourquoi une matrice de rotation du plan dépend-elle d’un seul angle ?",
   "lecture": "Le repère vert est le repère bleu tourné d’un angle θ. Ses colonnes sont orthonormées et orientées. Le choix de la première colonne force la seconde. Sur la droite, les trois points orange ont la même image après exponentiation.",
   "origine": "J est le quart de tour positif dans le plan. Les puissances paires de J donnent les termes du cosinus, et les impaires ceux du sinus. L’algèbre est ℝJ et son crochet est nul, car les multiples d’une même matrice commutent.",
   "verifier": {
    "question": "Que représente J e₁ ?",
    "reponse": "La vitesse e₂ au départ de la rotation positive.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8281
    ]
   },
   "cours": {
    "chapters": [
     30,
     30
    ],
    "pages": [
     93,
     94
    ]
   }
  },
  {
   "n": 35,
   "pdfPage": 38,
   "part": "III",
   "partTitle": "Groupes et algèbres de Lie",
   "title": "SO(3), produit vectoriel et Rodrigues",
   "question": "Comment un vecteur de ℝ³ peut-il coder une vitesse de rotation ?",
   "lecture": "L’axe orange est ω. Pour un point v, la vitesse violette est perpendiculaire à l’axe et à v. La courbe verte garde la composante axiale de v et fait tourner sa composante orthogonale. À droite, deux axes indépendants produisent un troisième par le crochet. ̂",
   "origine": "Pour ‖u‖=1, on a û²v=u(u·v)−v, et û³=−û. La série exponentielle se regroupe en sinus et cosinus. Le crochet de matrices devient le produit vectoriel sous l’identification chapeau. Deux axes indépendants engendrent ainsi toute l’algèbre.",
   "verifier": {
    "question": "La vitesse ω×v est-elle nulle si v est sur l’axe ?",
    "reponse": "Oui.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8281
    ]
   },
   "cours": {
    "chapters": [
     31,
     31
    ],
    "pages": [
     95,
     97
    ]
   }
  },
  {
   "n": 36,
   "pdfPage": 39,
   "part": "III",
   "partTitle": "Groupes et algèbres de Lie",
   "title": "SO(3), SU(2) et revêtement double",
   "question": "Pourquoi un tour de 2π se referme-t-il parmi les rotations et pas parmi leurs quaternions ?",
   "lecture": "À gauche, le disque est une coupe de la boule 3D des vecteurs de rotation. Chaque paire antipodale orange du bord code la même rotation d’angle π. À droite, le cercle est une coupe de S³ à axe u fixé. Le trajet vert va de 1 à −1, puis l’orange revient à 1.",
   "origine": "SU(2) s’identifie aux quaternions unitaires, donc à S³. Son action par conjugaison sur les quaternions imaginaires donne SO(3) avec noyau {±1}. Le demi-angle explique le trajet. S³ étant simplement connexe, ce revêtement donne π₁(SO(3)) ≅ ℤ/2ℤ.",
   "verifier": {
    "question": "Les deux quaternions q et −q correspondent-ils à deux orientations différentes ?",
    "reponse": "Non. Ils codent la même rotation.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     32,
     32
    ],
    "pages": [
     98,
     99
    ]
   }
  },
  {
   "n": 37,
   "pdfPage": 40,
   "part": "III",
   "partTitle": "Groupes et algèbres de Lie",
   "title": "SE(2), SE(3) et mouvements rigides",
   "question": "Comment composer des orientations et des positions sans confondre les repères ?",
   "lecture": "À gauche, la pose finale associe une translation de l’origine et un repère tourné. La figure conserve ses longueurs. À droite, un générateur qui combine rotation et translation le long du même axe fait tracer une hélice à un point hors de l’axe.",
   "origine": "Le produit résulte de x↦R(Sx+a)+t. Dans l’algèbre, une vitesse ξ est le couple (ω,v). Exponentier transporte v au fur et à mesure que le repère tourne, ce qui donne V(ω)v = ∫₀¹ exp(sω̂)v ds. SE(2) a 3 dimensions et SE(3) en a 6.",
   "verifier": {
    "question": "Quelle translation apparaît quand ω=0 ?",
    "reponse": "La translation finie vaut v.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8281
    ]
   },
   "cours": {
    "chapters": [
     33,
     33
    ],
    "pages": [
     100,
     102
    ]
   }
  },
  {
   "n": 38,
   "pdfPage": 41,
   "part": "III",
   "partTitle": "Groupes et algèbres de Lie",
   "title": "Représentation adjointe Ad",
   "question": "Que fait un changement de repère à une petite rotation ?",
   "lecture": "La boucle bleue est parcourue autour de l’axe coloré. À droite, on change tout le repère par R, donc l’axe tourne avec le mouvement. L’axe e₁ est envoyé sur e₂ dans cet exemple.",
   "origine": "La conjugaison g exp(tX) g⁻¹ fixe l’identité à t=0. Sa dérivée y donne Ad_gX. Dans SE(3), si g=(R,t) et X=(ω,v), on obtient (Rω, Rv+t×Rω). Le second terme traduit l’effet du déplacement de l’origine sur la vitesse.",
   "verifier": {
    "question": "Pour SO(3), Ad_R change-t-elle la norme de l’axe-vitesse ω ?",
    "reponse": "Non, R préserve la norme.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     34,
     34
    ],
    "pages": [
     103,
     105
    ]
   }
  },
  {
   "n": 39,
   "pdfPage": 42,
   "part": "III",
   "partTitle": "Groupes et algèbres de Lie",
   "title": "Représentation infinitésimale ad",
   "question": "À quelle vitesse change un générateur quand le repère commence à tourner ?",
   "lecture": "À gauche, la flèche b tourne sous l’action de la famille Ad. À droite, la pointe de b se met en mouvement le long de la flèche orange. En dimension trois, c’est le produit vectoriel de l’axe a et de b.",
   "origine": "Dans le cas matriciel, développer exp(tX)Yexp(−tX) à l’ordre 1 donne Y+t(XY−YX). Ad dépend d’un élément du groupe et ad d’un élément de l’algèbre. Dans SE(3), le crochet de (ω,v) et (η,w) donne (ω×η, ω×w−η×v).",
   "verifier": {
    "question": "Que vaut ad_X(X) ?",
    "reponse": "Zéro, par antisymétrie du crochet.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8281
    ]
   },
   "cours": {
    "chapters": [
     35,
     35
    ],
    "pages": [
     106,
     107
    ]
   }
  },
  {
   "n": 40,
   "pdfPage": 43,
   "part": "III",
   "partTitle": "Groupes et algèbres de Lie",
   "title": "Formule de Baker-Campbell-Hausdorff",
   "question": "Quelle correction faut-il ajouter quand on résume deux petits mouvements par un seul ?",
   "lecture": "À gauche, une rotation autour de l’origine et une translation donnent deux positions finales différentes selon l’ordre. À droite, le dessin schématise la somme dans l’algèbre : le vecteur bleu est la somme des générateurs et l’orange est la première correction.",
   "origine": "Développer les exponentielles, puis log(I+A)=A−A²/2+O(A³). Les termes X² et Y² s’annulent et les produits croisés laissent (XY−YX)/2. Si tous les crochets itérés d’ordre supérieur sont nuls, la formule se termine après le premier crochet.",
   "verifier": {
    "question": "Que devient le terme orange si on échange X et Y ?",
    "reponse": "Il change de signe.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8281
    ]
   },
   "cours": {
    "chapters": [
     36,
     36
    ],
    "pages": [
     108,
     109
    ]
   }
  },
  {
   "n": 41,
   "pdfPage": 44,
   "part": "III",
   "partTitle": "Groupes et algèbres de Lie",
   "title": "Représentations de groupes de Lie",
   "question": "Comment un groupe abstrait agit-il par transformations linéaires d’un autre espace ?",
   "lecture": "Les deux panneaux utilisent le même angle d’entrée θ dans SO(2). Une représentation peut le transformer en multiplication complexe par e^{iθ} ou par e^{2iθ}. Le deuxième vecteur tourne deux fois plus vite.",
   "origine": "Une représentation est un morphisme de G vers GL(V). En différentiant, on obtient une représentation de l’algèbre qui respecte le crochet. Dans le poids m, le générateur de rotation agit par multiplication par im. Le caractère d’une représentation de dimension finie en est la trace.",
   "verifier": {
    "question": "Pour le poids 2, que fait la rotation d’entrée d’angle π sur la sortie ?",
    "reponse": "Elle agit par l’identité.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     37,
     37
    ],
    "pages": [
     110,
     111
    ]
   }
  },
  {
   "n": 42,
   "pdfPage": 45,
   "part": "III",
   "partTitle": "Groupes et algèbres de Lie",
   "title": "Du groupe de Lie au générateur d’une symétrie",
   "question": "Comment les notions des chapitres précédents s’enchaînent-elles dans un seul calcul ?",
   "lecture": "En haut, les transformations finies déplacent les points le long de leurs orbites. En bas, le générateur produit la vitesse locale du mouvement. Suivre cette vitesse reconstruit l’action du sous-groupe à un paramètre.",
   "origine": "On passe du groupe à l’algèbre en prenant la tangente à l’identité. Le stabilisateur regroupe les transformations invisibles à p. Son algèbre correspond aux X dont le champ fondamental s’annule en p. Les symétries d’équations utiliseront ce même schéma sur les jets.",
   "verifier": {
    "question": "À partir de X, quelle opération reconstruit la transformation finie ?",
    "reponse": "L’exponentielle suivie de l’action.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     38,
     38
    ],
    "pages": [
     112,
     114
    ]
   }
  },
  {
   "n": 43,
   "pdfPage": 46,
   "part": "IV",
   "partTitle": "Symétries des EDO",
   "title": "Symétries des équations différentielles ordinaires",
   "question": "Qu’est-ce qu’une translation horizontale fait à une solution d’EDO autonome ?",
   "lecture": "L’orange est le graphe vert déplacé horizontalement. Le champ de flèches à droite décrit le mouvement des points du plan (x,u). Une symétrie locale doit transformer un morceau de graphe solution en un autre morceau de graphe solution.",
   "origine": "Pour une action locale, la dérivée en ε=0 fournit X=ξ∂x+η∂u. Ici ξ=1 et η=0. Comme l’équation ne dépend pas explicitement de x, dériver le graphe décalé redonne f évalué au graphe décalé. La même translation peut déplacer une condition initiale fixée.",
   "verifier": {
    "question": "La courbe verte est-elle elle-même fixée par la translation du dessin ?",
    "reponse": "Non. Son image est la courbe orange, qui résout la même EDO.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     39,
     39
    ],
    "pages": [
     116,
     118
    ]
   }
  },
  {
   "n": 44,
   "pdfPage": 47,
   "part": "IV",
   "partTitle": "Symétries des EDO",
   "title": "Jets d’ordre 1 et 2",
   "question": "Quelles informations deux graphes doivent-ils partager pour donner le même jet ?",
   "lecture": "Les deux fonctions passent par le même point noir et touchent la même droite pointillée. Leur courbure y diffère. Le jet d’ordre 1 les identifie en ce point, et le jet d’ordre 2 garde l’information qui les distingue.",
   "origine": "Le jet en x est une classe d’équivalence de fonctions qui partagent leurs dérivées jusqu’à l’ordre demandé. Dans l’espace des jets, (x,u,p,q) sont des coordonnées. Le graphe relevé d’une fonction impose p=u′(x) et q=u″(x) le long de son parcours.",
   "verifier": {
    "question": "Deux fonctions ayant le même jet d’ordre 2 en un point doivent-elles coïncider près de ce point ?",
    "reponse": "Non. Elles peuvent différer par un terme d’ordre supérieur.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     40,
     40
    ],
    "pages": [
     119,
     123
    ]
   }
  },
  {
   "n": 45,
   "pdfPage": 48,
   "part": "IV",
   "partTitle": "Symétries des EDO",
   "title": "Contact, dérivée totale et prolongement",
   "question": "Pourquoi la pente doit-elle changer avec le graphe quand on étire les axes ?",
   "lecture": "Le plan vert de contact contient les vitesses vérifiant du=p dx. Il autorise un changement de pente. La flèche orange ∂u ne respecte pas cette relation. À droite, l’étirement multiplie les variations en u par b et celles en x par a.",
   "origine": "La dérivée totale suit un graphe relevé et dérive à la fois x, u et p. Appliquer la règle de chaîne à dũ/dx̃ donne la pente prolongée. Pour x̃=ax et ũ=bu, p̃=(b/a)p et q̃=(b/a²)q. En différentiant en ε, on obtient le coefficient affiché.",
   "verifier": {
    "question": "Si tu doubles x en gardant u inchangé, que devient la courbure u″ en coordonnées ?",
    "reponse": "Elle est divisée par quatre.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     40,
     40
    ],
    "pages": [
     119,
     123
    ]
   }
  },
  {
   "n": 46,
   "pdfPage": 49,
   "part": "IV",
   "partTitle": "Symétries des EDO",
   "title": "Critère infinitésimal et équations déterminantes",
   "question": "Comment reconnaître une symétrie en regardant la tangente à l’équation ?",
   "lecture": "La courbe verte représente une coupe de la sous-variété des jets vérifiant l’EDO. À gauche, le champ prolongé est tangent. À droite, il a une composante transverse. Le dessin compare la dérivée de F dans chaque direction.",
   "origine": "Sur un niveau régulier, le champ est tangent exactement quand il annule la différentielle de F sur le niveau. On élimine une dérivée principale par F=0, puis on sépare les coefficients des coordonnées de jet encore libres. Pour q=u″=0, la dilatation de x et u multiplie q par un facteur et préserve ce niveau.",
   "verifier": {
    "question": "Le critère impose-t-il l’annulation de pr⁽ⁿ⁾X(F) en dehors du niveau F=0 ?",
    "reponse": "Non. L’évaluation a lieu sur le niveau de l’équation.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     41,
     41
    ],
    "pages": [
     124,
     127
    ]
   }
  },
  {
   "n": 47,
   "pdfPage": 50,
   "part": "IV",
   "partTitle": "Symétries des EDO",
   "title": "Invariants, coordonnées adaptées et réduction d’ordre",
   "question": "Comment suivre des orbites permet-il de supprimer une variable ?",
   "lecture": "À gauche, chaque courbe colorée porte une valeur constante de r=u/√x. La coordonnée s=log x augmente le long des flèches de la dilatation. À droite, un autre exemple utilise la translation en x pour une EDO autonome et prend u comme variable indépendante.",
   "origine": "Pour u″=(u′)²/u, la règle de chaîne donne p dp/du=p²/u sur les branches où u est une bonne coordonnée. On obtient p=Cu, puis u(x)=A exp(Cx). Les solutions constantes se traitent à part. Les générateurs de symétries restent fermés par crochet.",
   "verifier": {
    "question": "Pourquoi faut-il revenir au cas p=0 séparément ?",
    "reponse": "La réduction divise par p ou exige que u soit localement inversible.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8482
    ]
   },
   "cours": {
    "chapters": [
     42,
     42
    ],
    "pages": [
     128,
     130
    ]
   }
  },
  {
   "n": 48,
   "pdfPage": 51,
   "part": "V",
   "partTitle": "Symétries des EDP",
   "title": "Jets d’EDP, dérivées totales et systèmes",
   "question": "Que faut-il suivre lorsque le graphe a plusieurs variables et plusieurs composantes ?",
   "lecture": "Une coupe à t fixé donne uₓ et une coupe à x fixé donne uₜ. Le jet d’ordre 2 contient aussi les dérivées mixtes. À droite, le champ violet suit l’intersection de deux niveaux, image de la tangence au système entier.",
   "origine": "Un multi-indice J indique combien de dérivées sont prises dans chaque direction. Dᵢ fait évoluer la coordonnée u d’indice J vers celle d’indice J+i le long d’un graphe. Le coefficient prolongé est D_J Qᵅ plus la somme des termes ξⁱuᵅ d’indice J+i. Pour Saint-Venant, on suit séparément les caractéristiques de h et q=hu.",
   "verifier": {
    "question": "Pour préserver un système à deux équations, suffit-il de préserver un seul des deux niveaux ?",
    "reponse": "Non. Le champ doit être tangent à leur intersection.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     43,
     43
    ],
    "pages": [
     132,
     137
    ]
   }
  },
  {
   "n": 49,
   "pdfPage": 52,
   "part": "V",
   "partTitle": "Symétries des EDP",
   "title": "Advection et caractéristiques",
   "question": "Pourquoi suivre les bonnes droites transforme-t-il l’EDP de transport en une constance ?",
   "lecture": "Chaque droite colorée part d’une abscisse différente et garde sa valeur de u. Les deux profils de droite ont la même forme. Le pic s’est déplacé de ct et les points du profil ont suivi leurs caractéristiques.",
   "origine": "Le long de x(t)=x₀+ct, la dérivée de u vaut uₜ+cuₓ. La variable x−ct étiquette les orbites de ∂t+c∂x. Si une solution est cherchée sous la forme U(x−st), il reste (c−s)U′=0, donc toute forme peut se propager à vitesse c.",
   "verifier": {
    "question": "Où se trouve à l’instant t la valeur partie de x₀ ?",
    "reponse": "En x₀+ct.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8281
    ]
   },
   "cours": {
    "chapters": [
     44,
     44
    ],
    "pages": [
     138,
     140
    ]
   }
  },
  {
   "n": 50,
   "pdfPage": 53,
   "part": "V",
   "partTitle": "Symétries des EDP",
   "title": "Chaleur et autosimilarité",
   "question": "Comment trois profils de tailles différentes se superposent-ils exactement ?",
   "lecture": "En variables ordinaires, le pic s’abaisse et s’élargit. En divisant x par √t et en multipliant u par √t, les trois courbes donnent le même profil vert. Les invariants viennent de la dilatation parabolique.",
   "origine": "Les deux dérivées uₜ et κuₓₓ portent le même facteur t⁻³ᐟ². Après l’avoir retiré, la gaussienne Φ(ζ)=C exp(−ζ²/(4κ)) résout l’EDO. Le changement de variable x=√t ζ montre que la masse reste constante pour ce profil.",
   "verifier": {
    "question": "Si t est multiplié par quatre, par combien la largeur du profil est-elle multipliée ?",
    "reponse": "Par deux.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     45,
     45
    ],
    "pages": [
     141,
     144
    ]
   }
  },
  {
   "n": 51,
   "pdfPage": 54,
   "part": "V",
   "partTitle": "Symétries des EDP",
   "title": "Autres symétries ponctuelles de la chaleur",
   "question": "Que faut-il transformer en plus des coordonnées pour garder l’équation ?",
   "lecture": "Les lignes grises sont les trajectoires x fixé. Le boost les incline dans le panneau de gauche. Le changement projectif déforme le temps et l’espace à droite. Les panneaux montrent les coordonnées (x,t). Dans les deux cas, u reçoit aussi un facteur d’amplitude.",
   "origine": "Pour le boost, x̃=x+2κεt et ũ=e^{−εx−κε²t}u. En plus des translations, de la dilatation parabolique et de la multiplication de u, la linéarité autorise l’addition de toute solution β. Le critère prolongé vérifie les générateurs sur Δ=uₜ−κuₓₓ=0.",
   "verifier": {
    "question": "Pourquoi peut-on additionner une autre solution β à u ?",
    "reponse": "L’opérateur de la chaleur est linéaire et homogène.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     45,
     45
    ],
    "pages": [
     141,
     144
    ]
   }
  },
  {
   "n": 52,
   "pdfPage": 55,
   "part": "V",
   "partTitle": "Symétries des EDP",
   "title": "Équation des ondes et variables caractéristiques",
   "question": "Pourquoi le mouvement se décompose-t-il en deux profils qui partent en sens opposés ?",
   "lecture": "Les familles de droites orange et vertes gardent respectivement x+ct et x−ct constants. Les deux bosses de droite montrent des composantes de la solution qui se propagent chacune le long d’une famille.",
   "origine": "Le changement de coordonnées rend l’EDP égale à u_ξη=0. L’intégration donne F(ξ)+G(η). La dilatation simultanée de x et t préserve les pentes caractéristiques. Un profil invariant sous ∂t+s∂x satisfait (s²−c²)U″=0.",
   "verifier": {
    "question": "Quelle composante se déplace vers les x croissants si c>0 ?",
    "reponse": "F(x−ct).",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     46,
     46
    ],
    "pages": [
     145,
     146
    ]
   }
  },
  {
   "n": 53,
   "pdfPage": 56,
   "part": "V",
   "partTitle": "Symétries des EDP",
   "title": "Burgers, onde progressive et choc",
   "question": "Comment la viscosité change-t-elle le profil reliant deux vitesses constantes ?",
   "lecture": "Le profil va de U_L à U_R. En diminuant ν, la zone de transition se resserre. Dans la limite inviscide, la discontinuité voyage à la vitesse s et se lit au sens faible. )",
   "origine": "Avec z=x−st, on intègre νU″=(U−s)U′. Les deux états limites fixent s. Le boost x̃=x+εt, ũ=u+ε compense les deux termes de transport. Avec ν fixé, la viscosité impose la dilatation parabolique, alors que Burgers inviscide admet davantage de dilatations.",
   "verifier": {
    "question": "Que se passe-t-il pour l’épaisseur de la transition si ν est divisée par deux ?",
    "reponse": "Elle est divisée par deux à écart U_L−U_R fixé.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     47,
     47
    ],
    "pages": [
     147,
     149
    ]
   }
  },
  {
   "n": 54,
   "pdfPage": 57,
   "part": "V",
   "partTitle": "Symétries des EDP",
   "title": "Solutions invariantes et limites du calcul de symétrie",
   "question": "Comment vérifier qu’un graphe particulier est fixé par le mouvement ?",
   "lecture": "Au point noir, la flèche verte suit la pente du graphe. La flèche orange part vers une autre courbe. Q mesure l’écart vertical entre la direction proposée par la transformation et celle autorisée par le déplacement des variables indépendantes.",
   "origine": "La condition Q=0 donne un ansatz invariant en suivant les caractéristiques de X. Une symétrie ponctuelle agit sur les variables de base et la valeur du champ. Une symétrie de contact préserve la structure de contact et une symétrie généralisée peut dépendre de dérivées. Vérifie aussi les données et le domaine.",
   "verifier": {
    "question": "Une symétrie de l’équation rend-elle toutes les solutions invariantes ?",
    "reponse": "Non. Elle peut permuter les graphes solutions.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     48,
     48
    ],
    "pages": [
     150,
     152
    ]
   }
  },
  {
   "n": 55,
   "pdfPage": 58,
   "part": "V",
   "partTitle": "Symétries des EDP",
   "title": "La méthode de Lie en un dessin",
   "question": "Dans quel ordre utiliser un générateur, sa prolongation et ses invariants ?",
   "lecture": "Suis les flèches du haut, puis descends à droite. On choisit une famille de générateurs, on la prolonge à l’ordre de l’équation et on teste la tangence. Pour une solution invariante, le chemin du bas passe ensuite par Q=0.",
   "origine": "L’advection donne l’invariant x−ct. La chaleur donne x/√t avec un poids pour l’amplitude. L’onde produit deux familles et Burgers une onde progressive. Ces exemples utilisent la même construction géométrique. Pour Noether, il faudra vérifier une symétrie de la fonctionnelle d’action.",
   "verifier": {
    "question": "À quel moment le caractère linéaire des équations déterminantes intervient-il ?",
    "reponse": "Après avoir prolongé le générateur et évalué le critère sur Δ=0.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     49,
     49
    ],
    "pages": [
     153,
     156
    ]
   }
  },
  {
   "n": 56,
   "pdfPage": 59,
   "part": "VI",
   "partTitle": "Variations et Noether",
   "title": "Gradient, divergence et Laplace-Beltrami",
   "question": "Comment lire un taux d’expansion, puis l’appliquer au gradient d’un relief ?",
   "lecture": "Le carré orange est une cellule emportée par le champ radial. Les longueurs sont multipliées par eᵗ et l’aire par e²ᵗ. À droite, la dérivée seconde du cosinus sur le cercle produit son opposé.",
   "origine": "La divergence est la dérivée du facteur d’aire ou de volume au temps zéro. Elle vaut 2 pour X=(x,y). Sur S¹ unité, le Laplacien est ∂²θ. Au sommet du cosinus, sa valeur est négative, ce qui donne une baisse locale pour l’équation de diffusion.",
   "verifier": {
    "question": "Quelle est la divergence d’un champ de translation constant dans le plan ?",
    "reponse": "Zéro. Une cellule est déplacée sans changer d’aire.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     50,
     50
    ],
    "pages": [
     158,
     160
    ]
   }
  },
  {
   "n": 57,
   "pdfPage": 60,
   "part": "VI",
   "partTitle": "Variations et Noether",
   "title": "Étoile de Hodge, codifférentielle et Laplacien de Hodge",
   "question": "Comment une métrique associe-t-elle à une direction de mesure sa direction complémentaire ?",
   "lecture": "Les familles de lignes représentent dx et dy. Les flèches montrent leurs directions après identification par la métrique euclidienne. Dans le plan orienté, *dx=dy et *dy=−dx. À droite, d augmente le degré et son adjoint δ le redescend.",
   "origine": "L’étoile complète une forme jusqu’au volume orienté. Sur une variété compacte orientée sans bord, δ est adjoint de d pour le produit intégral. Avec la convention du cours, Δ_H est positif et vaut −Δ_g sur les fonctions.",
   "verifier": {
    "question": "En dimension n, quel est le degré de *α si α est une k-forme ?",
    "reponse": "n−k.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     50,
     50
    ],
    "pages": [
     158,
     160
    ]
   }
  },
  {
   "n": 58,
   "pdfPage": 61,
   "part": "VI",
   "partTitle": "Variations et Noether",
   "title": "Variation et équation d’Euler-Lagrange",
   "question": "Que signifie dériver une quantité dont l’entrée est une courbe entière ?",
   "lecture": "Les trois courbes de gauche partagent les mêmes extrémités. L’écart orange vaut εη. À droite, chaque courbe admissible produit un nombre S. Pour l’action ∫(q′)²/2 et la droite verte, la pente de S dans cette famille vaut zéro en ε=0.",
   "origine": "Dériver sous l’intégrale donne L_qη+L_{q′}η′. L’intégration par parties déplace la dérivée de η sur L_{q′}. Le bord s’annule. Si la pente de l’action est nulle pour toute variation admissible, le lemme fondamental donne L_q−(d/dt)L_{q′}=0.",
   "verifier": {
    "question": "Pourquoi faut-il tester toutes les variations et pas seulement celle du dessin ?",
    "reponse": "Une seule pente nulle ne suffit pas pour imposer l’équation en chaque point.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     51,
     51
    ],
    "pages": [
     161,
     163
    ]
   }
  },
  {
   "n": 59,
   "pdfPage": 62,
   "part": "VI",
   "partTitle": "Variations et Noether",
   "title": "Euler-Lagrange pour les champs",
   "question": "Comment tester la stationnarité d’une fonction définie sur tout un domaine ?",
   "lecture": "La surface de droite ajoute une bosse à l’intérieur de celle de gauche. Sur le bord orange, la variation est nulle. La même opération peut être localisée autour de n’importe quel point intérieur.",
   "origine": "L’intégration par parties multidimensionnelle transforme les dérivées de la variation en divergence. Pour L=½‖∇u‖²+V(u), on obtient −Δu+V′(u)=0. Pour L=½(uₜ²−c²‖∇u‖²), on retrouve l’onde. Varier l’énergie d’une courbe sur une variété donne l’équation géodésique.",
   "verifier": {
    "question": "Quel terme apparaît au bord si la variation ne s’y annule pas ?",
    "reponse": "Le flux variationnel normal, dont l’annulation peut imposer une condition naturelle.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     52,
     52
    ],
    "pages": [
     164,
     166
    ]
   }
  },
  {
   "n": 60,
   "pdfPage": 63,
   "part": "VI",
   "partTitle": "Variations et Noether",
   "title": "Noether, symétries variationnelles et conservation",
   "question": "Comment une rotation qui laisse l’action intacte produit-elle un moment angulaire constant ?",
   "lecture": "Les cercles de gauche représentent les niveaux d’un potentiel central. Une rotation suit la flèche violette le long d’un niveau. La force orange pointe dans la direction radiale et son moment par rapport à l’origine s’annule.",
   "origine": "Sur une solution, la variation infinitésimale de L est la dérivée de L_{q′}η. Si elle vaut B′, leur différence est constante. Pour une rotation, η=a×q, donc p·η=a·(q×p). Pour une translation du temps on obtient l’énergie. Pour des champs, le courant conservé a une divergence nulle.",
   "verifier": {
    "question": "Une symétrie des graphes solutions suffit-elle à invoquer ce théorème ?",
    "reponse": "Il faut vérifier une symétrie variationnelle de l’action, éventuellement à une divergence près.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     53,
     53
    ],
    "pages": [
     167,
     170
    ]
   }
  },
  {
   "n": 61,
   "pdfPage": 64,
   "part": "VI",
   "partTitle": "Variations et Noether",
   "title": "Symétries brisées, forçage et conditions au bord",
   "question": "Où se voit la rupture d’une loi de conservation ?",
   "lecture": "À gauche, l’orange représente une énergie décroissante illustrée par un amortissement simple. À droite, le changement de coordonnées déplace l’intervalle ainsi que les deux points du bord. Une translation de l’équation locale peut donc perdre le problème de départ.",
   "origine": "En dérivant l’énergie et en utilisant Euler-Lagrange forcée, les termes en q″ s’annulent. Un frottement F=−γq′ donne une puissance −γ‖q′‖². Une dépendance temporelle de L ajoute −∂tL. Une variation de L avec un défaut de divergence donne de même un bilan avec source.",
   "verifier": {
    "question": "Une translation spatiale non nulle préserve-t-elle l’intervalle fixe [0,1] ?",
    "reponse": "Non.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     54,
     54
    ],
    "pages": [
     171,
     172
    ]
   }
  },
  {
   "n": 62,
   "pdfPage": 65,
   "part": "VII",
   "partTitle": "Géométrie symplectique",
   "title": "Fibré cotangent et forme symplectique",
   "question": "Quelle aire est naturellement définie dans l’espace des positions et des moments ?",
   "lecture": "Dans le premier panneau, la projection de la flèche orange sur la base donne la flèche verte. Le covecteur p du point (q,p) lit ce déplacement. Dans le second, dq∧dp mesure l’aire signée du parallélogramme dans le plan des phases.",
   "origine": "Une direction verticale a dπ(V)=0, donc θ(V)=0. Avec θ=p dq, on trouve −dθ=dq∧dp. La forme est fermée par d²=0. Pour tout V non nul, on peut choisir W tel que ω(V,W)≠0, ce qui rend la conversion V↦ι_Vω inversible.",
   "verifier": {
    "question": "Dans le plan (q,p), que vaut ω(∂q,∂p) ?",
    "reponse": "1.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8281
    ]
   },
   "cours": {
    "chapters": [
     55,
     55
    ],
    "pages": [
     174,
     176
    ]
   }
  },
  {
   "n": 63,
   "pdfPage": 66,
   "part": "VII",
   "partTitle": "Géométrie symplectique",
   "title": "Champ hamiltonien, crochet de Poisson et volume",
   "question": "Pourquoi le mouvement suit-il les niveaux d’énergie tout en préservant l’aire ?",
   "lecture": "La flèche orange pointe vers l’énergie croissante. La flèche verte est la vitesse hamiltonienne et longe un niveau. À droite, le flot de l’oscillateur tourne une cellule de phase et en conserve l’aire. Pour un autre Hamiltonien, la cellule peut aussi se déformer.",
   "origine": "L’antisymétrie donne dH(X_H)=ω(X_H,X_H)=0. Cartan donne la dérivée de Lie de ω égale à d(dH)=0, car dω=0. Le flot préserve donc aussi ωⁿ/n!, le volume de Liouville. Le crochet {f,H} mesure la variation instantanée de f.",
   "verifier": {
    "question": "Si {f,H}=0 partout, que fait f le long des trajectoires ?",
    "reponse": "Elle reste constante.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     56,
     56
    ],
    "pages": [
     177,
     180
    ]
   }
  },
  {
   "n": 64,
   "pdfPage": 67,
   "part": "VII",
   "partTitle": "Géométrie symplectique",
   "title": "Actions hamiltoniennes et application moment",
   "question": "Comment convertir la direction infinitésimale d’une symétrie en une quantité à mesurer ?",
   "lecture": "Les translations de q gardent p fixe et suivent les lignes colorées. À droite, la rotation de q et p ensemble possède un moment vectoriel, perpendiculaire aux deux. Pour un axe ξ donné, on en lit la composante le long de ξ.",
   "origine": "Pour une translation, ι_{∂q}(dq∧dp)=dp, d’où J=p. Pour les rotations du cotangent, le champ de l’axe a est (a×q,a×p) et sa fonction est a·(q×p). Si H est invariant, la composante J_ξ commute avec H au sens de Poisson et reste constante.",
   "verifier": {
    "question": "Dans l’exemple des translations, quelle fonction doit être indépendante de q pour conserver p ?",
    "reponse": "Le Hamiltonien H.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     57,
     57
    ],
    "pages": [
     181,
     183
    ]
   }
  },
  {
   "n": 65,
   "pdfPage": 68,
   "part": "VII",
   "partTitle": "Géométrie symplectique",
   "title": "Transformée de Legendre",
   "question": "Comment remplacer une vitesse par la pente du lagrangien dans la fibre ?",
   "lecture": "La droite orange touche L au point où sa pente vaut p. À droite, la hauteur maximale de pv−L(v) se lit au même v dans cet exemple quadratique convexe. Le repère de base q reste fixé dans l’opération.",
   "origine": "La hessienne en v est la différentielle de v↦p. Son inversibilité donne un inverse local. Dans la définition de H, les termes contenant dv s’annulent parce que p=L_v. Pour L=mv²/2−V(q), on trouve v=p/m et H=p²/(2m)+V(q).",
   "verifier": {
    "question": "Pourquoi la seule régularité de L ne garantit-elle pas un inverse global ?",
    "reponse": "Le théorème de la fonction inverse ne donne qu’un inverse local.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     58,
     58
    ],
    "pages": [
     184,
     185
    ]
   }
  },
  {
   "n": 66,
   "pdfPage": 69,
   "part": "VII",
   "partTitle": "Géométrie symplectique",
   "title": "Intégration symplectique, Euler et Verlet",
   "question": "Pourquoi deux schémas de même ordre peuvent-ils donner des trajectoires qualitativement différentes ?",
   "lecture": "Le cercle pointillé est le niveau exact de l’oscillateur. Avec le même pas et le même point initial, Euler explicite produit une spirale orange. Le schéma symplectique suit une ellipse bornée pour ce pas et préserve l’aire du plan des phases.",
   "origine": "L’explicite multiplie q²+p² par 1+h². L’Euler symplectique met à jour p avant q, ce qui donne un déterminant 1. Verlet enchaîne un demi-pas en p, un pas en q, puis un demi-pas en p. L’analyse rétrograde explique une énergie modifiée presque conservée sous des hypothèses adaptées.",
   "verifier": {
    "question": "Quelle structure le schéma symplectique préserve-t-il exactement ?",
    "reponse": "La forme symplectique ω.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     59,
     59
    ],
    "pages": [
     186,
     188
    ]
   }
  },
  {
   "n": 67,
   "pdfPage": 70,
   "part": "VIII",
   "partTitle": "Apprentissage scientifique",
   "title": "Pénalité, projection et paramétrisation intrinsèque",
   "question": "Comment trois manières de respecter un cercle changent-elles les sorties possibles d’un modèle ?",
   "lecture": "Le cercle est l’ensemble admissible. À gauche, on attribue un coût à la distance au cercle. Au milieu, on remplace la sortie orange par sa projection. À droite, l’angle donne directement un point du cercle.",
   "origine": "La pénalité réduit un écart, la projection assure l’admissibilité là où elle est bien définie, et la paramétrisation la construit. Une architecture équivariante impose une relation entre entrées transformées. Apprendre un lagrangien, écrire un flux conservatif ou réduire par invariants impose encore d’autres structures.",
   "verifier": {
    "question": "Dans quel dessin un paramètre réel produit-il toujours une sortie admissible ?",
    "reponse": "Celui de droite.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     60,
     60
    ],
    "pages": [
     190,
     191
    ]
   }
  },
  {
   "n": 68,
   "pdfPage": 71,
   "part": "VIII",
   "partTitle": "Apprentissage scientifique",
   "title": "Équivariance des architectures",
   "question": "Comment vérifier la cohérence d’un réseau lorsqu’on transforme son entrée ?",
   "lecture": "Le chemin du haut prédit puis transforme la sortie. Le chemin du bas transforme d’abord l’entrée puis prédit. Une architecture équivariante fait arriver les deux chemins à la même valeur pour tous ses paramètres.",
   "origine": "Par exemple, F(x)=a(‖x‖²)x est équivariante pour les rotations parce que son facteur scalaire est invariant. Les couches équivariantes restent équivariantes par composition. L’augmentation de données apprend avec des exemples transformés et une pénalité rapproche les deux chemins sur les exemples testés.",
   "verifier": {
    "question": "Si la sortie est une classe qui ne dépend pas de l’orientation, quelle action choisir sur elle ?",
    "reponse": "L’action triviale, ce qui donne une sortie invariante.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     61,
     61
    ],
    "pages": [
     192,
     193
    ]
   }
  },
  {
   "n": 69,
   "pdfPage": 72,
   "part": "VIII",
   "partTitle": "Apprentissage scientifique",
   "title": "Modèles hamiltoniens et lagrangiens",
   "question": "Quel objet apprendre pour que le champ hérite d’une structure ?",
   "lecture": "Le champ orange est un exemple de champ libre et coupe les cercles. Dans le panneau vert, les cercles sont les niveaux du Hamiltonien appris et le champ leur est tangent. Un modèle lagrangien apprend la fonction L(q,v) et calcule le champ par Euler-Lagrange.",
   "origine": "Pour Hθ, l’antisymétrie de J donne ∇Hθ·J∇Hθ=0 au niveau continu. Pour Lθ, le Hessien en v doit être inversible là où l’on résout l’équation en accélération. La qualité du champ appris dépend des données, et les propriétés de la simulation dépendent aussi de l’intégrateur.",
   "verifier": {
    "question": "Quelle énergie est conservée par la dynamique continue construite avec Hθ ?",
    "reponse": "Hθ elle-même.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     62,
     62
    ],
    "pages": [
     194,
     195
    ]
   }
  },
  {
   "n": 70,
   "pdfPage": 73,
   "part": "VIII",
   "partTitle": "Apprentissage scientifique",
   "title": "PINNs, résidus et opérateurs équivariants",
   "question": "Comment faire entrer l’équation et ses transformations dans un apprentissage ?",
   "lecture": "Les points verts échantillonnent l’intérieur du domaine. Les points orange portent des valeurs au bord ou à l’instant initial. À droite, on dérive uθ pour évaluer son résidu. Un opérateur neuronal, lui, prend une fonction d’entrée a et prédit une fonction solution. ( a )",
   "origine": "Une pénalité de résidu est un contrôle aux points évalués. Un ansatz invariant construit directement une solution candidate à partir des invariants. Pour un opérateur équivariant, il faut préciser comment le groupe transforme à la fois les données d’entrée, les coefficients et les solutions.",
   "verifier": {
    "question": "Un résidu nul à dix points implique-t-il qu’il s’annule partout ?",
    "reponse": "Non. Il faut un argument de contrôle entre les points ou une construction exacte.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     63,
     63
    ],
    "pages": [
     196,
     197
    ]
   }
  },
  {
   "n": 71,
   "pdfPage": 74,
   "part": "VIII",
   "partTitle": "Apprentissage scientifique",
   "title": "Saint-Venant, topographie et symétries",
   "question": "Pourquoi une vague translatée peut-elle résoudre l’équation homogène et échouer sur un fond donné ?",
   "lecture": "Les profils sont schématiques. À gauche, déplacer horizontalement le profil ne change pas le fond. À droite, le relief orange reste à la même place. Déplacer le champ seul change sa position relative à la pente.",
   "origine": "Le terme −gh∂xz_b contient une information attachée à x. La translation redevient une relation entre problèmes si l’on translate aussi z_b et les données pertinentes. Une réflexion spatiale inverse le signe du débit q. L’équation de masse reste écrite sous forme conservative.",
   "verifier": {
    "question": "Si le fond est plat mais le domaine a deux murs fixes, la translation est-elle une symétrie globale ?",
    "reponse": "En général non, car elle déplace les murs.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     64,
     64
    ],
    "pages": [
     198,
     199
    ]
   }
  },
  {
   "n": 72,
   "pdfPage": 75,
   "part": "VIII",
   "partTitle": "Apprentissage scientifique",
   "title": "Carte de choix pour le SciML géométrique",
   "question": "Quel mécanisme correspond à l’information réellement connue sur le système ?",
   "lecture": "Lis la colonne qui part de ton information disponible. Une contrainte sur les états détermine l’espace de sortie. Une action de groupe impose un comportement sous transformation. Une fonctionnelle donne un champ ou une loi de conservation.",
   "origine": "Dans un problème réel, vérifie les hypothèses sur les données, les coefficients et le bord. Compare ensuite les mécanismes sur des mesures adaptées : erreur d’état, défaut d’équivariance, résidu et bilan intégré. Ils répondent à des questions différentes.",
   "verifier": {
    "question": "Si tu connais seulement un bilan de masse, quel objet un modèle conservatif peut-il apprendre ?",
    "reponse": "Un flux, dont la divergence fait évoluer la masse.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     65,
     65
    ],
    "pages": [
     200,
     203
    ]
   }
  },
  {
   "n": 73,
   "pdfPage": 76,
   "part": "IX",
   "partTitle": "Cohomologie de de Rham",
   "title": "Formes fermées, exactes et cohomologie de de Rham",
   "question": "Pourquoi peut-on intégrer la forme angulaire sur chaque arc sans obtenir de primitive globale ?",
   "lecture": "La forme α intègre chaque petit pas d’angle. Le point orange de départ et celui d’arrivée sont le même sur S¹. Sur la droite des angles, la primitive augmente de 2π pendant le tour. Elle ne redescend donc pas en une fonction sur S¹.",
   "origine": "Sur le cercle, toute 1-forme est fermée par dimension. Une forme exacte df aurait une intégrale nulle sur une boucle. Pour α=x dy−y dx restreinte à S¹, la période vaut 2π. La cohomologie identifie les formes fermées qui ne diffèrent que d’une forme exacte.",
   "verifier": {
    "question": "Si tu ajoutes df à α, est-ce que la période change ?",
    "reponse": "Non. L’intégrale de df sur une boucle est nulle.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8281
    ]
   },
   "cours": {
    "chapters": [
     66,
     66
    ],
    "pages": [
     206,
     210
    ]
   }
  },
  {
   "n": 74,
   "pdfPage": 77,
   "part": "IX",
   "partTitle": "Cohomologie de de Rham",
   "title": "Lemme de Poincaré, homotopie et périodes",
   "question": "Quels lacets et surfaces révèlent une information que les cartes locales ne voient pas ?",
   "lecture": "À gauche, les segments vers le centre restent dans l’ouvert étoilé. À droite, deux cycles distincts sont tracés sur le tore. Intégrer les formes angulaires sur ces cycles donne deux périodes indépendantes. L’aire angulaire donne aussi une période en degré 2.",
   "origine": "Intégrer le long de la contraction donne l’opérateur d’homotopie K. Une forme fermée de degré positif est alors exacte sur un ouvert étoilé. Deux applications homotopes induisent la même application en cohomologie. Le théorème de de Rham relie les classes aux périodes sur les cycles réels.",
   "verifier": {
    "question": "Pourquoi dθ₁∧dθ₂ ne peut-elle pas être exacte sur le tore ?",
    "reponse": "Son intégrale est non nulle alors que Stokes annule celle d’une 2-forme exacte.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     66,
     66
    ],
    "pages": [
     206,
     210
    ]
   }
  },
  {
   "n": 75,
   "pdfPage": 78,
   "part": "X",
   "partTitle": "Théorie de Hodge",
   "title": "Produit L², adjoint et formes harmoniques",
   "question": "Comment la forme harmonique se reconnaît-elle avec deux mesures d’énergie ?",
   "lecture": "Sur le cercle, la courbe verte donne le coefficient de α=f(θ)dθ. La courbe orange donne δα=−f′. À droite, les deux carrés de normes contribuent à une même quantité positive. Pour une forme harmonique, les deux doivent s’annuler.",
   "origine": "Le produit L² intègre le produit ponctuel donné par la métrique. Sur une variété compacte orientée sans bord, Stokes permet de déplacer d d’un argument vers δ sur l’autre. L’identité d’énergie suit pour Δ_H=dδ+δd.",
   "verifier": {
    "question": "Quel type de fonction f donne une 1-forme harmonique sur le cercle standard ?",
    "reponse": "Un coefficient constant.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     67,
     67
    ],
    "pages": [
     212,
     213
    ]
   }
  },
  {
   "n": 76,
   "pdfPage": 79,
   "part": "X",
   "partTitle": "Théorie de Hodge",
   "title": "Décomposition de Hodge et nombres de Betti",
   "question": "Comment reconnaître la partie d’une forme qui porte ses périodes ?",
   "lecture": "Les carrés sont périodiques et les flèches représentent les 1-formes via la métrique plate. Le premier champ est un gradient oscillant. Le deuxième est transverse et coexact. Le troisième est constant et porte des périodes autour du tore.",
   "origine": "Sur une variété compacte orientée sans bord, la décomposition est orthogonale en L². Pour une forme fermée, la partie coexacte est nulle. Chaque classe de de Rham possède un représentant harmonique unique. Les nombres de Betti comptent ces dimensions. Le cercle a (1,1), la sphère S² a (1,0,1) et le tore T² a (1,2,1).",
   "verifier": {
    "question": "Si une forme harmonique est aussi exacte, que vaut-elle ?",
    "reponse": "Zéro par orthogonalité entre harmoniques et formes exactes.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     68,
     68
    ],
    "pages": [
     214,
     215
    ]
   }
  },
  {
   "n": 77,
   "pdfPage": 80,
   "part": "XI",
   "partTitle": "Fibrés et connexions",
   "title": "Fibré principal, section et transition",
   "question": "Que signifie choisir un repère dans chaque fibre, puis changer ce choix ?",
   "lecture": "La ligne basse est la base et les traits verticaux schématisent les fibres. Une section sélectionne un point de chaque fibre au-dessus de son domaine. Les sections verte et orange font deux choix dans la même fibre, reliés par l’élément violet.",
   "origine": "Dans un fibré principal, G agit à droite librement et transitivement sur chaque fibre. Une section locale identifie P|U à U×G en envoyant (x,g) sur s(x)g. Les fonctions de transition vérifient gᵢⱼgⱼₖ=gᵢₖ. Une section globale trivialise le fibré.",
   "verifier": {
    "question": "Qu’est-ce qui identifie une fibre à G ?",
    "reponse": "Le choix d’un point de référence dans la fibre.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8281
    ]
   },
   "cours": {
    "chapters": [
     69,
     69
    ],
    "pages": [
     217,
     219
    ]
   }
  },
  {
   "n": 78,
   "pdfPage": 81,
   "part": "XI",
   "partTitle": "Fibrés et connexions",
   "title": "Connexion principale, courbure et holonomie",
   "question": "Comment une boucle fermée sur la base laisse-t-elle un décalage dans sa fibre ?",
   "lecture": "À gauche, le lacet parcourt le rectangle dans le sens positif. À droite, son relèvement suit les directions horizontales A=0. La phase est dépliée en hauteur. Le dessin prend x = 0 sur le bord gauche. Le segment violet mesure l’écart dans la fibre d’arrivée.",
   "origine": "Pour un groupe abélien, la courbure locale est da. L’horizontalité donne dφ=−a, puis Stokes donne l’écart. Dans le cas général, F_A=dA+½[A∧A] et D_AF_A=0 par Bianchi. Pour un lacet fini non abélien, l’ordre des transports intervient.",
   "verifier": {
    "question": "Quel est l’écart de phase pour un rectangle d’aire 1 dans cet exemple ?",
    "reponse": "−1 radian modulo 2π.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     70,
     70
    ],
    "pages": [
     220,
     223
    ]
   }
  },
  {
   "n": 79,
   "pdfPage": 82,
   "part": "XI",
   "partTitle": "Fibrés et connexions",
   "title": "Fibré de Hopf et choix de phase",
   "question": "Comment chaque cercle enlacé peut-il représenter une seule direction complexe ?",
   "lecture": "À gauche, les deux boucles sont des projections stéréographiques de deux fibres de Hopf. Sur chacune, on multiplie les deux coordonnées complexes par la même phase. Chaque boucle correspond à un point de la sphère de droite.",
   "origine": "Le quotient envoie (z₁,z₂) sur la droite complexe [z₁:z₂]. La connexion A=Im(z̄₁dz₁+z̄₂dz₂) vaut 1 sur la vitesse de phase et s’annule sur les directions horizontales. Les fibres enlacées visualisent le recollement global, que l’on détecte par la classe de Chern.",
   "verifier": {
    "question": "Deux couples qui ne diffèrent que par leur phase commune représentent-ils deux points du quotient ?",
    "reponse": "Non. Ils appartiennent à la même fibre.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     70,
     70
    ],
    "pages": [
     220,
     223
    ]
   }
  },
  {
   "n": 80,
   "pdfPage": 83,
   "part": "XII",
   "partTitle": "Classes caractéristiques",
   "title": "Chern-Weil et classes caractéristiques",
   "question": "Comment un choix local de repère peut-il révéler un invariant global ?",
   "lecture": "Les deux cartes couvrent la sphère et leur intersection contient l’équateur. La phase du changement de repère fait un tour autour de cet équateur. Dans l’exemple de Hopf, le degré vaut ±1 selon les choix de signe et d’orientation.",
   "origine": "Un polynôme invariant P transforme la courbure en une forme sur la base. Bianchi donne sa fermeture. Lorsque la connexion varie, la forme change d’un terme exact. Chern concerne les fibrés complexes, Pontryagin utilise la complexification d’un fibré réel et Euler tient compte de son orientation.",
   "verifier": {
    "question": "Que révèle un degré non nul pour la transition d’un fibré en cercles sur S² ?",
    "reponse": "Une obstruction à une section globale.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     71,
     71
    ],
    "pages": [
     225,
     227
    ]
   }
  },
  {
   "n": 81,
   "pdfPage": 84,
   "part": "XII",
   "partTitle": "Classes caractéristiques",
   "title": "Gauss-Bonnet et classe d’Euler",
   "question": "Pourquoi une sphère plus grande garde-t-elle la même courbure totale ?",
   "lecture": "En doublant le rayon, l’aire est multipliée par quatre et la courbure locale est divisée par quatre. Les deux effets se compensent exactement dans l’intégrale. Les rayons dessinés sont schématiques.",
   "origine": "Sur toute surface compacte orientée sans bord, la forme de courbure K dvol_g/(2π) représente la classe d’Euler du tangent. La géométrie change avec la métrique et sa classe reste la même. Pour la sphère, l’intégrale de K vaut 4π et χ vaut 2.",
   "verifier": {
    "question": "Sur un tore fermé, que vaut l’intégrale de K pour n’importe quelle métrique ?",
    "reponse": "Zéro, puisque χ(T²)=0.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     71,
     71
    ],
    "pages": [
     225,
     227
    ]
   }
  },
  {
   "n": 82,
   "pdfPage": 85,
   "part": "XIII",
   "partTitle": "Représentations compactes",
   "title": "Irréductibilité, moyenne de Haar et lemme de Schur",
   "question": "Comment décomposer une action linéaire en morceaux qui restent stables ?",
   "lecture": "Dans le premier panneau, le plan W reste stable sous l’action. Une fois le produit scalaire invariant, son orthogonal est stable aussi. À droite, les ellipses schématisent des métriques tournées. Leur moyenne sur le cercle possède la symétrie de rotation.",
   "origine": "Pour G compact, la mesure de Haar normalisée rend le produit moyen invariant. On décompose une représentation de dimension finie en sous-espaces irréductibles, sans sous-espace invariant propre non nul. Sur un irréductible complexe, Schur impose qu’un endomorphisme entrelaçant soit scalaire.",
   "verifier": {
    "question": "Un projecteur entrelaçant sur un irréductible complexe peut-il avoir une image propre non nulle ?",
    "reponse": "Non. Son image serait un sous-espace invariant.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     72,
     72
    ],
    "pages": [
     229,
     232
    ]
   }
  },
  {
   "n": 83,
   "pdfPage": 86,
   "part": "XIII",
   "partTitle": "Représentations compactes",
   "title": "Peter-Weyl, caractères et passage de SU(2) à SO(3)",
   "question": "Quel est l’analogue des fréquences de Fourier pour un groupe compact ?",
   "lecture": "À gauche, deux parties réelles de caractères du cercle oscillent à des fréquences différentes. À droite, les points verts sont les représentations de SU(2) sur lesquelles −I agit comme +I. Elles sont compatibles avec l’identification du revêtement double.",
   "origine": "Peter-Weyl décompose L²(G) par les coefficients matriciels des irréductibles. Sur le cercle, ces coefficients sont les exponentielles de Fourier. Pour SU(2), les puissances symétriques de degré m ont dimension m+1. Seuls les degrés pairs descendent à SO(3).",
   "verifier": {
    "question": "Quelle dimension a la représentation de SO(3) issue du degré m=4 ?",
    "reponse": "5.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     72,
     72
    ],
    "pages": [
     229,
     232
    ]
   }
  },
  {
   "n": 84,
   "pdfPage": 87,
   "part": "XIV",
   "partTitle": "Racines et poids",
   "title": "Cartan, racines et poids dans sl₂",
   "question": "Qu’est-ce qui se lit sur les deux droites de valeurs propres ?",
   "lecture": "À gauche, ad_H agit sur l’algèbre elle-même. Les valeurs non nulles −2 et +2 donnent les racines, tandis que H porte le poids zéro. À droite, H agit sur une autre représentation. E monte les poids de deux et F les descend.",
   "origine": "La sous-algèbre de Cartan est ℂH dans cet exemple. Les racines sont les poids non nuls de l’adjointe. Le calcul ρ(H)ρ(E)v=ρ(E)ρ(H)v+2ρ(E)v explique le déplacement de poids. Le poids dominant de Sym³ vaut 3. Le système A₁ a une seule racine simple.",
   "verifier": {
    "question": "Pourquoi E annule-t-il un vecteur de poids maximal 3 dans Sym³ ?",
    "reponse": "Le poids 5, où E devrait l’envoyer, n’existe pas dans cet espace.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     73,
     73
    ],
    "pages": [
     234,
     236
    ]
   }
  },
  {
   "n": 85,
   "pdfPage": 88,
   "part": "XV",
   "partTitle": "Réduction symplectique",
   "title": "Réduction symplectique de Marsden-Weinstein",
   "question": "Que reste-t-il après avoir fixé une quantité conservée et oublié la symétrie associée ?",
   "lecture": "Pour ℂ² avec phase commune, fixer J=−r²/2 impose ‖z‖=r. À gauche, la coupe en modules montre cette contrainte. Au milieu, le niveau réel est S³. On identifie ensuite chaque cercle de phase à un point de la sphère réduite.",
   "origine": "Pour une valeur régulière μ, le niveau est lisse. Si l’action de G_μ y est libre et propre, le quotient est lisse. Sur le niveau, ω(ξ_M,v)=dJ_ξ(v)=0 pour les directions d’orbite. Ce sont les directions du noyau retirées par le quotient, ce qui donne la forme réduite.",
   "verifier": {
    "question": "Dans ℂ², combien de dimensions réelles perd-on pour ce niveau non nul et ce quotient ?",
    "reponse": "Deux. Une pour la contrainte et une pour la phase.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     74,
     74
    ],
    "pages": [
     238,
     240
    ]
   }
  },
  {
   "n": 86,
   "pdfPage": 89,
   "part": "XV",
   "partTitle": "Réduction symplectique",
   "title": "Orbites coadjointes et forme KKS",
   "question": "Pourquoi une sphère de moments porte-t-elle une forme symplectique issue du crochet ?",
   "lecture": "À gauche, les contours représentent des sphères ᵓᵒ centrées dans (3)*. Une rotation garde le rayon. À droite, les flèches tangentes sont créées par deux rotations infinitésimales. Le parallélogramme représente la paire de directions lue par la forme KKS.",
   "origine": "Sur la sphère de rayon r, u=ξ×ν et v=η×ν. Alors ω_ν(u,v)=ν·(ξ×η)=ν·(u×v)/r², soit 1/r fois l’aire orientée. La formule est indépendante des générateurs qui représentent u et v, car ceux qui fixent ν ne contribuent pas. Jacobi donne la fermeture.",
   "verifier": {
    "question": "Quelle est l’orbite coadjointe du vecteur nul ?",
    "reponse": "Un point.",
    "box": [
     0.658,
     0.8039,
     0.9596,
     0.8281
    ]
   },
   "cours": {
    "chapters": [
     75,
     75
    ],
    "pages": [
     241,
     242
    ]
   }
  },
  {
   "n": 87,
   "pdfPage": 90,
   "part": "XVI",
   "partTitle": "Systèmes intégrables",
   "title": "Intégrales premières, involution et tores",
   "question": "Pourquoi deux oscillateurs indépendants donnent-ils une surface en forme de tore ?",
   "lecture": "Chaque énergie positive fixe un cercle dans le plan des phases de son oscillateur. Choisir un point sur chacun revient à choisir deux angles. Les deux boucles colorées montrent les directions que les deux flots peuvent parcourir indépendamment.",
   "origine": "Des intégrales en involution ont des champs hamiltoniens qui commutent et restent tangents au niveau commun. Sous indépendance, les n contraintes dans une variété symplectique de dimension 2n laissent n dimensions. Liouville-Arnold identifie un niveau régulier compact connexe à un tore.",
   "verifier": {
    "question": "Si l’un des oscillateurs a une énergie nulle, reste-t-il un produit de deux cercles ?",
    "reponse": "Non. Ce facteur se réduit à son équilibre et le niveau perd la régularité requise.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     76,
     76
    ],
    "pages": [
     244,
     245
    ]
   }
  },
  {
   "n": 88,
   "pdfPage": 91,
   "part": "XVI",
   "partTitle": "Systèmes intégrables",
   "title": "Liouville-Arnold et coordonnées action-angle",
   "question": "Comment une trajectoire incurvée devient-elle une translation uniforme en angle ?",
   "lecture": "À gauche, choisir l’action I fixe le cercle. La flèche indique la rotation de la phase. À droite, l’angle est déplié sur la droite et avance à vitesse constante. Les deux droites correspondent à des points de départ différents sur le même niveau.",
   "origine": "Le théorème de Liouville-Arnold fournit ces coordonnées près d’un tore régulier compact. Dans la convention du cours ω=dI∧dθ, contracter X_H donne I′dθ−θ′dI=dH. Pour l’oscillateur unité, q=√(2I)cosθ et p=√(2I)sinθ donnent H=I.",
   "verifier": {
    "question": "Qu’est-ce qui détermine la fréquence sur chaque tore ?",
    "reponse": "Le gradient du Hamiltonien par rapport aux actions, au signe de convention près.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8697
    ]
   },
   "cours": {
    "chapters": [
     77,
     77
    ],
    "pages": [
     246,
     248
    ]
   }
  },
  {
   "n": 89,
   "pdfPage": 92,
   "part": "XVI",
   "partTitle": "Systèmes intégrables",
   "title": "Pendule, niveaux réguliers et séparatrice",
   "question": "Où les coordonnées action-angle cessent-elles de décrire le même type de trajectoire ?",
   "lecture": "Les courbes vertes font osciller l’angle autour de zéro. Les courbes violettes font des tours complets, puisque les bords q=±π sont identifiés. L’orange passe par le point d’équilibre instable et sépare les deux régimes.",
   "origine": "Au point (π,0), dH=(sin q)dq+p dp est nul. Le niveau H=1 est donc singulier. Sur les niveaux réguliers compacts, les trajectoires sont périodiques. La période de libration devient très grande au voisinage de la séparatrice.",
   "verifier": {
    "question": "Peut-on prendre la même carte action-angle lisse à travers le point orange ?",
    "reponse": "Non. Le niveau n’y est plus régulier.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     77,
     77
    ],
    "pages": [
     246,
     248
    ]
   }
  },
  {
   "n": 90,
   "pdfPage": 93,
   "part": "XVII",
   "partTitle": "Vers l’analyse et le calcul",
   "title": "De la géométrie à l’analyse et au calcul",
   "question": "Comment passer d’une formulation sur un domaine à une équation que l’on peut approcher ?",
   "lecture": "À gauche, le domaine est couvert de triangles. À droite, une fonction test vaut 1 au nœud orange et 0 aux autres, avec interpolation affine sur chaque élément. Le dessin montre une façon de choisir un espace de calcul de dimension finie.",
   "origine": "Pour un problème de Dirichlet homogène, l’intégration par parties donne la formulation faible. L’analyse étudie existence, régularité et stabilité. La discrétisation choisit un espace test et un espace d’approximation, puis il reste à contrôler l’erreur. Les objets géométriques fournissent la structure du problème.",
   "verifier": {
    "question": "Quel théorème d’analyse donne existence et unicité pour une forme bilinéaire continue et coercive ?",
    "reponse": "Le théorème de Lax-Milgram.",
    "box": [
     0.658,
     0.8254,
     0.9596,
     0.8496
    ]
   },
   "cours": {
    "chapters": [
     78,
     78
    ],
    "pages": [
     250,
     251
    ]
   }
  }
 ]
};
