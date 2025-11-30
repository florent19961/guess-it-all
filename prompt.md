# PROMPT COMPLET : Développement du jeu web "Guess It All"

## 1. CONTEXTE ET OBJECTIF DU PROJET

### Présentation générale
Tu dois créer un site web de jeu appelé **"Guess It All"**, un jeu de devinettes multijoueurs local (un seul appareil partagé) inspiré des jeux comme "Time's Up" ou "Celebrity". Le jeu oppose 2 à 4 équipes de 2 à 10 joueurs chacune à travers 3 manches avec des modes de jeu différents.

### Public cible
- Groupes d'amis ou familles réunis physiquement
- Joueurs occasionnels cherchant un jeu convivial
- Tous âges (à partir de 10 ans)

### Objectif du site
Fournir une expérience de jeu fluide, intuitive et complète sans nécessiter d'installation, jouable directement dans un navigateur web sur n'importe quel appareil (ordinateur, tablette, smartphone).

---

## 2. PARAMÈTRES DU JEU

### Paramètres principaux (écran de configuration)
| Paramètre | Plage de valeurs | Valeur par défaut | Type de contrôle |
|-----------|------------------|-------------------|------------------|
| Nombre d'équipes | 2 à 4 | 2 | Boutons +/- |
| Nombre de joueurs | 4 à 20 | 6 | Boutons +/- |
| Choix des mots | Aléatoire / Personnalisé | Personnalisé | Toggle (2 encadrés) |
| Constitution des équipes | Aléatoire / Personnalisé | Aléatoire | Toggle (2 encadrés) |

**Contrainte importante** : Le nombre de joueurs doit permettre au minimum 2 joueurs par équipe.

### Paramètres secondaires (pop-up "Options avancées")
| Paramètre | Plage de valeurs | Valeur par défaut | Type de contrôle |
|-----------|------------------|-------------------|------------------|
| Nombre de mots par joueur | 4 à 10 | 7 | Curseur avec valeur affichée |
| Durée d'un tour | 20 à 60 secondes | 30 | Curseur avec valeur affichée |
| Autorisation de passer | Oui / Non | Oui | Toggle (2 encadrés) |

### Paramètres fixes (non modifiables)
- **Nombre de manches** : 3 (toujours)
- **Modes par manche** :
  - Manche 1 : Description verbale
  - Manche 2 : Un seul mot
  - Manche 3 : Mime

---

## 3. RÈGLES DU JEU DÉTAILLÉES

### Phase 1 : Préparation
1. **Configuration** : Les joueurs paramètrent la partie
2. **Saisie des noms** : Chaque joueur entre son nom (doublons interdits)
3. **Choix des mots** : Chaque joueur saisit ses mots (nombre défini par les paramètres)
4. **Constitution des équipes** : Répartition des joueurs en équipes équilibrées

### Phase 2 : Déroulement d'une manche

**⚠️ LOGIQUE DE ROTATION DES JOUEURS - CRITIQUE**

**Étape 1 : Génération de l'ordre au début de la partie**
Au moment de démarrer la partie (après constitution des équipes), le système doit générer DEUX ordres aléatoires distincts :

1. **Ordre aléatoire pour chaque équipe** :
   - Pour chaque équipe, mélanger aléatoirement la liste de ses joueurs
   - Cet ordre sera répété en boucle tout au long de la partie
   
2. **Ordre aléatoire des équipes** :
   - Mélanger aléatoirement la liste des équipes
   - Cet ordre sera répété en boucle tout au long de la partie

**Exemple concret de génération** :
```
Constitution initiale :
- Équipe A : Joueur 1, Joueur 2, Joueur 3
- Équipe B : Joueur 4, Joueur 5

Après génération aléatoire :
- Ordre Équipe A : [Joueur 3, Joueur 2, Joueur 1] (puis répète)
- Ordre Équipe B : [Joueur 5, Joueur 4] (puis répète)
- Ordre des équipes : [Équipe B, Équipe A] (puis répète)
```

**Étape 2 : Application de la rotation - Algorithme**

Le système alterne entre les équipes selon l'ordre aléatoire généré, et au sein de chaque équipe fait tourner les joueurs selon leur ordre prédéfini.

**Séquence complète des tours (basée sur l'exemple ci-dessus)** :
```
Tour 1  : Joueur 5 (Équipe B) - 1er joueur de Équipe B
Tour 2  : Joueur 3 (Équipe A) - 1er joueur de Équipe A
Tour 3  : Joueur 4 (Équipe B) - 2e joueur de Équipe B
Tour 4  : Joueur 2 (Équipe A) - 2e joueur de Équipe A
Tour 5  : Joueur 5 (Équipe B) - 3e joueur (reboucle au 1er)
Tour 6  : Joueur 1 (Équipe A) - 3e joueur de Équipe A
Tour 7  : Joueur 4 (Équipe B) - 4e joueur (reboucle au 2e)
Tour 8  : Joueur 3 (Équipe A) - 4e joueur (reboucle au 1er)
Tour 9  : Joueur 5 (Équipe B) - 5e joueur (reboucle au 1er)
Tour 10 : Joueur 2 (Équipe A) - 5e joueur (reboucle au 2e)
... et ainsi de suite
```

**Algorithme de calcul du prochain joueur** :
```javascript
// Pseudo-code
function getNextPlayer(turnNumber, teamOrder, teamPlayerOrders) {
  // 1. Déterminer quelle équipe joue
  const teamIndex = turnNumber % teamOrder.length;
  const currentTeam = teamOrder[teamIndex];
  
  // 2. Calculer combien de fois cette équipe a déjà joué
  const teamTurnCount = Math.floor(turnNumber / teamOrder.length);
  
  // 3. Déterminer quel joueur de cette équipe
  const playerOrder = teamPlayerOrders[currentTeam.id];
  const playerIndex = teamTurnCount % playerOrder.length;
  const currentPlayer = playerOrder[playerIndex];
  
  return { team: currentTeam, player: currentPlayer };
}
```

**Étape 3 : Persistance entre les manches - CRITIQUE**

**⚠️ RÈGLE ABSOLUE** : L'ordre de rotation généré au début de la partie reste **IDENTIQUE sur les 3 manches**.

- Entre les manches, le cycle **NE se réinitialise PAS**
- On continue simplement la séquence là où elle s'était arrêtée
- Le numéro de tour global continue d'incrémenter

**Exemple** :
```
Manche 1 se termine au Tour 8 (Joueur 3 de l'Équipe A)
→ Manche 2 commence au Tour 9 (Joueur 5 de l'Équipe B)
→ Si Manche 2 se termine au Tour 15 (Joueur 3 de l'Équipe A)
→ Manche 3 commence au Tour 16 (Joueur 2 de l'Équipe A)
```

**Étape 4 : Stockage dans le state**

```javascript
// Structure du game state
game: {
  // Généré une seule fois au début
  teamOrder: ["team-2-id", "team-1-id"], // Ordre aléatoire des équipes
  teamPlayerOrders: {
    "team-1-id": ["player-3-id", "player-2-id", "player-1-id"],
    "team-2-id": ["player-5-id", "player-4-id"]
  },
  
  // Incrémenté à chaque tour
  globalTurnNumber: 8, // Continue entre les manches
  
  // Calculés à partir de globalTurnNumber
  currentTeamId: "team-1-id",
  currentPlayerId: "player-3-id"
}
```

---

**Ancienne logique (À SUPPRIMER)** :
- ~~Joueur 1 équipe 1 → Joueur 1 équipe 2 → Joueur 2 équipe 1 → Joueur 2 équipe 2~~
- Cette logique séquentielle simple **N'EST PLUS VALIDE**

---

À chaque tour :
1. Un **compte à rebours de 3, 2, 1** annonce le joueur et son équipe
2. Le joueur voit un mot à faire deviner à son équipe
3. Il fait deviner selon le mode de la manche (description/mot/mime)
4. Quand son équipe trouve, il clique sur **"Mot deviné"** → nouveau mot
5. Le tour se termine quand :
   - Le temps est écoulé (passage au joueur suivant)
   - Tous les mots ont été devinés (passage à la manche suivante)

### Phase 3 : Vérification
- Après chaque tour, un écran affiche les mots validés
- Les autres joueurs peuvent invalider un mot en cas d'erreur (mot remis dans le pot)
- Validation collective avant de passer au tour suivant

### Mécanisme "Passer" (si activé)
- Le joueur peut **mettre un mot en réserve** s'il bloque dessus
- Il voit alors un nouveau mot ET peut jongler entre les 2 mots
- Il ne peut avoir qu'un seul mot en réserve à la fois
- Si le mot en réserve n'est pas deviné, il est remis dans le pot à la fin du tour

### Système de points
- **1 point par mot deviné**
- Les points sont cumulés à travers les 3 manches
- L'équipe avec le plus de points gagne (ex-aequo possible)

### Particularité fin de manche anticipée
Si une équipe devine tous les mots restants avant la fin du temps :
- Le temps restant est **conservé en cache**
- Si les mots sont validés à l'écran de vérification → l'équipe commence la manche suivante avec ce temps bonus
- Si des mots sont invalidés → les mots retournent dans le pot et c'est l'équipe suivante qui joue (temps bonus perdu)

---

## 4. ARBORESCENCE ET FLUX DES ÉCRANS

### Écran 1 : Accueil
**Éléments visuels** :
- Titre du jeu "Guess It All" (grand, centré, stylisé)
- 2 boutons principaux :
  - **JOUER** (bouton principal, mis en avant)
  - **RÈGLES** (bouton secondaire)

**Transitions** :
- JOUER → Écran 2 (Paramètres)
- RÈGLES → Écran 2bis (Règles)

---

### Écran 2 : Paramètres de la partie
**Éléments visuels** :
- Titre : "Configuration de la partie"
- 4 paramètres principaux affichés verticalement :

**1. Nombre d'équipes**
```
Nombre d'équipes
[−]    2    [+]
```
- Boutons − et + pour incrémenter/décrémenter
- Limite : 2 à 4
- Par défaut : 2

**2. Nombre de joueurs**
```
Nombre de joueurs
[−]    6    [+]
```
- Boutons − et + pour incrémenter/décrémenter
- Limite : 4 à 20
- **Validation dynamique** : minimum 2 joueurs par équipe
- Message d'erreur si contrainte non respectée : "Minimum 2 joueurs par équipe requis"
- Par défaut : 6

**3. Choix des mots**
```
[ Aléatoire ]  [ Personnalisé ]
```
- 2 encadrés cliquables (toggle)
- L'option sélectionnée est en surbrillance
- Par défaut : Personnalisé

**4. Constitution des équipes**
```
[ Aléatoire ]  [ Personnalisé ]
```
- 2 encadrés cliquables (toggle)
- L'option sélectionnée est en surbrillance
- Par défaut : Aléatoire

**Éléments supplémentaires** :
- **Icône ⚙️ "Options avancées"** (en haut à gauche, discret) → ouvre pop-up
- **Bouton "Réinitialiser les paramètres"** (en bas, style secondaire/danger) :
  - **COMPORTEMENT CRITIQUE** : Au clic, affiche un pop-up de confirmation détaillée
  - Pop-up contient :
    - Titre : "⚠️ Réinitialisation complète"
    - Message : "Cette action supprimera TOUTES les données suivantes :"
    - **Liste détaillée** :
      - ❌ Tous les joueurs et leurs noms
      - ❌ Tous les mots saisis par les joueurs
      - ❌ Les équipes constituées et leurs noms personnalisés
      - ❌ Tous les scores et l'historique de la partie
      - ❌ Tous les paramètres personnalisés
    - Avertissement : "Cette action est irréversible."
    - Deux boutons : 
      - "Annuler" (secondaire, ferme le pop-up)
      - "Réinitialiser" (danger, couleur rouge vif)
  - **Si confirmation** :
    - Appelle `clearLocalStorage()` pour une réinitialisation TOTALE
    - Réinitialise TOUS les paramètres à leurs valeurs par défaut
    - Supprime complètement le game state :
      - Liste des joueurs → []
      - Tous les mots → []
      - Équipes → []
      - Scores → 0
      - État du jeu → état initial
      - `globalTurnNumber` → 0
      - `teamOrder` et `teamPlayerOrders` → null
      - `bonusTime` et `bonusPlayerTurnNumber` → null
    - Vide complètement le `localStorage` (clé 'guessItAll_gameState')
    - Retourne à l'état vierge comme au premier lancement
    - **Reste sur l'écran des paramètres** (avec valeurs par défaut affichées)
  - **Si annulation** :
    - Ferme simplement le pop-up
    - Aucune modification n'est effectuée
- **Bouton "Suivant"** (principal, en bas à droite) → Écran 3

**Flèche retour** : Non (premier écran après accueil)

---

### Écran 2bis (Pop-up) : Options avancées
**Apparence** :
- Pop-up modal (fond semi-transparent)
- Titre : "Options avancées"
- Croix de fermeture en haut à droite

**Éléments** :

**1. Constitution des équipes** (répété ici pour cohérence)
```
[ Aléatoire ]  [ Personnalisé ]
```

**2. Nombre de mots par joueur**
```
Nombre de mots par joueur
|----●--------------| 
      7
```
- Curseur interactif (range slider)
- Valeur affichée sous le curseur, suit le mouvement
- Plage : 4 à 10
- Par défaut : 7

**3. Durée d'un tour**
```
Durée d'un tour (secondes)
|----------●--------| 
         30
```
- Curseur interactif (range slider)
- Valeur affichée sous le curseur avec "s" ou "secondes"
- Plage : 20 à 60
- Par défaut : 30

**4. Autorisation de passer**
```
Autorisation de passer
[  Oui  ]  [  Non  ]
```
- 2 encadrés cliquables (toggle)
- Par défaut : Oui

**Boutons** :
- **"Enregistrer"** (bouton principal) → sauvegarde et ferme le pop-up
- **Croix ou clic extérieur** → ferme SANS sauvegarder (retour aux valeurs précédentes)

---

### Écran 2ter : Règles du jeu
**Contenu** :
- Titre : "Comment jouer ?"
- Explication claire et concise des règles :
  - Principe du jeu
  - Déroulement des 3 manches
  - Modes de jeu par manche
  - Système de points
  - Mécanisme "Passer"
- **Bouton "Retour"** → Écran 1 (Accueil)

---

### Écran 3 : Saisie des noms des joueurs
**Titre** : "Qui joue ?"

**⚠️ VIGILANCE CRITIQUE : Réactivité dynamique**
- Le nombre d'encadrés affichés doit **varier en temps réel** selon le paramètre "Nombre de joueurs"
- Si l'utilisateur retourne à l'écran des paramètres et change le nombre de joueurs (ex: 6 → 8), alors 2 nouveaux encadrés doivent apparaître
- Si l'utilisateur réduit le nombre de joueurs (ex: 8 → 6), les 2 derniers encadrés disparaissent (et leurs données sont supprimées)
- Le dénominateur "[X/Y]" doit se mettre à jour dynamiquement si le paramètre "Nombre de mots par joueur" change
  - Exemple : Si un joueur a rempli 5/7 mots et qu'on passe à 10 mots par joueur, alors l'encadré affiche 5/10 et redevient rouge

**Éléments visuels** :
- Liste de N encadrés (N = nombre de joueurs défini)
- Chaque ligne contient :

```
[Nom du joueur]  [0/7] ✕
```

**Détails par ligne** :
1. **Champ de saisie du nom** :
   - Placeholder en surbrillance légère : "Joueur 1", "Joueur 2", etc.
   - Validation en temps réel : doublons interdits
   - Si doublon ou vide : message "Nom requis" en rouge près du nom
   - **Croix ✕** en surbrillance au survol → efface le nom

2. **Indicateur de mots remplis** :
   - Format : `[X/Y]` où :
     - X = nombre de mots remplis par ce joueur
     - Y = nombre de mots par joueur (paramètre)
   - **Couleur** :
     - ❌ Rouge si X < Y (incomplet) → incitation visuelle
     - ✅ Vert si X = Y (complet)
   - **Action au clic** : redirige vers Écran 3bis (Choix des mots)

**Comportement selon paramètre "Choix des mots"** :
- **Personnalisé** : Par défaut `0/Y` (rien n'est rempli)
- **Aléatoire** : Par défaut `Y/Y` (tout est pré-rempli, mais modifiable)

**Boutons et navigation** :
- **Flèche retour** (haut à gauche) → Écran 2 (Paramètres)
  - Conserve les noms en cache
- **Bouton "Constitution des équipes"** (principal, en bas à droite)
  - **Grisé** tant que :
    - Tous les noms ne sont pas remplis (et différents)
    - OU tous les encadrés de mots ne sont pas verts
  - **Actif** → Écran 4

**Fonctionnalités importantes** :
- Conservation en cache des noms si changement d'écran ou actualisation
- Validation en temps réel des doublons

---

### Écran 3bis : Choix des mots (par joueur)
**Titre** : "Mots de [Nom du joueur] - [X/Y]"
- Exemple : "Mots de Florent - 0/7"

**Éléments visuels** :
- Liste de Y encadrés (Y = nombre de mots par joueur)
- Chaque ligne contient :

```
[Mot à remplir]  🎲 ✕
```

**Détails par ligne** :
1. **Champ de saisie du mot** :
   - Placeholder : "Mot 1", "Mot 2", etc.
   - Validation en temps réel : doublons interdits
   - Si doublon : message "Doublon" en rouge près du mot
   - **Croix ✕** au survol → efface le mot

2. **Icône dé 🎲** :
   - Au clic : génère aléatoirement un mot depuis la base de données
   - Remplace le mot actuel (s'il y en a un)

**Comportement selon paramètre "Choix des mots"** :
- **Personnalisé** : Champs vides par défaut
- **Aléatoire** : Tous les mots pré-remplis (mais modifiables)

**Boutons et fonctionnalités** :
- **Icône poubelle** (en haut à droite) → efface tous les mots
- **Bouton "Grosse flemme"** (secondaire) :
  - Remplit automatiquement tous les champs vides OU en doublon
  - Génère des mots aléatoires depuis la base de données
- **Flèche retour** (haut à gauche) → Écran 3 (sauvegarde automatique)
- **Bouton "Enregistrer les mots"** (principal, bas à droite) → Écran 3 (sauvegarde)

**Fonctionnalités importantes** :
- Conservation en cache si changement d'écran ou actualisation
- Génération aléatoire intelligente (pas de doublons dans le pool général)

---

### Écran 4 : Constitution des équipes
**Titre** : "Formation des équipes"

**Layout** :
```
[Liste des joueurs]  [Équipe 1]  [Équipe 2]  [Équipe 3]  [Équipe 4]
```

**Section "Liste des joueurs"** :
- Encadré avec titre "Liste des joueurs"
- Liste scrollable des noms de joueurs disponibles (non assignés)
- **Icône dé 🔄** à côté du titre → répartition aléatoire et équitable

**Sections "Équipes"** :
- Autant d'encadrés que d'équipes (2 à 4 selon paramètres)
- Chaque encadré contient :
  - **Titre modifiable** : "Équipe 1" avec icône crayon ✏️ (éditable au clic)
  - Liste des joueurs assignés à cette équipe
  - Chaque joueur a une **croix ✕** → le renvoie dans "Liste des joueurs"

**Fonctionnalités d'assignation** :
1. **Drag & Drop** : Glisser un joueur depuis la liste vers une équipe
2. **Clic sur ✕** : Renvoyer un joueur dans la liste
3. **Bouton dé 🔄** : Répartition aléatoire équitable (vide toutes les équipes puis redistribue)

**Comportement selon paramètre "Constitution des équipes"** :
- **Aléatoire** : Joueurs déjà répartis équitablement (mais modifiable)
- **Personnalisé** : Tous les joueurs dans la liste (aucune assignation)

**Validation** :
- **Bouton "Démarrer la partie"** (principal, bas à droite)
  - **Grisé** tant que :
    - Il reste des joueurs non assignés
    - OU une équipe a moins de 2 joueurs
  - **Actif** → Écran 5

**Boutons et navigation** :
- **Flèche retour** (haut à gauche) → Écran 3 (conservation en cache)

**Fonctionnalités importantes** :
- Conservation en cache des équipes et noms d'équipes
- Validation en temps réel des contraintes (min 2 joueurs/équipe)

---

### Écran 5 : Écran de partie (entre les tours)
**Titre dynamique** : "Manche [X] : Tour [Y]"
- Exemples : "Manche 1 : Tour 1", "Manche 2 : Tour 15", etc.

**Éléments visuels** :
- **Tableau des équipes** :
  - Autant d'encadrés que d'équipes
  - Chaque encadré affiche :
    - Nom de l'équipe (personnalisé ou par défaut)
    - Liste des joueurs de l'équipe
    - **Score actuel** de l'équipe (en grand, mis en avant)

**Indicateur visuel du joueur actuel** :
- Le nom du prochain joueur à faire deviner est **mis en surbrillance** dans son équipe
- Couleur ou encadré distinct pour bien identifier le joueur

**Bouton principal** :
- **"Démarrer le tour"** (grand, centré) → Écran 6 (Cinématique)

**Informations supplémentaires** (optionnel) :
- Rappel du mode de la manche ("Description verbale", "Un seul mot", "Mime")
- Nombre de mots restants à deviner

**Navigation** :
- Pas de retour en arrière possible (intégrité de la partie)

---

### Écran 6 : Cinématique de démarrage du tour
**Affichage** :
- Pop-up ou écran plein avec animation
- **Compte à rebours** : 3, 2, 1 (grand, centré, animé)
- Texte accompagnant :
  - **"À ton tour [Nom du joueur] !"**
  - **"Équipe : [Nom de l'équipe]"**
- Rappel du mode : "(Description verbale)" / "(Un seul mot)" / "(Mime)"

**Durée** :
- 3-4 secondes au total (1 seconde par chiffre + transition)

**Transition** :
- Automatique vers Écran 7 (Tour de jeu)

---

### Écran 7 : Tour de jeu (écran principal du gameplay)
**Layout hiérarchisé** :

**⚠️ INTERFACE SIMPLIFIÉE** : L'interface a été allégée pour une meilleure lisibilité. Pas d'encadré d'informations en haut.

**Chronomètre (élément principal)** :
```
┌─────────────────┐
│                 │
│      24s        │
│                 │
└─────────────────┘
```
- Grand encadré arrondi, fond plus foncé
- Chiffres énormes (taille 96px, classe text-8xl), couleur cyan (#7dd3c0)
- Change de couleur si < 10 secondes (rouge clignotant)
- Centré en haut de l'écran

**Zone centrale (mots à deviner)** - INTERFACE PRINCIPALE :
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                 MOT À FAIRE DEVINER                 │
│                                                     │
│    [←]              Scanner              [✓]       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Détails de l'interface du mot** :
- **Encadré du mot principal** : 
  - Grand encadré arrondi (border-radius: 24px)
  - Bordure rose/rouge épaisse (3-4px)
  - Fond semi-transparent foncé
  - Texte "MOT À FAIRE DEVINER" en petit au-dessus (Poppins, gris clair)
  - Mot en TRÈS GROS (taille 48-64px), police Bangers, blanc avec ombre rouge
  
- **Bouton gauche [←]** : "Passer au mot suivant"
  - Bouton rond ou carré arrondi, couleur turquoise (#7dd3c0)
  - Icône flèche gauche ou symbole d'échange (⇄)
  - Position : À GAUCHE du mot "Scanner"
  - Taille : Assez grand (60-80px de hauteur)
  - Action : Échange avec le mot en réserve
  
- **Bouton droit [✓]** : "Mot deviné"
  - Bouton rond ou carré arrondi, couleur rose saumon (#f19b9b)
  - Icône check/validation (✓)
  - Position : À DROITE du mot "Scanner"
  - Taille : Assez grand (60-80px de hauteur)
  - Action : Valide le mot et passe au suivant

**Zone du mot suivant (réserve)** :
```
┌─────────────────────────────────────────────────────┐
│                  MOT SUIVANT                        │
│                                                     │
│                    Blague                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```
- Encadré plus petit, en dessous du mot principal
- Bordure cyan/turquoise
- Texte "MOT SUIVANT" en petit (Poppins)
- Mot en taille moyenne (32-40px), police Poppins, couleur cyan
- Ce mot deviendra le mot principal si on clique sur [←]

**Indicateur en bas de l'écran** :
```
Mots restants : 42
```
- ⚠️ **IMPORTANT** : Remplace l'ancien indicateur "Mode : Mime"
- Texte centré, couleur gris clair (text-gray-400)
- Police Poppins, taille 16px
- Affiche `remainingWords.length` en temps réel
- Positionné en bas de l'écran

**Bouton "Fin du tour"** :
- Petit bouton discret (icône ⏹️ ou "X")
- Position : Coin supérieur droit ou inférieur
- Couleur : Gris ou rouge sombre
- Taille réduite pour ne pas être cliqué par erreur
- Action : Demande confirmation "Êtes-vous sûr de vouloir terminer le tour ?"

**Comportement des boutons** :

1. **Bouton gauche [←] "Passer"** (si option activée) :
   - Échange le mot principal ("Scanner") et le mot suivant ("Blague")
   - Animation de transition (slide ou flip)
   - Permet de "jongler" entre 2 mots tant qu'aucun n'est deviné
   - Si aucun mot en réserve : tire un nouveau mot et met l'actuel en réserve

2. **Bouton gauche [←] "Passer"** (si option désactivée) :
   - Bouton grisé et désactivé
   - Le joueur est "bloqué" sur le mot jusqu'à ce qu'il soit deviné ou temps écoulé

3. **Bouton droit [✓] "Mot deviné"** :
   - Incrémente le score du tour (+1)
   - Le mot en réserve ("Blague") devient le mot principal
   - Un nouveau mot est tiré aléatoirement (devient le nouveau mot en réserve)
   - Animation rapide et satisfaisante (scale + fade)

4. **"Fin du tour"** :
   - Permet d'arrêter manuellement le tour (rarement utilisé)
   - Demande confirmation : "Êtes-vous sûr ?"

**Fin du tour (2 cas)** :

**Cas 1 : Temps écoulé**
- Son/vibration pour signaler
- Transition automatique vers Écran 8 (Vérification)

**Cas 2 : Plus de mots restants**
- Message : "Tous les mots ont été devinés !"
- **Conservation du temps restant en cache** (bonus pour manche suivante si validation)
- Transition vers Écran 8 (Vérification)

---

### Écran 8 : Vérification des mots
**Titre** : "Vérification - Tour de [Nom du joueur]"

**Contexte** :
- Affiche l'équipe et le joueur concernés
- Nombre de mots validés pendant le tour

**⚠️ SYSTÈME DE VALIDATION RÉVERSIBLE (Toggle)**

**Problème résolu** : Ancienne version ne permettait pas de re-valider un mot une fois invalidé.

**Nouvelle approche** : Système toggle complet permettant de basculer l'état autant de fois que nécessaire.

**Interface de la liste des mots** :
```
┌────────────────────────────────────────────────────┐
│ ✓ Tigre        [Cliquer pour invalider]            │
│   (bordure verte, ✓ vert, fond sombre)             │
├────────────────────────────────────────────────────┤
│ ✗ Armoire      [Cliquer pour valider]              │
│   (bordure rouge, ✗ rouge, fond rouge foncé)       │
├────────────────────────────────────────────────────┤
│ ✓ Quotidien    [Cliquer pour invalider]            │
│   (bordure verte, ✓ vert, fond sombre)             │
└────────────────────────────────────────────────────┘

Mots validés : 2 / 3
```

**Comportement interactif** :

1. **État initial** : Tous les mots sont validés (✓ vert)

2. **Clic sur un mot validé** :
   - L'encadré entier devient rouge
   - ✓ devient ✗
   - Texte d'aide : "Cliquer pour valider"
   - Le mot est marqué comme invalidé
   - Compteur se met à jour

3. **Clic sur un mot invalidé** :
   - L'encadré redevient vert
   - ✗ devient ✓
   - Texte d'aide : "Cliquer pour invalider"
   - Le mot est re-validé
   - Compteur se met à jour

**Styles des états** :

**Mot validé** :
- Bordure : `border-green-500` (vert)
- Icône : ✓ verte
- Fond : `bg-slate-800/50` (sombre)
- Curseur : `cursor-pointer`

**Mot invalidé** :
- Bordure : `border-red-500` (rouge)
- Icône : ✗ rouge
- Fond : `bg-red-900/20` (rouge foncé)
- Curseur : `cursor-pointer`

**Compteur dynamique** :
```javascript
const validatedCount = wordsGuessed.filter(w => !invalidatedWords.includes(w)).length;

// Affichage
Mots validés : {validatedCount} / {wordsGuessed.length}
```

**Texte d'aide** :
- Position : Côté droit de chaque encadré
- Taille : Petite (text-sm)
- Couleur : Gris clair (text-gray-400)
- Contenu dynamique selon l'état

**Gestion de l'état** :
```javascript
const [invalidatedWords, setInvalidatedWords] = useState([]);

const toggleWordValidity = (word) => {
  setInvalidatedWords(prev =>
    prev.includes(word)
      ? prev.filter(w => w !== word) // Re-valider
      : [...prev, word] // Invalider
  );
};
```

**Bouton principal** :
- **"Valider les mots"** → retour à Écran 5
  - Met à jour le score de l'équipe (seulement les mots validés)
  - Les mots invalidés sont remis dans le pool (`remainingWords`)
  - Passe au tour/manche suivant

**Message si aucun mot validé** :
- "Aucun mot validé ce tour" en rouge
- Le bouton "Valider" reste actif (permet de continuer même si score = 0)

**Navigation** :
- Pas de retour en arrière (pour éviter les tricheries)

---

### Écran 9 : Transition entre manches
**Déclenchement** :
- Quand tous les mots ont été devinés dans une manche

**Affichage** :
- Pop-up ou écran plein avec animation
- **Texte principal** : "Fin de la Manche [X]"
- **Sous-texte** : "Passage à la Manche [Y]"
- Rappel du nouveau mode : "Prochain mode : Un seul mot" / "Mime"

**Récapitulatif des scores** :
```
┌─────────────────────────────────────────┐
│  Scores après Manche 1                  │
│                                         │
│  🥇 Les Tigres : 18 points              │
│  🥈 Les Lions : 15 points               │
│  🥉 Les Pandas : 12 points              │
│                                         │
└─────────────────────────────────────────┘
```

**Bouton** :
- **"Commencer la Manche [Y]"** → retour à Écran 5

**Durée** :
- Reste affiché jusqu'à action du joueur (pas d'automatisme)

---

### Écran 10 : Résultats finaux
**Déclenchement** :
- Après la vérification du dernier tour de la Manche 3

**Affichage principal** :
- **Titre** : "Partie terminée !"
- **Podium animé** :

```
        🥇
   Les Tigres
    45 points

🥈              🥉
Les Lions    Les Pandas
42 points    38 points
```

**Récapitulatif manche par manche** :
```
┌───────────────────────────────────────────────────┐
│  Évolution des scores                             │
│                                                   │
│           Manche 1  Manche 2  Manche 3   Total   │
│  Tigres      18        15        12       45     │
│  Lions       15        14        13       42     │
│  Pandas      12        13        13       38     │
│                                                   │
└───────────────────────────────────────────────────┘
```

**Bouton "Score avancé"** (optionnel) :
- Au clic : affiche un **graphique linéaire**
- Évolution des scores tour par tour pour chaque équipe
- Axe X : numéro du tour
- Axe Y : score cumulé
- Une courbe par équipe (code couleur)

**Boutons d'action** :
- **"Rejouer"** → Écran 3 (Saisie des noms)
  - Conserve les joueurs et paramètres
  - Permet de modifier les mots
  - Réinitialise les scores
- **"Nouvelle partie"** → Écran 2 (Paramètres)
  - Réinitialise tout
- **"Retour à l'accueil"** → Écran 1

---

## 5. SPÉCIFICATIONS TECHNIQUES

### Stack technologique recommandée

**Frontend** :
- **Framework** : React 18+ (avec Hooks)
- **Bundler** : Vite ou Create React App
- **Styling** : Tailwind CSS (pour la rapidité et la cohérence)
- **Icons** : Lucide React ou Font Awesome
- **Animations** : Framer Motion (optionnel mais recommandé)

**Gestion d'état** :
- **React Context API** ou **Zustand** (pour simplicité)
- Pas besoin de Redux (application locale, pas de backend)

**Persistance des données** :
- **LocalStorage** pour :
  - Sauvegarder l'état de la partie en cours
  - Conserver les paramètres entre sessions
  - Permettre reprise après fermeture accidentelle

**Aucun backend nécessaire** :
- Application 100% frontend
- Pas d'authentification
- Pas de base de données externe

### Structure de projet recommandée

```
guess-it-all/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── screens/
│   │   │   ├── HomeScreen.jsx
│   │   │   ├── SettingsScreen.jsx
│   │   │   ├── RulesScreen.jsx
│   │   │   ├── PlayersScreen.jsx
│   │   │   ├── WordsScreen.jsx
│   │   │   ├── TeamsScreen.jsx
│   │   │   ├── GameScreen.jsx
│   │   │   ├── CountdownScreen.jsx
│   │   │   ├── TurnScreen.jsx
│   │   │   ├── VerificationScreen.jsx
│   │   │   ├── TransitionScreen.jsx
│   │   │   └── ResultsScreen.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Slider.jsx
│   │   │   ├── Toggle.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Card.jsx
│   │   └── game/
│   │       ├── Timer.jsx
│   │       ├── ScoreBoard.jsx
│   │       ├── TeamCard.jsx
│   │       └── WordDisplay.jsx
│   ├── context/
│   │   └── GameContext.jsx
│   ├── hooks/
│   │   ├── useTimer.js
│   │   ├── useGameLogic.js
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   ├── wordDatabase.js
│   │   ├── gameHelpers.js
│   │   └── validation.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
└── README.md
```

### Base de données de mots

**Format** :
```javascript
// src/utils/wordDatabase.js
export const wordDatabase = [
  "Tigre", "Armoire", "Quotidien", "Figurine", "Pomme",
  "Ordinateur", "Montagne", "Chocolat", "Téléphone", "Piano",
  // ... 500-1000 mots variés
];

// Fonction de génération aléatoire
export const generateRandomWord = (excludeWords = []) => {
  const availableWords = wordDatabase.filter(w => !excludeWords.includes(w));
  return availableWords[Math.floor(Math.random() * availableWords.length)];
};
```

**Catégories recommandées** :
- Objets du quotidien (30%)
- Animaux (15%)
- Métiers (10%)
- Actions/Verbes (10%)
- Adjectifs (10%)
- Concepts abstraits (10%)
- Lieux (10%)
- Célébrités/Personnages (5%)

**Critères de sélection** :
- Mots connus et accessibles (pas trop techniques)
- Équilibre difficulté (facile, moyen, difficile)
- Pas de mots offensants ou inappropriés

---

## 6. ÉTAT DE L'APPLICATION (GameContext)

### Structure de l'état global

```javascript
{
  // Paramètres de la partie
  settings: {
    numberOfTeams: 2,
    numberOfPlayers: 6,
    wordChoice: "personnalisé", // ou "aléatoire"
    teamFormation: "aléatoire", // ou "personnalisé"
    wordsPerPlayer: 7,
    turnDuration: 30,
    allowPass: true
  },
  
  // Joueurs
  players: [
    {
      id: "uuid-1",
      name: "Florent",
      words: ["Tigre", "Armoire", "Quotidien", "Figurine", "Pomme", "Ordinateur", "Montagne"]
    },
    // ... autres joueurs
  ],
  
  // Équipes
  teams: [
    {
      id: "team-1",
      name: "Les Tigres",
      playerIds: ["uuid-1", "uuid-3"],
      score: 0,
      scoreByRound: [0, 0, 0] // Scores par manche
    },
    // ... autres équipes
  ],
  
  // État du jeu
  game: {
    currentScreen: "home", // "home", "settings", "players", etc.
    currentRound: 1, // 1, 2 ou 3
    globalTurnNumber: 0, // Numéro de tour global (continue entre les manches)
    
    // ORDRE DE ROTATION (généré une seule fois au début de la partie)
    teamOrder: ["team-2-id", "team-1-id"], // Ordre aléatoire des équipes (reste fixe)
    teamPlayerOrders: { // Ordre aléatoire des joueurs par équipe (reste fixe)
      "team-1-id": ["player-3-id", "player-2-id", "player-1-id"],
      "team-2-id": ["player-5-id", "player-4-id"]
    },
    
    // JOUEUR ACTUEL (calculé à partir de globalTurnNumber)
    currentTeamId: "team-1-id",
    currentPlayerId: "player-3-id",
    
    // Pool de mots
    allWords: ["Tigre", "Armoire", ...], // Tous les mots au début
    remainingWords: ["Tigre", "Armoire", ...], // Mots non encore devinés cette manche
    
    // Tour en cours
    currentWord: "Tigre",
    reserveWord: "Vache", // null si pas de mot en réserve
    wordsGuessedThisTurn: ["Armoire", "Quotidien"],
    timeRemaining: 27,
    turnBonusTime: null, // Temps bonus si manche terminée avant la fin
    
    // Historique
    history: [
      {
        round: 1,
        turn: 1,
        teamId: "team-1",
        playerId: "uuid-1",
        wordsGuessed: ["Tigre", "Armoire"],
        timeSpent: 30
      },
      // ... autres tours
    ]
  }
}
```

### Actions du Context

```javascript
// Paramètres
updateSettings(newSettings)
resetSettings()

// Joueurs
addPlayer(name)
removePlayer(id)
updatePlayerName(id, newName)
updatePlayerWords(id, words)

// Équipes
createTeams()
updateTeamName(id, newName)
movePlayerToTeam(playerId, teamId)
randomizeTeams()

// Jeu
startGame()
startTurn()
nextWord() // "Mot deviné"
passWord() // "Passer"
endTurn()
validateWords(validatedWords) // Écran de vérification
nextRound()
endGame()

// Navigation
goToScreen(screenName)

// Persistance
saveToLocalStorage()
loadFromLocalStorage()
```

---

## 7. DESIGN ET INTERFACE UTILISATEUR

### Charte graphique

**Thème général** :
- **Fond principal** : Bleu marine foncé (#1e293b ou similaire)
- **Effet d'ambiance** : Étoiles filantes animées sur le fond (effet spatial/nocturne)
  - Petites étoiles blanches qui traversent l'écran aléatoirement
  - Animation CSS subtile et continue
  - Ne doit pas distraire du contenu principal

**Palette de couleurs** :
- **Bouton principal/action** : Rose saumon (#f19b9b, #e88b8b)
- **Bouton secondaire/info** : Turquoise/cyan (#7dd3c0, #6ecbb8)
- **Bordures actives** : Cyan/turquoise (#7dd3c0)
- **Bordures erreur** : Rouge (#e88b8b)
- **Bordures validées** : Vert (#10B981)
- **Boutons désactivés** : Gris foncé (#4a5568)
- **Fond des encadrés** : Fond semi-transparent foncé (rgba(30, 41, 59, 0.6))

**Codes couleurs des équipes** :
- Équipe 1 : Rose saumon (#f19b9b)
- Équipe 2 : Turquoise (#7dd3c0)
- Équipe 3 : Violet (#a78bfa)
- Équipe 4 : Jaune/Orange (#fbbf24)

**Typographie** :
- **Titres principaux et d'écrans** : 
  - Font-family : 'Bangers' (Google Fonts)
  - Couleur : Blanc (#FFFFFF)
  - Effet : Ombre/relief rouge (text-shadow avec décalage rouge)
  - Taille : 48-72px selon l'écran
- **Tous les autres textes** :
  - Font-family : 'Poppins' (Google Fonts)
  - Couleur : Blanc ou gris clair selon contexte
  - Taille : 16-18px (corps), 14px (petits textes)

**Espacement** :
- Marges générales : 16-24px
- Padding des boutons : 12px 24px
- Gap entre éléments : 16px
- Border-radius : 16-24px (arrondis généreux)

**Style des encadrés** :
- **Forme** : Arrondis généreux (border-radius: 16-24px)
- **Bordures** : 2-3px, couleur selon état (cyan actif, rouge erreur, vert validé)
- **Fond** : Semi-transparent foncé (rgba(30, 41, 59, 0.6) ou backdrop-blur)
- **Effet** : Légère ombre portée pour profondeur

**Icônes système** :
- **Flèche retour** : Cercle rose saumon (#f19b9b) en haut à gauche avec flèche blanche
- **Paramètres (⚙️)** : Icône engrenage cyan/turquoise
- **Dé (🎲)** : Pour génération aléatoire de mots
- **Crayon (✏️)** : Pour édition (noms d'équipes)
- **Croix (✕)** : Pour suppression/annulation
- **Poubelle (🗑️)** : Pour vider tous les mots
- **Refresh (🔄)** : Pour réinitialiser/répartir aléatoirement

**Import des fonts (dans le HTML ou CSS)** :
```html
<link href="https://fonts.googleapis.com/css2?family=Bangers&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Composants UI réutilisables

**Bouton standard** :
```jsx
<Button 
  variant="primary" // primary, secondary, danger, ghost
  size="large" // small, medium, large
  disabled={false}
  onClick={handleClick}
>
  Texte du bouton
</Button>
```

**Champ de saisie** :
```jsx
<Input 
  placeholder="Entrez votre nom"
  value={value}
  onChange={handleChange}
  error="Message d'erreur"
  icon={<IconComponent />}
/>
```

**Curseur (Slider)** :
```jsx
<Slider 
  min={4}
  max={10}
  value={7}
  onChange={handleChange}
  label="Nombre de mots par joueur"
  showValue={true}
/>
```

**Toggle (2 options)** :
```jsx
<Toggle 
  options={["Aléatoire", "Personnalisé"]}
  selected="Personnalisé"
  onChange={handleToggle}
/>
```

**Carte d'équipe** :
```jsx
<TeamCard 
  team={teamData}
  isActive={true} // Surbrillance si c'est le tour de cette équipe
  highlightPlayer={playerId} // Met en avant le joueur actuel
/>
```

### Responsive Design

**Breakpoints** :
- **Mobile** : < 640px
- **Tablet** : 640px - 1024px
- **Desktop** : > 1024px

**Adaptations par écran** :
- **Mobile** :
  - Affichage vertical (colonne)
  - Boutons pleine largeur
  - Police légèrement réduite
  - Écrans simplifiés (moins d'infos simultanées)
  
- **Tablet** :
  - Mix vertical/horizontal selon l'écran
  - Optimisation pour écran partagé
  
- **Desktop** :
  - Affichage horizontal (lignes)
  - Utilisation de l'espace latéral
  - Infos supplémentaires visibles

**Mode d'affichage recommandé** :
- Orientation portrait pour mobile
- Orientation paysage pour tablette/desktop (optimal pour jeu en groupe)

### Animations et transitions

**Micro-interactions** :
- Hover sur boutons : légère élévation (box-shadow)
- Clic : effet de pression (scale 0.95)
- Champs de saisie : focus avec bordure colorée

**Transitions d'écrans** :
- Fade in/out (300ms)
- Slide pour navigation (forward/backward)

**Animations spécifiques** :
- **Compte à rebours** : Zoom + rotation des chiffres
- **Mot deviné** : Slide vers le haut + fade out
- **Nouveau mot** : Slide depuis le bas + fade in
- **Chronomètre < 10s** : Pulsation rouge
- **Fin de tour** : Écran qui "vibre" brièvement

---

## 8. LOGIQUE DE JEU (Algorithmes clés)

### Génération aléatoire des mots

```javascript
/**
 * Génère N mots aléatoires uniques pour un joueur
 * @param {number} count - Nombre de mots à générer
 * @param {array} excludeWords - Mots déjà utilisés à exclure
 * @returns {array} - Tableau de mots uniques
 */
function generateRandomWords(count, excludeWords = []) {
  const availableWords = wordDatabase.filter(w => !excludeWords.includes(w));
  const shuffled = availableWords.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
```

### Répartition équitable des équipes

```javascript
/**
 * Répartit les joueurs équitablement dans les équipes
 * @param {array} players - Liste des joueurs
 * @param {number} teamCount - Nombre d'équipes
 * @returns {array} - Tableau d'équipes avec joueurs assignés
 */
function distributePlayersRandomly(players, teamCount) {
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  const teams = Array.from({ length: teamCount }, () => []);
  
  shuffled.forEach((player, index) => {
    const teamIndex = index % teamCount;
    teams[teamIndex].push(player);
  });
  
  return teams;
}
```

### Ordre de jeu

```javascript
/**
 * Génère les ordres de rotation au début de la partie
 * Cette fonction est appelée UNE SEULE FOIS après la constitution des équipes
 */
function generatePlayOrder(teams) {
  // 1. Mélanger l'ordre des équipes
  const teamOrder = [...teams].sort(() => Math.random() - 0.5);
  
  // 2. Pour chaque équipe, mélanger l'ordre de ses joueurs
  const teamPlayerOrders = {};
  teams.forEach(team => {
    const shuffledPlayers = [...team.playerIds].sort(() => Math.random() - 0.5);
    teamPlayerOrders[team.id] = shuffledPlayers;
  });
  
  return { teamOrder, teamPlayerOrders };
}

/**
 * Calcule le joueur qui doit jouer pour un tour donné
 * @param {number} globalTurnNumber - Numéro de tour global (0, 1, 2, ...)
 * @param {array} teamOrder - Ordre des équipes (généré au début)
 * @param {object} teamPlayerOrders - Ordre des joueurs par équipe (généré au début)
 * @returns {object} - { teamId, playerId }
 */
function getCurrentPlayer(globalTurnNumber, teamOrder, teamPlayerOrders) {
  // 1. Déterminer quelle équipe joue (alterne entre les équipes)
  const teamIndex = globalTurnNumber % teamOrder.length;
  const currentTeam = teamOrder[teamIndex];
  
  // 2. Calculer combien de fois cette équipe a déjà joué
  const teamTurnCount = Math.floor(globalTurnNumber / teamOrder.length);
  
  // 3. Déterminer quel joueur de cette équipe (rotation cyclique)
  const playerOrder = teamPlayerOrders[currentTeam.id];
  const playerIndex = teamTurnCount % playerOrder.length;
  const currentPlayer = playerOrder[playerIndex];
  
  return {
    teamId: currentTeam.id,
    playerId: currentPlayer
  };
}

/**
 * Passe au tour suivant
 */
function nextTurn(gameState) {
  const newTurnNumber = gameState.globalTurnNumber + 1;
  const { teamId, playerId } = getCurrentPlayer(
    newTurnNumber,
    gameState.teamOrder,
    gameState.teamPlayerOrders
  );
  
  return {
    ...gameState,
    globalTurnNumber: newTurnNumber,
    currentTeamId: teamId,
    currentPlayerId: playerId
  };
}
```

**Exemple concret** :
```javascript
// Configuration initiale
const teams = [
  { id: "team-A", playerIds: ["p1", "p2", "p3"] },
  { id: "team-B", playerIds: ["p4", "p5"] }
];

// Génération au début de la partie (une seule fois)
const { teamOrder, teamPlayerOrders } = generatePlayOrder(teams);
// Résultat possible :
// teamOrder = [team-B, team-A]
// teamPlayerOrders = {
//   "team-A": ["p3", "p2", "p1"],
//   "team-B": ["p5", "p4"]
// }

// Calcul de la séquence de jeu
getCurrentPlayer(0, teamOrder, teamPlayerOrders); // → team-B, p5 (Tour 1)
getCurrentPlayer(1, teamOrder, teamPlayerOrders); // → team-A, p3 (Tour 2)
getCurrentPlayer(2, teamOrder, teamPlayerOrders); // → team-B, p4 (Tour 3)
getCurrentPlayer(3, teamOrder, teamPlayerOrders); // → team-A, p2 (Tour 4)
getCurrentPlayer(4, teamOrder, teamPlayerOrders); // → team-B, p5 (Tour 5, reboucle)
getCurrentPlayer(5, teamOrder, teamPlayerOrders); // → team-A, p1 (Tour 6)
getCurrentPlayer(6, teamOrder, teamPlayerOrders); // → team-B, p4 (Tour 7)
getCurrentPlayer(7, teamOrder, teamPlayerOrders); // → team-A, p3 (Tour 8, reboucle)
// ... et ainsi de suite
```

### Gestion du pool de mots

```javascript
/**
 * Tire un mot aléatoire parmi les mots restants
 */
function drawRandomWord(remainingWords) {
  if (remainingWords.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * remainingWords.length);
  return remainingWords[randomIndex];
}

/**
 * Marque un mot comme deviné (le retire du pool)
 */
function markWordAsGuessed(word, remainingWords) {
  return remainingWords.filter(w => w !== word);
}

/**
 * Remet un mot dans le pool (si invalidé)
 */
function returnWordToPool(word, remainingWords) {
  return [...remainingWords, word];
}
```

### Système de timer

```javascript
/**
 * Hook personnalisé pour gérer le compte à rebours
 */
function useTimer(initialTime, onTimeUp) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);
  
  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = (newTime) => {
    setTimeRemaining(newTime);
    setIsRunning(false);
  };
  
  return { timeRemaining, isRunning, start, pause, reset };
}
```

---

## 9. GESTION DES CAS PARTICULIERS

### ⚠️ CAS CRITIQUES - GESTION DU POOL DE MOTS

#### Règle fondamentale : Conservation du nombre total de mots
**FORMULE ABSOLUE** : `Nombre total de mots = Nombre de joueurs × Nombre de mots par joueur`

**Exemples** :
- 6 joueurs × 7 mots = 42 mots au total (toujours)
- 10 joueurs × 5 mots = 50 mots au total (toujours)

**Vérifications obligatoires** :
1. Au début de chaque manche, le pool doit contenir EXACTEMENT le nombre total de mots
2. À la fin d'une manche, la somme des mots devinés par toutes les équipes doit égaler le nombre total de mots
3. Si un mot est invalidé dans l'écran de vérification, il DOIT être remis dans le pool

**Validation technique** :
```javascript
// À implémenter au début de chaque manche
const validateWordPool = (allWords, numberOfPlayers, wordsPerPlayer) => {
  const expectedTotal = numberOfPlayers * wordsPerPlayer;
  if (allWords.length !== expectedTotal) {
    console.error(`Erreur critique: ${allWords.length} mots au lieu de ${expectedTotal}`);
    // Corriger ou bloquer le jeu
  }
};
```

#### Compteur "Mots restants" - Règles précises
**⚠️ ATTENTION : Le mot courant ET le mot suivant sont INCLUS dans le compteur**

**Logique exacte** :
```javascript
// Le compteur affiche le nombre de mots dans remainingWords
// remainingWords INCLUT :
// - Le mot actuellement affiché (currentWord)
// - Le mot en réserve (reserveWord, si "Passer" est activé)
// - Tous les autres mots non encore tirés

// Exemple de situation :
// - Pool initial : 42 mots
// - Mot affiché : "Scanner"
// - Mot suivant : "Blague"
// - Compteur affiche : "Mots restants : 42"

// Après validation de "Scanner" :
// - "Blague" devient le mot affiché
// - Nouveau mot tiré : "Tigre"
// - Compteur affiche : "Mots restants : 41"

// Quand il ne reste qu'un seul mot :
// - Mot affiché : "Pomme"
// - Mot suivant : null (aucun)
// - Compteur affiche : "Mots restants : 1"
```

**Cas limite - Dernier mot** :
- Quand `remainingWords.length === 1` :
  - Le mot est affiché comme mot principal
  - Il n'y a PAS de mot suivant (zone vide ou cachée)
  - Le compteur affiche "Mots restants : 1"
  - Après validation de ce mot → Fin de la manche

**Implémentation recommandée** :
```javascript
const RemainingWordsCounter = ({ remainingWords }) => {
  return (
    <div className="text-center text-cyan-400 font-poppins">
      Mots restants : {remainingWords.length}
    </div>
  );
};
```

---

### Cas 1 : Fin de manche anticipée avec conservation du temps
**Contexte** : Une équipe devine tous les mots restants avant la fin du temps.

**Scénario complet** :
1. Un joueur fait deviner le dernier mot de la manche alors qu'il reste **23 secondes** au chronomètre
2. Le chronomètre se fige
3. Message affiché : "Tous les mots devinés ! Temps bonus : 23s"

**Séquence après validation** :

**Étape 1 : Écran de vérification**
- Affichage des mots devinés pendant ce tour
- Les autres joueurs peuvent invalider des mots

**Étape 2a : Si tous les mots sont validés** ✅
- Tous les points sont confirmés
- **Le temps restant (23s) est stocké en cache**
- Écran de fin de manche avec récapitulatif des scores
- Passage à la manche suivante

**Au démarrage du premier tour de la nouvelle manche** :
- **LE MÊME JOUEUR** qui a terminé la manche précédente continue
  - Exemple : Si c'était le joueur 3 de l'équipe A, c'est encore lui
  - `globalTurnNumber` ne change pas (on ne passe pas au tour suivant)
- **Le timer démarre à 23 secondes** (au lieu de 30 secondes par défaut)
- Dès que ce tour bonus est terminé (temps écoulé ou mots devinés), on passe au joueur suivant normalement (`globalTurnNumber++`)

**Étape 2b : Si des mots sont invalidés** ❌
- Les mots invalidés retournent dans le pool
- Il reste donc des mots à deviner dans la manche actuelle
- **Le temps bonus est perdu** (pénalité pour erreur)
- **On passe au joueur suivant** dans l'ordre de rotation (`globalTurnNumber++`)
- Ce joueur joue avec le temps normal (30 secondes)
- La manche continue normalement

**Implémentation dans le state** :
```javascript
game: {
  // ...
  bonusTime: null, // null par défaut, ou nombre de secondes si bonus actif
  bonusPlayerTurnNumber: null, // Numéro du tour qui bénéficie du bonus
}

// Quand une manche se termine avec temps restant
function endRoundWithBonus(remainingSeconds, currentTurnNumber) {
  return {
    bonusTime: remainingSeconds,
    bonusPlayerTurnNumber: currentTurnNumber, // Le MÊME joueur rejoue
    // Ne PAS incrémenter globalTurnNumber
  };
}

// Au début du tour suivant (nouvelle manche)
function getTurnDuration(gameState) {
  // Si c'est le tour bonus
  if (gameState.globalTurnNumber === gameState.bonusPlayerTurnNumber 
      && gameState.bonusTime !== null) {
    const duration = gameState.bonusTime;
    // Réinitialiser le bonus après utilisation
    gameState.bonusTime = null;
    gameState.bonusPlayerTurnNumber = null;
    return duration;
  }
  // Sinon, durée normale
  return gameState.settings.turnDuration; // 30s par défaut
}
```

**Cas particulier : Si le joueur termine AUSSI la nouvelle manche** :
- Si le joueur avec 23s de bonus devine tous les mots en 10s
- Il reste 13s → nouveau bonus pour la manche 3
- Même logique : il continue avec 13s au tour suivant

### Cas 2 : Mot en réserve non deviné
**Contexte** : Le temps s'écoule alors qu'un mot est en réserve.

**Comportement attendu** :
- À la fin du tour, les 2 mots (principal + réserve) sont remis dans le pool
- Aucun des deux n'apparaît dans l'écran de vérification (non devinés)
- Ils pourront être tirés à nouveau lors d'un prochain tour

### Cas 3 : Réinitialisation complète du jeu
**Contexte** : L'utilisateur clique sur "Réinitialiser les paramètres" dans l'écran des paramètres.

**Comportement attendu** :

**Étape 1 : Confirmation obligatoire avec détails**
- Pop-up modal s'affiche avec :
  - ⚠️ Titre : "Réinitialisation complète"
  - Message principal : "Cette action supprimera TOUTES les données suivantes :"
  - **Liste détaillée** (avec icônes ❌) :
    - Tous les joueurs et leurs noms
    - Tous les mots saisis par les joueurs
    - Les équipes constituées et leurs noms personnalisés
    - Tous les scores et l'historique de la partie
    - Tous les paramètres personnalisés
  - Avertissement : "Cette action est irréversible."
  - Deux boutons :
    - "Annuler" → Ferme le pop-up, aucune action
    - "Réinitialiser" (rouge vif/danger) → Lance la réinitialisation complète

**Étape 2 : Si confirmation**
Le système effectue une réinitialisation TOTALE via `clearLocalStorage()` :

**a) Paramètres** :
```javascript
settings: {
  numberOfTeams: 2,
  numberOfPlayers: 6,
  wordChoice: "personnalisé",
  teamFormation: "aléatoire",
  wordsPerPlayer: 7,
  turnDuration: 30,
  allowPass: true
}
```

**b) Données de jeu** :
```javascript
players: [], // Tableau vide
teams: [], // Tableau vide
game: {
  currentScreen: "settings", // Reste sur l'écran des paramètres
  currentRound: 1,
  globalTurnNumber: 0,
  teamOrder: null,
  teamPlayerOrders: null,
  allWords: [],
  remainingWords: [],
  currentWord: null,
  reserveWord: null,
  wordsGuessedThisTurn: [],
  timeRemaining: 30,
  bonusTime: null,
  bonusPlayerTurnNumber: null,
  history: []
}
```

**c) LocalStorage** :
```javascript
// Vidage complet via clearLocalStorage()
localStorage.removeItem('guessItAll_gameState');
// ET réinitialisation avec l'état par défaut
localStorage.setItem('guessItAll_gameState', JSON.stringify(initialState));
```

**d) Navigation** :
- Reste sur l'écran des paramètres (Écran 2)
- Les valeurs par défaut sont affichées
- L'utilisateur peut reconfigurer une nouvelle partie
- Aucune redirection vers l'accueil

**Étape 3 : Si annulation**
- Fermeture du pop-up
- Aucune modification
- Reste sur l'écran actuel

**Tests de validation** :
- [ ] Le pop-up de confirmation s'affiche avec la liste détaillée
- [ ] La liste énumère bien : joueurs, mots, équipes, scores, paramètres
- [ ] Cliquer "Annuler" ne change rien et ferme le pop-up
- [ ] Cliquer "Réinitialiser" appelle `clearLocalStorage()`
- [ ] Vide complètement le state (players: [], teams: [], etc.)
- [ ] Le localStorage est bien vidé puis réinitialisé
- [ ] Les paramètres reviennent aux valeurs par défaut
- [ ] Tous les tableaux (players, teams, etc.) sont vides
- [ ] Reste sur l'écran des paramètres (pas de redirection)
- [ ] Pas de crash après réinitialisation
- [ ] L'utilisateur peut recommencer une nouvelle partie normalement

### Cas 4 : Égalité finale
**Contexte** : Plusieurs équipes ont le même score à la fin.

**Comportement attendu** :
- Toutes les équipes ex-aequo sont affichées sur le podium
- Message : "Égalité entre [Nom équipe 1] et [Nom équipe 2] !"
- Pas de départage automatique (les joueurs peuvent rejouer pour se départager)

### Cas 5 : Actualisation de la page
**Contexte** : Le joueur actualise ou ferme accidentellement le navigateur.

**Comportement attendu** :
- **LocalStorage** sauvegarde automatiquement l'état toutes les 5 secondes
- Au rechargement : pop-up "Reprendre la partie ?" [Oui] [Non]
- Si Oui : reprend exactement où on en était (même écran, même état)
- Si Non : retour à l'accueil

### Cas 6 : Aucun mot rempli (mode Aléatoire désactivé)
**Contexte** : Un joueur clique sur "Constitution des équipes" sans avoir rempli ses mots.

**Comportement attendu** :
- Bouton "Constitution des équipes" reste **grisé**
- Message d'erreur : "Tous les joueurs doivent remplir leurs mots"
- Les encadrés des joueurs incomplets sont rouges (visuellement évident)

---

## 10. VALIDATION ET TESTS

### Tests fonctionnels essentiels

**Navigation** :
- ✅ Tous les boutons de navigation fonctionnent
- ✅ Flèches retour conservent l'état
- ✅ Impossible de passer un écran si contraintes non respectées

**Saisie des joueurs** :
- ✅ Impossible d'avoir 2 joueurs avec le même nom
- ✅ Validation en temps réel des doublons
- ✅ Croix pour effacer fonctionne correctement

**Saisie des mots** :
- ✅ Impossible d'avoir 2 mots identiques pour un même joueur
- ✅ Bouton "Grosse flemme" génère des mots uniques
- ✅ Dé génère bien un mot aléatoire
- ✅ Conservation en cache si changement d'écran

**Constitution des équipes** :
- ✅ Drag & Drop fonctionne correctement
- ✅ Répartition aléatoire est équitable
- ✅ Minimum 2 joueurs par équipe respecté
- ✅ Noms d'équipes modifiables

**Tour de jeu** :
- ✅ Chronomètre décompte correctement
- ✅ "Mot deviné" incrémente le score et tire un nouveau mot
- ✅ "Passer" échange bien les 2 mots (si activé)
- ✅ Fin de tour automatique si temps = 0
- ✅ Fin de tour si plus de mots

**Vérification** :
- ✅ Possibilité d'invalider un mot
- ✅ Mot invalidé retourne dans le pool
- ✅ Score mis à jour correctement

**Transitions de manches** :
- ✅ Récapitulatif des scores correct
- ✅ Mots réinitialisés (tous remis dans le pool)
- ✅ Mode de jeu change correctement

**Résultats finaux** :
- ✅ Classement correct
- ✅ Scores manche par manche exacts
- ✅ Bouton "Rejouer" réinitialise correctement

### Tests d'ergonomie

- ✅ Application utilisable sur mobile (responsive)
- ✅ Boutons suffisamment grands (touch-friendly)
- ✅ Contrastes suffisants (lisibilité)
- ✅ Animations fluides (pas de lag)
- ✅ Messages d'erreur clairs

### Tests de performance

- ✅ Temps de chargement < 2s
- ✅ Pas de freeze lors des animations
- ✅ LocalStorage ne sature pas (nettoyage des anciennes parties)

---

## 11. LIVRABLES ATTENDUS

### Code source
- ✅ Application React complète et fonctionnelle
- ✅ Code commenté et structuré
- ✅ Composants réutilisables et modulaires
- ✅ Fichiers organisés selon l'arborescence recommandée

### Documentation
- ✅ **README.md** avec :
  - Présentation du projet
  - Instructions d'installation (`npm install`)
  - Commandes de lancement (`npm run dev`)
  - Règles du jeu
  - Structure du projet
- ✅ **CLAUDE.md** (FICHIER CRITIQUE) avec :
  - Instructions de cohérence de code
  - Règles strictes sur l'utilisation de Tailwind (pas de CSS isolé)
  - Conventions de nommage et structure
  - Charte graphique à respecter
  - Checklist de validation avant chaque modification
- ✅ Commentaires inline pour logique complexe

### Assets
- ✅ Base de données de mots (500-1000 mots minimum)
- ✅ Favicon et métadonnées (title, description)
- ✅ Icônes nécessaires (dé, poubelle, crayon, etc.)

### Fichiers de configuration
- ✅ `package.json` avec toutes les dépendances
- ✅ Configuration Tailwind CSS
- ✅ Configuration Vite/CRA
- ✅ `.gitignore` approprié

### Déploiement
- ✅ Build de production fonctionnel (`npm run build`)
- ✅ Application déployable sur Vercel/Netlify/GitHub Pages
- ✅ Instructions de déploiement dans le README

---

## 12. CONTRAINTES ET PRIORITÉS

### Contraintes techniques
- ✅ Application 100% frontend (pas de backend)
- ✅ Aucune authentification requise
- ✅ Fonctionne hors ligne (après premier chargement)
- ✅ Compatible Chrome, Firefox, Safari (dernières versions)
- ✅ Responsive mobile/tablet/desktop

### Priorités MVP (Must Have)
1. **Écrans de configuration** (paramètres + joueurs + mots + équipes)
2. **Boucle de jeu complète** (tours + vérification + transitions)
3. **3 manches fonctionnelles**
4. **Système de scores**
5. **Résultats finaux**

### Priorités secondaires (Should Have)
1. Animations et transitions fluides
2. Graphique d'évolution des scores
3. Sauvegarde LocalStorage
4. Design soigné et cohérent

### Nice to Have (optionnel)
1. Mode sombre (dark mode)
2. Sons et effets sonores
3. Personnalisation des couleurs d'équipes
4. Export des résultats (PDF/image)
5. Statistiques avancées (MVP par joueur, etc.)

---

## 13. EXEMPLES DE RÉFÉRENCE

### Sites/jeux similaires
- **Time's Up** (jeu physique de référence)
- **Taboo** / "Tabu" en ligne
- **Codenames** en ligne (pour l'interface multijoueur)
- **Jackbox Games** (pour l'UX d'un seul écran partagé)

### Styles graphiques inspirants
- **Interface épurée** : Style moderne, flat design
- **Couleurs vives** : Énergique, fun, pas trop sérieux
- **Typographie claire** : Lisible à distance (pour jeu en groupe)
- **Animations ludiques** : Micro-animations pour feedback

---

## 14. GLOSSAIRE

**Manche** : Phase du jeu avec un mode spécifique (description / mot / mime). Il y a 3 manches par partie.

**Tour** : Période de jeu d'un joueur (durée : 20-60s selon paramètres). Une manche contient plusieurs tours.

**Mot en réserve** : Système permettant de "jongler" entre 2 mots si un joueur est bloqué.

**Passer** : Action de mettre le mot actuel en réserve et d'afficher le suivant.

**Mot deviné** : Action de valider qu'un mot a été trouvé par l'équipe (ajoute 1 point).

**Pool de mots** : Ensemble des mots restants à deviner dans une manche.

**Vérification** : Écran de contrôle collectif après chaque tour pour valider/invalider les mots devinés.

**Temps bonus** : Temps restant conservé si une équipe finit tous les mots d'une manche avant la fin du chronomètre.

---

## 15. INSTRUCTIONS FINALES POUR LE LLM

### ⚠️ FICHIER CRITIQUE : CLAUDE.md
**AVANT toute écriture de code, le LLM DOIT lire et appliquer strictement les directives du fichier CLAUDE.md.**

Ce fichier contient :
- Les règles de cohérence de code (analyse de l'existant obligatoire)
- L'interdiction d'utiliser du CSS isolé si Tailwind est en place
- Les conventions de nommage et structure à respecter
- La charte graphique exacte (couleurs, polices)
- La checklist de validation avant chaque modification

**Tout code qui ne respecte pas CLAUDE.md doit être refusé ou corrigé.**

### Ton et approche
- Rester ludique et convivial (c'est un jeu entre amis)
- Prioriser l'intuitivité (pas de manuel d'instructions nécessaire)
- Gérer les erreurs avec bienveillance (messages clairs, pas de jargon technique)

### Code quality
- Utiliser des noms de variables explicites (en anglais)
- Commenter les fonctions complexes
- Utiliser les composants fonctionnels React (pas de classes)
- Préférer les hooks personnalisés pour la logique réutilisable

### Expérience utilisateur
- Toujours donner du feedback visuel (hover, clic, validation)
- Éviter les états bloquants (toujours une sortie possible)
- Anticiper les erreurs (validation en temps réel)
- Rendre l'application "forgiving" (annulation possible, récupération d'état)

### Performance
- Optimiser les re-renders (React.memo si nécessaire)
- Pas de calculs lourds dans le render
- Images optimisées (si utilisées)
- Lazy loading si l'application grossit

---

## 16. CHECKLIST DE VALIDATION FINALE

Avant de considérer le projet terminé, vérifier que :

**Fonctionnel** :
- [ ] Toutes les fonctionnalités du cahier des charges sont implémentées
- [ ] Aucun bug bloquant
- [ ] Navigation fluide entre tous les écrans
- [ ] Sauvegarde/chargement depuis LocalStorage fonctionne

**UI/UX** :
- [ ] Design cohérent sur tous les écrans
- [ ] Responsive sur mobile/tablet/desktop
- [ ] Animations fluides et non intrusives
- [ ] Messages d'erreur clairs et utiles

**Code** :
- [ ] Code propre et commenté
- [ ] Pas de console.error en production
- [ ] Arborescence respectée
- [ ] README complet

**Tests** :
- [ ] Partie complète jouable de bout en bout
- [ ] Cas limites testés (ex : 20 joueurs, 4 équipes)
- [ ] Gestion des erreurs testée (doublons, contraintes)

**Déploiement** :
- [ ] Build de production réussi
- [ ] Application accessible en ligne
- [ ] Pas de dépendances manquantes

---

**CE PROMPT EST COMPLET ET PRÊT À ÊTRE UTILISÉ PAR UN LLM POUR CODER L'INTÉGRALITÉ DE "GUESS IT ALL".**

**Bonne création ! 🎉🎮**