# Instructions pour Claude - Projet "Guess It All"

## Objectif
Directives pour maintenir la **cohérence** et la **qualité** du code.

---

## RÈGLE ABSOLUE : COHÉRENCE AVEC L'EXISTANT

**AVANT toute modification, Claude DOIT** :
1. Analyser le code existant (conventions, patterns, librairies)
2. Respecter strictement ces conventions
3. NE JAMAIS introduire de nouvelles approches si une solution existe

---

## INTERDICTIONS STRICTES

| Interdit | Correct |
|----------|---------|
| CSS isolé / CSS modules | Tailwind CSS uniquement |
| Nouvelles librairies (Redux, etc.) | React Context (`GameContext`) |
| Nouveaux dossiers | Structure existante |
| jQuery, Bootstrap, Material-UI | Stack actuelle |
| Inline styles | Tailwind classes |

**Exception CSS** : Animations complexes (étoiles filantes) dans `index.css`

---

## CONVENTIONS

### Nommage
- **Composants** : PascalCase (`HomeScreen.jsx`)
- **Hooks** : camelCase + `use` (`useTimer.js`)
- **Utilitaires** : camelCase (`wordDatabase.js`)
- **Variables/fonctions** : camelCase
- **Constantes** : SCREAMING_SNAKE_CASE

### Structure composants React
```javascript
// 1. Imports → 2. Composant → 3. Hooks → 4. Handlers → 5. Effects → 6. Return
```

### Classes Tailwind (ordre)
Layout → Spacing → Sizing → Typography → Colors → Effects

---

## CHARTE GRAPHIQUE

### Couleurs
```javascript
background: '#1e293b'    // Fond bleu marine
primary: '#f19b9b'       // Rose saumon (actions principales)
secondary: '#7dd3c0'     // Turquoise (actions secondaires)
success: '#10B981'       // Vert
error: '#e88b8b'         // Rouge
team1: '#f19b9b'         // Rose
team2: '#7dd3c0'         // Turquoise
team3: '#a78bfa'         // Violet
team4: '#fbbf24'         // Jaune
```

### Polices
- **Titres** : `Bangers` (+ text-shadow rouge)
- **Textes** : `Poppins`

### Arrondis
- Petits : `rounded-lg`
- Moyens : `rounded-xl`
- Grands : `rounded-2xl`
- Boutons ronds : `rounded-full`

---

## STRUCTURE DES FICHIERS

```
src/
├── components/
│   ├── screens/     # 13 écrans
│   ├── ui/          # 8 composants réutilisables
│   └── game/        # Composants spécifiques
├── context/
│   └── GameContext.jsx
├── hooks/
│   └── useTimer.js
├── utils/
│   ├── wordDatabase.js
│   └── wordCategories.js
├── App.jsx
└── main.jsx
```

---

## STACK TECHNIQUE

- **React 18+** avec Hooks (pas de class components)
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Lucide React** (icônes)

---

## POINTS CRITIQUES

### 1. Rotation des joueurs
- `teamOrder` et `teamPlayerOrders` générés UNE SEULE FOIS au début
- `globalTurnNumber` ne se réinitialise JAMAIS entre les manches
- Algorithme dans `getCurrentPlayer()` du GameContext

### 2. Compteur "Mots restants"
```
Mots restants = remainingWords.length
```
Le mot courant EST dans `remainingWords`. Pas de soustraction manuelle.

### 3. Conservation du nombre total de mots
```
Total = numberOfPlayers × wordsPerPlayer
```
- Vérifié au démarrage et à chaque manche
- Mots invalidés retournent dans le pool

### 4. Temps bonus entre manches
- Si un joueur finit une manche avec du temps restant, il garde ce temps pour la manche suivante
- `turnBonusTime` préservé dans : `validateWords()` → `nextRound()` → `startTurn()`

### 5. Système de pénalité (passer un mot)
- `passPenalty` : 0-10 secondes (configurable)
- Mots passés dans `passedWordsThisTurn`
- Mots passés commencent invalidés (rouges) dans l'écran de vérification

### 6. Interface simplifiée
- Popups : titre + message (optionnel) + 2 boutons
- Pas d'encadrés autour des inputs
- Pas de compteurs "[X joueurs]" dans les équipes
- Chronomètre en `text-8xl`

---

## GESTION DES ERREURS

```javascript
// Toujours gérer les cas limites
if (!remainingWords || remainingWords.length === 0) {
  console.error('Aucun mot disponible');
  return null;
}
```

Messages utilisateur clairs, pas de jargon technique.

---

## TESTS ESSENTIELS

Avant commit :
- [ ] Aucun warning/erreur console
- [ ] Responsive (mobile/tablet/desktop)
- [ ] LocalStorage fonctionne
- [ ] Parcours complet d'une partie

Tests critiques :
- [ ] Rotation joueurs persiste entre manches
- [ ] Temps bonus conservé si manche terminée avec temps restant
- [ ] Mots invalidés retournent dans le pool
- [ ] Réinitialisation vide tout (players, teams, localStorage)

---

## RÉSUMÉ

1. **Cohérence** : Analyser l'existant avant d'écrire
2. **Tailwind only** : Pas de CSS isolé
3. **Structure rigide** : Respecter l'arborescence
4. **Charte graphique** : Couleurs et polices définies
5. **Qualité** : Gérer les erreurs, tester

**En cas de doute, privilégier la cohérence avec l'existant.**
