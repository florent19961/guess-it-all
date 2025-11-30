import React, { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';
import Button from '../ui/Button';
import HomeButton from '../ui/HomeButton';
import useTimer from '../../hooks/useTimer';
import { Check, FastForward, Pause, Play } from 'lucide-react';

/**
 * Écran 7 : Tour de jeu (écran principal du gameplay)
 */
function TurnScreen() {
  const { state, actions } = useGame();
  const { game, teams, players, settings } = state;
  const {
    currentWord,
    remainingWords,
    currentRound,
    currentTeamIndex,
    currentPlayerIndexInTeam,
    wordsGuessedThisTurn,
  } = game;

  const currentTeam = teams[currentTeamIndex];
  const currentPlayerId = currentTeam?.playerIds[currentPlayerIndexInTeam];
  const currentPlayer = players.find(p => p.id === currentPlayerId);

  // État de pause local
  const [isPaused, setIsPaused] = useState(false);

  // Timer basé sur l'horloge système
  const { timeRemaining, isRunning, start, pause } = useTimer(
    game.turnEndTimestamp,
    () => {
      actions.endTurn();
    }
  );

  // Démarrer le timer automatiquement (sauf si le jeu est suspendu)
  // Et le redémarrer quand on reprend après une suspension
  useEffect(() => {
    if (!game.isGameSuspended && !isRunning) {
      start();
    }
  }, [game.isGameSuspended, game.turnEndTimestamp]);

  const handleWordGuessed = () => {
    if (isPaused) return; // Ne pas permettre de valider quand en pause
    actions.markWordAsGuessed();
  };

  const handlePass = () => {
    if (!isPaused && timeRemaining >= settings.passPenalty) {
      // passWord() met à jour turnEndTimestamp dans le contexte
      // Le timer se recalculera automatiquement
      actions.passWord();
    }
  };

  const handlePause = () => {
    if (isPaused) {
      // Reprendre
      setIsPaused(false);
      start();
    } else {
      // Mettre en pause
      setIsPaused(true);
      pause();
    }
  };

  // Raccourcis clavier globaux
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Éviter les conflits si l'utilisateur tape dans un champ de texte
      // (bien qu'il n'y en ait pas sur cet écran)
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (event.key) {
        case 'Enter':
          // Valider un mot (seulement si pas en pause)
          event.preventDefault();
          if (!isPaused) {
            handleWordGuessed();
          }
          break;

        case 'Backspace':
          // Passer un mot (seulement si pas en pause et assez de temps)
          event.preventDefault();
          if (!isPaused && timeRemaining >= settings.passPenalty) {
            handlePass();
          }
          break;

        case ' ':
          // Espace : mettre en pause / reprendre
          event.preventDefault();
          handlePause();
          break;

        default:
          break;
      }
    };

    // Écouter les événements clavier sur window (global)
    window.addEventListener('keydown', handleKeyPress);

    // Nettoyage au démontage du composant
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPaused, timeRemaining, settings.passPenalty, handleWordGuessed, handlePass, handlePause]);

  const handleEndTurn = () => {
    if (isPaused) return; // Ne pas permettre de terminer quand en pause
    const confirmed = window.confirm('Êtes-vous sûr de vouloir terminer le tour ?');
    if (confirmed) {
      actions.endTurn(timeRemaining);
    }
  };

  const getRoundMode = (round) => {
    switch (round) {
      case 1:
        return 'Description verbale';
      case 2:
        return 'Un seul mot';
      case 3:
        return 'Mime';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background-main relative overflow-hidden flex items-center justify-center">
      {/* Effet étoiles filantes en arrière-plan */}
      <div className="stars-background absolute inset-0 pointer-events-none" />

      {/* Bouton Retour à l'accueil */}
      <HomeButton />

      {/* Affichage du nom du joueur actuel */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 bg-background-card border-2 border-secondary-cyan rounded-xl px-6 py-3 backdrop-blur-sm">
        <p className="font-poppins text-white text-xl text-center">
          <strong className="text-secondary-cyan">{currentPlayer?.name}</strong>
        </p>
      </div>

      {/* Bouton Pause/Reprendre */}
      <button
        onClick={handlePause}
        className={`fixed top-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
          isPaused
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-secondary-cyan hover:bg-secondary-cyan-dark'
        }`}
        title={isPaused ? 'Reprendre' : 'Pause'}
      >
        {isPaused ? <Play size={24} className="text-white" /> : <Pause size={24} className="text-white" />}
      </button>

      {/* Contenu principal */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Chronomètre */}
        <div className="text-center mb-8">
          <div className={`font-bangers text-8xl ${timeRemaining <= 10 ? 'pulse-red' : 'text-secondary-cyan'} drop-shadow-[4px_4px_0_#1e293b]`}>
            {timeRemaining}s
          </div>
        </div>

        {/* Zone centrale - Mot à faire deviner */}
        <div className="mb-6">
          <p className="font-poppins text-gray-400 text-center text-sm mb-2">
            MOT À FAIRE DEVINER
          </p>

          <div className="bg-background-card border-4 border-primary-pink rounded-2xl p-8 backdrop-blur-sm relative">
            <div className="font-bangers text-6xl md:text-7xl text-white text-center drop-shadow-[3px_3px_0_#e88b8b]">
              {currentWord || 'Aucun mot'}
            </div>

            {/* Boutons Passer et Mot deviné */}
            <div className="flex items-center justify-center gap-6 mt-8">
              {/* Bouton Passer (gauche) */}
              <button
                onClick={handlePass}
                disabled={isPaused || timeRemaining < settings.passPenalty}
                className={`flex items-center justify-center px-4 py-3 rounded-full font-poppins font-bold text-sm transition-all duration-200 ${
                  isPaused || timeRemaining < settings.passPenalty
                    ? 'bg-gray-700 cursor-not-allowed opacity-30'
                    : 'bg-orange-500 hover:bg-orange-600 hover:scale-110 active:scale-95 cursor-pointer text-white'
                }`}
                title={timeRemaining < settings.passPenalty ? 'Temps insuffisant' : ''}
              >
                {settings.passPenalty === 0 ? 'Passer' : `Passer (-${settings.passPenalty}s)`}
              </button>

              {/* Bouton Mot deviné (droite) */}
              <button
                onClick={handleWordGuessed}
                disabled={!currentWord || isPaused}
                className={`flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-primary-pink rounded-full transition-all duration-200 ${
                  isPaused
                    ? 'cursor-not-allowed opacity-30'
                    : 'hover:bg-primary-pink-dark hover:scale-110 active:scale-95'
                }`}
              >
                <Check size={36} className="text-white" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        {/* Indicateur mots restants */}
        <p className="font-poppins text-gray-400 text-center mt-6">
          Mots restants : {remainingWords.length}
        </p>
      </main>

      {/* Bouton Terminer le tour (FastForward) - Bas droite */}
      <button
        onClick={handleEndTurn}
        disabled={isPaused}
        className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full transition-all duration-200 ${
          isPaused
            ? 'bg-gray-700 cursor-not-allowed opacity-30'
            : 'bg-secondary-cyan hover:bg-secondary-cyan-dark hover:scale-110 active:scale-95'
        }`}
        title="Terminer le tour"
      >
        <FastForward size={24} className="text-white" />
      </button>
    </div>
  );
}

export default TurnScreen;
