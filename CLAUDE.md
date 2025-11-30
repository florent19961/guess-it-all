# Instructions pour Claude - Projet "Guess It All"

## 🎯 Objectif de ce document

Ce fichier contient des directives importantes pour maintenir la **cohérence** et la **qualité** du code tout au long du développement du projet "Guess It All". Claude doit TOUJOURS respecter ces règles lors de toute modification ou ajout de code.

---

## ✅ RÈGLE ABSOLUE : COHÉRENCE AVEC L'EXISTANT

**AVANT toute modification ou ajout de code, Claude DOIT** :

1. **Analyser le code existant** pour comprendre :
   - Les conventions de nommage utilisées
   - La structure des composants
   - Les patterns et architectures en place
   - Les librairies et outils déjà utilisés

2. **Respecter strictement** ces conventions dans tout nouveau code

3. **NE JAMAIS** introduire de nouvelles approches si une solution existe déjà

---

## 🚫 INTERDICTIONS STRICTES

### 1. Styling incohérent
❌ **INTERDIT** : Créer du CSS isolé si Tailwind CSS est utilisé
```javascript
// ❌ MAUVAIS - CSS dans un fichier séparé alors qu'on utilise Tailwind
<div className="my-custom-class">...</div>

// styles.css
.my-custom-class {
  background-color: #1e293b;
  padding: 16px;
}
```

✅ **CORRECT** : Utiliser exclusivement Tailwind
```javascript
// ✅ BON - Utilisation de Tailwind
<div className="bg-slate-800 p-4">...</div>
```

**Exception** : CSS personnalisé uniquement pour :
- Animations complexes non couvertes par Tailwind
- Effets d'étoiles filantes (animations de fond)
- Styles impossibles avec Tailwind seul

### 2. Mélange de frameworks/librairies
❌ **INTERDIT** : Ajouter une nouvelle librairie pour une fonctionnalité déjà couverte
```javascript
// ❌ MAUVAIS - Importer une nouvelle lib alors que React Context existe
import { createStore } from 'redux';
```

✅ **CORRECT** : Utiliser les outils déjà en place
```javascript
// ✅ BON - Utiliser React Context comme défini
import { useGameContext } from '../context/GameContext';
```

### 3. Incohérence de structure
❌ **INTERDIT** : Créer une nouvelle structure de dossiers
```
src/
├── components/
│   └── NewComponent.jsx
├── myComponents/  ❌ Nouveau dossier incohérent
│   └── AnotherComponent.jsx
```

✅ **CORRECT** : Respecter la structure existante
```
src/
├── components/
│   ├── screens/
│   │   └── NewScreen.jsx  ✅ Dans le bon dossier
│   └── ui/
│       └── NewUIComponent.jsx  ✅ Dans le bon dossier
```

---

## 📋 CONVENTIONS À RESPECTER

### Nommage
- **Composants** : PascalCase (`HomeScreen.jsx`, `Button.jsx`)
- **Hooks** : camelCase avec préfixe `use` (`useTimer.js`, `useGameLogic.js`)
- **Utilitaires** : camelCase (`wordDatabase.js`, `gameHelpers.js`)
- **Variables/fonctions** : camelCase (`currentPlayer`, `handleClick`)
- **Constantes** : SCREAMING_SNAKE_CASE (`MAX_PLAYERS`, `DEFAULT_SETTINGS`)

### Structure des composants React
```javascript
// Toujours respecter cet ordre :
// 1. Imports
import React, { useState, useEffect } from 'react';
import { useGameContext } from '../context/GameContext';

// 2. Composant fonctionnel
export default function ComponentName({ prop1, prop2 }) {
  // 3. Hooks
  const [state, setState] = useState(null);
  const { gameState } = useGameContext();
  
  // 4. Fonctions handlers
  const handleClick = () => {
    // ...
  };
  
  // 5. Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 6. Render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

### Classes Tailwind
- **Toujours dans cet ordre** : Layout → Spacing → Sizing → Typography → Colors → Effects
```javascript
// ✅ BON ordre
<div className="flex justify-center items-center p-4 w-full h-screen text-xl font-bold text-white bg-slate-800 rounded-lg shadow-lg">

// ❌ MAUVAIS ordre (mélangé)
<div className="text-white bg-slate-800 flex w-full rounded-lg p-4 font-bold h-screen justify-center text-xl items-center shadow-lg">
```

### Gestion d'état
- **Privilégier** : React Context API (`GameContext`)
- **Éviter** : Props drilling excessif
- **Interdire** : Redux ou autre state manager si Context suffit

---

## 🎨 CHARTE GRAPHIQUE (À RESPECTER STRICTEMENT)

### Couleurs (UNIQUEMENT celles-ci)
```javascript
// Couleurs principales
const COLORS = {
  // Fond
  background: '#1e293b',        // Bleu marine foncé
  
  // Boutons
  primary: '#f19b9b',           // Rose saumon (actions principales)
  secondary: '#7dd3c0',         // Turquoise/cyan (actions secondaires)
  
  // États
  success: '#10B981',           // Vert (validation)
  error: '#e88b8b',             // Rouge (erreur)
  disabled: '#4a5568',          // Gris foncé (désactivé)
  
  // Équipes
  team1: '#f19b9b',             // Rose
  team2: '#7dd3c0',             // Turquoise
  team3: '#a78bfa',             // Violet
  team4: '#fbbf24',             // Jaune
};
```

### Polices (UNIQUEMENT celles-ci)
```javascript
// Titres principaux
font-family: 'Bangers', cursive;
// Effet : text-shadow avec décalage rouge

// Tous les autres textes
font-family: 'Poppins', sans-serif;
```

### Arrondis (border-radius)
- Petits éléments : `rounded-lg` (12px)
- Encadrés moyens : `rounded-xl` (16px)
- Grands encadrés : `rounded-2xl` (24px)
- Boutons : `rounded-full` (100%) pour les boutons ronds

---

## 🚨 POINTS DE VIGILANCE CRITIQUES (BUGS FRÉQUENTS)

### 0. LOGIQUE DE ROTATION DES JOUEURS - ALGORITHME COMPLET
**Contexte** : Ordre des tours de jeu

**⚠️ ERREUR FRÉQUENTE** : Rotation séquentielle simple (J1E1 → J1E2 → J2E1 → J2E2)
**❌ CETTE LOGIQUE EST INCORRECTE ET NE DOIT PAS ÊTRE UTILISÉE**

**✅ LOGIQUE CORRECTE - Rotation aléatoire persistante** :

**Phase 1 : Génération au début de la partie (UNE SEULE FOIS)** :
```javascript
// Appelé après la constitution des équipes, avant le premier tour
function generatePlayOrder(teams) {
  // 1. Ordre aléatoire des équipes
  const teamOrder = [...teams].sort(() => Math.random() - 0.5);
  
  // 2. Ordre aléatoire des joueurs par équipe
  const teamPlayerOrders = {};
  teams.forEach(team => {
    teamPlayerOrders[team.id] = [...team.playerIds].sort(() => Math.random() - 0.5);
  });
  
  return { teamOrder, teamPlayerOrders };
}
```

**Phase 2 : Calcul du joueur actuel** :
```javascript
function getCurrentPlayer(globalTurnNumber, teamOrder, teamPlayerOrders) {
  // Équipe actuelle (alterne)
  const teamIndex = globalTurnNumber % teamOrder.length;
  const currentTeam = teamOrder[teamIndex];
  
  // Joueur actuel (rotation cyclique)
  const teamTurnCount = Math.floor(globalTurnNumber / teamOrder.length);
  const playerOrder = teamPlayerOrders[currentTeam.id];
  const playerIndex = teamTurnCount % playerOrder.length;
  
  return {
    teamId: currentTeam.id,
    playerId: playerOrder[playerIndex]
  };
}
```

**Phase 3 : Persistance entre manches** :
- **globalTurnNumber** continue d'incrémenter (ne se réinitialise PAS)
- **teamOrder** et **teamPlayerOrders** restent identiques
- Exemple : Manche 1 finit au tour 8 → Manche 2 commence au tour 9

**Tests obligatoires** :
- [ ] `teamOrder` et `teamPlayerOrders` générés une seule fois
- [ ] Ordres conservés entre les 3 manches
- [ ] `globalTurnNumber` ne se réinitialise jamais
- [ ] Rotation cyclique fonctionne (rebouclage correct)

---

### 1. Réactivité des encadrés de joueurs
**Contexte** : Écran de saisie des noms (Écran 3)

**Problème fréquent** : Nombre d'encadrés figé même si on change les paramètres

**Solution obligatoire** :
```javascript
// ✅ BON - Encadrés dynamiques basés sur les paramètres
const PlayersScreen = () => {
  const { settings } = useGameContext();
  const { numberOfPlayers, wordsPerPlayer } = settings;
  
  // Créer un tableau de la bonne taille
  const playerSlots = Array.from({ length: numberOfPlayers }, (_, i) => i);
  
  return (
    <div>
      {playerSlots.map((index) => (
        <PlayerInput 
          key={index} 
          playerIndex={index}
          wordsRequired={wordsPerPlayer} // Se met à jour automatiquement
        />
      ))}
    </div>
  );
};

// ❌ MAUVAIS - Nombre figé
const PlayersScreen = () => {
  const [players, setPlayers] = useState([1,2,3,4,5,6]); // Figé à 6
  // ...
};
```

**Tests obligatoires** :
- [ ] Changer de 6 à 10 joueurs → 4 nouveaux encadrés apparaissent
- [ ] Changer de 10 à 4 joueurs → 6 encadrés disparaissent
- [ ] Changer de 7 à 10 mots/joueur → Tous les "[X/7]" deviennent "[X/10]"

### 2. Compteur "Mots restants" - Inclusion du mot courant
**Contexte** : Écran de tour de jeu (Écran 7)

**Problème fréquent** : Le compteur affiche "Mots restants : 0" alors qu'un mot est encore affiché

**RÈGLE ABSOLUE** :
```
Mots restants = remainingWords.length
remainingWords INCLUT le mot actuellement affiché + tous les autres mots non encore joués
```

**Exemple détaillé** :
```javascript
// Situation 1 : Début de manche
remainingWords = ["Scanner", "Blague", "Tigre", ...] // 42 mots
currentWord = "Scanner"  // Ce mot est DANS remainingWords
→ Compteur affiche : "Mots restants : 42" ✅

// Situation 2 : Après validation de "Scanner"
remainingWords = ["Blague", "Tigre", ...] // 41 mots (Scanner retiré)
currentWord = "Blague"   // Prochain mot du pool, DANS remainingWords
→ Compteur affiche : "Mots restants : 41" ✅

// Situation 3 : Après passage d'un mot (avec pénalité)
remainingWords = ["Tigre", "Chat", ...] // 40 mots (Blague retiré et mis dans passedWordsThisTurn)
currentWord = "Tigre"    // Prochain mot du pool, DANS remainingWords
→ Compteur affiche : "Mots restants : 40" ✅

// Situation 4 : Dernier mot
remainingWords = ["Pomme"] // 1 mot
currentWord = "Pomme"      // DANS remainingWords
→ Compteur affiche : "Mots restants : 1" ✅

// Situation 5 : Après validation du dernier mot
remainingWords = [] // 0 mot
currentWord = null  // Plus de mot
→ FIN DE LA MANCHE (passage automatique à l'écran de vérification)
```

**Implémentation correcte** :
```javascript
// ✅ BON - Le compteur reflète la taille réelle du pool
<div className="text-gray-400 text-center">
  Mots restants : {remainingWords.length}
</div>

// ❌ MAUVAIS - Soustraction manuelle (décalage possible)
<div className="text-gray-400">
  Mots restants : {remainingWords.length - 1} {/* ❌ Faux */}
</div>
```

**Note importante** : Avec le système de pénalité (sans réserve), `remainingWords` contient uniquement le mot actuel et les mots futurs. Les mots passés sont dans `passedWordsThisTurn` (séparé du pool).

### 3. Conservation du nombre total de mots
**Contexte** : Tout au long du jeu

**FORMULE ABSOLUE** :
```
Nombre total de mots = Nombre de joueurs × Nombre de mots par joueur
```

**Vérifications à chaque étape** :

**a) Création du pool initial** :
```javascript
// ✅ BON - Génération correcte
const initializeWordPool = (players) => {
  const allWords = [];
  players.forEach(player => {
    allWords.push(...player.words); // Concaténation de tous les mots
  });
  
  // VALIDATION
  const expectedTotal = players.length * wordsPerPlayer;
  if (allWords.length !== expectedTotal) {
    console.error(`ERREUR: ${allWords.length} mots au lieu de ${expectedTotal}`);
  }
  
  return allWords;
};
```

**b) Début de chaque manche** :
```javascript
// ✅ BON - Réinitialisation complète
const startNewRound = (allWords) => {
  const remainingWords = [...allWords]; // Copie de TOUS les mots
  
  // VALIDATION
  if (remainingWords.length !== expectedTotal) {
    console.error('Pool incomplet au début de la manche');
  }
  
  return remainingWords;
};
```

**c) Fin de manche** :
```javascript
// ✅ BON - Vérification
const endRound = (wordHistory) => {
  const totalGuessed = wordHistory.reduce((sum, turn) => {
    return sum + turn.wordsGuessed.length;
  }, 0);
  
  // VALIDATION
  if (totalGuessed !== expectedTotal) {
    console.error(`Seulement ${totalGuessed} mots devinés sur ${expectedTotal}`);
  }
};
```

**d) Invalidation de mots** :
```javascript
// ✅ BON - Remise dans le pool
const invalidateWords = (wordsToInvalidate, remainingWords) => {
  return [...remainingWords, ...wordsToInvalidate]; // Ajoute les mots invalidés
};

// ❌ MAUVAIS - Perte des mots invalidés
const invalidateWords = (wordsToInvalidate, remainingWords) => {
  return remainingWords; // Les mots invalidés sont perdus ! ❌
};
```

**Tests obligatoires** :
- [ ] Somme des mots devinés par toutes les équipes = nombre total
- [ ] Pool de mots réinitialisé à 100% à chaque manche
- [ ] Mots invalidés retournent dans le pool (vérifier avec console.log)

### 4. Conservation du temps restant en fin de manche
**Contexte** : Un joueur termine une manche avec du temps restant

**Problème fréquent** : Le temps bonus est perdu entre les manches

**RÈGLE ABSOLUE** : Le temps bonus doit être préservé de la fin du tour jusqu'au début du tour suivant (nouvelle manche)

**Flux complet** :
1. **Fin de tour avec temps restant (ex: 12s)** :
   - `endTurn(12)` sauvegarde `game.timeRemaining = 12`
   - `game.turnBonusTime = 12` si tous les mots ont été devinés

2. **Écran de vérification** :
   - L'utilisateur valide les mots
   - Si manche terminée (`remainingWords.length === 0`):
     - **CRUCIAL** : `turnBonusTime = prev.game.timeRemaining` (préserver le temps)
     - Passage à l'écran de transition

3. **Transition vers nouvelle manche** :
   - `nextRound()` préserve `turnBonusTime = prev.game.turnBonusTime`
   - Le même joueur continue (indices préservés)
   - Passage à GameScreen

4. **Démarrage du nouveau tour** :
   - `startTurn()` utilise `timeRemaining = turnBonusTime || turnDuration`
   - Timer démarre avec 12s ✅

**Implémentation correcte** :
```javascript
// 1. Dans validateWords() - Fin de manche (CRITIQUE)
if (newRemainingWords.length === 0) {
  return {
    ...prev,
    teams: updatedTeams,
    game: {
      ...prev.game,
      history: [...prev.game.history, historyEntry],
      remainingWords: newRemainingWords,
      currentScreen: 'transition',
      turnBonusTime: prev.game.timeRemaining, // ← SAUVEGARDER LE TEMPS
    },
  };
}

// 2. Dans nextRound() - Préserver le temps bonus
return {
  ...prev,
  game: {
    ...prev.game,
    currentRound: nextRoundNumber,
    remainingWords: shuffledWords,
    currentWord: nextCurrentWord,
    wordsGuessedThisTurn: [],
    passedWordsThisTurn: [],
    currentScreen: 'game',
    currentTeamIndex: prev.game.currentTeamIndex, // Même équipe
    currentPlayerIndexInTeam: prev.game.currentPlayerIndexInTeam, // Même joueur
    currentTurnIndex: prev.game.currentTurnIndex, // Même index
    turnBonusTime: prev.game.turnBonusTime, // ← PRÉSERVER LE TEMPS
  },
};

// 3. Dans startTurn() - Utiliser le temps bonus
setState(prev => ({
  ...prev,
  game: {
    ...prev.game,
    currentScreen: 'countdown',
    wordsGuessedThisTurn: [],
    passedWordsThisTurn: [],
    timeRemaining: prev.game.turnBonusTime || prev.settings.turnDuration, // ← UTILISER LE BONUS
  },
}));
```

**Mécanique similaire à la suspension** :
- La suspension préserve `game.timeRemaining` sans le toucher
- Le temps bonus utilise exactement la même approche
- Pas de logique complexe, juste préserver l'état existant

**Tests obligatoires** :
- [ ] Finir une manche avec 15s → Même joueur rejoue avec 15s (pas 30s)
- [ ] Temps bonus préservé à travers : validation → transition → nextRound → startTurn
- [ ] Si mots invalidés → Bonus perdu (voir section 9)
- [ ] LocalStorage sauvegarde correctement `turnBonusTime`
- [ ] Recharger la page préserve le temps bonus

### 5. Réinitialisation complète du jeu
**Contexte** : Bouton "Réinitialiser les paramètres"

**Problème fréquent** : Réinitialisation incomplète laissant des données résiduelles, ou popup trop vague

**RÈGLE ABSOLUE** :
1. **Pop-up de confirmation détaillée obligatoire** :
   ```javascript
   // ❌ MAUVAIS - Réinitialise directement
   <button onClick={resetGame}>Réinitialiser</button>
   
   // ❌ MAUVAIS - Message trop vague
   "Êtes-vous sûr de vouloir réinitialiser ?"
   
   // ✅ BON - Pop-up détaillée avec liste
   const showResetConfirmation = () => {
     // Afficher popup avec :
     // - Titre : "⚠️ Réinitialisation complète"
     // - Message : "Cette action supprimera TOUTES les données suivantes :"
     // - Liste :
     //   ❌ Tous les joueurs et leurs noms
     //   ❌ Tous les mots saisis par les joueurs
     //   ❌ Les équipes constituées et leurs noms personnalisés
     //   ❌ Tous les scores et l'historique de la partie
     //   ❌ Tous les paramètres personnalisés
     // - Avertissement : "Cette action est irréversible."
     // - Boutons : "Annuler" / "Réinitialiser" (rouge)
   };
   ```

2. **Réinitialisation COMPLÈTE via clearLocalStorage()** :
   ```javascript
   const clearLocalStorage = () => {
     const initialState = {
       settings: {
         numberOfTeams: 2,
         numberOfPlayers: 6,
         wordChoice: "personnalisé",
         wordsPerPlayer: 7,
         turnDuration: 30,
         passPenalty: 5, // Temps de pénalité en secondes pour passer un mot (0-10)
         selectedCategories: ['films', 'pays', 'animaux'] // Catégories par défaut
       },
       players: [],
       teams: [],
       game: {
         currentScreen: "settings", // NE PAS rediriger vers home
         currentRound: 1,
         globalTurnNumber: 0,
         teamOrder: null,
         teamPlayerOrders: null,
         allWords: [],
         remainingWords: [],
         bonusTime: null,
         bonusPlayerTurnNumber: null,
         history: []
       }
     };

     // Vider localStorage
     localStorage.removeItem('guessItAll_gameState');

     // Réinitialiser le state
     return initialState;
   };
   ```

**Tests obligatoires** :
- [ ] Pop-up s'affiche avec liste détaillée (5 points minimum)
- [ ] Message "Cette action est irréversible" présent
- [ ] Bouton "Annuler" ne change rien
- [ ] Bouton "Réinitialiser" appelle `clearLocalStorage()`
- [ ] `players`, `teams`, `game.teamOrder` à []/ null
- [ ] localStorage vidé complètement
- [ ] Reste sur écran paramètres (PAS de redirection vers home)
- [ ] Peut relancer une nouvelle partie sans bug

### 6. Système de vérification réversible (toggle)
**Contexte** : Écran de vérification des mots (VerificationScreen)

**Problème résolu** : L'ancien système ne permettait pas de re-valider un mot une fois invalidé (irréversible)

**RÈGLE ABSOLUE** : Système toggle complet permettant de basculer entre "validé" et "invalidé" autant de fois que nécessaire

**Implémentation correcte** :
```javascript
// ✅ BON - État local pour gérer les invalidations
const [invalidatedWords, setInvalidatedWords] = useState([]);

const toggleWordValidity = (word) => {
  setInvalidatedWords(prev =>
    prev.includes(word)
      ? prev.filter(w => w !== word) // Re-valider (retirer de la liste)
      : [...prev, word] // Invalider (ajouter à la liste)
  );
};

// Rendu de chaque mot
{wordsGuessed.map(word => {
  const isInvalid = invalidatedWords.includes(word);
  
  return (
    <div
      key={word}
      onClick={() => toggleWordValidity(word)}
      className={`cursor-pointer p-4 rounded-xl border-2 ${
        isInvalid
          ? 'border-red-500 bg-red-900/20' // Invalidé
          : 'border-green-500 bg-slate-800/50' // Validé
      }`}
    >
      <span className={isInvalid ? 'text-red-500' : 'text-green-500'}>
        {isInvalid ? '✗' : '✓'}
      </span>
      <span className="ml-3">{word}</span>
      <span className="text-sm text-gray-400">
        {isInvalid ? 'Cliquer pour valider' : 'Cliquer pour invalider'}
      </span>
    </div>
  );
})}
```

**États visuels** :
- **Validé** : Bordure verte + ✓ vert + fond sombre + texte "Cliquer pour invalider"
- **Invalidé** : Bordure rouge + ✗ rouge + fond rouge foncé + texte "Cliquer pour valider"

**Compteur dynamique** :
```javascript
const validatedCount = wordsGuessed.length - invalidatedWords.length;

// Affichage
Mots validés : {validatedCount} / {wordsGuessed.length}
```

**Validation finale** :
- Seuls les mots NON présents dans `invalidatedWords` sont comptabilisés
- Les mots dans `invalidatedWords` sont remis dans `remainingWords`

**Tests obligatoires** :
- [ ] Tous les mots démarrent en état "validé" (✓ vert)
- [ ] Clic sur un mot validé → devient invalidé (✗ rouge)
- [ ] Clic sur un mot invalidé → redevient validé (✓ vert)
- [ ] Possibilité de basculer autant de fois que nécessaire
- [ ] Compteur se met à jour en temps réel
- [ ] Mots invalidés retournent bien dans le pool
- [ ] Cliquer sur l'encadré entier (pas juste l'icône) fonctionne

### 7. Interface de jeu optimisée (TurnScreen)
**Contexte** : Écran du tour de jeu

**RÈGLE ABSOLUE** : Interface épurée, fonctionnelle avec contrôles clairs

**Structure de l'interface** :
```jsx
// ✅ BON - Interface complète
<div className="min-h-screen relative">
  {/* 1. Nom du joueur actuel - Centré en haut */}
  <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-background-card border-2 border-secondary-cyan rounded-xl px-6 py-3">
    <p className="font-poppins text-white text-xl">
      <strong className="text-secondary-cyan">{currentPlayer?.name}</strong>
    </p>
  </div>

  {/* 2. Bouton Pause/Reprendre - Haut droite */}
  <button className="fixed top-6 right-6 w-12 h-12 rounded-full">
    {isPaused ? <Play size={24} /> : <Pause size={24} />}
  </button>

  {/* 3. Chronomètre en grand (text-8xl = 96px) */}
  <div className="text-8xl text-cyan-400 text-center">
    {timeRemaining}s
  </div>

  {/* 4. Mot à faire deviner avec boutons */}
  <div className="flex items-center gap-6">
    {/* Bouton Passer (gauche) - Texte avec pénalité */}
    <button className="bg-orange-500 px-4 py-3 rounded-full">
      {passPenalty === 0 ? 'Passer' : `Passer (-${passPenalty}s)`}
    </button>

    {/* Mot principal */}
    <div className="flex-1">
      <div className="text-sm text-gray-400">MOT À FAIRE DEVINER</div>
      <div className="text-6xl font-bangers">{currentWord}</div>
    </div>

    {/* Bouton Validé (droite) - Icône Check */}
    <button className="w-20 h-20 bg-primary-pink rounded-full">
      <Check size={36} />
    </button>
  </div>

  {/* 5. Compteur en bas */}
  <div className="text-center text-gray-400">
    Mots restants : {remainingWords.length}
  </div>

  {/* 6. Bouton Terminer le tour - Bas droite */}
  <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full">
    <FastForward size={24} />
  </button>
</div>
```

**Éléments clés** :
- **Nom du joueur** : Toujours visible en haut (identifie clairement qui joue)
- **Bouton Pause** : Pause/Reprendre avec icône Play/Pause
- **État de pause** : Tous les boutons (sauf Pause) désactivés avec `opacity-30`
- **Bouton Passer** : Affiche la pénalité de temps (`-5s`) si > 0
- **Bouton Terminer** : Icône FastForward en bas à droite (pas croix)
- **Pas de mot suivant** : Section supprimée (système de réserve retiré)

**Positionnement des boutons** :
- ✅ Bouton Home : `fixed top-6 left-6` (haut gauche)
- ✅ Nom du joueur : `fixed top-6 left-1/2 -translate-x-1/2` (haut centre)
- ✅ Bouton Pause : `fixed top-6 right-6` (haut droite)
- ✅ Bouton Terminer : `fixed bottom-6 right-6` (bas droite)

**Tests obligatoires** :
- [ ] Nom du joueur affiché en haut centre
- [ ] Bouton Pause/Reprendre fonctionnel (icône change)
- [ ] Tous les boutons désactivés pendant la pause (opacity-30)
- [ ] Bouton "Passer" affiche la pénalité si configurée
- [ ] Bouton FastForward (terminer) en bas droite
- [ ] Pas de section "Mot suivant"
- [ ] Chronomètre en text-8xl (très gros)
- [ ] "Mots restants" affiché en bas

### 8. Système de pénalité pour passer un mot
**Contexte** : Remplacement du système de réserve de mots

**RÈGLE ABSOLUE** : Système de pénalité de temps au lieu d'un système d'échange de mots

**Ancien système (SUPPRIMÉ)** :
- ❌ `allowPass` (toggle On/Off dans les paramètres)
- ❌ `reserveWord` (mot en réserve à échanger)
- ❌ Bouton "Passer" avec icône ArrowLeftRight (échange)
- ❌ Section "MOT SUIVANT" affichée

**Nouveau système (ACTUEL)** :
- ✅ `passPenalty` (slider 0-10 secondes dans les paramètres)
- ✅ `passedWordsThisTurn` (array des mots passés pendant le tour)
- ✅ Bouton "Passer" avec texte affichant la pénalité
- ✅ Pénalité déduite du temps restant

**Implémentation dans les paramètres (SettingsScreen)** :
```javascript
// ✅ BON - Slider de pénalité
<Slider
  label="Temps de pénalité pour passer un mot"
  min={0}
  max={10}
  value={localSettings.passPenalty}
  onChange={(value) => {
    const newSettings = { ...localSettings, passPenalty: value };
    setLocalSettings(newSettings);
    actions.updateSettings(newSettings);
  }}
  showValue={true}
  unit="s"
/>

// ❌ ANCIEN - Ne plus utiliser
<Toggle
  options={['Autoriser', 'Interdire']}
  label="Autorisation de passer"
  // ...
/>
```

**Implémentation dans TurnScreen** :
```javascript
// ✅ BON - Logique avec pénalité
const handlePass = () => {
  if (!isPaused && timeRemaining >= settings.passPenalty) {
    const newTime = timeRemaining - settings.passPenalty;
    actions.passWord(); // Met à jour le contexte
    setTimeManually(newTime); // Met à jour le timer local
  }
};

// Bouton affiche la pénalité
<button
  onClick={handlePass}
  disabled={isPaused || timeRemaining < settings.passPenalty}
  className="bg-orange-500 hover:bg-orange-600 rounded-full px-4 py-3"
>
  {settings.passPenalty === 0 ? 'Passer' : `Passer (-${settings.passPenalty}s)`}
</button>
```

**Logique dans GameContext.passWord()** :
```javascript
const passWord = () => {
  setState(prev => {
    const { passPenalty } = prev.settings;
    const { timeRemaining, currentWord, remainingWords, passedWordsThisTurn } = prev.game;

    // Vérifier qu'il y a assez de temps
    if (timeRemaining < passPenalty) return prev;

    // 1. Décrémenter le temps
    const newTimeRemaining = timeRemaining - passPenalty;

    // 2. Ajouter le mot aux mots passés
    const newPassedWords = [...passedWordsThisTurn, currentWord];

    // 3. Retirer le mot du pool
    const newRemainingWords = remainingWords.filter(w => w !== currentWord);

    // 4. Prendre le prochain mot
    const newCurrentWord = newRemainingWords[0] || null;

    return {
      ...prev,
      game: {
        ...prev.game,
        currentWord: newCurrentWord,
        passedWordsThisTurn: newPassedWords,
        remainingWords: newRemainingWords,
        timeRemaining: newTimeRemaining,
      },
    };
  });
};
```

**Écran de vérification - Mots passés** :
```javascript
// Créer une liste mixte avec métadonnées
const allWords = [
  ...wordsGuessedThisTurn.map(word => ({ word, isPassed: false })),
  ...passedWordsThisTurn.map(word => ({ word, isPassed: true }))
];

// Les mots passés commencent invalidés (rouges)
const [invalidatedWords, setInvalidatedWords] = useState(
  new Set(passedWordsThisTurn)
);

// Affichage avec label "(passé)"
{allWords.map(({ word, isPassed }, index) => {
  const isInvalidated = invalidatedWords.has(word);
  return (
    <button onClick={() => toggleWordInvalidation(word)} className={...}>
      <span className={isInvalidated ? 'text-red-500' : 'text-green-500'}>
        {isInvalidated ? '✗' : '✓'}
      </span>
      <div className="flex items-center gap-2">
        <span>{word}</span>
        {isPassed && (
          <span className="text-xs text-yellow-500 font-semibold">(passé)</span>
        )}
      </div>
    </button>
  );
})}
```

**Validation finale** :
```javascript
// ✅ BON - Inclure tous les mots (devinés ET passés validés)
const handleValidate = () => {
  const validatedWords = allWords
    .map(({word}) => word)
    .filter(word => !invalidatedWords.has(word));
  actions.validateWords(validatedWords);
};
```

**Tests obligatoires** :
- [ ] Slider "Temps de pénalité" existe dans les paramètres (0-10s)
- [ ] Bouton "Passer" affiche "Passer" si pénalité = 0
- [ ] Bouton "Passer" affiche "Passer (-Xs)" si pénalité > 0
- [ ] Bouton désactivé si temps restant < pénalité
- [ ] Cliquer sur "Passer" décrémente le timer immédiatement
- [ ] Mots passés apparaissent en rouge dans la vérification
- [ ] Label "(passé)" affiché en jaune à côté des mots passés
- [ ] Mots passés peuvent être validés (rouge → vert)
- [ ] Mots passés validés comptent pour le score
- [ ] Mots passés non validés retournent au pool
- [ ] Pas de section "MOT SUIVANT" dans TurnScreen
- [ ] Pas de `reserveWord` dans le code

### 9. Bugs critiques corrigés - Timer et temps bonus
**Contexte** : Bugs liés à la gestion du temps

**Bug #1 : Timer ne se met pas à jour lors du passage d'un mot**

**Problème** : Quand on clique sur "Passer", le timer du contexte est mis à jour mais pas le timer local du hook `useTimer`

**Solution** : Ajout de `setTimeManually()` dans useTimer.js
```javascript
// Modification dans useTimer.js
const setTimeManually = (newTime) => {
  if (newTime <= 0) {
    setTimeRemaining(0);
    setIsRunning(false);
    if (onTimeUp) {
      onTimeUp(); // Déclenche endTurn(0)
    }
  } else {
    setTimeRemaining(newTime);
  }
};

// Utilisation dans TurnScreen.jsx
const handlePass = () => {
  if (!isPaused && timeRemaining >= settings.passPenalty) {
    const newTime = timeRemaining - settings.passPenalty;
    actions.passWord(); // Mise à jour du contexte
    setTimeManually(newTime); // Mise à jour immédiate du timer local
  }
};
```

**Bug #2 : Timer à 0 seconde bloque le jeu**

**Problème** : Si on passe un mot avec exactement le temps de pénalité (ex: 5s), le timer passe à 0 mais `onTimeUp()` n'est jamais appelé, le tour ne se termine pas

**Solution** : Dans `setTimeManually()`, vérifier si `newTime <= 0` et appeler `onTimeUp()`

**Bug #3 : Temps bonus perdu entre les manches**

**Problème** : Si on termine une manche avec 12s restantes, ce temps devrait être conservé pour le premier tour de la manche suivante, mais il est perdu

**Cause** : Dans `validateWords()`, quand la manche se termine, `turnBonusTime` n'est pas préservé explicitement

**Solution** : Préserver `turnBonusTime` dans le bloc de fin de manche
```javascript
// Dans validateWords() - Fin de manche
if (newRemainingWords.length === 0) {
  return {
    ...prev,
    teams: updatedTeams,
    game: {
      ...prev.game,
      history: [...prev.game.history, historyEntry],
      remainingWords: newRemainingWords,
      currentScreen: 'transition',
      turnBonusTime: prev.game.timeRemaining, // ← CRUCIAL : Préserver le temps
    },
  };
}
```

**Flux complet du temps bonus** :
1. Fin de tour avec 12s → `endTurn(12)` → `game.timeRemaining = 12`
2. Validation des mots, manche terminée → `turnBonusTime = prev.game.timeRemaining = 12`
3. TransitionScreen → `turnBonusTime` préservé dans LocalStorage
4. `nextRound()` → Préserve `turnBonusTime = 12` (ligne 561)
5. `startTurn()` → `timeRemaining = turnBonusTime || turnDuration = 12`
6. TurnScreen → Timer démarre avec 12s ✅

**Mécanique similaire à la suspension** :
- La suspension préserve `game.timeRemaining` sans le toucher
- Le temps bonus utilise la même approche : préserver l'état existant
- Pas de logique complexe, juste une copie fidèle de l'état

**Tests obligatoires** :
- [ ] Passer un mot avec 10s restantes et pénalité 5s → timer à 5s instantanément
- [ ] Passer un mot avec 5s restantes et pénalité 5s → timer à 0s, tour se termine automatiquement
- [ ] Terminer une manche avec 15s → Même joueur rejoue avec 15s (pas 30s)
- [ ] Invalider des mots → Temps bonus perdu, joueur suivant avec temps normal
- [ ] Temps bonus préservé à travers : validation → transition → nextRound → startTurn

---

## 🔧 STACK TECHNIQUE (NE PAS DÉVIER)

### Frontend
- **Framework** : React 18+ avec Hooks (pas de class components)
- **Build tool** : Vite
- **Styling** : Tailwind CSS uniquement
- **Icons** : Lucide React
- **Animations** : Framer Motion (si besoin d'animations complexes)

### Interdictions
- ❌ Pas de jQuery
- ❌ Pas de Bootstrap
- ❌ Pas de Material-UI ou autre UI library
- ❌ Pas de inline styles (sauf exceptions pour animations)
- ❌ Pas de CSS modules
- ❌ Pas de styled-components

---

## 📂 STRUCTURE DE FICHIERS (RIGIDE)

```
src/
├── components/
│   ├── screens/          ← Tous les écrans
│   ├── ui/               ← Composants UI réutilisables
│   └── game/             ← Composants spécifiques au jeu
├── context/
│   └── GameContext.jsx   ← État global UNIQUE
├── hooks/
│   └── *.js              ← Hooks personnalisés
├── utils/
│   └── *.js              ← Fonctions utilitaires
├── App.jsx               ← Point d'entrée
└── main.jsx              ← Bootstrap React
```

**Règle** : Chaque nouveau fichier doit aller dans le bon dossier. Ne PAS créer de nouveaux dossiers.

---

## ✍️ COMMENTAIRES

### Quand commenter
```javascript
// ✅ BON - Explication d'une logique complexe
// Échange le mot principal avec le mot en réserve
// et tire un nouveau mot pour la réserve
const handlePassWord = () => {
  const newReserve = drawRandomWord(remainingWords);
  // ...
};

// ❌ INUTILE - Évident
// Incrémente le compteur
setCounter(counter + 1);
```

### Format
- **Fonctions** : JSDoc pour les utilitaires
```javascript
/**
 * Génère N mots aléatoires uniques
 * @param {number} count - Nombre de mots à générer
 * @param {array} excludeWords - Mots à exclure
 * @returns {array} Tableau de mots uniques
 */
function generateRandomWords(count, excludeWords = []) {
  // ...
}
```

---

## 🐛 GESTION DES ERREURS

### Toujours gérer les cas limites
```javascript
// ✅ BON - Gestion défensive
const drawRandomWord = (remainingWords) => {
  if (!remainingWords || remainingWords.length === 0) {
    console.error('Aucun mot disponible');
    return null;
  }
  // ...
};

// ❌ MAUVAIS - Peut crasher
const drawRandomWord = (remainingWords) => {
  return remainingWords[Math.floor(Math.random() * remainingWords.length)];
};
```

### Messages d'erreur utilisateur
- ❌ Pas de jargon technique : "TypeError: Cannot read property"
- ✅ Messages clairs : "Impossible de charger les mots. Veuillez réessayer."

---

## ⚡ PERFORMANCE

### Optimisations requises
- Utiliser `React.memo` pour composants lourds qui re-render souvent
- Utiliser `useMemo` pour calculs coûteux
- Utiliser `useCallback` pour fonctions passées en props

```javascript
// ✅ BON - Optimisation du timer
const Timer = React.memo(({ timeRemaining }) => {
  return <div className="text-4xl">{timeRemaining}s</div>;
});

// ✅ BON - Mémorisation d'un calcul
const sortedPlayers = useMemo(() => {
  return players.sort((a, b) => a.score - b.score);
}, [players]);
```

---

## 🧪 TESTS ET VALIDATION

### Avant chaque commit, vérifier :
- [ ] Aucun warning dans la console
- [ ] Aucune erreur ESLint
- [ ] Application fonctionne sur mobile (responsive)
- [ ] Animations fluides (60 FPS)
- [ ] LocalStorage fonctionne (sauvegarde/chargement)

### Test manuel requis
- [ ] Parcours complet d'une partie (de A à Z)
- [ ] Cas limites : 4 équipes, 20 joueurs
- [ ] Validation des doublons (noms, mots)
- [ ] Vérification des mots après chaque tour

### ⚠️ Tests critiques anti-bugs
- [ ] **Réactivité des paramètres** :
  - Changer le nombre de joueurs de 6 à 10 → 4 nouveaux encadrés apparaissent
  - Changer le nombre de mots de 7 à 5 → Tous les "[X/7]" deviennent "[X/5]"
  - Retourner à l'écran des paramètres et modifier → Pas de crash
  
- [ ] **Compteur de mots restants** :
  - Début de tour : Vérifier que le compteur affiche bien 42 (si 6 joueurs × 7 mots)
  - Validation d'un mot : Le compteur décrémente de 1
  - Dernier mot : Le compteur affiche "Mots restants : 1" (pas 0)
  - Vérifier dans la console : `console.log(remainingWords.length)` doit correspondre
  
- [ ] **Conservation du nombre total** :
  - Console : `allWords.length === numberOfPlayers * wordsPerPlayer` au début
  - Fin de manche : Somme des mots devinés par toutes les équipes = nombre total
  - Mots invalidés : Vérifier qu'ils réapparaissent plus tard dans le jeu
  
- [ ] **Continuité entre manches** :
  - Finir une manche avec le joueur 3 de l'équipe 2 (temps restant : 7s)
  - Manche suivante : Vérifier que c'est bien le joueur 3 équipe 2 qui commence
  - Vérifier que le chronomètre démarre à 7s (pas 30s)

- [ ] **Rotation aléatoire des joueurs** :
  - Au démarrage : `console.log(teamOrder, teamPlayerOrders)` → Vérifier ordres aléatoires
  - Jouer 10 tours : Vérifier que la séquence suit bien l'algorithme
  - Entre manches : Vérifier que `teamOrder` ne change PAS
  - Tour 15 de manche 1 → Tour 16 de manche 2 (continuité)
  
- [ ] **Temps bonus** :
  - Finir une manche avec 18s restantes
  - Valider les mots → Même joueur, chrono à 18s
  - Invalider des mots → Joueur suivant, chrono à 30s
  - `console.log(bonusTime, bonusPlayerTurnNumber)` pour débugger
  
- [ ] **Réinitialisation complète** :
  - Cliquer "Réinitialiser" → Pop-up s'affiche
  - Pop-up contient liste détaillée (joueurs, mots, équipes, scores, paramètres)
  - Annuler → Aucun changement
  - Confirmer → Vérifier dans console : `players: [], teams: [], globalTurnNumber: 0`
  - localStorage vidé : `localStorage.getItem('guessItAll_gameState')` doit être null
  - Reste sur écran paramètres (PAS de redirection)
  - Relancer une nouvelle partie → Pas de bug

- [ ] **Système de vérification toggle** :
  - Écran de vérification : Tous les mots en ✓ vert au départ
  - Cliquer sur un mot validé → Devient ✗ rouge (invalidé)
  - Cliquer sur un mot invalidé → Redevient ✓ vert (validé)
  - Basculer plusieurs fois → Fonctionne sans problème
  - Compteur "Mots validés : X / Y" se met à jour en temps réel
  - Valider avec mots invalidés → Mots retournent dans pool
  - Cliquer n'importe où sur l'encadré (pas juste icône) → Toggle fonctionne

- [ ] **Interface de jeu simplifiée** :
  - Pas d'encadré "Équipe/Joueur/Score du tour" en haut
  - Chronomètre en text-8xl (96px minimum)
  - "Mots restants : X" affiché en bas de l'écran
  - Pas de texte "Mode : Mime" visible
  - Interface épurée : chrono → mot → mot suivant → compteur
  - Lisibilité améliorée sur mobile et desktop

---

## 📱 RESPONSIVE DESIGN

### Breakpoints (Tailwind)
```javascript
// Mobile-first approach
<div className="p-4 md:p-8 lg:p-12">
  // p-4 sur mobile, p-8 sur tablette, p-12 sur desktop
</div>
```

### Règles
- Toujours tester sur mobile en priorité
- Utiliser `min-w-full` pour boutons sur mobile
- Réduire les font-sizes sur mobile (`text-lg md:text-2xl`)

---

## 🔐 SÉCURITÉ ET BONNES PRATIQUES

### Validation des inputs
```javascript
// ✅ BON - Validation stricte
const addPlayer = (name) => {
  const trimmedName = name.trim();
  if (trimmedName.length === 0) {
    return { error: 'Le nom est requis' };
  }
  if (players.some(p => p.name === trimmedName)) {
    return { error: 'Ce nom existe déjà' };
  }
  // ...
};
```

### LocalStorage
```javascript
// ✅ BON - Gestion d'erreur
const saveGameState = (state) => {
  try {
    localStorage.setItem('guessItAll_gameState', JSON.stringify(state));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
  }
};
```

---

## 🎯 CHECKLIST AVANT CHAQUE MODIFICATION

Avant d'ajouter/modifier du code, Claude doit se poser ces questions :

1. ✅ Est-ce que cette approche existe déjà dans le code ?
2. ✅ Est-ce que je respecte les conventions de nommage ?
3. ✅ Est-ce que j'utilise Tailwind (pas de CSS isolé) ?
4. ✅ Est-ce que je mets le fichier au bon endroit ?
5. ✅ Est-ce que je respecte la charte graphique (couleurs, polices) ?
6. ✅ Est-ce que je gère les cas d'erreur ?
7. ✅ Est-ce que mon code est commenté si complexe ?
8. ✅ Est-ce que j'optimise les re-renders si nécessaire ?

### ⚠️ CHECKLIST ANTI-BUGS CRITIQUES (À VÉRIFIER SYSTÉMATIQUEMENT)

**Pour la logique de rotation** :
- [ ] `teamOrder` et `teamPlayerOrders` générés UNE SEULE FOIS au début
- [ ] Ces ordres sont-ils conservés entre les 3 manches ?
- [ ] `globalTurnNumber` continue-t-il d'incrémenter (ne se réinitialise pas) ?
- [ ] L'algorithme `getCurrentPlayer()` est-il utilisé partout ?
- [ ] Pas de logique séquentielle simple (J1E1 → J1E2 → J2E1) ?

**Pour les écrans de configuration/saisie** :
- [ ] Les encadrés sont-ils dynamiques (basés sur `settings.numberOfPlayers`) ?
- [ ] Les dénominateurs "[X/Y]" se mettent-ils à jour si `settings.wordsPerPlayer` change ?
- [ ] Retourner à l'écran des paramètres et modifier fonctionne-t-il sans bug ?

**Pour la gestion du pool de mots** :
- [ ] `allWords.length === numberOfPlayers × wordsPerPlayer` est vérifié ?
- [ ] Le compteur "Mots restants" affiche-t-il `remainingWords.length` directement ?
- [ ] Le mot courant et le mot suivant sont-ils INCLUS dans `remainingWords` ?
- [ ] Les mots invalidés retournent-ils bien dans `remainingWords` ?
- [ ] À chaque nouvelle manche, le pool est-il réinitialisé à 100% ?

**Pour la continuité entre manches** :
- [ ] Le même joueur continue-t-il à la manche suivante (pas de reset) ?
- [ ] Le temps restant est-il conservé et réutilisé ?
- [ ] L'ordre des joueurs continue-t-il là où il s'était arrêté ?
- [ ] `globalTurnNumber` ne s'incrémente-t-il PAS lors d'un tour bonus ?

**Pour la réinitialisation** :
- [ ] Pop-up de confirmation s'affiche-t-il avec liste détaillée (5 points) ?
- [ ] Message "Cette action est irréversible" présent ?
- [ ] Tous les tableaux sont-ils vidés (players, teams, allWords, etc.) ?
- [ ] `globalTurnNumber`, `teamOrder`, `teamPlayerOrders` sont-ils à 0/null ?
- [ ] Le localStorage est-il correctement vidé via `clearLocalStorage()` ?
- [ ] Reste sur l'écran des paramètres (PAS de redirection vers home) ?

**Pour la vérification des mots** :
- [ ] Système toggle fonctionne-t-il (validé ↔ invalidé réversible) ?
- [ ] Tous les mots démarrent en état "validé" (✓ vert) ?
- [ ] Clic sur encadré entier bascule l'état (pas juste l'icône) ?
- [ ] Compteur "Mots validés : X / Y" se met-il à jour en temps réel ?
- [ ] Mots invalidés retournent-ils dans `remainingWords` ?

**Pour l'interface de jeu** :
- [ ] Chronomètre en `text-8xl` (96px, très gros) ?
- [ ] Pas d'encadré "Équipe/Joueur/Score" en haut ?
- [ ] "Mots restants" affiché en bas (pas en haut) ?
- [ ] Pas de texte "Mode : Mime" ou similaire ?
- [ ] Interface épurée et lisible ?

---

## 🚀 RÉSUMÉ : LES 5 COMMANDEMENTS

1. **Cohérence absolue** : Analyser l'existant AVANT d'écrire du code
2. **Tailwind only** : Pas de CSS isolé sauf exceptions (animations)
3. **Structure rigide** : Respecter l'arborescence des dossiers
4. **Charte graphique** : Uniquement les couleurs et polices définies
5. **Qualité** : Gérer les erreurs, optimiser, tester

---



**En cas de doute, TOUJOURS privilégier la cohérence avec l'existant plutôt que d'introduire une nouvelle approche.**

**Ce document est la loi du projet. Toute déviation doit être justifiée explicitement.**