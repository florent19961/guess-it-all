# Guess It All - Spécifications

---

## VUE D'ENSEMBLE

**Guess It All** est un jeu de devinettes multijoueurs local inspiré de "Time's Up". Les joueurs sont répartis en 2 à 4 équipes et s'affrontent sur 3 manches consécutives avec des modes de jeu de difficulté croissante :
- **Manche 1** : Description verbale libre
- **Manche 2** : Un seul mot autorisé
- **Manche 3** : Mime uniquement

L'objectif est de faire deviner un maximum de mots à son équipe dans le temps imparti. Chaque manche réutilise le même pool de mots, créant une progression ludique où la familiarité avec les mots augmente la difficulté à chaque manche.

---

## PARCOURS UTILISATEUR

### Écran : Accueil

**Interface** :
- Titre du jeu "Guess It All" en très grand au centre (police Bangers, blanc avec ombre rouge)
- Animation de pulsation sur le titre
- Effet d'étoiles filantes animées en arrière-plan
- Boutons principaux disposés verticalement au centre
- Texte descriptif en bas : "Un jeu de devinettes multijoueurs inspiré de Time's Up"

**Boutons affichés** :
- Si aucune partie en cours :
  - "JOUER" (bouton rose saumon, grande taille)
  - "RÈGLES" (bouton turquoise, taille moyenne)

- Si une partie est en cours ou suspendue :
  - "REPRENDRE LA PARTIE" (bouton rose saumon, grande taille, avec animation de pulsation)
  - "NOUVELLE PARTIE" (bouton rose saumon, grande taille)
  - "RÈGLES" (bouton turquoise, taille moyenne)

**Comportements** :
- Clic sur "JOUER" : Affiche l'écran de configuration

- Clic sur "NOUVELLE PARTIE" (si une partie est en cours) :
  - Affiche une popup de confirmation graphique
  - Titre : "⚠️ Réinitialisation complète" (police Bangers, ombre rouge)
  - Message : "Cette action supprimera TOUTES les données suivantes :"
  - Liste avec puces rouges (❌) :
    - Tous les joueurs et leurs noms
    - Tous les mots saisis par les joueurs
    - Les équipes constituées et leurs noms personnalisés
    - Tous les scores et l'historique de la partie
    - Tous les paramètres personnalisés
  - Avertissement : "Cette action est irréversible." (jaune, gras)
  - Deux boutons :
    - "Annuler" (gris) : Ferme la popup, reste sur l'écran d'accueil
    - "Réinitialiser" (rouge vif) : Confirme l'action, supprime toutes les données et affiche l'écran de configuration

- Clic sur "REPRENDRE LA PARTIE" : Retourne à l'écran où la partie a été suspendue
- Clic sur "RÈGLES" : Affiche l'écran des règles du jeu

---

### Écran : Configuration de la partie

**Interface** :
- Titre "Configuration" en haut (police Bangers, blanc avec ombre rouge)
- Icône d'engrenage en haut à droite pour accéder aux options avancées
- Encadré central avec bordure turquoise contenant 4 paramètres principaux
- Bouton "Réinitialiser" en bas à gauche (gris, avec icône de rotation)
- Bouton "Suivant" en bas à droite (rose saumon, grande taille)
- Effet d'étoiles filantes en arrière-plan

**Paramètres principaux affichés** :

1. **Nombre d'équipes** :
   - Compteur avec boutons - et +
   - Plage : 2 à 4 équipes
   - Valeur par défaut : 2

2. **Nombre de joueurs** :
   - Compteur avec boutons - et +
   - Plage : 4 à 20 joueurs
   - Valeur par défaut : 6
   - Contrainte : Minimum 2 joueurs par équipe

3. **Choix des mots** :
   - Deux options cliquables : "Aléatoire" ou "Personnalisé"
   - L'option sélectionnée est mise en surbrillance
   - Valeur par défaut : Personnalisé

**Validation** :
- Si le nombre de joueurs est insuffisant (moins de 2 joueurs par équipe) :
  - Message d'erreur affiché en rouge : "Minimum 2 joueurs par équipe requis"
  - Le bouton "Suivant" est grisé et non cliquable

**Bouton "Options avancées"** :
- Situé en haut à droite avec une icône d'engrenage
- Ouvre une fenêtre modale (popup) contenant 3 curseurs et une section de catégories :

  1. **Nombre de mots par joueur** :
     - Curseur de 4 à 10
     - Valeur par défaut : 7
     - Affichage de la valeur en temps réel avec unité " mots"

  2. **Durée d'un tour** :
     - Curseur de 20 à 60 secondes
     - Valeur par défaut : 30
     - Affichage de la valeur en temps réel avec unité "s"

  3. **Temps de pénalité pour passer un mot** :
     - Curseur de 0 à 10 secondes
     - Valeur par défaut : 5
     - Affichage de la valeur en temps réel avec unité "s"
     - Si 0 : Passer un mot ne coûte rien et affiche "Passer"
     - Si > 0 : Passer un mot décrémente le chronomètre du nombre de secondes choisi et affiche "Passer (-Xs)"

  4. **Catégories de mots** (section séparée avec bordure en haut) :
     - Titre "📂 Catégories de mots" en gras
     - Sous-titre : "Sélectionnez les catégories depuis lesquelles les mots seront tirés aléatoirement"
     - Grille de checkboxes avec 10+ catégories thématiques :
       - **Catégories classiques** : Films 🎬, Pays 🌍, Animaux 🦁, Objets 📦, Métiers 💼, Sports ⚽, Célébrités ⭐
       - **Catégories fun** : Noms de musiques 🎵, Pokémon 🔥, Cartes Clash Royale 👑
     - Chaque catégorie affiche :
       - Icône emoji distinctive
       - Nom de la catégorie
       - Nombre de mots disponibles (ex: "180 mots")
     - État sélectionné : Bordure turquoise, fond turquoise semi-transparent (#7dd3c0/20)
     - État non sélectionné : Bordure grise, fond gris semi-transparent
     - Deux boutons en bas :
       - "Tout sélectionner" (gris, petit) : Coche toutes les catégories
       - "Tout désélectionner" (gris, petit) : Décoche toutes les catégories
     - Si 0 catégorie sélectionnée : Message d'erreur rouge "⚠️ Au moins une catégorie requise"
     - Valeur par défaut : Films, Pays, Animaux (3 catégories pré-sélectionnées)
     - Hauteur fixe avec défilement si plus de 6 catégories

**Comportement du modal "Options avancées"** :
- Toutes les modifications (curseurs + catégories) sont **locales** jusqu'au clic sur "Enregistrer"
- Bouton "Enregistrer" en bas de la popup :
  - Actif uniquement si au moins 1 catégorie est sélectionnée
  - Si aucune catégorie sélectionnée : Bouton grisé (opacity-50) et non cliquable
  - Au clic : Sauvegarde toutes les options et ferme le modal
- Croix ou clic en dehors de la popup :
  - Ferme le modal SANS sauvegarder
  - Annule tous les changements (curseurs ET catégories)
  - Restaure les valeurs précédemment sauvegardées
  - Exemple : Si l'utilisateur désélectionne tout puis ferme sans "Enregistrer", les catégories précédentes sont restaurées

**Impact des catégories sur la génération de mots** :
- Les catégories sélectionnées définissent le pool de mots pour :
  - **Mode "Aléatoire"** : Tous les mots générés automatiquement pour les joueurs au début
  - **Mode "Personnalisé"** : Mots suggérés par les boutons 🎲 (dé) et "Grosse flemme" lors de la saisie
- Si catégories = [Pokemon] uniquement : Tous les mots générés seront des Pokémon
- Si catégories = [Films, Pays] : Mélange aléatoire de films et pays
- Si 0 catégorie (impossible à sauvegarder) : Fallback sur base générique de 1000+ mots

**Bouton "Réinitialiser"** :
- Au clic, affiche une popup de confirmation graphique stylisée (pas un message d'alerte système)
- Titre de la popup : "⚠️ Réinitialisation complète" (police Bangers, ombre rouge)
- Message : "Cette action supprimera TOUTES les données suivantes :"
- Liste affichée avec puces rouges (❌) dans un encadré avec fond semi-transparent :
  - Tous les joueurs et leurs noms
  - Tous les mots saisis par les joueurs
  - Les équipes constituées et leurs noms personnalisés
  - Tous les scores et l'historique de la partie
  - Tous les paramètres personnalisés
- Avertissement : "Cette action est irréversible." (jaune, gras)
- Deux boutons :
  - "Annuler" (gris) : Ferme la popup, aucun changement
  - "Réinitialiser" (rouge vif) : Confirme l'action

**Si confirmation de la réinitialisation** :
- Tous les paramètres reviennent aux valeurs par défaut
- Toutes les données (joueurs, mots, équipes, scores) sont supprimées
- L'utilisateur reste sur l'écran de configuration
- L'application revient à l'état initial (comme au premier lancement)

---

### Écran : Saisie des noms des joueurs

**Interface** :
- Titre "Qui joue ?" en haut (police Bangers, blanc avec ombre rouge)
- Flèche de retour en haut à gauche
- Liste verticale de lignes (une par joueur)
- Nombre de lignes = Nombre de joueurs configuré
- Bouton "Constitution des équipes" en bas (rose saumon, grande taille)
- Message d'aide en bas si pas tous les joueurs prêts
- Effet d'étoiles filantes en arrière-plan

**Chaque ligne de joueur contient** :
- Champ de saisie du nom à gauche (placeholder "Joueur 1", "Joueur 2", etc.)
- Bouton cliquable à droite affichant :
  - "Choisir les mots" (bordure rouge + fond rouge semi-transparent + texte rouge) si les mots ne sont pas tous saisis
  - "Mots remplis" (bordure verte + fond vert semi-transparent + texte vert) si tous les mots sont saisis

**Mode "Aléatoire"** :
- Si le mode "Aléatoire" est sélectionné dans la configuration :
  - Les mots sont générés automatiquement AVANT même la saisie des noms
  - Dès l'arrivée sur cet écran, tous les boutons affichent "Mots remplis" (vert)
  - L'utilisateur n'a qu'à saisir les noms des joueurs
  - Clic sur "Mots remplis" permet quand même de voir/modifier les mots générés

**Mode "Personnalisé"** :
- Les boutons affichent "Choisir les mots" (rouge) tant que les mots ne sont pas saisis
- L'utilisateur doit cliquer pour accéder à l'écran de saisie des mots

**Réactivité importante** :
- Si l'utilisateur retourne à l'écran de configuration et change le nombre de joueurs :
  - Les lignes s'ajoutent ou disparaissent immédiatement pour correspondre au nouveau nombre
- Si l'utilisateur change le nombre de mots par joueur :
  - Les boutons se mettent à jour instantanément selon le nouveau nombre requis

**Comportements** :
- Saisie du nom dans le champ :
  - Validation en temps réel des doublons
  - Si doublon : Message d'erreur "Ce nom est déjà pris"
  - Si champ vide à la soumission : Message d'erreur "Le nom est requis"

- Clic sur le bouton "Choisir les mots" ou "Mots remplis" :
  - Si le joueur n'a pas de nom saisi : Bouton grisé (opacity-50), non cliquable
  - Si le joueur a un nom valide : Affiche l'écran de saisie des mots pour ce joueur

- Clic sur "Constitution des équipes" :
  - Actif uniquement si tous les joueurs ont :
    - Un nom valide (non vide, pas de doublon)
    - Tous leurs mots saisis (bouton vert "Mots remplis")
  - Sinon : Bouton grisé avec message d'aide "Tous les joueurs doivent avoir un nom et leurs mots remplis"

- Clic sur la flèche de retour :
  - Retourne à l'écran de configuration

---

### Écran : Saisie des mots (par joueur)

**Interface** :
- Titre "Mots de [Nom du joueur]" en haut (police Bangers)
- Flèche de retour en haut à gauche
- Icône poubelle rouge en haut à droite (effacer tous les mots)
- Indicateur de progression en gros : "X/Y" (X = mots remplis, Y = total requis) en turquoise
- Liste verticale de lignes (une par mot à saisir)
- Bouton "Grosse flemme" en bas à gauche (turquoise)
- Bouton "Enregistrer les mots" en bas à droite (rose saumon, grande taille)
- Message d'aide en bas si pas tous les mots remplis
- Effet d'étoiles filantes en arrière-plan

**Chaque ligne de mot contient** :
- Input texte à gauche avec placeholder "Mot 1", "Mot 2", etc.
- Icône de dé à droite (bouton turquoise rond)
- Si doublon détecté : Bordure rouge + message "Doublon"

**Comportements** :
- Saisie d'un mot dans le champ :
  - Validation en temps réel des doublons au sein des mots du joueur
  - Si doublon : Bordure rouge + message d'erreur "Doublon"

- Clic sur l'icône de dé (bouton turquoise à droite d'un champ) :
  - Génère un mot aléatoire unique
  - Remplit automatiquement le champ avec ce mot
  - Efface l'erreur si elle existait

- Clic sur l'icône poubelle (en haut à droite) :
  - Vide tous les champs de saisie
  - Efface toutes les erreurs

- Clic sur "Grosse flemme" :
  - Remplit automatiquement tous les champs vides ou en erreur
  - Génère des mots aléatoires uniques
  - Tous les doublons sont résolus

- Clic sur "Enregistrer les mots" :
  - Actif uniquement si :
    - Tous les champs sont remplis
    - Aucun doublon
  - Sinon : Bouton grisé avec message "Tous les mots doivent être remplis et uniques"
  - Si validé : Sauvegarde les mots et retourne à l'écran de saisie des noms

- Clic sur la flèche de retour :
  - Retourne à l'écran de saisie des noms (sans sauvegarder)

---

### Écran : Constitution des équipes

**Interface** :
- Titre "Formation des équipes" en haut (police Bangers, blanc avec ombre rouge)
- Flèche de retour en haut à gauche
- Bouton "Répartir" en haut à droite avec icône de mélange (bordure turquoise)
- Grille de 2 à 4 cartes d'équipes selon configuration (disposition en 2 colonnes)
- Bouton "Démarrer la partie" en bas (rose saumon, grande taille)
- Message d'aide en bas si conditions non remplies
- Effet d'étoiles filantes en arrière-plan

**Répartition initiale** :
- À l'arrivée sur cet écran, tous les joueurs sont automatiquement répartis de manière aléatoire entre les équipes
- Répartition équitable : chaque équipe reçoit approximativement le même nombre de joueurs

**Cartes d'équipes** :
- Bordure de couleur selon l'équipe (rose, turquoise, violet, jaune)
- Nom de l'équipe en haut (couleur correspondante, éditable)
- Icône crayon à côté du nom (pour éditer)
- Conteneur avec hauteur fixe (200px)
- Si plus de 3 joueurs : Barre de défilement verticale apparaît automatiquement
- Barre de défilement personnalisée (couleur turquoise #7dd3c0, design fin et moderne)
- Liste des joueurs de l'équipe
- Si aucun joueur : Message "Glissez des joueurs ici"
- Pour chaque joueur :
  - Icône de poignée (:::) à gauche indiquant qu'il est déplaçable
  - Nom du joueur
  - Bordure gauche colorée selon la couleur de l'équipe
- Si moins de 2 joueurs : Message d'avertissement rouge "⚠ Minimum 2 joueurs requis"

**Système de glisser-déposer** :
- Tous les joueurs peuvent être déplacés par glisser-déposer **uniquement entre les équipes**
- Au survol d'un joueur :
  - Le curseur change en main ouverte (grab)
  - Indication visuelle que l'élément est interactif
- Lors du glissement d'un joueur :
  - Le joueur devient semi-transparent (50% d'opacité)
  - Bordure turquoise apparaît autour du joueur
  - Le curseur devient une main fermée (grabbing)
- Zones de dépôt possibles :
  - **Uniquement les autres cartes d'équipe** (pas de zone "Joueurs disponibles")
- Lors du survol d'une zone de dépôt valide pendant le glissement :
  - Anneau turquoise lumineux autour de la carte d'équipe
  - Fond de la carte devient légèrement coloré selon la couleur de l'équipe
  - Bordure en pointillés apparaît
  - Légère mise à l'échelle de la carte
- Lors du dépôt :
  - Le joueur se déplace instantanément vers la nouvelle équipe
  - Animation fluide de transition
  - Bordure de la zone cible revient à la normale
  - Les listes se réorganisent automatiquement

**Comportements** :
- Clic sur "Répartir" :
  - Mélange aléatoirement tous les joueurs
  - Les répartit équitablement entre les équipes
  - Permet de générer une nouvelle répartition aléatoire à tout moment

- Glisser-déposer un joueur sur une carte d'équipe :
  - Le joueur change d'équipe instantanément
  - Le joueur disparaît de son équipe d'origine et apparaît dans la nouvelle équipe
  - Les listes se réorganisent automatiquement
  - **Impossible de retirer un joueur d'une équipe** : il doit toujours être dans une équipe

- Clic sur l'icône crayon (à côté du nom d'une équipe) :
  - Le nom devient éditable
  - L'utilisateur peut saisir un nouveau nom
  - Appui sur Entrée ou clic en dehors : Sauvegarde le nouveau nom

- Clic sur "Démarrer la partie" :
  - Actif uniquement si chaque équipe a au moins 2 joueurs
  - Sinon : Bouton grisé avec message d'aide "Chaque équipe doit avoir au moins 2 joueurs"
  - Si validé : Lance la partie, affiche l'écran de préparation de la manche 1

- Clic sur la flèche de retour :
  - Retourne à l'écran de saisie des noms

**Défilement des listes** :
- Toutes les cartes d'équipes ont une hauteur fixe de 200px
- Si une équipe contient plus de 3 joueurs environ :
  - Une barre de défilement verticale apparaît automatiquement à droite
  - Défilement fluide à la molette ou au tactile
  - Barre de défilement turquoise (#7dd3c0) en harmonie avec le thème
  - Au survol de la barre : Couleur légèrement plus foncée
- La hauteur reste toujours fixe, empêchant l'interface de s'étirer

**Couleurs des équipes** :
- Équipe 1 : Rose saumon (#f19b9b)
- Équipe 2 : Turquoise/Cyan (#7dd3c0)
- Équipe 3 : Violet (#a78bfa)
- Équipe 4 : Jaune (#fbbf24)

---

### Écran : Préparation du tour

**Interface** :
- Icône "maison" en haut à gauche (retour à l'accueil)
- Fond avec effet d'étoiles filantes
- Informations centrées au milieu de l'écran :
  - "Manche X" en très grand (police Bangers)
  - "Mode : [Description verbale/Un seul mot/Mime]" en dessous
  - Nom de l'équipe actuelle en couleur
  - Nom du joueur actuel
  - Nombre de mots restants dans la manche
- Bouton "C'est parti !" (rose saumon, grande taille)

**Comportements** :
- Affichage statique pendant 3 secondes
- Clic sur "C'est parti !" : Lance le compte à rebours (écran suivant)
- Clic sur l'icône maison : Affiche une popup de confirmation, puis suspend la partie et retourne à l'accueil si confirmé (voir détails dans "Écran : Tour de jeu")

---

### Écran : Compte à rebours

**Interface** :
- Compte à rebours animé en très grand au centre : "3... 2... 1... GO !"
- Fond avec effet d'étoiles filantes
- Police Bangers
- Animation de zoom et changement de couleur

**Comportements** :
- Affiche "3" pendant 1 seconde
- Affiche "2" pendant 1 seconde
- Affiche "1" pendant 1 seconde
- Affiche "GO !" puis passe automatiquement à l'écran de tour de jeu

---

### Écran : Tour de jeu

**Interface** :
- Icône "maison" en haut à gauche (retour à l'accueil)
- Nom du joueur actuel affiché en haut au centre dans un encadré (bordure turquoise, fond semi-transparent)
- Bouton "Pause/Reprendre" en haut à droite (rond, turquoise quand actif, vert avec icône Play quand en pause)
- Bouton "Terminer le tour" en bas à droite (icône fast-forward, rond, turquoise)
- Fond avec effet d'étoiles filantes

**Disposition centrale** :

1. **Chronomètre** (en haut) :
   - Taille : Très grande (96px de hauteur minimum, text-8xl)
   - Couleur : Turquoise (#7dd3c0)
   - Format : "30s", "29s", etc.
   - Si moins de 10 secondes restantes :
     - Couleur : Rouge
     - Animation de pulsation/clignotement

2. **Mot à faire deviner** (au centre) :
   - Texte "MOT À FAIRE DEVINER" en petit au-dessus (gris clair)
   - Le mot en très grand (police Bangers, blanc avec ombre rouge, text-6xl)
   - Bordure épaisse rose/rouge (3-4px)
   - Fond semi-transparent foncé
   - Deux boutons de part et d'autre :

   - **Bouton gauche "Passer"** :
     - Couleur : Orange (#FF8C00)
     - Forme : Arrondie (rounded-full)
     - Texte affiché :
       - Si pénalité = 0 : "Passer"
       - Si pénalité > 0 : "Passer (-Xs)" où X = nombre de secondes de pénalité
     - État désactivé (grisé) si temps restant < pénalité configurée
     - Fonction : Retire le temps de pénalité du chronomètre et passe au mot suivant

   - **Bouton droit** (icône ✓) :
     - Couleur : Rose saumon (#f19b9b)
     - Taille : Grande (60-80px de diamètre), rond
     - Fonction : Marquer le mot comme deviné et passer au mot suivant

3. **Compteur "Mots restants"** (en bas) :
   - Position : En bas, centré
   - Police : Poppins, gris clair
   - Format : "Mots restants : 42"
   - Se met à jour en temps réel
   - Le compteur inclut le mot actuellement affiché + tous les mots non encore joués

**Comportements** :

- **Chronomètre** :
  - Décrémente automatiquement chaque seconde
  - Précision absolue basée sur l'horloge système (aucun décalage visible même après plusieurs minutes)
  - Fonctionne correctement même si le navigateur ralentit l'onglet en arrière-plan
  - Si atteint 0 : Fin automatique du tour, passage à l'écran de vérification avec 0 seconde restante
  - Si < 10 secondes : Change en rouge avec animation de clignotement
  - Le temps se synchronise avec le contexte global en temps réel

- **Clic sur le bouton "Passer"** :
  - Si temps restant ≥ pénalité configurée :
    - Décrémente le chronomètre immédiatement du nombre de secondes de pénalité
    - Le mot actuel est retiré du pool et ajouté aux "mots passés du tour"
    - Affiche le mot suivant du pool
    - Le compteur "Mots restants" décrémente de 1
    - Si le nouveau temps = 0 : Le tour se termine automatiquement
  - Si temps restant < pénalité :
    - Bouton grisé (opacity-30) et non cliquable

- **Clic sur le bouton "Validé" (✓)** :
  - Le mot actuel est marqué comme deviné
  - Le mot est retiré du pool et ajouté aux "mots devinés du tour"
  - Affiche le mot suivant du pool
  - Le compteur "Mots restants" décrémente de 1
  - Si c'était le dernier mot de la manche :
    - Fin automatique du tour
    - Sauvegarde du temps restant (bonus potentiel)
    - Passage à l'écran de vérification

- **Clic sur "Pause"** :
  - Le chronomètre se fige immédiatement
  - L'icône change en "Play" (vert)
  - Tous les boutons (sauf Pause/Reprendre) deviennent grisés avec opacity-30
  - Les boutons "Passer", "Validé" et "Terminer" sont non cliquables
  - Le jeu est complètement figé

- **Clic sur "Reprendre" (icône Play verte)** :
  - Le chronomètre reprend son décompte
  - L'icône redevient "Pause" (turquoise)
  - Tous les boutons redeviennent actifs et cliquables
  - L'opacity revient à normale

- **Clic sur "Terminer le tour" (FastForward)** :
  - Popup de confirmation : "Êtes-vous sûr de vouloir terminer le tour ?"
  - Si confirmé :
    - Arrête le chronomètre
    - Sauvegarde le temps restant
    - Passe à l'écran de vérification
  - Si annulé : Retour au jeu, chronomètre continue

- **Clic sur l'icône maison** :
  - Affiche une popup de confirmation graphique stylisée
  - Titre : "⏸️ Interrompre la partie ?" (police Bangers, ombre rouge)
  - Message principal : "La partie sera mise en pause et sauvegardée automatiquement."
  - Sous-message turquoise : "Vous pourrez reprendre exactement où vous en étiez depuis l'écran d'accueil."
  - Encadré avec liste des éléments conservés (coches vertes ✓) :
    - Progression et scores
    - Temps restant
    - Mots restants
  - Deux boutons :
    - "Continuer à jouer" (gris) : Ferme la popup, reste dans le jeu
    - "Mettre en pause" (turquoise) : Confirme l'action
  - Si confirmé :
    - Suspend la partie
    - Sauvegarde l'état actuel complet (temps restant, mot en cours, scores, etc.)
    - Retourne à l'écran d'accueil
    - Un bouton "REPRENDRE LA PARTIE" apparaît sur l'écran d'accueil

**États possibles** :
- **Normal** : Chronomètre décompte, tous boutons actifs
- **Pause** : Chronomètre figé, boutons grisés avec opacity-30, seul le bouton Reprendre est actif
- **Temps critique** (< 10s) : Chronomètre rouge avec animation de clignotement
- **Fin de manche** : Si dernier mot deviné, passage automatique à la vérification avec temps bonus sauvegardé

---

### Écran : Vérification des mots

**Interface** :
- Titre "Vérification" en haut (police Bangers, blanc avec ombre rouge)
- Sous-titre "Tour de [Nom du joueur]" (police Poppins, gris clair)
- Icône "maison" en haut à gauche (retour à l'accueil)
- Encadré central avec bordure turquoise
- Titre de section "Mots validés : X" (où X se met à jour en temps réel)
- Liste mixte de tous les mots du tour :
  - Mots devinés (marqués avec ✓ pendant le tour)
  - Mots passés (passés avec pénalité de temps pendant le tour)
- Bouton "Valider les mots" en bas (rose saumon, grande taille)
- Message d'information en bas si des mots sont invalidés
- Fond avec effet d'étoiles filantes

**Affichage de chaque mot** :
- Grand encadré arrondi cliquable (border-radius 16px)
- Icône (✓ ou ✗) à gauche selon l'état
- Texte du mot au centre
- Badge "(passé)" en jaune pour les mots qui ont été passés avec pénalité
- Texte d'aide à droite selon l'état
- Deux états visuels possibles :

**État "Validé" (par défaut pour les mots devinés)** :
- Bordure : Verte épaisse (#10B981, 2px)
- Icône : ✓ verte à gauche du mot
- Fond : Sombre semi-transparent (rgba(30, 41, 59, 0.6))
- Texte du mot : Blanc, police Poppins
- Texte d'aide à droite : "Cliquer pour invalider" (gris clair)

**État "Invalidé" (par défaut pour les mots passés)** :
- Bordure : Rouge épaisse (#e88b8b, 2px)
- Icône : ✗ rouge à gauche du mot
- Fond : Rouge foncé semi-transparent
- Texte du mot : Blanc, police Poppins
- Texte d'aide à droite : "Cliquer pour valider" (gris clair)
- Badge jaune "(passé)" affiché à côté du mot (text-xs, font-semibold, text-yellow-500)

**Comportements** :

- **État initial** :
  - Mots devinés : Affichés en état "validé" (✓ vert, sans badge)
  - Mots passés : Affichés en état "invalidé" (✗ rouge, avec badge jaune "(passé)")

- **Clic n'importe où sur l'encadré d'un mot** :
  - Si le mot est en état "validé" (vert) :
    - Passe en état "invalidé" (rouge)
    - Bordure devient rouge (#e88b8b)
    - Icône ✓ verte devient ✗ rouge
    - Fond devient rouge foncé semi-transparent
    - Texte d'aide change en "Cliquer pour valider"
    - Le compteur "Mots validés : X" décrémente de 1 en temps réel

  - Si le mot est en état "invalidé" (rouge) :
    - Passe en état "validé" (vert)
    - Bordure devient verte (#10B981)
    - Icône ✗ rouge devient ✓ verte
    - Fond devient sombre semi-transparent
    - Texte d'aide change en "Cliquer pour invalider"
    - Le compteur "Mots validés : X" incrémente de 1 en temps réel
    - Le badge "(passé)" reste visible si le mot avait été passé

- **Possibilité de basculer autant de fois que souhaité** :
  - L'utilisateur peut cliquer plusieurs fois sur le même mot
  - Le système toggle entre validé et invalidé à chaque clic
  - Aucune limite, réversible à l'infini

- **Message d'information** :
  - Si au moins un mot est invalidé :
    - Affiche en jaune en bas : "X mot(s) invalidé(s) - ils seront remis dans le pot"

- **Clic sur "Valider les mots"** :
  - Seuls les mots en état "validé" (✓ verts) sont comptabilisés :
    - Mots devinés validés (verts) → comptent pour le score
    - Mots passés validés (verts avec badge jaune) → comptent aussi pour le score
  - Les mots en état "invalidé" (✗ rouges) sont remis dans le pool :
    - Mots devinés invalidés → retournent dans le pool
    - Mots passés invalidés → retournent dans le pool
  - Points attribués à l'équipe : 1 point par mot validé (vert)
  - Si tous les mots restants de la manche ont été joués :
    - Si aucun mot invalidé : Passage à l'écran de transition (fin de manche) avec temps bonus préservé
    - Si au moins un mot invalidé : Temps bonus perdu, passage au tour suivant avec temps normal
  - Sinon : Passage au tour suivant (joueur suivant selon l'ordre de rotation)

- **Clic sur l'icône maison** :
  - Affiche une popup de confirmation, puis suspend la partie et retourne à l'accueil si confirmé (voir détails dans "Écran : Tour de jeu")

**Règles de comptabilisation** :
- Seuls les mots validés (✓ verts) comptent dans le score
- Les mots invalidés (✗ rouges) ne rapportent aucun point
- Les mots invalidés retournent dans le pool et peuvent être re-tirés plus tard
- Les mots passés peuvent être validés et comptent alors normalement (1 point)
- Si des mots sont invalidés et que le joueur avait terminé la manche avec du temps restant :
  - Le bonus de temps est perdu (pénalité)
  - Le tour passe au joueur suivant avec le temps normal configuré
  - La manche continue avec les mots invalidés remis dans le pool

---

### Écran : Transition entre manches

**Interface** :
- Icône "maison" en haut à gauche (retour à l'accueil)
- Titre "Fin de la Manche X" en très grand au centre (police Bangers, avec animation de pulsation)
- Sous-titre "Prochain mode : [Description verbale/Un seul mot/Mime]" (turquoise, grande taille)
- Encadré central avec bordure turquoise
- Titre de section "Scores après Manche X"
- Liste des équipes triées par score décroissant
- Bouton "Commencer la Manche X+1" ou "Voir les résultats" en bas (rose saumon, grande taille)
- Fond avec effet d'étoiles filantes

**Affichage des scores** :
- Pour chaque équipe, un encadré avec :
  - Médaille si dans le top 3 :
    - 1ère place : 🥇
    - 2ème place : 🥈
    - 3ème place : 🥉
  - Nom de l'équipe (police Poppins, blanc, gras)
  - Score total de l'équipe (police Bangers, turquoise, grande taille)
  - Si 1ère place : Bordure dorée (ring-2 ring-yellow-500)

**Comportements** :
- Affichage statique jusqu'à interaction de l'utilisateur
- Clic sur "Commencer la Manche X+1" :
  - Réinitialise le pool de mots (même liste complète)
  - Garde le même ordre de joueurs
  - Si le joueur précédent avait un temps bonus et que tous ses mots ont été validés :
    - Le même joueur rejoue avec son temps bonus
  - Sinon : Passe au joueur suivant
  - Affiche l'écran de préparation du tour

- Clic sur "Voir les résultats" (après la manche 3) :
  - Affiche l'écran des résultats finaux

- Clic sur l'icône maison :
  - Affiche une popup de confirmation, puis suspend la partie et retourne à l'accueil si confirmé (voir détails dans "Écran : Tour de jeu")

---

### Écran : Résultats finaux

**Interface** :
- Icône "maison" en haut à gauche (retour à l'accueil)
- Titre "Partie terminée !" en très grand (police Bangers, avec animation de rebond)
- Podium visuel avec les 3 premières équipes :
  - 1ère place au centre (plus grand, bordure dorée épaisse)
  - 2ème place à gauche (taille moyenne)
  - 3ème place à droite (plus petit)
- Bouton "Score détaillé" (gris, taille moyenne)
- Tableau détaillé des scores (si cliqué sur le bouton)
- Boutons d'action en bas
- Message de félicitations
- Fond avec effet d'étoiles filantes

**Podium** :
- **1ère place** (centre) :
  - Médaille 🥇 en très grand au-dessus
  - Encadré avec bordure dorée épaisse (4px)
  - Nom de l'équipe (police Bangers, jaune, grande taille)
  - Score total (police Bangers, jaune, très grande taille)
  - Effet de surbrillance (ring-4 ring-yellow-500)

- **2ème place** (gauche) :
  - Médaille 🥈 au-dessus
  - Encadré avec bordure grise
  - Nom et score en gris clair
  - Taille intermédiaire

- **3ème place** (droite) :
  - Médaille 🥉 au-dessus
  - Encadré avec bordure orange
  - Nom et score en orange
  - Plus petit que les deux autres

**Tableau détaillé des scores** :
- Affiché si clic sur "Score détaillé"
- Tableau avec colonnes :
  - Équipe
  - Manche 1
  - Manche 2
  - Manche 3
  - Total (en gras, turquoise)
- Chaque ligne = une équipe
- Ligne de la 1ère place : Fond jaune semi-transparent
- Tri par score total décroissant

**Boutons d'action** :
- "Rejouer" (bouton turquoise, grande taille) :
  - Garde les mêmes joueurs et équipes
  - Réinitialise les scores à zéro
  - Retourne à l'écran de saisie des joueurs

- "Nouvelle partie" (bouton rose saumon, grande taille) :
  - Réinitialise tout (joueurs, mots, équipes, scores)
  - Retourne à l'écran de configuration

- "Retour à l'accueil" (bouton gris, taille moyenne) :
  - Réinitialise tout
  - Retourne à l'écran d'accueil

**Message de félicitations** :
- En bas, centré
- Texte : "Félicitations à **[Nom de l'équipe gagnante]** pour cette victoire ! 🎉"
- Police Poppins, gris clair
- Nom de l'équipe en jaune et gras

**Comportements** :
- Clic sur "Score détaillé" :
  - Affiche/masque le tableau détaillé
  - Le texte du bouton change entre "Score détaillé" et "Masquer"

- Clic sur "Rejouer" :
  - Réinitialise les scores
  - Garde les joueurs, mots et équipes
  - Affiche l'écran de saisie des joueurs pour permettre des modifications

- Clic sur "Nouvelle partie" :
  - Réinitialise complètement l'application
  - Affiche l'écran de configuration

- Clic sur "Retour à l'accueil" :
  - Réinitialise complètement l'application
  - Affiche l'écran d'accueil

---

## RÈGLES DU JEU

### Objectif

L'objectif est de faire deviner un maximum de mots à son équipe pour marquer le plus de points possible sur les 3 manches.

---

### Déroulement d'une partie

1. **Configuration** :
   - Les joueurs configurent les paramètres (nombre d'équipes, nombre de joueurs, etc.)
   - Chaque joueur saisit son nom
   - Chaque joueur saisit ses mots (nombre configurable, par défaut 7)
   - Les équipes sont constituées (aléatoirement ou manuellement)

2. **Constitution du pool de mots** :
   - Tous les mots saisis par tous les joueurs sont regroupés dans un pool unique
   - Formule : Nombre total de mots = Nombre de joueurs × Nombre de mots par joueur
   - Exemple : 6 joueurs × 7 mots = 42 mots au total
   - Ce pool est utilisé pour les 3 manches

3. **Déroulement des 3 manches** :
   - Chaque manche utilise le même pool de mots (tous les mots)
   - Les mots sont mélangés aléatoirement au début de chaque manche
   - Les mots sont sélectionnés aléatoirement à chaque tirage pendant le jeu
   - Chaque manche a un mode de jeu différent (voir ci-dessous)

4. **Tour de jeu** :
   - Un joueur tire un mot au hasard du pool
   - Les mots apparaissent dans un ordre complètement aléatoire (pas de répétition prévisible)
   - Il a un temps limité (configurable, par défaut 30 secondes) pour faire deviner le mot à son équipe
   - Il peut marquer le mot comme deviné (bouton ✓)
   - Il peut passer le mot avec une pénalité de temps (bouton "Passer")
   - Si le temps s'écoule, le tour se termine automatiquement

5. **Vérification** :
   - Après chaque tour, les autres joueurs vérifient les mots devinés
   - Ils peuvent invalider des mots (qui retournent dans le pool)
   - Seuls les mots validés rapportent des points

6. **Rotation des joueurs** :
   - L'ordre des joueurs est déterminé aléatoirement au début de la partie
   - L'ordre est conservé pour les 3 manches
   - Les tours alternent entre les équipes selon cet ordre aléatoire
   - Au sein de chaque équipe, les joueurs jouent dans un ordre aléatoire également
   - Exemple : Si l'ordre généré est Équipe 2 → Équipe 1 → Équipe 2 → Équipe 1, cet ordre reste fixe
   - Les joueurs de chaque équipe tournent dans leur ordre aléatoire propre

7. **Fin de manche** :
   - Quand tous les mots ont été devinés
   - Affichage des scores intermédiaires
   - Passage à la manche suivante (ou aux résultats finaux si manche 3 terminée)

8. **Fin de partie** :
   - Après la manche 3
   - Affichage du podium et des scores finaux
   - L'équipe avec le plus de points gagne

---

### Modes de jeu par manche

1. **Manche 1 : Description verbale** :
   - Le joueur peut décrire le mot avec autant de mots qu'il veut
   - Aucune restriction sur le vocabulaire
   - Mode le plus facile

2. **Manche 2 : Un seul mot** :
   - Le joueur ne peut dire qu'un seul mot pour faire deviner
   - Mode intermédiaire

3. **Manche 3 : Mime** :
   - Le joueur ne peut pas parler
   - Il doit faire deviner le mot uniquement par des gestes
   - Mode le plus difficile

---

### Attribution des points

- **1 point** par mot deviné et validé
- Les mots invalidés ne rapportent aucun point
- Les mots invalidés retournent dans le pool de mots
- Le score est cumulé sur les 3 manches
- L'équipe avec le plus de points à la fin de la manche 3 gagne

---

### Conservation du temps bonus

**Règle du temps bonus** :

Le temps bonus est préservé automatiquement quand un joueur termine une manche avec du temps restant au chronomètre.

**Flux complet** :

1. **Fin d'un tour avec temps restant** :
   - Le joueur termine son tour (dernier mot deviné ou temps écoulé)
   - Le temps restant au chronomètre est sauvegardé (exemple : 12 secondes)
   - Passage à l'écran de vérification

2. **À l'écran de vérification** :
   - Si tous les mots de la manche ont été joués (pool vide) :
     - Le temps restant est préservé comme "temps bonus"
     - Si tous les mots du tour sont validés :
       - Le temps bonus est conservé pour le premier tour de la manche suivante
       - Le même joueur rejoue
     - Si au moins un mot est invalidé :
       - Le temps bonus est perdu (pénalité)
       - Les mots invalidés retournent dans le pool
       - Le tour passe au joueur suivant avec le temps normal

3. **Transition entre manches** :
   - Si le joueur a un temps bonus préservé :
     - L'écran de transition s'affiche avec les scores
     - Le temps bonus reste sauvegardé dans la mémoire du jeu
   - Passage à l'écran de préparation de la manche suivante

4. **Démarrage du premier tour de la nouvelle manche** :
   - Si le joueur précédent avait un temps bonus :
     - Le même joueur rejoue en premier
     - Son chronomètre démarre avec le temps bonus (12s au lieu de 30s)
     - Après ce tour, la rotation normale reprend
   - Sinon :
     - Le joueur suivant dans l'ordre joue
     - Le chronomètre démarre avec le temps normal configuré (30s par défaut)

**Mécanisme de préservation** :
- Le temps bonus est sauvegardé de manière similaire à la suspension de partie
- Il traverse les écrans : vérification → transition → préparation → nouveau tour
- Il est stocké dans la sauvegarde automatique (LocalStorage)

**Exemple complet** :
- Joueur A termine la manche 1 avec 15 secondes restantes
- Tous ses mots sont validés à l'écran de vérification
- Écran de transition : affichage des scores après la manche 1
- Manche 2 démarre : Joueur A rejoue en premier
- Son chronomètre affiche 15 secondes (pas 30 secondes)
- Après ce tour bonus, la rotation normale reprend avec les autres joueurs

---

### Rotation aléatoire des joueurs

**Génération de l'ordre (une seule fois au début de la partie)** :

1. **Ordre des équipes** :
   - Les équipes sont mélangées dans un ordre aléatoire
   - Cet ordre est répété en boucle pour créer une séquence infinie
   - Exemple avec 2 équipes : [Équipe 2, Équipe 1, Équipe 2, Équipe 1, Équipe 2, Équipe 1, ...]

2. **Ordre des joueurs par équipe** :
   - Pour chaque équipe, les joueurs sont mélangés dans un ordre aléatoire
   - Cet ordre est répété en boucle pour créer une séquence infinie
   - Exemple pour Équipe 1 avec 3 joueurs : [Joueur 3, Joueur 1, Joueur 2, Joueur 3, Joueur 1, Joueur 2, ...]

3. **Détermination du joueur actuel** :
   - Un compteur global de tours incrémente à chaque tour
   - L'équipe actuelle = Ordre des équipes[compteur % nombre d'équipes]
   - Le joueur actuel = Ordre des joueurs de cette équipe[nombre de fois que l'équipe a joué % nombre de joueurs]

**Persistance entre manches** :
- L'ordre aléatoire généré au début reste identique pour les 3 manches
- Le compteur global de tours continue d'incrémenter (ne se réinitialise jamais)
- Exemple : Si la manche 1 se termine au tour 12, la manche 2 commence au tour 13
- Le même joueur qui a terminé la manche 1 (avec ou sans bonus) commence la manche 2

**Règles importantes** :
- L'ordre aléatoire est généré une seule fois au début de la partie
- Il n'est jamais modifié pendant toute la durée de la partie (3 manches)
- Cet ordre garantit une alternance équitable entre les équipes
- Au sein de chaque équipe, tous les joueurs jouent le même nombre de fois

---

### Cas particuliers

**1. Passer un mot** :
- Si la pénalité de temps est configurée à 0 :
  - Passer un mot ne coûte rien
  - Le mot retourne dans le pool sans pénalité
- Si la pénalité > 0 (exemple : 5 secondes) :
  - Le chronomètre décrémente du nombre de secondes configuré
  - Le mot est marqué comme "passé" et apparaît en rouge à l'écran de vérification
  - Si le temps restant < pénalité : Le bouton "Passer" est grisé et non cliquable

**2. Dernier mot d'une manche** :
- Quand le joueur valide le dernier mot :
  - Le tour se termine automatiquement
  - Le temps restant est sauvegardé (bonus potentiel)
  - Passage à l'écran de vérification

**3. Mots invalidés** :
- Les mots invalidés à l'écran de vérification :
  - Ne rapportent aucun point
  - Retournent dans le pool de mots restants
  - Peuvent être re-tirés plus tard dans la même manche
  - Font perdre le bonus de temps si le joueur en avait un

**4. Temps écoulé** :
- Si le chronomètre atteint 0 secondes :
  - Le tour se termine automatiquement
  - Le mot en cours n'est pas compté
  - Passage à l'écran de vérification avec le temps restant à 0

**5. Pause/Suspension** :
- **Pause pendant un tour** :
  - Le chronomètre se fige
  - Les boutons sont désactivés
  - L'utilisateur peut reprendre quand il est prêt
- **Retour à l'accueil (icône maison)** :
  - La partie est suspendue
  - L'état actuel est sauvegardé (temps restant, mot en cours, scores, etc.)
  - À l'écran d'accueil, un bouton "REPRENDRE LA PARTIE" apparaît
  - Cliquer dessus ramène exactement où la partie a été quittée

**6. Fin de manche avec tous les mots devinés** :
- Si tous les mots de la manche sont devinés avant la fin du dernier tour :
  - Le temps restant est sauvegardé
  - Si tous les mots du tour sont validés : Le joueur garde son bonus pour la manche suivante
  - Si au moins un mot est invalidé : Le bonus est perdu

---

## CHARTE GRAPHIQUE

### Thème général

**Ambiance visuelle** :
- Univers spatial/nocturne
- Fond bleu marine foncé (#1e293b)
- Effet d'étoiles filantes animées en permanence sur tous les écrans
- Encadrés avec fond semi-transparent et effet de flou (backdrop-blur)
- Design moderne et ludique

---

### Couleurs

**Fond** :
- Fond principal : `#1e293b` (Bleu marine foncé)
- Fond des cartes/encadrés : `rgba(30, 41, 59, 0.6)` (Semi-transparent)

**Boutons** :
- Bouton principal (actions principales) : `#f19b9b` (Rose saumon)
- Bouton secondaire (actions secondaires) : `#7dd3c0` (Turquoise/Cyan)
- Bouton fantôme (actions tertiaires) : Transparent avec bordure grise

**États** :
- Succès/Validation : `#10B981` (Vert)
- Erreur/Invalidation : `#e88b8b` (Rouge)
- Avertissement : `#fbbf24` (Jaune)
- Désactivé : `#4a5568` (Gris foncé) avec opacité réduite

**Couleurs des équipes** :
- Équipe 1 : `#f19b9b` (Rose saumon)
- Équipe 2 : `#7dd3c0` (Turquoise/Cyan)
- Équipe 3 : `#a78bfa` (Violet)
- Équipe 4 : `#fbbf24` (Jaune)

**Textes** :
- Texte principal : `#ffffff` (Blanc)
- Texte secondaire : `#9ca3af` (Gris clair)
- Texte d'accentuation : `#7dd3c0` (Turquoise)

---

### Typographies

**Police pour les titres principaux** :
- Police : `Bangers` (Google Fonts), cursive
- Couleur : Blanc (`#ffffff`)
- Effet : Ombre portée décalée rouge (`text-shadow: 2px 2px 0 #e88b8b`)
- Utilisation : Tous les titres de premier niveau (h1), mot à faire deviner, scores importants

**Police pour le corps de texte et interface** :
- Police : `Poppins` (Google Fonts), sans-serif
- Couleur : Blanc ou gris selon le contexte
- Utilisation : Tous les autres textes, boutons, labels, descriptions

**Tailles de police** :
- Titre d'écran (h1) : `text-6xl` ou `text-7xl` (60-72px)
- Chronomètre : `text-8xl` (96px minimum) pour une visibilité maximale
- Mot à faire deviner : `text-6xl` (60px)
- Sous-titres (h2) : `text-2xl` à `text-4xl` (24-36px)
- Corps de texte : `text-base` à `text-xl` (16-20px)
- Texte d'aide : `text-sm` (14px)

---

### Arrondis (border-radius)

- Petits boutons et inputs : `rounded-lg` (12px)
- Encadrés moyens : `rounded-xl` (16px)
- Grands encadrés : `rounded-2xl` (24px)
- Boutons ronds (icônes) : `rounded-full` (100%)

---

### Bordures

**Épaisseurs** :
- Bordure fine : `border-2` (2px)
- Bordure moyenne : `border-3` (3px)
- Bordure épaisse : `border-4` (4px)

**Couleurs de bordure** :
- Principale : `#7dd3c0` (Turquoise)
- Validation : `#10B981` (Vert)
- Erreur : `#e88b8b` (Rouge)
- Neutre : `#4a5568` (Gris)

---

### Effets visuels

**Effet d'étoiles filantes** :
- Présent sur tous les écrans en arrière-plan
- Animation continue de petites étoiles traversant l'écran
- Couleur : Blanc semi-transparent
- Vitesse : Variable pour créer un effet de profondeur
- Position : `absolute`, `inset-0`, `pointer-events-none`

**Animations** :
- **Pulsation** : Utilisée pour le titre "Guess It All" à l'accueil, le bouton "Reprendre la partie"
- **Rebond** : Utilisée pour le titre "Partie terminée !" aux résultats
- **Clignotement** : Utilisée pour le chronomètre en rouge quand < 10 secondes
- **Zoom/Scale** : Utilisée pour les boutons au survol (`hover:scale-110`) et au clic (`active:scale-95`)

**Transitions** :
- Tous les boutons et éléments interactifs ont une transition fluide (`transition-all duration-200`)
- Changements d'état visuels : 200ms
- Changements de couleur au survol : 200ms

**Ombres** :
- **Ombre portée décalée** : Utilisée pour les titres principaux
  - Format : `drop-shadow-[2px_2px_0_#e88b8b]` (décalage 2px droite, 2px bas, couleur rouge)
  - Plus grande pour les très gros titres : `drop-shadow-[4px_4px_0_#e88b8b]`

**Effets de surbrillance** :
- **Ring** : Utilisé pour mettre en valeur des éléments importants
  - Exemple : 1ère place sur le podium (`ring-4 ring-yellow-500 ring-opacity-50`)
  - Bordure brillante autour de l'élément

---

### Icônes

**Bibliothèque** :
- Lucide React (icônes modernes et minimalistes)

**Icônes principales utilisées** :
- `Home` : Maison (retour à l'accueil)
- `ArrowLeft` : Flèche gauche (retour en arrière)
- `Settings` : Engrenage (options avancées)
- `RotateCcw` : Rotation anti-horaire (réinitialiser)
- `Shuffle` : Mélanger (répartition aléatoire)
- `Edit3` : Crayon (éditer)
- `X` : Croix (fermer, retirer)
- `Check` : Coche (valider)
- `Pause` : Pause (mettre en pause)
- `Play` : Lecture (reprendre)
- `FastForward` : Avance rapide (terminer le tour)
- `Trash2` : Poubelle (effacer)
- `Dice5` : Dé (générer aléatoirement)

**Tailles d'icônes** :
- Petites icônes (boutons secondaires) : `size={18}` ou `size={20}`
- Icônes moyennes (boutons principaux) : `size={24}`
- Grandes icônes (boutons d'action majeurs) : `size={36}`

**Couleurs d'icônes** :
- Blanc pour la plupart des cas
- Couleur de l'équipe pour les actions spécifiques
- Gris pour les états désactivés

---

### Responsive Design

**Approche** :
- Mobile-first (conception pour mobile en priorité)
- Points de rupture Tailwind CSS :
  - `sm` : 640px
  - `md` : 768px
  - `lg` : 1024px
  - `xl` : 1280px

**Adaptations** :
- Sur mobile :
  - Padding réduit : `p-4` au lieu de `p-8`
  - Tailles de police réduites : `text-4xl` au lieu de `text-6xl`
  - Boutons en pleine largeur : `w-full` sur mobile, `w-auto` sur desktop
  - Grilles en colonne unique : `grid-cols-1` sur mobile, `grid-cols-2` ou plus sur desktop

- Sur desktop :
  - Padding augmenté
  - Tailles de police plus grandes
  - Boutons de taille fixe
  - Grilles multi-colonnes

**Conteneur principal** :
- Largeur maximale : `max-w-2xl` à `max-w-6xl` selon l'écran
- Centré horizontalement : `mx-auto`
- Padding horizontal : `px-4`

---

### États interactifs des boutons

**État normal** :
- Couleur de fond selon le variant (primary, secondary, ghost)
- Bordure si définie
- Texte blanc

**État survolé (hover)** :
- Légère opacité réduite ou couleur plus foncée
- Zoom léger : `scale-110`
- Transition fluide : `duration-200`

**État cliqué (active)** :
- Zoom inverse : `scale-95`
- Effet de "pression" du bouton

**État désactivé (disabled)** :
- Opacité réduite : `opacity-50`
- Curseur interdit : `cursor-not-allowed`
- Couleur de fond grisée : `bg-gray-700`
- Pas d'interaction possible

---

## RÉSUMÉ TECHNIQUE


**Fonctionnalités clés** :
- Multijoueurs local (2 à 20 joueurs)
- 2 à 4 équipes
- 3 manches avec modes différents
- Pool de mots personnalisable
- Rotation aléatoire des joueurs (persistante sur les 3 manches)
- Système de temps bonus
- Vérification réversible des mots (toggle validé/invalidé)
- Sauvegarde automatique de la partie
- Suspension et reprise de partie

---

**Ce document décrit l'état complet et actuel de l'application "Guess It All" du point de vue de l'utilisateur.**
