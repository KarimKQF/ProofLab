import { t } from '@/content/authoring';
import type { OperatorLesson } from './types';

export const FOUNDATIONS: OperatorLesson[] = [
  {
    id: 'norme-operateur', title: 'D’une matrice à un opérateur borné',
    lead: 'Mesurer une transformation sur tous les vecteurs unitaires, puis identifier ce qui change en dimension infinie.',
    prerequisites: [],
    sources: [{ kind: 'polycopie', label: 'Compléments d’analyse fonctionnelle et EDP, section 6.1', pdfPages: [23] }, { kind: 'complement', label: 'Développement pédagogique : norme et opérateurs diagonaux', pdfPages: [] }],
    theoremIds: ['banach-steinhaus', 'graphe-ferme'], atlasId: 'norme-operateur',
    sections: [
      { title: 'Définition et quantificateurs', body: t`Pour deux espaces normés $X,Y$, un opérateur linéaire $T:X\to Y$ est borné lorsqu’il existe $C\ge0$ tel que $\|Tx\|_Y\le C\|x\|_X$ pour tout $x$. Sa norme est $\|T\|=\sup_{\|x\|_X\le1}\|Tx\|_Y$. Le même $C$ doit convenir à tous les vecteurs. Pour une application linéaire partout définie, être bornée équivaut à être continue.` },
      { title: 'Lire l’image d’une boule', body: t`Dans $\mathbb R^2$ euclidien, $T=\operatorname{diag}(3,1)$ transforme le cercle unité en une ellipse de demi-axes $3$ et $1$. Le plus grand étirement vaut $\|T\|=3$. Pour une matrice quelconque, les étirements sont ses valeurs singulières, racines des valeurs propres de $T^*T$ ; ils ne sont pas en général les modules des valeurs propres de $T$.` },
      { title: 'Le passage à une infinité de coordonnées', body: t`Sur $\ell^2(\mathbb N^*)$, si $(a_n)$ est bornée, $Tx=(a_nx_n)_n$ définit un opérateur borné de norme $\sup_n|a_n|$. Si $a_n=n$, la même formule ne définit plus un opérateur sur tout $\ell^2$ : il faut choisir $D(T)=\{x:\sum n^2|x_n|^2<\infty\}$. Une matrice tronquée ne permet pas d’effacer cette restriction de domaine.` },
    ],
    example: { title: 'Une norme qui n’est atteinte par aucun vecteur', body: t`Pour $a_n=1-1/(n+1)$, on a $\|T\|=1$. Pourtant, si $x\ne0$, $\|Tx\|^2=\sum a_n^2|x_n|^2<\sum |x_n|^2$. Le supremum de la norme n’est donc pas un maximum sur la sphère unité. Les vecteurs $e_n$ approchent la borne sans jamais l’atteindre.` },
    proof: { title: 'Calculer exactement la norme diagonale', scope: 'complete-example', scopeNote: 'Preuve complète pour une diagonale bornée sur ℓ² ; elle ne suppose aucun théorème spectral.', steps: [
      t`Poser $M=\sup_n|a_n|<\infty$. Pour $x\in\ell^2$, la série $\sum |a_nx_n|^2$ est majorée par $M^2\sum |x_n|^2$ ; $Tx$ appartient donc à $\ell^2$.`,
      t`L’inégalité précédente donne $\|Tx\|\le M\|x\|$, donc $\|T\|\le M$.`,
      t`Chaque vecteur canonique $e_n$ est unitaire et $\|Te_n\|=|a_n|$. Ainsi $\|T\|\ge|a_n|$ pour tout $n$, d’où $\|T\|\ge M$.`,
      t`Les deux bornes donnent $\|T\|=M$. Si la suite $(a_n)$ n’est pas bornée, les mêmes tests sur $e_n$ excluent toute estimation uniforme sur le domaine naturel.`,
    ] },
    pitfalls: [t`Une grande famille de tests numériques ne remplace pas le quantificateur « pour tout $x$ ».`, t`Pour $T=\begin{pmatrix}0&1\\0&0\end{pmatrix}$, toutes les valeurs propres sont nulles mais $\|T\|=1$ : rayon spectral et norme sont distincts.`],
    questions: [
      { id: 'norme', prompt: t`Sur $\ell^2$, $Te_n=(2+1/n)e_n$. Quelle est $\|T\|$ ?`, options: [{ text: '2', feedback: '2 est la limite des coefficients, mais la norme tient compte aussi du premier.' }, { text: '3', feedback: t`Oui : $\sup_n(2+1/n)=3$, atteint pour $e_1$.` }, { text: 'L’opérateur est non borné', feedback: 'Tous les coefficients sont compris entre 2 et 3.' }], correctIndex: 1 },
      { id: 'supremum', prompt: 'Sur un Hilbert de dimension infinie, la norme d’un opérateur borné est-elle toujours atteinte sur un vecteur unitaire ?', options: [{ text: 'Oui, la sphère unité est compacte', feedback: 'La sphère unité n’est pas compacte en norme en dimension infinie.' }, { text: 'Non, un supremum peut ne pas être atteint', feedback: t`La diagonale $a_n=1-1/(n+1)$ fournit précisément ce cas.` }], correctIndex: 1 },
    ],
  },
  {
    id: 'domaine-adjoint', title: 'Domaine, graphe fermé et adjoint',
    lead: 'Un opérateur est une formule accompagnée de son domaine. L’adjoint se construit à partir des deux.',
    prerequisites: ['norme-operateur'], sources: [{ kind: 'polycopie', label: 'Compléments d’analyse fonctionnelle et EDP, section 6.1', pdfPages: [23] }],
    theoremIds: ['adjoint', 'graphe-ferme'], atlasId: 'domaine-adjoint',
    sections: [
      { title: 'Un graphe dans un produit de Hilbert', body: t`Un opérateur $A:D(A)\subset H\to H$ est fermé si $u_k\to u$ et $Au_k\to v$ dans $H$ entraînent $u\in D(A)$ et $Au=v$. La norme de graphe $\|u\|_A=(\|u\|^2+\|Au\|^2)^{1/2}$ rend $D(A)$ complet exactement lorsque $A$ est fermé. Le domaine n’a pas besoin d’être fermé pour la norme de $H$.` },
      { title: 'L’adjoint est défini par une identité', body: t`On fixe sur le Hilbert complexe un produit scalaire linéaire dans la première variable. Si $D(A)$ est dense, $v\in D(A^*)$ lorsqu’il existe $w\in H$ tel que $\langle Au,v\rangle=\langle u,w\rangle$ pour tout $u\in D(A)$ ; on pose $A^*v=w$. La densité rend $w$ unique. Elle ne dit pas que $D(A^*)=H$.` },
      { title: 'Pourquoi « fermé » ne signifie pas « borné »', body: t`Le théorème du graphe fermé s’applique à une application linéaire définie sur tout un Banach. Si $D(A)$ est un sous-espace propre de $H$, il ne conclut pas à $\|Au\|\le C\|u\|_H$. En revanche, $A:(D(A),\|\cdot\|_A)\to H$ est toujours borné, de norme au plus $1$.` },
    ],
    example: { title: 'Un domaine dense mais non fermé dans ℓ²', body: t`Soit $Au=(nu_n)_n$ sur $D(A)=\{u:\sum n^2|u_n|^2<\infty\}$. Les suites finies appartiennent à $D(A)$, donc celui-ci est dense. Les troncatures de $u_n=1/n$ appartiennent au domaine et convergent dans $\ell^2$ vers $u$, mais $u\notin D(A)$. Malgré cela, le graphe de $A$ est fermé.` },
    proof: { title: 'La diagonale n est fermée et auto-adjointe', scope: 'complete-example', scopeNote: 'Preuve complète pour le domaine naturel de cette diagonale ; les tests de coordonnées déterminent aussi le domaine adjoint.', steps: [
      t`Si $u^{(k)}\to u$ et $Au^{(k)}\to v$ dans $\ell^2$, chaque coordonnée converge ; ainsi $v_n=nu_n$. Comme $v\in\ell^2$, $u\in D(A)$ et $Au=v$. Le graphe est fermé.`,
      t`Si $v\in D(A)$, la série $\langle Au,v\rangle=\sum nu_n\overline{v_n}=\langle u,Av\rangle$ est justifiée par Cauchy–Schwarz pour $u\in D(A)$. Donc $v\in D(A^*)$ et $A^*v=Av$.`,
      t`Réciproquement, si $v\in D(A^*)$ et $w=A^*v$, tester la définition avec $u=e_n$ donne $w_n=nv_n$ pour tout $n$.`,
      t`Puisque $w\in\ell^2$, on obtient $\sum n^2|v_n|^2<\infty$, donc $v\in D(A)$. Ainsi $D(A^*)=D(A)$ et $A^*=A$.`,
      t`Enfin $\|Ae_n\|=n$ exclut toute borne uniforme dans la norme de $\ell^2$. Cet opérateur est à la fois fermé, auto-adjoint et non borné.`,
    ] },
    pitfalls: [t`Fermer un graphe dans $H\times H$ ne revient pas à fermer son domaine dans $H$.`, t`Écrire la même formule pour $A$ et $A^*$ ne suffit pas : il faut comparer leurs domaines.`],
    questions: [
      { id: 'domaine', prompt: t`Pour $Au=(nu_n)$, le vecteur $u_n=1/n$ appartient-il à $D(A)$ ?`, options: [{ text: t`Oui, car $u\in\ell^2$`, feedback: 'Appartenir au Hilbert ne suffit pas : il faut aussi que l’image appartienne au Hilbert.' }, { text: t`Non, car $Au=(1,1,\ldots)\notin\ell^2$`, feedback: 'Oui : la condition de domaine vérifie exactement la sommabilité de l’image.' }], correctIndex: 1 },
      { id: 'densite', prompt: 'À quoi sert la densité du domaine dans la définition de l’adjoint ?', options: [{ text: 'À assurer que le vecteur représentant est unique', feedback: t`Si $\langle u,w-w'\rangle=0$ sur un sous-espace dense, la continuité donne $w=w'$.` }, { text: 'À rendre automatiquement l’opérateur borné', feedback: 'Le domaine de la diagonale n est dense, mais celle-ci est non bornée.' }, { text: 'À imposer que le domaine soit tout le Hilbert', feedback: 'Dense ne signifie pas égal : les suites finies sont denses dans ℓ².' }], correctIndex: 0 },
    ],
  },
  {
    id: 'autoadjonction', title: 'Symétrique ou auto-adjoint : le rôle du bord',
    lead: 'Comparer deux réalisations de la même dérivée et voir comment une condition au bord change l’adjoint.',
    prerequisites: ['domaine-adjoint'], sources: [{ kind: 'polycopie', label: 'Compléments d’analyse fonctionnelle et EDP, sections 6.1 et 6.7', pdfPages: [23, 26] }, { kind: 'complement', label: 'Exemple détaillé de la dérivée sur un intervalle', pdfPages: [] }],
    theoremIds: ['adjoint', 'friedrichs'], atlasId: 'domaine-adjoint',
    sections: [
      { title: 'L’inclusion et l’égalité', body: t`Un opérateur densément défini est symétrique si $\langle Au,v\rangle=\langle u,Av\rangle$ pour tous $u,v\in D(A)$ ; cela équivaut à $A\subset A^*$. Il est auto-adjoint lorsque $A=A^*$, ce qui exige aussi $D(A)=D(A^*)$. L’égalité de domaines est une condition supplémentaire en dimension infinie.` },
      { title: 'Une identité qui expose les domaines', body: t`Sur $H=L^2(0,1;\mathbb C)$, pour $u,v\in H^1(0,1)$ et $Pu=-iu'$, l’intégration par parties donne $\langle Pu,v\rangle-\langle u,Pv\rangle=-i[u\overline v]_0^1$. Annuler cette expression pour tous les $u$ autorisés détermine les conditions imposées à $v$ dans l’adjoint.` },
      { title: 'Deux opérateurs distincts', body: t`La réalisation minimale $P_0$ de domaine $H^1_0(0,1)$ est symétrique, mais $D(P_0^*)=H^1(0,1)$ : elle n’est pas auto-adjointe. La réalisation périodique $P_{\mathrm{per}}$ de domaine $\{u\in H^1(0,1):u(1)=u(0)\}$ est auto-adjointe. Le même symbole $-i\,d/dx$ recouvre donc deux opérateurs.` },
    ],
    example: { title: 'Reconnaître une condition périodique', body: t`La fonction constante $1$ appartient à $D(P_{\mathrm{per}})$ et est vecteur propre de valeur propre $0$. Elle appartient aussi à $D(P_0^*)$, mais pas à $D(P_0)$. Cette seule fonction suffit à montrer que les domaines minimal et adjoint diffèrent.` },
    proof: { title: 'Identifier l’adjoint de la dérivée périodique', scope: 'complete-example', scopeNote: 'Preuve complète de l’auto-adjonction périodique, en admettant les propriétés usuelles de H¹ : dérivée faible, traces et intégration par parties.', steps: [
      t`Les fonctions $C_c^\infty(0,1)$ sont dans $D(P_{\mathrm{per}})$ et sont denses dans $L^2$ ; l’adjoint est donc bien défini.`,
      t`Si $v\in D(P_{\mathrm{per}}^*)$, il existe $w\in L^2$ vérifiant l’identité d’adjoint. En la testant sur $C_c^\infty$, on obtient au sens des distributions $-iv'=w$. Donc $v\in H^1(0,1)$.`,
      t`Pour $u\in D(P_{\mathrm{per}})$, l’intégration par parties laisse le terme $-iu(0)(\overline{v(1)}-\overline{v(0)})$. L’identité d’adjoint exige qu’il soit nul pour tout $u$.`,
      t`Le choix des fonctions constantes $u$ permet toute valeur de $u(0)$ ; il impose donc $v(1)=v(0)$. Ainsi $D(P_{\mathrm{per}}^*)\subset D(P_{\mathrm{per}})$.`,
      t`Réciproquement, si $v\in H^1$ satisfait $v(1)=v(0)$, le terme de bord s’annule pour tout $u$ périodique : $v\in D(P_{\mathrm{per}}^*)$ et $P_{\mathrm{per}}^*v=-iv'$. Les deux opérateurs sont égaux.`,
    ] },
    pitfalls: [t`Une matrice hermitienne est partout définie ; cette intuition masque la question des domaines pour un opérateur différentiel.`, t`L’extension de Friedrichs concerne les opérateurs symétriques minorés. La dérivée périodique a un spectre non borné dans les deux sens : ce n’est pas un exemple d’application de Friedrichs.`],
    questions: [
      { id: 'minimum', prompt: t`Pourquoi $P_0$ de domaine $H^1_0(0,1)$ n’est-il pas auto-adjoint ?`, options: [{ text: 'Sa formule n’est pas linéaire', feedback: 'La dérivée multipliée par −i est linéaire.' }, { text: t`Parce que $D(P_0^*)=H^1(0,1)$ est plus grand`, feedback: 'Oui : les conditions nulles sur u annulent déjà le terme de bord, sans imposer de condition à v.' }, { text: 'Parce qu’aucun opérateur non borné n’est auto-adjoint', feedback: 'La diagonale n et la dérivée périodique sont des contre-exemples.' }], correctIndex: 1 },
      { id: 'periodique', prompt: t`Quelle condition sur $v$ annule $[u\overline v]_0^1$ pour tout $u$ périodique ?`, options: [{ text: t`v(1)=v(0)`, feedback: 'Oui : les valeurs communes de u au bord sont arbitraires.' }, { text: t`v(0)=v(1)=0 uniquement`, feedback: 'Cette condition suffit, mais elle est trop restrictive pour décrire tout le domaine adjoint.' }, { text: 'Aucune condition', feedback: 'Prendre u constante révèle le terme v(1)−v(0).' }], correctIndex: 0 },
    ],
  },
  {
    id: 'spectre-resolvante', title: 'Spectre, résolvante et stabilité de l’inverse',
    lead: 'Le spectre rassemble les paramètres où l’inversion échoue ; une valeur propre n’est qu’une des causes possibles.',
    prerequisites: ['autoadjonction'], sources: [{ kind: 'polycopie', label: 'Compléments d’analyse fonctionnelle et EDP, section 6.2', pdfPages: [23] }, { kind: 'complement', label: 'Estimation de la résolvante auto-adjointe et classification du spectre', pdfPages: [] }],
    theoremIds: ['adjoint', 'spectral-general'], atlasId: 'spectre-resolvante',
    sections: [
      { title: 'Définition avec le domaine', body: t`Pour $A$ fermé sur un Hilbert complexe, $z\in\rho(A)$ signifie que $zI-A:D(A)\to H$ est bijectif et que son inverse $R(z,A)$ est borné comme opérateur de $H$ vers $H$. Le spectre est $\sigma(A)=\mathbb C\setminus\rho(A)$. On garde la convention $R(z,A)=(zI-A)^{-1}$, qui fixe les signes.` },
      { title: 'Trois façons de ne pas être inversible', body: t`Le spectre ponctuel correspond à la non-injectivité. Dans la convention utilisée ici, le spectre continu correspond à un opérateur injectif, d’image dense, non surjectif ; le spectre résiduel au cas injectif dont l’image n’est pas dense. Un auto-adjoint n’a pas de spectre résiduel : pour $\lambda\in\mathbb R$, $\operatorname{Im}(\lambda I-A)^\perp=\ker(\lambda I-A)$.` },
      { title: 'Deux paramètres, une identité', body: t`Pour $z,w\in\rho(A)$, $R(z,A)-R(w,A)=(w-z)R(z,A)R(w,A)$. Cette identité compare des opérateurs bornés partout définis. Près d’un point de la résolvante, une série de Neumann assure encore l’inversibilité ; le spectre est donc fermé.` },
    ],
    example: { title: 'Approcher le spectre fait grandir l’inverse', body: t`Pour $A=\operatorname{diag}(1,3)$, $R(z,A)=\operatorname{diag}((z-1)^{-1},(z-3)^{-1})$ et $\|R(z,A)\|=1/\min(|z-1|,|z-3|)$. À $z=2$, la norme vaut $1$ ; à $z=1+i/10$, elle vaut $10$. Pour une matrice non normale, la norme peut être bien plus grande que l’inverse de la distance au spectre.` },
    proof: { title: 'Un auto-adjoint n’a pas de spectre hors de la droite réelle', scope: 'complete-example', scopeNote: 'Preuve complète de la résolvante non réelle, à partir de l’auto-adjonction et de la fermeture ; aucun calcul spectral n’est nécessaire.', steps: [
      t`Soit $z$ avec $\operatorname{Im}z\ne0$. Pour $u\in D(A)$, $\langle Au,u\rangle$ est réel. La partie imaginaire de $\langle(zI-A)u,u\rangle$ vaut $(\operatorname{Im}z)\|u\|^2$.`,
      t`Cauchy–Schwarz donne $\|(zI-A)u\|\ge|\operatorname{Im}z|\|u\|$. Ainsi $zI-A$ est injectif.`,
      t`Si $(zI-A)u_n\to f$, la borne inférieure rend $(u_n)$ de Cauchy. Écrire $Au_n=zu_n-(zI-A)u_n$ et utiliser la fermeture de $A$ montre que $f$ appartient à l’image. L’image est donc fermée.`,
      t`L’orthogonal de cette image est $\ker(\overline z I-A^*)=\ker(\overline z I-A)$. La même borne inférieure appliquée à $\overline z$ montre que ce noyau est nul. L’image est dense.`,
      t`L’image est à la fois dense et fermée, donc égale à $H$. L’inverse existe et $\|R(z,A)\|\le1/|\operatorname{Im}z|$. Par conséquent $\sigma(A)\subset\mathbb R$.`,
    ] },
    pitfalls: [t`Injectif ne signifie pas inversible en dimension infinie.`, t`$\|R(z,A)\|=1/\operatorname{dist}(z,\sigma(A))$ vaut pour les opérateurs auto-adjoints ; il ne faut pas l’étendre arbitrairement aux matrices non normales.`],
    questions: [
      { id: 'distance', prompt: t`Pour $A=\operatorname{diag}(1,3)$, quelle est $\|R(4,A)\|$ ?`, options: [{ text: '1/3', feedback: 'Ce n’est que le premier coefficient de la diagonale de la résolvante.' }, { text: '1', feedback: t`Les coefficients valent $1/3$ et $1$ ; la norme est le maximum.` }, { text: '4', feedback: 'La résolvante dépend des distances de 4 aux valeurs propres.' }], correctIndex: 1 },
      { id: 'continu', prompt: 'Un opérateur injectif d’image dense mais non surjective correspond à quelle partie du spectre ?', options: [{ text: 'Ponctuel', feedback: 'Le spectre ponctuel exige un vecteur non nul dans le noyau.' }, { text: 'Continu', feedback: 'Oui : l’injectivité et la densité ne donnent pas la surjectivité.' }, { text: 'Résiduel', feedback: 'Dans la convention de cette leçon, le spectre résiduel exige une image non dense.' }], correctIndex: 1 },
    ],
  },
];
