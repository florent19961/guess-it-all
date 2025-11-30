import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import BackButton from '../ui/BackButton';
import { generateRandomWords } from '../../utils/wordDatabase';

/**
 * Écran 3 : Saisie des noms des joueurs
 * ⚠️ RÉACTIVITÉ CRITIQUE : Le nombre d'encadrés doit varier en temps réel selon numberOfPlayers
 */
function PlayersScreen() {
  const { state, actions } = useGame();
  const { settings, players } = state;
  const { numberOfPlayers, wordsPerPlayer, wordChoice } = settings;

  // Créer un tableau de slots basé sur le nombre de joueurs
  // ✅ RÉACTIVITÉ : Cette ligne garantit que le nombre d'encadrés suit numberOfPlayers
  const playerSlots = Array.from({ length: numberOfPlayers }, (_, i) => i);

  // État local pour les noms
  const [playerNames, setPlayerNames] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  // Initialiser les joueurs si nécessaire
  useEffect(() => {
    // Si pas assez de joueurs, en créer
    if (players.length < numberOfPlayers) {
      const playersToAdd = numberOfPlayers - players.length;
      for (let i = 0; i < playersToAdd; i++) {
        const playerId = `player-${Date.now()}-${Math.random()}`;
        const playerName = ''; // Nom vide par défaut

        // Générer des mots aléatoires si "aléatoire" est sélectionné
        const words = wordChoice === 'aléatoire'
          ? generateRandomWords(wordsPerPlayer, getAllWords(), settings.selectedCategories)
          : [];

        // Créer le joueur avec un nom vide (allowEmpty = true en mode aléatoire)
        const result = actions.addPlayer(playerName, wordChoice === 'aléatoire');

        // Si mode aléatoire, ajouter les mots immédiatement
        if (result.success && words.length > 0) {
          actions.updatePlayerWords(result.player.id, words);
        }
      }
    }

    // Si trop de joueurs, en supprimer
    if (players.length > numberOfPlayers) {
      const playersToRemove = players.slice(numberOfPlayers);
      playersToRemove.forEach(player => {
        actions.removePlayer(player.id);
      });
    }
  }, [numberOfPlayers]); // ⚠️ IMPORTANT : Se déclenche quand numberOfPlayers change

  // Initialiser les noms depuis le state global
  useEffect(() => {
    const names = {};
    players.forEach((player, index) => {
      names[index] = player.name;
    });
    setPlayerNames(names);
  }, [players]);

  // Fonction pour obtenir tous les mots déjà utilisés (éviter les doublons globaux)
  const getAllWords = () => {
    const allWords = [];
    players.forEach(player => {
      allWords.push(...player.words);
    });
    return allWords;
  };

  // Handler pour le changement de nom
  const handleNameChange = (index, value) => {
    setPlayerNames(prev => ({
      ...prev,
      [index]: value,
    }));

    // Validation des doublons en temps réel
    const otherNames = Object.entries(playerNames)
      .filter(([key, _]) => parseInt(key) !== index)
      .map(([_, name]) => name);

    if (otherNames.includes(value) && value.trim()) {
      setErrors(prev => ({
        ...prev,
        [index]: 'Ce nom est déjà pris',
      }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
    }
  };

  // Handler pour valider un nom (au blur ou Enter)
  const handleNameSubmit = (index) => {
    const name = playerNames[index];
    if (!name || !name.trim()) {
      setErrors(prev => ({
        ...prev,
        [index]: 'Le nom est requis',
      }));
      return;
    }

    // Vérifier les doublons
    const otherNames = Object.entries(playerNames)
      .filter(([key, _]) => parseInt(key) !== index)
      .map(([_, name]) => name);

    if (otherNames.includes(name.trim())) {
      setErrors(prev => ({
        ...prev,
        [index]: 'Ce nom est déjà pris',
      }));
      return;
    }

    // Ajouter ou mettre à jour le joueur
    if (players[index]) {
      // Mettre à jour le joueur existant
      actions.updatePlayer(players[index].id, { name: name.trim() });
    } else {
      // Créer un nouveau joueur
      const result = actions.addPlayer(name.trim());
      if (result.error) {
        setErrors(prev => ({
          ...prev,
          [index]: result.error,
        }));
      } else if (result.success && wordChoice === 'aléatoire') {
        // Générer des mots aléatoires
        const words = generateRandomWords(wordsPerPlayer, getAllWords(), settings.selectedCategories);
        actions.updatePlayerWords(result.player.id, words);
      }
    }
  };

  // Handler pour aller à l'écran de choix des mots
  const handleGoToWords = (index) => {
    const player = players[index];
    if (player) {
      setSelectedPlayerId(player.id);
      actions.goToScreen('words');
    }
  };

  // Calculer le statut de completion
  const getPlayerStatus = (index) => {
    const player = players[index];
    if (!player || !player.words) return { filled: 0, required: wordsPerPlayer };

    return {
      filled: player.words.length,
      required: wordsPerPlayer, // ✅ RÉACTIVITÉ : Se met à jour automatiquement
    };
  };

  // Vérifier si tous les joueurs sont prêts
  const allPlayersReady = playerSlots.every((index) => {
    const name = playerNames[index];
    const player = players[index];
    const status = getPlayerStatus(index);

    return (
      name &&
      name.trim() &&
      !errors[index] &&
      player &&
      status.filled === status.required
    );
  });

  const handleBack = () => {
    actions.goToScreen('settings');
  };

  const handleNext = () => {
    if (allPlayersReady) {
      // Nettoyer les joueurs sans nom avant de créer les équipes
      actions.cleanupEmptyPlayers();
      // Créer les équipes
      actions.createTeams();
      actions.goToScreen('teams');
    }
  };

  return (
    <div className="min-h-screen bg-background-main relative overflow-hidden">
      {/* Effet étoiles filantes en arrière-plan */}
      <div className="stars-background absolute inset-0 pointer-events-none" />

      {/* Flèche retour */}
      <BackButton onClick={handleBack} />

      {/* Contenu principal */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="font-bangers text-6xl text-white text-center mb-12 drop-shadow-[2px_2px_0_#e88b8b]">
          Qui joue ?
        </h1>

        <div className="space-y-4">
          {playerSlots.map((index) => {
            const status = getPlayerStatus(index);
            const isComplete = status.filled === status.required;
            const hasName = playerNames[index] && playerNames[index].trim();

            return (
              <div
                key={index}
                className="flex items-center gap-4"
              >
                {/* Input nom */}
                <div className="flex-1">
                  <Input
                    value={playerNames[index] || ''}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    onBlur={() => handleNameSubmit(index)}
                    placeholder={`Joueur ${index + 1}`}
                    error={errors[index]}
                    showClearButton={true}
                  />
                </div>

                {/* Indicateur de mots remplis */}
                <button
                  onClick={() => handleGoToWords(index)}
                  disabled={!hasName || errors[index]}
                  className={`flex items-center justify-center min-w-[140px] px-4 py-3 rounded-xl font-poppins font-semibold text-sm border-2 transition-all duration-200 ${
                    isComplete
                      ? 'bg-green-500 bg-opacity-20 border-green-500 text-green-500'
                      : 'bg-red-500 bg-opacity-20 border-red-500 text-red-500'
                  } ${
                    hasName && !errors[index]
                      ? 'hover:scale-105 cursor-pointer'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {isComplete ? 'Mots remplis' : 'Choisir les mots'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bouton suivant */}
        <div className="mt-8 text-center">
          <Button
            variant="primary"
            size="large"
            onClick={handleNext}
            disabled={!allPlayersReady}
            className="px-12"
          >
            Constitution des équipes
          </Button>
        </div>

        {/* Aide */}
        {!allPlayersReady && (
          <p className="font-poppins text-gray-400 text-center mt-4">
            Tous les joueurs doivent avoir un nom et leurs mots remplis
          </p>
        )}
      </main>
    </div>
  );
}

export default PlayersScreen;
