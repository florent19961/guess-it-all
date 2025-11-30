import React from 'react';
import { useGame } from '../../context/GameContext';
import Button from '../ui/Button';
import HomeButton from '../ui/HomeButton';

/**
 * Écran 9 : Transition entre manches
 */
function TransitionScreen() {
  const { state, actions } = useGame();
  const { game, teams } = state;
  const { currentRound } = game;

  const nextRound = currentRound + 1;

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

  const handleNextRound = () => {
    actions.nextRound();
  };

  // Trier les équipes par score
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-background-main relative overflow-hidden flex items-center justify-center">
      {/* Effet étoiles filantes en arrière-plan */}
      <div className="stars-background absolute inset-0 pointer-events-none" />

      {/* Bouton Retour à l'accueil */}
      <HomeButton />

      {/* Contenu principal */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl text-center">
        <h1 className="font-bangers text-7xl text-white mb-4 drop-shadow-[4px_4px_0_#e88b8b] animate-pulse">
          Fin de la Manche {currentRound}
        </h1>

        {nextRound <= 3 && (
          <p className="font-poppins text-3xl text-secondary-cyan mb-12">
            Prochain mode : {getRoundMode(nextRound)}
          </p>
        )}

        {/* Récapitulatif des scores */}
        <div className="bg-background-card border-2 border-secondary-cyan rounded-2xl p-8 backdrop-blur-sm mb-12">
          <h2 className="font-bangers text-4xl text-white mb-6">
            Scores après Manche {currentRound}
          </h2>

          <div className="space-y-4">
            {sortedTeams.map((team, index) => {
              const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';

              return (
                <div
                  key={team.id}
                  className={`bg-background-main p-4 rounded-xl flex items-center justify-between ${
                    index === 0 ? 'ring-2 ring-yellow-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{medal}</span>
                    <span className="font-poppins text-white text-2xl font-bold">
                      {team.name}
                    </span>
                  </div>

                  <span className="font-bangers text-4xl text-secondary-cyan">
                    {team.score} points
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bouton commencer la manche suivante */}
        <Button
          variant="primary"
          size="large"
          onClick={handleNextRound}
          className="px-16 py-6 text-2xl"
        >
          {nextRound <= 3 ? `Commencer la Manche ${nextRound}` : 'Voir les résultats'}
        </Button>
      </main>
    </div>
  );
}

export default TransitionScreen;
