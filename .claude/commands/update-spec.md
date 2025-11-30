# Mise à jour du SPECIFICATION.md

Tu es un expert en rédaction de spécifications fonctionnelles orientées utilisateur.

## 🎯 Ta mission

Analyse la session de développement actuelle et **mets à jour UNIQUEMENT le fichier SPECIFICATION.md** si tu identifies des modifications graphiques ou fonctionnelles du point de vue de l'utilisateur.

## 📋 Règles ABSOLUES

### 1. REMPLACER, PAS AJOUTER

Le SPECIFICATION.md est une **photo instantanée** de l'application MAINTENANT.

❌ **INTERDIT** :
```markdown
**Avant** : Le bouton affichait X
**Maintenant** : Le bouton affiche Y
**Changement du 15/01** : ...
```

✅ **CORRECT** :
```markdown
**Bouton Réinitialiser** :
- Affiche une popup de confirmation
- Liste détaillée de 5 éléments
- Deux boutons : Annuler (gris) / Réinitialiser (rouge)
```

### 2. VOCABULAIRE ORIENTÉ UTILISATEUR

❌ **INTERDIT** :
- "Le composant VerificationScreen"
- "Le state invalidatedWords"
- "La fonction handleClick"
- "Le fichier GameContext.jsx"

✅ **CORRECT** :
- "L'utilisateur voit"
- "L'utilisateur clique sur"
- "L'écran affiche"
- "Le bouton déclenche"

### 3. PAS D'HISTORIQUE

- Pas de dates
- Pas de mentions "Version X.Y"
- Pas de "Changements récents"
- Juste : **VOICI COMMENT ÇA FONCTIONNE MAINTENANT**

## 🔍 Processus d'analyse

### Étape 1 : Identifier les changements utilisateur

Réponds à ces questions :

1. **Qu'est-ce qui a VISUELLEMENT changé ?**
   - Nouveaux écrans ?
   - Modifications de layouts ?
   - Changements de couleurs, tailles, positions ?
   - Nouveaux éléments d'interface ?

2. **Qu'est-ce qui a FONCTIONNELLEMENT changé ?**
   - Nouveaux comportements ?
   - Modifications de règles ?
   - Nouvelles interactions ?
   - Changements dans le déroulement ?

### Étape 2 : Identifier les sections concernées

Exemple :
- Changement du bouton de réinitialisation → Section "Écran : Configuration de la partie"
- Nouveau système de vérification → Section "Écran : Vérification des mots"
- Simplification de l'interface de jeu → Section "Écran : Tour de jeu"
- Nouveau timer basé horloge → Section "Écran : Tour de jeu" + "Cas particuliers"

### Étape 3 : Rédiger la mise à jour

Pour chaque section modifiée, **REMPLACE** le contenu existant par une description complète de l'état actuel.

**Template à suivre** :

```markdown
### Écran : [Nom de l'écran]

**Interface** :
- [Description visuelle complète]
- [Tous les éléments affichés]
- [Couleurs, tailles, positions si pertinent]

**Comportements** :
- [Action 1] : [ce qui se passe exactement]
- [Action 2] : [ce qui se passe exactement]
- Si [condition] : [comportement spécifique]

**États possibles** (si applicable) :
- État A : [description visuelle et comportement]
- État B : [description visuelle et comportement]

**Règles** :
- [Contraintes et validations]
```

## ✅ Checklist de qualité

Avant de proposer une mise à jour, vérifie :

- [ ] Chaque modification est décrite du point de vue utilisateur (pas de code)
- [ ] Les comportements sont clairs et non ambigus
- [ ] Il n'y a AUCUNE mention d'historique ou de date
- [ ] Il n'y a AUCUNE mention de code, composants ou fichiers
- [ ] Les descriptions sont précises (un designer pourrait créer les maquettes)
- [ ] Un développeur pourrait implémenter en lisant la spec
- [ ] La lecture est fluide du début à la fin

## 🎯 Action à effectuer

1. **Analyse la session** : Identifie tous les changements utilisateur
2. **Lis le SPECIFICATION.md actuel** : Comprends la structure existante
3. **Propose des modifications** en utilisant l'outil Edit pour REMPLACER les sections concernées
4. **Explique brièvement** quelles sections tu as mises à jour et pourquoi

## ⚠️ Important

- Ne modifie QUE les sections qui ont réellement changé
- Si rien n'a changé du point de vue utilisateur, réponds "Aucune mise à jour nécessaire"
- Si tu as un doute sur un changement, demande confirmation avant de modifier
- Concentre-toi sur les modifications graphiques et fonctionnelles VISIBLES par l'utilisateur

---

**Commence par lister les changements utilisateur identifiés, puis propose les mises à jour du SPECIFICATION.md.**
