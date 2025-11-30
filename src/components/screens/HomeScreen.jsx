import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

/**
 * Écran 1 : Accueil
 */
function HomeScreen() {
  const { state, actions } = useGame();
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  // Déterminer si une partie est en cours ou suspendue
  const hasActiveGame = state.teams.length > 0 && (
    state.game.isGameSuspended ||
    state.game.currentRound > 0
  );

  const handlePlay = () => {
    // Si une partie est en cours, demander confirmation avant de réinitialiser
    if (hasActiveGame) {
      setShowResetConfirmation(true);
    } else {
      // Sinon, aller directement aux paramètres
      actions.goToScreen('settings');
    }
  };

  const handleRules = () => {
    actions.goToScreen('rules');
  };

  const handleResumeGame = () => {
    if (state.game.isGameSuspended) {
      actions.resumeGame();
    } else {
      // Si partie active mais pas suspendue, aller à l'écran de jeu
      actions.goToScreen('game');
    }
  };

  const handleConfirmReset = () => {
    actions.clearLocalStorage();
    setShowResetConfirmation(false);
    // Après réinitialisation, aller aux paramètres
    actions.goToScreen('settings');
  };

  const handleCancelReset = () => {
    setShowResetConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-background-main relative overflow-hidden flex items-center justify-center">
      {/* Effet étoiles filantes en arrière-plan */}
      <div className="stars-background absolute inset-0 pointer-events-none" />

      {/* Contenu principal */}
      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {/* Titre du jeu */}
        <h1 className="font-bangers text-7xl md:text-9xl text-white text-center mb-16 drop-shadow-[4px_4px_0_#e88b8b] animate-pulse">
          Guess It All
        </h1>

        {/* Boutons principaux */}
        <div className="flex flex-col gap-6 w-full max-w-md">
          {/* Bouton "Reprendre la partie" si une partie est active */}
          {hasActiveGame && (
            <Button
              variant="primary"
              size="large"
              onClick={handleResumeGame}
              className="w-full text-2xl py-6 animate-pulse"
            >
              REPRENDRE LA PARTIE
            </Button>
          )}

          <Button
            variant="primary"
            size="large"
            onClick={handlePlay}
            className="w-full text-2xl py-6"
          >
            {hasActiveGame ? 'NOUVELLE PARTIE' : 'JOUER'}
          </Button>

          <Button
            variant="secondary"
            size="large"
            onClick={handleRules}
            className="w-full text-xl py-4"
          >
            RÈGLES
          </Button>
        </div>

        {/* Footer */}
        <p className="font-poppins text-gray-400 text-sm mt-16 text-center">
          Un jeu de devinettes multijoueurs inspiré de Time's Up
        </p>
      </main>

      {/* Popup de confirmation de réinitialisation */}
      <Modal isOpen={showResetConfirmation} onClose={handleCancelReset}>
        <div className="space-y-6">
          {/* Titre */}
          <h2 className="font-bangers text-4xl text-white text-center drop-shadow-[2px_2px_0_#e88b8b]">
            ⚠️ Réinitialisation complète
          </h2>

          {/* Message principal */}
          <p className="font-poppins text-lg text-white text-center">
            Cette action supprimera TOUTES les données suivantes :
          </p>

          {/* Liste des éléments supprimés */}
          <div className="bg-background-card/50 rounded-xl p-6 space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-error-red text-xl">❌</span>
              <p className="font-poppins text-white">Tous les joueurs et leurs noms</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-error-red text-xl">❌</span>
              <p className="font-poppins text-white">Tous les mots saisis par les joueurs</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-error-red text-xl">❌</span>
              <p className="font-poppins text-white">Les équipes constituées et leurs noms personnalisés</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-error-red text-xl">❌</span>
              <p className="font-poppins text-white">Tous les scores et l'historique de la partie</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-error-red text-xl">❌</span>
              <p className="font-poppins text-white">Tous les paramètres personnalisés</p>
            </div>
          </div>

          {/* Avertissement */}
          <p className="font-poppins text-warning-yellow text-center font-semibold">
            Cette action est irréversible.
          </p>

          {/* Boutons */}
          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={handleCancelReset}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              onClick={handleConfirmReset}
              className="flex-1 bg-error-red hover:bg-error-red/80"
            >
              Réinitialiser
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default HomeScreen;
