import { t } from '@/content/authoring';
import type { OperatorLesson } from './types';

export const OPERATOR_APPLICATIONS: OperatorLesson[] = [
  {
    id: 'formes-friedrichs', title: 'Formes fermées et extension de Friedrichs',
    lead: 'Construire l’opérateur à partir d’une forme et séparer son domaine du domaine de la forme.',
    prerequisites: ['calcul-fonctionnel', 'autoadjonction'],
    sources: [{ kind: 'polycopie', label: 'Compléments d’analyse fonctionnelle et EDP, sections 6.6–6.7', pdfPages: [25, 26] }],
    theoremIds: ['formes-fermees', 'friedrichs', 'lax-milgram'], atlasId: 'formes-friedrichs',
    sections: [
      { title: 'Fermer une forme', body: t`Soit $q$ une forme sesquilinéaire hermitienne positive, de domaine vectoriel dense $V\subset H$, linéaire dans la première variable. Elle est fermée si $V$ est complet pour $\|u\|_q=(\|u\|_H^2+q(u,u))^{1/2}$. Cette condition n’exige pas que $V$ soit fermé dans la norme de $H$.` },
      { title: 'Représentation par un auto-adjoint positif', body: t`À une telle forme correspond un unique opérateur auto-adjoint positif $A$, défini par $D(A)=\{u\in V:\exists f\in H,\ q(u,v)=\langle f,v\rangle_H\ \forall v\in V\}$ et $Au=f$. La densité rend $f$ unique. Le théorème donne aussi $V=D(A^{1/2})$ et $q(u,v)=\langle A^{1/2}u,A^{1/2}v\rangle$. L’égalité $q(u,v)=\langle Au,v\rangle$ exige $u\in D(A)$.` },
      { title: 'L’extension de Friedrichs', body: t`Si $S$ est symétrique positif et densément défini, la forme $q_0(u,v)=\langle Su,v\rangle$ sur $D(S)$ est fermable. L’opérateur associé à sa fermeture est l’extension de Friedrichs. Pour un opérateur seulement minoré, on procède après une translation par un multiple de l’identité. C’est une extension auto-adjointe distinguée ; cela ne signifie pas que toutes les extensions auto-adjointes sont identiques.` },
    ],
    example: { title: 'Dirichlet et Neumann : même intégrande, domaines différents', body: t`Sur $L^2(0,1)$, la forme $q(u,v)=\int_0^1u'\overline{v'}$ sur $V=H^1_0(0,1)$ donne $Au=-u''$ avec $D(A)=H^2\cap H^1_0$. Sur $V=H^1(0,1)$, elle donne $D(A)=\{u\in H^2:u'(0)=u'(1)=0\}$. Le domaine de forme décide donc des conditions au bord. Partant de $-u''$ sur $C_c^\infty(0,1)$, Friedrichs donne la réalisation de Dirichlet.` },
    proof: { title: 'Identifier exactement la forme et l’opérateur diagonaux', scope: 'complete-example', scopeNote: 'Preuve complète dans le modèle diagonal. Les exercices des résultats 30 et 31 travaillent les arguments généraux de représentation et de fermeture.', steps: [
      t`Poser $V=\{u\in\ell^2:\sum n|u_n|^2<\infty\}$ et $q(u,v)=\sum n u_n\overline{v_n}$. La série converge par Cauchy–Schwarz pondérée. Les suites finies assurent la densité de $V$ dans $H$.`,
      t`La norme de forme est $\|u\|_q^2=\sum(1+n)|u_n|^2$. L’application $u\mapsto(\sqrt{1+n}\,u_n)_n$ identifie cet espace à $\ell^2$, donc le rend complet. La forme est fermée.`,
      t`Si $q(u,v)=\langle f,v\rangle$ pour tout $v\in V$, tester $v=e_n$ impose $f_n=nu_n$. Puisque $f\in\ell^2$, il faut $\sum n^2|u_n|^2<\infty$.`,
      t`Réciproquement, cette sommabilité permet de poser $f=(nu_n)$ et justifie $q(u,v)=\langle f,v\rangle$ pour tout $v\in V$. On obtient exactement $D(A)=\{u:\sum n^2|u_n|^2<\infty\}$ et $Au=(nu_n)$.`,
      t`Le calcul fonctionnel donne $D(A^{1/2})=V$. Le vecteur $u_n=n^{-5/4}$ est dans $V$ mais pas dans $D(A)$ ; le vecteur $n^{-3/4}$ est dans $H$ mais pas dans $V$. Les deux inclusions sont strictes.`,
    ] },
    pitfalls: [t`Une forme positive n’est pas automatiquement coercive pour une norme choisie.`, t`On peut avoir $q(u,u)<\infty$ alors que $Au\notin H$. Écrire $\langle Au,u\rangle$ dans ce cas serait illégitime.`],
    questions: [
      { id: 'domaine-forme', prompt: 'Quel espace est le domaine de la forme fermée associée à un auto-adjoint positif A ?', options: [{ text: t`$D(A^{1/2})$`, feedback: 'Oui : la forme ne requiert qu’une demi-puissance de l’opérateur sur chaque argument.' }, { text: t`Toujours $D(A)$`, feedback: 'La diagonale n fournit un domaine de forme strictement plus grand.' }], correctIndex: 0 },
      { id: 'neumann', prompt: t`Quelle forme produit les conditions de Neumann sur l’intervalle ?`, options: [{ text: t`$\int u'\overline{v'}$ sur $H^1(0,1)$`, feedback: 'Oui : les valeurs au bord des fonctions test sont libres, ce qui impose la nullité des dérivées au bord dans le domaine de l’opérateur.' }, { text: t`La même intégrale sur $H^1_0(0,1)$`, feedback: 'Ce domaine de forme impose les conditions de Dirichlet.' }], correctIndex: 0 },
    ],
  },
  {
    id: 'semi-groupes', title: 'Semi-groupes et générateurs : Hille–Yosida, Lumer–Phillips',
    lead: 'Passer d’un opérateur à une famille continue de transformations en contrôlant la résolvante.',
    prerequisites: ['spectre-resolvante', 'calcul-fonctionnel'], sources: [{ kind: 'polycopie', label: 'Compléments d’analyse fonctionnelle et EDP, section 6.8', pdfPages: [26, 27] }],
    theoremIds: ['hille-yosida', 'lumer-phillips'], atlasId: 'semi-groupes',
    sections: [
      { title: 'Continuité forte et générateur', body: t`Un $C_0$-semi-groupe $(T(t))_{t\ge0}$ vérifie $T(0)=I$, $T(t+s)=T(t)T(s)$ et $T(t)u\to u$ quand $t\downarrow0$, pour tout $u\in H$. Son générateur $G$ est défini par $Gu=\lim_{t\downarrow0}(T(t)u-u)/t$ sur le domaine où cette limite existe en norme. La continuité demandée est forte, pas en norme d’opérateur.` },
      { title: 'Hille–Yosida : cas des contractions', body: t`Un opérateur $G$ engendre un $C_0$-semi-groupe de contractions si et seulement si il est fermé, densément défini, $]0,\infty[\subset\rho(G)$ et $\|(\lambda I-G)^{-1}\|\le1/\lambda$ pour tout $\lambda>0$. Les bornes sur les puissances de la résolvante suivent ici par sous-multiplicativité. Des semi-groupes avec une borne plus générale demandent l’énoncé général de Hille–Yosida.` },
      { title: 'Lumer–Phillips sur un Hilbert', body: t`Pour $G$ densément défini, la dissipativité signifie $\operatorname{Re}\langle Gu,u\rangle\le0$ pour tout $u\in D(G)$. Elle donne $\|(\lambda I-G)u\|\ge\lambda\|u\|$ pour $\lambda>0$. Le théorème de Lumer–Phillips affirme que $G$ engendre un semi-groupe de contractions exactement lorsqu’il est dissipatif et que $\operatorname{Im}(\lambda_0I-G)=H$ pour au moins un $\lambda_0>0$. La surjectivité est essentielle.` },
    ],
    example: { title: 'Le signe du générateur', body: t`Si $A\ge0$ est auto-adjoint, $T(t)=e^{-tA}$ est un semi-groupe de contractions ; son générateur est $G=-A$. Pour $Ae_n=ne_n$, $T(t)e_n=e^{-nt}e_n$, $\|T(t)\|=e^{-t}$, et $\|T(t)-I\|=1$ pour tout $t>0$. Pourtant $T(t)u\to u$ pour chaque $u\in\ell^2$.` },
    proof: { title: 'Construire le semi-groupe diagonal et son générateur', scope: 'complete-example', scopeNote: 'Preuve complète pour Aeₙ = neₙ. Les théorèmes généraux de génération sont exposés dans les résultats 28 et 29 et leurs exercices.', steps: [
      t`Définir $(T(t)u)_n=e^{-nt}u_n$. Les coefficients sont bornés par $1$ pour $t\ge0$, donc $T(t)$ est borné. L’identité $e^{-n(t+s)}=e^{-nt}e^{-ns}$ prouve la loi de semi-groupe.`,
      t`Pour $u$ fixé, $\|T(t)u-u\|^2=\sum|e^{-nt}-1|^2|u_n|^2$. Chaque terme tend vers zéro et est dominé par $|u_n|^2$. La convergence dominée des séries prouve la continuité forte en zéro.`,
      t`Si $u\in D(A)$, les quotients $(e^{-nt}-1)u_n/t$ convergent vers $-nu_n$. L’inégalité $|e^{-nt}-1|/t\le n$ permet de dominer le carré de l’erreur par $4n^2|u_n|^2$, sommable. La limite en norme est donc $-Au$.`,
      t`Réciproquement, si le quotient converge dans $\ell^2$ vers $v$, la convergence coordonnée par coordonnée impose $v_n=-nu_n$. Comme $v\in\ell^2$, $u\in D(A)$. Ainsi $D(G)=D(A)$ et $G=-A$.`,
      t`Pour $t>0$, $\|T(t)-I\|=\sup_n(1-e^{-nt})=1$. Ce calcul prouve directement l’absence de continuité en norme d’opérateur à zéro.`,
    ] },
    pitfalls: [t`La convergence de chaque mode ne donne pas un contrôle uniforme de tous les modes.`, t`Une estimation qui prouve l’injectivité de $\lambda I-G$ ne prouve pas sa surjectivité.`, t`Si on écrit $e^{-tA}$, le générateur est $-A$, et les hypothèses dissipatives concernent ce signe.`],
    questions: [
      { id: 'generateur', prompt: t`Quel est le générateur de $T(t)e_n=e^{-nt}e_n$ ?`, options: [{ text: t`$Ge_n=ne_n$`, feedback: 'La dérivée en zéro de exp(−nt) vaut −n.' }, { text: t`$Ge_n=-ne_n$ sur le domaine naturel`, feedback: 'Oui ; le domaine exige Σn²|uₙ|²<∞.' }], correctIndex: 1 },
      { id: 'forte', prompt: t`Que conclure de $\|T(t)-I\|=1$ pour tout $t>0$ ?`, options: [{ text: 'Le semi-groupe n’est pas fortement continu', feedback: 'Le supremum sur tous les vecteurs unitaires est plus exigeant que la convergence pour chaque vecteur fixé.' }, { text: 'Il n’est pas continu en norme d’opérateur à zéro', feedback: 'Oui, tout en étant fortement continu.' }], correctIndex: 1 },
    ],
  },
  {
    id: 'spectral-generalise', title: 'Problème spectral généralisé : Au = λBu',
    lead: 'Changer le produit scalaire pour ramener deux matrices à un problème spectral symétrique ordinaire.',
    prerequisites: ['spectral-compact', 'formes-friedrichs'], sources: [{ kind: 'complement', label: 'Complément matriciel aux sections 6.4 et 6.6 ; distinct du théorème spectral général par mesure', pdfPages: [] }],
    theoremIds: ['spectral-compact', 'formes-fermees'], atlasId: 'spectral-generalise',
    sections: [
      { title: 'Hypothèses du problème', body: t`Soient $A=A^{\mathsf T}$ et $B=B^{\mathsf T}>0$ deux matrices réelles $d\times d$. On cherche $u\ne0$ et $\lambda$ tels que $Au=\lambda Bu$. La positivité définie permet de considérer $\langle u,v\rangle_B=u^{\mathsf T}Bv$ comme un produit scalaire. C’est un problème matriciel généralisé, distinct du théorème spectral général pour un auto-adjoint non borné.` },
      { title: 'Retrouver une matrice symétrique', body: t`Poser $C=B^{-1/2}AB^{-1/2}$ et $v=B^{1/2}u$. Alors $C=C^{\mathsf T}$ et $Au=\lambda Bu$ équivaut à $Cv=\lambda v$. Les valeurs propres généralisées sont donc réelles, et on peut choisir une base de vecteurs propres $B$-orthonormée. La matrice $B^{-1}A$ est auto-adjointe pour le produit scalaire $B$, même si elle n’est pas symétrique pour le produit scalaire usuel.` },
      { title: 'Le quotient de Rayleigh change de dénominateur', body: t`Pour $u\ne0$, $\mathcal R(u)=u^{\mathsf T}Au/(u^{\mathsf T}Bu)$. Avec $v=B^{1/2}u$, ce quotient devient $v^{\mathsf T}Cv/\|v\|^2$. Son minimum et son maximum sont les valeurs propres extrêmes de $C$. La sphère unité dans la géométrie de $B$ est une ellipse ou un ellipsoïde dans les coordonnées usuelles.` },
    ],
    example: { title: 'Faire varier la géométrie', body: t`Pour $A=\operatorname{diag}(1,4)$ et $B=\operatorname{diag}(b,1)$ avec $b>0$, les valeurs propres sont $1/b$ et $4$. Les vecteurs $q_1=(1/\sqrt b,0)$, $q_2=(0,1)$ sont $B$-orthonormés. À $b=1/4$, les valeurs propres coïncident mais il existe toujours une base $B$-orthonormée.` },
    proof: { title: 'Réduction complète par la racine positive de B', scope: 'complete-example', scopeNote: 'Preuve du théorème matriciel généralisé, à partir du théorème spectral réel symétrique en dimension finie.', steps: [
      t`Le théorème spectral appliqué à $B>0$ construit $B^{1/2}$ symétrique inversible et $B^{-1/2}$. Poser $C=B^{-1/2}AB^{-1/2}$. Sa transposée est elle-même.`,
      t`Choisir une base orthonormée de vecteurs propres $v_j$ de $C$, de valeurs propres réelles $\lambda_j$. Poser $u_j=B^{-1/2}v_j$.`,
      t`L’égalité $Cv_j=\lambda_jv_j$, multipliée à gauche par $B^{1/2}$, donne $Au_j=\lambda_jBu_j$. Les $u_j$ forment une base, car $B^{-1/2}$ est inversible.`,
      t`On calcule $u_i^{\mathsf T}Bu_j=v_i^{\mathsf T}v_j=\delta_{ij}$. La base est donc $B$-orthonormée.`,
      t`Pour $v=\sum c_jv_j$, le quotient de Rayleigh vaut $\sum\lambda_jc_j^2/\sum c_j^2$, une moyenne pondérée des valeurs propres. Il est compris entre leurs minimum et maximum, atteints dans les directions propres extrêmes.`,
    ] },
    pitfalls: [t`$B^{-1}A$ n’est pas forcément symétrique dans les coordonnées usuelles ; utiliser $B^{-1/2}AB^{-1/2}$.`, t`Si $B$ est singulière ou indéfinie, cette démonstration ne s’applique plus.`, t`Le passage à des opérateurs non bornés demanderait des hypothèses supplémentaires sur les domaines et sur $B^{-1/2}$.`],
    questions: [
      { id: 'changement', prompt: 'Quel changement de variable redonne un problème symétrique ordinaire ?', options: [{ text: t`$v=B^{1/2}u$`, feedback: 'Oui : la matrice obtenue est B^(−1/2) A B^(−1/2).' }, { text: t`$v=Bu$`, feedback: 'Ce choix ne donne pas en général la matrice symétrique annoncée.' }], correctIndex: 0 },
      { id: 'double', prompt: t`Pour $b=1/4$, quelles sont les valeurs propres de l’exemple ?`, options: [{ text: '1/4 et 4', feedback: 'La première valeur est 1/b, pas b.' }, { text: '4 et 4', feedback: 'Oui : le problème est alors A=4B, et tout vecteur non nul est propre pour λ=4.' }], correctIndex: 1 },
    ],
  },
];
