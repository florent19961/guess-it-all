import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateRandomWords } from '../utils/wordDatabase';

const GameContext = createContext();

/**
 * Hook pour accéder au GameContext
 * @returns {object} Context value avec state et actions
 */
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

/**
 * État initial de l'application
 */
const getInitialState = () => ({
  // Paramètres de la partie
  settings: {
    numberOfTeams: 2,
    numberOfPlayers: 6,
    wordChoice: 'personnalisé', // ou 'aléatoire'
    wordsPerPlayer: 7,
    turnDuration: 30,
    passPenalty: 5, // Temps de pénalité en secondes pour passer un mot (0-10)
    selectedCategories: ['films', 'pays', 'animaux'], // Catégories pour génération aléatoire
  },

  // Joueurs
  players: [],

  // Équipes
  teams: [],

  // État du jeu
  game: {
    currentScreen: 'home',
    currentRound: 1, // 1, 2 ou 3
    currentTurn: 1,
    currentTeamIndex: 0,
    currentPlayerIndexInTeam: 0,

    // Rotation des joueurs (ordre aléatoire persistant)
    teamPlayOrder: [], // Ordre cyclique des équipes [1, 0, 2, 1, 0, 2, ...]
    playerOrderByTeam: {}, // Ordre des joueurs par équipe {team1: [2,0,1], team2: [1,0]}
    currentTurnIndex: 0, // Index global dans teamPlayOrder

    // Pool de mots
    allWords: [], // Tous les mots au début
    remainingWords: [], // Mots non encore devinés cette manche

    // Tour en cours
    currentWord: null,
    wordsGuessedThisTurn: [],
    passedWordsThisTurn: [], // Mots passés ce tour (avec pénalité de temps)
    timeRemaining: 30, // Temps restant calculé (pour affichage)
    turnBonusTime: null, // Temps bonus si manche terminée avant la fin

    // Timestamps pour timer basé sur l'horloge système
    turnStartTimestamp: null, // Timestamp de début du tour (ms)
    turnEndTimestamp: null, // Timestamp de fin calculée (ms)
    pausedTimeRemaining: null, // Temps restant quand pause activée (secondes)

    // Suspension de partie
    isGameSuspended: false, // true si une partie a été mise en pause
    suspendedScreen: null, // Écran où la partie a été suspendue

    // Historique
    history: [],
  },
});

/**
 * Provider du GameContext
 */
export const GameProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    // Essayer de charger depuis LocalStorage
    const saved = localStorage.getItem('guessItAll_gameState');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Erreur lors du chargement depuis LocalStorage:', error);
        return getInitialState();
      }
    }
    return getInitialState();
  });

  // Sauvegarder automatiquement dans LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('guessItAll_gameState', JSON.stringify(state));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans LocalStorage:', error);
    }
  }, [state]);

  /**
   * ACTIONS - PARAMÈTRES
   */

  const updateSettings = (newSettings) => {
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings,
      },
    }));
  };

  const resetSettings = () => {
    setState(prev => ({
      ...prev,
      settings: getInitialState().settings,
    }));
  };

  /**
   * ACTIONS - JOUEURS
   */

  const addPlayer = (name, allowEmpty = false) => {
    const trimmedName = name.trim();

    // Validation
    if (!trimmedName && !allowEmpty) {
      return { error: 'Le nom est requis' };
    }

    if (trimmedName && state.players.some(p => p.name === trimmedName)) {
      return { error: 'Ce nom existe déjà' };
    }

    // Ajouter le joueur
    const newPlayer = {
      id: `player-${Date.now()}-${Math.random()}`,
      name: trimmedName,
      words: [],
    };

    setState(prev => ({
      ...prev,
      players: [...prev.players, newPlayer],
    }));

    return { success: true, player: newPlayer };
  };

  const updatePlayer = (playerId, updates) => {
    setState(prev => ({
      ...prev,
      players: prev.players.map(p =>
        p.id === playerId ? { ...p, ...updates } : p
      ),
    }));
  };

  const updatePlayerWords = (playerId, words) => {
    setState(prev => ({
      ...prev,
      players: prev.players.map(p =>
        p.id === playerId ? { ...p, words } : p
      ),
    }));
  };

  const removePlayer = (playerId) => {
    setState(prev => ({
      ...prev,
      players: prev.players.filter(p => p.id !== playerId),
    }));
  };

  /**
   * ACTIONS - ÉQUIPES
   */

  const createTeams = () => {
    const { numberOfTeams } = state.settings;
    const teams = [];

    for (let i = 0; i < numberOfTeams; i++) {
      teams.push({
        id: `team-${i + 1}`,
        name: `Équipe ${i + 1}`,
        playerIds: [],
        score: 0,
        scoreByRound: [0, 0, 0],
      });
    }

    setState(prev => ({
      ...prev,
      teams,
    }));
  };

  const updateTeamName = (teamId, newName) => {
    setState(prev => ({
      ...prev,
      teams: prev.teams.map(t =>
        t.id === teamId ? { ...t, name: newName } : t
      ),
    }));
  };

  const movePlayerToTeam = (playerId, teamId) => {
    setState(prev => {
      // Retirer le joueur de toutes les équipes
      const teamsWithoutPlayer = prev.teams.map(team => ({
        ...team,
        playerIds: team.playerIds.filter(id => id !== playerId),
      }));

      // Ajouter le joueur à la nouvelle équipe
      const updatedTeams = teamsWithoutPlayer.map(team =>
        team.id === teamId
          ? { ...team, playerIds: [...team.playerIds, playerId] }
          : team
      );

      return {
        ...prev,
        teams: updatedTeams,
      };
    });
  };

  const randomizeTeams = () => {
    const { numberOfTeams } = state.settings;
    const shuffledPlayers = [...state.players].sort(() => Math.random() - 0.5);

    setState(prev => {
      const teams = prev.teams.map((team, index) => ({
        ...team,
        playerIds: [],
      }));

      // Distribuer les joueurs équitablement
      shuffledPlayers.forEach((player, index) => {
        const teamIndex = index % numberOfTeams;
        teams[teamIndex].playerIds.push(player.id);
      });

      return {
        ...prev,
        teams,
      };
    });
  };

  /**
   * ACTIONS - JEU
   */

  const startGame = () => {
    // Créer le pool de tous les mots
    const allWords = [];
    state.players.forEach(player => {
      allWords.push(...player.words);
    });

    // VALIDATION : Vérifier le nombre total de mots
    const expectedTotal = state.players.length * state.settings.wordsPerPlayer;
    if (allWords.length !== expectedTotal) {
      console.error(`ERREUR CRITIQUE: ${allWords.length} mots au lieu de ${expectedTotal}`);
    }

    // Mélanger les mots
    const shuffledWords = [...allWords].sort(() => Math.random() - 0.5);

    // Tirer le premier mot
    const currentWord = shuffledWords[0];

    // Générer l'ordre aléatoire des équipes et des joueurs
    const { teamPlayOrder, playerOrderByTeam } = generatePlayOrder(state.teams);

    // Obtenir le premier joueur selon l'ordre aléatoire
    const firstTeamIndex = teamPlayOrder[0];
    const firstPlayerIndex = playerOrderByTeam[state.teams[firstTeamIndex].id][0];

    setState(prev => ({
      ...prev,
      game: {
        ...prev.game,
        currentScreen: 'game',
        currentRound: 1,
        currentTurn: 1,
        currentTeamIndex: firstTeamIndex,
        currentPlayerIndexInTeam: firstPlayerIndex,
        teamPlayOrder,
        playerOrderByTeam,
        currentTurnIndex: 0,
        allWords: shuffledWords,
        remainingWords: shuffledWords,
        currentWord,
        wordsGuessedThisTurn: [],
        passedWordsThisTurn: [],
        timeRemaining: prev.settings.turnDuration,
        turnBonusTime: null,
        history: [],
      },
    }));
  };

  const startTurn = () => {
    // Obtenir l'équipe et le joueur actuel
    const currentTeam = state.teams[state.game.currentTeamIndex];
    const currentPlayerId = currentTeam.playerIds[state.game.currentPlayerIndexInTeam];

    setState(prev => ({
      ...prev,
      game: {
        ...prev.game,
        currentScreen: 'countdown',
        wordsGuessedThisTurn: [],
        passedWordsThisTurn: [],
        timeRemaining: prev.game.turnBonusTime || prev.settings.turnDuration,
      },
    }));

    // Après 3 secondes, passer à l'écran de tour et initialiser les timestamps
    setTimeout(() => {
      setState(prev => {
        const now = Date.now();
        const durationSeconds = prev.game.turnBonusTime || prev.settings.turnDuration;
        const durationMs = durationSeconds * 1000;

        return {
          ...prev,
          game: {
            ...prev.game,
            currentScreen: 'turn',
            turnStartTimestamp: now,
            turnEndTimestamp: now + durationMs,
            pausedTimeRemaining: null,
            timeRemaining: durationSeconds,
          },
        };
      });
    }, 3000);
  };

  const markWordAsGuessed = () => {
    setState(prev => {
      const { currentWord, remainingWords, wordsGuessedThisTurn } = prev.game;

      // Ajouter le mot actuel aux mots devinés
      const newGuessedWords = [...wordsGuessedThisTurn, currentWord];

      // Retirer le mot actuel du pool
      const newRemainingWords = remainingWords.filter(w => w !== currentWord);

      // Mélanger les mots restants pour un tirage aléatoire
      const shuffledRemainingWords = [...newRemainingWords].sort(() => Math.random() - 0.5);

      // Prendre le prochain mot du pool
      const newCurrentWord = shuffledRemainingWords.length > 0 ? shuffledRemainingWords[0] : null;

      // Vérifier si c'est la fin de la manche (plus de mots)
      if (newRemainingWords.length === 0) {
        // Fin de la manche
        return {
          ...prev,
          game: {
            ...prev.game,
            wordsGuessedThisTurn: newGuessedWords,
            remainingWords: newRemainingWords,
            currentWord: null,
            currentScreen: 'verification',
          },
        };
      }

      return {
        ...prev,
        game: {
          ...prev.game,
          currentWord: newCurrentWord,
          remainingWords: shuffledRemainingWords,
          wordsGuessedThisTurn: newGuessedWords,
        },
      };
    });
  };

  const passWord = () => {
    setState(prev => {
      const { passPenalty } = prev.settings;
      const { turnEndTimestamp, currentWord, remainingWords, passedWordsThisTurn } = prev.game;

      // Calculer le temps réel restant
      const now = Date.now();
      const currentRemaining = Math.max(0, Math.ceil((turnEndTimestamp - now) / 1000));

      // Vérifier qu'il y a assez de temps pour passer
      if (currentRemaining < passPenalty) return prev;

      // 1. Recalculer le nouveau timestamp de fin (retire la pénalité)
      const newRemainingSeconds = currentRemaining - passPenalty;
      const newEndTimestamp = now + (newRemainingSeconds * 1000);

      // 2. Ajouter le mot actuel aux mots passés
      const newPassedWords = [...passedWordsThisTurn, currentWord];

      // 3. Retirer le mot actuel du pool
      const newRemainingWords = remainingWords.filter(w => w !== currentWord);

      // 4. Mélanger les mots restants pour un tirage aléatoire
      const shuffledRemainingWords = [...newRemainingWords].sort(() => Math.random() - 0.5);

      // 5. Prendre le prochain mot
      const newCurrentWord = shuffledRemainingWords.length > 0 ? shuffledRemainingWords[0] : null;

      return {
        ...prev,
        game: {
          ...prev.game,
          currentWord: newCurrentWord,
          passedWordsThisTurn: newPassedWords,
          remainingWords: shuffledRemainingWords,
          turnEndTimestamp: newEndTimestamp,
          timeRemaining: newRemainingSeconds,
        },
      };
    });
  };

  const endTurn = () => {
    setState(prev => {
      // Calculer le temps réel restant depuis l'horloge système
      const now = Date.now();
      const timeRemaining = prev.game.turnEndTimestamp
        ? Math.max(0, Math.ceil((prev.game.turnEndTimestamp - now) / 1000))
        : 0;

      return {
        ...prev,
        game: {
          ...prev.game,
          timeRemaining,
          currentScreen: 'verification',
          // Sauvegarder le temps bonus si tous les mots ont été devinés
          turnBonusTime: prev.game.remainingWords.length === 0 ? timeRemaining : null,
          turnStartTimestamp: null,
          turnEndTimestamp: null,
        },
      };
    });
  };

  const validateWords = (validatedWords) => {
    setState(prev => {
      const currentTeam = prev.teams[prev.game.currentTeamIndex];
      const { wordsGuessedThisTurn, passedWordsThisTurn } = prev.game;

      // 1. Mots devinés mais invalidés (verts → rouges) retournent au pool
      const invalidatedGuessedWords = wordsGuessedThisTurn.filter(
        w => !validatedWords.includes(w)
      );

      // 2. Mots passés et non validés (restés rouges) retournent au pool
      const invalidatedPassedWords = passedWordsThisTurn.filter(
        w => !validatedWords.includes(w)
      );

      // Remettre tous les mots invalidés dans le pool
      const allInvalidatedWords = [...invalidatedGuessedWords, ...invalidatedPassedWords];
      const newRemainingWords = [...prev.game.remainingWords, ...allInvalidatedWords];

      // Calculer les points pour ce tour
      const pointsScored = validatedWords.length;

      // Mettre à jour le score de l'équipe
      const updatedTeams = prev.teams.map(team => {
        if (team.id === currentTeam.id) {
          const newScore = team.score + pointsScored;
          const scoreByRound = [...team.scoreByRound];
          scoreByRound[prev.game.currentRound - 1] += pointsScored;

          return {
            ...team,
            score: newScore,
            scoreByRound,
          };
        }
        return team;
      });

      // Ajouter à l'historique
      const historyEntry = {
        round: prev.game.currentRound,
        turn: prev.game.currentTurn,
        teamId: currentTeam.id,
        playerId: currentTeam.playerIds[prev.game.currentPlayerIndexInTeam],
        wordsGuessed: validatedWords,
        wordsInvalidated: allInvalidatedWords,
        wordsPassed: passedWordsThisTurn,
        timeSpent: prev.settings.turnDuration - prev.game.timeRemaining,
      };

      // Calculer le prochain joueur selon l'ordre aléatoire pré-généré
      const { nextTurnIndex, nextTeamIndex, nextPlayerIndexInTeam } = getNextPlayerWithRotation(
        prev.game.currentTurnIndex,
        prev.game.teamPlayOrder,
        prev.game.playerOrderByTeam,
        prev.teams
      );

      // Vérifier si la manche est terminée
      if (newRemainingWords.length === 0) {
        // Fin de la manche
        return {
          ...prev,
          teams: updatedTeams,
          game: {
            ...prev.game,
            history: [...prev.game.history, historyEntry],
            remainingWords: newRemainingWords,
            currentScreen: 'transition',
            turnBonusTime: prev.game.timeRemaining,
          },
        };
      }

      // Mélanger les mots restants pour le prochain tour
      const shuffledRemainingWords = [...newRemainingWords].sort(() => Math.random() - 0.5);

      // Tirer le nouveau mot pour le prochain tour
      const nextCurrentWord = shuffledRemainingWords[0];

      // Si des mots ont été invalidés, on perd le bonus de temps
      const nextTurnBonusTime = allInvalidatedWords.length > 0 ? null : prev.game.turnBonusTime;

      return {
        ...prev,
        teams: updatedTeams,
        game: {
          ...prev.game,
          currentTurn: prev.game.currentTurn + 1,
          currentTurnIndex: nextTurnIndex,
          currentTeamIndex: nextTeamIndex,
          currentPlayerIndexInTeam: nextPlayerIndexInTeam,
          remainingWords: shuffledRemainingWords,
          currentWord: nextCurrentWord,
          wordsGuessedThisTurn: [], // Réinitialiser pour le prochain tour
          passedWordsThisTurn: [], // Réinitialiser pour le prochain tour
          history: [...prev.game.history, historyEntry],
          currentScreen: 'game',
          turnBonusTime: nextTurnBonusTime,
        },
      };
    });
  };

  const nextRound = () => {
    setState(prev => {
      const nextRoundNumber = prev.game.currentRound + 1;

      if (nextRoundNumber > 3) {
        // Fin du jeu
        return {
          ...prev,
          game: {
            ...prev.game,
            currentScreen: 'results',
          },
        };
      }

      // Réinitialiser le pool de mots pour la nouvelle manche
      const shuffledWords = [...prev.game.allWords].sort(() => Math.random() - 0.5);

      // VALIDATION : Vérifier le nombre total de mots
      const expectedTotal = prev.players.length * prev.settings.wordsPerPlayer;
      if (shuffledWords.length !== expectedTotal) {
        console.error(`ERREUR CRITIQUE: ${shuffledWords.length} mots au lieu de ${expectedTotal}`);
      }

      const nextCurrentWord = shuffledWords[0];

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
          // Préserver explicitement le joueur actuel et le temps bonus pour la nouvelle manche
          currentTeamIndex: prev.game.currentTeamIndex,
          currentPlayerIndexInTeam: prev.game.currentPlayerIndexInTeam,
          currentTurnIndex: prev.game.currentTurnIndex,
          turnBonusTime: prev.game.turnBonusTime,
        },
      };
    });
  };

  const endGame = () => {
    setState(prev => ({
      ...prev,
      game: {
        ...prev.game,
        currentScreen: 'results',
      },
    }));
  };

  /**
   * Met à jour le temps restant dans le contexte (synchronisation avec le timer)
   */
  const updateTimeRemaining = (seconds) => {
    setState(prev => ({
      ...prev,
      game: {
        ...prev.game,
        timeRemaining: seconds,
      },
    }));
  };

  /**
   * ACTIONS - NAVIGATION
   */

  const goToScreen = (screenName) => {
    setState(prev => ({
      ...prev,
      game: {
        ...prev.game,
        currentScreen: screenName,
      },
    }));
  };

  /**
   * Suspend la partie en cours et retourne à l'accueil
   */
  const suspendGame = () => {
    setState(prev => {
      // Calculer le temps réel restant au moment de la suspension
      const now = Date.now();
      const pausedTime = prev.game.turnEndTimestamp
        ? Math.max(0, Math.ceil((prev.game.turnEndTimestamp - now) / 1000))
        : prev.game.timeRemaining;

      return {
        ...prev,
        game: {
          ...prev.game,
          isGameSuspended: true,
          suspendedScreen: prev.game.currentScreen, // Sauvegarder l'écran actuel
          currentScreen: 'home',
          pausedTimeRemaining: pausedTime, // Sauvegarder le temps restant
          timeRemaining: pausedTime,
        },
      };
    });
  };

  /**
   * Reprend une partie suspendue
   */
  const resumeGame = () => {
    setState(prev => {
      // Recalculer le timestamp de fin à partir du temps pausé
      const now = Date.now();
      const pausedTime = prev.game.pausedTimeRemaining || prev.game.timeRemaining;
      const newEndTimestamp = now + (pausedTime * 1000);

      return {
        ...prev,
        game: {
          ...prev.game,
          currentScreen: prev.game.suspendedScreen || 'game', // Retourner à l'écran suspendu
          isGameSuspended: false,
          suspendedScreen: null,
          turnEndTimestamp: newEndTimestamp,
        },
      };
    });
  };

  /**
   * ACTIONS - PERSISTANCE
   */

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('guessItAll_gameState', JSON.stringify(state));
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      return { error: error.message };
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('guessItAll_gameState');
      if (saved) {
        setState(JSON.parse(saved));
        return { success: true };
      }
      return { error: 'Aucune sauvegarde trouvée' };
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      return { error: error.message };
    }
  };

  const clearLocalStorage = () => {
    try {
      localStorage.removeItem('guessItAll_gameState');
      setState(getInitialState());
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      return { error: error.message };
    }
  };

  /**
   * ACTIONS - RESET
   */

  const resetGame = () => {
    setState(getInitialState());
  };

  const restartWithSamePlayers = () => {
    setState(prev => ({
      ...prev,
      game: getInitialState().game,
      teams: prev.teams.map(team => ({
        ...team,
        score: 0,
        scoreByRound: [0, 0, 0],
      })),
    }));
  };

  // Valeur du contexte
  const value = {
    state,
    actions: {
      // Paramètres
      updateSettings,
      resetSettings,

      // Joueurs
      addPlayer,
      updatePlayer,
      updatePlayerWords,
      removePlayer,

      // Équipes
      createTeams,
      updateTeamName,
      movePlayerToTeam,
      randomizeTeams,

      // Jeu
      startGame,
      startTurn,
      markWordAsGuessed,
      passWord,
      endTurn,
      validateWords,
      nextRound,
      endGame,
      updateTimeRemaining,

      // Navigation
      goToScreen,
      suspendGame,
      resumeGame,

      // Persistance
      saveToLocalStorage,
      loadFromLocalStorage,
      clearLocalStorage,

      // Reset
      resetGame,
      restartWithSamePlayers,
    },
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

/**
 * FONCTIONS UTILITAIRES
 */

/**
 * Génère l'ordre aléatoire de jeu pour les équipes et joueurs
 * @param {Array} teams - Liste des équipes
 * @returns {Object} { teamPlayOrder, playerOrderByTeam }
 */
function generatePlayOrder(teams) {
  // 1. Mélanger l'ordre des équipes
  const shuffledTeamIndices = teams.map((_, index) => index).sort(() => Math.random() - 0.5);

  // 2. Créer un cycle infini (répéter 1000 fois pour avoir assez de tours)
  const teamPlayOrder = [];
  for (let i = 0; i < 1000; i++) {
    teamPlayOrder.push(...shuffledTeamIndices);
  }

  // 3. Pour chaque équipe, mélanger l'ordre de ses joueurs
  const playerOrderByTeam = {};
  teams.forEach((team, teamIndex) => {
    const playerIndices = team.playerIds.map((_, index) => index);
    const shuffledPlayerIndices = playerIndices.sort(() => Math.random() - 0.5);

    // Créer un cycle infini pour les joueurs de cette équipe
    const cycledPlayerOrder = [];
    for (let i = 0; i < 1000; i++) {
      cycledPlayerOrder.push(...shuffledPlayerIndices);
    }

    playerOrderByTeam[team.id] = cycledPlayerOrder;
  });

  return { teamPlayOrder, playerOrderByTeam };
}

/**
 * Calcule le prochain joueur selon l'ordre aléatoire pré-généré
 * @param {number} currentTurnIndex - Index actuel dans teamPlayOrder
 * @param {Array} teamPlayOrder - Ordre cyclique des équipes
 * @param {Object} playerOrderByTeam - Ordre des joueurs par équipe
 * @param {Array} teams - Liste des équipes
 * @returns {Object} { nextTurnIndex, nextTeamIndex, nextPlayerIndexInTeam }
 */
function getNextPlayerWithRotation(currentTurnIndex, teamPlayOrder, playerOrderByTeam, teams) {
  const nextTurnIndex = currentTurnIndex + 1;
  const nextTeamIndex = teamPlayOrder[nextTurnIndex];
  const nextTeam = teams[nextTeamIndex];

  // Compter combien de fois cette équipe a déjà joué jusqu'à maintenant
  let teamPlayCount = 0;
  for (let i = 0; i <= nextTurnIndex; i++) {
    if (teamPlayOrder[i] === nextTeamIndex) {
      teamPlayCount++;
    }
  }

  // L'index du joueur est basé sur le nombre de fois que l'équipe a joué
  const playerOrderForTeam = playerOrderByTeam[nextTeam.id];
  const nextPlayerIndexInTeam = playerOrderForTeam[(teamPlayCount - 1) % playerOrderForTeam.length];

  return { nextTurnIndex, nextTeamIndex, nextPlayerIndexInTeam };
}

/**
 * Calcule le prochain joueur selon l'algorithme (OLD - conservé pour compatibilité)
 * J1 Eq1 → J1 Eq2 → J2 Eq1 → J2 Eq2 → etc.
 */
function getNextPlayer(currentTeamIndex, currentPlayerIndexInTeam, teams) {
  const totalTeams = teams.length;

  // Passer à l'équipe suivante
  let nextTeamIndex = (currentTeamIndex + 1) % totalTeams;
  let nextPlayerIndexInTeam = currentPlayerIndexInTeam;

  // Si on a fait le tour de toutes les équipes, passer au joueur suivant
  if (nextTeamIndex === 0) {
    nextPlayerIndexInTeam = currentPlayerIndexInTeam + 1;
  }

  // Gérer les équipes déséquilibrées
  // Si l'équipe actuelle n'a pas ce joueur, continuer
  while (teams[nextTeamIndex].playerIds.length <= nextPlayerIndexInTeam) {
    nextTeamIndex = (nextTeamIndex + 1) % totalTeams;
    if (nextTeamIndex === 0) {
      nextPlayerIndexInTeam++;
    }

    // Vérifier qu'on ne boucle pas à l'infini
    const maxPlayers = Math.max(...teams.map(t => t.playerIds.length));
    if (nextPlayerIndexInTeam >= maxPlayers) {
      nextPlayerIndexInTeam = 0;
    }
  }

  return { nextTeamIndex, nextPlayerIndexInTeam };
}
