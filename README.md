# Guess It All 🎯

Un jeu de devinettes multijoueurs inspiré de Time's Up, jouable directement dans votre navigateur !

## 📝 Description

**Guess It All** est un jeu web convivial où 2 à 4 équipes s'affrontent à travers 3 manches avec des modes de jeu différents. Le but : faire deviner un maximum de mots à son équipe !

### Les 3 manches

1. **Manche 1 : Description verbale** - Parlez librement pour faire deviner le mot
2. **Manche 2 : Un seul mot** - Un seul mot autorisé !
3. **Manche 3 : Mime** - Uniquement des gestes, pas de mots ni de bruits

## 🚀 Installation et lancement

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

1. Clonez ou téléchargez ce projet
2. Installez les dépendances :

```bash
npm install
```

### Lancer en mode développement

```bash
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5173`

### Build de production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

### Prévisualiser le build de production

```bash
npm run preview
```

## 🎮 Comment jouer

### 1. Configuration

- Choisissez le nombre d'équipes (2 à 4)
- Définissez le nombre de joueurs (4 à 20)
- Personnalisez les paramètres avancés (optionnel) :
  - Nombre de mots par joueur (4 à 10)
  - Durée d'un tour (20 à 60 secondes)
  - Autorisation de passer un mot

### 2. Préparation

- Chaque joueur entre son nom
- Chaque joueur choisit ses mots (ou génération aléatoire)
- Les joueurs sont répartis en équipes (manuellement ou aléatoirement)

### 3. Partie

- Les équipes jouent à tour de rôle
- À chaque tour, un joueur fait deviner des mots à son équipe pendant 30 secondes (par défaut)
- 1 point par mot deviné
- Les points sont cumulés à travers les 3 manches

### 4. Résultats

L'équipe avec le plus de points gagne ! 🏆

## 🛠️ Technologies utilisées

- **React 18** - Framework frontend
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Icônes modernes
- **Framer Motion** - Animations fluides (optionnel)
- **LocalStorage** - Sauvegarde automatique de la partie

## 📂 Structure du projet

```
guess-it-all/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── screens/        # Écrans du jeu
│   │   │   ├── HomeScreen.jsx
│   │   │   ├── SettingsScreen.jsx
│   │   │   ├── PlayersScreen.jsx
│   │   │   ├── WordsScreen.jsx
│   │   │   ├── TeamsScreen.jsx
│   │   │   ├── GameScreen.jsx
│   │   │   ├── CountdownScreen.jsx
│   │   │   ├── TurnScreen.jsx
│   │   │   ├── VerificationScreen.jsx
│   │   │   ├── TransitionScreen.jsx
│   │   │   └── ResultsScreen.jsx
│   │   ├── ui/             # Composants UI réutilisables
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Slider.jsx
│   │   │   ├── Toggle.jsx
│   │   │   ├── Counter.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── BackButton.jsx
│   │   └── game/           # Composants spécifiques au jeu
│   ├── context/
│   │   └── GameContext.jsx # Gestion d'état globale
│   ├── hooks/
│   │   └── useTimer.js     # Hook personnalisé pour le chronomètre
│   ├── utils/
│   │   └── wordDatabase.js # Base de données de 800+ mots
│   ├── App.jsx             # Point d'entrée principal
│   ├── main.jsx            # Bootstrap React
│   └── index.css           # Styles globaux
├── CLAUDE.md               # Directives de développement
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Design

### Charte graphique

- **Fond** : Bleu marine foncé (#1e293b)
- **Bouton principal** : Rose saumon (#f19b9b)
- **Bouton secondaire** : Turquoise/cyan (#7dd3c0)
- **Polices** :
  - Titres : Bangers (Google Fonts)
  - Corps de texte : Poppins (Google Fonts)
- **Effet d'ambiance** : Étoiles filantes animées

### Responsive

L'application est entièrement responsive et optimisée pour :
- 📱 Mobile (portrait et paysage)
- 📱 Tablette
- 💻 Desktop

## 🔧 Fonctionnalités

### Implémentées

- ✅ Configuration complète de la partie
- ✅ Saisie des noms et des mots
- ✅ Génération aléatoire de mots
- ✅ Constitution des équipes (manuelle ou aléatoire)
- ✅ 3 manches avec modes différents
- ✅ Système de points
- ✅ Chronomètre avec compte à rebours
- ✅ Mécanisme "Passer" (optionnel)
- ✅ Vérification des mots après chaque tour
- ✅ Sauvegarde automatique (LocalStorage)
- ✅ Résultats finaux avec podium
- ✅ Animations et transitions fluides

### À venir (Nice to have)

- ⏳ Mode sombre
- ⏳ Sons et effets sonores
- ⏳ Export des résultats (PDF/image)
- ⏳ Statistiques avancées
- ⏳ Personnalisation des couleurs d'équipes

## 🐛 Débogage

En cas de problème :

1. Vérifiez la console du navigateur (F12)
2. Vérifiez que Node.js est installé : `node --version`
3. Supprimez `node_modules` et réinstallez : `npm install`
4. Effacez le LocalStorage si nécessaire (dans DevTools → Application → LocalStorage)

## 📄 Licence

Ce projet est libre de droits. Vous pouvez l'utiliser, le modifier et le distribuer librement.

## 🙏 Crédits

- Inspiré du jeu "Time's Up"
- Développé avec ❤️ pour des soirées conviviales entre amis et famille

## 📞 Support

Pour toute question ou suggestion, ouvrez une issue sur le repository GitHub.

---

**Amusez-vous bien ! 🎉🎮**
