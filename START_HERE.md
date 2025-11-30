# 🎯 Guess It All - COMMENCEZ ICI

## ✅ Projet 100% terminé et fonctionnel !

Félicitations ! Le jeu **Guess It All** est entièrement développé et prêt à être utilisé.

---

## 🚀 Démarrage en 3 étapes

### 1. Les dépendances sont déjà installées ✅

Si ce n'est pas le cas :
```bash
npm install
```

### 2. Lancez le serveur de développement

```bash
npm run dev
```

L'application sera accessible à : **http://localhost:5173**

### 3. Jouez !

Ouvrez votre navigateur et amusez-vous ! 🎉

---

## 📁 Fichiers importants

| Fichier | Description |
|---------|-------------|
| **README.md** | Documentation complète du projet |
| **PROJECT_SUMMARY.md** | Résumé technique et fonctionnalités |
| **DEPLOYMENT.md** | Guide de déploiement (Vercel, Netlify, etc.) |
| **CLAUDE.md** | Directives de développement (pour modifications futures) |

---

## 🎮 Fonctionnalités

- ✅ **Configuration complète** : 2-4 équipes, 4-20 joueurs, paramètres avancés
- ✅ **10+ catégories de mots** (Films, Animaux, Pokémon, Clash Royale...)
- ✅ **3 manches** avec modes différents (Description / Un mot / Mime)
- ✅ **Chronomètre** avec temps personnalisable (20-60s)
- ✅ **Système de pénalité** pour passer un mot (0-10s)
- ✅ **Drag & drop** pour la constitution des équipes
- ✅ **Sauvegarde automatique** (LocalStorage)
- ✅ **Design moderne** avec animations d'étoiles filantes
- ✅ **100% responsive** (mobile, tablet, desktop)

---

## 🏗️ Architecture technique

- **React 18** + **Vite** (ultra-rapide)
- **Tailwind CSS** (design utility-first)
- **Lucide React** (icônes modernes)
- **GameContext** (gestion d'état globale)
- **LocalStorage** (persistance des données)

### Statistiques du code

- **25+ fichiers** JS/JSX
- **12 écrans** de jeu
- **7 composants** UI réutilisables
- **~8000+ lignes** de code
- **10+ catégories** de mots thématiques

---

## 📖 Structure du projet

```
guess-it-all/
├── src/
│   ├── components/
│   │   ├── screens/        # 12 écrans (Home, Settings, Players, etc.)
│   │   ├── ui/             # Composants UI (Button, Input, Slider, etc.)
│   │   └── game/           # Composants de jeu
│   ├── context/
│   │   └── GameContext.jsx # État global de l'application
│   ├── hooks/
│   │   └── useTimer.js     # Hook personnalisé pour le chronomètre
│   ├── utils/
│   │   ├── wordDatabase.js # Utilitaires de génération
│   │   └── wordCategories.js # 10+ catégories thématiques
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css           # Styles globaux + animations
├── public/
│   └── index.html
├── README.md               # Documentation
├── DEPLOYMENT.md           # Guide de déploiement
├── PROJECT_SUMMARY.md      # Résumé technique
└── package.json
```

---

## 🎯 Règles du jeu (Rappel)

1. **Configuration** : Paramétrez la partie (équipes, joueurs, catégories de mots)
2. **Préparation** : Chaque joueur entre son nom et choisit ses mots (ou génération automatique)
3. **Formation** : Les équipes sont formées aléatoirement (ajustables par drag & drop)
4. **Jeu** : 3 manches avec des modes différents
   - Manche 1 : Description verbale (illimité)
   - Manche 2 : Un seul mot
   - Manche 3 : Mime (sans parler)
5. **Points** : 1 point par mot deviné
6. **Résultats** : L'équipe avec le plus de points gagne ! 🏆

---

## 🚢 Déploiement (Optionnel)

Pour partager votre jeu en ligne :

### Option la plus simple : Vercel (gratuit, 2 minutes)

```bash
npm install -g vercel
vercel --prod
```

Votre jeu sera accessible sur une URL publique (ex: guess-it-all.vercel.app) !

Consultez **DEPLOYMENT.md** pour plus d'options (Netlify, GitHub Pages, etc.)

---

## 🔧 Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lancer en mode développement |
| `npm run build` | Créer le build de production |
| `npm run preview` | Prévisualiser le build de production |

---

## 🐛 En cas de problème

1. **Vérifiez Node.js** : `node --version` (doit être ≥ 18)
2. **Réinstallez les dépendances** : `rm -rf node_modules && npm install`
3. **Vérifiez la console** : Ouvrez les DevTools (F12) et consultez la console
4. **Effacez le cache** : Supprimez le LocalStorage (DevTools → Application → LocalStorage)

---

## 📞 Support

Le code est entièrement commenté et structuré. Consultez :
- **CLAUDE.md** : Directives de développement
- **PROJECT_SUMMARY.md** : Détails techniques
- Les fichiers source : Tous les composants sont commentés

---

## 🎉 Prêt à jouer ?

```bash
npm run dev
```

Puis ouvrez : **http://localhost:5173**

**Amusez-vous bien ! 🎮🎯🎉**

---

*Développé avec ❤️ pour des soirées conviviales entre amis et famille.*
