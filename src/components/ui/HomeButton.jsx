import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Home } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

/**
 * Bouton "Retour à l'accueil" universel
 * Affiche une icône de maison en haut à droite
 * Demande confirmation si une partie est en cours
 */
function HomeButton() {
  const { state, actions } = useGame();
  const { currentScreen } = state.game;
  const [showSuspendConfirmation, setShowSuspendConfirmation] = useState(false);

  // Liste des écrans nécessitant une confirmation (partie en cours)
  const screensRequiringConfirmation = [
    'game',
    'countdown',
    'turn',
    'verification',
    'transition'
  ];

  const handleHomeClick = () => {
    // Si on est sur un écran de jeu actif, demander confirmation
    if (screensRequiringConfirmation.includes(currentScreen)) {
      setShowSuspendConfirmation(true);
    } else {
      // Retour direct pour les autres écrans
      actions.goToScreen('home');
    }
  };

  const handleConfirmSuspend = () => {
    actions.suspendGame();
    setShowSuspendConfirmation(false);
  };

  const handleCancelSuspend = () => {
    setShowSuspendConfirmation(false);
  };

  return (
    <>
      <button
        onClick={handleHomeClick}
        className="fixed top-6 left-6 z-50 flex items-center justify-center w-12 h-12 bg-secondary-cyan rounded-full hover:bg-secondary-cyan-dark hover:scale-110 transition-all duration-200 shadow-lg"
        title="Retour à l'accueil"
      >
        <Home size={24} className="text-white" />
      </button>

      {/* Popup de confirmation de suspension */}
      <Modal isOpen={showSuspendConfirmation} onClose={handleCancelSuspend}>
        <div className="space-y-6">
          {/* Titre */}
          <h2 className="font-bangers text-4xl text-white text-center drop-shadow-[2px_2px_0_#e88b8b]">
            Interrompre la partie
          </h2>

          {/* Message principal */}
          <p className="font-poppins text-lg text-white text-center">
            La partie sera mise en pause et sauvegardée automatiquement.
          </p>

          {/* Boutons */}
          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={handleCancelSuspend}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              variant="secondary"
              onClick={handleConfirmSuspend}
              className="flex-1"
            >
              Accueil
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default HomeButton;
